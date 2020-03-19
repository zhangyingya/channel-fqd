package com.tydic.generalChannelView.report.service;

import com.tydic.common.page.PageResult;
import com.tydic.common.service.IService;
import com.tydic.generalChannelView.report.bean.BusinessBillReport;
import com.tydic.generalChannelView.report.bean.GeneralChanenlAndBusinessBillReport;
import com.tydic.generalChannelView.report.bean.GeneralChannelReport;
import com.tydic.generalChannelView.report.bean.ReportReqDto;

/**
 * 泛渠道报表服务接口
 * @author Administrator
 *
 */
public interface GeneralReportService extends IService<GeneralChannelReport> {
	
	/**
	 * 泛渠道可视化报表查询
	 * @param guiReportReqDto
	 * @return
	 */
	//public List<GuiReportResDto> findGuiReport(GuiReportReqDto guiReportReqDto);
	
	/**
	 * 泛渠道报表查询
	 * @param generalChannelReport
	 * @return
	 */
	public PageResult<GeneralChannelReport> findGeneralChannelReport(ReportReqDto reportReqDto);
	
	/**
	 * 商机单报表查询
	 * @param businessBillReport
	 * @return
	 */
	public PageResult<BusinessBillReport> findBusinessBillReport(ReportReqDto reportReqDto);
	
	/**
	 * 全量报表查询
	 * @param generalChanenlAndBusinessBillReport
	 * @return
	 */
	public PageResult<GeneralChanenlAndBusinessBillReport> findAllReport(ReportReqDto reportReqDto);
	
	/**
	 * 根据本地网统计
	 * @param reportReqDto
	 * @return
	 */
	public PageResult<GeneralChanenlAndBusinessBillReport> findAllReportByLatn(ReportReqDto reportReqDto);
	
	/**
	 * 根据区县统计
	 * @param reportReqDto
	 * @return
	 */
	public PageResult<GeneralChanenlAndBusinessBillReport> findAllReportByRegion(ReportReqDto reportReqDto);
	
	/**
	 * 根据结对门店统计
	 * @param reportReqDto
	 * @return
	 */
	public PageResult<GeneralChanenlAndBusinessBillReport> findAllReportByChannel(ReportReqDto reportReqDto);
}
