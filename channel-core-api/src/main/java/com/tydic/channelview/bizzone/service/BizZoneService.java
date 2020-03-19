package com.tydic.channelview.bizzone.service;

import com.tydic.channelview.bizzone.bean.BizZone;
import com.tydic.common.service.IService;

public interface BizZoneService extends IService<BizZone>  {
	
	BizZone selectByPrimaryKey(Long bizZoneId);
}
