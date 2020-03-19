package com.tydic.common.page;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Pager<T> implements java.io.Serializable {

	private int pageId = 1; // 当前页
	private int rowCount = 0; // 总行数
	private int pageSize = 10; // 每页记录数
	private int pageCount = 0; // 总页数
	private int pageOffset = 0;// 当前页起始记录
	private int pageTail = 0;// 当前页到达的记录
	private String whereOther;//附加查询条件
	private String orderField;
	private boolean orderDirection;
	private Boolean pagination = true;//默认为分页
	
	private T model;//
	private Map<String, Object> params = new HashMap<String, Object>();//其它参数
	private List<T> results;//对应的当前页记录
	
	@SuppressWarnings("unused")
	private String mysqlQueryCondition;

	// 页面显示分页按钮个数
	private int length = 6;
	// 开始分页数字
	private int startIndex = 0;
	// 结束分页数字
	private int endIndex = 0;
	// 上一页分页数字
	private int prevIndex = 0;
	// 下一页分页数字
	private int nextIndex = 0;
	// 当前页面索引值
	private int[] indexs;

	public Pager() {
		this.orderDirection = true;
	}

	public int getLength() {
		return length;
	}

	public void setLength(int length) {
		this.length = length;
	}

	public int[] getIndexs() {
		int len = getEndIndex() - getStartIndex() + 1;
		if(len>0){
			indexs = new int[len];
			for (int i = 0; i < len; i++) {
				indexs[i] = (getStartIndex() + i);
			}
		}
		return indexs;
	}

	public void setIndexs(int[] indexs) {
		this.indexs = indexs;
	}

	public int getStartIndex() {
		startIndex = pageId - (length / 2);
		if (startIndex < 1) {
			startIndex = 1;
		}
		return startIndex;
	}

	public void setStartIndex(int startIndex) {
		this.startIndex = startIndex;
	}

	public int getEndIndex() {
		if (getStartIndex() < 1) {
			setStartIndex(1);
		}
		endIndex = (getStartIndex() + length) <= getPageCount() ? (getStartIndex() + length)
				: getPageCount();
		return endIndex;
	}

	public void setEndIndex(int endIndex) {
		this.endIndex = endIndex;
	}

	protected void doPage() {
	    if(this.pageSize != 0){
	        this.pageCount = this.rowCount / this.pageSize + 1;
	        // 如果模板==0，且总数大于1，则减一
	        if ((this.rowCount % this.pageSize == 0) && pageCount > 1)
	            this.pageCount--;

	        getPrevIndex();
	        getNextIndex();
	        
	        //计算当页起止记录行号
	        if(this.pageOffset == 0){
	            this.pageOffset = (this.pageId - 1) * this.pageSize;
	        }
	        this.pageTail = this.pageOffset + this.pageSize;
	        if ((this.pageOffset + this.pageSize) > this.rowCount)
	            this.pageTail = this.rowCount;
	    }
	}

	public String getOrderCondition() {
		String condition = "";
		if (this.orderField != null && this.orderField.length() != 0) {
			condition = " order by " + orderField
					+ (orderDirection ? " " : " desc ");
		}
		return condition;
	}

	public String getMysqlQueryCondition() {
		String condition = "";
		if(pageSize>0 && pagination){
			condition = " limit " + pageOffset + "," + pageSize;
		}
		return condition;
	}

	public void setOrderDirection(boolean orderDirection) {
		this.orderDirection = orderDirection;
	}

	public boolean isOrderDirection() {
		return orderDirection;
	}

	public void setOrderField(String orderField) {
		this.orderField = orderField;
	}

	public String getOrderField() {
		return orderField;
	}

	public void setPageCount(int pageCount) {
		this.pageCount = pageCount;
	}

	public int getPageCount() {
		return pageCount;
	}

	public void setPageId(int pageId) {
		this.pageId = pageId;
	}

	public int getPageId() {
		return pageId;
	}

	public void setPageOffset(int pageOffset) {
		this.pageOffset = pageOffset;
	}

	public int getPageOffset() {
		return pageOffset;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	public int getPageSize() {
		return pageSize;
	}

	public void setPageTail(int pageTail) {
		this.pageTail = pageTail;
	}

	public int getPageTail() {
		return pageTail;
	}

	public void setRowCount(int rowCount) {
		this.rowCount = rowCount;
		this.doPage();
	}

	public int getRowCount() {
		return rowCount;
	}

	public int getPrevIndex() {
		if (pageId > 1) {
			prevIndex = pageId - 1;
		} else {
			prevIndex = 1;
		}
		return prevIndex;
	}

	public void setPrevIndex(int prevIndex) {
		this.prevIndex = prevIndex;
	}

	public int getNextIndex() {
		if (pageId < pageCount) {
			nextIndex = pageId + 1;
		} else {
			nextIndex = pageId;
		}
		return nextIndex;
	}

	public void setNextIndex(int nextIndex) {
		this.nextIndex = nextIndex;
	}

	public void setMysqlQueryCondition(String mysqlQueryCondition) {
		this.mysqlQueryCondition = mysqlQueryCondition;
	}

	public String getWhereOther() {
		return whereOther;
	}

	public void setWhereOther(String whereOther) {
		this.whereOther = whereOther;
	}

	public Boolean getPagination() {
		return pagination;
	}

	public void setPagination(Boolean pagination) {
		this.pagination = pagination;
	}

	public List<T> getResults() {
		return results;
	}

	public void setResults(List<T> results) {
		this.results = results;
	}

	public T getModel() {
		return model;
	}

	public void setModel(T model) {
		this.model = model;
	}

	public Map<String, Object> getParams() {
		return params;
	}

	public void setParams(Map<String, Object> params) {
		this.params = params;
	}
}