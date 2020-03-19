package com.tydic.web.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;

import org.springframework.web.util.HtmlUtils;

public class XssFilter implements Filter {

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
		
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain chain) throws IOException, ServletException {
		XssRequest xssRequest=new XssRequest((HttpServletRequest)request);
		chain.doFilter(xssRequest, response);
	}

	@Override
	public void destroy() {
	}

	/**
	 * 
	 * 重建request
	 * @ClassName: XssRequest 
	 * @author hlf880217@163.com
	 * @date 2016年9月18日 下午2:20:07 
	 *
	 */
	class XssRequest extends HttpServletRequestWrapper{
		
		public XssRequest(HttpServletRequest request) {
			super(request);
		}
		
		@Override
		public String[] getParameterValues(String name) {
			String[] values=super.getParameterValues(name);
			if(values!=null){
				String[] encodeValues=new String[values.length];
				
				int i=0;
				for(String value : values){
					if(value!=null && !"".equals(value)){
						encodeValues[i]=HtmlUtils.htmlEscape(value);
					}
					
					i++;
				}
				
				return encodeValues;
			}
			return values;
		}

		@Override
		public String getParameter(String name) {
			String value = super.getParameter(name);
			if(value!=null && !"".equals(value)) {
				return HtmlUtils.htmlEscape(value);
			}
			return value;
		}
		
	}

}

