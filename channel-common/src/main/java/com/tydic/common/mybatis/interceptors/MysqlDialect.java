package com.tydic.common.mybatis.interceptors;

/**
 * 
 * @author yuanxh
 *
 */
public class MysqlDialect implements Dialect {

	@Override
	public String getLimitString(String sql, int start, int limit) {
		
		StringBuffer sb = new StringBuffer(sql.length() + 230);
		sb.append(sql);
		sb.append(" LIMIT ").append(start).append(",").append(limit);
		return sb.toString();
	}

}
