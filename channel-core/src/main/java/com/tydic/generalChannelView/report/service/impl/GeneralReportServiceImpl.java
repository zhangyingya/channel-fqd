package com.tydic.generalChannelView.report.service.impl;

import java.text.DecimalFormat;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;

import com.tydic.channelview.staff.bean.StaffBean;
import com.tydic.channelview.staff.mapper.StaffBeanMapper;
import com.tydic.common.BaseMapper;
import com.tydic.common.PageContext;
import com.tydic.common.page.PageResult;
import com.tydic.common.service.AbstractService;
import com.tydic.common.service.CommonService;
import com.tydic.common.utils.JsonUtil;
import com.tydic.common.utils.ObjectIsNull;
import com.tydic.generalChannelView.report.bean.BusinessBillReport;
import com.tydic.generalChannelView.report.bean.GeneralChanenlAndBusinessBillReport;
import com.tydic.generalChannelView.report.bean.GeneralChannelReport;
import com.tydic.generalChannelView.report.bean.ReportReqDto;
import com.tydic.generalChannelView.report.mapper.GeneralReportMapper;
import com.tydic.generalChannelView.report.service.GeneralReportService;

import lombok.extern.slf4j.Slf4j;

/**
 * 泛渠道报表实现类
 * @author Administrator
 *
 */
@Slf4j
public class GeneralReportServiceImpl extends AbstractService<GeneralChannelReport> implements GeneralReportService {
	
	@Autowired
	private GeneralReportMapper generalReportMapper;
	
	@Autowired
	private CommonService commonService;
	
	@Resource 
	StaffBeanMapper staffBeanMapper;

	/*@Override
	public List<GuiReportResDto> findGuiReport(GuiReportReqDto guiReportReqDto) {
		log.debug("报表服务请求参数：{}", JsonUtil.objToStr(guiReportReqDto));
		
		Map<String, Object> map = new HashMap<>();
		generalReportMapper.findGuiReport(map);
		
		return null;
	}*/
	
	
	@Override
	public PageResult<GeneralChannelReport> findGeneralChannelReport(ReportReqDto reportReqDto) {
		log.info("泛渠道报表服务查询：{}", JsonUtil.objToStr(reportReqDto));
		
		//查询员工信息
		StaffBean staffBean = staffBeanMapper.findByStaffCode(reportReqDto.getLoginSysUserCode());
		//获取角色类型
		String roleType = commonService.getRoleType(reportReqDto.getLoginSysUserCode(), reportReqDto.getSysRoleIds());
				
		if ("general".equals(roleType)) {
			reportReqDto.setLoginStaffId(staffBean.getStaffId());
		}
				
		if ("other".equals(roleType)) {
			return null;
		}
		
		List<GeneralChannelReport> generalChannelReports = generalReportMapper.findGeneralChannelReport(reportReqDto);
		
		return new PageResult<GeneralChannelReport>(reportReqDto, PageContext.getPageTotal(), generalChannelReports);
	}
	
	@Override
	public PageResult<BusinessBillReport> findBusinessBillReport(ReportReqDto reportReqDto) {
		log.debug("商机单报表服务查询：{}", JsonUtil.objToStr(reportReqDto));
		
		//查询员工信息
		StaffBean staffBean = staffBeanMapper.findByStaffCode(reportReqDto.getLoginSysUserCode());
		//获取角色类型
		String roleType = commonService.getRoleType(reportReqDto.getLoginSysUserCode(), reportReqDto.getSysRoleIds());
						
		if ("general".equals(roleType)) {
			reportReqDto.setLoginStaffId(staffBean.getStaffId());
		}
						
		if ("other".equals(roleType)) {
			return null;
		}
		
		List<BusinessBillReport> businessBillReports = generalReportMapper.findBusinessBillReport(reportReqDto);
		
		return new PageResult<BusinessBillReport>(reportReqDto, PageContext.getPageTotal(), businessBillReports);
	}
	
	@Override
	public PageResult<GeneralChanenlAndBusinessBillReport> findAllReport(ReportReqDto reportReqDto) {
		log.debug("全量报表服务查询：{}", JsonUtil.objToStr(reportReqDto));
		
		List<GeneralChanenlAndBusinessBillReport> businessBillReports = generalReportMapper.findAllReport(reportReqDto);
		
		return new PageResult<GeneralChanenlAndBusinessBillReport>(reportReqDto, PageContext.getPageTotal(), businessBillReports);
	}

	@Override
	public BaseMapper<GeneralChannelReport> getMapper() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public PageResult<GeneralChanenlAndBusinessBillReport> findAllReportByLatn(ReportReqDto reportReqDto) {
		log.debug("效能报表-本地网条件服务查询：{}", JsonUtil.objToStr(reportReqDto));
		List<GeneralChanenlAndBusinessBillReport> businessBillReports = generalReportMapper.findAllReportByLatn(reportReqDto);
		
		if (!ObjectIsNull.check(businessBillReports) && businessBillReports.size() > 0) {
			for (GeneralChanenlAndBusinessBillReport allReport : businessBillReports) {
				//商机结单完成率
				allReport.setPercentCompleteBusinessBill(integerToDecimal(allReport.getCountCompleteBusinessBills(),
						allReport.getCountBusinessBills()));
				//商机转化成功量
				allReport.setPercentBusinessToOrder(integerToDecimal(allReport.getCountBusinessToOrder(),
						allReport.getCountBusinessBills()));
				//活跃泛渠道网点数
				allReport.setCountActiveGeneralChannel(checkErrorData(allReport.getCountActiveGeneralChannel()));
				//有效泛渠道网点数
				allReport.setCountEffectiveGeneralChannel(checkErrorData(allReport.getCountEffectiveGeneralChannel()));
				//泛渠道店均甩单成功数
				allReport.setAverageCompleteGeneralChannelToOrder(checkErrorData(allReport.getAverageCompleteGeneralChannelToOrder()));
				//泛渠道店均甩单数	
				allReport.setAverageGeneralChannelToOrder(checkErrorData(allReport.getAverageGeneralChannelToOrder()));
				//村代触点活跃率
				allReport.setPercentActiveVillege(integerToDecimal(allReport.getCountActiveVillegeChild(), allReport.getCountActiveVillegePar()));
				//乡镇代触点活跃率
				allReport.setPercentActiveTown(integerToDecimal(allReport.getCountActiveTownChild(), allReport.getCountActiveTownPar()));
			}
			
		}
		
		return new PageResult<GeneralChanenlAndBusinessBillReport>(reportReqDto, PageContext.getPageTotal(), businessBillReports);
	}

	@Override
	public PageResult<GeneralChanenlAndBusinessBillReport> findAllReportByRegion(ReportReqDto reportReqDto) {
		log.debug("效能报表-区县条件服务查询：{}", JsonUtil.objToStr(reportReqDto));
		
		List<GeneralChanenlAndBusinessBillReport> businessBillReports = generalReportMapper.findAllReportByRegion(reportReqDto);
		
		if (!ObjectIsNull.check(businessBillReports) && businessBillReports.size() > 0) {
			for (GeneralChanenlAndBusinessBillReport allReport : businessBillReports) {
				//商机结单完成率
				allReport.setPercentCompleteBusinessBill(integerToDecimal(allReport.getCountCompleteBusinessBills(),
						allReport.getCountBusinessBills()));
				//商机转化成功量
				allReport.setPercentBusinessToOrder(integerToDecimal(allReport.getCountBusinessToOrder(),
						allReport.getCountBusinessBills()));
				//活跃泛渠道网点数
				allReport.setCountActiveGeneralChannel(checkErrorData(allReport.getCountActiveGeneralChannel()));
				//有效泛渠道网点数
				allReport.setCountEffectiveGeneralChannel(checkErrorData(allReport.getCountEffectiveGeneralChannel()));
				//泛渠道店均甩单成功数
				allReport.setAverageCompleteGeneralChannelToOrder(checkErrorData(allReport.getAverageCompleteGeneralChannelToOrder()));
				//泛渠道店均甩单数	
				allReport.setAverageGeneralChannelToOrder(checkErrorData(allReport.getAverageGeneralChannelToOrder()));
				//村代触点活跃率
				allReport.setPercentActiveVillege(integerToDecimal(allReport.getCountActiveVillegeChild(), allReport.getCountActiveVillegePar()));
				//乡镇代触点活跃率
				allReport.setPercentActiveTown(integerToDecimal(allReport.getCountActiveTownChild(), allReport.getCountActiveTownPar()));
			}
			
		}
		
		return new PageResult<GeneralChanenlAndBusinessBillReport>(reportReqDto, PageContext.getPageTotal(), businessBillReports);
	}

	@Override
	public PageResult<GeneralChanenlAndBusinessBillReport> findAllReportByChannel(ReportReqDto reportReqDto) {
		log.debug("效能报表-营业厅条件服务查询：{}", JsonUtil.objToStr(reportReqDto));
		
		List<GeneralChanenlAndBusinessBillReport> businessBillReports = generalReportMapper.findAllReportByChannel(reportReqDto);
		
		if (!ObjectIsNull.check(businessBillReports) && businessBillReports.size() > 0) {
			for (GeneralChanenlAndBusinessBillReport allReport : businessBillReports) {
				//商机结单完成率
				allReport.setPercentCompleteBusinessBill(integerToDecimal(allReport.getCountCompleteBusinessBills(),
						allReport.getCountBusinessBills()));
				//商机转化成功量
				allReport.setPercentBusinessToOrder(integerToDecimal(allReport.getCountBusinessToOrder(),
						allReport.getCountBusinessBills()));
				//活跃泛渠道网点数
				allReport.setCountActiveGeneralChannel(checkErrorData(allReport.getCountActiveGeneralChannel()));
				//有效泛渠道网点数
				allReport.setCountEffectiveGeneralChannel(checkErrorData(allReport.getCountEffectiveGeneralChannel()));
				//泛渠道店均甩单成功数
				allReport.setAverageCompleteGeneralChannelToOrder(checkErrorData(allReport.getAverageCompleteGeneralChannelToOrder()));
				//泛渠道店均甩单数	
				allReport.setAverageGeneralChannelToOrder(checkErrorData(allReport.getAverageGeneralChannelToOrder()));
				//村代触点活跃率
				allReport.setPercentActiveVillege(integerToDecimal(allReport.getCountActiveVillegeChild(), allReport.getCountActiveVillegePar()));
				//乡镇代触点活跃率
				allReport.setPercentActiveTown(integerToDecimal(allReport.getCountActiveTownChild(), allReport.getCountActiveTownPar()));
			}
			
		}
		
		return new PageResult<GeneralChanenlAndBusinessBillReport>(reportReqDto, PageContext.getPageTotal(), businessBillReports);
	}
	
	private String integerToDecimal(Integer var1, Integer var2) {
		DecimalFormat df = new DecimalFormat("0.00");//格式化小数  
		
		if (var2 == null || var2.intValue() <= 0 || var1.intValue() <= 0) {
			return "0%";
		} else {
			double dou = var1.doubleValue()/var2.doubleValue();
			
			return df.format(dou*100)+"%";
		}
	}
	
	
	private Integer checkErrorData(Integer var1) {
		
		if (var1 == null || var1.intValue() <= 0) {
			return 0;
		}
		
		return var1;
	}
}
