package com.tydic.common.sql.parse;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.util.StringUtils;

import com.alibaba.druid.sql.SQLUtils;
import com.alibaba.druid.sql.ast.SQLExpr;
import com.alibaba.druid.sql.ast.SQLName;
import com.alibaba.druid.sql.ast.SQLStatement;
import com.alibaba.druid.sql.ast.expr.SQLBinaryOpExpr;
import com.alibaba.druid.sql.ast.expr.SQLBinaryOperator;
import com.alibaba.druid.sql.ast.expr.SQLCharExpr;
import com.alibaba.druid.sql.ast.expr.SQLMethodInvokeExpr;
import com.alibaba.druid.sql.ast.expr.SQLVariantRefExpr;
import com.alibaba.druid.sql.ast.statement.SQLExprTableSource;
import com.alibaba.druid.sql.ast.statement.SQLInsertStatement;
import com.alibaba.druid.sql.ast.statement.SQLInsertStatement.ValuesClause;
import com.alibaba.druid.sql.ast.statement.SQLJoinTableSource;
import com.alibaba.druid.sql.ast.statement.SQLSelect;
import com.alibaba.druid.sql.ast.statement.SQLSelectItem;
import com.alibaba.druid.sql.ast.statement.SQLSelectQueryBlock;
import com.alibaba.druid.sql.ast.statement.SQLTableSource;
import com.alibaba.druid.sql.ast.statement.SQLUpdateSetItem;
import com.alibaba.druid.sql.parser.SQLExprParser;
import com.alibaba.druid.sql.parser.SQLParserUtils;
import com.alibaba.druid.sql.parser.SQLStatementParser;
import com.alibaba.druid.stat.TableStat.Column;
import com.alibaba.druid.stat.TableStat.Condition;
import com.alibaba.druid.util.JdbcConstants;
import com.alibaba.druid.util.JdbcUtils;
import com.tydic.common.sql.parse.visitor.SafeHiveSchemaStatVisitor;
import com.tydic.common.sql.parse.visitor.SafeMySqlSchemaStatVisitor;
import com.tydic.common.sql.parse.visitor.SafeOracleSchemaStatVisitor;
import com.tydic.common.sql.parse.visitor.SafeSchemaStatVisitor;

public class SafeSqlParse {
	
	private SQLStatementParser parser;
	private SQLStatement stmt;
	private SafeSchemaStatVisitor visitor;
	private SqlRewrite sqlRewrite;
	private String sql;
	
	public SafeSqlParse(){}
	
	public SafeSqlParse(SqlRewrite sqlRewrite){
		this.sqlRewrite=sqlRewrite;
	}

	public void parse(String _sql,String dbType){
		parser = SQLParserUtils.createSQLStatementParser(_sql, dbType);
		stmt=parser.parseStatement();
		
		if(JdbcConstants.MYSQL.equals(dbType)){
			visitor=new SafeMySqlSchemaStatVisitor(sqlRewrite);
		}else if(JdbcConstants.ORACLE.equals(dbType)){
			visitor=new SafeOracleSchemaStatVisitor(sqlRewrite);
		}else if(JdbcConstants.HIVE.equals(dbType)){
			visitor=new SafeHiveSchemaStatVisitor(sqlRewrite);
		}
		stmt.accept(visitor);
		
		if(sqlRewrite!=null){
			List<List<Condition>> mergedConditionList=getConditionList();
			if(mergedConditionList!=null){
				for(List<Condition> conditions : mergedConditionList){
					if(conditions==null){
						continue;
					}
					for(Condition condition : conditions){
						sqlRewrite.conditionRewirte(condition,visitor.getConditionExprMap().get(condition));
					}
				}
			}
		}
		
		sql=SQLUtils.toSQLString(stmt, dbType, new SQLUtils.FormatOption(true, false, false));
	}
	
	public Collection<Column> getColumn(){
		return visitor.getColumns();
	}
	
	public Map<String, String> getAliasMap(){
		return visitor.getAliasMap();
	}
	
	public SQLStatement getSQLStatement(){
		return stmt;
	}
	
	public SafeSchemaStatVisitor getVisitor() {
		return visitor;
	}

	public String getSql(){
		return sql;
	}
	
	public Set<String> getTableNames(){
		Set<String> tableNames=new HashSet<String>();
		Iterator<String> iter=visitor.getAliasMap().values().iterator();
		while(iter.hasNext()){
			String tableName=iter.next();
			if(StringUtils.isEmpty(tableName)){
				continue;
			}
			tableNames.add(tableName.toLowerCase());
		}
		return tableNames;
	}
	
	public List<List<Condition>> getConditionList() {
		List<List<Condition>> mergedConditionList = new ArrayList<List<Condition>>();
		if(visitor.hasOrCondition()) {//包含or语句
			//根据or拆分
			mergedConditionList = visitor.splitConditions();
		} else {
			//不包含OR语句
			mergedConditionList.add(visitor.getConditions());
		}

		return mergedConditionList;
	}
	
	public void getSQLStatementTables(SQLTableSource tablesource,Map<String,String> selectTables){
		if (tablesource instanceof SQLJoinTableSource) {//关联表
			SQLJoinTableSource joinTableSource = (SQLJoinTableSource) tablesource;
			getSQLStatementTables(joinTableSource.getLeft(),selectTables);
			getSQLStatementTables(joinTableSource.getRight(),selectTables);
		} else if (tablesource instanceof SQLExprTableSource) {//原表
			SQLExpr tableSourceExpr = ((SQLExprTableSource) tablesource).getExpr();
			if (tableSourceExpr instanceof SQLName) {
				String tableName = ((SQLName) tableSourceExpr).toString();
				selectTables.put(tableName,tablesource.getAlias());
			}
		}
	}
	
	public void addSelectWhereExpr(SQLSelect sqlselect,String whereExprStr){
		SQLSelectQueryBlock query = (SQLSelectQueryBlock) sqlselect.getQuery();
		SQLExprParser exprParser = SQLParserUtils.createExprParser(whereExprStr, JdbcUtils.MYSQL);
        SQLExpr whereExpr = query.getWhere();
        // 修改where表达式
        if (whereExpr == null) {
            query.setWhere(exprParser.expr());
        } else {
            SQLBinaryOpExpr newWhereExpr = new SQLBinaryOpExpr(whereExpr, SQLBinaryOperator.BooleanAnd, exprParser.expr());
            query.setWhere(newWhereExpr);
        }
        sqlselect.setQuery(query);
	}
	
	public static void main(String[] args) {
		String sql="select a.user_code,a.user_name,b.org_name,(select role_name from role where id=a.role_id) "
				+ "from tb_user a "
				+ "join ("
				+ "select b1.id,b1.org_code,b1.org_name from tb_org b1 join test b2 on b1.id=b2.org_id where b1.org_type=1 and b1.org_level=1"
				+ ") b on a.org_id=b.id where a.name=? and a.type=1";
		//sql="insert into user(id,user_code,user_name) select id,user_code,user_name from user_1";
		//sql="update user set user_code=?,user_name=? where id=?";
		//sql="select id,user_code,user_name from user a where id in(1,2,3)";
		//sql="select DATASOURCE_NAME||'('|| DATASOURCE_CODE ||')' from SAFE_ASSET_DATASOURCE where DATASOURCE_NAME like '%'||?||'%'";
		sql="show databases";
		SafeSqlParse parse=new SafeSqlParse();
		parse.parse(sql,JdbcConstants.HIVE);
		System.out.println(parse.getVisitor().getColumns());
		System.out.println(parse.getConditionList());
		System.out.println(parse.getVisitor().getSubQuerys());
		System.out.println(parse.getTableNames());
	}
	
	static class TestSqlRewrite implements SqlRewrite{
		@Override
		public void updateSqlRewirte(String tableName, SQLUpdateSetItem x) {
			//SQLIdentifierExpr column=((SQLIdentifierExpr) x.getColumn());
	    	SQLExpr expr=x.getValue();
	    	
	    	SQLMethodInvokeExpr unhexExpr=new SQLMethodInvokeExpr("HEX");
    		unhexExpr.addParameter(expr);
    		
    		SQLMethodInvokeExpr aesExpr=new SQLMethodInvokeExpr("AES_ENCRYPT");
    		aesExpr.addParameter(unhexExpr);
    		aesExpr.addParameter(new SQLCharExpr("123"));
    		x.setValue(aesExpr);
		}
		
		@Override
		public void selectSqlRewirte(Column column, SQLSelectItem x) {
			SQLExpr expr=x.getExpr();
			
    		SQLMethodInvokeExpr unhexExpr=new SQLMethodInvokeExpr("UNHEX");
    		unhexExpr.addParameter(expr);
    		
    		SQLMethodInvokeExpr aesExpr=new SQLMethodInvokeExpr("AES_DECRYPT");
    		aesExpr.addParameter(unhexExpr);
    		aesExpr.addParameter(new SQLCharExpr("123"));
			
    		x.setExpr(aesExpr);
		}
		
		@Override
		public void insertSqlRewirte(String tableName, ValuesClause x) {
			SQLInsertStatement stmt=((SQLInsertStatement)x.getParent());
			List<SQLExpr> columns=stmt.getColumns();
			for(int i=0;i<columns.size();i++){
				SQLExpr expr=null;
				if(x.getValues().get(i) instanceof SQLCharExpr){
					 expr=	((SQLCharExpr)x.getValues().get(i));	
				}else if(x.getValues().get(i) instanceof SQLVariantRefExpr){
					 expr=	((SQLVariantRefExpr)x.getValues().get(i));	
				}
				
				SQLMethodInvokeExpr unhexExpr=new SQLMethodInvokeExpr("HEX");
	    		unhexExpr.addParameter(expr);
	    		
	    		SQLMethodInvokeExpr aesExpr=new SQLMethodInvokeExpr("AES_ENCRYPT");
	    		aesExpr.addParameter(unhexExpr);
	    		aesExpr.addParameter(new SQLCharExpr("123"));
				
				x.getValues().set(i, aesExpr);
			}
			
		}
		
		@Override
		public void conditionRewirte(Condition condition, SQLBinaryOpExpr x) {
			SQLMethodInvokeExpr unhexExpr=new SQLMethodInvokeExpr("UNHEX");
    		unhexExpr.addParameter(x.getLeft());
    		
    		SQLMethodInvokeExpr aesExpr=new SQLMethodInvokeExpr("AES_DECRYPT");
    		aesExpr.addParameter(unhexExpr);
    		aesExpr.addParameter(new SQLCharExpr("123"));
			
    		x.setLeft(aesExpr);
		}
	}
	
}
