package com.tydic.common;

import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ThreadPool {
	
	private static final Logger logger = LoggerFactory.getLogger(ThreadPool.class);
	
	/**
	 * 线程池大小
	 */
	private int poolSize;
	/**
	 * 托管队列大小
	 */
	private int queueSize;
	/**
	 * 线程池托管队列
	 */
	private BlockingQueue<Runnable> queue;
	/**
	 * 线程池
	 */
	private ExecutorService pool;
	
	public ExecutorService getPool() {
		return pool;
	}

	/**
	 * 初始化线程池
	 * @Title: init 
	 * @author huanglinfeng@tydic.com
	 * @date 2017年5月24日 下午2:42:17
	 */
	public void init(){
		this.init(queueSize,poolSize);
	}
	
	/**
	 * 初始化线程池
	 * @Title: init 
	 * @author huanglinfeng@tydic.com
	 * @date 2017年5月24日 下午2:39:02
	 * 
	 * @param queueSize
	 * @param poolSize
	 */
	private void init(int queueSize,int poolSize){
		queue=new ArrayBlockingQueue<Runnable>(queueSize);
		pool=new ThreadPoolExecutor(poolSize-1, poolSize-1, 1, TimeUnit.HOURS, 
				queue, new ThreadPoolExecutor.CallerRunsPolicy());
		logger.info("线程池初始化完成，托管队列大小：{}；线程数量：{}",queueSize,poolSize);
	}

	public void close(){
		pool.shutdown();
		logger.info("线程池关闭");
	}
	
	public int getPoolSize() {
		return poolSize;
	}

	public void setPoolSize(int poolSize) {
		this.poolSize = poolSize;
	}

	public int getQueueSize() {
		return queueSize;
	}

	public void setQueueSize(int queueSize) {
		this.queueSize = queueSize;
	}
	
}
