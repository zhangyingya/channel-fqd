package com.tydic.common.controller;

import java.io.File;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tydic.common.SpringContext;
import com.tydic.common.utils.DateUtil;
import com.tydic.common.utils.ObjectIsNull;
import com.tydic.generalChannelView.report.bean.BusinessBillReport;
import com.tydic.generalChannelView.report.bean.GeneralChannelReport;
import com.tydic.generalChannelView.report.bean.ReportReqDto;
import com.tydic.generalChannelView.report.service.GeneralReportService;
import com.tydic.sso.bean.SystemUserDetail;
import com.tydic.util.ExportExcel;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping(value="/file")
@Slf4j
public class FileController  extends AbstractController {
	
	@Autowired
	private GeneralReportService generalReportService;
	
	@SuppressWarnings("rawtypes")
	@RequestMapping("/export")
	public ResponseEntity<byte[]> export(ReportReqDto reportReqDto, HttpServletRequest request, HttpServletResponse response){
		try {
			
			List<Map> contentList = getExportContent(reportReqDto, request);
			List<Map> headList = new ArrayList<Map>();
			
			ExportExcel excel = new ExportExcel(response, request);
			this.getExcelHeader(headList, reportReqDto.getExportType());
			
			String fileName = getExportFileName(reportReqDto.getExportType()) + DateUtil.format(new Date(), "yyyy-MM-dd") + ".xlsx";
			excel.exportExcelToFile(SpringContext.getProperty("excelFileTempPath"),fileName, null, headList, contentList);
			File tempFile = new File(SpringContext.getProperty("excelFileTempPath")+"/"+fileName);
			
			HttpHeaders headers = new HttpHeaders();
			headers.add("Content-Disposition", "attachment;filename="+URLEncoder.encode(fileName,"UTF-8"));
			HttpStatus statusCode = HttpStatus.OK;
			ResponseEntity<byte[]> responseEntity = new ResponseEntity<byte[]>(FileUtils.readFileToByteArray(tempFile), headers, statusCode);
			// 删除临时文件
			tempFile.delete();
			
			return responseEntity;
		} catch (Exception e) {
			log.error("导出文件失败"+e.getMessage(), e);
		}
		return null;
	}
	
	@SuppressWarnings("rawtypes")
	private List<Map> getExportContent(ReportReqDto reportReqDto, HttpServletRequest request) {
		List<Map> resultMap = new ArrayList<Map>();
		SystemUserDetail userDetail = getLoginUserInfo(request);
		reportReqDto.setLoginSysUserCode(userDetail.getAuthSystemUser().getSysUserCode());
		reportReqDto.setSysRoleIds(findRoleIds(userDetail.getAuthSystemUser().getSysUserId()));
		
		//泛渠道商户清单
		if ("generalChannelReport".equals(reportReqDto.getExportType())) {
			List<GeneralChannelReport> generalChannelReports = generalReportService.findGeneralChannelReport(reportReqDto).getResult();
			
			if (!ObjectIsNull.check(generalChannelReports) && generalChannelReports.size() > 0) {
				for(GeneralChannelReport generalChannelReport : generalChannelReports) {
					Map<String,Object> map = new HashMap<String,Object>();
					{
						map.put("latnName", generalChannelReport.getLatnName());
						map.put("regionName", generalChannelReport.getRegionName());
						
						map.put("generalChannelName", generalChannelReport.getGeneralChannelName());
						map.put("generalChannelCode", generalChannelReport.getGeneralChannelCode());
						
						map.put("firstFormatName", generalChannelReport.getFirstFormatName());
						map.put("secondFormatName", generalChannelReport.getSecondFormatName());
						
						map.put("specializedTeamsName", generalChannelReport.getSpecializedTeamsName());
						
						
						String ifShopName = "";
						if ("1".equals(generalChannelReport.getIfShop())) {
							ifShopName = "是";
						} else if ("0".equals(generalChannelReport.getIfShop())) {
							ifShopName = "否";
	                	}
						
						map.put("ifShop", ifShopName);
						map.put("shopCode", generalChannelReport.getShopCode());
						
						map.put("generalChannelAddr", generalChannelReport.getGeneralChannelAddr());
						map.put("generalChannelPhone", generalChannelReport.getGeneralChannelPhone());
						
						String statusName = "";
			            if ("10".equals(generalChannelReport.getStatusCd())) {
			            	statusName = "未生效";
						} else if ("20".equals(generalChannelReport.getStatusCd())) {
							statusName = "在用";
	                	} else if ("30".equals(generalChannelReport.getStatusCd())) {
	                		statusName = "冻结";
	                	} else if ("40".equals(generalChannelReport.getStatusCd())) {
	                		statusName = "失效";
	                	}
						map.put("statusCd", statusName);
						map.put("channelName", generalChannelReport.getChannelName());
						
						map.put("channelNbr", generalChannelReport.getChannelNbr());
						map.put("staffName", generalChannelReport.getStaffName());
						
						map.put("createStaffName", generalChannelReport.getCreateStaffName());
						map.put("createDate", DateUtil.format(generalChannelReport.getCreateDate(), "yyyy-MM-dd HH:mm:ss"));
						
						map.put("townName", generalChannelReport.getTownName());
						map.put("villageName", generalChannelReport.getVillageName());
					}
					resultMap.add(map);
				}
			}
			
			return resultMap;
		}
		
		//商机单列表
		if ("businessBillReport".equals(reportReqDto.getExportType())) {
			List<BusinessBillReport> businessBillReports = generalReportService.findBusinessBillReport(reportReqDto).getResult();
			
			if (!ObjectIsNull.check(businessBillReports) && businessBillReports.size() > 0) {
				for(BusinessBillReport businessBillReport : businessBillReports) {
					Map<String,Object> map = new HashMap<String,Object>();
					{
						map.put("latnName", businessBillReport.getLatnName());
						map.put("regionName", businessBillReport.getRegionName());
						
						map.put("townName", businessBillReport.getTownName());
						map.put("villageName", businessBillReport.getVillageName());
			            
			            map.put("id", businessBillReport.getId());
						map.put("generalChannelName", businessBillReport.getGeneralChannelName());
						
						map.put("generalChannelCode", businessBillReport.getGeneralChannelCode());
						map.put("shopCode", businessBillReport.getShopCode());
						
						map.put("customerName", businessBillReport.getCustomerName());
						map.put("customerPhone", businessBillReport.getCustomerPhone());
						
						String businessBillTypeName = "其他业务";
			            if ("10".equals(businessBillReport.getBusinessBillType())) {
			            	businessBillTypeName = "手机业务";
						} else if ("20".equals(businessBillReport.getBusinessBillType())) {
							businessBillTypeName = "宽带业务";
	                	}
						map.put("businessBillType", businessBillTypeName);
						
						map.put("customerRemark", businessBillReport.getCustomerRemark());
						map.put("createDate", DateUtil.format(businessBillReport.getCreateDate(), "yyyy-MM-dd HH:mm:ss"));
						
						String statusName = "";
			            if ("10".equals(businessBillReport.getStatusCd())) {
			            	statusName = "未处理";
						} else if ("20".equals(businessBillReport.getStatusCd())) {
							statusName = "受理成功";
	                	} else if ("30".equals(businessBillReport.getStatusCd())) {
	                		statusName = "用户拒绝";
	                	}
						map.put("statusCd", statusName);
						map.put("customerRejectReason", businessBillReport.getCustomerRejectReason());
						
						map.put("channelName", businessBillReport.getChannelName());
						map.put("channelNbr", businessBillReport.getChannelNbr());
						
						map.put("specializedTeamsName", businessBillReport.getSpecializedTeamsName());
						
						map.put("orderCompleteDate",DateUtil.format(businessBillReport.getOrderCompleteDate(), "yyyy-MM-dd HH:mm:ss"));
						
						map.put("orderStaffName",businessBillReport.getOrderStaffName());
						map.put("orderOfferNameArr", businessBillReport.getOrderOfferNameArr());
						map.put("orderCreateDate", DateUtil.format(businessBillReport.getOrderCreateDate(), "yyyy-MM-dd HH:mm:ss"));
						
						
					}
					resultMap.add(map);
				}
			}
			
			return resultMap;
		}
		
		return null;
	}
	
	private String getExportFileName(String exportType) {
		if ("generalChannelReport".equals(exportType)) {
			return "泛渠道商户清单";
		}
		
		if ("businessBillReport".equals(exportType)) {
			return "商机单统计清单";
		}
		
		return "";
	}
	
	@SuppressWarnings("rawtypes")
	private void getExcelHeader(List<Map> headList, String exportType) {
		if ("generalChannelReport".equals(exportType)) {
			addHeader("所属市","latnName",headList);
			addHeader("所属区县", "regionName", headList);
			addHeader("泛渠道单元名称", "generalChannelName", headList);
			addHeader("泛渠道单元编码", "generalChannelCode", headList);
			addHeader("泛渠道一级分类", "firstFormatName", headList);
			addHeader("泛渠道二级分类", "secondFormatName", headList);
			addHeader("专业团队", "specializedTeamsName", headList);
			
			addHeader("是否翼支付商户","ifShop",headList);
			addHeader("商户编码", "shopCode", headList);
			addHeader("泛渠道地址", "generalChannelAddr", headList);
			addHeader("联系电话", "generalChannelPhone", headList);
			addHeader("状态", "statusCd", headList);
			addHeader("结对厅店名称", "channelName", headList);
			
			addHeader("结对厅店编码","channelNbr",headList);
			addHeader("对厅店管控人员", "staffName", headList);
			
			addHeader("创建人", "createStaffName", headList);
			addHeader("创建时间", "createDate", headList);
			addHeader("所在乡镇", "townName", headList);
			addHeader("所在行政村", "villageName", headList);
		}
		
		if ("businessBillReport".equals(exportType)) {
			addHeader("所属市", "latnName",headList);
			addHeader("所属区县", "regionName", headList);
			addHeader("所在乡镇", "townName", headList);
			addHeader("所在行政村", "villageName", headList);
			addHeader("商机单编号", "id", headList);
			addHeader("泛渠道名称", "generalChannelName", headList);
			
			addHeader("泛渠道编码", "generalChannelCode",headList);
			addHeader("翼支付商户编码", "shopCode",headList);
			
			addHeader("商机联系人", "customerName", headList);
			addHeader("商机联系电话", "customerPhone", headList);
			addHeader("商机产品", "businessBillType", headList);
			addHeader("联系地址", "customerRemark", headList);
			addHeader("商机生成时间", "createDate", headList);
			
			addHeader("商机单单状态", "statusCd", headList);
			addHeader("用户拒绝原因", "customerRejectReason", headList);
			addHeader("结对渠道名称", "channelName", headList);
			addHeader("结对渠道编码", "channelNbr", headList);
			addHeader("专业团队", "specializedTeamsName", headList);
			addHeader("订单转化时间","orderCreateDate",headList);
			addHeader("竣工业务套餐名称","orderOfferNameArr",headList);
			addHeader("受理业务员工","orderStaffName",headList);
			addHeader("CRM竣工时间","orderCompleteDate",headList);
			
		}
	}
	
	@SuppressWarnings("rawtypes")
	public void addHeader(String title,String name,List<Map> headList){
		Map<String, Object> comMap = new LinkedHashMap<String, Object>();
		comMap.put("title", title);
		comMap.put("name", name);
		headList.add(comMap);
	}
	
}
