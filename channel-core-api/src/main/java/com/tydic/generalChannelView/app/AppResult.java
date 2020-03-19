package com.tydic.generalChannelView.app;

import java.io.Serializable;

import com.tydic.common.bean.PageInfo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class AppResult<T> implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	public enum ResultFlag{
		SUCCESS,FAIL;
	}
	
	private String flag;
	
	private String message;
	
	private PageInfo page;
	
	private T data;
	
	public AppResult(String flag, String message) {
		this.flag= flag;
		this.message = message;
	}
	
	public AppResult(String flag, String message, T data) {
		this.flag= flag;
		this.message = message;
		this.data = data;
	}
}
