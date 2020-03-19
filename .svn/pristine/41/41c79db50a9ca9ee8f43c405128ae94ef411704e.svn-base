package com.tydic.open;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tydic.common.Result;
import com.tydic.common.Result.ResultType;
import com.tydic.generalChannelView.business.bean.BusinessBillOrderReqDto;
import com.tydic.generalChannelView.business.service.BusinessBillService;

@RestController
@RequestMapping(value="/open")
public class OpenController {
	
	@Autowired
	private BusinessBillService businessBillService;
	
	@RequestMapping(value="/completeBusinessBill", method=RequestMethod.POST)
	public Result completeBusinessBill(@RequestParam(value="token", required=true) String token,
			@Valid  @RequestBody BusinessBillOrderReqDto businessBillOrderReqDto) {
		
		if ("800369000123".equals(token)) {
			businessBillService.completeBusinessBill(businessBillOrderReqDto);
			return Result.getInstance(ResultType.SUCCESS, "成功！");
		}
		
		return Result.getInstance(ResultType.FAIL, "参数不符合！");
	} 
}

