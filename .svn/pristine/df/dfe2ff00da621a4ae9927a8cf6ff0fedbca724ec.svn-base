package com.tydic.report.report13List.service;

import java.util.List;
import java.util.Map;

import com.tydic.common.page.PageResult;
import com.tydic.common.service.IService;
import com.tydic.report.report13List.bean.ChannelSales;

public interface ChannelSalesService extends IService<ChannelSales>  {
	PageResult<ChannelSales> findChannelSales(ChannelSales channelSales);
	
	/**
	 * 插入13月销量报表数据
	 */
	void insertDataToChannelTreeSales(List<ChannelSales> channelSalesList);
	
	/**
	 * 导出13月销量报表数据
	 * @return
	 */
	List<Map> findChannelSalesForExport(ChannelSales channelSales);
	
	/**
	 * 插入日志
	 * @param paramMap
	 */
	void insertChannelSalesLog(Map<String, Object> paramMap);
	
	/**
	 * 调用接口
	 * @param paramMap
	 */
	void sendDataToChannelSales();
	
	
}
