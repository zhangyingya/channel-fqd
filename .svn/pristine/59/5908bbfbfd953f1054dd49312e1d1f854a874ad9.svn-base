package com.tydic.test;

import java.io.IOException;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.jasig.cas.client.authentication.AttributePrincipal;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tydic.common.Result;

@Controller
@RequestMapping("/")
public class TestController {
	
	private final Logger logger=LoggerFactory.getLogger(TestController.class);
	
	@RequestMapping("test")
	@ResponseBody
	public Result test(HttpServletRequest request) {
		// 获取当前登录用户
		AttributePrincipal logUser = (AttributePrincipal) request.getUserPrincipal();
		// 获取当前登录用户属性
		Map<String, Object> userInfoMap = logUser.getAttributes();
		
		return Result.success("nice");
	} 
	
	@RequestMapping("logout")
	public void logout(HttpServletRequest request, HttpServletResponse response) {
		try {
			HttpSession session = request.getSession();
			session.invalidate();
			response.sendRedirect("http://192.1.17.36:2010/sso/logout?service=http://192.1.17.36:2010/sso/login");
		} catch (IOException e) {
			logger.error(e.getMessage(),e);
		}
	} 

}
