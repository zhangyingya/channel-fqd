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
import com.alibaba.druid.sql.ast.statement.SQLUpdateStatement;
import com.alibaba.druid.sql.dialect.hive.stmt.HiveCreateTableStatement;
import com.alibaba.druid.sql.dialect.hive.visitor.HiveASTVisitor;
import com.alibaba.druid.sql.dialect.mysql.ast.statement.MySqlSelectQueryBlock;
import com.alibaba.druid.stat.TableStat.Column;
import com.tydic.common.sql.parse.SqlRewrite;

public class SafeHiveSchemaStatVisitor extends SafeSchemaStatVisitor implements HiveASTVisitor{

	public SafeHiveSchemaStatVisitor(SqlRewrite sqlRewirte) {
		super(sqlRewirte);
	}

	@Override
	public void setSubQueryRelationOrFlag(SQLExprImpl x) {
		SafeMySqlSubQueryVisitor subQueryVisitor = new SafeMySqlSubQueryVisitor();
		x.accept(subQueryVisitor);
		if (subQueryVisitor.isRelationOr()) {
			subqueryRelationOr = true;
		}
	}
	
	@Override
	public boolean visit(HiveCreateTableStatement x) {
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
	public void endVisit(HiveCreateTableStatement x) {
	}

}
