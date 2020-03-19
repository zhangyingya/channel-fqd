package com.tydic.generalChannelView.business.mapper;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.tydic.common.BaseMapper;
import com.tydic.generalChannelView.business.bean.BusinessBill;
import com.tydic.generalChannelView.business.bean.BusinessBillOrderReqDto;
import com.tydic.generalChannelView.business.bean.Offer;


@Repository
public interface BusinessBillMapper extends BaseMapper<BusinessBill> {
	List<BusinessBill> findAll(BusinessBill businessBill);
	
	List<BusinessBill> findAllByHandPage(BusinessBill businessBill);
	
	Long countFindAll(BusinessBill businessBill);
	
	void insert(BusinessBill businessBill);
	
	List<BusinessBill> findAllByGeneralChannelId(Integer generalChannelId);
	
	Long isExistByCustomerPhone(String customerPhone);
	
	BusinessBill findById(Integer id);
	
	void writeCustomerRejectReason(BusinessBill businessBill);
	
	void update(BusinessBill businessBill);
	
	void batchInsertBusinessBillOrderOffer(List<Offer> list);
	
	void insertBusinessBillOrder(BusinessBillOrderReqDto businessBillOrderReqDto);
	
	void insertBusinessBillOrderOffer(Offer offer);
	
	Long findBusinessBillOrderId();
	
	void updateBusinessBillOrderById(BusinessBillOrderReqDto businessBillOrderReqDto);
}
