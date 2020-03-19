package com.tydic.schedule;

import org.apache.curator.RetryPolicy;
import org.apache.curator.framework.CuratorFramework;
import org.apache.curator.framework.CuratorFrameworkFactory;
import org.apache.curator.framework.recipes.leader.LeaderLatch;
import org.apache.curator.framework.recipes.leader.LeaderLatch.State;
import org.apache.curator.framework.recipes.leader.LeaderLatchListener;
import org.apache.curator.retry.ExponentialBackoffRetry;
import org.quartz.Scheduler;
import org.quartz.SchedulerException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;

import com.tydic.common.AbstractScheduler;
import com.tydic.schedule.task.ChannelSales13ReportTask;

public class ChannelSales13ReportJobManager extends AbstractScheduler {
	
	private final Logger log = LoggerFactory.getLogger(ChannelSales13ReportJobManager.class);
	
	private final static String JOB_GROUP="esmp-core";
	
	private static final String  LATCH_PATH = "/lock/scheduler/leadLock";
	
	private Scheduler scheduler;
	
	@Value("${dubbo.registry.address}")
    private String zookeeperUrl;
	
	@Value("${channelSales.cron.exp}")
	private String CronExp;
	
	
	public void init(){
		try {
			selectLeaderAndStartJob();
		} catch (Exception e) {
			log.error(e.getMessage(),e);
		}
	}
	
	public void addSchdule(){
		try {
			scheduleJob("channelSales13Report", JOB_GROUP, CronExp, ChannelSales13ReportTask.class, null);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			 log.error(e.getMessage(), e);
		}
	}
	
	//选择首领
    private void selectLeaderAndStartJob() {
    try {
    	RetryPolicy retryPolicy = new ExponentialBackoffRetry(1000, 3);
        zookeeperUrl = zookeeperUrl.substring(zookeeperUrl.lastIndexOf('/') + 1, zookeeperUrl.length());
        CuratorFramework client = CuratorFrameworkFactory.newClient(zookeeperUrl, retryPolicy);
        client.start();
        LeaderLatch latch = new LeaderLatch(client, LATCH_PATH);
        latch.addListener(new LeaderLatchListener() {
            @Override
            public void isLeader() {
                log.info("---------- 成为首领，并且准备启动定时任务 --------");
            	addSchdule();
            }

            @Override
            public void notLeader() {
                log.info("--------- 失去首领，准备关闭定时任务 --------");
                close();
            }
        });
     
    	if (latch.getState() != State.STARTED) {
    		log.info("--------- 开始选举 --------");
    		latch.start();
        }
            
//        if(latch.await(10, TimeUnit.SECONDS)){
//    		addSchdule();
//        }
//        latch.await();
        } catch (Exception e) {
            log.error(e.getMessage(), e);
        }

    }
	
	public void close(){
		try {
			getScheduler().shutdown(true);
		} catch (SchedulerException e) {
			log.error(e.getMessage(), e);
		}
	}

	@Override
	public Scheduler getScheduler() {
		return scheduler;
	}
	
	public void setScheduler(Scheduler scheduler) {
		this.scheduler = scheduler;
	}

}
