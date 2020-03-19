package com.tydic.common.sql.parse;

import com.alibaba.druid.sql.ast.expr.SQLBinaryOpExpr;
import com.alibaba.druid.sql.ast.statement.SQLInsertStatement.ValuesClause;
import com.alibaba.druid.sql.ast.statement.SQLSelectItem;
import com.alibaba.druid.sql.ast.statement.SQLUpdateSetItem;
import com.alibaba.druid.stat.TableStat.Column;
import com.alibaba.druid.stat.TableStat.Condition;

public interface SqlRewrite {

	void selectSqlRewirte(Column column,SQLSelectItem x);
	
	void insertSqlRewirte(String tableName,ValuesClause x);
	
	void updateSqlRewirte(String tableName,SQLUpdateSetItem x);
	
	void conditionRewirte(Condition condition,SQLBinaryOpExpr x);
	
}
