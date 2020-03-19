package com.tydic.schedule;

import java.util.Map;

import org.quartz.Job;
import org.quartz.Scheduler;
import org.quartz.SchedulerException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.tydic.common.AbstractScheduler;
import com.tydic.schedule.task.LoadCodeTask;

public class JobManager extends AbstractScheduler{
	
	private final static String JOB_GROUP="esmp-core";
	
	private final Logger log = LoggerFactory.getLogger(JobManager.class);
	
	private Scheduler scheduler;
	
	public void init(){
		try {
			//code表加载
			scheduleJob("loadCode", JOB_GROUP, "0 0/3 * * * ?", LoadCodeTask.class, null);
		} catch (Exception e) {
			log.error(e.getMessage(),e);
		}
	}
	
	public void close(){
		try {
			//deleteAllJob();
			getScheduler().shutdown(true);
		} catch (SchedulerException e) {
			log.error(e.getMessage(),e);
		}
	}
	
	public void deleteJob(String jobName){
		try {
			deleteJob(jobName, JOB_GROUP);
		} catch (SchedulerException e) {
			log.error(e.getMessage(),e);
		}
	}
	
	public void createOrUpdateJob(String jobName,String cronExpression,Class<? extends Job> jobClass){
		try {
			scheduleJob(jobName, JOB_GROUP, cronExpression, jobClass, null);
		} catch (Exception e) {
			log.error(e.getMessage(),e);
		}
	}
	
	public void createOrUpdateJob(String jobGroup,String jobName,String cronExpression,Class<? extends Job> jobClass){
		try {
			scheduleJob(jobName, jobGroup, cronExpression, jobClass,null);
		} catch (Exception e) {
			log.error(e.getMessage(),e);
		}
	}
	
	public void createOrUpdateJob(String jobName,String cronExpression,Class<? extends Job> jobClass,Map<String,Object> param){
		try {
			scheduleJob(jobName, JOB_GROUP, cronExpression, jobClass,param);
		} catch (Exception e) {
			log.error(e.getMessage(),e);
		}
	}
	
	public void createOrUpdateJob(String jobGroup,String jobName,String cronExpression,Class<? extends Job> jobClass,Map<String,Object> param){
		try {
			scheduleJob(jobName, jobGroup, cronExpression, jobClass,param);
		} catch (Exception e) {
			log.error(e.getMessage(),e);
		}
	}

	public Scheduler getScheduler() {
		return scheduler;
	}

	public void setScheduler(Scheduler scheduler) {
		this.scheduler = scheduler;
	}

}
