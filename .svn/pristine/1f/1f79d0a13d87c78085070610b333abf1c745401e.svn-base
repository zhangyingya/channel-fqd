package com.tydic.common.controller;

import java.io.IOException;
import java.io.InputStream;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.jasig.cas.client.authentication.AttributePrincipal;
import org.springframework.beans.factory.annotation.Autowired;

import com.alibaba.fastjson.JSON;
import com.tydic.channelview.staff.bean.StaffBean;
import com.tydic.channelview.staff.service.StaffService;
import com.tydic.common.BaseBean;
import com.tydic.common.utils.JsonUtil;
import com.tydic.common.utils.ObjectIsNull;
import com.tydic.esmp.systemRole.bean.SystemRole;
import com.tydic.esmp.systemRole.service.SystemRoleService;
import com.tydic.sso.bean.SystemUserDetail;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public abstract class AbstractController {
	
	@Autowired
	private StaffService staffService;
	
	@Autowired
	private SystemRoleService systemRoleService;
	
	protected String getRequestBody(HttpServletRequest request){
		InputStream in=null;
		StringBuilder body=new StringBuilder();
		try {
			in=request.getInputStream();
			byte[] b=new byte[1024];
			int len=0;
			while((len=in.read(b))!=-1){
				body.append(new String(b,0,len,"UTF-8"));
			}
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if(in!=null){
				try {
					in.close();
				} catch (IOException e) {}
			}
		}
		return body.toString();
	}
	
	protected void setPageInfo(HttpServletRequest request,BaseBean bean) {
		String page = request.getParameter("curPage"); 
		String limit = request.getParameter("pageSize"); 
		if(!ObjectIsNull.check(page)) {
			bean.setPageNo(Integer.parseInt(page));
		}
		if(!ObjectIsNull.check(limit)) {
			bean.setPageSize(Integer.parseInt(limit));
		}
		if(bean.getPageNo() == -1){
			bean.setPageNo(1);
		}
	}
	
	/**
     * 获取渠道视图用户信息
     * @return Map
     */
	protected StaffBean getLoginStaff(HttpServletRequest request) {
		// 获取当前登录用户
		AttributePrincipal logUser = (AttributePrincipal) request.getUserPrincipal();
		// 获取当前登录用户属性
		Map<String, Object> userInfoMap = logUser.getAttributes();
		String systemUserJson = userInfoMap.get("SystemUserDetail").toString();
		log.info("BSS3.0用户信息：{}" + systemUserJson);
		SystemUserDetail user = JSON.parseObject(systemUserJson,SystemUserDetail.class);
		
		StaffBean staffBean = staffService.findByStaffCode(user.getAuthSystemUser().getSysUserCode());
					
		log.info("渠道视图用户信息：{}", JsonUtil.objToStr(staffBean));
        return staffBean;
    }
	
	protected void setLoginStaff(HttpServletRequest request, Object obj) {
		StaffBean staffBean = getLoginStaff(request);
		try {
			Date curDate = new Date();
			setProperty(obj, "createStaff", staffBean.getStaffId());
			setProperty(obj, "updateStaff", staffBean.getStaffId());
			setProperty(obj, "createDate", curDate);
			setProperty(obj, "updateDate", curDate);
		} catch (Exception e) {
			log.error(e.getMessage(),e);
		} 
	}
	
    public void setProperty(Object obj, String PropertyName, Object value)
            throws NoSuchFieldException, SecurityException,
            IllegalArgumentException, IllegalAccessException {
        Class c = obj.getClass();
        Field f = c.getDeclaredField(PropertyName);
        // 取消语言访问检查
        f.setAccessible(true);
        // 给变量赋值
        f.set(obj, value);
    }
    
    protected SystemUserDetail getLoginUserInfo(HttpServletRequest request) {
		try {
			// 获取当前登录用户
			AttributePrincipal logUser = (AttributePrincipal) request.getUserPrincipal();
			// 获取当前登录用户属性
			Map<String, Object> userInfoMap = logUser.getAttributes();
			String systemUserJson = userInfoMap.get("SystemUserDetail").toString();
			log.info("统一门户SSO:" + systemUserJson);
			SystemUserDetail user = JSON.parseObject(systemUserJson,SystemUserDetail.class);
			return user;
		} catch (Exception e) {
			log.error(e.getMessage(),e);
		}
		return null;
	}
    
    /**
     * 通过dubbo服务获取用户在bss3.0的角色信息
     * @param sysUserId
     * @return
     * @author Administrator
     */
    public List<SystemRole> findRolesBySysUserId(Long sysUserId) {
		return systemRoleService.findAllBySysUserId(sysUserId);
	}
    
    /**
     * 通过dubbo服务获取用户在bss3.0的角色id集合
     * @param sysUserId
     * @return
     * @author Administrator
     */
    public List<String> findRoleIds(Long sysUserId) {
    	List<String> sysRoleIds = new ArrayList<>();
    	List<SystemRole> systemRoles = systemRoleService.findAllBySysUserId(sysUserId);
    	if (!ObjectIsNull.check(systemRoles) && systemRoles.size() > 0) {
			for (SystemRole systemRole : systemRoles) {
				sysRoleIds.add(String.valueOf(systemRole.getSysRoleId()));
			}		
    	}
    	
    	return sysRoleIds;
	}
}
