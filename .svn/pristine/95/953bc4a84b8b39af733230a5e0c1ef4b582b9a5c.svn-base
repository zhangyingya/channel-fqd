package com.tydic.web.exception;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.StringUtils;
import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.tydic.common.Result;
import com.tydic.common.exception.ServiceException;

/**
 * 全局异常处理类
 * @author HLF
 *
 */
public class ExceptionHandler implements HandlerExceptionResolver {
	private Logger log = LoggerFactory.getLogger(ExceptionHandler.class);
	
	@Override
	public ModelAndView resolveException(HttpServletRequest request,
			HttpServletResponse response, Object obj, Exception ex) {
		//最内层的异常
		Throwable e=parseException(ex);
		
		log.error(ex.getMessage(),ex);
		
		String xRequestedWith = request.getHeader("X-Requested-With");
		if (!StringUtils.isEmpty(xRequestedWith) && "XMLHttpRequest".equalsIgnoreCase(xRequestedWith)) {
			// ajax请求
			
			PrintWriter writer=null;
			try {
				writer=response.getWriter();
				JSONObject result=null;
				if(e instanceof ServiceException){
					result=JSON.parseObject(Result.fail(e.getMessage()).toString());
				}else{
					result=JSON.parseObject(Result.fail("系统错误！").toString());
				}
				result.put("exceptionHandler", "1");
				writer.write(JSON.toJSONString(result));
				writer.flush();
			} catch (IOException ie) {
			} finally {
				if(writer!=null){
					writer.close();
				}
			}
			
			return new ModelAndView();
		}
		
		return new ModelAndView();
	}
	
	/**
	 * @Title: parseException
	 * @Description: 获取最内层的异常
	 * @param e
	 * @return Throwable    
	 * @throws
	 */
	private Throwable parseException(Throwable e){
        Throwable tmp = e;
        int breakPoint = 0;
        while(tmp.getCause()!=null){
            if(tmp.equals(tmp.getCause())){
                break;
            }
            tmp=tmp.getCause();
            breakPoint++;
            if(breakPoint>1000){
                break;
            }
        } 
        return tmp;
    }
}
