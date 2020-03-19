package com.tydic.common.exception;

public class ParameterException extends RuntimeException {
	private static final long serialVersionUID = -9012643667288015997L;

	private String parameterClassName;
	private String parameterName;
	
	public ParameterException() {
		super();
	}

	public ParameterException(String message) {
		super(message);
	}

	public ParameterException(String message, Throwable cause) {
		super(message, cause);
	}
	
	public ParameterException(String message, String parameterClassName,String parameterName) {
		super(message);
		this.parameterClassName=parameterClassName;
		this.parameterName=parameterName;
	}
	
	public ParameterException(String message, String parameterClassName,String parameterName,Throwable cause) {
		super(message, cause);
		this.parameterClassName=parameterClassName;
		this.parameterName=parameterName;
	}

	public String getParameterClassName() {
		return parameterClassName;
	}

	public void setParameterClassName(String parameterClassName) {
		this.parameterClassName = parameterClassName;
	}

	public String getParameterName() {
		return parameterName;
	}

	public void setParameterName(String parameterName) {
		this.parameterName = parameterName;
	}
	
}
