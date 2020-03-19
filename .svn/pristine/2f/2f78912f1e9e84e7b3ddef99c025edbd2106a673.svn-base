package com.tydic.common.redis;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.StringTokenizer;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.tydic.common.SpringContext;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPoolConfig;
import redis.clients.jedis.JedisShardInfo;
import redis.clients.jedis.ShardedJedis;
import redis.clients.jedis.ShardedJedisPool;
import redis.clients.jedis.Tuple;

public enum RedisManager{
	
	instance;
	
	private Logger logger = LoggerFactory.getLogger(RedisManager.class);
	private ShardedJedisPool shardPool;
	
	private RedisManager(){
		init();
	}
	
	public void closeRedisPool(){
		if(shardPool!=null){
			shardPool.destroy();
		}
	}
	
	private void init(){
		// 创建jedis池配置实例
		JedisPoolConfig config = new JedisPoolConfig();
		config.setMaxTotal(Integer.valueOf(SpringContext.getProperty("jedis.max.total")));
		// 控制一个pool最多有多少个状态为idle(空闲的)的jedis实例。
		config.setMaxIdle(Integer.valueOf(SpringContext.getProperty("jedis.max.idle")));
		// 表示当borrow(引入)一个jedis实例时，最大的等待时间，如果超过等待时间，则直接抛出JedisConnectionException；
		config.setMaxWaitMillis(Long.valueOf(SpringContext.getProperty("jedis.max.wait.timeout")));
		// 在borrow一个jedis实例时，是否提前进行validate操作；如果为true，则得到的jedis实例均是可用的；
		config.setTestOnBorrow(false);
		config.setTestOnReturn(false);
		config.setBlockWhenExhausted(true);
		String servers = SpringContext.getProperty("jedis.servers");
		
		JedisShardInfo jedisShardInfo = null;
		StringTokenizer st = new StringTokenizer(servers, ",");
		String[] ipAddressStr;
		List<JedisShardInfo> shardInfoList = new ArrayList<JedisShardInfo>();
		while (st.hasMoreTokens()){
			ipAddressStr = st.nextToken().split(":");
			jedisShardInfo = new JedisShardInfo(ipAddressStr[0], Integer.valueOf(ipAddressStr[1]));;
			if (ipAddressStr.length > 2) {
				String password = ipAddressStr[2];
				jedisShardInfo.setPassword(password);
			}
			shardInfoList.add(jedisShardInfo);
		}

		// 根据配置文件,创建shared池实例
		shardPool = new ShardedJedisPool(config, shardInfoList);
	}
	
	public ShardedJedis getShardedJedis(){
		ShardedJedis jedis = shardPool.getResource();
		return jedis;
	}
	
	public byte[] get(byte[] key){
		// 从shard池中获取shardJedis实例
		ShardedJedis shardJedis = null;
		try {
			shardJedis = this.getShardedJedis();
			byte[] resultByte = shardJedis.get(key);
			return resultByte; 
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		} finally {
			if(shardJedis!=null){
				shardJedis.close();
			}
		}
		return null;
	}
	
	public String get(String key){
		// 从shard池中获取shardJedis实例
		ShardedJedis shardJedis = null;
		try {
			shardJedis = this.getShardedJedis();
			Object result = null;
			result = shardJedis.get((String) key);
			return (String) result;
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		} finally {
			if(shardJedis!=null){
				shardJedis.close();
			}
		}
		return null;
	}

	public String put(String key, String value){
		ShardedJedis shardJedis = null;
		try {
			shardJedis = this.getShardedJedis();
			String result=this.set(key, value, null,shardJedis);
			if(!"OK".equals(result))
			{
				return null;
			}
			return result;
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		} finally {
			if(shardJedis!=null){
				shardJedis.close();
			}
		}
		return null;
	}
	
	public String put(byte[] key, byte[] value){
		ShardedJedis shardJedis = null;
		try {
			shardJedis = this.getShardedJedis();
			String result=this.set(key, value, null,shardJedis);
			if(!"OK".equals(result))
			{
				return null;
			}
			return result;
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		} finally {
			if(shardJedis!=null){
				shardJedis.close();
			}
		}
		return null;
	}
	
	public Long insc(String key){
		ShardedJedis shardJedis = null;
		try {
			shardJedis = this.getShardedJedis();
			Long result=shardJedis.incr(key);
			return result;
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		} finally {
			if(shardJedis!=null){
				shardJedis.close();
			}
		}
		return null;
	}
	
	public String put(byte[] key, byte[] value, int expireTime){
		ShardedJedis shardJedis = null;
		try {
			shardJedis = this.getShardedJedis();
			String result=this.set(key, value, expireTime,shardJedis);
			if(!"OK".equals(result))
			{
				return null;
			}
			return result;
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		} finally {
			if(shardJedis!=null){
				shardJedis.close();
			}
		}
		return null;
	}
	
	public String put(String key, String value, int expireTime){
		ShardedJedis shardJedis = null;
		try {
			shardJedis = this.getShardedJedis();
			String result=this.set(key, value, expireTime,shardJedis);
			if(!"OK".equals(result))
			{
				return null;
			}
			return result;
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		} finally {
			if(shardJedis!=null){
				shardJedis.close();
			}
		}
		return null;
	}
	
	public int delete(String key){
		ShardedJedis shardJedis = null;
		try {
			shardJedis = this.getShardedJedis();
			int count=this.del(shardJedis, key);
			return count;
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		} finally {
			if(shardJedis!=null){
				shardJedis.close();
			}
		}
		return 0;
	}
	
	public int delete(byte[] key){
		ShardedJedis shardJedis = null;
		try {
			shardJedis = this.getShardedJedis();
			int count=this.del(shardJedis, key);
			return count;
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		} finally {
			if(shardJedis!=null){
				shardJedis.close();
			}
		}
		return 0;
	}

	private int del(ShardedJedis shardJedis,Object key){
		if (key instanceof String)
		{
			return shardJedis.del((String)key).intValue();
		}
		else
		{
			return shardJedis.del((byte[])key).intValue();
		}
	}

	private String set(Object key, Object value,Integer expireTime, ShardedJedis shardJedis){
		String result=null;
		if (key instanceof String && value instanceof String)
		{
			if(expireTime == null)
			{
				result=shardJedis.set((String) key, (String) value);
			}
			else
			{
				result=shardJedis.setex((String) key, expireTime, (String) value);
			}
			
		}
		else
		{
			if(expireTime == null)
			{
				result=shardJedis.set((byte[])key, (byte[])value);
			}
			else
			{
				result=shardJedis.setex((byte[])key, expireTime,(byte[])value);
			}
		}
		return result;
	}
	
	public List<String> hmget(String key, String... fields) {
		// 从shard池中获取shardJedis实例
		ShardedJedis shardJedis = null;
		try {
			shardJedis = this.getShardedJedis();
			List<String> result = new ArrayList<String>();
			result = shardJedis.hmget(key, fields);
			return result;
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		} finally {
			if(shardJedis!=null){
				shardJedis.close();
			}
		}
		return null;
	}

	public boolean exists(String key){
		ShardedJedis shardJedis = null;
		boolean result = false;
		try {
			shardJedis = this.getShardedJedis();
			result = shardJedis.exists(key);
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		} finally {
			if(shardJedis!=null){
				shardJedis.close();
			}
		}
		return result;
	}
	
	public boolean hexists(String key, String field){
		ShardedJedis shardJedis = null;
		boolean result = false;
		try {
			shardJedis = this.getShardedJedis();
			result = shardJedis.hexists(key, field);
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		} finally {
			if(shardJedis!=null){
				shardJedis.close();
			}
		}
		return result;
	}
	
	public void hset(String key, String field, String value) {
		ShardedJedis shardJedis = null;
		try {
			shardJedis = this.getShardedJedis();
			shardJedis.hset(key, field, value);
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		} finally {
			if(shardJedis!=null){
				shardJedis.close();
			}
		}
	}

	public Map<String, String> hgetAll(String key) {
		// 从shard池中获取shardJedis实例
		ShardedJedis shardJedis = null;
		try {
			shardJedis = this.getShardedJedis();
			Map<String, String> result = new HashMap<String, String>();
			result = shardJedis.hgetAll(key);
			return result;
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		} finally {
			if(shardJedis!=null){
				shardJedis.close();
			}
		}
		return null;
	}
	
	public String hget(String key, String field) {
		ShardedJedis shardJedis = null;
		try {
			shardJedis = this.getShardedJedis();
			String result = shardJedis.hget(key, field);
			return result;
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		} finally {
			if(shardJedis!=null){
				shardJedis.close();
			}
		}
		return null;
	}
	
	public Collection<Jedis> getAllShards() {
		ShardedJedis shardJedis = null;
		try {
			shardJedis = this.getShardedJedis();
			Collection<Jedis> coll = shardJedis.getAllShards();
			return coll;
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		} finally {
			if(shardJedis!=null){
				shardJedis.close();
			}
		}
		return null;
	}
	
	public JedisShardInfo getShardInfo(String key) {
		ShardedJedis shardJedis = null;
		try {
			shardJedis = this.getShardedJedis();
			JedisShardInfo result = shardJedis.getShardInfo(key);
			return result;
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		} finally {
			if(shardJedis!=null){
				shardJedis.close();
			}
		}
		return null;
	}
	public JedisShardInfo getShardInfo(byte[] key) {
		ShardedJedis shardJedis = null;
		try {
			shardJedis = this.getShardedJedis();
			JedisShardInfo result = shardJedis.getShardInfo(key);
			return result;
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		} finally {
			if(shardJedis!=null){
				shardJedis.close();
			}
		}
		return null;
	}
	
	public Set<Tuple> zrangeByScoreWithScores(String key, String min, String max, int offset, int count) {
		ShardedJedis shardJedis = null;
		try {
			shardJedis = this.getShardedJedis();
			Set<Tuple> result = shardJedis.zrangeByScoreWithScores(key, min, max, offset, count);
			return result;
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		} finally {
			if(shardJedis!=null){
				shardJedis.close();
			}
		}
		return null;
	}
}
