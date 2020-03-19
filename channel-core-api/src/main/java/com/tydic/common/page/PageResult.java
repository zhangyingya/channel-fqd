package com.tydic.common.page;


import java.util.List;

import com.tydic.common.BaseBean;

import lombok.Getter;
import lombok.Setter;

/**
 * 前端表格分页器
 * @author yuanxh
 *
 * @param <T>
 */
@Getter
@Setter
public class PageResult<T> implements java.io.Serializable {
	
	private static final long serialVersionUID = 1L;
	private Long recTime = System.currentTimeMillis();
	private Integer curPage;
	private String resultCode;
	private Integer pageSize;
	private Integer totalRecord;
	private String msg;
	private Integer totalPage;
	private List<T> result;
	
	public PageResult() {
		
	}
	
	public PageResult(Integer curPage, String resultCode, String msg,
			Integer pageSize, Integer totalRecord, Integer totalPage,List<T> result) {
		super();
		this.curPage = curPage;
		this.resultCode = resultCode;
		this.msg = msg;
		this.pageSize = pageSize;
		this.totalRecord = totalRecord;
		this.totalPage = totalPage;
		this.result = result;
	}
	
	public PageResult(Long count, Pager<T> pageInfo, List<T> result) {
		this.resultCode = "200";
		this.msg = "成功";
		this.pageSize = pageInfo.getPageSize();
		this.totalRecord = pageInfo.getRowCount();
		this.totalPage = pageInfo.getPageCount();
		this.curPage = pageInfo.getPageId();
		this.result = result;
	}
	
	public PageResult(Integer curPage, Long count, List<T> result) {
		this.resultCode = "200";
		this.msg = "成功";
		Pager<T> pager = new Pager<T>();
		if(count == null) {
			pager.setRowCount(0);
		} else {
			pager.setRowCount(count.intValue());
		}
		this.pageSize = pager.getPageSize();
		this.totalRecord = pager.getRowCount();
		this.totalPage = pager.getPageCount();
		this.curPage = curPage;
		this.result = result;
	}
	
	public PageResult(Integer curPage, Integer pageSize, Long count, List<T> result) {
		this.resultCode = "200";
		this.msg = "成功";
		Pager<T> pager = new Pager<T>();
		if(pageSize != null) {
			pager.setPageSize(pageSize);
		}
		if(count == null) {
			pager.setRowCount(0);
		} else {
			pager.setRowCount(count.intValue());
		}
		this.pageSize = pager.getPageSize();
		this.totalRecord = pager.getRowCount();
		this.totalPage = pager.getPageCount();
		this.curPage = curPage;
		this.result = result;
	}
	
	public PageResult(BaseBean record, Long count, List<T> result) {
		this.resultCode = "200";
		this.msg = "成功";
		Pager<T> pager = new Pager<T>();
		if(record != null && record.getCurrentPage() != null) {
			this.curPage = record.getCurrentPage();
		}
		if(record != null && record.getPageSize() != null) {
			pager.setPageSize(record.getPageSize());
		}
		if(count == null) {
			pager.setRowCount(0);
		} else {
			pager.setRowCount(count.intValue());
		}
		this.pageSize = pager.getPageSize();
		this.totalRecord = pager.getRowCount();
		this.totalPage = pager.getPageCount();
		
		this.result = result;
	}

}
