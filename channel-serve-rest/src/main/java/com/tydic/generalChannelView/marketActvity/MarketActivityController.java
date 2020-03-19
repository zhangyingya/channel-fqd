package com.tydic.generalChannelView.marketActvity;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import lombok.extern.slf4j.Slf4j;

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
import com.tydic.common.controller.AbstractController;
import com.tydic.common.page.PageResult;
import com.tydic.common.utils.JsonUtil;
import com.tydic.generalChannelView.marketActvity.bean.MarketActvity;
import com.tydic.generalChannelView.marketActvity.service.MarketActvityService;

@Controller
@RequestMapping(value="/marketActvity")
@Slf4j
public class MarketActivityController extends AbstractController {
	
	@Autowired
	private MarketActvityService marketActvityService;
	
	@RequestMapping("findAll")
	@ResponseBody
	public PageResult<MarketActvity> findAll(HttpServletRequest request, MarketActvity marketActvity) {
		setPageInfo(request, marketActvity);
		
		log.info("营销活动列表请求参数：{}", JsonUtil.objToStr(marketActvity));
		
		
		PageResult<MarketActvity> page =  marketActvityService.findAll(marketActvity);
		
		log.info("营销活动列表返回结果：{}", JsonUtil.objToStr(page));
		return page;
	}
	
	@RequestMapping("findById")
	@ResponseBody
	public MarketActvity findById(Integer id) {
		log.info("营销活动详情请求参数：{}", id);
		
		MarketActvity marketActvity =  marketActvityService.findById(id);
		
		log.info("营销活动详情返回结果：{}", JsonUtil.objToStr(marketActvity));
		return marketActvity;
	}
	
	@RequestMapping("add")
	@ResponseBody
	public Result add(HttpServletRequest request, @Valid @RequestBody MarketActvity marketActvity ) {
		log.info("营销活动新增请求参数：{}", marketActvity);
		
		setLoginStaff(request, marketActvity);
		
		marketActvityService.add(marketActvity);
		
		return Result.getInstance(ResultType.SUCCESS, "营销活动信息保存成功！");
	}
	
	@RequestMapping("update")
	@ResponseBody
	public Result update(HttpServletRequest request, @Validated @RequestBody MarketActvity marketActvity ) {
		log.info("营销活动修改请求参数：{}", marketActvity);
		
		setLoginStaff(request, marketActvity);
		
		marketActvityService.edit(marketActvity);
		
		return Result.getInstance(ResultType.SUCCESS, "营销活动信息修改成功！");
	}
	
	@RequestMapping("deleteByIds")
	@ResponseBody
	public Result deleteByIds(HttpServletRequest request, String ids) {
		log.info("营销活动修改请求参数：{}", ids);
		
		ids = HtmlUtils.htmlUnescape(ids);
		List<Integer> longs = JSON.parseArray(ids, Integer.class);
		
		MarketActvity marketActvity =new MarketActvity();
		setLoginStaff(request, marketActvity);
		marketActvity.setIds(longs);
		
		marketActvityService.deleteByIds(marketActvity);
		
		return Result.getInstance(ResultType.SUCCESS, "营销活动信息删除成功！");
	}
	
	@RequestMapping("deleteById")
	@ResponseBody
	public Result deleteById(HttpServletRequest request, Long id) {
		log.info("营销活动修改请求参数：{}", id);
		
		marketActvityService.deleteById(id);
		
		return Result.getInstance(ResultType.SUCCESS, "营销活动信息删除成功！");
	}
	
}
