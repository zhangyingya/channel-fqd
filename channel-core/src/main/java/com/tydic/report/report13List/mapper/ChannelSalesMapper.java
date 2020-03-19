package com.tydic.report.report13List.mapper;


import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import com.tydic.common.BaseMapper;
import com.tydic.report.report13List.bean.ChannelSales;

@Component
@Repository
public interface ChannelSalesMapper extends BaseMapper<ChannelSales>{
	
	List<ChannelSales> findChannelSales(ChannelSales channelSales);
	
	Long countFindChannelSales(ChannelSales channelSales);
	
	void insertDataToChannelTreeSales(List<ChannelSales> channelSalesList);
	
	List<Map> findChannelSalesForExport(ChannelSales channelSales);
	
	void insertChannelSalesLog(Map<String, Object> paramMap);
	
}
