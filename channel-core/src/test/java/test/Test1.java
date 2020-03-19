package test;

import java.text.SimpleDateFormat;
import java.util.Date;

import com.tydic.common.dlock.DLock;

public class Test1 {
	
	
	public static void main1(String[] args) throws Exception {
		DistributeLock lock = new DistributeLock("127.0.0.1:2181", "lock");
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		lock.lock();
		System.out.println(sdf.format(new Date()) + "开始执行业务......");
		Thread.sleep(300000);
		System.out.println(sdf.format(new Date()) + "业务处理结束......");
		lock.unlock();
	}
	
	
	public static void main(String[] args) throws Exception {
		DLock lock = new DLock("127.0.0.1:2181", "/dlock");
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		lock.lock();
		System.out.println(sdf.format(new Date()) + "开始执行业务......");
		Thread.sleep(30000);
		System.out.println(sdf.format(new Date()) + "业务处理结束......");
		lock.unlock();
	}

}
