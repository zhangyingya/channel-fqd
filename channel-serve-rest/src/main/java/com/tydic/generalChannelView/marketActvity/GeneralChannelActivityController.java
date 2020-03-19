package com.tydic.generalChannelView.marketActvity;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.util.HtmlUtils;

import com.alibaba.fastjson.JSON;
import com.tydic.common.Result;
import com.tydic.common.Result.ResultType;
import com.tydic.common.controller.AbstractController;
import com.tydic.common.page.PageResult;
import com.tydic.common.utils.JsonUtil;
import com.tydic.common.utils.ObjectIsNull;
import com.tydic.generalChannelView.marketActvity.bean.GeneralChannelActivity;
import com.tydic.generalChannelView.marketActvity.service.GeneralChannelActvityService;

@Controller
@RequestMapping(value="generalChannelActivity")
@Slf4j
public class GeneralChannelActivityController extends AbstractController {
	
	@Autowired
	private GeneralChannelActvityService channelActvityService;
	
	@RequestMapping("findAll")
	@ResponseBody
	public PageResult<GeneralChannelActivity> findAll(GeneralChannelActivity channelActivity) {
		log.info("泛渠道与营销活动关系列表请求参数：{}", JsonUtil.objToStr(channelActivity));
		
		PageResult<GeneralChannelActivity> page =  channelActvityService.findAll(channelActivity);
		
		log.info("泛渠道与营销活动关系列表返回结果：{}", JsonUtil.objToStr(page));
		return page;
	}
	
	@RequestMapping("findById")
	@ResponseBody
	public GeneralChannelActivity findById(Long id) {
		log.info("泛渠道与营销活动关系详情请求参数：{}", id);
		
		GeneralChannelActivity channelActivity =  channelActvityService.find(id);
		
		log.info("泛渠道与营销活动关系详情返回结果：{}", JsonUtil.objToStr(channelActivity));
		return channelActivity;
	}
	
	@RequestMapping("batchAdd")
	@ResponseBody
	public Result add(HttpServletRequest request, String jsonStr ) {
		
		
		jsonStr = HtmlUtils.htmlUnescape(jsonStr);
		List<GeneralChannelActivity> channelActivities = JSON.parseArray(jsonStr, GeneralChannelActivity.class);
		if (!ObjectIsNull.check(channelActivities) && channelActivities.size() > 0) {
			setLoginStaff(request, channelActivities.get(0));
			
			for (GeneralChannelActivity generalChannelActivity : channelActivities) {
				generalChannelActivity.setCreateStaff(channelActivities.get(0).getCreateStaff());
			}
			
			log.info("泛渠道与营销活动关系新增请求参数：{}", channelActivities);
			channelActvityService.batchAdd(channelActivities);
			
			return Result.getInstance(ResultType.SUCCESS, "泛渠道与营销活动关系信息保存成功！");
		} else {
			return Result.getInstance(ResultType.FAIL, "请求异常！请求数据为空！");
		}
		
		
	}
	
	@RequestMapping("update")
	@ResponseBody
	public Result update(HttpServletRequest request, @Valid @RequestBody GeneralChannelActivity channelActivity ) {
		log.info("泛渠道与营销活动关系修改请求参数：{}", channelActivity);
		
		channelActvityService.add(channelActivity);
		
		return Result.getInstance(ResultType.SUCCESS, "泛渠道与营销活动关系信息修改成功！");
	}
	
	@RequestMapping("deleteByIds")
	@ResponseBody
	public Result deleteByIds(HttpServletRequest request, String ids) {
		log.info("泛渠道与营销活动关系修改请求参数：{}", ids);
		
		ids = HtmlUtils.htmlUnescape(ids);
		List<Integer> longs = JSON.parseArray(ids, Integer.class);
		
		GeneralChannelActivity channelActivity =new GeneralChannelActivity();
		channelActivity.setIds(longs);
		
		channelActvityService.deleteByIds(channelActivity);
		
		return Result.getInstance(ResultType.SUCCESS, "泛渠道与营销活动关系信息删除成功！");
	}
	
	@RequestMapping("deleteById")
	@ResponseBody
	public Result deleteById(HttpServletRequest request, Long id) {
		log.info("泛渠道与营销活动关系修改请求参数：{}", id);
		
		channelActvityService.deleteById(id);
		
		return Result.getInstance(ResultType.SUCCESS, "泛渠道与营销活动关系信息删除成功！");
	}
}
