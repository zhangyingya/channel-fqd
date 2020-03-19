package com.tydic.common.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSONObject;
import com.tydic.channelview.staff.bean.StaffBean;
import com.tydic.common.bean.CommonRegion;
import com.tydic.common.page.PageResult;
import com.tydic.common.service.CommonRegionService;
import com.tydic.common.service.CommonService;
import com.tydic.common.utils.ObjectIsNull;
import com.tydic.esmp.systemRole.bean.SystemRole;
import com.tydic.esmp.systemRole.service.SystemRoleService;
import com.tydic.sso.bean.SystemUserDetail;

@Controller
@RequestMapping(value="commonRegion")
public class CommonRegionController  extends AbstractController {
	
	@Autowired
	private CommonRegionService commonRegionService;
	@Autowired
	private SystemRoleService systemRoleService;
	@Autowired
	private CommonService commonService;
	
	/**
	 * 分页查询
	 * @param commonRegion
	 * @return
	 */
	@RequestMapping("/findAll")
	@ResponseBody
	public PageResult<CommonRegion> findAll(CommonRegion commonRegion) {
		return commonRegionService.findAll(commonRegion);
	}
	
	/**
	 * 查看详情
	 * @param id
	 * @return
	 */
	@RequestMapping("/findById")
	@ResponseBody
	public CommonRegion findById(Long id) {
		return commonRegionService.findById(id);
	}
	
	/**
	 * 本地网下拉框
	 * @return
	 */
	@RequestMapping("/findAllBy1300")
	@ResponseBody
	public Map<String, Object> findAllBy1300(HttpServletRequest request) {
		StaffBean staffBean = (StaffBean) getLoginStaff(request);
		//1、判断工号是否存在渠道视图
		if (ObjectIsNull.check(staffBean)) {
			//1.1、 不存在取sso的用户信息
			staffBean = new StaffBean();
			SystemUserDetail userDetail = getLoginUserInfo(request);
			staffBean.setOrgId(userDetail.getAuthSystemUser().getLatnId());
		}
		
		Map<String, Object> result = commonRegionService.findAllBy1300AndStaff(staffBean);
			
		return result;
	}
	
	/**
	 * 区县/乡镇-下拉框
	 * @return
	 */
	@RequestMapping("/findAllByParRegionId")
	@ResponseBody
	public Map<String, Object> findAllByParRegionId(HttpServletRequest request, Long parRegionId) {
		StaffBean staffBean = (StaffBean) getLoginStaff(request);
		//1、判断工号是否存在渠道视图
		if (ObjectIsNull.check(staffBean)) {
			//1.1、 不存在取sso的用户信息
			staffBean = new StaffBean();
			SystemUserDetail userDetail = getLoginUserInfo(request);
			staffBean.setOrgId(userDetail.getAuthSystemUser().getLatnId());
		}
		
		Map<String, Object> result = commonRegionService.findAllByParRegionIdAndStaff(parRegionId, staffBean);
		
		return result;
	}
	
	  /**
     * 通过dubbo服务获取用户在bss3.0的角色id集合
     * @param sysUserId
     * @return
     * @author Administrator
     */
	@RequestMapping("/findRoleInfo")
	@ResponseBody
    public List<Map<String,Object>> findRoleInfo(Long sysUserId) {
    	List<Map<String,Object>> listMaps = new ArrayList<>();
    	List<SystemRole> systemRoles = systemRoleService.findAllBySysUserId(sysUserId);
    	
    	if (!ObjectIsNull.check(systemRoles) && systemRoles.size() > 0) {
			for (SystemRole systemRole : systemRoles) {
				Map<String,Object> mm = new HashMap<String,Object>();
				mm.put("sysRoleId", systemRole.getSysRoleId());
				mm.put("sysRoleName", systemRole.getSysRoleName());
				listMaps.add(mm);
			}		
    	}
    	
    	return listMaps;
	}
	
	  /**
     * 通过dubbo服务获取用户在bss3.0的用户信息
     * @param sysUserId
     * @return
     * @author Administrator
     */
	@RequestMapping("/findUserInfo")
	@ResponseBody
    public String findUserInfo(HttpServletRequest request) {
    
		SystemUserDetail sys = super.getLoginUserInfo(request);
		String jsonStr = JSONObject.toJSONString(sys);
    	
    	return jsonStr;
	}
	
	  /**
     * 通过dubbo服务获取用户在bss3.0的用户信息
     * @param sysUserId
     * @return
     * @author Administrator
     */
	@RequestMapping("/channelStaff")
	@ResponseBody
    public String channelStaff(HttpServletRequest request) {
    
		StaffBean staffBean = super.getLoginStaff(request);
		String jsonStr = JSONObject.toJSONString(staffBean);
    	
    	return jsonStr;
	}
	
	 /**
     * 获取泛渠道角色类型
     * @param sysUserId
     * @return
     * @author Administrator
     */
	@RequestMapping("/roleType")
	@ResponseBody
    public String getRoleType(HttpServletRequest request) {
		SystemUserDetail userDetail = getLoginUserInfo(request);
		List<String> sysRoleIds =  super.findRoleIds(userDetail.getAuthSystemUser().getSysUserId());
		String roleType =  commonService.getRoleType(userDetail.getAuthSystemUser().getSysUserCode(), sysRoleIds);
		String jsonStr = JSONObject.toJSONString(roleType);
    	return jsonStr;
	}
}
