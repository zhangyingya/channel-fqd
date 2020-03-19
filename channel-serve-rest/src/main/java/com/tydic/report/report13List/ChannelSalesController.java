package com.tydic.report.report13List;

import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import lombok.extern.slf4j.Slf4j;

import org.apache.commons.io.FileUtils;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tydic.common.SpringContext;
import com.tydic.common.controller.AbstractController;
import com.tydic.common.page.PageResult;
import com.tydic.common.utils.DateUtil;
import com.tydic.report.report13List.bean.ChannelSales;
import com.tydic.report.report13List.service.ChannelSalesService;
import com.tydic.util.ExportExcel;

@RestController
@RequestMapping(value="/channelSales")
@Slf4j
public class ChannelSalesController extends AbstractController {
	
	@Resource
	private ChannelSalesService channelSalesService;

	@RequestMapping("/findChannelSales")
	public PageResult<ChannelSales> findAll(HttpServletRequest request, ChannelSales channelSales) {
		this.setPageInfo(request, channelSales);
		PageResult<ChannelSales> result = channelSalesService.findChannelSales(channelSales);
		return result;
	}
	
	@SuppressWarnings("rawtypes")
	@RequestMapping("/exportChannelSales")
	public ResponseEntity<byte[]> exportChannelSales(HttpServletRequest request, HttpServletResponse response, ChannelSales channelSales) throws UnsupportedEncodingException{
		try {
			List<Map> resultList = channelSalesService.findChannelSalesForExport(channelSales);
			List<Map> headList = new ArrayList<Map>();
			ExportExcel excel = new ExportExcel(response, request);
			this.getExcelHeader(headList);
			
			String fileName = "13月报表销量数据" + channelSales.getMonthId() + ".xlsx";
			//加水印
			File tempFile = new File(SpringContext.getProperty("excelFileTempPath") + "/" + fileName);
			excel.exportExcelToFile(SpringContext.getProperty("excelFileTempPath"), fileName, "销量13月报表导出数据", headList, resultList);
			
			HttpHeaders headers = new HttpHeaders();
		
			headers.add("Content-Disposition", "attachement;filename=" + URLEncoder.encode(fileName, "UTF-8"));
			HttpStatus statusCode = HttpStatus.OK;
			ResponseEntity<byte[]> responseEntity = new ResponseEntity<byte[]>(FileUtils.readFileToByteArray(tempFile), headers, statusCode);
			//删除临时文件
			tempFile.delete();
			return responseEntity;
		} catch (IOException e) {
			log.error("导出13月报表数据失败！");
			e.printStackTrace();
		}
		return null;
	}
	
	
	@SuppressWarnings("rawtypes")
	private void getExcelHeader(List<Map> headList) {
		addHeader("账期", "MONTH_ID", headList);
		addHeader("省", "PROVINCE_NAME", headList);
		addHeader("市", "LATN_NAME", headList);
		addHeader("归属三级网格名称", "AREA_NAME", headList);
		addHeader("归属OBU网格编码", "OBU_ID", headList);
		addHeader("归属OBU网格名称", "OBU_NAME", headList);
		addHeader("归属OBU一级分类", "OBU_TYPE1_NAME", headList);
		addHeader("归属OBU二级分类", "OBU_TYPE2_NAME", headList);
		addHeader("五级划小ID", "FIVE_ID", headList);
		addHeader("五级划小名称", "FIVE_NAME", headList);
		addHeader("渠道单元ID", "CHANNEL_ID", headList);
		addHeader("渠道单元名称", "CHANNEL_NAME", headList);
		addHeader("渠道单元编码", "CHANNEL_NBR", headList);
		addHeader("渠道单元类型", "CHANNEL_CLASS", headList);
		addHeader("一级分类", "CHANNEL_FIRST_TYPE", headList);
		addHeader("二级分类", "CHANNEL_SECOND_TYPE", headList);
		addHeader("三级分类", "CHANNEL_THIRD_TYPE", headList);
		addHeader("新三级分类", "CHANNEL_NEW_THIRD_TYPE", headList);
		addHeader("销售点状态", "STATUS", headList);
		addHeader("渠道单元地址", "CHANNEL_ADDRSS", headList);
		addHeader("渠道单元城乡属性", "CX_ATTR", headList);
		addHeader("自营厅级别", "ZYT_JB", headList);
		addHeader("专营门店类别", "ZYD_LB", headList);
		addHeader("省门店星级", "SMD_XJ", headList);
		addHeader("社区店标识", "SQD_BZ", headList);
		addHeader("是否强商门店", "IF_QS", headList);
		addHeader("厂商渠道形态", "CHANNEL_CSXT", headList);
		addHeader("厂商渠道标识", "CHANNEL_CSBZ", headList);
		addHeader("CRM接入", "CRM_JR", headList);
		addHeader("授权专营店级别", "ZYD_JB", headList);
		addHeader("渠道单元专属属性", "CHANNEL_ZSATTR", headList);
		addHeader("精品渠道标识", "IF_JPQD", headList);
		addHeader("初始合作时间", "CSHZSJ", headList);
		addHeader("是否营维一体化", "IF_YWYT", headList);
		addHeader("是否使用精品渠道终端销售系统", "IF_JINGPIN_SALE", headList);
		addHeader("精品渠道标杆门店", "BIAOGAN_DIAN", headList);
		addHeader("生态合作点标识", "STHZ_DIAN_BZ", headList);
		addHeader("泛渠道业态", "QUDAO_YETAI", headList);
		addHeader("翼支付商户号", "YIZHIFU_SHGHAO", headList);
		addHeader("关联销售员个数", "GUANLIAN_SALESHUL", headList);
		addHeader("渠道单元卖场类型", "CHANNEL_TYPE", headList);
		addHeader("乡镇", "TOWN_NAME", headList);
		addHeader("渠道单元归属类别", "CHANNEL_GSLB", headList);
		addHeader("渠道单元归属类别1", "CHANNEL_GSLB1", headList);
		addHeader("经营场所房产类型", "BUSI_STORE_HOUSE_TYPE", headList);
		addHeader("销售面积", "XS_MJ", headList);
		addHeader("百度地图经度", "BAIDU_JD", headList);
		addHeader("百度地图纬度", "BAIDU_WD", headList);
		addHeader("商圈名称", "BIZ_ZONE_NAME", headList);
		addHeader("商圈编码", "BIZ_ZONE_NBR", headList);
		addHeader("商圈分类", "BIZ_ZONE_TYPE", headList);
		addHeader("商圈级别", "BIZ_ZONE_LEVER", headList);
		addHeader("商圈建立时间", "BIZ_CREATE_DT", headList);
		addHeader("商圈状态", "BIZ_ZONE_STATUS", headList);
		addHeader("经营主体名称", "OPERATORS_NAME", headList);
		addHeader("经营主体编码", "OPERATORS_NBR", headList);
		addHeader("经营主体区域级别", "OPERATORS_AREA_GRADE", headList);
		addHeader("连锁经营主体类型", "OPERATORS_TYPE_CD", headList);
		addHeader("全国连锁经营主体总部名称", "QG_OPERATORS_NAME", headList);
		addHeader("经营主体级别", "OPERATORS_JB", headList);
		addHeader("省经营主体分级", "OPERATORS_SJB", headList);
		addHeader("上级经营主体名称", "PARENT_OPER_NAME", headList);
		addHeader("上级经营主体编码", "PARENT_OPER_NBR", headList);
		addHeader("上级经营主体区域级别", "PARENT_OPER_GRADE", headList);
		addHeader("渠道单元归属渠道CEO编码", "CEOMANAGE_NBR", headList);
		addHeader("渠道单元归属渠道CEO名称", "CHNL_CEO_NAME", headList);
		addHeader("渠道单元归属渠道经理编码", "SALES_CODE", headList);
		addHeader("渠道单元归属渠道经理名称", "STAFF_NAME", headList);
		addHeader("移动当月销量", "YD_MONTH1", headList);
		addHeader("宽带当月销量", "KD_MONTH1", headList);
		addHeader("IPTV当月销量", "IPTV_MONTH1", headList);
		addHeader("移动当月-1月销量", "YD_MONTH2", headList);
		addHeader("宽带当月-1月销量", "KD_MONTH2", headList);
		addHeader("IPTV当月-1月销量", "IPTV_MONTH2", headList);
		addHeader("移动当月-2月销量", "YD_MONTH3", headList);
		addHeader("宽带当月-2月销量", "KD_MONTH3", headList);
		addHeader("IPTV当月-2月销量", "IPTV_MONTH3", headList);
		addHeader("移动当月-3月销量", "YD_MONTH4", headList);
		addHeader("宽带当月-3月销量", "KD_MONTH4", headList);
		addHeader("IPTV当月-3月销量", "IPTV_MONTH4", headList);
		addHeader("移动当月-4月销量", "YD_MONTH5", headList);
		addHeader("宽带当月-4月销量", "KD_MONTH5", headList);
		addHeader("IPTV当月-4月销量", "IPTV_MONTH5", headList);
		addHeader("移动当月-5月销量", "YD_MONTH6", headList);
		addHeader("宽带当月-5月销量", "KD_MONTH6", headList);
		addHeader("IPTV当月-5月销量", "IPTV_MONTH6", headList);
		addHeader("移动当月-6月销量", "YD_MONTH7", headList);
		addHeader("宽带当月-6月销量", "KD_MONTH7", headList);
		addHeader("IPTV当月-6月销量", "IPTV_MONTH7", headList);
		addHeader("移动当月-7月销量", "YD_MONTH8", headList);
		addHeader("宽带当月-7月销量", "KD_MONTH8", headList);
		addHeader("IPTV当月-7月销量", "IPTV_MONTH8", headList);
		addHeader("移动当月-8月销量", "YD_MONTH9", headList);
		addHeader("宽带当月-8月销量", "KD_MONTH9", headList);
		addHeader("IPTV当月-8月销量", "IPTV_MONTH9", headList);
		addHeader("移动当月-9月销量", "YD_MONTH10", headList);
		addHeader("宽带当月-9月销量", "KD_MONTH10", headList);
		addHeader("IPTV当月-9月销量", "IPTV_MONTH10", headList);
		addHeader("移动当月-10月销量", "YD_MONTH11", headList);
		addHeader("宽带当月-10月销量", "KD_MONTH11", headList);
		addHeader("IPTV当月-10月销量", "IPTV_MONTH11", headList);
		addHeader("移动当月-11月销量", "YD_MONTH12", headList);
		addHeader("宽带当月-11月销量", "KD_MONTH12", headList);
		addHeader("IPTV当月-11月销量", "IPTV_MONTH12", headList);
		addHeader("移动当月-12月销量", "YD_MONTH13", headList);
		addHeader("宽带当月-12月销量", "KD_MONTH13", headList);
		addHeader("IPTV当月-12月销量", "IPTV_MONTH13", headList);
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public void addHeader(String title,String name,List<Map> headList){
		Map comMap = new LinkedHashMap();
		comMap.put("title", title);
		comMap.put("name", name);
		headList.add(comMap);
	}
}
