package com.tydic.generalChannelView.generalChannel.mapper;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.tydic.common.BaseMapper;
import com.tydic.generalChannelView.generalChannel.bean.GeneralChannelVillage;

@Repository
public interface GeneralChannelVillageMapper extends BaseMapper<GeneralChannelVillage> {
	
	List<GeneralChannelVillage> findTownNames(GeneralChannelVillage village);
	
	List<GeneralChannelVillage> findVillageNames(GeneralChannelVillage village);
	
}
