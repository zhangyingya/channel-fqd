package com.tydic.generalChannelView.report.mapper;

import java.util.List;
import java.util.Map;

import com.tydic.common.BaseMapper;
import com.tydic.generalChannelView.report.bean.BusinessBillReport;
import com.tydic.generalChannelView.report.bean.GeneralChanenlAndBusinessBillReport;
import com.tydic.generalChannelView.report.bean.GeneralChannelReport;
import com.tydic.generalChannelView.report.bean.ReportReqDto;

public interface GeneralReportMapper extends BaseMapper<ReportReqDto> {
	
	/**
	 * 可视化报表服务查询
	 * @param map
	 * @return
	 */
	List<Map<String, Object>> findGuiReport(Map<String, Object> map);
	
	/**
	 * 查询泛渠道报表
	 * @param map
	 * @return
	 */
	List<GeneralChannelReport> findGeneralChannelReport(ReportReqDto reportReqDto);
	
	/**
	 * 查询商机单报表
	 * @param map
	 * @return
	 */
	List<BusinessBillReport> findBusinessBillReport(ReportReqDto reportReqDto);
	
	/**
	 * 查询全量报表
	 * @param map
	 * @return
	 */
	List<GeneralChanenlAndBusinessBillReport> findAllReport(ReportReqDto reportReqDto);
	
	/**
	 * 根据本地网统计
	 * @param map
	 * @return
	 */
	List<GeneralChanenlAndBusinessBillReport> findAllReportByLatn(ReportReqDto reportReqDto);
	
	/**
	 * 根据区县统计
	 * @param map
	 * @return
	 */
	List<GeneralChanenlAndBusinessBillReport> findAllReportByRegion(ReportReqDto reportReqDto);
	
	
	/**
	 * 查询结对门店统计
	 * @param map
	 * @return
	 */
	List<GeneralChanenlAndBusinessBillReport> findAllReportByChannel(ReportReqDto reportReqDto);
	
}
