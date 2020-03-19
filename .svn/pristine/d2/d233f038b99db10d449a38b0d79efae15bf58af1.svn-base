package com.tydic.common.cache;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang.ArrayUtils;
import org.apache.commons.pool2.impl.GenericObjectPoolConfig;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.StringUtils;

import redis.clients.jedis.HostAndPort;
import redis.clients.jedis.JedisPoolConfig;
import redis.clients.jedis.Transaction;

import com.ctg.itrdc.cache.pool.CtgJedisPool;
import com.ctg.itrdc.cache.pool.CtgJedisPoolConfig;
import com.ctg.itrdc.cache.pool.CtgJedisPoolException;
import com.ctg.itrdc.cache.pool.ProxyJedis;
import com.tydic.common.SpringContext;

/**
 * 缓存
 * @author yuanxh
 *
 */
public enum CacheManager {
	
	instance;
	
	private Logger logger = LoggerFactory.getLogger(CacheManager.class);
	private CtgJedisPool ctgJedisPool;
	public static int subSize = 2048;
	
	private CacheManager(){
		init();
	}
	
	private void init(){
		
		String subSizeStr = SpringContext.getProperty("cache.subSize");
		if(!StringUtils.isEmpty(subSizeStr)) {
			CacheManager.subSize = Integer.parseInt(subSizeStr);
		}
		
		List<HostAndPort> hostAndPortList = new ArrayList<HostAndPort>();
        String hostStr = SpringContext.getProperty("cache.host");
		String[] hosts = hostStr.split(",");
		for(String host : hosts) {
			String[] hostParam = host.split(":");
			HostAndPort host1 = new HostAndPort(hostParam[0].trim(),
		        		Integer.parseInt(hostParam[1].trim()));
		    hostAndPortList.add(host1);
		}

        GenericObjectPoolConfig poolConfig = new JedisPoolConfig();
        poolConfig.setMaxIdle(Integer.parseInt(SpringContext.getProperty("cache.maxIdle"))); //最大空闲连接数
        poolConfig.setMaxTotal(Integer.parseInt(SpringContext.getProperty("cache.maxTotal"))); // 最大连接数（空闲+使用中）
        poolConfig.setMinIdle(Integer.parseInt(SpringContext.getProperty("cache.minIdle"))); //保持的最小空闲连接数
        poolConfig.setMaxWaitMillis(Integer.parseInt(SpringContext.getProperty("cache.maxWaitMillis")));

        CtgJedisPoolConfig config = new CtgJedisPoolConfig(hostAndPortList);
        config.setDatabase(Integer.parseInt(SpringContext.getProperty("cache.database")))
                .setPassword(SpringContext.getProperty("cache.password"))
                .setPoolConfig(poolConfig)
                .setPeriod(Integer.parseInt(SpringContext.getProperty("cache.period")))
                .setMonitorTimeout(Integer.parseInt(SpringContext.getProperty("cache.monitorTimeout")));
        ctgJedisPool = new CtgJedisPool(config);
	}
	
	public void closeRedisPool(){
		if(ctgJedisPool!=null){
			ctgJedisPool.close();
		}
	}
	
	public ProxyJedis getProxyJedis(){
		ProxyJedis jedis=null;
		try {
			jedis = ctgJedisPool.getResource();
		} catch (CtgJedisPoolException e) {
			logger.error(e.getMessage(),e);
		}
		return jedis;
	}
	
	/**
	 * 以字符形式存储
	 * @param key
	 * @param value
	 */
	public void set(String key,String value) {
		ProxyJedis jedis = null;
        try {
        	jedis = getProxyJedis();
            jedis.set(key, value);
        } catch (Throwable e){
        	logger.error(e.getMessage(),e);
        } finally {
			if(jedis!=null){
				jedis.close();
			}
		}
	}
	
	/**
	 * 判断key值是否存在，如果存在，返回true，不存在返回false
	 * @param key
	 * @return
	 */
	public boolean exist(String key){
		boolean bol = false;
		ProxyJedis jedis = null;
		try {
			jedis = getProxyJedis();
			bol = jedis.exists(key);
		}catch (Exception e) {
			logger.error(e.getMessage(),e);
		} finally {
			if(jedis!=null){
				jedis.close();
			}
		}
		return bol;
	}
	
	/**
	 * 
	 * @param key
	 * @param value
	 * @param unixTime 设置指定key的生存时间，使用unix时间戳，以毫秒为单位
	 */
	public void set(byte[] key,byte[] value,long unixTime) {
		ProxyJedis jedis = null;
        try {
        	jedis = getProxyJedis();
            jedis.set(key, value);
            jedis.pexpireAt(key, unixTime);
        } catch (Throwable e){
        	logger.error(e.getMessage(),e);
        } finally {
			if(jedis!=null){
				jedis.close();
			}
		}
	}
	
	/**
	 * 设置生效时间，单位是秒
	 * @param key
	 * @param val
	 * @param alive
	 */
	public void set(String key,String val,int alive){
		ProxyJedis jedis = null;
        try {
        	jedis = getProxyJedis();
            jedis.set(key, val);
            jedis.expire(key, alive);
        } catch (Throwable e){
        	logger.error(e.getMessage(),e);
        } finally {
			if(jedis!=null){
				jedis.close();
			}
		}
	}
	
	/**
	 * 以集合形式存储
	 * @param key
	 * @param value
	 * @param unixTime 设置指定key的生存时间，使用unix时间戳，以毫秒为单位
	 */
	public void rput(byte[] key,byte[] value,long unixTime) {
		ProxyJedis jedis = null;
        try {
        	List<byte[]> byteArrList = splitAry(value, subSize);
        	jedis = getProxyJedis();
        	for(byte[] byteArr : byteArrList) {
    		  jedis.rpush(key, byteArr);
        	}
            jedis.pexpireAt(key, unixTime);
        } catch (Throwable e){
        	logger.error(e.getMessage(),e);
        } finally {
			if(jedis!=null){
				jedis.close();
			}
		}
	}
	
	/**
	 * 使用事务更新
	 * @param key
	 * @param value
	 * @param unixTime
	 */
	public void transactionUpdate(byte[] key,byte[] value,long unixTime) {
		ProxyJedis jedis = null;
        try {
        	jedis = getProxyJedis();
        	// 开启事务
        	Transaction transaction = jedis.multi();
        	transaction.del(key);
        	List<byte[]> byteArrList = splitAry(value, subSize);
        	for(byte[] byteArr : byteArrList) {
        		transaction.rpush(key, byteArr);
          	}
        	transaction.pexpireAt(key, unixTime);
        	transaction.exec();
        } catch (Throwable e){
        	logger.error(e.getMessage(),e);
        } finally {
			if(jedis!=null){
				jedis.close();
			}
		}
	}
	
	
	
	public String get(String key) {
		ProxyJedis jedis = null;
		String value = null;
        try {
        	jedis = getProxyJedis();
            value = jedis.get(key);
        } catch (Throwable e){
        	logger.error(e.getMessage(),e);
        } finally {
			if(jedis!=null){
				jedis.close();
			}
		}
        return value;
	}
	
	public byte[] get(byte[] key,long unixTime) {
		ProxyJedis jedis = null;
		byte[] value = null;
        try {
        	jedis = getProxyJedis();
            value = jedis.get(key);
            jedis.pexpireAt(key, unixTime);
        } catch (Throwable e){
        	logger.error(e.getMessage(),e);
        } finally {
			if(jedis!=null){
				jedis.close();
			}
		}
        return value;
	}
	
	public byte[] lgetAll(byte[] key,long unixTime) {
		ProxyJedis jedis = null;
		byte[] result = null;
        try {
        	jedis = getProxyJedis();
        	List<byte[]> list = jedis.lrange(key, 0, -1);
        	result = mergeArr(list);
        	jedis.pexpireAt(key, unixTime);
        } catch (Throwable e){
        	logger.error(e.getMessage(),e);
        } finally {
			if(jedis!=null){
				jedis.close();
			}
		}
        return result;
	}
	
	public void del(String key) {
		ProxyJedis jedis = null;
        try {
        	jedis = getProxyJedis();
        	jedis.del(key);
        } catch (Throwable e){
        	logger.error(e.getMessage(),e);
        } finally {
			if(jedis!=null){
				jedis.close();
			}
		}
	}
	
	public void del(byte[] key) {
		ProxyJedis jedis = null;
        try {
        	jedis = getProxyJedis();
        	jedis.del(key);
        } catch (Throwable e){
        	logger.error(e.getMessage(),e);
        } finally {
			if(jedis!=null){
				jedis.close();
			}
		}
	}
	
	/**
	 * 数组拆分
	 * @param ary
	 * @param subSize
	 * @return
	 */
	public static List<byte[]> splitAry(byte[] ary, int subSize) {
		int count = ary.length/subSize;
		int count2 = ary.length % subSize == 0 ? ary.length / subSize
				: ary.length / subSize + 1;
		List<byte[]> list = new ArrayList<byte[]>();
		for (int i = 0; i < count; i++) {
			list.add(ArrayUtils.subarray(ary, i*subSize, (i+1)*subSize));
		}
		if(count < count2) {
			list.add(ArrayUtils.subarray(ary, count*subSize, ary.length));
		}
		return list;
	}
	
	/**
	 * 数组合并
	 * @param list
	 * @return
	 */
	public static byte[] mergeArr(List<byte[]> list) {
		byte[] des = {};
		for(byte[] arr : list) {
			des = addArr(des, arr);
		}
		return des;
	}
	
	/**
	 * 添加数组
	 * @param src 原数组
	 * @param sub 需要添加的数组
	 */
	public static byte[] addArr(byte[] src, byte[] sub) {
		return ArrayUtils.addAll(src, sub);
	}
	

}
