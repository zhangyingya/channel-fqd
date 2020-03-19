package com.tydic.generalChannelView.app.service.impl;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.tydic.channelview.channel.bean.ChannelBean;
import com.tydic.channelview.channel.bean.QueryChannelReqDto;
import com.tydic.channelview.channel.mapper.ChannelBeanMapper;
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
import com.tydic.generalChannelView.app.service.AppChannelService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class AppChannelServiceImpl extends AbstractService<ChannelBean> implements AppChannelService {
	
	@Autowired
	private ChannelBeanMapper channelBeanMapper;
	
	@Autowired
	private StaffBeanMapper staffBeanMapper;
	
	@Autowired
	private CommonService commonService;

	@Override
	public AppResult<List<ChannelBean>> findAll(QueryChannelReqDto reqDto) {
		log.info("App结对渠道列表请求参数：{}"+ JsonUtil.objToStr(reqDto));
		
		if (ObjectIsNull.check(reqDto)) {
			return new AppResult<>(ResultFlag.FAIL.name(), "当前用户信息为空！");
		}
		
		if (ObjectIsNull.check(reqDto.getLoginSysUserCode())) {
			return new AppResult<>(ResultFlag.FAIL.name(), "当前用户信息为空！");
		}
		
		if (ObjectIsNull.check(reqDto.getCurPage())) {
			return new AppResult<>(ResultFlag.FAIL.name(), "当前页不能为空！");
		}
		
		if (ObjectIsNull.check(reqDto.getPageSize())) {
			return new AppResult<>(ResultFlag.FAIL.name(), "当前页数不能为空！");
		}
		
		if (ObjectIsNull.check(reqDto.getLoginSysUserCode())) {
			return new AppResult<>(ResultFlag.FAIL.name(), "当前工号不能为空！");
		}
		
		ChannelBean channelBean = new ChannelBean();
		
		if (!ObjectIsNull.check(reqDto.getLatnId())) {
			channelBean.setLatnId(Integer.valueOf(reqDto.getLatnId()));
		}
		
		if (!ObjectIsNull.check(reqDto.getRegionId())) {
			channelBean.setCommonRegionId(Long.valueOf(reqDto.getRegionId()));
		}
		
		if (!ObjectIsNull.check(reqDto.getChannelId())) {
			channelBean.setChannelId(Integer.valueOf(reqDto.getChannelId()));
		}
		
		if (!ObjectIsNull.check(reqDto.getChannelName())) {
			channelBean.setChannelName(reqDto.getChannelName());
		}
		
		if (!ObjectIsNull.check(reqDto.getChannelNbr())) {
			channelBean.setChannelNbr(reqDto.getChannelNbr());
		}
		
		if (!ObjectIsNull.check(reqDto.getPageSize())) {
			channelBean.setPageSize(Integer.valueOf(reqDto.getPageSize()));
		}
		
		if (!ObjectIsNull.check(reqDto.getCurPage())) {
			channelBean.setPageNo(Integer.valueOf(reqDto.getCurPage()));
		}
		
		if (!ObjectIsNull.check(reqDto.getLoginSysUserCode())) {
			channelBean.setLoginSysUserCode(reqDto.getLoginSysUserCode());
		}
		
		//查询员工信息
		StaffBean staffBean = staffBeanMapper.findByStaffCode(reqDto.getLoginSysUserCode());
		//获取角色类型
		String roleType = commonService.getRoleType(reqDto.getLoginSysUserCode(), reqDto.getSysRoleIds());
				
		if ("city".equals(roleType)) {
			channelBean.setLatnId(staffBean.getLatnId().intValue());
		}
				
		if ("area".equals(roleType)) {
			channelBean.setCommonRegionId(staffBean.getCommonRegion());
		}
								
		if ("general".equals(roleType)) {
			channelBean.setLoginStaffId(staffBean.getStaffId());
		}
						
		if ("other".equals(roleType)) {
			return new AppResult<>(ResultFlag.FAIL.name(), "非泛渠道角色-其他角色！");
		}
		
		String [] channelTypes = {"110200"};
		String [] specializedTeamsNames = {"'农村市场'", "'城市社区'"};
		
		channelBean.setSpecializedTeamsNames(Arrays.asList(specializedTeamsNames));
		channelBean.setChannelSubtypeCds(Arrays.asList(channelTypes));
		channelBean.setPageNo(Integer.valueOf(reqDto.getCurPage()));
		channelBean.setPageSize(Integer.valueOf(reqDto.getPageSize()));
		
		List<ChannelBean> channelBeans = channelBeanMapper.findAllByHanderPage(channelBean);
		PageResult<ChannelBean> pageResult = new PageResult<ChannelBean>(channelBean, PageContext.getPageTotal(), channelBeans);
		
		PageInfo page = new PageInfo();
		page.setPageNumber(pageResult.getCurPage());
		page.setTotalElements(pageResult.getTotalRecord());
		page.setPageSize(pageResult.getPageSize());
		page.setTotalPages((int) (page.getTotalElements()/page.getPageSize() + (page.getTotalElements()%page.getPageSize() > 0 ? 1:0)));
		
		log.info("App结对渠道列表返回结果：{}", channelBeans);
		
		return new AppResult<List<ChannelBean>>(ResultFlag.SUCCESS.name(), "操作成功！",page, channelBeans);
	}

	@Override
	public BaseMapper<ChannelBean> getMapper() {
		// TODO Auto-generated method stub
		return null;
	}

	
}
