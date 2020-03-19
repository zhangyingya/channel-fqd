package com.tydic.schedule.task;

import org.quartz.DisallowConcurrentExecution;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.quartz.PersistJobDataAfterExecution;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.tydic.common.SpringContext;

@PersistJobDataAfterExecution
@DisallowConcurrentExecution
public class LoadCodeTask implements Job {
	
	private final Logger logger=LoggerFactory.getLogger(LoadCodeTask.class);
	
	@Override
	public void execute(JobExecutionContext context) throws JobExecutionException {
		try {
			if(SpringContext.getApplicationContext() == null) {
				return;
			}
			
			//TODO 待实现...
		} catch (Exception e) {
			logger.error(e.getMessage(),e);
		}
		
	}

}
