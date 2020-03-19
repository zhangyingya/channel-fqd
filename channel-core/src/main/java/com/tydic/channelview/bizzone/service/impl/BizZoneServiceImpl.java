package com.tydic.channelview.bizzone.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.tydic.channelview.bizzone.bean.BizZone;
import com.tydic.channelview.bizzone.mapper.BizZoneMapper;
import com.tydic.channelview.bizzone.service.BizZoneService;
import com.tydic.common.BaseMapper;
import com.tydic.common.service.AbstractService;

@Service
public class BizZoneServiceImpl extends AbstractService<BizZone> implements BizZoneService {
	@Resource
	private BizZoneMapper bizZoneMapper;
	
	@Override
	public BaseMapper<BizZone> getMapper() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public BizZone selectByPrimaryKey(Long bizZoneId) {
		BizZone bizZone = bizZoneMapper.selectByPrimaryKey(bizZoneId);
		return bizZone;
	}

}
