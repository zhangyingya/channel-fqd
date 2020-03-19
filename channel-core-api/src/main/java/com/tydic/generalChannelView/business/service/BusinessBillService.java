package com.tydic.generalChannelView.business.service;


import java.util.List;

import javax.validation.Valid;

import com.tydic.common.page.PageResult;
import com.tydic.common.service.IService;
import com.tydic.generalChannelView.app.AppResult;
import com.tydic.generalChannelView.business.bean.BusinessBill;
import com.tydic.generalChannelView.business.bean.BusinessBillOrderReqDto;
import com.tydic.generalChannelView.business.bean.BusinessBillReqDto;

public interface BusinessBillService extends IService<BusinessBill>  {
	PageResult<BusinessBill> findAll(BusinessBill businessBill);
	
	AppResult<Boolean> add(@Valid BusinessBillReqDto businessBillReqDto);
	
	List<BusinessBill> findAllByGeneralChannelId(Integer generalChannelId);
	
	BusinessBill findById(Integer id);
	
	void writeCustomerRejectReason(BusinessBill businessBill);
	
	/**
	 * 商机单正在处理
	 * @param businessBillId 商机单ID/编码
	 */
	void doingBusinessBill(Long businessBillId);
	
	/**
	 * 商机单成功受理完成
	 * @param billOrderReqDto
	 */
	Boolean completeBusinessBill(BusinessBillOrderReqDto billOrderReqDto);
}
