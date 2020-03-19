package com.tydic.generalChannelView.app.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.tydic.channelview.staff.bean.StaffBean;
import com.tydic.channelview.staff.mapper.StaffBeanMapper;
import com.tydic.common.BaseMapper;
import com.tydic.common.bean.CommonRegion;
import com.tydic.common.mapper.CommonRegionMapper;
import com.tydic.common.service.AbstractService;
import com.tydic.common.service.CommonService;
import com.tydic.common.utils.JsonUtil;
import com.tydic.common.utils.ObjectIsNull;
import com.tydic.generalChannelView.app.AppResult;
import com.tydic.generalChannelView.app.AppResult.ResultFlag;
import com.tydic.generalChannelView.app.bean.AppCommonRegionReqDto;
import com.tydic.generalChannelView.app.bean.AppCommonRegionResDto;
import com.tydic.generalChannelView.app.service.AppCommonRegionService;

import lombok.extern.slf4j.Slf4j;

/**
 * 泛渠道模块-根据角色查询本地网/区县实现类
 * @author DeeWang
 * @since 2019-06-12
 */

@Slf4j
public class AppCommonRegionServiceImpl extends AbstractService<CommonRegion> implements AppCommonRegionService {
	
	@Autowired
	private CommonRegionMapper commonRegionMapper;
	
	@Autowired
	private StaffBeanMapper staffBeanMapper;
	
	/**
	 * 公共接口
	 */
	@Autowired
	private CommonService commonService;
	
	/**
	 * 泛渠道-查询本地网
	 * @param appCommonRegionReqDto
	 * @return
	 */
	@Override
	public AppResult<List<AppCommonRegionResDto>> findLatnList(AppCommonRegionReqDto appCommonRegionReqDto) {
		log.debug("App泛渠道-查询本地网，请求参数：{}", JsonUtil.objToStr(appCommonRegionReqDto));
		
		AppResult<List<AppCommonRegionResDto>> appResult = new AppResult<List<AppCommonRegionResDto>>();
		List<AppCommonRegionResDto> commonRegionResDtos = new ArrayList<AppCommonRegionResDto>();
		
		if (ObjectIsNull.check(appCommonRegionReqDto)) {
			return new AppResult<List<AppCommonRegionResDto>>(ResultFlag.FAIL.name(), "泛渠道-查询本地网，请求对象为空！");
		}
		
		if (ObjectIsNull.check(appCommonRegionReqDto.getLoginSysUserCode())) {
			return new AppResult<List<AppCommonRegionResDto>>(ResultFlag.FAIL.name(), "泛渠道-查询本地网，当前工号为空！");
		}
		
		//获取员工角色类型
		StaffBean staffBean = staffBeanMapper.findByStaffCode(appCommonRegionReqDto.getLoginSysUserCode());
		//获取角色类型
		String roleType = commonService.getRoleType(appCommonRegionReqDto.getLoginSysUserCode(), appCommonRegionReqDto.getSystemRoleIds());
		
		//该工号有省级角色
		if ("province".equals(roleType)) {
			List<CommonRegion> commonRegions = commonRegionMapper.findAllBy1300();
			for (CommonRegion commonRegion : commonRegions) {
				AppCommonRegionResDto resDto = new AppCommonRegionResDto();
				
				resDto.setRegionId(String.valueOf(commonRegion.getCommonRegionId()));
				resDto.setRegionName(commonRegion.getRegionName());
				resDto.setRegionNbr(commonRegion.getRegionCode());
				
				commonRegionResDtos.add(resDto);
			}
			
			appResult.setFlag(ResultFlag.SUCCESS.name());
			appResult.setData(commonRegionResDtos);
			appResult.setMessage("成功！");
		} 
		
		//该工号有市级角色或者普通角色或者区县角色
		if ("city".equals(roleType) || "area".equals(roleType) || "general".equals(roleType)) {
			CommonRegion commonRegion = commonRegionMapper.findById(staffBean.getLatnId().longValue());
			
			AppCommonRegionResDto resDto = new AppCommonRegionResDto();
			
			resDto.setRegionId(String.valueOf(commonRegion.getCommonRegionId()));
			resDto.setRegionName(commonRegion.getRegionName());
			resDto.setRegionNbr(commonRegion.getRegionCode());
			
			commonRegionResDtos.add(resDto);
			
			appResult.setFlag(ResultFlag.SUCCESS.name());
			appResult.setData(commonRegionResDtos);
			appResult.setMessage("成功！");
		} 
		
		//没有角色数据, 返回null
		if ("other".equals(roleType)) {
			appResult.setData(null);
			appResult.setMessage("没有泛渠道角色数据！");
			appResult.setFlag(ResultFlag.FAIL.name());
		}
		
		log.debug("App泛渠道-查询本地网，返回结果：{}", JsonUtil.objToStr(appResult));
		return appResult;
	}


	/**
	 * 泛渠道-查询区县
	 * @param appCommonRegionReqDto
	 * @return
	 */
	@Override
	public AppResult<List<AppCommonRegionResDto>> findRegionList(AppCommonRegionReqDto appCommonRegionReqDto) {
		log.debug("泛渠道-查询区县，请求参数：{}", JsonUtil.objToStr(appCommonRegionReqDto));
		
		AppResult<List<AppCommonRegionResDto>> appResult = new AppResult<List<AppCommonRegionResDto>>();
		List<AppCommonRegionResDto> commonRegionResDtos = new ArrayList<AppCommonRegionResDto>();
		if (ObjectIsNull.check(appCommonRegionReqDto)) {
			return new AppResult<List<AppCommonRegionResDto>>(ResultFlag.FAIL.name(), "泛渠道-查询区县，请求对象为空！");
		}
		
		if (ObjectIsNull.check(appCommonRegionReqDto.getLoginSysUserCode())) {
			return new AppResult<List<AppCommonRegionResDto>>(ResultFlag.FAIL.name(), "泛渠道-查询区县，当前工号为空！");
		}
		
		if (ObjectIsNull.check(appCommonRegionReqDto.getLatnId())) {
			return new AppResult<List<AppCommonRegionResDto>>(ResultFlag.FAIL.name(), "泛渠道-查询区县，本地网参数为空！");
		}
		
		//获取渠道视图员工信息
		StaffBean staffBean = staffBeanMapper.findByStaffCode(appCommonRegionReqDto.getLoginSysUserCode());
		//获取角色类型
		String roleType = commonService.getRoleType(appCommonRegionReqDto.getLoginSysUserCode(), appCommonRegionReqDto.getSystemRoleIds());
				
		//该工号有省级角色或有市级角色
		if ("province".equals(roleType) || "city".equals(roleType)){
			if ("888".equals(appCommonRegionReqDto.getLatnId())) {
				AppCommonRegionResDto resDto = new AppCommonRegionResDto();
				CommonRegion commonRegion = commonRegionMapper.findBySrcRegionId(Long.valueOf(appCommonRegionReqDto.getLatnId()));
				
				resDto.setRegionId(String.valueOf(commonRegion.getCommonRegionId()));
				resDto.setRegionName(commonRegion.getRegionName());
				resDto.setRegionNbr(commonRegion.getRegionCode());
				
				commonRegionResDtos.add(resDto);
			} else {
				List<CommonRegion> commonRegions = commonRegionMapper.findAllByParRegionId(Long.valueOf(appCommonRegionReqDto.getLatnId()));
				for (CommonRegion commonRegion : commonRegions) {
					AppCommonRegionResDto resDto = new AppCommonRegionResDto();
					
					resDto.setRegionId(String.valueOf(commonRegion.getCommonRegionId()));
					resDto.setRegionName(commonRegion.getRegionName());
					resDto.setRegionNbr(commonRegion.getRegionCode());
					
					commonRegionResDtos.add(resDto);
				}
			}
			
			appResult.setFlag(ResultFlag.SUCCESS.name());
			appResult.setData(commonRegionResDtos);
			appResult.setMessage("成功！");
		} 
				
		//该工号有普通角色或者区县角色
		if ( "area".equals(roleType) || "general".equals(roleType)) {
			//该工号有普通角色
			CommonRegion commonRegion2 = commonRegionMapper.findById(staffBean.getCommonRegion().longValue());
			
			AppCommonRegionResDto resDto = new AppCommonRegionResDto();
			resDto.setRegionId(String.valueOf(commonRegion2.getCommonRegionId()));
			resDto.setRegionName(commonRegion2.getRegionName());
			resDto.setRegionNbr(commonRegion2.getRegionCode());
			
			commonRegionResDtos.add(resDto);
			
			appResult.setFlag(ResultFlag.SUCCESS.name());
			appResult.setData(commonRegionResDtos);
			appResult.setMessage("成功！");
		} 
		
		//没有角色数据, 返回null
		if ("other".equals(roleType)) {
			appResult.setData(null);
			appResult.setMessage("没有泛渠道角色数据！");
			appResult.setFlag(ResultFlag.FAIL.name());
		}		
				
		log.debug("App泛渠道-查询区县，返回结果：{}", JsonUtil.objToStr(appResult));
		return appResult;
	}
	
	@Override
	public BaseMapper<CommonRegion> getMapper() {
		return null;
	}
}
