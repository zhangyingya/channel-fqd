package com.tydic.common.utils;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.tydic.common.db.DatabaseOperate;

public class DataBaseUtil {

	
	public DataBaseUtil() {
	}

	// 初始化日志
	public static final Logger logger = LoggerFactory.getLogger(DataBaseUtil.class);
	
	/**
	 * hive 数据库和impala数据库driver
	 */
	public static final String HIVE_DRIVER = "org.apache.hive.jdbc.HiveDriver";
	
	/**
	 * hive 数据库和impala数据库url前缀
	 */
	private static final String HIVE_URL = "jdbc:hive2://";
	
	
	
	/**
	 * @param serviceType 服务类型
	 * @param ipAndPort 案例格式 1.0.0.0:8000
	 */
	public static DatabaseOperate getOperater(String serviceType,String ipAndPort){
		DatabaseOperate operate = null;
		try {
			operate =  new DatabaseOperate(HIVE_DRIVER, getUrl(serviceType,ipAndPort), null, null);
		} catch (Exception e) {
			e.printStackTrace();
		};
		return operate;
	}
	
	/**
	 * @param serviceType 服务类型
	 * @param ipAndPort 案例格式 1.0.0.0:8000
	 */
	private static String getUrl(String serviceType,String ipAndPort){
		String url = "";
		try {
			if(serviceType.equals("Hive")){
				url = DataBaseUtil.HIVE_URL+ipAndPort;
				return url;
			}else if(serviceType.equals("Impala")){
				url = DataBaseUtil.HIVE_URL+ipAndPort+"/default;auth=noSasl";
				return url;
			}else{
				throw new Exception("该服务类型暂未配备！");
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return url;
	}
	
	public static String getHiveUrl (String ip,String port) {
		
		return DataBaseUtil.HIVE_URL+ip+":"+port;
	}
	
	public static String getImpalaUrl (String ip,String port) {
		
		return DataBaseUtil.HIVE_URL+ip+":"+port+"/default;auth=noSasl";
	}
	
	/**
	 * 获取hive or Impala下所有的数据库
	 * @param operate
	 * @param params
	 * @return
	 */
	public static List<Map<String, Object>> getHiveOrImpalaDataBase(DatabaseOperate operate,Object params){
		
		String sql = "show databases";
		
		List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
		try {
			operate.executeQuery(list, sql, params);
		} catch (SQLException e) {
			logger.error(e.getMessage());
			e.printStackTrace();
		}
		return list;
	}
	
	/**
	 * 查询hive or Impala数据库下所有的表
	 * @param operate
	 * @param dbName
	 * @return
	 */
	public static List<Map<String, Object>> getHiveOrImpalaTables(DatabaseOperate operate,String dbName,Object params){
		
		String sql = "show tables in "+dbName;
		List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
		try {
			operate.executeQuery(list, sql, params);
		} catch (SQLException e) {
			logger.error(e.getMessage());
			e.printStackTrace();
		}
		
		return list;
	}
	
	/**
	 * 查询hive表中的字段信息
	 * @param operate
	 * @param tableName
	 * @param params
	 * @return
	 */
	public static List<Map<String, Object>> getHiveTableField(DatabaseOperate operate,String dbName,String tableName,Object params){
		
		String useSql = "use "+dbName;
		String sql = "desc "+tableName;
		List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
		try {
			operate.execute(useSql, params);
			operate.executeQuery(list, sql, params);
		} catch (SQLException e) {
			logger.error(e.getMessage());
			e.printStackTrace();
		}
		return list;
	}
	
	/**
	 * 查询hive表中的字段信息
	 * @param operate
	 * @param tableName
	 * @param params
	 * @return
	 */
	public static List<Map<String, Object>> getImpalaTableField(DatabaseOperate operate,String dbName,String tableName,Object params){
		
		String useSql = "use "+dbName;
		String sql = "show column stats "+tableName;
		List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
		try {
			operate.execute(useSql, params);
			operate.executeQuery(list, sql, params);
		} catch (SQLException e) {
			logger.error(e.getMessage());
			e.printStackTrace();
		}
		return list;
	}
	
}
