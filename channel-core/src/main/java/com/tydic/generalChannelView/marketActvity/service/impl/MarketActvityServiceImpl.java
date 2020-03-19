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
import com.tydic.generalChannelView.generalChannel.bean.GeneralChannel;
import com.tydic.generalChannelView.generalChannel.mapper.GeneralChannelMapper;
import com.tydic.generalChannelView.marketActvity.bean.MarketActvity;
import com.tydic.generalChannelView.marketActvity.mapper.MarketActvityMapper;
import com.tydic.generalChannelView.marketActvity.service.MarketActvityService;

@Service
@Slf4j
public class MarketActvityServiceImpl extends AbstractService<MarketActvity> implements MarketActvityService {
	
	@Resource
	private MarketActvityMapper marketActvityMapper;
	
	@Resource
	private GeneralChannelMapper generalChannelMapper;
	
	@Override
	@Transactional
	public void add(MarketActvity marketActvity) {
		// TODO Auto-generated method stub
		marketActvityMapper.insert(marketActvity);
	}
	
	@Override
	@Transactional
	public void edit(MarketActvity marketActvity) {
		// TODO Auto-generated method stub
		marketActvityMapper.update(marketActvity);
	}
	
	@Override
	public PageResult<MarketActvity> findAll(MarketActvity marketActvity) {
		// TODO Auto-generated method stub
		List<MarketActvity> marketActvities = marketActvityMapper.findAll(marketActvity);
		return new PageResult<MarketActvity>(marketActvity, PageContext.getPageTotal(), marketActvities);
	}

	@Override
	@Transactional
	public void deleteByIds(MarketActvity marketActvity) {
		// TODO Auto-generated method stub
		marketActvityMapper.deleteByIds(marketActvity);
	}
	
	@Override
	public MarketActvity findById(Integer id) {
		MarketActvity marketActvity = new MarketActvity();
		marketActvity = marketActvityMapper.findById(id);
		
		List<GeneralChannel> generalChannels = generalChannelMapper.findAllByMarketActivityId(id);
		marketActvity.setGeneralChannels(generalChannels);
		
		return marketActvity;
	}

	@Override
	@Transactional
	public void deleteById(Long id) {
		// TODO Auto-generated method stub
		marketActvityMapper.deleteById(id);
	}

	@Override
	public BaseMapper<MarketActvity> getMapper() {
		// TODO Auto-generated method stub
		return null;
	}
	
	
}
