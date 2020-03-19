package com.tydic.common.sql.parse.visitor;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Queue;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.concurrent.LinkedBlockingQueue;

import com.alibaba.druid.sql.ast.SQLExpr;
import com.alibaba.druid.sql.ast.SQLExprImpl;
import com.alibaba.druid.sql.ast.SQLName;
import com.alibaba.druid.sql.ast.SQLObject;
import com.alibaba.druid.sql.ast.expr.SQLBetweenExpr;
import com.alibaba.druid.sql.ast.expr.SQLBinaryOpExpr;
import com.alibaba.druid.sql.ast.expr.SQLBinaryOperator;
import com.alibaba.druid.sql.ast.expr.SQLCharExpr;
import com.alibaba.druid.sql.ast.expr.SQLExistsExpr;
import com.alibaba.druid.sql.ast.expr.SQLIdentifierExpr;
import com.alibaba.druid.sql.ast.expr.SQLInListExpr;
import com.alibaba.druid.sql.ast.expr.SQLInSubQueryExpr;
import com.alibaba.druid.sql.ast.expr.SQLPropertyExpr;
import com.alibaba.druid.sql.ast.expr.SQLQueryExpr;
import com.alibaba.druid.sql.ast.statement.SQLAlterTableItem;
import com.alibaba.druid.sql.ast.statement.SQLAlterTableStatement;
import com.alibaba.druid.sql.ast.statement.SQLInsertStatement;
import com.alibaba.druid.sql.ast.statement.SQLInsertStatement.ValuesClause;
import com.alibaba.druid.sql.ast.statement.SQLSelect;
import com.alibaba.druid.sql.ast.statement.SQLSelectItem;
import com.alibaba.druid.sql.ast.statement.SQLSelectQueryBlock;
import com.alibaba.druid.sql.ast.statement.SQLSelectStatement;
import com.alibaba.druid.sql.ast.statement.SQLSubqueryTableSource;
import com.alibaba.druid.sql.ast.statement.SQLUpdateStatement;
import com.alibaba.druid.stat.TableStat;
import com.alibaba.druid.stat.TableStat.Column;
import com.alibaba.druid.stat.TableStat.Condition;
import com.alibaba.druid.stat.TableStat.Mode;
import com.alibaba.druid.wall.spi.WallVisitorUtils;
import com.tydic.common.sql.parse.SqlRewrite;

/**
 * Druid解析器中用来从ast语法中提取表名、条件、字段等的vistor
 */
public abstract class SafeSchemaStatVisitor extends SchemaStatVisitor {
	private boolean hasOrCondition = false;
	private List<WhereUnit> whereUnits = new CopyOnWriteArrayList<WhereUnit>();
	private List<WhereUnit> storedwhereUnits = new CopyOnWriteArrayList<WhereUnit>();
	private Queue<SQLSelect> subQuerys = new LinkedBlockingQueue<SQLSelect>(); // 子查询集合
	protected boolean hasChange = false; // 是否有改写sql
	protected boolean subqueryRelationOr = false; // 子查询存在关联条件的情况下，是否有 or 条件
	protected SqlRewrite sqlRewrite;
	
	public SafeSchemaStatVisitor(SqlRewrite sqlRewirte){
		this.sqlRewrite=sqlRewirte;
	}
	
	@Override
	public boolean visit(SQLSelectItem x) {
		SQLExpr expr=x.getExpr();
		Column column=getColumn(expr);
		if (column == null) {
			return true;
		}
		
		if(sqlRewrite!=null){
			sqlRewrite.selectSqlRewirte(column, x);
		}
		return true;
	}
	
	@Override
	public boolean visit(ValuesClause x) {
		SQLInsertStatement stmt=((SQLInsertStatement)x.getParent());
		if(sqlRewrite!=null){
			sqlRewrite.insertSqlRewirte(stmt.getTableName().getSimpleName(),x);
		}
		return true;
	}
	
	@Override
	public boolean visit(SQLBinaryOpExpr x) {
		x.getLeft().setParent(x);
		x.getRight().setParent(x);
		
		/*
		 * fix bug 当 selectlist 存在多个子查询时, 主表没有别名的情况下.主表的查询条件 被错误的附加到子查询上. eg.
		 * select (select id from subtest2 where id = 1), (select id from
		 * subtest3 where id = 2) from subtest1 where id =4; 像这样的子查询, subtest1 的
		 * 过滤条件 id = 4 . 被 加入到 subtest3 上. 加别名的情况下正常,不加别名,就会存在这个问题.
		 * 这里设置好操作的是哪张表后,再进行判断.
		 */
		String currenttable = x.getParent() == null ? null : (String) x.getParent().getAttribute(ATTR_TABLE);
		if (currenttable != null) {
			this.setCurrentTable(currenttable);
		}
		
		switch (x.getOperator()) {
		case Equality:
		case LessThanOrEqualOrGreaterThan:
		case Is:
		case IsNot:
		case GreaterThan:
		case GreaterThanOrEqual:
		case LessThan:
		case LessThanOrEqual:
		case NotLessThan:
		case LessThanOrGreater:
		case NotEqual:
		case NotGreaterThan:
			handleCondition(x.getLeft(), x.getOperator().name, x.getRight());
			handleCondition(x.getRight(), x.getOperator().name, x.getLeft());
			handleRelationship(x.getLeft(), x.getOperator().name, x.getRight());
			break;
		case BooleanOr:
			// 永真条件，where条件抛弃
			if (!isConditionAlwaysTrue(x)) {
				hasOrCondition = true;

				WhereUnit whereUnit = null;
				if (conditions.size() > 0) {
					whereUnit = new WhereUnit();
					whereUnit.setFinishedParse(true);
					whereUnit.addOutConditions(getConditions());
					WhereUnit innerWhereUnit = new WhereUnit(x);
					whereUnit.addSubWhereUnit(innerWhereUnit);
				} else {
					whereUnit = new WhereUnit(x);
					whereUnit.addOutConditions(getConditions());
				}
				whereUnits.add(whereUnit);
			}
			return false;
		case Like:
		case NotLike:
		default:
			break;
		}
		return true;
	}

	@Override
	public boolean visit(SQLSelectStatement x) {
		setAliasMap();
		return true;
	}

	@Override
	public boolean visit(SQLBetweenExpr x) {
		String begin = null;
		if (x.beginExpr instanceof SQLCharExpr) {
			begin = (String) ((SQLCharExpr) x.beginExpr).getValue();
		} else {
			begin = x.beginExpr.toString();
		}
		String end = null;
		if (x.endExpr instanceof SQLCharExpr) {
			end = (String) ((SQLCharExpr) x.endExpr).getValue();
		} else {
			end = x.endExpr.toString();
		}
		Column column = getColumn(x);
		if (column == null) {
			return true;
		}

		Condition condition = null;
		for (Condition item : this.getConditions()) {
			if (item.getColumn().equals(column) && item.getOperator().equals("between")) {
				condition = item;
				break;
			}
		}

		if (condition == null) {
			condition = new Condition(column, "between");
			this.conditions.add(condition);
		}

		condition.getValues().add(begin);
		condition.getValues().add(end);

		return true;
	}

	@Override
	protected Column getColumn(SQLExpr expr) {
		Map<String, String> aliasMap = getAliasMap();
		if (aliasMap == null) {
			return null;
		}

		if (expr instanceof SQLPropertyExpr) {
			SQLExpr owner = ((SQLPropertyExpr) expr).getOwner();
			String column = ((SQLPropertyExpr) expr).getName();

			if (owner instanceof SQLIdentifierExpr) {
				String tableName = ((SQLIdentifierExpr) owner).getName();
				String table = tableName;
				if (aliasMap.containsKey(table)) {
					table = aliasMap.get(table);
				}

				if (variants.containsKey(table)) {
					return null;
				}

				if (table != null) {
					return new Column(table, column);
				}

				return handleSubQueryColumn(tableName, column);
			}

			return null;
		}

		if (expr instanceof SQLIdentifierExpr) {
			Column attrColumn = (Column) expr.getAttribute(ATTR_COLUMN);
			if (attrColumn != null) {
				return attrColumn;
			}

			String column = ((SQLIdentifierExpr) expr).getName();
			String table = getCurrentTable();
			if (table != null && aliasMap.containsKey(table)) {
				table = aliasMap.get(table);
				if (table == null) {
					return null;
				}
			}

			if (table != null) {
				return new Column(table, column);
			}

			if (variants.containsKey(column)) {
				return null;
			}

			return new Column("UNKNOWN", column);
		}

		if (expr instanceof SQLBetweenExpr) {
			SQLBetweenExpr betweenExpr = (SQLBetweenExpr) expr;

			if (betweenExpr.getTestExpr() != null) {
				String tableName = null;
				String column = null;
				if (betweenExpr.getTestExpr() instanceof SQLPropertyExpr) {// 字段带别名的
					tableName = ((SQLIdentifierExpr) ((SQLPropertyExpr) betweenExpr.getTestExpr()).getOwner())
							.getName();
					column = ((SQLPropertyExpr) betweenExpr.getTestExpr()).getName();
					SQLObject query = this.subQueryMap.get(tableName);
					if (query == null) {
						if (aliasMap.containsKey(tableName)) {
							tableName = aliasMap.get(tableName);
						}
						return new Column(tableName, column);
					}
					return handleSubQueryColumn(tableName, column);
				} else if (betweenExpr.getTestExpr() instanceof SQLIdentifierExpr) {
					column = ((SQLIdentifierExpr) betweenExpr.getTestExpr()).getName();
					// 字段不带别名的,此处如果是多表，容易出现ambiguous，
					// 不知道这个字段是属于哪个表的,fdbparser用了defaultTable，即join语句的leftTable
					tableName = getOwnerTableName(betweenExpr, column);
				}
				String table = tableName;
				if (aliasMap.containsKey(table)) {
					table = aliasMap.get(table);
				}

				if (variants.containsKey(table)) {
					return null;
				}

				if (table != null && !"".equals(table)) {
					return new Column(table, column);
				}
			}

		}
		return null;
	}

	/**
	 * 从between语句中获取字段所属的表名。 对于容易出现ambiguous的（字段不知道到底属于哪个表），实际应用中必须使用别名来避免歧义
	 * 
	 * @param betweenExpr
	 * @param column
	 * @return
	 */
	public abstract String getOwnerTableName(SQLBetweenExpr betweenExpr, String column);

	abstract void setSubQueryRelationOrFlag(SQLExprImpl x);

	/*
	 * 子查询 (non-Javadoc)
	 * 
	 * @see
	 * com.alibaba.druid.sql.visitor.SQLASTVisitorAdapter#visit(com.alibaba.
	 * druid.sql.ast.expr.SQLQueryExpr)
	 */
	@Override
	public boolean visit(SQLQueryExpr x) {
		setSubQueryRelationOrFlag(x);
		addSubQuerys(x.getSubQuery());
		return super.visit(x);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.alibaba.druid.sql.visitor.SchemaStatVisitor#visit(com.alibaba.druid.
	 * sql.ast.statement.SQLSubqueryTableSource)
	 */
	@Override
	public boolean visit(SQLSubqueryTableSource x) {
		addSubQuerys(x.getSelect());
		return super.visit(x);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.alibaba.druid.sql.visitor.SQLASTVisitorAdapter#visit(com.alibaba.
	 * druid.sql.ast.expr.SQLExistsExpr)
	 */
	@Override
	public boolean visit(SQLExistsExpr x) {
		setSubQueryRelationOrFlag(x);
		addSubQuerys(x.getSubQuery());
		return super.visit(x);
	}

	@Override
	public boolean visit(SQLInListExpr x) {
		return true;
	}

	/*
	 * 对 in 子查询的处理 (non-Javadoc)
	 * 
	 * @see
	 * com.alibaba.druid.sql.visitor.SchemaStatVisitor#visit(com.alibaba.druid.
	 * sql.ast.expr.SQLInSubQueryExpr)
	 */
	@Override
	public boolean visit(SQLInSubQueryExpr x) {
		setSubQueryRelationOrFlag(x);
		addSubQuerys(x.getSubQuery());
		return super.visit(x);
	}

	/**
	 * 分解条件
	 */
	public List<List<Condition>> splitConditions() {
		// 按照or拆分
		for (WhereUnit whereUnit : whereUnits) {
			splitUntilNoOr(whereUnit);
		}

		this.storedwhereUnits.addAll(whereUnits);

		loopFindSubWhereUnit(whereUnits);

		// 拆分后的条件块解析成Condition列表
		for (WhereUnit whereUnit : storedwhereUnits) {
			this.getConditionsFromWhereUnit(whereUnit);
		}

		// 多个WhereUnit组合:多层集合的组合
		return mergedConditions();
	}

	/**
	 * 循环寻找子WhereUnit（实际是嵌套的or）
	 * 
	 * @param whereUnitList
	 */
	private void loopFindSubWhereUnit(List<WhereUnit> whereUnitList) {
		List<WhereUnit> subWhereUnits = new ArrayList<WhereUnit>();
		for (WhereUnit whereUnit : whereUnitList) {
			if (whereUnit.getSplitedExprList().size() > 0) {
				List<SQLExpr> removeSplitedList = new ArrayList<SQLExpr>();
				for (SQLExpr sqlExpr : whereUnit.getSplitedExprList()) {
					reset();
					if (isExprHasOr(sqlExpr)) {
						removeSplitedList.add(sqlExpr);
						WhereUnit subWhereUnit = this.whereUnits.get(0);
						splitUntilNoOr(subWhereUnit);
						whereUnit.addSubWhereUnit(subWhereUnit);
						subWhereUnits.add(subWhereUnit);
					} else {
						this.conditions.clear();
					}
				}
				if (removeSplitedList.size() > 0) {
					whereUnit.getSplitedExprList().removeAll(removeSplitedList);
				}
			}
			subWhereUnits.addAll(whereUnit.getSubWhereUnit());
		}
		if (subWhereUnits.size() > 0) {
			loopFindSubWhereUnit(subWhereUnits);
		}
	}

	private boolean isExprHasOr(SQLExpr expr) {
		expr.accept(this);
		return hasOrCondition;
	}

	private List<List<Condition>> mergedConditions() {
		if (storedwhereUnits.size() == 0) {
			return new ArrayList<List<Condition>>();
		}
		for (WhereUnit whereUnit : storedwhereUnits) {
			mergeOneWhereUnit(whereUnit);
		}
		return getMergedConditionList(storedwhereUnits);

	}

	/**
	 * 一个WhereUnit内递归
	 * 
	 * @param whereUnit
	 */
	private void mergeOneWhereUnit(WhereUnit whereUnit) {
		if (whereUnit.getSubWhereUnit().size() > 0) {
			for (WhereUnit sub : whereUnit.getSubWhereUnit()) {
				mergeOneWhereUnit(sub);
			}

			if (whereUnit.getSubWhereUnit().size() > 1) {
				List<List<Condition>> mergedConditionList = getMergedConditionList(whereUnit.getSubWhereUnit());
				if (whereUnit.getOutConditions().size() > 0) {
					for (int i = 0; i < mergedConditionList.size(); i++) {
						mergedConditionList.get(i).addAll(whereUnit.getOutConditions());
					}
				}
				whereUnit.setConditionList(mergedConditionList);
			} else if (whereUnit.getSubWhereUnit().size() == 1) {
				if (whereUnit.getOutConditions().size() > 0
						&& whereUnit.getSubWhereUnit().get(0).getConditionList().size() > 0) {
					for (int i = 0; i < whereUnit.getSubWhereUnit().get(0).getConditionList().size(); i++) {
						whereUnit.getSubWhereUnit().get(0).getConditionList().get(i)
								.addAll(whereUnit.getOutConditions());
					}
				}
				whereUnit.getConditionList().addAll(whereUnit.getSubWhereUnit().get(0).getConditionList());
			}
		} else {
			// do nothing
		}
	}

	/**
	 * 条件合并：多个WhereUnit中的条件组合
	 * 
	 * @return
	 */
	private List<List<Condition>> getMergedConditionList(List<WhereUnit> whereUnitList) {
		List<List<Condition>> mergedConditionList = new ArrayList<List<Condition>>();
		if (whereUnitList.size() == 0) {
			return mergedConditionList;
		}
		mergedConditionList.addAll(whereUnitList.get(0).getConditionList());

		for (int i = 1; i < whereUnitList.size(); i++) {
			mergedConditionList = merge(mergedConditionList, whereUnitList.get(i).getConditionList());
		}
		return mergedConditionList;
	}

	/**
	 * 两个list中的条件组合
	 * 
	 * @param list1
	 * @param list2
	 * @return
	 */
	private List<List<Condition>> merge(List<List<Condition>> list1, List<List<Condition>> list2) {
		if (list1.size() == 0) {
			return list2;
		} else if (list2.size() == 0) {
			return list1;
		}

		List<List<Condition>> retList = new ArrayList<List<Condition>>();
		for (int i = 0; i < list1.size(); i++) {
			for (int j = 0; j < list2.size(); j++) {
				// List<Condition> listTmp = new ArrayList<Condition>();
				// listTmp.addAll(list1.get(i));
				// listTmp.addAll(list2.get(j));
				// retList.add(listTmp);
				/**
				 * 单纯做笛卡尔积运算，会导致非常多不必要的条件列表，</br>
				 * 当whereUnit和条件相对多时，会急剧增长条件列表项，内存直线上升，导致假死状态</br>
				 * 因此，修改算法为 </br>
				 * 1、先合并两个条件列表的元素为一个条件列表</br>
				 * 2、计算合并后的条件列表，在结果retList中：</br>
				 * &nbsp;2-1、如果当前的条件列表 是 另外一个条件列表的 超集，更新，并标识已存在</br>
				 * &nbsp;2-2、如果当前的条件列表 是 另外一个条件列表的 子集，标识已存在</br>
				 * 3、最后，如果被标识不存在，加入结果retList，否则丢弃。</br>
				 * 
				 * @author SvenAugustus
				 */
				// 合并两个条件列表的元素为一个条件列表
				List<Condition> listTmp = mergeSqlConditionList(list1.get(i), list2.get(j));

				// 判定当前的条件列表 是否 另外一个条件列表的 子集
				boolean exists = false;
				Iterator<List<Condition>> it = retList.iterator();
				while (it.hasNext()) {
					List<Condition> result = (List<Condition>) it.next();
					if (result != null && listTmp != null && listTmp.size() > result.size()) {
						// 如果当前的条件列表 是 另外一个条件列表的 超集，更新，并标识已存在
						if (sqlConditionListInOther(result, listTmp)) {
							result.clear();
							result.addAll(listTmp);
							exists = true;
							break;
						}
					} else {
						// 如果当前的条件列表 是 另外一个条件列表的 子集，标识已存在
						if (sqlConditionListInOther(listTmp, result)) {
							exists = true;
							break;
						}
					}
				}
				if (!exists) {// 被标识不存在，加入
					retList.add(listTmp);
				} // 否则丢弃
			}
		}
		return retList;
	}

	private void getConditionsFromWhereUnit(WhereUnit whereUnit) {
		List<List<Condition>> retList = new ArrayList<List<Condition>>();
		// or语句外层的条件:如where condition1 and (condition2 or
		// condition3),condition1就会在外层条件中,因为之前提取
		List<Condition> outSideCondition = new ArrayList<Condition>();
		// stashOutSideConditions();
		outSideCondition.addAll(conditions);
		this.conditions.clear();
		for (SQLExpr sqlExpr : whereUnit.getSplitedExprList()) {
			sqlExpr.accept(this);
			// List<Condition> conditions = new ArrayList<Condition>();
			// conditions.addAll(getConditions());
			// conditions.addAll(outSideCondition);
			/**
			 * 合并两个条件列表的元素为一个条件列表，减少不必要多的条件项</br>
			 * 
			 * @author SvenAugustus
			 */
			List<Condition> conditions = mergeSqlConditionList(getConditions(), outSideCondition);
			retList.add(conditions);
			this.conditions.clear();
		}
		whereUnit.setConditionList(retList);

		for (WhereUnit subWhere : whereUnit.getSubWhereUnit()) {
			getConditionsFromWhereUnit(subWhere);
		}
	}

	/**
	 * 递归拆分OR
	 * 
	 * @param whereUnit
	 *            TODO:考虑嵌套or语句，条件中有子查询、 exists等很多种复杂情况是否能兼容
	 */
	private void splitUntilNoOr(WhereUnit whereUnit) {
		if (whereUnit.isFinishedParse()) {
			if (whereUnit.getSubWhereUnit().size() > 0) {
				for (int i = 0; i < whereUnit.getSubWhereUnit().size(); i++) {
					splitUntilNoOr(whereUnit.getSubWhereUnit().get(i));
				}
			}
		} else {
			SQLBinaryOpExpr expr = whereUnit.getCanSplitExpr();
			if (expr.getOperator() == SQLBinaryOperator.BooleanOr) {
				// whereUnit.addSplitedExpr(expr.getRight());
				addExprIfNotFalse(whereUnit, expr.getRight());
				if (expr.getLeft() instanceof SQLBinaryOpExpr) {
					whereUnit.setCanSplitExpr((SQLBinaryOpExpr) expr.getLeft());
					splitUntilNoOr(whereUnit);
				} else {
					addExprIfNotFalse(whereUnit, expr.getLeft());
				}
			} else {
				addExprIfNotFalse(whereUnit, expr);
				whereUnit.setFinishedParse(true);
			}
		}
	}

	private void addExprIfNotFalse(WhereUnit whereUnit, SQLExpr expr) {
		// 非永假条件加入路由计算
		if (!isConditionAlwaysFalse(expr)) {
			whereUnit.addSplitedExpr(expr);
		}
	}

	@Override
	public boolean visit(SQLAlterTableStatement x) {
		String tableName = x.getName().toString();
		TableStat stat = getTableStat(tableName, tableName);
		stat.incrementAlterCount();

		setCurrentTable(x, tableName);

		for (SQLAlterTableItem item : x.getItems()) {
			item.setParent(x);
			item.accept(this);
		}

		return false;
	}

	public boolean visit(SQLUpdateStatement x) {
		setAliasMap();

		setMode(x, Mode.Update);

		SQLName identName = x.getTableName();
		if (identName != null) {
			String ident = identName.toString();
			String alias = x.getTableSource().getAlias();
			setCurrentTable(ident);

			TableStat stat = getTableStat(ident);
			stat.incrementUpdateCount();

			Map<String, String> aliasMap = getAliasMap();

			aliasMap.put(ident, ident);
			if (alias != null) {
				aliasMap.put(alias, ident);
			}
		} else {
			x.getTableSource().accept(this);
		}

		accept(x.getItems());
		accept(x.getWhere());

		return true;
	}

	public Queue<SQLSelect> getSubQuerys() {
		return subQuerys;
	}

	protected void addSubQuerys(SQLSelect sqlselect) {
		/* 多个 sqlselect 之间 , equals 和 hashcode 是相同的.去重时 都被过滤掉了. */
		if (subQuerys.isEmpty()) {
			subQuerys.add(sqlselect);
			return;
		}
		boolean exists = false;
		Iterator<SQLSelect> iter = subQuerys.iterator();
		while (iter.hasNext()) {
			SQLSelect ss = iter.next();
			if (ss.getQuery() instanceof SQLSelectQueryBlock && sqlselect.getQuery() instanceof SQLSelectQueryBlock) {
				SQLSelectQueryBlock current = (SQLSelectQueryBlock) sqlselect.getQuery();
				SQLSelectQueryBlock ssqb = (SQLSelectQueryBlock) ss.getQuery();
				// if(!sqlSelectQueryBlockEquals(ssqb,current)){
				// subQuerys.add(sqlselect);
				// }
				/**
				 * 修正判定逻辑，应改为全不在subQuerys中才加入<br/>
				 * 
				 * @author SvenAugustus
				 */
				if (sqlSelectQueryBlockEquals(current, ssqb)) {
					exists = true;
					break;
				}
			}
		}
		if (!exists) {
			subQuerys.add(sqlselect);
		}
	}

	/*
	 * 多个 sqlselect 之间 , equals 和 hashcode 是相同的.去重时 使用 SQLSelectQueryBlock
	 * equals 方法
	 */
	private boolean sqlSelectQueryBlockEquals(SQLSelectQueryBlock obj1, SQLSelectQueryBlock obj2) {
		if (obj1 == obj2)
			return true;
		if (obj2 == null)
			return false;
		if (obj1.getClass() != obj2.getClass())
			return false;
		if (obj1.isParenthesized() ^ obj2.isParenthesized())
			return false;
		if (obj1.getDistionOption() != obj2.getDistionOption())
			return false;
		if (obj1.getFrom() == null) {
			if (obj2.getFrom() != null)
				return false;
		} else if (!obj1.getFrom().equals(obj2.getFrom()))
			return false;
		if (obj1.getGroupBy() == null) {
			if (obj2.getGroupBy() != null)
				return false;
		} else if (!obj1.getGroupBy().equals(obj2.getGroupBy()))
			return false;
		if (obj1.getInto() == null) {
			if (obj2.getInto() != null)
				return false;
		} else if (!obj1.getInto().equals(obj2.getInto()))
			return false;
		if (obj1.getSelectList() == null) {
			if (obj2.getSelectList() != null)
				return false;
		} else if (!obj1.getSelectList().equals(obj2.getSelectList()))
			return false;
		if (obj1.getWhere() == null) {
			if (obj2.getWhere() != null)
				return false;
		} else if (!obj1.getWhere().equals(obj2.getWhere()))
			return false;
		return true;
	}

	public boolean isHasChange() {
		return hasChange;
	}

	public boolean isSubqueryRelationOr() {
		return subqueryRelationOr;
	}

	/**
	 * 判定当前的条件列表 是否 另外一个条件列表的 子集
	 * 
	 * @author SvenAugustus
	 * @param current
	 *            当前的条件列表
	 * @param other
	 *            另外一个条件列表
	 * @return
	 */
	private boolean sqlConditionListInOther(List<Condition> current, List<Condition> other) {
		if (current == null) {
			if (other != null) {
				return false;
			}
			return true;
		}
		if (current.size() > other.size()) {
			return false;
		}
		if (other.size() == current.size()) {
			// 判定两个条件列表的元素是否内容相等
			return sqlConditionListEquals(current, other);
		}
		for (int j = 0; j < current.size(); j++) {
			boolean exists = false;
			for (int i = 0; i < other.size(); i++) {
				// 判定两个条件是否相等
				if (sqlConditionEquals(current.get(j), other.get(i))) {
					exists = true;
					break;
				}
			}
			if (!exists) {
				return false;
			}
		}
		return true;
	}

	/**
	 * 判定两个条件列表的元素是否内容相等
	 * 
	 * @author SvenAugustus
	 * @param list1
	 * @param list2
	 * @return
	 */
	private boolean sqlConditionListEquals(List<Condition> list1, List<Condition> list2) {
		if (list1 == null) {
			if (list2 != null) {
				return false;
			}
			return true;
		}
		if (list2.size() != list1.size()) {
			return false;
		}
		int len = list1.size();
		for (int j = 0; j < len; j++) {
			boolean exists = false;
			for (int i = 0; i < len; i++) {
				// 判定两个条件是否相等
				if (sqlConditionEquals(list2.get(j), list1.get(i))) {
					exists = true;
					break;
				}
			}
			if (!exists) {
				return false;
			}
		}
		return true;
	}

	/**
	 * 合并两个条件列表的元素为一个条件列表
	 * 
	 * @author SvenAugustus
	 * @param list1
	 *            条件列表1
	 * @param list2
	 *            条件列表2
	 * @return
	 */
	private List<Condition> mergeSqlConditionList(List<Condition> list1, List<Condition> list2) {
		if (list1 == null) {
			list1 = new ArrayList<Condition>();
		}
		if (list2 == null) {
			list2 = new ArrayList<Condition>();
		}
		List<Condition> retList = new ArrayList<Condition>();
		if (!list1.isEmpty() && !(list1.get(0) instanceof Condition)) {
			return retList;
		}
		if (!list2.isEmpty() && !(list2.get(0) instanceof Condition)) {
			return retList;
		}
		retList.addAll(list1);
		for (int j = 0; j < list2.size(); j++) {
			boolean exists = false;
			for (int i = 0; i < list1.size(); i++) {
				if (sqlConditionEquals(list2.get(j), list1.get(i))) {
					exists = true;
					break;
				}
			}
			if (!exists) {
				retList.add(list2.get(j));
			}
		}
		return retList;
	}

	/**
	 * 判定两个条件是否相等
	 * 
	 * @author SvenAugustus
	 * @param obj1
	 * @param obj2
	 * @return
	 */
	private boolean sqlConditionEquals(Condition obj1, Condition obj2) {
		if (obj1 == obj2) {
			return true;
		}
		if (obj2 == null) {
			return false;
		}
		if (obj1.getClass() != obj2.getClass()) {
			return false;
		}
		Condition other = (Condition) obj2;
		if (obj1.getColumn() == null) {
			if (other.getColumn() != null) {
				return false;
			}
		} else if (!obj1.getColumn().equals(other.getColumn())) {
			return false;
		}
		if (obj1.getOperator() == null) {
			if (other.getOperator() != null) {
				return false;
			}
		} else if (!obj1.getOperator().equals(other.getOperator())) {
			return false;
		}
		if (obj1.getValues() == null) {
			if (other.getValues() != null) {
				return false;
			}
		} else {
			boolean notEquals = false;
			for (Object val1 : obj1.getValues()) {
				for (Object val2 : obj2.getValues()) {
					if (val1 == null) {
						if (val2 != null) {
							notEquals = true;
							break;
						}
					} else if (!val1.equals(val2)) {
						notEquals = true;
						break;
					}
				}
				if (notEquals)
					break;
			}
			if (notEquals)
				return false;
		}
		return true;
	}

	/**
	 * 判断条件是否永真
	 * 
	 * @param expr
	 * @return
	 */
	public static boolean isConditionAlwaysTrue(SQLExpr expr) {
		Object o = WallVisitorUtils.getValue(expr);
		if (Boolean.TRUE.equals(o)) {
			return true;
		}
		return false;
	}

	/**
	 * 判断条件是否永假的
	 * 
	 * @param expr
	 * @return
	 */
	public static boolean isConditionAlwaysFalse(SQLExpr expr) {
		Object o = WallVisitorUtils.getValue(expr);
		if (Boolean.FALSE.equals(o)) {
			return true;
		}
		return false;
	}
	
	private void reset() {
		this.conditions.clear();
		this.whereUnits.clear();
		this.hasOrCondition = false;
	}

	public List<WhereUnit> getWhereUnits() {
		return whereUnits;
	}

	public boolean hasOrCondition() {
		return hasOrCondition;
	}
}
