package com.tydic.generalChannelView.generalChannel.mapper;


import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.tydic.common.BaseMapper;
import com.tydic.generalChannelView.generalChannel.bean.GeneralChannel;

@Repository
public interface GeneralChannelMapper extends BaseMapper<GeneralChannel>{
	
	void deleteByChannelNbrs(GeneralChannel generalChannel);
	
	void deleteById(Integer id);
	
	void deleteByIds(GeneralChannel generalChannel);
	
	List<GeneralChannel> findAll(GeneralChannel generalChannel);
	
	Long isExistGeneralChannelCode(String code);
	
	Long isExistGeneralChannelPhone(String phone);
	
	GeneralChannel selectById(Integer id);
	
	List<GeneralChannel> findAllByMarketActivityId(Integer id);
	
	Integer selectPrimaryKey();

	Long countFindAll(GeneralChannel generalChannel);
	
	List<Map<String,Object>> findByPhoneAndPwd(Map<String,Object> map);
	
	void updateUserPwd(Map<String,Object> map);
}
