package com.tydic.generalChannelView.marketActvity.service.impl;

import java.util.List;

import javax.annotation.Resource;

import lombok.extern.slf4j.Slf4j;

import org.springframework.transaction.annotation.Transactional;

import com.alibaba.dubbo.config.annotation.Service;
import com.tydic.common.BaseMapper;
import com.tydic.common.PageContext;
import com.tydic.common.page.PageResult;
import com.tydic.common.service.AbstractService;
import com.tydic.generalChannelView.marketActvity.bean.GeneralChannelActivity;
import com.tydic.generalChannelView.marketActvity.mapper.GeneralChannelActvityMapper;
import com.tydic.generalChannelView.marketActvity.service.GeneralChannelActvityService;

@Service
@Slf4j
public class GeneralChannelActvityServiceImpl extends AbstractService<GeneralChannelActivity> implements GeneralChannelActvityService {
	
	@Resource
	private GeneralChannelActvityMapper channelActvityMapper;
	
	@Override
	public void add(GeneralChannelActivity channelActivity) {
		channelActvityMapper.insert(channelActivity);
	}
	
	@Transactional
	@Override
	public void batchAdd(List<GeneralChannelActivity> channelActivities) {
		// TODO Auto-generated method stub
		channelActvityMapper.batchDeleteByMarketActivityId(channelActivities.get(0).getMarketActivityId());
		
		for (GeneralChannelActivity generalChannelActivity : channelActivities) {
			channelActvityMapper.insert(generalChannelActivity);
		}
		
		//channelActvityMapper.batchInsert(channelActivities);
	}
	
	@Override
	public void edit(GeneralChannelActivity channelActivity) {
		channelActvityMapper.update(channelActivity);
	}
	
	@Override
	public PageResult<GeneralChannelActivity> findAll(GeneralChannelActivity channelActivity) {
		List<GeneralChannelActivity> channelActivities = channelActvityMapper.findAll(channelActivity);
		return new PageResult<GeneralChannelActivity>(channelActivity, PageContext.getPageTotal(), channelActivities);
	}

	@Override
	public void deleteByIds(GeneralChannelActivity channelActivity) {
		channelActvityMapper.deleteByIds(channelActivity);
	}

	@Override
	public void deleteById(Long id) {
		channelActvityMapper.deleteById(id);
	}

	@Override
	public BaseMapper<GeneralChannelActivity> getMapper() {
		return null;
	}
	
	
}
