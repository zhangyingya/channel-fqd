package com.tydic.common.ssh;

public class SSHExecRes {

	/**
	 * 返回状态码 （在linux中可以通过 echo $? 可知每步执行令执行的状态码）  
	 */
	private int exitStuts;
	/**
	 * 标准正确输出流内容  
	 */
    private String outRes;
    /**
     * 标准错误输出流内容  
     */
    private String errRes;
    
    public SSHExecRes(int exitStuts,String outRes,String errRes){
    	this.exitStuts=exitStuts;
    	this.outRes=outRes;
    	this.errRes=errRes;
    }
    
	public int getExitStuts() {
		return exitStuts;
	}
	public void setExitStuts(int exitStuts) {
		this.exitStuts = exitStuts;
	}
	public String getOutRes() {
		return outRes;
	}
	public void setOutRes(String outRes) {
		this.outRes = outRes;
	}
	public String getErrRes() {
		return errRes;
	}
	public void setErrRes(String errRes) {
		this.errRes = errRes;
	}
}
