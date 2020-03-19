package com.tydic.common;

import java.lang.reflect.Method;
import java.util.Properties;

import org.springframework.beans.BeansException;
import org.springframework.beans.factory.NoSuchBeanDefinitionException;
import org.springframework.beans.factory.config.BeanFactoryPostProcessor;
import org.springframework.beans.factory.config.PropertyResourceConfigurer;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.context.support.AbstractApplicationContext;
import org.springframework.core.io.support.PropertiesLoaderSupport;

public class SpringContext implements ApplicationContextAware{
	private static ApplicationContext applicationContext;
	private static Properties properties = new Properties();

	/**
	 * 实现ApplicationContextAware接口的回调方法，设置上下文环境
	 * 
	 * @param applicationContext
	 * @throws BeansException
	 */
	@Override
	public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
		SpringContext.applicationContext = applicationContext;
		
		//加载spring PropertyPlaceholderConfigurer配置的 Property
		loadProperties();
	}

	public static ApplicationContext getApplicationContext() {
		return applicationContext;
	}
	
	private void loadProperties(){
		AbstractApplicationContext abstractContext = (AbstractApplicationContext) applicationContext;
		try {
            // get the names of BeanFactoryPostProcessor
            String[] postProcessorNames = abstractContext.getBeanNamesForType(BeanFactoryPostProcessor.class, true, true);
            for (String ppName : postProcessorNames) {
                // get the specified BeanFactoryPostProcessor
                BeanFactoryPostProcessor beanProcessor = abstractContext.getBean(ppName, BeanFactoryPostProcessor.class);
                
                // check whether the beanFactoryPostProcessor is
                // instance of the PropertyResourceConfigurer
                // if it is yes then do the process otherwise continue
                if (beanProcessor instanceof PropertyResourceConfigurer) {
                    PropertyResourceConfigurer propertyResourceConfigurer = (PropertyResourceConfigurer) beanProcessor;

                    // get the method mergeProperties
                    // in class PropertiesLoaderSupport
                    Method mergeProperties = PropertiesLoaderSupport.class.getDeclaredMethod("mergeProperties");
                    
                    // get the props
                    mergeProperties.setAccessible(true);
                    Properties props = (Properties) mergeProperties.invoke(propertyResourceConfigurer);

                    // get the method convertProperties
                    // in class PropertyResourceConfigurer
                    Method convertProperties = PropertyResourceConfigurer.class.getDeclaredMethod("convertProperties", Properties.class);
                    // convert properties
                    convertProperties.setAccessible(true);
                    convertProperties.invoke(propertyResourceConfigurer, props);

                    properties.putAll(props);
                }
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
	}

	public static String getProperty(String propertyName) {
        return properties.getProperty(propertyName);
    }
	
	public static String getProperty(String propertyName,String def) {
        return properties.getProperty(propertyName,def);
    }
	
	/**
	 * 获取对象
	 * 
	 * @param name
	 * @return Object 一个以所给名字注册的bean的实例
	 * @throws BeansException
	 */
	public static Object getBean(String name) throws BeansException {
		return applicationContext.getBean(name);
	}
	
	public static <T> T getBean(Class<T> clazz) throws BeansException {
		return applicationContext.getBean(clazz);
	}

	/**
	 * 获取类型为requiredType的对象
	 * 如果bean不能被类型转换，相应的异常将会被抛出（BeanNotOfRequiredTypeException）
	 * 
	 * @param name bean注册名
	 * @param requiredType 返回对象类型
	 * @return Object 返回requiredType类型对象
	 * @throws BeansException
	 */
	public static <T> T getBean(String name, Class<T> requiredType) throws BeansException {
		return applicationContext.getBean(name, requiredType);
	}

	/**
	 * 如果BeanFactory包含一个与所给名称匹配的bean定义，则返回true
	 * 
	 * @param name
	 * @return boolean
	 */
	public static boolean containsBean(String name) {
		return applicationContext.containsBean(name);
	}

	/**
	 * 判断以给定名字注册的bean定义是一个singleton还是一个prototype。
	 * 如果与给定名字相应的bean定义没有被找到，将会抛出一个异常（NoSuchBeanDefinitionException）
	 * 
	 * @param name
	 * @return boolean
	 * @throws NoSuchBeanDefinitionException
	 */
	public static boolean isSingleton(String name) throws NoSuchBeanDefinitionException {
		return applicationContext.isSingleton(name);
	}

	/**
	 * @param name
	 * @return Class 注册对象的类型
	 * @throws NoSuchBeanDefinitionException
	 */
	public static Class<?> getType(String name) throws NoSuchBeanDefinitionException {
		return applicationContext.getType(name);
	}

	/**
	 * 如果给定的bean名字在bean定义中有别名，则返回这些别名
	 * 
	 * @param name
	 * @return
	 * @throws NoSuchBeanDefinitionException
	 */
	public static String[] getAliases(String name) throws NoSuchBeanDefinitionException {
		return applicationContext.getAliases(name);
	}
}
