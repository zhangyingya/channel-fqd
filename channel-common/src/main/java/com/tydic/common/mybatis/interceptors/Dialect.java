package com.tydic.common.mybatis.interceptors;

/**
 * 
 * @author fubin {@link fubin@tydic.com} 
 *
 */
public interface Dialect {

	public String getLimitString(String sql, int start, int end);
	
}
