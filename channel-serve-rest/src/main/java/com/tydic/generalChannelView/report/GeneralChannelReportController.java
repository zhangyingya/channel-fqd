package com.tydic.generalChannelView.report;


import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tydic.common.controller.AbstractController;
import com.tydic.common.page.PageResult;
import com.tydic.generalChannelView.report.bean.BusinessBillReport;
import com.tydic.generalChannelView.report.bean.GeneralChanenlAndBusinessBillReport;
import com.tydic.generalChannelView.report.bean.GeneralChannelReport;
import com.tydic.generalChannelView.report.bean.ReportReqDto;
import com.tydic.generalChannelView.report.service.GeneralReportService;
import com.tydic.report.report13List.service.ChannelSalesService;
import com.tydic.sso.bean.SystemUserDetail;

/**
 * 泛渠道报表
 * @author Administrator
 *
 */
@RestController
@RequestMapping(value="/generalChannelReport")
public class GeneralChannelReportController extends AbstractController {
	
	@Autowired
	private GeneralReportService generalReportService;
	@Autowired
	private ChannelSalesService  channelSalesService;
	
	@RequestMapping(value = "/findGeneralChannelReport")
	public PageResult<GeneralChannelReport> findGeneralChannelReport(HttpServletRequest request, ReportReqDto reportReqDto) {
		
		setPageInfo(request, reportReqDto);
		SystemUserDetail userDetail = getLoginUserInfo(request);
		reportReqDto.setLoginSysUserCode(userDetail.getAuthSystemUser().getSysUserCode());
		reportReqDto.setSysRoleIds(findRoleIds(userDetail.getAuthSystemUser().getSysUserId()));
		
		//SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		/*try {
			reportReqDto.setStartDate(sdf.parse(reportReqDto.getStartDateStr()));
			reportReqDto.setEndDate(sdf.parse(reportReqDto.getEndDateStr()));
		} catch (ParseException e) {
			log.error(reportReqDto.getStartDateStr() + "," + reportReqDto.getEndDateStr() + "转date类型失败", e.getMessage());
		}*/
				
				
		
		return generalReportService.findGeneralChannelReport(reportReqDto);
	}
	
	@RequestMapping(value = "/findBusinessBillReport")
	public PageResult<BusinessBillReport> findBusinessBillReport(HttpServletRequest request, ReportReqDto reportReqDto) {
		
		setPageInfo(request, reportReqDto);
		SystemUserDetail userDetail = getLoginUserInfo(request);
		reportReqDto.setLoginSysUserCode(userDetail.getAuthSystemUser().getSysUserCode());
		reportReqDto.setSysRoleIds(findRoleIds(userDetail.getAuthSystemUser().getSysUserId()));
		
		return generalReportService.findBusinessBillReport(reportReqDto);
	}
	
	/**
	 * 效能报表-通过本地网查询
	 * @param request
	 * @param reportReqDto
	 * @return
	 */
	@RequestMapping(value = "/findAllReportByLatn")
	public PageResult<GeneralChanenlAndBusinessBillReport> findAllReportByLatn(HttpServletRequest request, ReportReqDto reportReqDto) {
		
		setPageInfo(request, reportReqDto);
		SystemUserDetail userDetail = getLoginUserInfo(request);
		reportReqDto.setLoginSysUserCode(userDetail.getAuthSystemUser().getSysUserCode());
		reportReqDto.setSysRoleIds(findRoleIds(userDetail.getAuthSystemUser().getSysUserId()));
		
		return generalReportService.findAllReportByLatn(reportReqDto);
	}
	
	/**
	 * 效能报表-通过区县查询
	 * @param request
	 * @param reportReqDto
	 * @return
	 */
	@RequestMapping(value = "/findAllReportByRegion")
	public PageResult<GeneralChanenlAndBusinessBillReport> findAllReportByRegion(HttpServletRequest request, ReportReqDto reportReqDto) {
		
		setPageInfo(request, reportReqDto);
		SystemUserDetail userDetail = getLoginUserInfo(request);
		reportReqDto.setLoginSysUserCode(userDetail.getAuthSystemUser().getSysUserCode());
		reportReqDto.setSysRoleIds(findRoleIds(userDetail.getAuthSystemUser().getSysUserId()));
		
		return generalReportService.findAllReportByRegion(reportReqDto);
	}
	
	/**
	 * 效能报表-通过结对渠道/营业厅查询
	 * @param request
	 * @param reportReqDto
	 * @return
	 */
	@RequestMapping(value = "/findAllReportByChannel")
	public PageResult<GeneralChanenlAndBusinessBillReport> findAllReportByChannel(HttpServletRequest request, ReportReqDto reportReqDto) {
		
		setPageInfo(request, reportReqDto);
		SystemUserDetail userDetail = getLoginUserInfo(request);
		reportReqDto.setLoginSysUserCode(userDetail.getAuthSystemUser().getSysUserCode());
		reportReqDto.setSysRoleIds(findRoleIds(userDetail.getAuthSystemUser().getSysUserId()));
		
		return generalReportService.findAllReportByChannel(reportReqDto);
	}
	
	
	
	
	/**
	 * 效能报表-通过结对渠道/营业厅查询
	 * @param request
	 * @param reportReqDto
	 * @return
	 */
	@RequestMapping(value = "/generateReport")
	public void generateReport(HttpServletRequest request, ReportReqDto reportReqDto) {
		
		channelSalesService.sendDataToChannelSales();
	
	}
	
	

	
	

}
