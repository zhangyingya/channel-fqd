/**
 * 
 */
package com.tydic.channelview.channel.service.impl;

import java.util.Arrays;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tydic.channelview.channel.bean.ChannelBean;
import com.tydic.channelview.channel.mapper.ChannelBeanMapper;
import com.tydic.channelview.channel.service.ChannelService;
import com.tydic.channelview.staff.bean.StaffBean;
import com.tydic.channelview.staff.mapper.StaffBeanMapper;
import com.tydic.common.BaseMapper;
import com.tydic.common.PageContext;
import com.tydic.common.mapper.CommonRegionMapper;
import com.tydic.common.page.PageResult;
import com.tydic.common.service.AbstractService;
import com.tydic.common.service.CommonService;

/**
 * @author ligeng
 *
 */
@Service
public class ChannelServiceImpl extends AbstractService<ChannelBean> implements ChannelService {

	@Resource
	private ChannelBeanMapper channelBeanMapper;

	@Resource
	private StaffBeanMapper staffBeanMapper;

	@Resource
	private CommonRegionMapper commonRegionMapper;
	
	@Autowired
	private CommonService commonService;

	@Override
	public ChannelBean findChannelById(int ChannelId) {

		return channelBeanMapper.selectByPrimaryKey(ChannelId);
	}

	@Override
	public void addChannel(ChannelBean channelBean) {
		channelBeanMapper.insert(channelBean);

	}

	@Override
	public int deleteByChannelId(Integer channelId) {
		return channelBeanMapper.deleteByPrimaryKey(channelId);
	}

	@Override
	public int updateChannelById(ChannelBean channelBean) {
		return channelBeanMapper.updateByPrimaryKey(channelBean);
	}

	@Override
	public PageResult<ChannelBean> findAll(ChannelBean channelBean) {

		//查询员工信息
		StaffBean staffBean = staffBeanMapper.findByStaffCode(channelBean.getLoginSysUserCode());
		//获取角色类型
		String roleType = commonService.getRoleType(channelBean.getLoginSysUserCode(), channelBean.getSysRoleIds());
		
		if ("city".equals(roleType)) {
			channelBean.setLatnId(staffBean.getLatnId().intValue());
		}
		
		if ("area".equals(roleType)) {
			channelBean.setOrgId(staffBean.getOrgId());
		}
						
		if ("general".equals(roleType)) {
			channelBean.setLoginStaffId(staffBean.getStaffId());
		}
				
		if ("other".equals(roleType)) {
			return null;
		}
		
		String [] specializedTeamsNames = {"'农村市场'", "'城市社区'"};
		
		channelBean.setSpecializedTeamsNames(Arrays.asList(specializedTeamsNames));
		List<ChannelBean> channelBeans = channelBeanMapper.findAll(channelBean);

		return new PageResult<ChannelBean>(channelBean, PageContext.getPageTotal(), channelBeans);
	}

	@Override
	public BaseMapper<ChannelBean> getMapper() {
		return null;
	}

}
