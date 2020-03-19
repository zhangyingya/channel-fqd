package com.tydic.generalChannelView.generalChannel.service;


import com.tydic.common.page.PageResult;
import com.tydic.common.service.IService;
import com.tydic.generalChannelView.app.AppResult;
import com.tydic.generalChannelView.generalChannel.bean.GeneralChannel;
import com.tydic.generalChannelView.generalChannel.bean.GeneralChannelVillage;
import com.tydic.generalChannelView.generalChannel.bean.QueryGeneralChannelDetailReqDto;
import com.tydic.generalChannelView.generalChannel.bean.QueryGeneralChannelDetailResDto;

public interface GeneralChannelService extends IService<GeneralChannel>  {
	/**
	 * 泛渠道资料管理列表
	 * @param generalChannel
	 * @return
	 */
	PageResult<GeneralChannel> findAll(GeneralChannel generalChannel);
	
	/**
	 * 获取泛渠道编码
	 * @param channelNbr
	 * @return
	 */
	String getGeneralChannelCode(String channelNbr);
	
	/**
	 * 删除泛渠道
	 * @param generalChannel
	 */
	void deleteByIds(GeneralChannel generalChannel);
	
	/**
	 * 删除泛渠道
	 * @param id
	 */
	void deleteById(Integer id);
	
	/**
	 * App 泛渠道接口详情
	 * @param generalChannelDetailReqDto
	 * @return
	 */
	AppResult<QueryGeneralChannelDetailResDto> findById(QueryGeneralChannelDetailReqDto generalChannelDetailReqDto);
	
	/**
	 * 查询行政村集合
	 * @param village
	 * @return
	 */
	PageResult<GeneralChannelVillage> findVillageNames(GeneralChannelVillage village);
	
	/**
	 * 查询乡镇集合
	 * @param village
	 * @return
	 */
	PageResult<GeneralChannelVillage> findTownNames(GeneralChannelVillage village);
	
	/**
	 * 校验手机号重复
	 * @param phone
	 * @return
	 */
	Boolean isExistTelePhone(String phone);
}
