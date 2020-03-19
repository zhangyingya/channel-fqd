package com.tydic.common.utils;

import lombok.extern.slf4j.Slf4j;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
/**
 * Jackson工具类
 * @author Administrator
 *
 */
@Slf4j
public class JsonUtil {
	
	/**
	 * Jackson 对象转字符串
	 * @param object
	 * @return
	 */
	public static String objToStr(Object object) {
		String str = "";
		
		ObjectMapper mapper = new ObjectMapper();
		
		try {
			str = mapper.writeValueAsString(object);
		} catch (JsonProcessingException e) {
			log.error(object + "转字符串失败： {}", e.getMessage());
		}
		
		return str;
	}

}
