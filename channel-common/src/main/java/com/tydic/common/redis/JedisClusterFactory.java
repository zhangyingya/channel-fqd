package com.tydic.common.redis;

import java.util.HashSet;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.tydic.common.SpringContext;

import redis.clients.jedis.HostAndPort;
import redis.clients.jedis.JedisCluster;
import redis.clients.jedis.JedisPoolConfig;

/**
 * 
 * 集群模式
 * @ClassName: JedisClusterFactory 
 * @author hlf880217@163.com
 * @date 2016年11月20日 下午7:54:52 
 *
 */
public class JedisClusterFactory {
	
	private final static Logger logger=LoggerFactory.getLogger(JedisClusterFactory.class);

	private static JedisPoolConfig jedisPoolConfig;
	private static Set<HostAndPort> clusterNodes;
	
	static {
		init();
	}
	
	public static void init(){
		jedisPoolConfig=new JedisPoolConfig();
		//最大连接数
		jedisPoolConfig.setMaxTotal(Integer.valueOf(SpringContext.getProperty("redis.pool.maxTotal")));
		//最大空闲连接数
		jedisPoolConfig.setMaxIdle(Integer.valueOf(SpringContext.getProperty("redis.pool.maxIdle")));
		//最小空闲连接数
		jedisPoolConfig.setMinIdle(Integer.valueOf(SpringContext.getProperty("redis.pool.minIdle")));
		//最大等待毫秒数(如果设置为阻塞时BlockWhenExhausted),如果超时就抛异常
		jedisPoolConfig.setMaxWaitMillis(Long.valueOf(SpringContext.getProperty("redis.pool.maxWaitMillis")));
		//使用连接时，检测连接是否成功
		jedisPoolConfig.setTestOnBorrow(Boolean.valueOf(SpringContext.getProperty("redis.pool.testOnBorrow")));
		//返回连接时
		jedisPoolConfig.setTestOnReturn(Boolean.valueOf(SpringContext.getProperty("redis.pool.testOnReturn")));
		
		clusterNodes=new HashSet<HostAndPort>();
		
		String nodesStr=SpringContext.getProperty("redis.cluster.nodes");
		if(nodesStr!=null && !"".equals(nodesStr.trim())){
			String[] nodes=nodesStr.trim().split(",");
			
			for(String node : nodes){
				String[] _arr=node.split("\\:");
				if(_arr==null || _arr.length<2){
					continue;
				}
				
				try {
					clusterNodes.add(new HostAndPort(_arr[0], Integer.valueOf(_arr[1])));
				} catch (NumberFormatException e) {
					logger.error(e.getMessage(),e);
				}
			}
		}
	}
	
	/**
	 * 获取redis集群连接
	 * @Title: getJedisCluster 
	 * @author hlf880217@163.com
	 * @date 2016年11月20日 下午7:55:13 
	 *
	 * @return
	 */
	public static JedisCluster getJedisCluster(){
		JedisCluster jc=new JedisCluster(clusterNodes,6000,1000,jedisPoolConfig);
		return jc;
	}
	
	public static void main(String[] args){
		JedisCluster jc=getJedisCluster();
		
		for(int i=0;i<100;i++){
			//jc.expire(i+"", i);
			System.out.println(jc.get(i+""));
		}
	}
}
