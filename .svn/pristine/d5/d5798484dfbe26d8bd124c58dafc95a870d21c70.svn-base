package com.tydic.generalChannelView.app.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.collections.MapUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tydic.channelview.staff.bean.StaffBean;
import com.tydic.channelview.staff.mapper.StaffBeanMapper;
import com.tydic.common.BaseMapper;
import com.tydic.common.PageContext;
import com.tydic.common.bean.PageInfo;
import com.tydic.common.bean.Result.ResultFlag;
import com.tydic.common.exception.ServiceException;
import com.tydic.common.page.PageResult;
import com.tydic.common.service.AbstractService;
import com.tydic.common.service.CommonService;
import com.tydic.common.utils.JsonUtil;
import com.tydic.common.utils.ObjectIsNull;
import com.tydic.common.utils.PwdHandler;
import com.tydic.common.utils.WeakPwdCheckUtil;
import com.tydic.generalChannelView.app.AppResult;
import com.tydic.generalChannelView.app.mapper.AppGeneralChannelMapper;
import com.tydic.generalChannelView.app.service.AppGeneralChannelService;
import com.tydic.generalChannelView.generalChannel.bean.GeneralChannel;
import com.tydic.generalChannelView.generalChannel.mapper.GeneralChannelMapper;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class AppGeneralChannelServiceImpl extends AbstractService implements AppGeneralChannelService {

	@Autowired
	AppGeneralChannelMapper appGeneralChannelMapper;
	@Autowired
	StaffBeanMapper	staffBeanMapper;
	@Autowired
	GeneralChannelMapper generalChannelMapper;
	@Autowired
	private CommonService commonService;
	
	@Override
	public AppResult<Boolean> deleteById(Long id,String sysUserCode) {
		if(log.isDebugEnabled()){
			log.debug("App根据ID删除泛渠道,请求参数：id: " + id + ",sysUserCode : " + sysUserCode);
		}
		
		if(ObjectIsNull.check(id)){
			return new AppResult<Boolean>(ResultFlag.FAIL.name(),"泛渠道ID不能为空！",false);
		}
		
		if(ObjectIsNull.check(sysUserCode)){
			return new AppResult<Boolean>(ResultFlag.FAIL.name(),"工号不能为空！",false);
		}
		
		StaffBean staffBean = staffBeanMapper.findByStaffCode(sysUserCode);
		
		if(ObjectIsNull.check(staffBean)){
			return new AppResult<Boolean>(ResultFlag.FAIL.name(),"操作人不能为空！",false);
		}
		
		try {
			HashMap<String,Object> param = new HashMap<String,Object>();
			param.put("id", id);
			param.put("updateStaff", staffBean.getStaffId());
			appGeneralChannelMapper.deleteById(param);
		} catch (Exception e) {
			log.error("泛渠道删除异常:{}",e);
			return new AppResult<Boolean>(ResultFlag.FAIL.name(),"泛渠道删除异常！",false);
		}
		
		return new AppResult<Boolean>(ResultFlag.SUCCESS.name(),"操作成功",true);
	}

	@Override
	public AppResult<List<GeneralChannel>> findAll(GeneralChannel generalChannel) {
		if(log.isDebugEnabled()){
			log.debug("App查询泛渠道列表，请求参数：{}", JsonUtil.objToStr(generalChannel));
		}
		
		if(ObjectIsNull.check(generalChannel)){
			return new AppResult<List<GeneralChannel>>(ResultFlag.FAIL.name(), "请求对象为空！");
		}
		
		if (ObjectIsNull.check(generalChannel.getPageSize())) {
			return new AppResult<List<GeneralChannel>>(ResultFlag.FAIL.name(), "当前条数不能为空！");
		} else {
			generalChannel.setPageSize(Integer.valueOf(generalChannel.getPageSize()));
		}
		
		if (ObjectIsNull.check(generalChannel.getCurrentPage())) {
			return new AppResult<List<GeneralChannel>>(ResultFlag.FAIL.name(), "当前页不能为空！");
		} else {
			generalChannel.setPageNo(Integer.valueOf(generalChannel.getPageNo()));
		}
		
		//查询员工信息
		StaffBean staffBean = staffBeanMapper.findByStaffCode(generalChannel.getLoginSysUserCode());
		//获取角色类型
		String roleType = commonService.getRoleType(generalChannel.getLoginSysUserCode(), generalChannel.getSysRoleIds());
				
		if ("general".equals(roleType)) {
			generalChannel.setLoginStaffId(staffBean.getStaffId());
		}
				
		if ("other".equals(roleType)) {
			return new AppResult<>(ResultFlag.FAIL.name(), "非泛渠道角色-其他角色！");
		}
		
		List<GeneralChannel> resultChannels = generalChannelMapper.findAll(generalChannel);
		PageResult<GeneralChannel> pageResult = new PageResult<GeneralChannel>(generalChannel, PageContext.getPageTotal(), resultChannels);
		
		
		PageInfo page = new PageInfo();
		page.setPageNumber(pageResult.getCurPage());
		page.setTotalElements(pageResult.getTotalRecord());
		page.setPageSize(pageResult.getPageSize());
		page.setTotalPages((int) (page.getTotalElements()/page.getPageSize() + (page.getTotalElements()%page.getPageSize() > 0 ? 1:0)));
		
		log.info("App查询泛渠道列表，返回结果：{}", JsonUtil.objToStr(resultChannels));
		
		return new AppResult<List<GeneralChannel>>(ResultFlag.SUCCESS.name(), "操作成功！",page,resultChannels);
	}
	
	
	public AppResult<List<StaffBean>> queryStaffByParam(StaffBean staffBean) {
		if(log.isDebugEnabled()){
			log.debug("App根据营业厅查询员工,请求参数：{}", JsonUtil.objToStr(staffBean));
		}
		
		if(ObjectIsNull.check(staffBean)){
			return new AppResult<List<StaffBean>>(ResultFlag.FAIL.name(), "请求对象为空！");
		}
		
		if (ObjectIsNull.check(staffBean.getPageSize())) {
			return new AppResult<List<StaffBean>>(ResultFlag.FAIL.name(), "当前条数不能为空！");
		} 
		
		if (ObjectIsNull.check(staffBean.getPageNo())) {
			return new AppResult<List<StaffBean>>(ResultFlag.FAIL.name(), "当前页不能为空！");
		} 
		
		List<StaffBean> staffBeans = staffBeanMapper.findAllByChannelId(staffBean);
		PageResult<StaffBean> pageResult = new PageResult<StaffBean>(staffBean, PageContext.getPageTotal(), staffBeans);
		
		
		PageInfo page = new PageInfo();
		page.setPageNumber(pageResult.getCurPage());
		page.setTotalElements(pageResult.getTotalRecord());
		page.setPageSize(pageResult.getPageSize());
		page.setTotalPages((int) (page.getTotalElements()/page.getPageSize() + (page.getTotalElements()%page.getPageSize() > 0 ? 1:0)));
		
		log.info("App根据营业厅查询员工,返回结果：{}", JsonUtil.objToStr(staffBeans));
		return new AppResult<List<StaffBean>>(ResultFlag.SUCCESS.name(),"操作成功！",page,staffBeans);
	}
	
	@Override
	public AppResult<Boolean> add(GeneralChannel generalChannel) {
		log.info("App泛渠道新增请求参数：{}" + JsonUtil.objToStr(generalChannel));
		
		if (ObjectIsNull.check(generalChannel)) {
			return new AppResult<Boolean>(ResultFlag.FAIL.name(),"泛渠道新增异常！",false);
		}
		
		if (ObjectIsNull.check(generalChannel.getLoginSysUserCode())) {
			return new AppResult<Boolean>(ResultFlag.FAIL.name(),"泛渠道新增，当前登陆工号为空！",false);
		}
		
		if (ObjectIsNull.check(generalChannel.getChannelNbr())) {
			return new AppResult<Boolean>(ResultFlag.FAIL.name(),"结对渠道编码为空！",false);
		}
		
		if (ObjectIsNull.check(generalChannel.getSalesCode())) {
			return new AppResult<Boolean>(ResultFlag.FAIL.name(),"销售员编码为空！",false);
		}
		
		if (ObjectIsNull.check(generalChannel.getName())) {
			return new AppResult<Boolean>(ResultFlag.FAIL.name(),"泛渠道名称为空！",false);
		}
		
		if (ObjectIsNull.check(generalChannel.getFormat())) {
			return new AppResult<Boolean>(ResultFlag.FAIL.name(),"泛渠道单元业态信息为空！",false);
		}
		
		if (ObjectIsNull.check(generalChannel.getPhone())) {
			return new AppResult<Boolean>(ResultFlag.FAIL.name(),"手机号码为空！",false);
		}
		
		if (ObjectIsNull.check(generalChannel.getAddr())) {
			return new AppResult<Boolean>(ResultFlag.FAIL.name(),"泛渠道地址信息为空！",false);
		}
		
		generalChannel.setCreateStaff(staffBeanMapper.findByStaffCode(generalChannel.getLoginSysUserCode()).getStaffId());
		
		Long totalCodes = isExistGeneralChannelCode(generalChannel.getCode());
		
		if (totalCodes.longValue() > 1) {
			throw new ServiceException("泛渠道编码已存在！");
		}
		
		generalChannelMapper.insert(generalChannel);
		log.info("App泛渠道新增成功！");
		return new AppResult<Boolean>(ResultFlag.SUCCESS.name(),"操作成功",true);
	}
	
	@Override
	public AppResult<Boolean> update(GeneralChannel generalChannel) {
		log.info("App泛渠道修改请求参数：{}" + JsonUtil.objToStr(generalChannel));
		
		if (ObjectIsNull.check(generalChannel)) {
			return new AppResult<Boolean>(ResultFlag.FAIL.name(),"泛渠道新增异常！",false);
		}
		
		if (ObjectIsNull.check(generalChannel.getLoginSysUserCode())) {
			return new AppResult<Boolean>(ResultFlag.FAIL.name(),"泛渠道新增，当前登陆工号为空！",false);
		}
		
		if (ObjectIsNull.check(generalChannel.getChannelNbr())) {
			return new AppResult<Boolean>(ResultFlag.FAIL.name(),"结对渠道编码为空！",false);
		}
		
		if (ObjectIsNull.check(generalChannel.getSalesCode())) {
			return new AppResult<Boolean>(ResultFlag.FAIL.name(),"销售员编码为空！",false);
		}
		
		if (ObjectIsNull.check(generalChannel.getName())) {
			return new AppResult<Boolean>(ResultFlag.FAIL.name(),"泛渠道名称为空！",false);
		}
		
		if (ObjectIsNull.check(generalChannel.getFormat())) {
			return new AppResult<Boolean>(ResultFlag.FAIL.name(),"泛渠道单元业态信息为空！",false);
		}
		
		if (ObjectIsNull.check(generalChannel.getPhone())) {
			return new AppResult<Boolean>(ResultFlag.FAIL.name(),"手机号码为空！",false);
		}
		
		if (ObjectIsNull.check(generalChannel.getAddr())) {
			return new AppResult<Boolean>(ResultFlag.FAIL.name(),"泛渠道地址信息为空！",false);
		}
		
		generalChannelMapper.update(generalChannel);
		
		log.info("App泛渠道修改成功！");
		
		return new AppResult<Boolean>(ResultFlag.SUCCESS.name(),"操作成功",true);
	}

	@Override
	public BaseMapper getMapper() {
		return null;
	}
	
	private Long isExistGeneralChannelCode(String code) {
		Long totalCodes = generalChannelMapper.isExistGeneralChannelCode(code);
		return totalCodes;
		
	}

	@Override
	public AppResult<Boolean> updatePwd(Map<String, Object> paramMap) {
		String userCode=MapUtils.getString(paramMap, "userCode");
		if (ObjectIsNull.check(userCode)) {
			return new AppResult<Boolean>(ResultFlag.SUCCESS.name(),"用户账号不能为空！",false);
		}
		String oldpwd=MapUtils.getString(paramMap, "oldpwd");
		if (ObjectIsNull.check(oldpwd)) {
			return new AppResult<Boolean>(ResultFlag.SUCCESS.name(),"原始密码不能为空！",false);
		}
		String newpwd=MapUtils.getString(paramMap, "newpwd");
		if (ObjectIsNull.check(newpwd)) {
			return new AppResult<Boolean>(ResultFlag.SUCCESS.name(),"新密码不能为空！",false);
		}
	
		if(!WeakPwdCheckUtil.vaildPwd(newpwd)) {
			return new AppResult<Boolean>(ResultFlag.SUCCESS.name(),"新密码不能为弱密码！",false);
		}
		paramMap.put("pwd", PwdHandler.md5Encode(oldpwd));
		Object generalChannel= generalChannelMapper.findByPhoneAndPwd(paramMap);
		if (ObjectIsNull.check(generalChannel)) {
			return new AppResult<Boolean>(ResultFlag.SUCCESS.name(),"校验失败，原始密码不正确！",false);
		}else {
			paramMap.put("pwd", PwdHandler.md5Encode(newpwd));
			generalChannelMapper.updateUserPwd(paramMap);
		}
		return new AppResult<Boolean>(ResultFlag.SUCCESS.name(),"操作成功",true);
	}

	@Override
	public AppResult<?> validatePwd(Map<String, Object> paramMap) {
		String userCode=MapUtils.getString(paramMap, "userCode");
		String pwd=MapUtils.getString(paramMap, "pwd");
		
		if (ObjectIsNull.check(userCode)) {
			return new AppResult<Boolean>(ResultFlag.FAIL.name(),"用户账号不能为空！",false);
		}
		if (ObjectIsNull.check(pwd)) {
			return new AppResult<Boolean>(ResultFlag.FAIL.name(),"密码不能为空！",false);
		}
		Map<String,Object> resultMap= new HashMap<String ,Object>();
		if(!WeakPwdCheckUtil.vaildPwd(pwd)) {
			resultMap.put("isWeakPwd",true);
		}else {
			resultMap.put("isWeakPwd",false);
		}
		pwd=PwdHandler.md5Encode(pwd);
		paramMap.put("pwd", pwd);
		List<Map<String, Object>> generalChannel= generalChannelMapper.findByPhoneAndPwd(paramMap);
		if (ObjectIsNull.check(generalChannel)) {
			return new AppResult<Boolean>(ResultFlag.FAIL.name(),"校验失败，用户名或者密码不正确！",false);
		}
	
	
		
		return new AppResult<Map<String,Object>>(ResultFlag.SUCCESS.name(),"操作成功",resultMap);
	}
	
}
