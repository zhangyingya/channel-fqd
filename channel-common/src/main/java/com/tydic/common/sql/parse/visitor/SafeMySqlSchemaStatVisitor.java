package com.tydic.common.sql.parse.visitor;

import java.util.List;

import com.alibaba.druid.sql.ast.SQLExpr;
import com.alibaba.druid.sql.ast.SQLExprImpl;
import com.alibaba.druid.sql.ast.SQLName;
import com.alibaba.druid.sql.ast.SQLObject;
import com.alibaba.druid.sql.ast.expr.SQLAggregateExpr;
import com.alibaba.druid.sql.ast.expr.SQLAllExpr;
import com.alibaba.druid.sql.ast.expr.SQLAnyExpr;
import com.alibaba.druid.sql.ast.expr.SQLBetweenExpr;
import com.alibaba.druid.sql.ast.expr.SQLBinaryOpExpr;
import com.alibaba.druid.sql.ast.expr.SQLIdentifierExpr;
import com.alibaba.druid.sql.ast.expr.SQLInSubQueryExpr;
import com.alibaba.druid.sql.ast.expr.SQLPropertyExpr;
import com.alibaba.druid.sql.ast.expr.SQLQueryExpr;
import com.alibaba.druid.sql.ast.expr.SQLSomeExpr;
import com.alibaba.druid.sql.ast.statement.SQLDeleteStatement;
import com.alibaba.druid.sql.ast.statement.SQLExprTableSource;
import com.alibaba.druid.sql.ast.statement.SQLJoinTableSource;
import com.alibaba.druid.sql.ast.statement.SQLSelectItem;
import com.alibaba.druid.sql.ast.statement.SQLSelectQueryBlock;
import com.alibaba.druid.sql.ast.statement.SQLUpdateSetItem;
import com.alibaba.druid.sql.ast.statement.SQLUpdateStatement;
import com.alibaba.druid.sql.dialect.mysql.ast.MySqlForceIndexHint;
import com.alibaba.druid.sql.dialect.mysql.ast.MySqlIgnoreIndexHint;
import com.alibaba.druid.sql.dialect.mysql.ast.MySqlKey;
import com.alibaba.druid.sql.dialect.mysql.ast.MySqlPrimaryKey;
import com.alibaba.druid.sql.dialect.mysql.ast.MySqlUnique;
import com.alibaba.druid.sql.dialect.mysql.ast.MySqlUseIndexHint;
import com.alibaba.druid.sql.dialect.mysql.ast.MysqlForeignKey;
import com.alibaba.druid.sql.dialect.mysql.ast.clause.MySqlCaseStatement;
import com.alibaba.druid.sql.dialect.mysql.ast.clause.MySqlCursorDeclareStatement;
import com.alibaba.druid.sql.dialect.mysql.ast.clause.MySqlDeclareConditionStatement;
import com.alibaba.druid.sql.dialect.mysql.ast.clause.MySqlDeclareHandlerStatement;
import com.alibaba.druid.sql.dialect.mysql.ast.clause.MySqlDeclareStatement;
import com.alibaba.druid.sql.dialect.mysql.ast.clause.MySqlIterateStatement;
import com.alibaba.druid.sql.dialect.mysql.ast.clause.MySqlLeaveStatement;
import com.alibaba.druid.sql.dialect.mysql.ast.clause.MySqlRepeatStatement;
import com.alibaba.druid.sql.dialect.mysql.ast.clause.MySqlSelectIntoStatement;
import com.alibaba.druid.sql.dialect.mysql.ast.clause.MySqlCaseStatement.MySqlWhenStatement;
import com.alibaba.druid.sql.dialect.mysql.ast.expr.MySqlCharExpr;
import com.alibaba.druid.sql.dialect.mysql.ast.expr.MySqlExtractExpr;
import com.alibaba.druid.sql.dialect.mysql.ast.expr.MySqlMatchAgainstExpr;
import com.alibaba.druid.sql.dialect.mysql.ast.expr.MySqlOrderingExpr;
import com.alibaba.druid.sql.dialect.mysql.ast.expr.MySqlOutFileExpr;
import com.alibaba.druid.sql.dialect.mysql.ast.expr.MySqlUserName;
import com.alibaba.druid.sql.dialect.mysql.ast.statement.CobarShowStatus;
import com.alibaba.druid.sql.dialect.mysql.ast.statement.MySqlAlterEventStatement;
import com.alibaba.druid.sql.dialect.mysql.ast.statement.MySqlAlterLogFileGroupStatement;
import com.alibaba.druid.sql.dialect.mysql.ast.statement.MySqlAlterServerStatement;
import com.alibaba.druid.sql.dialect.mysql.ast.statement.MySqlAlterTableAlterColumn;
import com.alibaba.druid.sql.dialect.mysql.ast.statement.MySqlAlterTableChangeColumn;
import com.alibaba.druid.sql.dialect.mysql.ast.statement.MySqlAlterTableDiscardTablespace;
import com.alibaba.druid.sql.dialect.mysql.ast.statement.MySqlAlterTableImportTablespace;
import com.alibaba.druid.sql.dialect.mysql.ast.statement.MySqlAlterTableModifyColumn;
import com.alibaba.druid.sql.dialect.mysql.ast.statement.MySqlAlterTableOption;
import com.alibaba.druid.sql.dialect.mysql.ast.statement.MySqlAlterTablespaceStatement;
import com.alibaba.druid.sql.dialect.mysql.ast.statement.MySqlAlterUserStatement;
import com.alibaba.druid.sql.dialect.mysql.ast.statement.MySqlAnalyzeStatement;
import com.alibaba.druid.sql.dialect.mysql.ast.statement.MySqlBinlogStatement;
import com.alibaba.druid.sql.dialect.mysql.ast.statement.MySqlCreateAddLogFileGroupStatement;
import com.alibaba.druid.sql.dialect.mysql.ast.statement.MySqlCreateEventStatement;
import com.alibaba.druid.sql.dialect.mysql.ast.statement.MySqlCreateServerStatement;
import com.alibaba.druid.sql.dialect.mysql.ast.statement.MySqlCreateTableSpaceStatement;
import com.alibaba.druid.sql.dialect.mysql.ast.statement.MySqlCreateTableStatement;
import com.alibaba.druid.sql.dialect.mysql.ast.statement.MySqlCreateUserStatement;
import com.alibaba.druid.sql.dialect.mysql.ast.statement.MySqlDeleteStatement;
import com.alibaba.druid.sql.dialect.mysql.ast.statement.MySqlEventSchedule;
import com.alibaba.druid.sql.dialect.mysql.ast.statement.MySqlExecuteStatement;
import com.alibaba.druid.sql.dialect.mysql.ast.statement.MySqlExplainStatement;
import com.alibaba.druid.sql.dialect.mysql.ast.statement.MySqlFlushStatement;
import com.alibaba.druid.sql.dialect.mysql.ast.statement.MySqlHelpStatement;
import com.alibaba.druid.sql.dialect.mysql.ast.statement.MySqlHintStatement;
import com.alibaba.druid.sql.dialect.mysql.ast.statement.MySqlInsertStatement;
import com.alibaba.druid.sql.dialect.mysql.ast.statement.MySqlKillStatement;
import com.alibaba.druid.sql.dialect.mysql.ast.statement.MySqlLoadDataInFileStatement;
import com.alibaba.druid.sql.dialect.mysql.ast.statement.MySqlLoadXmlStatement;
import com.alibaba.druid.sql.dialect.mysql.ast.statement.MySqlLockTableStatement;
import com.alibaba.druid.sql.dialect.mysql.ast.statement.MySqlOptimizeStatement;
import com.alibaba.druid.sql.dialect.mysql.ast.statement.MySqlPartitionByKey;
import com.alibaba.druid.sql.dialect.mysql.ast.statement.MySqlPrepareStatement;
import com.alibaba.druid.sql.dialect.mysql.ast.statement.MySqlRenameTableStatement;
import com.alibaba.druid.sql.dialect.mysql.ast.statement.MySqlResetStatement;
import com.alibaba.druid.sql.dialect.mysql.ast.statement.MySqlSelectQueryBlock;
import com.alibaba.druid.sql.dialect.mysql.ast.statement.MySqlSetTransactionStatement;
import com.alibaba.druid.sql.dialect.mysql.ast.statement.MySqlShowAuthorsStatement;
import com.alibaba.druid.sql.dialect.mysql.ast.statement.MySqlShowBinLogEventsStatement;
import com.alibaba.druid.sql.dialect.mysql.ast.statement.MySqlShowBinaryLogsStatement;
import com.alibaba.druid.sql.dialect.mysql.ast.statement.MySqlShowCharacterSetStatement;
import com.alibaba.druid.sql.dialect.mysql.ast.statement.MySqlShowCollationStatement;
import com.alibaba.druid.sql.dialect.mysql.ast.statement.MySqlShowColumnsStatement;
import com.alibaba.druid.sql.dialect.mysql.ast.statement.MySqlShowContributorsStatement;
import com.alibaba.druid.sql.dialect.mysql.ast.statement.MySqlShowCreateDatabaseStatement;
import com.alibaba.druid.sql.dialect.mysql.ast.statement.MySqlShowCreateEventStatement;
import com.alibaba.druid.sql.dialect.mysql.ast.statement.MySqlShowCreateFunctionStatement;
import com.alibaba.druid.sql.dialect.mysql.ast.statement.MySqlShowCreateProcedureStatement;
import com.alibaba.druid.sql.dialect.mysql.ast.statement.MySqlShowCreateTableStatement;
import com.alibaba.druid.sql.dialect.mysql.ast.statement.MySqlShowCreateTriggerStatement;
import com.alibaba.druid.sql.dialect.mysql.ast.statement.MySqlShowCreateViewStatement;
import com.alibaba.druid.sql.dialect.mysql.ast.statement.MySqlShowDatabasePartitionStatusStatement;
import com.alibaba.druid.sql.dialect.mysql.ast.statement.MySqlShowDatabasesStatement;
import com.alibaba.druid.sql.dialect.mysql.ast.statement.MySqlShowEngineStatement;
import com.alibaba.druid.sql.dialect.mysql.ast.statement.MySqlShowEnginesStatement;
import com.alibaba.druid.sql.dialect.mysql.ast.statement.MySqlShowErrorsStatement;
import com.alibaba.druid.sql.dialect.mysql.ast.statement.MySqlShowEventsStatement;
import com.alibaba.druid.sql.dialect.mysql.ast.statement.MySqlShowFunctionCodeStatement;
import com.alibaba.druid.sql.dialect.mysql.ast.statement.MySqlShowFunctionStatusStatement;
import com.alibaba.druid.sql.dialect.mysql.ast.statement.MySqlShowGrantsStatement;
import com.alibaba.druid.sql.dialect.mysql.ast.statement.MySqlShowIndexesStatement;
import com.alibaba.druid.sql.dialect.mysql.ast.statement.MySqlShowKeysStatement;
import com.alibaba.druid.sql.dialect.mysql.ast.statement.MySqlShowMasterLogsStatement;
import com.alibaba.druid.sql.dialect.mysql.ast.statement.MySqlShowMasterStatusStatement;
import com.alibaba.druid.sql.dialect.mysql.ast.statement.MySqlShowOpenTablesStatement;
import com.alibaba.druid.sql.dialect.mysql.ast.statement.MySqlShowPluginsStatement;
import com.alibaba.druid.sql.dialect.mysql.ast.statement.MySqlShowPrivilegesStatement;
import com.alibaba.druid.sql.dialect.mysql.ast.statement.MySqlShowProcedureCodeStatement;
import com.alibaba.druid.sql.dialect.mysql.ast.statement.MySqlShowProcedureStatusStatement;
import com.alibaba.druid.sql.dialect.mysql.ast.statement.MySqlShowProcessListStatement;
import com.alibaba.druid.sql.dialect.mysql.ast.statement.MySqlShowProfileStatement;
import com.alibaba.druid.sql.dialect.mysql.ast.statement.MySqlShowProfilesStatement;
import com.alibaba.druid.sql.dialect.mysql.ast.statement.MySqlShowRelayLogEventsStatement;
import com.alibaba.druid.sql.dialect.mysql.ast.statement.MySqlShowSlaveHostsStatement;
import com.alibaba.druid.sql.dialect.mysql.ast.statement.MySqlShowSlaveStatusStatement;
import com.alibaba.druid.sql.dialect.mysql.ast.statement.MySqlShowStatusStatement;
import com.alibaba.druid.sql.dialect.mysql.ast.statement.MySqlShowTableStatusStatement;
import com.alibaba.druid.sql.dialect.mysql.ast.statement.MySqlShowTriggersStatement;
import com.alibaba.druid.sql.dialect.mysql.ast.statement.MySqlShowVariantsStatement;
import com.alibaba.druid.sql.dialect.mysql.ast.statement.MySqlShowWarningsStatement;
import com.alibaba.druid.sql.dialect.mysql.ast.statement.MySqlSubPartitionByKey;
import com.alibaba.druid.sql.dialect.mysql.ast.statement.MySqlSubPartitionByList;
import com.alibaba.druid.sql.dialect.mysql.ast.statement.MySqlTableIndex;
import com.alibaba.druid.sql.dialect.mysql.ast.statement.MySqlUnlockTablesStatement;
import com.alibaba.druid.sql.dialect.mysql.ast.statement.MySqlUpdateStatement;
import com.alibaba.druid.sql.dialect.mysql.ast.statement.MySqlUpdateTableSource;
import com.alibaba.druid.sql.dialect.mysql.ast.statement.MysqlDeallocatePrepareStatement;
import com.alibaba.druid.sql.dialect.mysql.ast.statement.MySqlCreateTableStatement.TableSpaceOption;
import com.alibaba.druid.sql.dialect.mysql.ast.statement.MySqlCreateUserStatement.UserSpecification;
import com.alibaba.druid.sql.dialect.mysql.ast.statement.MySqlRenameTableStatement.Item;
import com.alibaba.druid.sql.dialect.mysql.visitor.MySqlASTVisitor;
import com.alibaba.druid.stat.TableStat;
import com.alibaba.druid.stat.TableStat.Column;
import com.alibaba.druid.stat.TableStat.Mode;
import com.tydic.common.sql.parse.SqlRewrite;

public class SafeMySqlSchemaStatVisitor extends SafeSchemaStatVisitor implements MySqlASTVisitor{

	@Override
	public void setSubQueryRelationOrFlag(SQLExprImpl x) {
		SafeMySqlSubQueryVisitor subQueryVisitor = new SafeMySqlSubQueryVisitor();
		x.accept(subQueryVisitor);
		if (subQueryVisitor.isRelationOr()) {
			subqueryRelationOr = true;
		}
	}
	
	@Override
    public boolean visit(SQLUpdateSetItem x) {
    	String tableName=((MySqlUpdateStatement)x.getParent()).getTableName().getSimpleName();
    	
    	if(sqlRewrite!=null){
    		sqlRewrite.updateSqlRewirte(tableName, x);
    	}
    	
		return true;
	}
	
	@Override
	public boolean visit(MySqlCreateTableStatement x) {
		SQLName sqlName = x.getName();
		if (sqlName != null) {
			String table = sqlName.toString();
			if (table.startsWith("`")) {
				table = table.substring(1, table.length() - 1);
			}
			setCurrentTable(table);
		}
		return false;
	}

	@Override
	public boolean visit(MySqlInsertStatement x) {
		SQLName sqlName = x.getTableName();
		if (sqlName != null) {
			String table = sqlName.toString();
			if (table.startsWith("`")) {
				table = table.substring(1, table.length() - 1);
			}
			setCurrentTable(sqlName.toString());
		}
		return true;
	}

	@Override
	public boolean visit(MySqlDeleteStatement x) {
		setAliasMap();

		setMode(x, Mode.Delete);

		accept(x.getFrom());
		accept(x.getUsing());
		x.getTableSource().accept(this);

		if (x.getTableSource() instanceof SQLExprTableSource) {
			SQLName tableName = (SQLName) ((SQLExprTableSource) x.getTableSource()).getExpr();
			String ident = tableName.toString();
			setCurrentTable(x, ident);

			TableStat stat = this.getTableStat(ident, ident);
			stat.incrementDeleteCount();
		}

		accept(x.getWhere());

		accept(x.getOrderBy());
		accept(x.getLimit());

		return true;
	}
	
	@Override
	public String getOwnerTableName(SQLBetweenExpr betweenExpr, String column) {
		if (tableStats.size() == 1) {// 只有一个表，直接返回这一个表名
			return tableStats.keySet().iterator().next().getName();
		} else if (tableStats.size() == 0) {// 一个表都没有，返回空串
			return "";
		} else {// 多个表名
			for (Column col : columns.keySet()) {
				if (col.getName().equals(column)) {
					return col.getTable();
				}
			}
			// for(Column col : columns) {//从columns中找表名
			// if(col.getName().equals(column)) {
			// return col.getTable();
			// }
			// }

			// 前面没找到表名的，自己从parent中解析

			SQLObject parent = betweenExpr.getParent();
			if (parent instanceof SQLBinaryOpExpr) {
				parent = parent.getParent();
			}

			if (parent instanceof MySqlSelectQueryBlock) {
				MySqlSelectQueryBlock select = (MySqlSelectQueryBlock) parent;
				if (select.getFrom() instanceof SQLJoinTableSource) {// 多表连接
					SQLJoinTableSource joinTableSource = (SQLJoinTableSource) select.getFrom();
					return joinTableSource.getLeft().toString();// 将left作为主表，此处有不严谨处，但也是实在没有办法，如果要准确，字段前带表名或者表的别名即可
				} else if (select.getFrom() instanceof SQLExprTableSource) {// 单表
					return select.getFrom().toString();
				}
			} else if (parent instanceof SQLUpdateStatement) {
				SQLUpdateStatement update = (SQLUpdateStatement) parent;
				return update.getTableName().getSimpleName();
			} else if (parent instanceof SQLDeleteStatement) {
				SQLDeleteStatement delete = (SQLDeleteStatement) parent;
				return delete.getTableName().getSimpleName();
			} else {

			}
		}
		return "";
	}
	
	/*
	 * 遇到 all 将子查询改写成 SELECT MAX(name) FROM subtest1 例如: select * from subtest
	 * where id > all (select name from subtest1); >/>= all ----> >/>= max </<=
	 * all ----> </<= min <> all ----> not in = all ----> id = 1 and id = 2
	 * other 不改写
	 */
	@Override
	public boolean visit(SQLAllExpr x) {
		setSubQueryRelationOrFlag(x);

		List<SQLSelectItem> itemlist = ((SQLSelectQueryBlock) (x.getSubQuery().getQuery())).getSelectList();
		SQLExpr sexpr = itemlist.get(0).getExpr();

		if (x.getParent() instanceof SQLBinaryOpExpr) {
			SQLBinaryOpExpr parentExpr = (SQLBinaryOpExpr) x.getParent();
			SQLAggregateExpr saexpr = null;
			switch (parentExpr.getOperator()) {
			case GreaterThan:
			case GreaterThanOrEqual:
			case NotLessThan:
				this.hasChange = true;
				if (sexpr instanceof SQLIdentifierExpr || (sexpr instanceof SQLPropertyExpr
						&& ((SQLPropertyExpr) sexpr).getOwner() instanceof SQLIdentifierExpr)) {
					saexpr = new SQLAggregateExpr("MAX");
					saexpr.getArguments().add(sexpr);
					saexpr.setParent(itemlist.get(0));
					itemlist.get(0).setExpr(saexpr);
				}
				SQLQueryExpr maxSubQuery = new SQLQueryExpr(x.getSubQuery());
				x.getSubQuery().setParent(x.getParent());
				// 生成新的SQLQueryExpr 替换当前 SQLAllExpr 节点
				if (x.getParent() instanceof SQLBinaryOpExpr) {
					if (((SQLBinaryOpExpr) x.getParent()).getLeft().equals(x)) {
						((SQLBinaryOpExpr) x.getParent()).setLeft(maxSubQuery);
					} else if (((SQLBinaryOpExpr) x.getParent()).getRight().equals(x)) {
						((SQLBinaryOpExpr) x.getParent()).setRight(maxSubQuery);
					}
				}
				addSubQuerys(x.getSubQuery());
				return super.visit(x.getSubQuery());
			case LessThan:
			case LessThanOrEqual:
			case NotGreaterThan:
				this.hasChange = true;
				if (sexpr instanceof SQLIdentifierExpr || (sexpr instanceof SQLPropertyExpr
						&& ((SQLPropertyExpr) sexpr).getOwner() instanceof SQLIdentifierExpr)) {
					saexpr = new SQLAggregateExpr("MIN");
					saexpr.getArguments().add(sexpr);
					saexpr.setParent(itemlist.get(0));
					itemlist.get(0).setExpr(saexpr);

					x.subQuery.setParent(x.getParent());
				}
				// 生成新的SQLQueryExpr 替换当前 SQLAllExpr 节点
				SQLQueryExpr minSubQuery = new SQLQueryExpr(x.getSubQuery());
				if (x.getParent() instanceof SQLBinaryOpExpr) {
					if (((SQLBinaryOpExpr) x.getParent()).getLeft().equals(x)) {
						((SQLBinaryOpExpr) x.getParent()).setLeft(minSubQuery);
					} else if (((SQLBinaryOpExpr) x.getParent()).getRight().equals(x)) {
						((SQLBinaryOpExpr) x.getParent()).setRight(minSubQuery);
					}
				}
				addSubQuerys(x.getSubQuery());
				return super.visit(x.getSubQuery());
			case LessThanOrGreater:
			case NotEqual:
				this.hasChange = true;
				SQLInSubQueryExpr notInSubQueryExpr = new SQLInSubQueryExpr(x.getSubQuery());
				x.getSubQuery().setParent(notInSubQueryExpr);
				notInSubQueryExpr.setNot(true);
				// 生成新的SQLQueryExpr 替换当前 SQLAllExpr 节点
				if (x.getParent() instanceof SQLBinaryOpExpr) {
					SQLBinaryOpExpr xp = (SQLBinaryOpExpr) x.getParent();

					if (xp.getLeft().equals(x)) {
						notInSubQueryExpr.setExpr(xp.getRight());
					} else if (xp.getRight().equals(x)) {
						notInSubQueryExpr.setExpr(xp.getLeft());
					}

					if (xp.getParent() instanceof MySqlSelectQueryBlock) {
						((MySqlSelectQueryBlock) xp.getParent()).setWhere(notInSubQueryExpr);
					} else if (xp.getParent() instanceof SQLBinaryOpExpr) {
						SQLBinaryOpExpr pp = ((SQLBinaryOpExpr) xp.getParent());
						if (pp.getLeft().equals(xp)) {
							pp.setLeft(notInSubQueryExpr);
						} else if (pp.getRight().equals(xp)) {
							pp.setRight(notInSubQueryExpr);
						}
					}
				}
				addSubQuerys(x.getSubQuery());
				return super.visit(notInSubQueryExpr);
			default:
				break;
			}
		}
		addSubQuerys(x.getSubQuery());
		return super.visit(x);
	}
	
	/*
	 * 遇到 some 将子查询改写成 SELECT MIN(name) FROM subtest1 例如: select * from subtest
	 * where id > some (select name from subtest1); >/>= some ----> >/>= min
	 * </<= some ----> </<= max <> some ----> not in = some ----> in other 不改写
	 */
	@Override
	public boolean visit(SQLSomeExpr x) {

		setSubQueryRelationOrFlag(x);

		List<SQLSelectItem> itemlist = ((SQLSelectQueryBlock) (x.getSubQuery().getQuery())).getSelectList();
		SQLExpr sexpr = itemlist.get(0).getExpr();

		if (x.getParent() instanceof SQLBinaryOpExpr) {
			SQLBinaryOpExpr parentExpr = (SQLBinaryOpExpr) x.getParent();
			SQLAggregateExpr saexpr = null;
			switch (parentExpr.getOperator()) {
			case GreaterThan:
			case GreaterThanOrEqual:
			case NotLessThan:
				this.hasChange = true;
				if (sexpr instanceof SQLIdentifierExpr || (sexpr instanceof SQLPropertyExpr
						&& ((SQLPropertyExpr) sexpr).getOwner() instanceof SQLIdentifierExpr)) {
					saexpr = new SQLAggregateExpr("MIN");
					saexpr.getArguments().add(sexpr);
					saexpr.setParent(itemlist.get(0));
					itemlist.get(0).setExpr(saexpr);
				}
				SQLQueryExpr maxSubQuery = new SQLQueryExpr(x.getSubQuery());
				x.getSubQuery().setParent(maxSubQuery);
				// 生成新的SQLQueryExpr 替换当前 SQLAllExpr 节点
				if (x.getParent() instanceof SQLBinaryOpExpr) {
					if (((SQLBinaryOpExpr) x.getParent()).getLeft().equals(x)) {
						((SQLBinaryOpExpr) x.getParent()).setLeft(maxSubQuery);
					} else if (((SQLBinaryOpExpr) x.getParent()).getRight().equals(x)) {
						((SQLBinaryOpExpr) x.getParent()).setRight(maxSubQuery);
					}
				}
				addSubQuerys(x.getSubQuery());
				return super.visit(x.getSubQuery());
			case LessThan:
			case LessThanOrEqual:
			case NotGreaterThan:
				this.hasChange = true;
				if (sexpr instanceof SQLIdentifierExpr || (sexpr instanceof SQLPropertyExpr
						&& ((SQLPropertyExpr) sexpr).getOwner() instanceof SQLIdentifierExpr)) {
					saexpr = new SQLAggregateExpr("MAX");
					saexpr.getArguments().add(sexpr);
					saexpr.setParent(itemlist.get(0));
					itemlist.get(0).setExpr(saexpr);
				}
				// 生成新的SQLQueryExpr 替换当前 SQLAllExpr 节点
				SQLQueryExpr minSubQuery = new SQLQueryExpr(x.getSubQuery());
				x.getSubQuery().setParent(minSubQuery);

				if (x.getParent() instanceof SQLBinaryOpExpr) {
					if (((SQLBinaryOpExpr) x.getParent()).getLeft().equals(x)) {
						((SQLBinaryOpExpr) x.getParent()).setLeft(minSubQuery);
					} else if (((SQLBinaryOpExpr) x.getParent()).getRight().equals(x)) {
						((SQLBinaryOpExpr) x.getParent()).setRight(minSubQuery);
					}
				}
				addSubQuerys(x.getSubQuery());
				return super.visit(x.getSubQuery());
			case LessThanOrGreater:
			case NotEqual:
				this.hasChange = true;
				SQLInSubQueryExpr notInSubQueryExpr = new SQLInSubQueryExpr(x.getSubQuery());
				x.getSubQuery().setParent(notInSubQueryExpr);
				notInSubQueryExpr.setNot(true);
				// 生成新的SQLQueryExpr 替换当前 SQLAllExpr 节点
				if (x.getParent() instanceof SQLBinaryOpExpr) {
					SQLBinaryOpExpr xp = (SQLBinaryOpExpr) x.getParent();

					if (xp.getLeft().equals(x)) {
						notInSubQueryExpr.setExpr(xp.getRight());
					} else if (xp.getRight().equals(x)) {
						notInSubQueryExpr.setExpr(xp.getLeft());
					}

					if (xp.getParent() instanceof MySqlSelectQueryBlock) {
						((MySqlSelectQueryBlock) xp.getParent()).setWhere(notInSubQueryExpr);
					} else if (xp.getParent() instanceof SQLBinaryOpExpr) {
						SQLBinaryOpExpr pp = ((SQLBinaryOpExpr) xp.getParent());
						if (pp.getLeft().equals(xp)) {
							pp.setLeft(notInSubQueryExpr);
						} else if (pp.getRight().equals(xp)) {
							pp.setRight(notInSubQueryExpr);
						}
					}
				}
				addSubQuerys(x.getSubQuery());
				return super.visit(notInSubQueryExpr);
			case Equality:
				this.hasChange = true;
				SQLInSubQueryExpr inSubQueryExpr = new SQLInSubQueryExpr(x.getSubQuery());
				x.getSubQuery().setParent(inSubQueryExpr);
				inSubQueryExpr.setNot(false);
				// 生成新的SQLQueryExpr 替换当前 SQLAllExpr 节点
				if (x.getParent() instanceof SQLBinaryOpExpr) {
					SQLBinaryOpExpr xp = (SQLBinaryOpExpr) x.getParent();

					if (xp.getLeft().equals(x)) {
						inSubQueryExpr.setExpr(xp.getRight());
					} else if (xp.getRight().equals(x)) {
						inSubQueryExpr.setExpr(xp.getLeft());
					}

					if (xp.getParent() instanceof MySqlSelectQueryBlock) {
						((MySqlSelectQueryBlock) xp.getParent()).setWhere(inSubQueryExpr);
					} else if (xp.getParent() instanceof SQLBinaryOpExpr) {
						SQLBinaryOpExpr pp = ((SQLBinaryOpExpr) xp.getParent());
						if (pp.getLeft().equals(xp)) {
							pp.setLeft(inSubQueryExpr);
						} else if (pp.getRight().equals(xp)) {
							pp.setRight(inSubQueryExpr);
						}
					}
				}
				addSubQuerys(x.getSubQuery());
				return super.visit(inSubQueryExpr);
			default:
				break;
			}
		}
		addSubQuerys(x.getSubQuery());
		return super.visit(x);
	}
	
	/*
	 * 遇到 any 将子查询改写成 SELECT MIN(name) FROM subtest1 例如: select * from subtest
	 * where id oper any (select name from subtest1); >/>= any ----> >/>= min
	 * </<= any ----> </<= max <> any ----> not in = some ----> in other 不改写
	 */
	@Override
	public boolean visit(SQLAnyExpr x) {

		setSubQueryRelationOrFlag(x);

		List<SQLSelectItem> itemlist = ((SQLSelectQueryBlock) (x.getSubQuery().getQuery())).getSelectList();
		SQLExpr sexpr = itemlist.get(0).getExpr();

		if (x.getParent() instanceof SQLBinaryOpExpr) {
			SQLBinaryOpExpr parentExpr = (SQLBinaryOpExpr) x.getParent();
			SQLAggregateExpr saexpr = null;
			switch (parentExpr.getOperator()) {
			case GreaterThan:
			case GreaterThanOrEqual:
			case NotLessThan:
				this.hasChange = true;
				if (sexpr instanceof SQLIdentifierExpr || (sexpr instanceof SQLPropertyExpr
						&& ((SQLPropertyExpr) sexpr).getOwner() instanceof SQLIdentifierExpr)) {
					saexpr = new SQLAggregateExpr("MIN");
					saexpr.getArguments().add(sexpr);
					saexpr.setParent(itemlist.get(0));
					itemlist.get(0).setExpr(saexpr);
				}
				SQLQueryExpr maxSubQuery = new SQLQueryExpr(x.getSubQuery());
				x.getSubQuery().setParent(maxSubQuery);
				// 生成新的SQLQueryExpr 替换当前 SQLAllExpr 节点
				if (x.getParent() instanceof SQLBinaryOpExpr) {
					if (((SQLBinaryOpExpr) x.getParent()).getLeft().equals(x)) {
						((SQLBinaryOpExpr) x.getParent()).setLeft(maxSubQuery);
					} else if (((SQLBinaryOpExpr) x.getParent()).getRight().equals(x)) {
						((SQLBinaryOpExpr) x.getParent()).setRight(maxSubQuery);
					}
				}
				addSubQuerys(x.getSubQuery());
				return super.visit(x.getSubQuery());
			case LessThan:
			case LessThanOrEqual:
			case NotGreaterThan:
				this.hasChange = true;
				if (sexpr instanceof SQLIdentifierExpr || (sexpr instanceof SQLPropertyExpr
						&& ((SQLPropertyExpr) sexpr).getOwner() instanceof SQLIdentifierExpr)) {
					saexpr = new SQLAggregateExpr("MAX");
					saexpr.getArguments().add(sexpr);
					saexpr.setParent(itemlist.get(0));
					itemlist.get(0).setExpr(saexpr);
				}
				// 生成新的SQLQueryExpr 替换当前 SQLAllExpr 节点
				SQLQueryExpr minSubQuery = new SQLQueryExpr(x.getSubQuery());
				x.subQuery.setParent(minSubQuery);
				if (x.getParent() instanceof SQLBinaryOpExpr) {
					if (((SQLBinaryOpExpr) x.getParent()).getLeft().equals(x)) {
						((SQLBinaryOpExpr) x.getParent()).setLeft(minSubQuery);
					} else if (((SQLBinaryOpExpr) x.getParent()).getRight().equals(x)) {
						((SQLBinaryOpExpr) x.getParent()).setRight(minSubQuery);
					}
				}
				addSubQuerys(x.getSubQuery());
				return super.visit(x.getSubQuery());
			case LessThanOrGreater:
			case NotEqual:
				this.hasChange = true;
				SQLInSubQueryExpr notInSubQueryExpr = new SQLInSubQueryExpr(x.getSubQuery());
				x.getSubQuery().setParent(notInSubQueryExpr);
				notInSubQueryExpr.setNot(true);
				// 生成新的SQLQueryExpr 替换当前 SQLAllExpr 节点
				if (x.getParent() instanceof SQLBinaryOpExpr) {
					SQLBinaryOpExpr xp = (SQLBinaryOpExpr) x.getParent();

					if (xp.getLeft().equals(x)) {
						notInSubQueryExpr.setExpr(xp.getRight());
					} else if (xp.getRight().equals(x)) {
						notInSubQueryExpr.setExpr(xp.getLeft());
					}

					if (xp.getParent() instanceof MySqlSelectQueryBlock) {
						((MySqlSelectQueryBlock) xp.getParent()).setWhere(notInSubQueryExpr);
					} else if (xp.getParent() instanceof SQLBinaryOpExpr) {
						SQLBinaryOpExpr pp = ((SQLBinaryOpExpr) xp.getParent());
						if (pp.getLeft().equals(xp)) {
							pp.setLeft(notInSubQueryExpr);
						} else if (pp.getRight().equals(xp)) {
							pp.setRight(notInSubQueryExpr);
						}
					}
				}
				addSubQuerys(x.getSubQuery());
				return super.visit(notInSubQueryExpr);
			case Equality:
				this.hasChange = true;
				SQLInSubQueryExpr inSubQueryExpr = new SQLInSubQueryExpr(x.getSubQuery());
				x.getSubQuery().setParent(inSubQueryExpr);
				inSubQueryExpr.setNot(false);
				// 生成新的SQLQueryExpr 替换当前 SQLAllExpr 节点
				if (x.getParent() instanceof SQLBinaryOpExpr) {
					SQLBinaryOpExpr xp = (SQLBinaryOpExpr) x.getParent();

					if (xp.getLeft().equals(x)) {
						inSubQueryExpr.setExpr(xp.getRight());
					} else if (xp.getRight().equals(x)) {
						inSubQueryExpr.setExpr(xp.getLeft());
					}

					if (xp.getParent() instanceof MySqlSelectQueryBlock) {
						((MySqlSelectQueryBlock) xp.getParent()).setWhere(inSubQueryExpr);
					} else if (xp.getParent() instanceof SQLBinaryOpExpr) {
						SQLBinaryOpExpr pp = ((SQLBinaryOpExpr) xp.getParent());
						if (pp.getLeft().equals(xp)) {
							pp.setLeft(inSubQueryExpr);
						} else if (pp.getRight().equals(xp)) {
							pp.setRight(inSubQueryExpr);
						}
					}
				}
				addSubQuerys(x.getSubQuery());
				return super.visit(inSubQueryExpr);
			default:
				break;
			}
		}
		addSubQuerys(x.getSubQuery());
		return super.visit(x);
	}

	@Override
	public void endVisit(MySqlDeleteStatement x) {
	}
	
	public SafeMySqlSchemaStatVisitor(SqlRewrite sqlRewirte) {
		super(sqlRewirte);
	}

	@Override
	public boolean visit(MySqlTableIndex x) {
		return true;
	}

	@Override
	public void endVisit(MySqlTableIndex x) {
	}

	@Override
	public boolean visit(MySqlKey x) {
		
		return true;
	}

	@Override
	public void endVisit(MySqlKey x) {
		
		
	}

	@Override
	public boolean visit(MySqlPrimaryKey x) {
		
		return true;
	}

	@Override
	public void endVisit(MySqlPrimaryKey x) {
		
		
	}

	@Override
	public boolean visit(MySqlUnique x) {
		
		return true;
	}

	@Override
	public void endVisit(MySqlUnique x) {
		
		
	}

	@Override
	public boolean visit(MysqlForeignKey x) {
		
		return true;
	}

	@Override
	public void endVisit(MysqlForeignKey x) {
		
		
	}

	@Override
	public void endVisit(MySqlExtractExpr x) {
		
		
	}

	@Override
	public boolean visit(MySqlExtractExpr x) {
		
		return true;
	}

	@Override
	public void endVisit(MySqlMatchAgainstExpr x) {
		
		
	}

	@Override
	public boolean visit(MySqlMatchAgainstExpr x) {
		
		return true;
	}

	@Override
	public void endVisit(MySqlPrepareStatement x) {
		
		
	}

	@Override
	public boolean visit(MySqlPrepareStatement x) {
		
		return true;
	}

	@Override
	public void endVisit(MySqlExecuteStatement x) {
		
		
	}

	@Override
	public boolean visit(MysqlDeallocatePrepareStatement x) {
		
		return true;
	}

	@Override
	public void endVisit(MysqlDeallocatePrepareStatement x) {
		
		
	}

	@Override
	public boolean visit(MySqlExecuteStatement x) {
		
		return true;
	}

	@Override
	public void endVisit(MySqlInsertStatement x) {
		
		
	}

	@Override
	public void endVisit(MySqlLoadDataInFileStatement x) {
		
		
	}

	@Override
	public boolean visit(MySqlLoadDataInFileStatement x) {
		
		return true;
	}

	@Override
	public void endVisit(MySqlLoadXmlStatement x) {
		
		
	}

	@Override
	public boolean visit(MySqlLoadXmlStatement x) {
		
		return true;
	}

	@Override
	public void endVisit(MySqlShowColumnsStatement x) {
		
		
	}

	@Override
	public boolean visit(MySqlShowColumnsStatement x) {
		
		return true;
	}

	@Override
	public void endVisit(MySqlShowDatabasesStatement x) {
		
		
	}

	@Override
	public boolean visit(MySqlShowDatabasesStatement x) {
		
		return true;
	}

	@Override
	public void endVisit(MySqlShowWarningsStatement x) {
		
		
	}

	@Override
	public boolean visit(MySqlShowWarningsStatement x) {
		
		return true;
	}

	@Override
	public void endVisit(MySqlShowStatusStatement x) {
		
		
	}

	@Override
	public boolean visit(MySqlShowStatusStatement x) {
		
		return true;
	}

	@Override
	public void endVisit(MySqlShowAuthorsStatement x) {
		
		
	}

	@Override
	public boolean visit(MySqlShowAuthorsStatement x) {
		
		return true;
	}

	@Override
	public void endVisit(CobarShowStatus x) {
		
		
	}

	@Override
	public boolean visit(CobarShowStatus x) {
		
		return true;
	}

	@Override
	public void endVisit(MySqlKillStatement x) {
		
		
	}

	@Override
	public boolean visit(MySqlKillStatement x) {
		
		return true;
	}

	@Override
	public void endVisit(MySqlBinlogStatement x) {
		
		
	}

	@Override
	public boolean visit(MySqlBinlogStatement x) {
		
		return true;
	}

	@Override
	public void endVisit(MySqlResetStatement x) {
		
		
	}

	@Override
	public boolean visit(MySqlResetStatement x) {
		
		return true;
	}

	@Override
	public void endVisit(MySqlCreateUserStatement x) {
		
		
	}

	@Override
	public boolean visit(MySqlCreateUserStatement x) {
		
		return true;
	}

	@Override
	public void endVisit(UserSpecification x) {
		
		
	}

	@Override
	public boolean visit(UserSpecification x) {
		
		return true;
	}

	@Override
	public void endVisit(MySqlPartitionByKey x) {
		
		
	}

	@Override
	public boolean visit(MySqlPartitionByKey x) {
		
		return true;
	}

	@Override
	public boolean visit(MySqlSelectQueryBlock x) {
		
		return true;
	}

	@Override
	public void endVisit(MySqlSelectQueryBlock x) {
		
		
	}

	@Override
	public boolean visit(MySqlOutFileExpr x) {
		
		return true;
	}

	@Override
	public void endVisit(MySqlOutFileExpr x) {
		
		
	}

	@Override
	public boolean visit(MySqlExplainStatement x) {
		
		return true;
	}

	@Override
	public void endVisit(MySqlExplainStatement x) {
		
		
	}

	@Override
	public boolean visit(MySqlUpdateStatement x) {
		
		return true;
	}

	@Override
	public void endVisit(MySqlUpdateStatement x) {
		
		
	}

	@Override
	public boolean visit(MySqlSetTransactionStatement x) {
		
		return true;
	}

	@Override
	public void endVisit(MySqlSetTransactionStatement x) {
		
		
	}

	@Override
	public boolean visit(MySqlShowBinaryLogsStatement x) {
		
		return true;
	}

	@Override
	public void endVisit(MySqlShowBinaryLogsStatement x) {
		
		
	}

	@Override
	public boolean visit(MySqlShowMasterLogsStatement x) {
		
		return true;
	}

	@Override
	public void endVisit(MySqlShowMasterLogsStatement x) {
		
		
	}

	@Override
	public boolean visit(MySqlShowCharacterSetStatement x) {
		
		return true;
	}

	@Override
	public void endVisit(MySqlShowCharacterSetStatement x) {
		
		
	}

	@Override
	public boolean visit(MySqlShowCollationStatement x) {
		
		return true;
	}

	@Override
	public void endVisit(MySqlShowCollationStatement x) {
		
		
	}

	@Override
	public boolean visit(MySqlShowBinLogEventsStatement x) {
		
		return true;
	}

	@Override
	public void endVisit(MySqlShowBinLogEventsStatement x) {
		
		
	}

	@Override
	public boolean visit(MySqlShowContributorsStatement x) {
		
		return true;
	}

	@Override
	public void endVisit(MySqlShowContributorsStatement x) {
		
		
	}

	@Override
	public boolean visit(MySqlShowCreateDatabaseStatement x) {
		
		return true;
	}

	@Override
	public void endVisit(MySqlShowCreateDatabaseStatement x) {
		
		
	}

	@Override
	public boolean visit(MySqlShowCreateEventStatement x) {
		
		return true;
	}

	@Override
	public void endVisit(MySqlShowCreateEventStatement x) {
		
		
	}

	@Override
	public boolean visit(MySqlShowCreateFunctionStatement x) {
		
		return true;
	}

	@Override
	public void endVisit(MySqlShowCreateFunctionStatement x) {
		
		
	}

	@Override
	public boolean visit(MySqlShowCreateProcedureStatement x) {
		
		return true;
	}

	@Override
	public void endVisit(MySqlShowCreateProcedureStatement x) {
		
		
	}

	@Override
	public boolean visit(MySqlShowCreateTableStatement x) {
		
		return true;
	}

	@Override
	public void endVisit(MySqlShowCreateTableStatement x) {
		
		
	}

	@Override
	public boolean visit(MySqlShowCreateTriggerStatement x) {
		
		return true;
	}

	@Override
	public void endVisit(MySqlShowCreateTriggerStatement x) {
		
		
	}

	@Override
	public boolean visit(MySqlShowCreateViewStatement x) {
		
		return true;
	}

	@Override
	public void endVisit(MySqlShowCreateViewStatement x) {
		
		
	}

	@Override
	public boolean visit(MySqlShowEngineStatement x) {
		
		return true;
	}

	@Override
	public void endVisit(MySqlShowEngineStatement x) {
		
		
	}

	@Override
	public boolean visit(MySqlShowEnginesStatement x) {
		
		return true;
	}

	@Override
	public void endVisit(MySqlShowEnginesStatement x) {
		
		
	}

	@Override
	public boolean visit(MySqlShowErrorsStatement x) {
		
		return true;
	}

	@Override
	public void endVisit(MySqlShowErrorsStatement x) {
		
		
	}

	@Override
	public boolean visit(MySqlShowEventsStatement x) {
		
		return true;
	}

	@Override
	public void endVisit(MySqlShowEventsStatement x) {
		
		
	}

	@Override
	public boolean visit(MySqlShowFunctionCodeStatement x) {
		
		return true;
	}

	@Override
	public void endVisit(MySqlShowFunctionCodeStatement x) {
		
		
	}

	@Override
	public boolean visit(MySqlShowFunctionStatusStatement x) {
		
		return true;
	}

	@Override
	public void endVisit(MySqlShowFunctionStatusStatement x) {
		
		
	}

	@Override
	public boolean visit(MySqlShowGrantsStatement x) {
		
		return true;
	}

	@Override
	public void endVisit(MySqlShowGrantsStatement x) {
		
		
	}

	@Override
	public boolean visit(MySqlUserName x) {
		
		return true;
	}

	@Override
	public void endVisit(MySqlUserName x) {
		
		
	}

	@Override
	public boolean visit(MySqlShowIndexesStatement x) {
		
		return true;
	}

	@Override
	public void endVisit(MySqlShowIndexesStatement x) {
		
		
	}

	@Override
	public boolean visit(MySqlShowKeysStatement x) {
		
		return true;
	}

	@Override
	public void endVisit(MySqlShowKeysStatement x) {
		
		
	}

	@Override
	public boolean visit(MySqlShowMasterStatusStatement x) {
		
		return true;
	}

	@Override
	public void endVisit(MySqlShowMasterStatusStatement x) {
		
		
	}

	@Override
	public boolean visit(MySqlShowOpenTablesStatement x) {
		
		return true;
	}

	@Override
	public void endVisit(MySqlShowOpenTablesStatement x) {
		
		
	}

	@Override
	public boolean visit(MySqlShowPluginsStatement x) {
		
		return true;
	}

	@Override
	public void endVisit(MySqlShowPluginsStatement x) {
		
		
	}

	@Override
	public boolean visit(MySqlShowPrivilegesStatement x) {
		
		return true;
	}

	@Override
	public void endVisit(MySqlShowPrivilegesStatement x) {
		
		
	}

	@Override
	public boolean visit(MySqlShowProcedureCodeStatement x) {
		
		return true;
	}

	@Override
	public void endVisit(MySqlShowProcedureCodeStatement x) {
		
		
	}

	@Override
	public boolean visit(MySqlShowProcedureStatusStatement x) {
		
		return true;
	}

	@Override
	public void endVisit(MySqlShowProcedureStatusStatement x) {
		
		
	}

	@Override
	public boolean visit(MySqlShowProcessListStatement x) {
		
		return true;
	}

	@Override
	public void endVisit(MySqlShowProcessListStatement x) {
		
		
	}

	@Override
	public boolean visit(MySqlShowProfileStatement x) {
		
		return true;
	}

	@Override
	public void endVisit(MySqlShowProfileStatement x) {
		
		
	}

	@Override
	public boolean visit(MySqlShowProfilesStatement x) {
		
		return true;
	}

	@Override
	public void endVisit(MySqlShowProfilesStatement x) {
		
		
	}

	@Override
	public boolean visit(MySqlShowRelayLogEventsStatement x) {
		
		return true;
	}

	@Override
	public void endVisit(MySqlShowRelayLogEventsStatement x) {
		
		
	}

	@Override
	public boolean visit(MySqlShowSlaveHostsStatement x) {
		
		return true;
	}

	@Override
	public void endVisit(MySqlShowSlaveHostsStatement x) {
		
		
	}

	@Override
	public boolean visit(MySqlShowSlaveStatusStatement x) {
		
		return true;
	}

	@Override
	public void endVisit(MySqlShowSlaveStatusStatement x) {
		
		
	}

	@Override
	public boolean visit(MySqlShowTableStatusStatement x) {
		
		return true;
	}

	@Override
	public void endVisit(MySqlShowTableStatusStatement x) {
		
		
	}

	@Override
	public boolean visit(MySqlShowTriggersStatement x) {
		
		return true;
	}

	@Override
	public void endVisit(MySqlShowTriggersStatement x) {
		
		
	}

	@Override
	public boolean visit(MySqlShowVariantsStatement x) {
		
		return true;
	}

	@Override
	public void endVisit(MySqlShowVariantsStatement x) {
		
		
	}

	@Override
	public boolean visit(Item x) {
		
		return true;
	}

	@Override
	public void endVisit(Item x) {
		
		
	}

	@Override
	public boolean visit(MySqlRenameTableStatement x) {
		
		return true;
	}

	@Override
	public void endVisit(MySqlRenameTableStatement x) {
		
		
	}

	@Override
	public boolean visit(MySqlUseIndexHint x) {
		
		return true;
	}

	@Override
	public void endVisit(MySqlUseIndexHint x) {
		
		
	}

	@Override
	public boolean visit(MySqlIgnoreIndexHint x) {
		
		return true;
	}

	@Override
	public void endVisit(MySqlIgnoreIndexHint x) {
		
		
	}

	@Override
	public boolean visit(MySqlLockTableStatement x) {
		
		return true;
	}

	@Override
	public void endVisit(MySqlLockTableStatement x) {
		
		
	}

	@Override
	public boolean visit(MySqlUnlockTablesStatement x) {
		
		return true;
	}

	@Override
	public void endVisit(MySqlUnlockTablesStatement x) {
		
		
	}

	@Override
	public boolean visit(MySqlForceIndexHint x) {
		
		return true;
	}

	@Override
	public void endVisit(MySqlForceIndexHint x) {
		
		
	}

	@Override
	public boolean visit(MySqlAlterTableChangeColumn x) {
		
		return true;
	}

	@Override
	public void endVisit(MySqlAlterTableChangeColumn x) {
		
		
	}

	@Override
	public boolean visit(MySqlAlterTableOption x) {
		
		return true;
	}

	@Override
	public void endVisit(MySqlAlterTableOption x) {
		
		
	}

	@Override
	public void endVisit(MySqlCreateTableStatement x) {
		
		
	}

	@Override
	public boolean visit(MySqlHelpStatement x) {
		
		return true;
	}

	@Override
	public void endVisit(MySqlHelpStatement x) {
		
		
	}

	@Override
	public boolean visit(MySqlCharExpr x) {
		
		return true;
	}

	@Override
	public void endVisit(MySqlCharExpr x) {
		
		
	}

	@Override
	public boolean visit(MySqlAlterTableModifyColumn x) {
		
		return true;
	}

	@Override
	public void endVisit(MySqlAlterTableModifyColumn x) {
		
		
	}

	@Override
	public boolean visit(MySqlAlterTableDiscardTablespace x) {
		
		return true;
	}

	@Override
	public void endVisit(MySqlAlterTableDiscardTablespace x) {
		
		
	}

	@Override
	public boolean visit(MySqlAlterTableImportTablespace x) {
		
		return true;
	}

	@Override
	public void endVisit(MySqlAlterTableImportTablespace x) {
		
		
	}

	@Override
	public boolean visit(TableSpaceOption x) {
		
		return true;
	}

	@Override
	public void endVisit(TableSpaceOption x) {
		
		
	}

	@Override
	public boolean visit(MySqlAnalyzeStatement x) {
		
		return true;
	}

	@Override
	public void endVisit(MySqlAnalyzeStatement x) {
		
		
	}

	@Override
	public boolean visit(MySqlAlterUserStatement x) {
		
		return true;
	}

	@Override
	public void endVisit(MySqlAlterUserStatement x) {
		
		
	}

	@Override
	public boolean visit(MySqlOptimizeStatement x) {
		
		return true;
	}

	@Override
	public void endVisit(MySqlOptimizeStatement x) {
		
		
	}

	@Override
	public boolean visit(MySqlHintStatement x) {
		
		return true;
	}

	@Override
	public void endVisit(MySqlHintStatement x) {
		
		
	}

	@Override
	public boolean visit(MySqlOrderingExpr x) {
		
		return true;
	}

	@Override
	public void endVisit(MySqlOrderingExpr x) {
		
		
	}

	@Override
	public boolean visit(MySqlCaseStatement x) {
		
		return true;
	}

	@Override
	public void endVisit(MySqlCaseStatement x) {
		
		
	}

	@Override
	public boolean visit(MySqlDeclareStatement x) {
		
		return true;
	}

	@Override
	public void endVisit(MySqlDeclareStatement x) {
		
		
	}

	@Override
	public boolean visit(MySqlSelectIntoStatement x) {
		
		return true;
	}

	@Override
	public void endVisit(MySqlSelectIntoStatement x) {
		
		
	}

	@Override
	public boolean visit(MySqlWhenStatement x) {
		
		return true;
	}

	@Override
	public void endVisit(MySqlWhenStatement x) {
		
		
	}

	@Override
	public boolean visit(MySqlLeaveStatement x) {
		
		return true;
	}

	@Override
	public void endVisit(MySqlLeaveStatement x) {
		
		
	}

	@Override
	public boolean visit(MySqlIterateStatement x) {
		
		return true;
	}

	@Override
	public void endVisit(MySqlIterateStatement x) {
		
		
	}

	@Override
	public boolean visit(MySqlRepeatStatement x) {
		
		return true;
	}

	@Override
	public void endVisit(MySqlRepeatStatement x) {
		
		
	}

	@Override
	public boolean visit(MySqlCursorDeclareStatement x) {
		
		return true;
	}

	@Override
	public void endVisit(MySqlCursorDeclareStatement x) {
		
		
	}

	@Override
	public boolean visit(MySqlUpdateTableSource x) {
		
		return true;
	}

	@Override
	public void endVisit(MySqlUpdateTableSource x) {
		
		
	}

	@Override
	public boolean visit(MySqlAlterTableAlterColumn x) {
		
		return true;
	}

	@Override
	public void endVisit(MySqlAlterTableAlterColumn x) {
		
		
	}

	@Override
	public boolean visit(MySqlSubPartitionByKey x) {
		
		return true;
	}

	@Override
	public void endVisit(MySqlSubPartitionByKey x) {
		
		
	}

	@Override
	public boolean visit(MySqlSubPartitionByList x) {
		
		return true;
	}

	@Override
	public void endVisit(MySqlSubPartitionByList x) {
		
		
	}

	@Override
	public boolean visit(MySqlDeclareHandlerStatement x) {
		
		return true;
	}

	@Override
	public void endVisit(MySqlDeclareHandlerStatement x) {
		
		
	}

	@Override
	public boolean visit(MySqlDeclareConditionStatement x) {
		return true;
	}

	@Override
	public void endVisit(MySqlDeclareConditionStatement x) {
	}

	@Override
	public boolean visit(MySqlFlushStatement x) {
		return true;
	}

	@Override
	public void endVisit(MySqlFlushStatement x) {
	}

	@Override
	public boolean visit(MySqlEventSchedule x) {
		return true;
	}

	@Override
	public void endVisit(MySqlEventSchedule x) {
	}

	@Override
	public boolean visit(MySqlCreateEventStatement x) {
		return true;
	}

	@Override
	public void endVisit(MySqlCreateEventStatement x) {
	}

	@Override
	public boolean visit(MySqlCreateAddLogFileGroupStatement x) {
		return true;
	}

	@Override
	public void endVisit(MySqlCreateAddLogFileGroupStatement x) {
	}

	@Override
	public boolean visit(MySqlCreateServerStatement x) {
		return true;
	}

	@Override
	public void endVisit(MySqlCreateServerStatement x) {
	}

	@Override
	public boolean visit(MySqlCreateTableSpaceStatement x) {
		return true;
	}

	@Override
	public void endVisit(MySqlCreateTableSpaceStatement x) {
	}

	@Override
	public boolean visit(MySqlAlterEventStatement x) {
		return true;
	}

	@Override
	public void endVisit(MySqlAlterEventStatement x) {
	}

	@Override
	public boolean visit(MySqlAlterLogFileGroupStatement x) {
		return true;
	}

	@Override
	public void endVisit(MySqlAlterLogFileGroupStatement x) {
	}

	@Override
	public boolean visit(MySqlAlterServerStatement x) {
		return true;
	}

	@Override
	public void endVisit(MySqlAlterServerStatement x) {
	}

	@Override
	public boolean visit(MySqlAlterTablespaceStatement x) {
		return true;
	}

	@Override
	public void endVisit(MySqlAlterTablespaceStatement x) {}

	@Override
	public boolean visit(MySqlShowDatabasePartitionStatusStatement x) {
		return true;
	}

	@Override
	public void endVisit(MySqlShowDatabasePartitionStatusStatement x) {}
	
}
