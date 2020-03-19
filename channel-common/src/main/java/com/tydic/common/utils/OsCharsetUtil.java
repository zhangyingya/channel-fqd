package com.tydic.common.utils;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class OsCharsetUtil {

	private final static Logger LOG=LoggerFactory.getLogger(OsCharsetUtil.class);
	
	public static String getLinuxCharsetName(){
		List<List<String>> result=null;
		try {
			result=RuntimeUtil.run("echo $LANG", null);
		} catch (Exception e) {
			LOG.error(e.getMessage(),e);
		}
		
		if(result==null || result.get(0)==null){
			return null;
		}
		
		if(result.get(0).get(0)==null){
			return null;
		}
		
		String[] arr=result.get(0).get(0).split("\\.");
		if(arr.length<2){
			return null;
		}
		
		return arr[1];
	}
	
}
