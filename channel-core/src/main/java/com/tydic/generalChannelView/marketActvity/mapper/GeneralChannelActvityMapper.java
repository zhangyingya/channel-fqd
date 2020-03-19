package com.tydic.generalChannelView.marketActvity.mapper;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.tydic.common.BaseMapper;
import com.tydic.generalChannelView.marketActvity.bean.GeneralChannelActivity;

@Repository
public interface GeneralChannelActvityMapper extends BaseMapper<GeneralChannelActivity>{
	
	void deleteById(Long id);
	
	void deleteByIds(GeneralChannelActivity channelActivity);
	
	List<GeneralChannelActivity> findAll(GeneralChannelActivity channelActivity);
	
	List<GeneralChannelActivity> batchInsert(List<GeneralChannelActivity> list);
	
	void batchDeleteByMarketActivityId(Integer id);
	
}
