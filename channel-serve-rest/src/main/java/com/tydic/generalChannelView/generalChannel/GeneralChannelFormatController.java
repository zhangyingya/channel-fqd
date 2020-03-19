package com.tydic.generalChannelView.generalChannel;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tydic.common.controller.AbstractController;
import com.tydic.common.page.PageResult;
import com.tydic.generalChannelView.generalChannel.bean.GeneralChannel;
import com.tydic.generalChannelView.generalChannel.bean.GeneralChannelFormat;
import com.tydic.generalChannelView.generalChannel.service.GeneralChannelFormatService;

/**
 * 泛渠道业态管理
 * @author Administrator
 *
 */

@Controller
@RequestMapping(value = "/generalChannelFormat")
public class GeneralChannelFormatController extends AbstractController {
	
	@Autowired
	private GeneralChannelFormatService generalChannelFormatService;
	
	@RequestMapping("/findAll")
	@ResponseBody
	public PageResult<GeneralChannelFormat> findAll(GeneralChannelFormat format) {
		return generalChannelFormatService.findAll(format);
	}
	
	/**
	 * 查询子节点
	 * @param parId
	 * @return
	 */
	@RequestMapping("/findAllByParId")
	@ResponseBody
	public List<Map<String, Object>> findById(Long parId) {
		return generalChannelFormatService.findAllByParId(parId);
	}
	
	/**
	 * 查询顶级节点
	 * @param generalChannel
	 * @return
	 */
	@RequestMapping("/findAllByTop")
	@ResponseBody
	public List<Map<String, Object>> findAllByTop(GeneralChannel generalChannel) {
		return generalChannelFormatService.findAllByTop();
		 
	}
}
