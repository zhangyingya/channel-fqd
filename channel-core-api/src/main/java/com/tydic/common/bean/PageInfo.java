package com.tydic.common.bean;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class PageInfo implements Serializable{

	private static final long serialVersionUID = 1L;
	
	private long totalElements;
	
	private int totalPages;
	
	private int pageNumber = 1;
	
	private int pageSize = 10;
	
}
