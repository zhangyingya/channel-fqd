package com.tydic.common.utils;

import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * 
 * 枚举工具类
 * @ClassName: EnumUtil 
 * @author huanglinfeng@tydic.com
 * @date 2017年6月7日 上午9:08:12 
 *
 */
public class EnumUtil {
	private static Logger log=LoggerFactory.getLogger(EnumUtil.class);
	
	/**
	 * 将枚举对象 转换成list集合
	 * 枚举属性被转换成map对象
	 * @Title: enumToList 
	 * @author huanglinfeng@tydic.com
	 * @date 2017年6月7日 上午9:07:41
	 * 
	 * @param clazz
	 * @return
	 */
	public static <T> List<Map<String,Object>> enumToList(Class<T> clazz){
		if(!clazz.isEnum()){
			throw new IllegalArgumentException("请传入枚举类型!");
		}
		
		List<Map<String,Object>> list=new ArrayList<Map<String,Object>>();
		
		//获取枚举的所有实列
		T[] _objs=clazz.getEnumConstants();
		
		//获取枚举类的所有方法
		Method[] _methods=clazz.getMethods();
		
		for(T _obj : _objs){
			Map<String,Object> _m=new HashMap<String,Object>();
			_m.put("casename", _obj.toString());
			for(Method _method : _methods){
				if(!_method.getName().startsWith("get")){
					continue;
				}
				
				String _methodName=_method.getName().substring(3).toLowerCase();
				try {
                    _m.put(_methodName, _method.invoke(_obj));
                } catch (Exception e) {
                	log.error(e.getMessage(),e);
                }
				
			}
			list.add(_m);
		}
		
		return list;
	}
	
	/**
	 * 获取枚举实例
	 * 根据枚举中的某个字段等于某个值
	 * @Title: getMenuConstant 
	 * @param clazz
	 * @param fieldName 字段名
	 * @param fieldValue 字段值
	 * @return
	 */
	public static <T> List<T> getEnumConstant(Class<T> clazz,String fieldName,Object fieldValue){
		if(!clazz.isEnum()){
			throw new IllegalArgumentException("请传入枚举类型!");
		}
		
		if(fieldName==null || "".equals(fieldName.trim())){
			throw new IllegalArgumentException("字段名不能为空!");
		}
		
		if(fieldValue==null){
			throw new IllegalArgumentException("字段值不能为空!");
		}
		
		//获取枚举的所有实列
		T[] _objs=clazz.getEnumConstants();
		
		//获取枚举类的所有方法
		Method[] _methods=clazz.getMethods();
		
		List<T> list=new ArrayList<T>();
		for(T _obj : _objs){
			for(Method _method : _methods){
				if(_method.getName().equals("get"+fieldName.substring(0,1).toUpperCase()+fieldName.substring(1))){
					Object _v=null;
					try {
	                    _v=_method.invoke(_obj);
                    } catch (Exception e) {
                    	log.error(e.getMessage(),e);
                    }
					
					if(_v!=null && _v.getClass()==fieldValue.getClass() && _v.equals(fieldValue)){
						list.add(_obj);
					}
				}
			}
		}
		
		return list;
	}
}
