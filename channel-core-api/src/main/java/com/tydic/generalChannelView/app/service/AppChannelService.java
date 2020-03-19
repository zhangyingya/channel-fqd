package com.tydic.generalChannelView.app.service;

import java.util.List;

import com.tydic.channelview.channel.bean.ChannelBean;
import com.tydic.channelview.channel.bean.QueryChannelReqDto;
import com.tydic.common.service.IService;
import com.tydic.generalChannelView.app.AppResult;

public interface AppChannelService extends IService<ChannelBean>{

	/**
	 * 泛渠道-查询结对渠道
	 * @param channel
	 * @return
	 */
	AppResult<List<ChannelBean>> findAll(QueryChannelReqDto reqDto);
}
