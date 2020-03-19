package com.tydic.common.db;

import java.math.BigDecimal;
import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.BlockingQueue;

import org.apache.hadoop.conf.Configuration;
import org.springframework.util.StringUtils;

import com.tydic.common.hadoop.HadoopKerberosAuth;

public class DatabaseOperate {

	private Connection connection;
	
	public DatabaseOperate(String jdbcDriver,String jdbcUrl,String jdbcUsername,String jdbcPassword) throws Exception{
		try {
			Class.forName(jdbcDriver);
			connection=DriverManager.getConnection(jdbcUrl, jdbcUsername, jdbcPassword);
		} catch (Exception e) {
			throw e;
		}
	}
	
	public DatabaseOperate(String jdbcDriver,String jdbcUrl,String krb5ConfPath,String principal,String keytabPath) throws Exception{
		try {
			Configuration conf=new Configuration();
			HadoopKerberosAuth.auth(conf, principal, keytabPath, krb5ConfPath);
			
			Class.forName(jdbcDriver);
			connection=DriverManager.getConnection(jdbcUrl, null, null);
		} catch (Exception e) {
			throw e;
		}
	}
	
	public Long executeQueryTotal(String sql,Object...params) throws SQLException{
		String totalSql="select count(*) from ("+sql+") tab";
		PreparedStatement statem=null;
		try {
			statem=connection.prepareStatement(totalSql);
			
			if(params!=null){
				int parameterIndex=1;
				for(Object param : params){
					setParameter(statem, parameterIndex, param);
					parameterIndex++;
				}
			}
			
			ResultSet rs=statem.executeQuery();
			if(rs.next()){
				return rs.getLong(1);
			}
			rs.close();
		} catch (SQLException e) {
			throw e;
		} finally{
			if(statem!=null){
				try {
					statem.close();
				} catch (SQLException e) {}
			}
		}
		return 0L;
	}
	
	public void executeQuery(List<Map<String,Object>> results,String sql,Object...params) throws SQLException{
		PreparedStatement statem=null;
		try {
			statem=connection.prepareStatement(sql);
			
			if(params!=null){
				int parameterIndex=1;
				for(Object param : params){
					setParameter(statem, parameterIndex, param);
					parameterIndex++;
				}
			}
			
			ResultSet rs=statem.executeQuery();
			Map<String,Object> bean=null;
			while(rs.next()){
				bean=new HashMap<String,Object>();
				
				ResultSetMetaData metaData=rs.getMetaData();
				for(int i=1;i<=metaData.getColumnCount();i++){
					String label=metaData.getColumnLabel(i);
					if(StringUtils.isEmpty(label)){
						bean.put(metaData.getColumnName(i), rs.getObject(i));
					}else{
						bean.put(label, rs.getObject(i));
					}
				}
				results.add(bean);
			}
			rs.close();
		} catch (SQLException e) {
			throw e;
		} finally{
			if(statem!=null){
				try {
					statem.close();
				} catch (SQLException e) {}
			}
		}
	}
	
	public void executeQuery(BlockingQueue<Map<String,Object>> results,String sql,Object...params) throws Exception{
		PreparedStatement statem=null;
		try {
			statem=connection.prepareStatement(sql);
			
			if(params!=null){
				int parameterIndex=1;
				for(Object param : params){
					setParameter(statem, parameterIndex, param);
					parameterIndex++;
				}
			}
			
			ResultSet rs=statem.executeQuery();
			Map<String,Object> bean=null;
			while(rs.next()){
				bean=new HashMap<String,Object>();
				
				ResultSetMetaData metaData=rs.getMetaData();
				for(int i=1;i<=metaData.getColumnCount();i++){
					String label=metaData.getColumnLabel(i);
					if(StringUtils.isEmpty(label)){
						bean.put(metaData.getColumnName(i), rs.getObject(i));
					}else{
						bean.put(label, rs.getObject(i));
					}
				}
				results.put(bean);
			}
			rs.close();
		} catch (Exception e) {
			throw e;
		} finally{
			if(statem!=null){
				try {
					statem.close();
				} catch (SQLException e) {}
			}
		}
	}
	
	public int execute(String sql,Object...params) throws SQLException{
		PreparedStatement statem=null;
		try {
			statem=connection.prepareStatement(sql);
			
			if(params!=null){
				int parameterIndex=1;
				for(Object param : params){
					setParameter(statem, parameterIndex, param);
					parameterIndex++;
				}
			}
			
			return statem.executeUpdate();
		} catch (SQLException e) {
			throw e;
		} finally{
			if(statem!=null){
				try {
					statem.close();
				} catch (SQLException e) {}
			}
		}
	}
	
	public void batchInsert(String sql,List<Object[]> params) throws SQLException{
		if(params==null || params.size()<=0){
			return;
		}
		
		PreparedStatement statem=null;
		try {
			statem=connection.prepareStatement(sql);
			for(Object[] objs : params){
				int parameterIndex=1;
				for(Object obj : objs){
					setParameter(statem, parameterIndex, obj);
					parameterIndex++;
				}
				statem.addBatch();
			}
			
			statem.executeBatch();
		} catch (SQLException e) {
			throw e;
		} finally{
			if(statem!=null){
				try {
					statem.close();
				} catch (SQLException e) {}
			}
		}
	}
	
	private void setParameter(PreparedStatement statem,int parameterIndex,Object param) throws SQLException{
		if(param==null){
			//throw new SQLException("不支持空值");
			statem.setNull(parameterIndex, java.sql.Types.NULL);
		}else if(param instanceof Integer){
			statem.setInt(parameterIndex, (Integer)param);
		} else if(param instanceof Short){
			statem.setShort(parameterIndex, (Short)param);
		} else if(param instanceof Long){
			statem.setLong(parameterIndex, (Long)param);
		} else if(param instanceof Float){
			statem.setFloat(parameterIndex, (Float)param);
		} else if(param instanceof Double){
			statem.setDouble(parameterIndex, (Double)param);
		} else if(param instanceof BigDecimal){
			statem.setBigDecimal(parameterIndex, (BigDecimal)param);
		} else if(param instanceof String){
			statem.setString(parameterIndex, (String)param);
		} else if(param instanceof Date){
			statem.setTimestamp(parameterIndex, new Timestamp(((Date)param).getTime()));
		} else if(param instanceof Timestamp){
			statem.setTimestamp(parameterIndex, (Timestamp)param);
		} else if(param instanceof Boolean){
			statem.setBoolean(parameterIndex, (Boolean)param);
		} else if(param instanceof byte[]){
			statem.setBytes(parameterIndex, (byte[])param);
		} else{
			throw new SQLException("不支持数据类型："+param.getClass().getName());
		}
	}
	
	public boolean existTable(String tableName) throws SQLException{
		try {
			DatabaseMetaData metaData=connection.getMetaData();
			ResultSet rs=metaData.getTables(null, null, tableName, null);
			boolean exist=rs.next();
			rs.close();
			return exist;
		} catch (SQLException e) {
			throw e;
		}
	}
	
	public void close(){
		if(connection!=null){
			try {
				connection.close();
			} catch (SQLException e) {}
		}
	}

	public Connection getConnection() {
		return connection;
	}
}
