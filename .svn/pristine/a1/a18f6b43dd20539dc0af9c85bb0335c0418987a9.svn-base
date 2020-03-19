package com.tydic.generalChannelView.generalChannel;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.collections4.map.HashedMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.util.HtmlUtils;

import com.alibaba.fastjson.JSON;
import com.tydic.common.Result;
import com.tydic.common.Result.ResultType;
import com.tydic.common.SpringContext;
import com.tydic.common.controller.AbstractController;
import com.tydic.common.page.PageResult;
import com.tydic.common.utils.JsonUtil;
import com.tydic.common.utils.ObjectIsNull;
import com.tydic.generalChannelView.app.bean.AppCommonRegionReqDto;
import com.tydic.generalChannelView.app.bean.AppCommonRegionResDto;
import com.tydic.generalChannelView.app.service.AppCommonRegionService;
import com.tydic.generalChannelView.generalChannel.bean.GeneralChannel;
import com.tydic.generalChannelView.generalChannel.bean.GeneralChannelVillage;
import com.tydic.generalChannelView.generalChannel.service.GeneralChannelService;
import com.tydic.sso.bean.SystemUserDetail;

import lombok.extern.slf4j.Slf4j;

/**
 * 泛渠道管理
 * @author Administrator
 *
 */

@Controller
@RequestMapping(value = "/generalChannel")
@Slf4j
public class GeneralChannelController extends AbstractController {
	
	@Autowired
	private GeneralChannelService generalChannelService;
	
	@Autowired
	private AppCommonRegionService appCommonRegionService;
	
	@RequestMapping("/findAll")
	@ResponseBody
	public PageResult<GeneralChannel> findAll(HttpServletRequest request, GeneralChannel generalChannel) {
		setPageInfo(request, generalChannel);
		SystemUserDetail userDetail = getLoginUserInfo(request);
		generalChannel.setLoginSysUserCode(userDetail.getAuthSystemUser().getSysUserCode());
		generalChannel.setSysRoleIds(findRoleIds(userDetail.getAuthSystemUser().getSysUserId()));
		
		return generalChannelService.findAll(generalChannel);
	}
	
	/**
	 * 查询乡镇集合
	 * @param request
	 * @param generalChannelVillage
	 * @return
	 */
	@RequestMapping("/findTownNames")
	@ResponseBody
	public PageResult<GeneralChannelVillage> findTownNames(HttpServletRequest request, GeneralChannelVillage generalChannelVillage) {
		setPageInfo(request, generalChannelVillage);
		
		return generalChannelService.findTownNames(generalChannelVillage);
	}
	
	/**
	 * 查询城乡集合
	 * @param request
	 * @param generalChannelVillage
	 * @return
	 */
	@RequestMapping("/findVillageNames")
	@ResponseBody
	public PageResult<GeneralChannelVillage> findVillageNames(HttpServletRequest request, GeneralChannelVillage generalChannelVillage) {
		setPageInfo(request, generalChannelVillage);
		
		return generalChannelService.findVillageNames(generalChannelVillage);
	}
	
	@RequestMapping("/findById")
	@ResponseBody
	public GeneralChannel findById(Long id) {
		GeneralChannel generalChannel = generalChannelService.find(id);
		String qrcodeUrl = "";
		String serverUrl = "";
		
		if ("1".equals(generalChannel.getIfOld())) {
			serverUrl = SpringContext.getProperty("general.channel.qrcode.old.url");
		} else {
			serverUrl = SpringContext.getProperty("general.channel.qrcode.new.url");
		}
		
		if (!ObjectIsNull.check(serverUrl)) {
			qrcodeUrl = serverUrl + String.valueOf(id) ;
			generalChannel.setQrcodeUrl(qrcodeUrl);
		} else {
			log.error("配置文件读取二维码地址失败");
		}
		
		log.info("泛渠道详情：{}", JsonUtil.objToStr(generalChannel));
		
		
		return generalChannel;
	}
	
	@RequestMapping(value="add")
	@ResponseBody
	public Result add(HttpServletRequest request, @Validated @RequestBody GeneralChannel generalChannel) {
		//SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		setLoginStaff(request, generalChannel);
		
		/*try {
			generalChannel.setBeginDate(sdf.parse(generalChannel.getBeginDateStr()));
			generalChannel.setEndDate(sdf.parse(generalChannel.getEndDateStr()));
		} catch (ParseException e) {
			log.error(generalChannel.getBeginDateStr() + "," + generalChannel.getEndDateStr() + "转date类型失败", e.getMessage());
		}*/
		
		log.info("泛渠道新增： {}", JsonUtil.objToStr(generalChannel));
		
		generalChannelService.add(generalChannel);
		 
		return Result.getInstance(ResultType.SUCCESS, "新增泛渠道信息成功！");
	}
	
	@RequestMapping("/update")
	@ResponseBody
	public Result update(HttpServletRequest request, @Validated @RequestBody GeneralChannel generalChannel) {
		//SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		setLoginStaff(request, generalChannel);
		
		/*try {
			generalChannel.setBeginDate(sdf.parse(generalChannel.getBeginDateStr()));
			generalChannel.setEndDate(sdf.parse(generalChannel.getEndDateStr()));
		} catch (ParseException e) {
			log.error(generalChannel.getBeginDateStr() + "," + generalChannel.getEndDateStr() + "转date类型失败", e.getMessage());
		}*/
		
		log.info("泛渠道修改： {}", JsonUtil.objToStr(generalChannel));
		
		generalChannelService.edit(generalChannel);
		return Result.getInstance(ResultType.SUCCESS, "修改泛渠道信息成功！");
	}
	
	@RequestMapping("/getGeneralChannelCode")
	@ResponseBody
	public Map<String, Object> getGeneralChannelCode(String channelNbr) {
		Map<String, Object> map = new HashedMap<String, Object>();
		String code = generalChannelService.getGeneralChannelCode(channelNbr);
		
		map.put("code", code);
		
		return map;
	}
	
	@RequestMapping("/isExistTelePhone")
	@ResponseBody
	public Map<String, Object> isExistTelePhone(String phone) {
		Map<String, Object> map = new HashedMap<String, Object>();
		
		map.put("isExist", generalChannelService.isExistTelePhone(phone));
		
		return map;
	}
	
	@RequestMapping("/deleteByIds")
	@ResponseBody
	public Result deleteByIds(HttpServletRequest request, String ids) {
		ids = HtmlUtils.htmlUnescape(ids);
		List<Integer> longs = JSON.parseArray(ids, Integer.class);
		
		GeneralChannel generalChannel = new GeneralChannel();
		
		generalChannel.setIds(longs);
		setLoginStaff(request, generalChannel);
		
		log.info("泛渠道删除： {}", JsonUtil.objToStr(generalChannel));
		
		generalChannelService.deleteByIds(generalChannel);
		return Result.getInstance(ResultType.SUCCESS, "删除泛渠道信息成功！");
	}
	
	/**
	 * 泛渠道本地网权限查询和app逻辑一致
	 * @param request
	 * @return
	 */
	@RequestMapping("/findLatnList")
	@ResponseBody
	public Map<String, Object> findLatnList(HttpServletRequest request) {
		Map<String, Object> result = new HashMap<>();
		List<Map<String, Object>> mapList = new ArrayList<Map<String, Object>>();
		
		SystemUserDetail userDetail = getLoginUserInfo(request);
		
		AppCommonRegionReqDto appCommonRegionReqDto = new AppCommonRegionReqDto();
		appCommonRegionReqDto.setLoginSysUserCode(userDetail.getAuthSystemUser().getSysUserCode());
		appCommonRegionReqDto.setSystemRoleIds(findRoleIds(userDetail.getAuthSystemUser().getSysUserId()));
		
		List<AppCommonRegionResDto> resDtos = appCommonRegionService.findLatnList(appCommonRegionReqDto).getData();
		
		for (AppCommonRegionResDto resDto : resDtos) {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("code", resDto.getRegionId());
			map.put("name", resDto.getRegionName());
			
			mapList.add(map);
		}
		
		result.put("commonRegions", mapList);
		return result;
	}
	
	/**
	 * 泛渠道区县权限查询和app逻辑一致
	 * @param request
	 * @return
	 */
	@RequestMapping("/findRegionList")
	@ResponseBody
	public Map<String, Object> findRegionList(HttpServletRequest request, Long parRegionId) {
		Map<String, Object> result = new HashMap<>();
		List<Map<String, Object>> mapList = new ArrayList<Map<String, Object>>();
		SystemUserDetail userDetail = getLoginUserInfo(request);
		AppCommonRegionReqDto appCommonRegionReqDto = new AppCommonRegionReqDto();
		appCommonRegionReqDto.setLoginSysUserCode(userDetail.getAuthSystemUser().getSysUserCode());
		appCommonRegionReqDto.setSystemRoleIds(findRoleIds(userDetail.getAuthSystemUser().getSysUserId()));
		appCommonRegionReqDto.setLatnId(String.valueOf(parRegionId));
		
		List<AppCommonRegionResDto> resDtos = appCommonRegionService.findRegionList(appCommonRegionReqDto).getData();
		for (AppCommonRegionResDto resDto : resDtos) {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("code", resDto.getRegionId());
			map.put("name", resDto.getRegionName());
			
			mapList.add(map);
		}
		
		result.put("commonRegions", mapList);
		return result;
	}
}
