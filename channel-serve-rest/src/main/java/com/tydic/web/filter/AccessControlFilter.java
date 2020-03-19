package com.tydic.web.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletResponse;

public class AccessControlFilter implements Filter {

	@Override
	public void destroy() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void doFilter(ServletRequest req, ServletResponse res,
			FilterChain chain) throws IOException, ServletException {
		/*String []  allowDomain= {"http://192.1.17.36:2010"};
		Set allowedOrigins= new HashSet(Arrays.asList(allowDomain));
		String originHeader=((HttpServletRequest) req).getHeader("Origin");
		if (allowedOrigins.contains(originHeader)){
			((HttpServletResponse) res).setHeader("Access-Control-Allow-Origin", originHeader);
			((HttpServletResponse) res).setContentType("application/json;charset=UTF-8");
			((HttpServletResponse) res).setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
			((HttpServletResponse) res).setHeader("Access-Control-Max-Age", "3600");
			((HttpServletResponse) res).setHeader("Access-Control-Allow-Headers", "Origin, No-Cache, X-Requested-With, If-Modified-Since, Pragma, Last-Modified, Cache-Control, Expires, Content-Type, X-E4M-With,userId,token");//表明服务器支持的所有头信息字段
			((HttpServletResponse) res).setHeader("Access-Control-Allow-Credentials", "true"); //如果要把Cookie发到服务器，需要指定Access-Control-Allow-Credentials字段为true;
			((HttpServletResponse) res).setHeader("XDomainRequestAllowed","1");
		}*/
		
		((HttpServletResponse) res).setHeader("Access-Control-Allow-Origin", "*");
		((HttpServletResponse) res).setContentType("application/json;charset=UTF-8");
		((HttpServletResponse) res).setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
		((HttpServletResponse) res).setHeader("Access-Control-Max-Age", "3600");
		((HttpServletResponse) res).setHeader("Access-Control-Allow-Headers", "Origin, No-Cache, X-Requested-With, If-Modified-Since, Pragma, Last-Modified, Cache-Control, Expires, Content-Type, X-E4M-With,userId,token");//表明服务器支持的所有头信息字段
		((HttpServletResponse) res).setHeader("Access-Control-Allow-Credentials", "true"); //如果要把Cookie发到服务器，需要指定Access-Control-Allow-Credentials字段为true;
		((HttpServletResponse) res).setHeader("XDomainRequestAllowed","1");
		
		chain.doFilter(req, res);

	}

	@Override
	public void init(FilterConfig arg0) throws ServletException {
		// TODO Auto-generated method stub
		
	}

}
