package com.tydic.generalChannelView.app.service;

import java.util.List;
import java.util.Map;

import org.springframework.validation.annotation.Validated;

import com.tydic.channelview.staff.bean.StaffBean;
import com.tydic.common.service.IService;
import com.tydic.generalChannelView.app.AppResult;
import com.tydic.generalChannelView.generalChannel.bean.GeneralChannel;

public interface AppGeneralChannelService  extends IService {
	
	/**
	 * 根据ID删除泛渠道
	 * @param id
	 * @return
	 */
	AppResult<Boolean> deleteById(Long id,String sysUserCode);
	
	/**
	 * 查询泛渠道列表
	 * @param generalChannel
	 * @return
	 */
	AppResult<List<GeneralChannel>> findAll(@Validated GeneralChannel generalChannel);
	
	/**
	 * 根据营业厅查询员工
	 * @param staffBean
	 * @return
	 */
	AppResult<List<StaffBean>> queryStaffByParam(StaffBean staffBean);
	/**
	 * 新增泛渠道
	 * @param generalChannel
	 * @return
	 */
	AppResult<Boolean> add(GeneralChannel generalChannel);
	
	/**
	 * 修改泛渠道
	 * @param generalChannel
	 * @return
	 */
	AppResult<Boolean> update(GeneralChannel generalChannel);
	
	
	
	/**
	 * 修改泛渠道
	 * @param generalChannel
	 * @return
	 */
	AppResult<?> validatePwd(Map<String,Object> generalChannel);
	
	
	/**
	 * 修改泛渠道
	 * @param generalChannel
	 * @return
	 */
	AppResult<Boolean> updatePwd(Map<String,Object> generalChannel);
	
}
