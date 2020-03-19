package com.tydic.common.utils;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Random;

import com.tydic.common.SpringContext;

/**
 * 密码处理
 * @author yuanxh
 *
 */
public class PwdHandler {
	
	/**
	 * 加密
	 * @param origin
	 * @return
	 */
	public static String md5Encode(String origin) {
			return MD5Encrypt16.md5Encode(origin);
	}
	
	/**
	 * 生成密码
	 * @return
	 */
	public static String generatePwd() {
			String initPwd = SpringContext.getProperty("system.initPwd");
			return initPwd;
		
	}
	
	/**
	 * 随机生成六位数字密码
	 * @return
	 */
	private static String generatePwd_def() {
		StringBuffer sb = new StringBuffer();
		String[] arr1 = {"~","!","@","#","&","*"};
		String[] arr2 = {"A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"};
		Random r = new Random();
		// 字符
		for(int i=0;i<2;i++) {
			int rand1 = r.nextInt(arr1.length-1);
			sb.append(arr1[rand1]);
		}
		// 字母
		for(int i=0;i<3;i++) {
			int rand2 = r.nextInt(arr2.length-1);
			if(i==1) {
				sb.append(arr2[rand2]);
			} else {
				sb.append(arr2[rand2].toLowerCase());
			}
		}
		// 数字
		sb.append((r.nextDouble()+"").substring(3,6));
		
		char[] ch = sb.toString().toCharArray();
		List<String> pwdList = new ArrayList<String>();
		for(int i=0; i<ch.length; i++) {
			pwdList.add(ch[i]+"");
		}
		Collections.shuffle(pwdList);
		String pwd = "";
		for(int i=0; i<pwdList.size(); i++) {
			pwd += pwdList.get(i);
		}
		return pwd;
	}

}
