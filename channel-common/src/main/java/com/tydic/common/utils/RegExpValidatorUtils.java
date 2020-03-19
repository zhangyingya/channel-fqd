package com.tydic.common.utils;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public final class RegExpValidatorUtils {
	/**
	 * 验证脱敏样例合法性
	 * 
	 * @param 待验证的字符串
	 * @return 如果是符合的字符串,返回 <b>true </b>,否则为 <b>false </b>
	 */
	public static String checkDensenRule(String str,String regex,int size) {
				return match(regex, str,size);
		
	}

	/**
	 * @param regex
	 *            正则表达式字符串
	 * @param str
	 *            要匹配的字符串
	 * @return 如果str 符合 regex的正则表达式格式,返回true, 否则返回 false;
	 */
	private static String match(String regex, String str,int size) {
		Pattern pattern = Pattern.compile(regex);
		Matcher matcher = pattern.matcher(str);
		
		String replace = "*";
		for(int i=1;i<size;i++){
			replace+="*";
		}
		String s = matcher.replaceAll(replace);
		return s;
	}
}
