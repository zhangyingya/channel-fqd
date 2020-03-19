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
import com.alibaba.druid.sql.dialect.oracle.ast.OracleDataTypeIntervalDay;
import com.alibaba.druid.sql.dialect.oracle.ast.OracleDataTypeIntervalYear;
import com.alibaba.druid.sql.dialect.oracle.ast.clause.CycleClause;
import com.alibaba.druid.sql.dialect.oracle.ast.clause.ModelClause;
import com.alibaba.druid.sql.dialect.oracle.ast.clause.ModelClause.CellAssignment;
import com.alibaba.druid.sql.dialect.oracle.ast.clause.ModelClause.CellAssignmentItem;
import com.alibaba.druid.sql.dialect.oracle.ast.clause.ModelClause.MainModelClause;
import com.alibaba.druid.sql.dialect.oracle.ast.clause.ModelClause.ModelColumn;
import com.alibaba.druid.sql.dialect.oracle.ast.clause.ModelClause.ModelColumnClause;
import com.alibaba.druid.sql.dialect.oracle.ast.clause.ModelClause.ModelRulesClause;
import com.alibaba.druid.sql.dialect.oracle.ast.clause.ModelClause.QueryPartitionClause;
import com.alibaba.druid.sql.dialect.oracle.ast.clause.ModelClause.ReturnRowsClause;
import com.alibaba.druid.sql.dialect.oracle.ast.clause.OracleLobStorageClause;
import com.alibaba.druid.sql.dialect.oracle.ast.clause.OracleReturningClause;
import com.alibaba.druid.sql.dialect.oracle.ast.clause.OracleStorageClause;
import com.alibaba.druid.sql.dialect.oracle.ast.clause.OracleWithSubqueryEntry;
import com.alibaba.druid.sql.dialect.oracle.ast.clause.PartitionExtensionClause;
import com.alibaba.druid.sql.dialect.oracle.ast.clause.SampleClause;
import com.alibaba.druid.sql.dialect.oracle.ast.clause.SearchClause;
import com.alibaba.druid.sql.dialect.oracle.ast.expr.OracleAnalytic;
import com.alibaba.druid.sql.dialect.oracle.ast.expr.OracleAnalyticWindowing;
import com.alibaba.druid.sql.dialect.oracle.ast.expr.OracleArgumentExpr;
import com.alibaba.druid.sql.dialect.oracle.ast.expr.OracleBinaryDoubleExpr;
import com.alibaba.druid.sql.dialect.oracle.ast.expr.OracleBinaryFloatExpr;
import com.alibaba.druid.sql.dialect.oracle.ast.expr.OracleCursorExpr;
import com.alibaba.druid.sql.dialect.oracle.ast.expr.OracleDatetimeExpr;
import com.alibaba.druid.sql.dialect.oracle.ast.expr.OracleDbLinkExpr;
import com.alibaba.druid.sql.dialect.oracle.ast.expr.OracleIntervalExpr;
import com.alibaba.druid.sql.dialect.oracle.ast.expr.OracleIsOfTypeExpr;
import com.alibaba.druid.sql.dialect.oracle.ast.expr.OracleIsSetExpr;
import com.alibaba.druid.sql.dialect.oracle.ast.expr.OracleOuterExpr;
import com.alibaba.druid.sql.dialect.oracle.ast.expr.OracleRangeExpr;
import com.alibaba.druid.sql.dialect.oracle.ast.expr.OracleSizeExpr;
import com.alibaba.druid.sql.dialect.oracle.ast.expr.OracleSysdateExpr;
import com.alibaba.druid.sql.dialect.oracle.ast.expr.OracleTreatExpr;
import com.alibaba.druid.sql.dialect.oracle.ast.stmt.OracleAlterIndexStatement;
import com.alibaba.druid.sql.dialect.oracle.ast.stmt.OracleAlterIndexStatement.Rebuild;
import com.alibaba.druid.sql.dialect.oracle.ast.stmt.OracleAlterSessionStatement;
import com.alibaba.druid.sql.dialect.oracle.ast.stmt.OracleAlterSynonymStatement;
import com.alibaba.druid.sql.dialect.oracle.ast.stmt.OracleAlterTableDropPartition;
import com.alibaba.druid.sql.dialect.oracle.ast.stmt.OracleAlterTableModify;
import com.alibaba.druid.sql.dialect.oracle.ast.stmt.OracleAlterTableMoveTablespace;
import com.alibaba.druid.sql.dialect.oracle.ast.stmt.OracleAlterTableSplitPartition;
import com.alibaba.druid.sql.dialect.oracle.ast.stmt.OracleAlterTableSplitPartition.NestedTablePartitionSpec;
import com.alibaba.druid.sql.dialect.oracle.ast.stmt.OracleAlterTableSplitPartition.TableSpaceItem;
import com.alibaba.druid.sql.dialect.oracle.ast.stmt.OracleAlterTableSplitPartition.UpdateIndexesClause;
import com.alibaba.druid.sql.dialect.oracle.ast.stmt.OracleAlterTableTruncatePartition;
import com.alibaba.druid.sql.dialect.oracle.ast.stmt.OracleAlterTablespaceAddDataFile;
import com.alibaba.druid.sql.dialect.oracle.ast.stmt.OracleAlterTablespaceStatement;
import com.alibaba.druid.sql.dialect.oracle.ast.stmt.OracleAlterTriggerStatement;
import com.alibaba.druid.sql.dialect.oracle.ast.stmt.OracleAlterViewStatement;
import com.alibaba.druid.sql.dialect.oracle.ast.stmt.OracleCheck;
import com.alibaba.druid.sql.dialect.oracle.ast.stmt.OracleContinueStatement;
import com.alibaba.druid.sql.dialect.oracle.ast.stmt.OracleCreateDatabaseDbLinkStatement;
import com.alibaba.druid.sql.dialect.oracle.ast.stmt.OracleCreateIndexStatement;
import com.alibaba.druid.sql.dialect.oracle.ast.stmt.OracleCreatePackageStatement;
import com.alibaba.druid.sql.dialect.oracle.ast.stmt.OracleCreateSynonymStatement;
import com.alibaba.druid.sql.dialect.oracle.ast.stmt.OracleCreateTableStatement;
import com.alibaba.druid.sql.dialect.oracle.ast.stmt.OracleCreateTableStatement.OIDIndex;
import com.alibaba.druid.sql.dialect.oracle.ast.stmt.OracleCreateTableStatement.Organization;
import com.alibaba.druid.sql.dialect.oracle.ast.stmt.OracleCreateTypeStatement;
import com.alibaba.druid.sql.dialect.oracle.ast.stmt.OracleDeleteStatement;
import com.alibaba.druid.sql.dialect.oracle.ast.stmt.OracleDropDbLinkStatement;
import com.alibaba.druid.sql.dialect.oracle.ast.stmt.OracleExceptionStatement;
import com.alibaba.druid.sql.dialect.oracle.ast.stmt.OracleExecuteImmediateStatement;
import com.alibaba.druid.sql.dialect.oracle.ast.stmt.OracleExitStatement;
import com.alibaba.druid.sql.dialect.oracle.ast.stmt.OracleExplainStatement;
import com.alibaba.druid.sql.dialect.oracle.ast.stmt.OracleFileSpecification;
import com.alibaba.druid.sql.dialect.oracle.ast.stmt.OracleForStatement;
import com.alibaba.druid.sql.dialect.oracle.ast.stmt.OracleForeignKey;
import com.alibaba.druid.sql.dialect.oracle.ast.stmt.OracleGotoStatement;
import com.alibaba.druid.sql.dialect.oracle.ast.stmt.OracleInsertStatement;
import com.alibaba.druid.sql.dialect.oracle.ast.stmt.OracleLabelStatement;
import com.alibaba.druid.sql.dialect.oracle.ast.stmt.OracleLockTableStatement;
import com.alibaba.druid.sql.dialect.oracle.ast.stmt.OracleMultiInsertStatement;
import com.alibaba.druid.sql.dialect.oracle.ast.stmt.OracleMultiInsertStatement.ConditionalInsertClause;
import com.alibaba.druid.sql.dialect.oracle.ast.stmt.OracleMultiInsertStatement.ConditionalInsertClauseItem;
import com.alibaba.druid.sql.dialect.oracle.ast.stmt.OracleMultiInsertStatement.InsertIntoClause;
import com.alibaba.druid.sql.dialect.oracle.ast.stmt.OraclePipeRowStatement;
import com.alibaba.druid.sql.dialect.oracle.ast.stmt.OraclePrimaryKey;
import com.alibaba.druid.sql.dialect.oracle.ast.stmt.OracleRaiseStatement;
import com.alibaba.druid.sql.dialect.oracle.ast.stmt.OracleRunStatement;
import com.alibaba.druid.sql.dialect.oracle.ast.stmt.OracleSelectJoin;
import com.alibaba.druid.sql.dialect.oracle.ast.stmt.OracleSelectPivot;
import com.alibaba.druid.sql.dialect.oracle.ast.stmt.OracleSelectPivot.Item;
import com.alibaba.druid.sql.dialect.oracle.ast.stmt.OracleSelectQueryBlock;
import com.alibaba.druid.sql.dialect.oracle.ast.stmt.OracleSelectRestriction.CheckOption;
import com.alibaba.druid.sql.dialect.oracle.ast.stmt.OracleSelectRestriction.ReadOnly;
import com.alibaba.druid.sql.dialect.oracle.ast.stmt.OracleSelectSubqueryTableSource;
import com.alibaba.druid.sql.dialect.oracle.ast.stmt.OracleSelectTableReference;
import com.alibaba.druid.sql.dialect.oracle.ast.stmt.OracleSelectUnPivot;
import com.alibaba.druid.sql.dialect.oracle.ast.stmt.OracleSetTransactionStatement;
import com.alibaba.druid.sql.dialect.oracle.ast.stmt.OracleSupplementalIdKey;
import com.alibaba.druid.sql.dialect.oracle.ast.stmt.OracleSupplementalLogGrp;
import com.alibaba.druid.sql.dialect.oracle.ast.stmt.OracleUnique;
import com.alibaba.druid.sql.dialect.oracle.ast.stmt.OracleUpdateStatement;
import com.alibaba.druid.sql.dialect.oracle.ast.stmt.OracleUsingIndexClause;
import com.alibaba.druid.sql.dialect.oracle.visitor.OracleASTVisitor;
import com.alibaba.druid.stat.TableStat;
import com.alibaba.druid.stat.TableStat.Column;
import com.alibaba.druid.stat.TableStat.Mode;
import com.tydic.common.sql.parse.SqlRewrite;

public class SafeOracleSchemaStatVisitor extends SafeSchemaStatVisitor implements OracleASTVisitor{

	public SafeOracleSchemaStatVisitor(SqlRewrite sqlRewirte) {
		super(sqlRewirte);
	}
	
	@Override
	public void setSubQueryRelationOrFlag(SQLExprImpl x) {
		SafeOracleSubQueryVisitor subQueryVisitor = new SafeOracleSubQueryVisitor();
		x.accept(subQueryVisitor);
		if (subQueryVisitor.isRelationOr()) {
			subqueryRelationOr = true;
		}
	}
	
	@Override
	public boolean visit(OracleSelectSubqueryTableSource x) {
		addSubQuerys(x.getSelect());
		return super.visit(x);
	}
	
	@Override
    public boolean visit(SQLUpdateSetItem x) {
    	String tableName=((OracleUpdateStatement)x.getParent()).getTableName().getSimpleName();
    	
    	if(sqlRewrite!=null){
    		sqlRewrite.updateSqlRewirte(tableName, x);
    	}
    	
		return true;
	}
	
	@Override
	public boolean visit(OracleCreateTableStatement x) {
		SQLName sqlName = x.getName();
		if (sqlName != null) {
			String table = sqlName.toString();
			setCurrentTable(table);
		}
		return false;
	}

	@Override
	public boolean visit(OracleInsertStatement x) {
		SQLName sqlName = x.getTableName();
		if (sqlName != null) {
			String table = sqlName.toString();
			setCurrentTable(table);
		}
		return true;
	}

	@Override
	public boolean visit(OracleDeleteStatement x) {
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

		return true;
	}
	
	@Override
	public boolean visit(OracleSelectTableReference x) {
		x.getSchemaObject();
		SQLExpr expr = x.getExpr();
		String ident="";
		if (expr instanceof SQLName) {
			if(expr instanceof  SQLIdentifierExpr){
				ident=((SQLIdentifierExpr)expr).getName();
			}else if(expr instanceof  SQLPropertyExpr){
				ident= ((SQLPropertyExpr) expr).getName();
			}
		}
        if ("DUAL".equalsIgnoreCase(ident)) {
           return true;
        }
        if (aliasMap != null) {
            String alias = x.getAlias();
            if (alias != null && !aliasMap.containsKey(alias)) {
                putAliasMap(aliasMap, alias, ident);
            }
            if (!aliasMap.containsKey(ident)) {
                putAliasMap(aliasMap, ident, ident);
            }
        }
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

			if (parent instanceof OracleSelectQueryBlock) {
				OracleSelectQueryBlock select = (OracleSelectQueryBlock) parent;
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

					if (xp.getParent() instanceof OracleSelectQueryBlock) {
						((OracleSelectQueryBlock) xp.getParent()).setWhere(notInSubQueryExpr);
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

					if (xp.getParent() instanceof OracleSelectQueryBlock) {
						((OracleSelectQueryBlock) xp.getParent()).setWhere(notInSubQueryExpr);
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

					if (xp.getParent() instanceof OracleSelectQueryBlock) {
						((OracleSelectQueryBlock) xp.getParent()).setWhere(inSubQueryExpr);
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

					if (xp.getParent() instanceof OracleSelectQueryBlock) {
						((OracleSelectQueryBlock) xp.getParent()).setWhere(notInSubQueryExpr);
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

					if (xp.getParent() instanceof OracleSelectQueryBlock) {
						((OracleSelectQueryBlock) xp.getParent()).setWhere(inSubQueryExpr);
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
	public void endVisit(OracleAnalytic x) {
		
		
	}

	@Override
	public void endVisit(OracleAnalyticWindowing x) {
		
		
	}

	@Override
	public void endVisit(OracleDbLinkExpr x) {
		
		
	}

	@Override
	public void endVisit(OracleDeleteStatement x) {
		
		
	}

	@Override
	public void endVisit(OracleIntervalExpr x) {
		
		
	}

	@Override
	public void endVisit(OracleOuterExpr x) {
		
		
	}

	@Override
	public void endVisit(OracleSelectJoin x) {
		
		
	}

	@Override
	public void endVisit(OracleSelectPivot x) {
		
		
	}

	@Override
	public void endVisit(CheckOption x) {
		
		
	}

	@Override
	public void endVisit(ReadOnly x) {
		
		
	}

	@Override
	public void endVisit(OracleSelectSubqueryTableSource x) {
		
		
	}

	@Override
	public void endVisit(OracleSelectUnPivot x) {
		
		
	}

	@Override
	public void endVisit(OracleUpdateStatement x) {
		
		
	}

	@Override
	public boolean visit(OracleAnalytic x) {
		
		return true;
	}

	@Override
	public boolean visit(OracleAnalyticWindowing x) {
		
		return true;
	}

	@Override
	public boolean visit(OracleDbLinkExpr x) {
		
		return true;
	}

	@Override
	public boolean visit(OracleIntervalExpr x) {
		
		return true;
	}

	@Override
	public boolean visit(OracleOuterExpr x) {
		
		return true;
	}

	@Override
	public boolean visit(OracleSelectJoin x) {
		
		return true;
	}

	@Override
	public boolean visit(OracleSelectPivot x) {
		
		return true;
	}

	@Override
	public boolean visit(CheckOption x) {
		
		return true;
	}

	@Override
	public boolean visit(ReadOnly x) {
		
		return true;
	}

	@Override
	public boolean visit(OracleSelectUnPivot x) {
		
		return true;
	}

	@Override
	public boolean visit(OracleUpdateStatement x) {
		
		return true;
	}

	@Override
	public boolean visit(SampleClause x) {
		
		return true;
	}

	@Override
	public void endVisit(SampleClause x) {
		
		
	}

	@Override
	public void endVisit(OracleSelectTableReference x) {
		
		
	}

	@Override
	public boolean visit(PartitionExtensionClause x) {
		
		return true;
	}

	@Override
	public void endVisit(PartitionExtensionClause x) {
		
		
	}

	@Override
	public boolean visit(OracleWithSubqueryEntry x) {
		
		return true;
	}

	@Override
	public void endVisit(OracleWithSubqueryEntry x) {
		
		
	}

	@Override
	public boolean visit(SearchClause x) {
		
		return true;
	}

	@Override
	public void endVisit(SearchClause x) {
		
		
	}

	@Override
	public boolean visit(CycleClause x) {
		
		return true;
	}

	@Override
	public void endVisit(CycleClause x) {
		
		
	}

	@Override
	public boolean visit(OracleBinaryFloatExpr x) {
		
		return true;
	}

	@Override
	public void endVisit(OracleBinaryFloatExpr x) {
		
		
	}

	@Override
	public boolean visit(OracleBinaryDoubleExpr x) {
		
		return true;
	}

	@Override
	public void endVisit(OracleBinaryDoubleExpr x) {
		
		
	}

	@Override
	public boolean visit(OracleCursorExpr x) {
		
		return true;
	}

	@Override
	public void endVisit(OracleCursorExpr x) {
		
		
	}

	@Override
	public boolean visit(OracleIsSetExpr x) {
		
		return true;
	}

	@Override
	public void endVisit(OracleIsSetExpr x) {
		
		
	}

	@Override
	public boolean visit(ReturnRowsClause x) {
		
		return true;
	}

	@Override
	public void endVisit(ReturnRowsClause x) {
		
		
	}

	@Override
	public boolean visit(MainModelClause x) {
		
		return true;
	}

	@Override
	public void endVisit(MainModelClause x) {
		
		
	}

	@Override
	public boolean visit(ModelColumnClause x) {
		
		return true;
	}

	@Override
	public void endVisit(ModelColumnClause x) {
		
		
	}

	@Override
	public void endVisit(Item x) {
		
		
	}

	@Override
	public void endVisit(QueryPartitionClause arg0) {
		
		
	}

	@Override
	public void endVisit(ModelColumn x) {
		
		
	}

	@Override
	public void endVisit(ModelRulesClause x) {
		
		
	}

	@Override
	public void endVisit(CellAssignmentItem x) {
		
		
	}

	@Override
	public void endVisit(CellAssignment x) {
		
		
	}

	@Override
	public void endVisit(ModelClause x) {
		
		
	}

	@Override
	public void endVisit(OracleReturningClause x) {
		
		
	}

	@Override
	public void endVisit(OracleInsertStatement x) {
		
		
	}

	@Override
	public void endVisit(InsertIntoClause x) {
		
		
	}

	@Override
	public void endVisit(OracleMultiInsertStatement x) {
		
		
	}

	@Override
	public void endVisit(ConditionalInsertClause x) {
		
		
	}

	@Override
	public void endVisit(ConditionalInsertClauseItem x) {
		
		
	}

	@Override
	public void endVisit(OracleSelectQueryBlock x) {
		
		
	}

	@Override
	public void endVisit(OracleLockTableStatement x) {
		
		
	}

	@Override
	public void endVisit(OracleAlterSessionStatement x) {
		
		
	}

	@Override
	public void endVisit(OracleDatetimeExpr x) {
		
		
	}

	@Override
	public void endVisit(OracleSysdateExpr x) {
		
		
	}

	@Override
	public void endVisit(OracleExceptionStatement x) {
		
		
	}

	@Override
	public void endVisit(com.alibaba.druid.sql.dialect.oracle.ast.stmt.OracleExceptionStatement.Item x) {
		
		
	}

	@Override
	public void endVisit(OracleArgumentExpr x) {
		
		
	}

	@Override
	public void endVisit(OracleSetTransactionStatement x) {
		
		
	}

	@Override
	public void endVisit(OracleExplainStatement x) {
		
		
	}

	@Override
	public void endVisit(OracleAlterTableDropPartition x) {
		
		
	}

	@Override
	public void endVisit(OracleAlterTableTruncatePartition x) {
		
		
	}

	@Override
	public void endVisit(TableSpaceItem x) {
		
		
	}

	@Override
	public void endVisit(UpdateIndexesClause x) {
		
		
	}

	@Override
	public void endVisit(NestedTablePartitionSpec x) {
		
		
	}

	@Override
	public void endVisit(OracleAlterTableSplitPartition x) {
		
		
	}

	@Override
	public void endVisit(OracleAlterTableModify x) {
		
		
	}

	@Override
	public void endVisit(OracleCreateIndexStatement x) {
		
		
	}

	@Override
	public void endVisit(OracleForStatement x) {
		
		
	}

	@Override
	public void endVisit(OracleRangeExpr x) {
		
		
	}

	@Override
	public void endVisit(OracleAlterIndexStatement x) {
		
		
	}

	@Override
	public void endVisit(OraclePrimaryKey x) {
		
		
	}

	@Override
	public void endVisit(OracleCreateTableStatement x) {
		
		
	}

	@Override
	public void endVisit(Rebuild x) {
		
		
	}

	@Override
	public void endVisit(OracleStorageClause x) {
		
		
	}

	@Override
	public void endVisit(OracleGotoStatement x) {
		
		
	}

	@Override
	public void endVisit(OracleLabelStatement x) {
		
		
	}

	@Override
	public void endVisit(OracleAlterTriggerStatement x) {
		
		
	}

	@Override
	public void endVisit(OracleAlterSynonymStatement x) {
		
		
	}

	@Override
	public void endVisit(OracleAlterViewStatement x) {
		
		
	}

	@Override
	public void endVisit(OracleAlterTableMoveTablespace x) {
		
		
	}

	@Override
	public void endVisit(OracleSizeExpr x) {
		
		
	}

	@Override
	public void endVisit(OracleFileSpecification x) {
		
		
	}

	@Override
	public void endVisit(OracleAlterTablespaceAddDataFile x) {
		
		
	}

	@Override
	public void endVisit(OracleAlterTablespaceStatement x) {
		
		
	}

	@Override
	public void endVisit(OracleExitStatement x) {
		
		
	}

	@Override
	public void endVisit(OracleContinueStatement x) {
		
		
	}

	@Override
	public void endVisit(OracleRaiseStatement x) {
		
		
	}

	@Override
	public void endVisit(OracleCreateDatabaseDbLinkStatement x) {
		
		
	}

	@Override
	public void endVisit(OracleDropDbLinkStatement x) {
		
		
	}

	@Override
	public void endVisit(OracleDataTypeIntervalYear x) {
		
		
	}

	@Override
	public void endVisit(OracleDataTypeIntervalDay x) {
		
		
	}

	@Override
	public void endVisit(OracleUsingIndexClause x) {
		
		
	}

	@Override
	public void endVisit(OracleLobStorageClause x) {
		
		
	}

	@Override
	public void endVisit(OracleUnique x) {
		
		
	}

	@Override
	public void endVisit(OracleForeignKey x) {
		
		
	}

	@Override
	public void endVisit(OracleCheck x) {
		
		
	}

	@Override
	public void endVisit(OracleSupplementalIdKey x) {
		
		
	}

	@Override
	public void endVisit(OracleSupplementalLogGrp x) {
		
		
	}

	@Override
	public void endVisit(Organization x) {
		
		
	}

	@Override
	public void endVisit(OIDIndex x) {
		
		
	}

	@Override
	public void endVisit(OracleCreatePackageStatement x) {
		
		
	}

	@Override
	public void endVisit(OracleExecuteImmediateStatement x) {
		
		
	}

	@Override
	public void endVisit(OracleTreatExpr x) {
		
		
	}

	@Override
	public void endVisit(OracleCreateSynonymStatement x) {
		
		
	}

	@Override
	public void endVisit(OracleCreateTypeStatement x) {
		
		
	}

	@Override
	public void endVisit(OraclePipeRowStatement x) {
		
		
	}

	@Override
	public void endVisit(OracleIsOfTypeExpr x) {
		
		
	}

	@Override
	public void endVisit(OracleRunStatement x) {
		
		
	}

	@Override
	public boolean visit(QueryPartitionClause arg0) {
		
		return true;
	}

	@Override
	public boolean visit(ModelColumn x) {
		
		return true;
	}

	@Override
	public boolean visit(ModelRulesClause x) {
		
		return true;
	}

	@Override
	public boolean visit(CellAssignmentItem x) {
		
		return true;
	}

	@Override
	public boolean visit(CellAssignment x) {
		
		return true;
	}

	@Override
	public boolean visit(ModelClause x) {
		
		return true;
	}

	@Override
	public boolean visit(OracleReturningClause x) {
		
		return true;
	}

	@Override
	public boolean visit(InsertIntoClause x) {
		
		return true;
	}

	@Override
	public boolean visit(OracleMultiInsertStatement x) {
		
		return true;
	}

	@Override
	public boolean visit(ConditionalInsertClause x) {
		
		return true;
	}

	@Override
	public boolean visit(ConditionalInsertClauseItem x) {
		
		return true;
	}

	@Override
	public boolean visit(OracleSelectQueryBlock x) {
		
		return true;
	}

	@Override
	public boolean visit(OracleLockTableStatement x) {
		
		return true;
	}

	@Override
	public boolean visit(OracleAlterSessionStatement x) {
		
		return true;
	}

	@Override
	public boolean visit(OracleDatetimeExpr x) {
		
		return true;
	}

	@Override
	public boolean visit(OracleSysdateExpr x) {
		
		return true;
	}

	@Override
	public boolean visit(OracleExceptionStatement x) {
		
		return true;
	}

	@Override
	public boolean visit(Item x) {
		
		return true;
	}

	@Override
	public boolean visit(com.alibaba.druid.sql.dialect.oracle.ast.stmt.OracleExceptionStatement.Item x) {
		
		return true;
	}

	@Override
	public boolean visit(OracleArgumentExpr x) {
		
		return true;
	}

	@Override
	public boolean visit(OracleSetTransactionStatement x) {
		
		return true;
	}

	@Override
	public boolean visit(OracleExplainStatement x) {
		
		return true;
	}

	@Override
	public boolean visit(OracleAlterTableDropPartition x) {
		
		return true;
	}

	@Override
	public boolean visit(OracleAlterTableTruncatePartition x) {
		
		return true;
	}

	@Override
	public boolean visit(TableSpaceItem x) {
		
		return true;
	}

	@Override
	public boolean visit(UpdateIndexesClause x) {
		
		return true;
	}

	@Override
	public boolean visit(NestedTablePartitionSpec x) {
		
		return true;
	}

	@Override
	public boolean visit(OracleAlterTableSplitPartition x) {
		
		return true;
	}

	@Override
	public boolean visit(OracleAlterTableModify x) {
		
		return true;
	}

	@Override
	public boolean visit(OracleCreateIndexStatement x) {
		
		return true;
	}

	@Override
	public boolean visit(OracleForStatement x) {
		
		return true;
	}

	@Override
	public boolean visit(OracleRangeExpr x) {
		
		return true;
	}

	@Override
	public boolean visit(OracleAlterIndexStatement x) {
		
		return true;
	}

	@Override
	public boolean visit(OraclePrimaryKey x) {
		
		return true;
	}

	@Override
	public boolean visit(Rebuild x) {
		
		return true;
	}

	@Override
	public boolean visit(OracleStorageClause x) {
		
		return true;
	}

	@Override
	public boolean visit(OracleGotoStatement x) {
		
		return true;
	}

	@Override
	public boolean visit(OracleLabelStatement x) {
		
		return true;
	}

	@Override
	public boolean visit(OracleAlterTriggerStatement x) {
		
		return true;
	}

	@Override
	public boolean visit(OracleAlterSynonymStatement x) {
		
		return true;
	}

	@Override
	public boolean visit(OracleAlterViewStatement x) {
		
		return true;
	}

	@Override
	public boolean visit(OracleAlterTableMoveTablespace x) {
		
		return true;
	}

	@Override
	public boolean visit(OracleSizeExpr x) {
		
		return true;
	}

	@Override
	public boolean visit(OracleFileSpecification x) {
		
		return true;
	}

	@Override
	public boolean visit(OracleAlterTablespaceAddDataFile x) {
		
		return true;
	}

	@Override
	public boolean visit(OracleAlterTablespaceStatement x) {
		
		return true;
	}

	@Override
	public boolean visit(OracleExitStatement x) {
		
		return true;
	}

	@Override
	public boolean visit(OracleContinueStatement x) {
		
		return true;
	}

	@Override
	public boolean visit(OracleRaiseStatement x) {
		
		return true;
	}

	@Override
	public boolean visit(OracleCreateDatabaseDbLinkStatement x) {
		
		return true;
	}

	@Override
	public boolean visit(OracleDropDbLinkStatement x) {
		
		return true;
	}

	@Override
	public boolean visit(OracleDataTypeIntervalYear x) {
		
		return true;
	}

	@Override
	public boolean visit(OracleDataTypeIntervalDay x) {
		
		return true;
	}

	@Override
	public boolean visit(OracleUsingIndexClause x) {
		
		return true;
	}

	@Override
	public boolean visit(OracleLobStorageClause x) {
		
		return true;
	}

	@Override
	public boolean visit(OracleUnique x) {
		
		return true;
	}

	@Override
	public boolean visit(OracleForeignKey x) {
		
		return true;
	}

	@Override
	public boolean visit(OracleCheck x) {
		
		return true;
	}

	@Override
	public boolean visit(OracleSupplementalIdKey x) {
		
		return true;
	}

	@Override
	public boolean visit(OracleSupplementalLogGrp x) {
		
		return true;
	}

	@Override
	public boolean visit(Organization x) {
		
		return true;
	}

	@Override
	public boolean visit(OIDIndex x) {
		
		return true;
	}

	@Override
	public boolean visit(OracleCreatePackageStatement x) {
		
		return true;
	}

	@Override
	public boolean visit(OracleExecuteImmediateStatement x) {
		
		return true;
	}

	@Override
	public boolean visit(OracleTreatExpr x) {
		
		return true;
	}

	@Override
	public boolean visit(OracleCreateSynonymStatement x) {
		
		return true;
	}

	@Override
	public boolean visit(OracleCreateTypeStatement x) {
		
		return true;
	}

	@Override
	public boolean visit(OraclePipeRowStatement x) {
		
		return true;
	}

	@Override
	public boolean visit(OracleIsOfTypeExpr x) {
		
		return true;
	}

	@Override
	public boolean visit(OracleRunStatement x) {
		
		return true;
	}

}
