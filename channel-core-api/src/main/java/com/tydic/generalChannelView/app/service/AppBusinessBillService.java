package com.tydic.generalChannelView.app.service;

import java.util.List;

import org.springframework.validation.annotation.Validated;

import com.tydic.common.service.IService;
import com.tydic.generalChannelView.app.AppResult;
import com.tydic.generalChannelView.app.bean.AppBusinessBillUpdateReqDto;
import com.tydic.generalChannelView.app.bean.AppRefuseReason;
import com.tydic.generalChannelView.business.bean.QueryBusinessBillReqDto;
import com.tydic.generalChannelView.business.bean.QueryBusinessBillResDto;

public interface AppBusinessBillService extends IService{

	/**
	 * 查询商机单列表
	 * @param businessBillReqDto
	 * @return
	 */
	AppResult<List<QueryBusinessBillResDto>> findAll(@Validated QueryBusinessBillReqDto businessBillReqDto);
	
	/**
	 * 商机单拒绝
	 * @param appRefuseReason
	 * @return
	 */
	AppResult<Boolean> writeCustomerRejectReason(AppRefuseReason appRefuseReason);
	
	/**
	 * 商机单修改
	 * @param businessBill (statusCd	商机单状态    10未处理商机单，20转订单成功,30用户拒绝)
	 * @return
	 */
	AppResult<Boolean> update(AppBusinessBillUpdateReqDto updateReqDto);
	
	
	/**
	 * 查询商机单列表
	 * @param businessBillReqDto
	 * @return
	 */
	AppResult<List<QueryBusinessBillResDto>> findAllByGeneralChannelPhone(QueryBusinessBillReqDto businessBillReqDto);
}
