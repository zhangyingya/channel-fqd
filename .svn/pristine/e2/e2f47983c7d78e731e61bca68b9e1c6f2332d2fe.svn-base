package com.tydic.common;

import java.io.Serializable;

public class BaseBean implements Serializable{

	private static final long serialVersionUID = -4398466870884714888L;
	private Integer pageSize = 10;
	private Integer pageNo = -1;
	private Long dataTotal;
	
	private Boolean countFlag = true;
	
	public Integer getPageSize() {
		return pageSize;
	}
	public void setPageSize(Integer pageSize) {
		this.pageSize = pageSize;
	}
	public Integer getPageNo() {
		return pageNo;
	}
	public void setPageNo(Integer pageNo) {
		this.pageNo = pageNo;
	}
	public Integer getCurrentPage() {
		return getPageNo();
	}
	public void setCurrentPage(Integer currentPage) {
		setPageNo(currentPage);
	}
	public Boolean getCountFlag() {
		return countFlag;
	}
	public void setCountFlag(Boolean countFlag) {
		this.countFlag = countFlag;
	}
	public Long getDataTotal() {
		return dataTotal;
	}
	public void setDataTotal(Long dataTotal) {
		this.dataTotal = dataTotal;
	}
}
