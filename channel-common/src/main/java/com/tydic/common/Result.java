package com.tydic.common;

/**
 * ajax 请求结果类
 * @ClassName: Result 
 * @Description: TODO
 * @author linfeng.huang@isca.com.cn
 * @date 2015年8月25日 下午2:26:18 
 *
 */
public class Result {
	
	public enum ResultType{
		SUCCESS("成功"),FAIL("失败");
		
		private String name;
		
		private ResultType(String name){
			this.name=name;
		}
		
		public String getName(){
			return name;
		}
	}
	
	private ResultType flag;
	private String errorType;
	private String msg;
	
	public Result(ResultType flag){
		this.flag=flag;
	}
	
	public Result(ResultType flag,String msg){
		this.flag=flag;
		this.msg=msg;
	}
	
	public static Result getInstance(ResultType flag,String msg){
		Result r=new Result(flag);
		r.setMsg(msg);
		return r;
	}
	
	public static Result getInstance(ResultType flag,String errorType,String msg){
		Result r=new Result(flag);
		r.setErrorType(errorType);
		r.setMsg(msg);
		return r;
	}
	
	/**
	 * 操作成功
	 * @return
	 */
	public static Result success(){
		return new Result(ResultType.SUCCESS);
	}
	
	/**
	 * 操作成功
	 * @param msg
	 * @return
	 */
	public static Result success(String msg){
		return new Result(ResultType.SUCCESS,msg);
	}
	
	/**
	 * 操作失败
	 * @param msg
	 * @return
	 */
	public static Result fail(String msg){
		return new Result(ResultType.FAIL,msg);
	}
	
	public ResultType getFlag() {
		return flag;
	}
	public void setFlag(ResultType flag) {
		this.flag = flag;
	}
	public String getMsg() {
		return msg;
	}
	public void setMsg(String msg) {
		this.msg = msg;
	}

	public String getErrorType() {
		return errorType;
	}

	public void setErrorType(String errorType) {
		this.errorType = errorType;
	}

	@Override
	public String toString() {
		StringBuffer sb=new StringBuffer();
		sb.append("{\"flag\":\"");
		sb.append(flag.toString());
		sb.append("\",\"errorType\":\"");
		sb.append(errorType);
		sb.append("\",\"msg\":\"");
		sb.append(msg);
		sb.append("\"}");
		return sb.toString();
	}
	
}
