package com.tydic.common.annotation;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * @ClassName: Excel 
 * @Description: 读取excel注解
 * @author jiwei
 * @date 2016年8月24日 下午4:48:53 
 *
 */
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.METHOD})
public @interface Column {
	public int value();
}
