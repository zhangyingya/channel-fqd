package com.tydic.generalChannelView.generalChannel.mapper;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.tydic.common.BaseMapper;
import com.tydic.generalChannelView.generalChannel.bean.GeneralChannelFormat;

@Repository
public interface GeneralChannelFormatMapper extends BaseMapper<GeneralChannelFormat> {
	List<GeneralChannelFormat> findAll(GeneralChannelFormat format);
	
	List<GeneralChannelFormat> findAllByTop();
	
	List<GeneralChannelFormat> findAllByParId(Long parId);
}
