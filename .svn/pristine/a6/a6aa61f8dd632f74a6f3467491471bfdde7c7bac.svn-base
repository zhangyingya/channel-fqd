package test;

import java.util.Collections;
import java.util.List;
import java.util.concurrent.CountDownLatch;

import org.apache.zookeeper.CreateMode;
import org.apache.zookeeper.KeeperException;
import org.apache.zookeeper.WatchedEvent;
import org.apache.zookeeper.Watcher;
import org.apache.zookeeper.ZooDefs;
import org.apache.zookeeper.ZooKeeper;
import org.apache.zookeeper.data.Stat;

public class DistributeLock implements Watcher {

	private ZooKeeper zk;
	// 当前锁
	private String current_lock;
	// 竞争的资源
	private String lockName;
	// 根节点
	private String ROOT_LOCK = "/dlock";
	// 由于zookeeper监听节点状态会立即返回，所以需要使用CountDownLatch(也可使用信号量等其他机制)
	private CountDownLatch latch;

	public DistributeLock(String zkAddress, String lockName) {
		this.lockName = lockName;
		try {
			zk = new ZooKeeper(zkAddress, 30000, this);
			// 获取根节点状态
			Stat stat = zk.exists(ROOT_LOCK, false);
			// 如果根节点不存在，则创建根节点，根节点类型为永久节点
			if (stat == null) {
				System.out.println("根节点不存在");
				zk.create(ROOT_LOCK, new byte[0], ZooDefs.Ids.OPEN_ACL_UNSAFE, CreateMode.PERSISTENT);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	// 获取锁
	public void lock() {
		try {
			// 在根节点下创建临时顺序节点，返回值为创建的节点路径
			current_lock = zk.create(ROOT_LOCK + "/" + lockName, new byte[0], ZooDefs.Ids.OPEN_ACL_UNSAFE,
					CreateMode.EPHEMERAL_SEQUENTIAL);
			// 获取根节点下的所有临时顺序节点，不设置监视器
			List<String> children = zk.getChildren(ROOT_LOCK, false);
			// 对根节点下的所有临时顺序节点进行从小到大排序
			Collections.sort(children);
			// 判断当前节点是否为最小节点，如果是则获取锁，若不是，则找到自己的前一个节点，监听其存在状态
			int curIndex = Collections.binarySearch(children,
					current_lock.substring(current_lock.lastIndexOf("/") + 1));
			// if(current_lock.equals(ROOT_LOCK + "/" + children.get(0))) {
			if (curIndex == 0) {
				System.out.println("获取锁成功");
				return;
			} else {
				// 获取当前节点前一个节点的路径
				// String prev = children.get(Collections.binarySearch(children,
				// current_lock) - 1);
				String prev = children.get(curIndex - 1);
				// 监听当前节点的前一个节点的状态
				Stat stat = zk.exists(ROOT_LOCK + "/" + prev, true);
				// 此处再次判断该节点是否存在，该步骤也可省略
				if (stat == null) {
					System.out.println("获取锁成功");
					return;
				} else {
					System.out.println("等待锁......");
					latch = new CountDownLatch(1);
					// 进入等待锁状态
					latch.await();
					System.out.println("获取锁成功");
					latch = null;
				}
			}
		} catch (KeeperException e) {
			e.printStackTrace();
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
	}
	
	public void unlock() {
		try {
			//删除创建的节点
			zk.delete(current_lock, -1);
			current_lock = null;
			//关闭zookeeper连接
			zk.close();
		} catch (InterruptedException e) {
			e.printStackTrace();
		} catch (KeeperException e) {
			e.printStackTrace();
		}
	}

	@Override
	public void process(WatchedEvent event) {
		if(this.latch != null) {
			latch.countDown();
		}
	}

}
