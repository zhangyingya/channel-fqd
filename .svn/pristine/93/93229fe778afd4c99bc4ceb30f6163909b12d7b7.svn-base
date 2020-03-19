package com.tydic.generalChannelView.generalChannel;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tydic.common.controller.AbstractController;
import com.tydic.generalChannelView.generalChannel.service.VisualizationAnalysisService;

import lombok.extern.slf4j.Slf4j;
@RequestMapping(value="/visualizationAnalysis")
@Controller
@Slf4j
public class VisualizationAnalysisController extends AbstractController{
	
	
	@Resource
	private VisualizationAnalysisService visualizationAnalysisService;
	
	
	@RequestMapping("/findAllChannelAmounts")
	@ResponseBody
	public  List<Map<String, Object>> findAllChannelAmounts(Map<String, Object> map){
		return visualizationAnalysisService.findAllChannelAmounts(map);
				
	}
	
	@RequestMapping("/findAllBusinessOpportunityList")
	@ResponseBody
	public  List<Map<String, Object>> findAllBusinessOpportunityList(Map<String, Object> map){		
		
		return visualizationAnalysisService.findAllBusinessOpportunityList(map);
				
	}
	
	
	@RequestMapping("/findChannelAmountsByEveryday")
	@ResponseBody
	public  List<Map<String, Object>> findChannelAmountsByEveryday(){
	
		return visualizationAnalysisService.findGeneralChannelAmountsByEveryday();
				
	}
	
	
	@RequestMapping("/findBusinessOpportunityByEveryday")
	@ResponseBody
	public  List<Map<String, Object>> findBusinessOpportunityByEveryday(){
	
		return visualizationAnalysisService.findBusinessOpportunityAmountsByEveryday();
				
	}
	
}
