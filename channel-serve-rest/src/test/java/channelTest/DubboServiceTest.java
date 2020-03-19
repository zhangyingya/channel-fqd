package channelTest;


import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.alibaba.dubbo.config.ApplicationConfig;
import com.alibaba.dubbo.config.ReferenceConfig;
import com.alibaba.dubbo.config.RegistryConfig;
import com.tydic.channelview.channel.bean.ChannelBean;
import com.tydic.channelview.channel.bean.QueryChannelReqDto;
import com.tydic.channelview.staff.bean.StaffBean;
import com.tydic.common.bean.Result;
import com.tydic.common.utils.JsonUtil;
import com.tydic.esmp.systemRole.bean.SystemRole;
import com.tydic.esmp.systemRole.service.SystemRoleService;
import com.tydic.generalChannelView.app.AppResult;
import com.tydic.generalChannelView.app.bean.AppBusinessBillUpdateReqDto;
import com.tydic.generalChannelView.app.bean.AppCommonRegionReqDto;
import com.tydic.generalChannelView.app.bean.AppCommonRegionResDto;
import com.tydic.generalChannelView.app.service.AppBusinessBillService;
import com.tydic.generalChannelView.app.service.AppChannelService;
import com.tydic.generalChannelView.app.service.AppCommonRegionService;
import com.tydic.generalChannelView.app.service.AppGeneralChannelService;
import com.tydic.generalChannelView.business.bean.BusinessBillReqDto;
import com.tydic.generalChannelView.business.bean.QueryBusinessBillReqDto;
import com.tydic.generalChannelView.business.service.BusinessBillService;
import com.tydic.generalChannelView.generalChannel.bean.QueryGeneralChannelDetailReqDto;
import com.tydic.generalChannelView.generalChannel.bean.QueryGeneralChannelDetailResDto;
import com.tydic.generalChannelView.generalChannel.service.GeneralChannelService;
import com.tydic.generalChannelView.generalChannel.service.VisualizationAnalysisService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class DubboServiceTest {
	
	
	public static void main(String[] args) {
		Map<String, Object> map=new HashMap<String,Object>();
		map.put("startDateStr", "2018-09-28 17:19:00");
		map.put("endDateStr", "2018-10-18 17:41:00");
		findAllChannelAmounts( map);
		
		//findBusinessOpportunityAmountsByEveryday();
		//findGeneralChannelAmountsByEveryday();
		//selectRangePriv11();
		
		//findGnerealChannel();
	}
	/**测试：133.64.172.14:22181
	 * province.role.id=433824
#全省-市级泛渠道角色
city.role.id=10391
#全省-普通泛渠道角色
county.role.id=10392
	 */
	
	
	private static void selectRangePriv11() {
		//List<SystemRole> systemRoles = systemRoleService.findAllBySysUserId(sysUserId);
		ApplicationConfig appConfig=new ApplicationConfig("Test");
		RegistryConfig reg=new RegistryConfig("zookeeper://133.64.172.14:22184");
	
		ReferenceConfig<SystemRoleService> referenceConfig=new ReferenceConfig<SystemRoleService>();
		referenceConfig.setApplication(appConfig);
		referenceConfig.setRegistry(reg);
		referenceConfig.setInterface(SystemRoleService.class);
		
		SystemRoleService systemRoleService = referenceConfig.get();
		
		List<SystemRole> systemRoles = systemRoleService.findAllBySysUserId(935648946L);
		
		System.out.println("泛渠道-查询本地网：{}"+JsonUtil.objToStr(systemRoles));
		
		
	}
	
	private static void selectRangePriv() {
		ApplicationConfig appConfig=new ApplicationConfig("Test");
		RegistryConfig reg=new RegistryConfig("zookeeper://133.64.172.14:22184");
	
		ReferenceConfig<AppCommonRegionService> referenceConfig=new ReferenceConfig<AppCommonRegionService>();
		referenceConfig.setApplication(appConfig);
		referenceConfig.setRegistry(reg);
		referenceConfig.setInterface(AppCommonRegionService.class);
		
		AppCommonRegionService commonRegionService = referenceConfig.get();
		
		AppCommonRegionReqDto  reqDto = new AppCommonRegionReqDto();
		{
			String[] roleIds = {"10392","",""}; 
			reqDto.setLoginSysUserCode("huangtp");
			reqDto.setLatnId("290");
			reqDto.setSystemRoleIds(Arrays.asList(roleIds));
		}
		
		AppResult<List<AppCommonRegionResDto>> result = commonRegionService.findLatnList(reqDto);
		
		log.info("泛渠道-查询本地网：{}", JsonUtil.objToStr(result));
		
		AppResult<List<AppCommonRegionResDto>> result1 = commonRegionService.findRegionList(reqDto);
		
		log.info("泛渠道-查询区县：{}", JsonUtil.objToStr(result1));
	}
	
	private static void updateBusinessBill() {
		ApplicationConfig appConfig=new ApplicationConfig("Test");
		RegistryConfig reg=new RegistryConfig("zookeeper://127.0.0.1:2181");
	
		ReferenceConfig<AppBusinessBillService> referenceConfig=new ReferenceConfig<AppBusinessBillService>();
		referenceConfig.setApplication(appConfig);
		referenceConfig.setRegistry(reg);
		referenceConfig.setInterface(AppBusinessBillService.class);
		
		AppBusinessBillService businessBillService = referenceConfig.get();
		
		AppBusinessBillUpdateReqDto  reqDto = new AppBusinessBillUpdateReqDto();
		{
			reqDto.setLoginSysUserCode("huangtp");
			reqDto.setId(218);
			reqDto.setStatusCd("20");
		}
		
		AppResult<Boolean> result = businessBillService.update(reqDto);
		
		log.info(JsonUtil.objToStr(result));
	}
	
	private static void findAllAppBusinee() {
		ApplicationConfig appConfig=new ApplicationConfig("Test");
		RegistryConfig reg=new RegistryConfig("zookeeper://127.0.0.1:2181");
	
		ReferenceConfig<AppBusinessBillService> referenceConfig=new ReferenceConfig<AppBusinessBillService>();
		referenceConfig.setApplication(appConfig);
		referenceConfig.setRegistry(reg);
		referenceConfig.setInterface(AppBusinessBillService.class);
		
		AppBusinessBillService appBusinessBillService = referenceConfig.get();
		/**
	{"id":"84","customerName":"","customerPhone":"","customerAddr":null,"generalChannelName":"","generalChannelCode":null,
	"channelName":"","channelNbr":null,"commonRegionId":null,"pageSize":"5","curPage":"1",
	"statusCd":"30","businessBillType":"","loginSysUserCode":"919158000","sysRoleIds":["100002227","10215","100002209","100002090","10204","10201","10206","100002039","100002071","100002068","10233","10253","10258","10256","10210","10262","10211","10263","10264","10212","10265","10213","10222"]}

{"id":"","customerName":"","customerPhone":"","customerAddr":null,"generalChannelName":"",
"generalChannelCode":null,"channelName":"","channelNbr":null,"commonRegionId":null,"pageSize":"5",
"curPage":"1","statusCd":"20","businessBillType":"","loginSysUserCode":"919158000","sysRoleIds":["100002226","10222","10213","10265","10212","10264","10263","10211","10262","10210","10256","10258","10253","10233","100002068","100002071","100002039","10206","10201","10204","100002090","100002209","10215"]}


		 */
		QueryBusinessBillReqDto reqDto = new QueryBusinessBillReqDto();
		//reqDto.setId("84");
		reqDto.setStatusCd("20");
		reqDto.setBusinessBillType("");
		reqDto.setPageSize("5");
		reqDto.setCurPage("1");
		reqDto.setLoginSysUserCode("919158000");
		String[] roleIds = {"10391","10215","100002209","100002090","10204","10201","10206","100002039","100002071","100002068","10233","10253","10258","10256","10210","10262","10211","10263","10264","10212","10265","10213","10222"}; 
		reqDto.setSysRoleIds(Arrays.asList(roleIds));
		log.info("================================"+JsonUtil.objToStr(appBusinessBillService.findAll(reqDto)));
	}
	
	private static void findAllAppChannel() {
		ApplicationConfig appConfig=new ApplicationConfig("Test");
		RegistryConfig reg=new RegistryConfig("zookeeper://127.0.0.1:2181");
	
		ReferenceConfig<AppGeneralChannelService> referenceConfig=new ReferenceConfig<AppGeneralChannelService>();
		referenceConfig.setApplication(appConfig);
		referenceConfig.setRegistry(reg);
		referenceConfig.setInterface(AppGeneralChannelService.class);
		
		AppGeneralChannelService appChannelService = referenceConfig.get();
		
		StaffBean reqDto = new StaffBean();
		{
			reqDto.setChannelId(45029895L);
			reqDto.setPageNo(1);
			reqDto.setPageSize(10);
		}
		
		Result<List<StaffBean>> result = null;//appChannelService.queryStaffByParam(reqDto);
		
		log.info(JsonUtil.objToStr(result));
	}
	
	private static void findAllChannel() {
		ApplicationConfig appConfig=new ApplicationConfig("Test");
		RegistryConfig reg=new RegistryConfig("zookeeper://127.0.0.1:2181");
	
		ReferenceConfig<AppChannelService> referenceConfig=new ReferenceConfig<AppChannelService>();
		referenceConfig.setApplication(appConfig);
		referenceConfig.setRegistry(reg);
		referenceConfig.setInterface(AppChannelService.class);
		
		AppChannelService appChannelService = referenceConfig.get();
		
		QueryChannelReqDto reqDto = new QueryChannelReqDto();
		{
			reqDto.setCurPage("1");
			reqDto.setPageSize("10");
			reqDto.setLatnId("290");
			reqDto.setLoginSysUserCode("290");
		}
		
		Result<List<ChannelBean>> result = null;//appChannelService.findAll(reqDto);
		
		log.info(JsonUtil.objToStr(result));
	}
	
	private static void insertBusinessBill() {
		ApplicationConfig appConfig=new ApplicationConfig("Test");
		RegistryConfig reg=new RegistryConfig("zookeeper://133.64.87.246:12181");
	//133.64.87.244:12181,133.64.87.245:12181,133.64.87.246:12181

		ReferenceConfig<BusinessBillService> referenceConfig=new ReferenceConfig<BusinessBillService>();
		referenceConfig.setApplication(appConfig);
		referenceConfig.setRegistry(reg);
		referenceConfig.setInterface(BusinessBillService.class);
		
		BusinessBillService businessBillService = referenceConfig.get();
		
		BusinessBillReqDto businessBillReqDto = new BusinessBillReqDto();
		{
			businessBillReqDto.setCustomerName("李四");
			businessBillReqDto.setCustomerAddr("咸阳区");
			businessBillReqDto.setCustomerPhone("13774422788");
			businessBillReqDto.setCustomerRemark("测试");
			businessBillReqDto.setGeneralChannelId("82");
			businessBillReqDto.setBusinessBillType("10");
		}
		
		Result<Boolean> result = businessBillService.add(businessBillReqDto);
		
		log.info(JsonUtil.objToStr(result));
		
		/*QueryBusinessBillReqDto billReqDto = new QueryBusinessBillReqDto();
		billReqDto.setCurPage("1");
		billReqDto.setPageSize("10");*/
		
		//Result<List<QueryBusinessBillResDto>> result2 = businessBillService.findAll(billReqDto);
		//log.info(JsonUtil.objToStr(result2));
		
	}
	
	private static void findGnerealChannel() {
		ApplicationConfig appConfig=new ApplicationConfig("Test");
		RegistryConfig reg=new RegistryConfig("zookeeper://133.64.172.14:22181");
	
		ReferenceConfig<GeneralChannelService> referenceConfig=new ReferenceConfig<GeneralChannelService>();
		referenceConfig.setApplication(appConfig);
		referenceConfig.setRegistry(reg);
		referenceConfig.setInterface(GeneralChannelService.class);
		
		GeneralChannelService generalChannelService = referenceConfig.get();
		
		QueryGeneralChannelDetailReqDto detailReqDto = new QueryGeneralChannelDetailReqDto();
		{
			detailReqDto.setId("27404");
		}
		
		AppResult<QueryGeneralChannelDetailResDto> result = generalChannelService.findById(detailReqDto);
		
		log.info(JsonUtil.objToStr(result));
	}
	
	private static void findAllBusinessOpportunityList(Map<String, Object> map) {
		ApplicationConfig appConfig =new ApplicationConfig("Test");
		RegistryConfig reg=new RegistryConfig("zookeeper://127.0.0.1:2181");
		ReferenceConfig<VisualizationAnalysisService> referenceConfig =new ReferenceConfig<VisualizationAnalysisService>();
		referenceConfig.setApplication(appConfig);
		referenceConfig.setRegistry(reg);
		referenceConfig.setInterface(VisualizationAnalysisService.class);
		VisualizationAnalysisService generalChannelStatisticalAnalysisService = referenceConfig.get();
		List<Map<String, Object>> findAllBusinessOpportunityList = generalChannelStatisticalAnalysisService.findAllBusinessOpportunityList(map);
		
		log.info(JsonUtil.objToStr(findAllBusinessOpportunityList));		
		
	}
	
	private static void findAllChannelAmounts(Map<String, Object> map) {
		ApplicationConfig appConfig =new ApplicationConfig("Test");
		RegistryConfig reg=new RegistryConfig("zookeeper://127.0.0.1:2181");
		ReferenceConfig<VisualizationAnalysisService> referenceConfig =new ReferenceConfig<VisualizationAnalysisService>();
		referenceConfig.setApplication(appConfig);
		referenceConfig.setRegistry(reg);
		referenceConfig.setInterface(VisualizationAnalysisService.class);
		VisualizationAnalysisService visualizationAnalysisService = referenceConfig.get();
		List<Map<String, Object>> findAllChannelAccounts = visualizationAnalysisService.findAllChannelAmounts(map);
		
		log.info(JsonUtil.objToStr(findAllChannelAccounts));		
		
	}
	
	private static void findGeneralChannelAmountsByEveryday() {
		ApplicationConfig appConfig =new ApplicationConfig("Test");
		RegistryConfig reg=new RegistryConfig("zookeeper://127.0.0.1:2181");
		ReferenceConfig<VisualizationAnalysisService> referenceConfig =new ReferenceConfig<VisualizationAnalysisService>();
		referenceConfig.setApplication(appConfig);
		referenceConfig.setRegistry(reg);
		referenceConfig.setInterface(VisualizationAnalysisService.class);
		VisualizationAnalysisService visualizationAnalysisService = referenceConfig.get();
		List<Map<String, Object>> findGeneralChannelAmountsByEveryday = visualizationAnalysisService.findGeneralChannelAmountsByEveryday();
		
		log.info(JsonUtil.objToStr(findGeneralChannelAmountsByEveryday));		
		
	}
	
	private static void findBusinessOpportunityAmountsByEveryday() {
		ApplicationConfig appConfig =new ApplicationConfig("Test");
		RegistryConfig reg=new RegistryConfig("zookeeper://127.0.0.1:2181");
		ReferenceConfig<VisualizationAnalysisService> referenceConfig =new ReferenceConfig<VisualizationAnalysisService>();
		referenceConfig.setApplication(appConfig);
		referenceConfig.setRegistry(reg);
		referenceConfig.setInterface(VisualizationAnalysisService.class);
		VisualizationAnalysisService visualizationAnalysisService = referenceConfig.get();
		List<Map<String, Object>> findBusinessOpportunityAmountsByEveryday = visualizationAnalysisService.findBusinessOpportunityAmountsByEveryday();
		
		log.info(JsonUtil.objToStr(findBusinessOpportunityAmountsByEveryday));		
		
	}
	
	
}
