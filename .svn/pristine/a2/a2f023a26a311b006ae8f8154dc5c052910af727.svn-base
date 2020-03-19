package com.tydic.common.mapper;

import java.util.List;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import com.tydic.common.BaseMapper;
import com.tydic.common.bean.CommonRegion;

@Component
@Repository
public interface CommonRegionMapper extends BaseMapper<CommonRegion> {
	
	CommonRegion findById(Long regionId);
	
	List<CommonRegion> findAll(CommonRegion commonRegion);
	
	List<CommonRegion> findAllBy1300();
	
	List<CommonRegion> findAllByParRegionId(Long parRegionId);
	
	CommonRegion findBySrcRegionId(Long srcRegionId);
	
	CommonRegion findAllByChannel(Long staffId);
	
	CommonRegion findRegionBySrcRegionId(Long srcRegionId);
}
