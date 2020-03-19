package com.tydic.common.comp;

import java.util.Random;

import org.springframework.stereotype.Component;

import com.tydic.common.cache.CacheManager;

/**
 * APP 验证码生成组件
 * @author liss
 *
 */
@Component
public class CodeComponent {
	
	public final static String staticsCodeMode = "staticsCode-10019";//静态验证码模式
	
	public final static String phoneCodeMode = "phoneCode-10019";//手机验证码模式

	//静态4位验证码生成并存储redis
	public String staticsCode(String IMEI){
		String str="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
		StringBuilder sb=new StringBuilder(4);
		
		for(int i=0;i<4;i++){
			char ch=str.charAt(new Random().nextInt(str.length()));
			sb.append(ch);
		}
		CacheManager.instance.set(IMEI+"-"+staticsCodeMode, sb.toString());
		
		return sb.toString();
	}
	
	//手机验证按生成并存储redis
	public String phoneCode(String telNbr){
		StringBuilder sb = new StringBuilder(6);
		Random random = new Random();
		for (int i = 0; i < 6; i++) {
			int r = random.nextInt(10);
			sb.append(r);
		}
		//时效5min
		CacheManager.instance.set(telNbr+"-"+phoneCodeMode, sb.toString(),300);
		return sb.toString();
	}
	
	//获取静态验证码
	public String getStaticsCode(String IMEI){
		String code = CacheManager.instance.get(IMEI+"-"+staticsCodeMode);
		return code;
	}
	
	//获取手机验证码
	public String getPhoneCode(String telNbr){
		String code = CacheManager.instance.get(telNbr+"-"+phoneCodeMode);
		return code;
	}
	
}
