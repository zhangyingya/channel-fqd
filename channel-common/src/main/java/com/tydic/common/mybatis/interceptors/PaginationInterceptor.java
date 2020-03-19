/*
 * Copyright © 2016，the original authors or Tianyuan DIC Computer Co., Ltd.
 *
 * Please see the tydic success stories and it solutions 
 *
 *      http://www.tydic.com/Default.aspx
 *
 * Statement: This document's code after sufficiently has not permitted does not have 
 * any way dissemination and the change, once discovered violates the stipulation, will
 * receive the criminal sanction.
 * Address: 3/F,T3 Building, South 7th Road, South Area, Hi-tech Industrial park, Shenzhen, P.R.C.
 * Email: fubin@tydic.com　
 * Tel: +86 17355100932 
 */
package com.tydic.common.mybatis.interceptors;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Properties;

import org.apache.ibatis.executor.ErrorContext;
import org.apache.ibatis.executor.Executor;
import org.apache.ibatis.executor.ExecutorException;
import org.apache.ibatis.mapping.BoundSql;
import org.apache.ibatis.mapping.MappedStatement;
import org.apache.ibatis.mapping.ParameterMapping;
import org.apache.ibatis.mapping.ParameterMode;
import org.apache.ibatis.mapping.SqlSource;
import org.apache.ibatis.plugin.Interceptor;
import org.apache.ibatis.plugin.Intercepts;
import org.apache.ibatis.plugin.Invocation;
import org.apache.ibatis.plugin.Plugin;
import org.apache.ibatis.plugin.Signature;
import org.apache.ibatis.reflection.MetaObject;
import org.apache.ibatis.reflection.property.PropertyTokenizer;
import org.apache.ibatis.scripting.xmltags.ForEachSqlNode;
import org.apache.ibatis.session.Configuration;
import org.apache.ibatis.session.ResultHandler;
import org.apache.ibatis.session.RowBounds;
import org.apache.ibatis.type.TypeHandler;
import org.apache.ibatis.type.TypeHandlerRegistry;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.StringUtils;

import com.tydic.common.BaseBean;
import com.tydic.common.PageContext;
import com.tydic.common.exception.PaginationException;


/**
 *	//TODO
 *
 * @author fubin {@link fubin@tydic.com} 
 * @version  fp 下午4:51:36
 * @since 1.0
 **/
@Intercepts( { @Signature(type = Executor.class, method = "query", args = { MappedStatement.class, Object.class, RowBounds.class, ResultHandler.class }), 
@Signature(type = Executor.class,  
method = "update",  
args = {MappedStatement.class, Object.class})})
public class PaginationInterceptor extends BaseInterceptor implements Interceptor {

	private static final Logger logger = LoggerFactory.getLogger(PaginationInterceptor.class.getName());

	private Dialect dialect;

	@Override
	public Object intercept(Invocation arg0) throws Throwable {
		MappedStatement mappedStatement = (MappedStatement) arg0.getArgs()[0];

		Object parameter = arg0.getArgs()[1];
		BoundSql boundSql = mappedStatement.getBoundSql(parameter);
		if (null == boundSql || StringUtils.isEmpty(boundSql.getSql())) {
			return null;
		}
		String replaceSql = boundSql.getSql();
		if(replaceSql.startsWith("update") || replaceSql.startsWith("UPDATE")) {
			// 修改
			return arg0.proceed();
		} else if(replaceSql.startsWith("select") || replaceSql.startsWith("SELECT")) {
			// 查询
			RowBounds rowBounds = (RowBounds) arg0.getArgs()[2];
			Object parameterObject = boundSql.getParameterObject();
			BaseBean model = null;
			// String replaceSql = ibatisExecutor.executor(boundSql.getSql());
//			logger.debug(replaceSql);
			if (PageContext.getPageContext() != null) {
				model = PageContext.getPageContext();
			} else if (parameterObject instanceof BaseBean) {
				model = (BaseBean) parameterObject;
			} else {
				BoundSql newBoundSql = new BoundSql(mappedStatement.getConfiguration(), replaceSql, boundSql.getParameterMappings(), boundSql.getParameterObject());
				arg0.getArgs()[0] = copyFromMappedStatement(mappedStatement, new BoundSqlSqlSource(newBoundSql));
				return arg0.proceed();
			}
			if (null!=model&&model.getPageNo() == -1) {
				BoundSql newBoundSql = new BoundSql(mappedStatement.getConfiguration(), replaceSql, boundSql.getParameterMappings(), boundSql.getParameterObject());
				arg0.getArgs()[0] = copyFromMappedStatement(mappedStatement, new BoundSqlSqlSource(newBoundSql));
				return arg0.proceed();
			}
			if (null == model) {
				throw new PaginationException("无法获取分页参数.");
			}
			if (model.getCountFlag()) {
				queryTotal(mappedStatement, replaceSql, parameterObject, boundSql);
			}
			if (null == rowBounds || rowBounds == RowBounds.DEFAULT) {
				rowBounds = new RowBounds(model.getPageSize() * (model.getPageNo() - 1), model.getPageSize() * model.getPageNo());
			}
			String pagesql = null;
			if(dialect instanceof OracleDialect) {
				pagesql = dialect.getLimitString(replaceSql, rowBounds.getOffset(), rowBounds.getLimit());
			} else {
				pagesql = dialect.getLimitString(replaceSql, rowBounds.getOffset(), model.getPageSize());
			}
			arg0.getArgs()[2] = new RowBounds(RowBounds.NO_ROW_OFFSET, RowBounds.NO_ROW_LIMIT);
			BoundSql newBoundSql = new BoundSql(mappedStatement.getConfiguration(), pagesql, boundSql.getParameterMappings(), boundSql.getParameterObject());
			arg0.getArgs()[0] = copyFromMappedStatement(mappedStatement, new BoundSqlSqlSource(newBoundSql));
			return arg0.proceed();
		}
		return arg0.proceed();
	}

	public static class BoundSqlSqlSource implements SqlSource {
		BoundSql boundSql;

		public BoundSqlSqlSource(BoundSql boundSql) {
			this.boundSql = boundSql;
		}

		public BoundSql getBoundSql(Object parameterObject) {
			return boundSql;
		}
	}

	private void queryTotal(MappedStatement mappedStatement, String replaceSql, Object parameterObject, BoundSql boundSql) {
		StringBuffer countSql = new StringBuffer(replaceSql.length() + 100);
		countSql.append("SELECT COUNT(1) FROM (").append(replaceSql).append(") COUNTTABLE");
		logger.info(countSql.toString());
		Connection conn = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		try {
			conn = mappedStatement.getConfiguration().getEnvironment().getDataSource().getConnection();
			if (logger.isDebugEnabled()) {
				logger.debug(countSql.toString());
			}
			ps = conn.prepareStatement(countSql.toString());
			BoundSql countBS = new BoundSql(mappedStatement.getConfiguration(), countSql.toString(), boundSql.getParameterMappings(), parameterObject);
			setParameters(ps, mappedStatement, countBS, parameterObject);
			rs = ps.executeQuery();
			if (rs.next()) {
				PageContext.setPageTotal(rs.getLong(1));
			}
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			throw new PaginationException(e.getMessage(), e);
		} finally {
			try {
				if (null != rs) {
					rs.close();
				}
			} catch (Exception e) {
				logger.error("关闭rs出错!", e);
			}
			try {
				if (null != ps) {
					ps.close();
				}
			} catch (Exception e) {
				logger.error("关闭ps出错!", e);
			}
			try {
				if (null != conn) {
					conn.close();
				}
			} catch (Exception e) {
				logger.error("关闭conn出错!", e);
			}
		}
	}

	/**
	 * 对SQL参数(?)设值,参考org.apache.ibatis.executor.parameter.DefaultParameterHandler
	 * 
	 * @param ps
	 * @param mappedStatement
	 * @param boundSql
	 * @param parameterObject
	 * @throws SQLException
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	private void setParameters(PreparedStatement ps, MappedStatement mappedStatement, BoundSql boundSql, Object parameterObject) throws SQLException {
		ErrorContext.instance().activity("setting parameters").object(mappedStatement.getParameterMap().getId());
		List<ParameterMapping> parameterMappings = boundSql.getParameterMappings();
		if (parameterMappings != null) {
			Configuration configuration = mappedStatement.getConfiguration();
			TypeHandlerRegistry typeHandlerRegistry = configuration.getTypeHandlerRegistry();
			MetaObject metaObject = parameterObject == null ? null : configuration.newMetaObject(parameterObject);
			for (int i = 0; i < parameterMappings.size(); i++) {
				ParameterMapping parameterMapping = parameterMappings.get(i);
				if (parameterMapping.getMode() != ParameterMode.OUT) {
					Object value;
					String propertyName = parameterMapping.getProperty();
					PropertyTokenizer prop = new PropertyTokenizer(propertyName);
					if (parameterObject == null) {
						value = null;
					} else if (typeHandlerRegistry.hasTypeHandler(parameterObject.getClass())) {
						value = parameterObject;
					} else if (boundSql.hasAdditionalParameter(propertyName)) {
						value = boundSql.getAdditionalParameter(propertyName);
					} else if (propertyName.startsWith(ForEachSqlNode.ITEM_PREFIX) && boundSql.hasAdditionalParameter(prop.getName())) {
						value = boundSql.getAdditionalParameter(prop.getName());
						if (value != null) {
							value = configuration.newMetaObject(value).getValue(propertyName.substring(prop.getName().length()));
						}
					} else {
						value = metaObject == null ? null : metaObject.getValue(propertyName);
					}
					TypeHandler typeHandler = parameterMapping.getTypeHandler();
					if (typeHandler == null) {
						throw new ExecutorException("There was no TypeHandler found for parameter " + propertyName + " of statement " + mappedStatement.getId());
					}
					logger.debug(i + 1 + ":" + value);
					typeHandler.setParameter(ps, i + 1, value, parameterMapping.getJdbcType());
				}
			}
		}
	}

	@Override
	public Object plugin(Object arg0) {
		return Plugin.wrap(arg0, this);
	}

	@Override
	public void setProperties(Properties arg0) {

	}

	public void setDialect(Dialect dialect) {
		this.dialect = dialect;
	}

}
