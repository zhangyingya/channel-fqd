package com.tydic.common.exception;

public class DesenException extends RuntimeException {
	private static final long serialVersionUID = -9012643667288015997L;

	private Integer errCode;
	
	private Object object;
	
	public Object getObject() {
		return object;
	}

	public Integer getErrCode() {
		return errCode;
	}

	public DesenException() {
		super();
	}

	public DesenException(String message) {
		super(message);
	}
	
	public DesenException(String message,Integer errorCode) {
		super(message);
		this.errCode = errorCode;
	}

	public DesenException(String message, Throwable cause) {
		super(message, cause);
	}
	
	public DesenException(String message, Throwable cause,Integer errorCode) {
		super(message, cause);
		this.errCode = errorCode;
	}
	
	public DesenException(String message, Integer errorCode,Object object) {
		super(message);
		this.errCode = errorCode;
		this.object = object;
	}
	
	public DesenException(String message, Throwable cause,Integer errorCode,Object object) {
		super(message, cause);
		this.errCode = errorCode;
		this.object = object;
	}

	public DesenException(Throwable cause,Integer errorCode) {
		super(cause);
		this.errCode = errorCode;
	}
}
