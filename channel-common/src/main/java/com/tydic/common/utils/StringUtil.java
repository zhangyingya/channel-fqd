package com.tydic.common.utils;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class StringUtil {

	/**
	 * 字符串去空格、回车、指标
	 * @Title: replaceBlank 
	 * @author huanglinfeng@tydic.com
	 * @date 2017年7月12日 上午9:47:58
	 * 
	 * @param str
	 * @return
	 */
	public static String replaceBlank(String str) {
		String dest = "";
		if (str!=null) {
			Pattern p = Pattern.compile("\\s*|\t|\r|\n");
			Matcher m = p.matcher(str);
			dest = m.replaceAll("");
		}
		return dest;
	}
	
	public static String concat(String...strings){
		if(strings==null){
			return null;
		}
		
		StringBuilder sb=new StringBuilder();
		for(String str : strings){
			sb.append(str);
		}
		return sb.toString();
	}
	
}
