package com.tydic.generalChannelView.generalChannel.service;


import java.util.List;
import java.util.Map;

import com.tydic.common.page.PageResult;
import com.tydic.common.service.IService;
import com.tydic.generalChannelView.generalChannel.bean.GeneralChannelFormat;

public interface GeneralChannelFormatService extends IService<GeneralChannelFormat>  {
	PageResult<GeneralChannelFormat> findAll(GeneralChannelFormat format);
	
	List<Map<String, Object>> findAllByTop();
	
	List<Map<String, Object>> findAllByParId(Long parId);
}
