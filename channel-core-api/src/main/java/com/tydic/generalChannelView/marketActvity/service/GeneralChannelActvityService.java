package com.tydic.generalChannelView.marketActvity.service;


import java.util.List;

import com.tydic.common.page.PageResult;
import com.tydic.common.service.IService;
import com.tydic.generalChannelView.marketActvity.bean.GeneralChannelActivity;

public interface GeneralChannelActvityService extends IService<GeneralChannelActivity>  {
	
	PageResult<GeneralChannelActivity> findAll(GeneralChannelActivity channelActivity);
	
	void deleteByIds(GeneralChannelActivity channelActivity);
	
	void deleteById(Long id);
	
	void batchAdd(List<GeneralChannelActivity> channelActivities);
}
