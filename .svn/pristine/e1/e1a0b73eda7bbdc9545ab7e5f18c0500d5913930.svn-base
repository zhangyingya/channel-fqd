package com.tydic.generalChannelView.app.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tydic.channelview.staff.bean.StaffBean;
import com.tydic.channelview.staff.mapper.StaffBeanMapper;
import com.tydic.common.BaseMapper;
import com.tydic.common.PageContext;
import com.tydic.common.bean.PageInfo;
import com.tydic.common.bean.Result.ResultFlag;
import com.tydic.common.page.PageResult;
import com.tydic.common.service.AbstractService;
import com.tydic.common.service.CommonService;
import com.tydic.common.utils.JsonUtil;
import com.tydic.common.utils.ObjectIsNull;
import com.tydic.generalChannelView.app.AppResult;
import com.tydic.generalChannelView.app.bean.AppBusinessBillUpdateReqDto;
import com.tydic.generalChannelView.app.bean.AppRefuseReason;
import com.tydic.generalChannelView.app.service.AppBusinessBillService;
import com.tydic.generalChannelView.business.bean.BusinessBill;
import com.tydic.generalChannelView.business.bean.QueryBusinessBillReqDto;
import com.tydic.generalChannelView.business.bean.QueryBusinessBillResDto;
import com.tydic.generalChannelView.business.mapper.BusinessBillMapper;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class AppBusinessBillServiceImpl extends AbstractService implements AppBusinessBillService{

	@Autowired
	BusinessBillMapper businessBillMapper;
	@Autowired
	StaffBeanMapper staffBeanMapper;
	@Autowired
	private CommonService commonService;
	
	
	@Override
	public BaseMapper getMapper() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public AppResult<List<QueryBusinessBillResDto>> findAll(QueryBusinessBillReqDto businessBillReqDto) {
		if(log.isDebugEnabled()){
			log.debug("app商机单列表逻辑开始,请求参数：{}", JsonUtil.objToStr(businessBillReqDto));
		}
		List<QueryBusinessBillResDto> businessBillResDtos = new ArrayList<QueryBusinessBillResDto>();
		BusinessBill businessBill = new BusinessBill();
		businessBill.setStatusCd(null);
		businessBill.setBusinessBillType(null);
		
		if (ObjectIsNull.check(businessBillReqDto)) {
			return new AppResult<List<QueryBusinessBillResDto>>(ResultFlag.FAIL.name(), "请求对象为空！");
		}
		
		if (ObjectIsNull.check(businessBillReqDto.getPageSize())) {
			return new AppResult<List<QueryBusinessBillResDto>>(ResultFlag.FAIL.name(), "当前页数不能为空！");
		} else {
			businessBill.setPageSize(Integer.valueOf(businessBillReqDto.getPageSize()));
		}
		
		if (ObjectIsNull.check(businessBillReqDto.getCurPage())) {
			return new AppResult<List<QueryBusinessBillResDto>>(ResultFlag.FAIL.name(), "当前页不能为空！");
		} else {
			businessBill.setPageNo(Integer.valueOf(businessBillReqDto.getCurPage()));
		}
		
		if (!ObjectIsNull.check(businessBillReqDto.getId())) {
			businessBill.setId(Integer.valueOf(businessBillReqDto.getId()));
		}
		
		if (!ObjectIsNull.check(businessBillReqDto.getCustomerPhone())) {
			businessBill.setCustomerPhone(businessBillReqDto.getCustomerPhone());
		}
		
		if (!ObjectIsNull.check(businessBillReqDto.getCustomerName())) {
			businessBill.setCustomerName(businessBillReqDto.getCustomerName());
		}
		
		if (!ObjectIsNull.check(businessBillReqDto.getCustomerAddr())) {
			businessBill.setCustomerAddr(businessBillReqDto.getCustomerAddr());
		}
		
		if (!ObjectIsNull.check(businessBillReqDto.getGeneralChannelName())) {
			businessBill.setGeneralChannelName(businessBillReqDto.getGeneralChannelName());
		}
		
		if (!ObjectIsNull.check(businessBillReqDto.getGeneralChannelCode())) {
			businessBill.setGeneralChannelCode(businessBillReqDto.getGeneralChannelCode());
		}
		
		if (!ObjectIsNull.check(businessBillReqDto.getChannelName())) {
			businessBill.setChannelName(businessBillReqDto.getChannelName());
		}
		
		if (!ObjectIsNull.check(businessBillReqDto.getChannelNbr())) {
			businessBill.setChannelNbr(businessBillReqDto.getChannelNbr());
		}
		
		if (!ObjectIsNull.check(businessBillReqDto.getCommonRegionId())) {
			businessBill.setCommonRegionId(Integer.valueOf(businessBillReqDto.getCommonRegionId()));
		}
		
		if (!ObjectIsNull.check(businessBillReqDto.getStatusCd())) {
			businessBill.setStatusCd(businessBillReqDto.getStatusCd());
		}
		
		if (!ObjectIsNull.check(businessBillReqDto.getBusinessBillType())) {
			businessBill.setBusinessBillType(businessBillReqDto.getBusinessBillType());
		}
		
		if (!ObjectIsNull.check(businessBillReqDto.getId())) {
			businessBill.setId(Integer.valueOf(businessBillReqDto.getId()));
		}
		
		if (!ObjectIsNull.check(businessBillReqDto.getLatnId())) {
			businessBill.setLatnId(Integer.valueOf(businessBillReqDto.getLatnId()));
		}
		
		if (!ObjectIsNull.check(businessBillReqDto.getRegionId())) {
			businessBill.setRegionId(Integer.valueOf(businessBillReqDto.getRegionId()));
		}
		
		businessBill.setPageNo(Integer.valueOf(businessBillReqDto.getCurPage()));
		businessBill.setPageSize(Integer.valueOf(businessBillReqDto.getPageSize()));
		
		//查询员工信息
		StaffBean staffBean = staffBeanMapper.findByStaffCode(businessBillReqDto.getLoginSysUserCode());
		//获取角色类型
		String roleType = commonService.getRoleType(businessBillReqDto.getLoginSysUserCode(), businessBillReqDto.getSysRoleIds());
		
		if ("city".equals(roleType) && ObjectIsNull.check(businessBillReqDto.getLatnId())) {
			businessBill.setLatnId(Integer.valueOf(businessBillReqDto.getLatnId()));
		}
		
		if ("area".equals(roleType) && ObjectIsNull.check(businessBillReqDto.getRegionId())) {
			businessBill.setRegionId(Integer.valueOf(businessBillReqDto.getRegionId()));
		}
		
		if ("general".equals(roleType)) {
			businessBill.setLoginStaffId(staffBean.getStaffId());
		}
						
		if ("other".equals(roleType)) {
			return new AppResult<>(ResultFlag.FAIL.name(), "非泛渠道角色-其他角色！");
		}
		List<BusinessBill> businessBills = businessBillMapper.findAll(businessBill);
		
		PageResult<BusinessBill> pageResult = new PageResult<BusinessBill>(businessBill, PageContext.getPageTotal(), businessBills);
		
		//Long countBusinessBills = businessBillMapper.countFindAll(businessBill);
		
		if (!ObjectIsNull.check(businessBills) && businessBills.size() > 0) {
			for (BusinessBill businessBill2 : businessBills) {
				QueryBusinessBillResDto resDto = new QueryBusinessBillResDto();
				
				resDto.setId(String.valueOf(businessBill2.getId()));
				resDto.setCustomerName(businessBill2.getCustomerName());
				resDto.setCustomerPhone(businessBill2.getCustomerPhone());
				resDto.setCustomerAddr(businessBill2.getCustomerAddr());
				resDto.setCreateDate(businessBill2.getCreateDate());
				resDto.setBusinessBillType(businessBill2.getBusinessBillType());
				resDto.setStatusCd(businessBill2.getStatusCd());
				resDto.setCustomerRejectReason(businessBill2.getCustomerRejectReason());
				resDto.setIsUsed(businessBill.getIsUsed());
				
				resDto.setGeneralChannelName(businessBill2.getGeneralChannelName());
				resDto.setGeneralChannelCode(businessBill2.getGeneralChannelCode());
				resDto.setChannelName(businessBill2.getChannelName());
				resDto.setChannelNbr(businessBill2.getChannelNbr());
				resDto.setLatnId(businessBill2.getLatnId() == null ? 0 : businessBill2.getLatnId().longValue());
				resDto.setLatnName(businessBill2.getLatnName());
				resDto.setRegionId(businessBill2.getRegionId() == null ? 0 : businessBill2.getRegionId().longValue());
				resDto.setRegionName(businessBill2.getRegionName());
				businessBillResDtos.add(resDto);
			}
		}
		
		PageInfo page = new PageInfo();
		page.setPageNumber(pageResult.getCurPage());
		page.setTotalElements(pageResult.getTotalRecord());
		page.setPageSize(pageResult.getPageSize());
		page.setTotalPages((int) (page.getTotalElements()/page.getPageSize() + (page.getTotalElements()%page.getPageSize() > 0 ? 1:0)));
		
		log.info("app商机单列表,返回结果：{}", JsonUtil.objToStr(businessBillResDtos));
		
		return new AppResult<List<QueryBusinessBillResDto>>(ResultFlag.SUCCESS.name(), "成功", page, businessBillResDtos);
	}
	
	@Override
	public AppResult<List<QueryBusinessBillResDto>> findAllByGeneralChannelPhone(QueryBusinessBillReqDto businessBillReqDto) {
		if(log.isDebugEnabled()){
			log.debug("app泛渠道登陆获取商机单列表,请求参数：{}", JsonUtil.objToStr(businessBillReqDto));
		}
		List<QueryBusinessBillResDto> businessBillResDtos = new ArrayList<QueryBusinessBillResDto>();
		BusinessBill businessBill = new BusinessBill();
		businessBill.setStatusCd(null);
		businessBill.setBusinessBillType(null);
		
		if (ObjectIsNull.check(businessBillReqDto)) {
			return new AppResult<List<QueryBusinessBillResDto>>(ResultFlag.FAIL.name(), "请求对象为空！");
		}
		
		if (ObjectIsNull.check(businessBillReqDto.getPageSize())) {
			return new AppResult<List<QueryBusinessBillResDto>>(ResultFlag.FAIL.name(), "当前页数不能为空！");
		} else {
			businessBill.setPageSize(Integer.valueOf(businessBillReqDto.getPageSize()));
		}
		
		if (ObjectIsNull.check(businessBillReqDto.getCurPage())) {
			return new AppResult<List<QueryBusinessBillResDto>>(ResultFlag.FAIL.name(), "当前页不能为空！");
		} else {
			businessBill.setPageNo(Integer.valueOf(businessBillReqDto.getCurPage()));
		}
		
		if (ObjectIsNull.check(businessBillReqDto.getGeneralChannelPhone())) {
			return new AppResult<List<QueryBusinessBillResDto>>(ResultFlag.FAIL.name(), "手机号码不能为空！");
		} else {
			businessBill.setGeneralChannelPhone(businessBillReqDto.getGeneralChannelPhone());
		}
		
		if (!ObjectIsNull.check(businessBillReqDto.getStartDateStr())) {
			businessBill.setStartDateStr(businessBillReqDto.getStartDateStr());
		}
		
		if (!ObjectIsNull.check(businessBillReqDto.getEndDateStr())) {
			businessBill.setEndDateStr(businessBillReqDto.getEndDateStr());
		}
		
		businessBill.setPageNo(Integer.valueOf(businessBillReqDto.getCurPage()));
		businessBill.setPageSize(Integer.valueOf(businessBillReqDto.getPageSize()));
		
		List<BusinessBill> businessBills = businessBillMapper.findAll(businessBill);
		
		PageResult<BusinessBill> pageResult = new PageResult<BusinessBill>(businessBill, PageContext.getPageTotal(), businessBills);
		
		//Long countBusinessBills = businessBillMapper.countFindAll(businessBill);
		
		if (!ObjectIsNull.check(businessBills) && businessBills.size() > 0) {
			for (BusinessBill businessBill2 : businessBills) {
				QueryBusinessBillResDto resDto = new QueryBusinessBillResDto();
				
				resDto.setId(String.valueOf(businessBill2.getId()));
				resDto.setCustomerName(businessBill2.getCustomerName());
				resDto.setCustomerPhone(businessBill2.getCustomerPhone());
				resDto.setCustomerAddr(businessBill2.getCustomerAddr());
				resDto.setCreateDate(businessBill2.getCreateDate());
				resDto.setBusinessBillType(businessBill2.getBusinessBillType());
				resDto.setStatusCd(businessBill2.getStatusCd());
				resDto.setCustomerRejectReason(businessBill2.getCustomerRejectReason());
				resDto.setIsUsed(businessBill.getIsUsed());
				
				resDto.setGeneralChannelName(businessBill2.getGeneralChannelName());
				resDto.setGeneralChannelCode(businessBill2.getGeneralChannelCode());
				resDto.setChannelName(businessBill2.getChannelName());
				resDto.setChannelNbr(businessBill2.getChannelNbr());
				resDto.setLatnId(businessBill2.getLatnId().longValue());
				resDto.setLatnName(businessBill2.getLatnName());
				resDto.setRegionId(businessBill2.getRegionId().longValue());
				resDto.setRegionName(businessBill2.getRegionName());
				businessBillResDtos.add(resDto);
			}
		}
		
		PageInfo page = new PageInfo();
		page.setPageNumber(pageResult.getCurPage());
		page.setTotalElements(pageResult.getTotalRecord());
		page.setPageSize(pageResult.getPageSize());
		page.setTotalPages((int) (page.getTotalElements()/page.getPageSize() + (page.getTotalElements()%page.getPageSize() > 0 ? 1:0)));
		
		log.info("app泛渠道登陆获取商机单列表,返回结果：{}", JsonUtil.objToStr(businessBillResDtos));
		
		return new AppResult<List<QueryBusinessBillResDto>>(ResultFlag.SUCCESS.name(), "成功", page, businessBillResDtos);
	}

	@Override
	public AppResult<Boolean> writeCustomerRejectReason(AppRefuseReason appRefuseReason) {
		if(log.isDebugEnabled()){
			log.debug("App商机单拒绝办理理由，请求参数：{}", JsonUtil.objToStr(appRefuseReason));
		}
		
		if(ObjectIsNull.check(appRefuseReason)){
			return new AppResult<Boolean>(ResultFlag.FAIL.name(),"参数不能为空！",false);
		}
		
		if(ObjectIsNull.check(appRefuseReason.getSysUserCode())){
			return new AppResult<Boolean>(ResultFlag.FAIL.name(),"工号不能为空！",false);
		}
		
		StaffBean staffBean = staffBeanMapper.findByStaffCode(appRefuseReason.getSysUserCode());
		
		BusinessBill businessBill = new BusinessBill();
		businessBill.setCustomerRejectReason(appRefuseReason.getRefuseReason());
		businessBill.setId(Integer.valueOf(appRefuseReason.getId()));
		businessBill.setUpdateStaff(staffBean.getStaffId());
		
		if(ObjectIsNull.check(staffBean)){
			return new AppResult<Boolean>(ResultFlag.FAIL.name(),"操作人不能为空！",false);
		}
		
		try {
			businessBillMapper.writeCustomerRejectReason(businessBill);
		} catch (Exception e) {
			log.error("商机单拒绝办理理由异常:{}", e.getMessage());
			return new AppResult<Boolean>(ResultFlag.FAIL.name(),"商机单拒绝办理理由异常！",false);
		}
		
		return new AppResult<Boolean>(ResultFlag.SUCCESS.name(),"操作成功！",true);
	}

	@Override
	public AppResult<Boolean> update(AppBusinessBillUpdateReqDto updateReqDto) {
		log.info("App修改商机单状态,请求参数：{} ", updateReqDto);
		
		if (ObjectIsNull.check(updateReqDto)) {
			return new AppResult<Boolean>(ResultFlag.FAIL.name(),"商机单修改请求对象不能为空！",false);
		}
		
		if (ObjectIsNull.check(updateReqDto.getId())) {
			return new AppResult<Boolean>(ResultFlag.FAIL.name(),"商机单修改请求对象ID不能为空！",false);
		}
		
		if (ObjectIsNull.check(updateReqDto.getStatusCd())) {
			return new AppResult<Boolean>(ResultFlag.FAIL.name(),"商机单修改请求对象状态不能为空！",false);
		}
		
		if (ObjectIsNull.check(updateReqDto.getLoginSysUserCode())) {
			return new AppResult<Boolean>(ResultFlag.FAIL.name(),"商机单修改,当前工号不能为空！",false);
		}
		
		BusinessBill businessBill = new BusinessBill();
		businessBill.setId(updateReqDto.getId());
		businessBill.setStatusCd(updateReqDto.getStatusCd());
		businessBill.setUpdateStaff(staffBeanMapper.findByStaffCode(updateReqDto.getLoginSysUserCode()).getStaffId());
		
		businessBillMapper.update(businessBill);
		
		return new AppResult<Boolean>(ResultFlag.SUCCESS.name(),"操作成功！",true);
	}
}
