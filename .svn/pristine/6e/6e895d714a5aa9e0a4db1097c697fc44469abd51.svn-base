package com.tydic.common;

/**
 *	//TODO
 *
 * @author fubin {@link fubin@tydic.com} 
 * @version  fp 下午4:57:54
 * @since 1.0
 **/
public final class PageContext {
	
	private static final ThreadLocal<BaseBean> pageLocal = new ThreadLocal<BaseBean>();
	private static final ThreadLocal<Long> pageTotalLocal = new ThreadLocal<Long>();
	
	public static Long getPageTotal(){
		return pageTotalLocal.get();
	}
	
	public static void setPageTotal(Long total){
		pageTotalLocal.set(total);
	}
	
	public static void removePageTotal(){
		 pageTotalLocal.remove();
	}
	
	public static void addPageContext(BaseBean model){
		pageLocal.set(model);
	}
	
	public static BaseBean getPageContext(){
		return pageLocal.get();
	}
	
	public static void clear(){
		 pageLocal.remove();
	}
}
