package com.tydic.common.dlock;

import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.CountDownLatch;

import org.apache.zookeeper.WatchedEvent;
import org.apache.zookeeper.Watcher;
import org.apache.zookeeper.Watcher.Event.KeeperState;
import org.apache.zookeeper.ZooDefs;
import org.apache.zookeeper.ZooKeeper;
import org.apache.zookeeper.data.ACL;
import org.apache.zookeeper.data.Id;
import org.apache.zookeeper.server.auth.DigestAuthenticationProvider;

/**
 * 
 * Zookeeper连接类
 * @ClassName: ConnectionWatcher 
 * @author huanglinfeng@tydic.com
 * @date 2017年3月2日 下午3:10:09 
 *
 */
public class ConnectionWatcher implements Watcher {
	private static final int SESSION_TIMEOUT = 5000;
	protected ZooKeeper zk;
	private CountDownLatch connectedSignal = new CountDownLatch(1);
	
	public void connect(String hosts) throws IOException, InterruptedException {
		zk = new ZooKeeper(hosts, SESSION_TIMEOUT, this);
		connectedSignal.await();
	}

	@Override
	public void process(WatchedEvent event) {
		if (event.getState() == KeeperState.SyncConnected) {
			connectedSignal.countDown();
		}
	}

	public void close() throws InterruptedException {
		zk.close();
	}

	public List<ACL> getAcls(String userName,String password) throws NoSuchAlgorithmException{
		List<ACL> acls=null;
		try {  
            String auth = userName + ":" +password;  
            Id id = new Id("digest",DigestAuthenticationProvider.generateDigest(auth));  
            ACL acl = new ACL(ZooDefs.Perms.ALL, id);   
            acls = Collections.singletonList(acl);   
        } catch (NoSuchAlgorithmException e) {  
            throw e;  
        }
		return acls;
	}
	
}
