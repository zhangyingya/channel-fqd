package com.tydic.common;

import java.io.IOException;
import java.util.concurrent.CountDownLatch;

import org.apache.zookeeper.WatchedEvent;
import org.apache.zookeeper.Watcher;
import org.apache.zookeeper.Watcher.Event.KeeperState;
import org.apache.zookeeper.ZooKeeper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * 
 * Zookeeper连接类
 * @ClassName: ZkClient 
 * @author huanglinfeng@tydic.com
 * @date 2017年3月2日 下午3:10:09 
 *
 */
public class ZkClient implements Watcher {
	private static final int SESSION_TIMEOUT = 5000;
	private Logger logger=LoggerFactory.getLogger(ZkClient.class);
	private String hosts;
	private ZooKeeper zk;
	private CountDownLatch connectedSignal = new CountDownLatch(1);

	public void connect(String hosts) throws IOException, InterruptedException {
		this.hosts=hosts;
		zk = new ZooKeeper(hosts, SESSION_TIMEOUT, this);
		connectedSignal.await();
	}

	@Override
	public void process(WatchedEvent event) {
		if (event.getState() == KeeperState.SyncConnected) {
			connectedSignal.countDown();
		}
		
		if(event.getState() == KeeperState.Expired){
			while(true){
				if(Thread.interrupted()){
					break;
				}
				try {
					connect(hosts);
					logger.info("重建zookeeper连接成功，zookeeper服务：{}",this.hosts);
					break;
				} catch (Exception e) {
					try {
						Thread.sleep(1000);
					} catch (InterruptedException ie) {}
				}
			}
		}
	}

	public void close() throws InterruptedException {
		zk.close();
	}
	
	public ZooKeeper getZk(){
		return zk;
	}
}
