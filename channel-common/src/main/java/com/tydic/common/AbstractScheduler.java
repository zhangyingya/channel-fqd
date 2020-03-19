package com.tydic.common;

import java.util.List;
import java.util.Map;
import java.util.Set;

import org.quartz.CronScheduleBuilder;
import org.quartz.CronTrigger;
import org.quartz.Job;
import org.quartz.JobBuilder;
import org.quartz.JobDetail;
import org.quartz.JobKey;
import org.quartz.Scheduler;
import org.quartz.SchedulerException;
import org.quartz.TriggerBuilder;
import org.quartz.impl.matchers.GroupMatcher;

/**
 * 
 * 调度器抽象类
 * @ClassName: AbstractScheduler 
 * @author huanglinfeng@tydic.com
 * @date 2017年3月30日 下午5:01:17 
 *
 */
public abstract class AbstractScheduler {
	
	/**
	 * 注册任务
	 * @Title: scheduleJob 
	 * @author huanglinfeng@tydic.com
	 * @date 2017年3月30日 下午5:02:34
	 * 
	 * @param name
	 * @param group
	 * @param cronExpression
	 * @param jobClass
	 * @throws Exception
	 */
	public void scheduleJob(String name, String group, String cronExpression, Class<? extends Job> jobClass,Map<String,Object> jobParam) throws Exception {

		JobDetail jobDetail = JobBuilder.newJob(jobClass).withIdentity(name, group).build();
		if(jobParam != null){
			jobDetail.getJobDataMap().putAll(jobParam);
		}
		
		CronTrigger trigger = TriggerBuilder.newTrigger().withIdentity(name,  group).withSchedule(CronScheduleBuilder.cronSchedule(cronExpression)).build(); 
		
		JobKey jobKey = JobKey.jobKey(name, group);
		try {
			//删除当前job
			getScheduler().deleteJob(jobKey);
			
			//注册作业和触发器
			getScheduler().scheduleJob(jobDetail, trigger);
			
			//开始调度任务
			getScheduler().start();
		} catch (SchedulerException e) {
			throw e;
		}
	}
	
	/**
	 * 删除任务
	 * @Title: deleteJob 
	 * @author huanglinfeng@tydic.com
	 * @date 2017年3月30日 下午5:02:42
	 * 
	 * @param jobName
	 * @param jobGroup
	 * @throws SchedulerException
	 */
	public void deleteJob(String jobName,String jobGroup) throws SchedulerException{
		JobKey jobKey = JobKey.jobKey(jobName, jobGroup);
		try {
			getScheduler().deleteJob(jobKey);
		} catch (SchedulerException e) {
			throw e;
		}
	}
	
	public void deleteAllJob() throws SchedulerException{
		List<String> groups=getScheduler().getJobGroupNames();
		if(groups==null){
			return;
		}
		
		for(String group : groups){
			Set<JobKey> jobKeys=getScheduler().getJobKeys(GroupMatcher.jobGroupEquals(group));
			if(jobKeys==null){
				continue;
			}
			for(JobKey jobKey : jobKeys){
				getScheduler().deleteJob(jobKey);
			}
		}
	}
	
	public void deleteGroupAllJob(String groupName) throws SchedulerException{
		Set<JobKey> jobKeys=getScheduler().getJobKeys(GroupMatcher.jobGroupEquals(groupName));
		if(jobKeys==null){
			return;
		}
		for(JobKey jobKey : jobKeys){
			getScheduler().deleteJob(jobKey);
		}
	}
	
	public abstract Scheduler getScheduler();

}
