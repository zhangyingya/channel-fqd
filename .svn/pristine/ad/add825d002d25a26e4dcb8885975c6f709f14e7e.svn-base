package com.tydic.common.bean;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class Result<T> implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	public enum ResultFlag{
		SUCCESS,FAIL;
	}
	
	private ResultFlag flag;
	
	private String message;
	
	private PageInfo page;
	
	private T data;
	
	public Result(ResultFlag flag, String message) {
		this.flag= flag;
		this.message = message;
	}
	
	public Result(ResultFlag flag, String message, T data) {
		this.flag= flag;
		this.message = message;
		this.data = data;
	}
}
