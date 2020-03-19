package com.tydic.common.utils;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.CountDownLatch;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class RuntimeUtil {

	private final static Logger LOG=LoggerFactory.getLogger(RuntimeUtil.class);
	
	public static List<List<String>> run(String cmd,String charsetName)throws Exception{
		Process pro=null;
		try {
			pro = Runtime.getRuntime().exec(cmd);
		} catch (IOException e) {
			throw e;
		}
		
		final List<String> resultList=new ArrayList<String>();
		final List<String> errResultList=new ArrayList<String>();
		CountDownLatch cdl=new CountDownLatch(2);
		if(pro!=null){
			//读取cmd的输出
			new DoOutput(pro.getInputStream(),resultList,cdl,charsetName).start();
			new DoOutput(pro.getErrorStream(),errResultList,cdl,charsetName).start();
		}
		
		//调用waitFor方法，阻塞当前进程，直到cmd执行完
		/*try {
			pro.waitFor();
		} catch (InterruptedException e) {
			LOG.error(e.getMessage(),e);
		}*/
		try {
			cdl.await();
		} catch (InterruptedException e) {
			LOG.error(e.getMessage(),e);
		}
		return Arrays.asList(resultList,errResultList);
	}
	
	public static List<List<String>> run(String cmd,File dir,String charsetName)throws Exception{
		Process pro=null;
		try {
			pro = Runtime.getRuntime().exec(cmd, null, dir);
		} catch (IOException e) {
			throw e;
		}
		
		final List<String> resultList=new ArrayList<String>();
		final List<String> errResultList=new ArrayList<String>();
		CountDownLatch cdl=new CountDownLatch(2);
		if(pro!=null){
			//读取cmd的输出
			new DoOutput(pro.getInputStream(),resultList,cdl,charsetName).start();
			new DoOutput(pro.getErrorStream(),errResultList,cdl,charsetName).start();
		}
		
		//调用waitFor方法，阻塞当前进程，直到cmd执行完
		/*try {
			pro.waitFor();
		} catch (InterruptedException e) {
			LOG.error(e.getMessage(),e);
		}*/
		try {
			cdl.await();
		} catch (InterruptedException e) {
			LOG.error(e.getMessage(),e);
		}
		return Arrays.asList(resultList,errResultList);
	}
	
	/**
	 * 
	 * 接收终端输出
	 * @ClassName: DoOutput 
	 * @author huanglinfeng@tydic.com
	 * @date 2017年6月9日 下午5:18:53 
	 *
	 */
	static class DoOutput extends Thread {
		public InputStream is;
		public List<String> result;
		public CountDownLatch cdl;
		private String charsetName;

		public DoOutput(InputStream is,List<String> result,CountDownLatch cdl,String charsetName) {
			this.is = is;
			this.result=result;
			this.cdl=cdl;
			this.charsetName=charsetName;
		}

		@Override
		public void run() {
			BufferedReader br = null;
			String str=null;
			try {
				if(charsetName!=null){
					br = new BufferedReader(new InputStreamReader(is,charsetName));
				}else {
					br = new BufferedReader(new InputStreamReader(is));
				}
				// 这里并没有对流的内容进行处理，只是读了一遍
				while ((str=br.readLine()) != null){
					result.add(str.trim());
				}
			} catch (Exception e) {
				LOG.error(e.getMessage(),e);
			} finally {
				if (br != null) {
					try {
						br.close();
					} catch (IOException e) {
					}
				}
			}
			
			cdl.countDown();
		}
	}
}
