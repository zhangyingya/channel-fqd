/*
 * Copyright © 2016，the original authors or Tianyuan DIC Computer Co., Ltd.
 *
 * Please see the tydic success stories and it solutions 
 *
 *      http://www.tydic.com/Default.aspx
 *
 * Statement: This document's code after sufficiently has not permitted does not have 
 * any way dissemination and the change, once discovered violates the stipulation, will
 * receive the criminal sanction.
 * Address: 3/F,T3 Building, South 7th Road, South Area, Hi-tech Industrial park, Shenzhen, P.R.C.
 * Email: fubin@tydic.com　
 * Tel: +86 17355100932 
 */
package com.tydic.common.exception;

/**
 *	//TODO
 *
 * @author fubin {@link fubin@tydic.com} 
 * @version  fp 下午4:58:51
 * @since 1.0
 **/
public class PaginationException extends RuntimeException{
	private static final long serialVersionUID = 1L;

	public PaginationException(){
		super();
	}
	
	public PaginationException(String m){
		super(m);
	}
	
	public PaginationException(String m,Exception e){
		super(m,e);
	}
	
	public PaginationException(Exception e){
		super(e);
	}
}
