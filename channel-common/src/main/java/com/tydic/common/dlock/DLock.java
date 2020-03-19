package com.tydic.common.dlock;

/**
 * 
 * 分布式锁
 * @ClassName: DLock 
 * @author huanglinfeng@tydic.com
 * @date 2017年3月2日 下午1:58:22 
 *
 */
public class DLock {
	
	private ConnectionWatcher conn;
	private String zkServers;
	private String zkNode;
	
	public DLock(String zkServers,String zkNode){
		this.zkServers=zkServers;
		this.zkNode=zkNode;
	}
	
	public boolean lock()throws Exception{
		conn=new ConnectionWatcher();
		try {
			conn.connect(zkServers);
			
			WriteLock lock=new WriteLock(conn.zk, zkNode, null, new LockListener() {
				@Override
				public void lockReleased() {
				}
				
				@Override
				public void lockAcquired() {
				}
			});
			
			return lock.lock();
		} catch (Exception e) {
			throw e;
		}
	}
	
	public void unlock()throws Exception{
		try {
			conn.close();
		} catch (Exception e) {
			throw e;
		}
	}

	public String getZkServers() {
		return zkServers;
	}

	public void setZkServers(String zkServers) {
		this.zkServers = zkServers;
	}

	public String getZkNode() {
		return zkNode;
	}

	public void setZkNode(String zkNode) {
		this.zkNode = zkNode;
	}

}
