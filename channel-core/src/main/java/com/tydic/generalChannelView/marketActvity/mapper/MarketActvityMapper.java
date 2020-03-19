package com.tydic.generalChannelView.marketActvity.mapper;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.tydic.common.BaseMapper;
import com.tydic.generalChannelView.marketActvity.bean.MarketActvity;

@Repository
public interface MarketActvityMapper extends BaseMapper<MarketActvity>{
	
	void deleteById(Long id);
	
	void deleteByIds(MarketActvity marketActvity);
	
	List<MarketActvity> findAll(MarketActvity marketActvity);
	
	MarketActvity findById(Integer id);
	
	List<MarketActvity> findAllByGeneralChannelId(Integer generalChannelId);
	
}
