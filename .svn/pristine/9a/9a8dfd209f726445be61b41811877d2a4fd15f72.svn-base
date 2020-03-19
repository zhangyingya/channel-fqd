package com.tydic.common.sql.druid.filter;

import java.sql.SQLException;

import com.alibaba.druid.filter.FilterAdapter;
import com.alibaba.druid.filter.FilterChain;
import com.alibaba.druid.proxy.jdbc.ConnectionProxy;
import com.alibaba.druid.proxy.jdbc.PreparedStatementProxy;
import com.alibaba.druid.proxy.jdbc.ResultSetProxy;
import com.alibaba.druid.proxy.jdbc.StatementProxy;

public class SafeFilter extends FilterAdapter{
	@Override
	public ResultSetProxy statement_executeQuery(FilterChain chain, StatementProxy statement, String sql) throws SQLException {
		return chain.statement_executeQuery(statement, sql);
	}
	
    @Override
    public boolean statement_execute(FilterChain chain, StatementProxy statement, String sql) throws SQLException {
        return chain.statement_execute(statement, sql);
    }
    
	@Override
	public int statement_executeUpdate(FilterChain chain, StatementProxy statement, String sql) throws SQLException {
		
		return chain.statement_executeUpdate(statement, sql);
	}
	
	@Override
    public PreparedStatementProxy connection_prepareStatement(FilterChain chain, ConnectionProxy connection, String sql) throws SQLException { 
		
        return chain.connection_prepareStatement(connection, sql);
    }
	
    @Override
	public boolean preparedStatement_execute(FilterChain chain, PreparedStatementProxy statement) throws SQLException {
		return chain.preparedStatement_execute(statement);
	}

	@Override
	public ResultSetProxy preparedStatement_executeQuery(FilterChain chain, PreparedStatementProxy statement)
			throws SQLException {
		return chain.preparedStatement_executeQuery(statement);
	}

	@Override
	public int preparedStatement_executeUpdate(FilterChain chain, PreparedStatementProxy statement)
			throws SQLException {
		return chain.preparedStatement_executeUpdate(statement);
	}

	@Override
    public String resultSet_getString(FilterChain chain, ResultSetProxy result, int columnIndex) throws SQLException {
    	return chain.resultSet_getString(result, columnIndex);
    }

    @Override
    public String resultSet_getString(FilterChain chain, ResultSetProxy result, String columnLabel) throws SQLException {
    	return chain.resultSet_getString(result, columnLabel);
    }

}
