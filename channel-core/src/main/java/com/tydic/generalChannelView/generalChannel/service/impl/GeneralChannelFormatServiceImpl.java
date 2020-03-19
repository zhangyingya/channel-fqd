package com.tydic.generalChannelView.generalChannel.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import com.tydic.common.BaseMapper;
import com.tydic.common.PageContext;
import com.tydic.common.page.PageResult;
import com.tydic.common.service.AbstractService;
import com.tydic.generalChannelView.generalChannel.bean.GeneralChannelFormat;
import com.tydic.generalChannelView.generalChannel.mapper.GeneralChannelFormatMapper;
import com.tydic.generalChannelView.generalChannel.service.GeneralChannelFormatService;

public class GeneralChannelFormatServiceImpl extends AbstractService<GeneralChannelFormat> implements GeneralChannelFormatService {
	
	@Resource
	private GeneralChannelFormatMapper formatMapper;

	@Override
	public PageResult<GeneralChannelFormat> findAll(GeneralChannelFormat format) {
		List<GeneralChannelFormat> allFormats = formatMapper.findAll(format);
		
		return new PageResult<GeneralChannelFormat>(format, PageContext.getPageTotal(), allFormats);
	}

	@Override
	public List<Map<String, Object>> findAllByTop() {
		List<GeneralChannelFormat> list = formatMapper.findAllByTop();
		
		List<Map<String, Object>> result = new ArrayList<Map<String, Object>>();
		for(GeneralChannelFormat format : list) {
			
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("code", format.getId());
			map.put("name", format.getValue());
			
			result.add(map);
		}
		
		return result;
	}

	@Override
	public List<Map<String, Object>> findAllByParId(Long parId) {
		List<GeneralChannelFormat> list = formatMapper.findAllByParId(parId);
		
		List<Map<String, Object>> result = new ArrayList<Map<String, Object>>();
		for(GeneralChannelFormat format : list) {
			
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("code", format.getId());
			map.put("name", format.getValue());
			
			result.add(map);
		}
		
		return result;
	}

	@Override
	public BaseMapper<GeneralChannelFormat> getMapper() {
		// TODO Auto-generated method stub
		return null;
	}

}
