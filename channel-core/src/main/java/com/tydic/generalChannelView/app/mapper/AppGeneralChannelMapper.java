package com.tydic.generalChannelView.app.mapper;

import java.util.Map;

import org.springframework.stereotype.Repository;

import com.tydic.common.BaseMapper;

@Repository
public interface AppGeneralChannelMapper extends BaseMapper  {

	void deleteById(Map<String,Object> param);
}
