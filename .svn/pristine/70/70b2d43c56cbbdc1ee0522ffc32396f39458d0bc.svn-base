package com.tydic.common;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Properties;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.DefaultResourceLoader;
import org.springframework.core.io.ResourceLoader;

public class Config {
	private final static Logger log=LoggerFactory.getLogger(Config.class);
	
	private static ResourceLoader resourceLoader = new DefaultResourceLoader();
	private static Properties property = null;
	static {
		property = new Properties();
		InputStream is = null;
		try {
			is = resourceLoader.getResource("classpath:/config.properties").getInputStream();
			BufferedReader reader = new BufferedReader(new InputStreamReader(is,"UTF-8"));     
			property.load(reader);
		} catch (Exception e) {
			log.error(e.getMessage(),e);
		} finally{
			try {
				is.close();
			} catch (Exception ex) {
			}
		}
	}
	
	public static List<String> getKeys(){
		List<String> keys=null;
		Iterator<Object> i=property.keySet().iterator();
		while(i.hasNext()){
			if(keys==null){
				keys=new ArrayList<String>();
			}
			String key=(String)i.next();
			keys.add(key);
		}
		return keys;
	}

	public static String getString(String key) {
		return getString(key, null);
	}

	public static String getString(String key, String def) {
		if (property.getProperty(key) != null) {
			return property.getProperty(key,"");
		} else if (System.getProperty(key) != null) {
			return System.getProperty(key);
		} else if (System.getenv(key) != null) {
			return System.getenv(key);
		} else {
			return def;
		}
	}

	public static int getInt(String key) {
		return getInt(key, 0);
	}
	
	public static long getLong(String key) {
		return getLong(key, 0);
	}

	public static int getInt(String key, int def) {
		try {
			return Integer.parseInt(getString(key));
		} catch (Exception e) {
			return def;
		}
	}
	
	public static long getLong(String key, long def) {
		try {
			return Long.parseLong(getString(key));
		} catch (Exception e) {
			return def;
		}
	}
	
	public static double getDouble(String key) {
		return getDouble(key, 0);
	}
	
	public static double getDouble(String key, int def) {
		try {
			return Double.parseDouble(getString(key));
		} catch (Exception e) {
			return def;
		}
	}

	public static boolean getBoolean(String key) {
		return getBoolean(key, false);
	}

	public static boolean getBoolean(String key, boolean def) {
		try {
			return Boolean.parseBoolean(getString(key));
		} catch (Exception e) {
			return def;
		}
	}
}
