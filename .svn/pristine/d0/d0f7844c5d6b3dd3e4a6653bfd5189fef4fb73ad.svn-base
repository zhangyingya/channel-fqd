package com.tydic.common.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.tydic.channelview.staff.bean.StaffBean;
import com.tydic.common.BaseMapper;
import com.tydic.common.PageContext;
import com.tydic.common.bean.CommonRegion;
import com.tydic.common.mapper.CommonRegionMapper;
import com.tydic.common.page.PageResult;
import com.tydic.common.service.AbstractService;
import com.tydic.common.service.CommonRegionService;

@Service
public class CommonRegionServiceImpl  extends AbstractService<CommonRegion> implements CommonRegionService {
	
	@Resource
	private CommonRegionMapper commonRegionMapper;

	@Override
	public PageResult<CommonRegion> findAll(CommonRegion commonRegion) {
		
		List<CommonRegion> allCommonRegions = commonRegionMapper.findAll(commonRegion);
		
		return new PageResult<CommonRegion>(commonRegion, PageContext.getPageTotal(), allCommonRegions);
	}

	@Override
	public List<Map<String, Object>> findAllBy1300() {
		List<CommonRegion> list = commonRegionMapper.findAllBy1300();
		
		List<Map<String, Object>> result = new ArrayList<Map<String, Object>>();
		for(CommonRegion region : list) {
			
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("code", region.getCommonRegionId());
			map.put("name", region.getRegionName());
			
			result.add(map);
		}
		
		return result;
	}
	
	@Override
	public Map<String, Object> findAllBy1300AndStaff(StaffBean staff) {
		Map<String, Object> result = new HashMap<String, Object>();
		
		CommonRegion commonRegion = commonRegionMapper.findBySrcRegionId(staff.getOrgId());
		
		if (commonRegion.getCommonRegionId().longValue() == 888) {
			List<CommonRegion> list = commonRegionMapper.findAllBy1300();
			
			List<Map<String, Object>> mapList = new ArrayList<Map<String, Object>>();
			for(CommonRegion region : list) {
				
				Map<String, Object> map = new HashMap<String, Object>();
				map.put("code", region.getCommonRegionId());
				map.put("name", region.getRegionName());
				
				mapList.add(map);
			}
			
			result.put("commonRegions", mapList);
			return result;
		} else if (commonRegion.getCommonRegionId().longValue() != 888 && "1300".equals(commonRegion.getRegionType())) {
			
			List<Map<String, Object>> mapList = new ArrayList<Map<String, Object>>();
			Map<String, Object> map = new HashMap<String, Object>();
			
			map.put("code", commonRegion.getCommonRegionId());
			map.put("name", commonRegion.getRegionName());
				
			mapList.add(map);
			
			result.put("commonRegions", mapList);
			return result;
		} else if ("1400".equals(commonRegion.getRegionType())) {
			CommonRegion commonRegion2 = commonRegionMapper.findBySrcRegionId(commonRegion.getUpRegionId());
			
			List<Map<String, Object>> mapList = new ArrayList<Map<String, Object>>();
			Map<String, Object> map = new HashMap<String, Object>();
			
			if (commonRegion2.getCommonRegionId().longValue() != 888 && "1300".equals(commonRegion2.getRegionType())) {
				
				map.put("code", commonRegion2.getCommonRegionId());
				map.put("name", commonRegion2.getRegionName());
					
				mapList.add(map);
			}
			
			result.put("commonRegions", mapList);
			return result;
		} else {
			return null;
		}
	}

	@Override
	public List<Map<String, Object>> findAllByParRegionId(Long parRegionId) {
		List<CommonRegion> list = commonRegionMapper.findAllByParRegionId(parRegionId);
		
		List<Map<String, Object>> result = new ArrayList<Map<String, Object>>();
		for(CommonRegion region : list) {
			
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("code", region.getCommonRegionId());
			map.put("name", region.getRegionName());
			
			result.add(map);
		}
		
		return result;
	}
	
	@Override
	public Map<String, Object> findAllByParRegionIdAndStaff(Long parRegionId, StaffBean staff) {
		Map<String, Object> result = new HashMap<String, Object>();
		CommonRegion commonRegion = commonRegionMapper.findBySrcRegionId(staff.getOrgId());
		
		if ("1300".equals(commonRegion.getRegionType()) || "1100".equals(commonRegion.getRegionType())) {
			List<CommonRegion> list = commonRegionMapper.findAllByParRegionId(parRegionId);
			
			List<Map<String, Object>> mapList = new ArrayList<Map<String, Object>>();
			for(CommonRegion region : list) {
				
				Map<String, Object> map = new HashMap<String, Object>();
				map.put("code", region.getCommonRegionId());
				map.put("name", region.getRegionName());
				
				mapList.add(map);
				result.put("commonRegions", mapList);
			}
			
			result.put("commonRegions", mapList);
		} else if ("1400".equals(commonRegion.getRegionType())) {
			CommonRegion commonRegion2 = commonRegionMapper.findAllByChannel(staff.getStaffId());
			
			List<Map<String, Object>> mapList = new ArrayList<Map<String, Object>>();
			
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("code", commonRegion2.getCommonRegionId());
			map.put("name", commonRegion2.getRegionName());
			
			mapList.add(map);
			result.put("commonRegions", mapList);
		}
		
		return result;
	}

	@Override
	public CommonRegion findById(Long regionId) {
		return commonRegionMapper.findById(regionId);
	}
	
	@Override
	public CommonRegion findBySrcRegionId(Long srcRegionId) {
		// TODO Auto-generated method stub
		return commonRegionMapper.findBySrcRegionId(srcRegionId);
	}

	@Override
	public BaseMapper<CommonRegion> getMapper() {
		// TODO Auto-generated method stub
		return null;
	}

}
