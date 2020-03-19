package com.tydic.generalChannelView.business.mapper;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.tydic.common.BaseMapper;
import com.tydic.generalChannelView.business.bean.BusinessBillLog;

@Repository
public interface BusinessBillLogMapper extends BaseMapper<BusinessBillLog> {
	List<BusinessBillLog> findAll(BusinessBillLog businessBillLog);
	
	void insert(BusinessBillLog businessBillLog);
	
	Long isExistByCustomerPhoneAndGeneralChannelIdAndMarketActivityIds(BusinessBillLog businessBillLog);
	
}
