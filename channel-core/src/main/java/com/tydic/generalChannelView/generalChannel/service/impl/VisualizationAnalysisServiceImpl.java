package com.tydic.generalChannelView.generalChannel.service.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import com.tydic.common.BaseMapper;
import com.tydic.common.service.AbstractService;
import com.tydic.generalChannelView.generalChannel.bean.GeneralChannel;
import com.tydic.generalChannelView.generalChannel.mapper.VisualizationAnalysisMapper;
import com.tydic.generalChannelView.generalChannel.service.VisualizationAnalysisService;


public class VisualizationAnalysisServiceImpl extends AbstractService<GeneralChannel> implements VisualizationAnalysisService{
	
	@Resource
	private VisualizationAnalysisMapper visualizationAnalysisMapper;
	

	@Override
	public List<Map<String, Object>> findAllChannelAmounts(Map<String, Object> map) {
		
		return visualizationAnalysisMapper.findAllChannelAmounts( map);
		
	}

	@Override
	public List<Map<String, Object>> findAllBusinessOpportunityList(Map<String,Object>map) {
		
		return visualizationAnalysisMapper.findAllBusinessOpportunityList( map);
	}

	

	@Override
	public List<Map<String, Object>> findBusinessOpportunityAmountsByEveryday() {
		
		return visualizationAnalysisMapper.findBusinessOpportunityAmountsByEveryday();
	}

	@Override
	public List<Map<String, Object>> findGeneralChannelAmountsByEveryday() {
		
		return visualizationAnalysisMapper.findGeneralChannelAmountsByEveryday();
	}

	@Override
	public BaseMapper<GeneralChannel> getMapper() {
		
		return null;
	}
	
	
	
	

}
