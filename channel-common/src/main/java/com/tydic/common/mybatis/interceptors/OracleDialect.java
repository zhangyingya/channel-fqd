package com.tydic.common.mybatis.interceptors;

/**
 * 
 * @author yuanxh
 *
 */
public class OracleDialect implements Dialect {

	@Override
	public String getLimitString(String sql, int start, int end) {
		
		StringBuffer sb = new StringBuffer(sql.length() + 230);
		sb.append(" SELECT B.* FROM (SELECT A.*,ROWNUM AS LINENUM FROM (");
		sb.append(sql);
		sb.append(" ) A WHERE ROWNUM <= ").append(end + ")");
		sb.append(" B WHERE LINENUM > ").append(start);
		return sb.toString();
	}

}
