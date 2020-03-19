package com.tydic.generalChannelView.business.service.impl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tydic.channelview.staff.bean.StaffBean;
import com.tydic.channelview.staff.mapper.StaffBeanMapper;
import com.tydic.common.BaseMapper;
import com.tydic.common.PageContext;
import com.tydic.common.bean.Result;
import com.tydic.common.bean.Result.ResultFlag;
import com.tydic.common.mapper.CommonRegionMapper;
import com.tydic.common.page.PageResult;
import com.tydic.common.sendMessage.sx.SendMassageUtil_SX;
import com.tydic.common.service.AbstractService;
import com.tydic.common.service.CommonService;
import com.tydic.common.utils.JsonUtil;
import com.tydic.common.utils.ObjectIsNull;
import com.tydic.generalChannelView.app.AppResult;
import com.tydic.generalChannelView.business.bean.BusinessBill;
import com.tydic.generalChannelView.business.bean.BusinessBillOrderReqDto;
import com.tydic.generalChannelView.business.bean.BusinessBillReqDto;
import com.tydic.generalChannelView.business.bean.Offer;
import com.tydic.generalChannelView.business.mapper.BusinessBillLogMapper;
import com.tydic.generalChannelView.business.mapper.BusinessBillMapper;
import com.tydic.generalChannelView.business.service.BusinessBillService;
import com.tydic.generalChannelView.generalChannel.bean.GeneralChannel;
import com.tydic.generalChannelView.generalChannel.mapper.GeneralChannelMapper;
import com.tydic.generalChannelView.marketActvity.bean.MarketActvity;
import com.tydic.generalChannelView.marketActvity.mapper.MarketActvityMapper;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class BusinessBillServiceImpl extends AbstractService<BusinessBill> implements BusinessBillService {
	
	@Resource
	private BusinessBillMapper businessBillMapper;
	
	@Resource
	private MarketActvityMapper marketActvityMapper;
	
	@Resource
	private BusinessBillLogMapper businessBillLogMapper;
	
	@Resource
	private CommonRegionMapper commonRegionMapper;
	
	@Resource
	private StaffBeanMapper staffBeanMapper;
	
	@Autowired
	private CommonService commonService;
	
	@Autowired
	private GeneralChannelMapper generalChannelMapper;

	@Override
	public PageResult<BusinessBill> findAll(BusinessBill businessBill) {
		//查询员工信息
		StaffBean staffBean = staffBeanMapper.findByStaffCode(businessBill.getLoginSysUserCode());
		//获取角色类型
		String roleType = commonService.getRoleType(businessBill.getLoginSysUserCode(), businessBill.getSysRoleIds());
				
		if ("general".equals(roleType)) {
			businessBill.setLoginStaffId(staffBean.getStaffId());
		}
		
		if ("other".equals(roleType)) {
			return null;
		}
		
		List<BusinessBill> result = businessBillMapper.findAll(businessBill);
		return new PageResult<BusinessBill>(businessBill, PageContext.getPageTotal(), result);
	}
	
	@Override
	@Transactional
	public AppResult<Boolean> add(BusinessBillReqDto businessBillReqDto) {
		log.info("商机单保存用户信息，请求参数：{}", JsonUtil.objToStr(businessBillReqDto));
		
		if (ObjectIsNull.check(businessBillReqDto)) {
			log.error("商机单保存用户信息，返回结果：{}", JsonUtil.objToStr(new Result<Boolean>(ResultFlag.FAIL, "请求对象为空！")));
			return new AppResult<Boolean>(ResultFlag.FAIL.name(), "请求对象为空！");
		}
		
		/*if (ObjectIsNull.check(businessBillReqDto.getCustomerName())) {
			return new Result<Boolean>(ResultFlag.FAIL, "用户姓名为空！");
		}*/
		
		if (ObjectIsNull.check(businessBillReqDto.getCustomerPhone())) {
			log.error("商机单保存用户信息，返回结果：{}", JsonUtil.objToStr(new Result<Boolean>(ResultFlag.FAIL, "用户手机号码为空！")));
			return new AppResult<Boolean>(ResultFlag.FAIL.name(), "用户手机号码为空！");
		}
		
		if (ObjectIsNull.check(businessBillReqDto.getGeneralChannelId())) {
			log.error("商机单保存用户信息，返回结果：{}", JsonUtil.objToStr(new Result<Boolean>(ResultFlag.FAIL, "泛渠道Id为空！")));
			return new AppResult<Boolean>(ResultFlag.FAIL.name(), "泛渠道Id为空！");
		}
		
		if (ObjectIsNull.check(businessBillReqDto.getBusinessBillType())) {
			log.error("商机单保存用户信息，返回结果：{}", JsonUtil.objToStr(new Result<Boolean>(ResultFlag.FAIL, "业务类型为空！")));
			return new AppResult<Boolean>(ResultFlag.FAIL.name(), "业务类型为空！");
		}
		
		//1、查询当前商户所关联的营销活动
		List<MarketActvity> marketActvities = marketActvityMapper.findAllByGeneralChannelId(Integer.valueOf(businessBillReqDto.getGeneralChannelId()));
		List<Integer> marketActivityIds = new ArrayList<Integer>();
		
		if (!ObjectIsNull.check(marketActvities) && marketActvities.size() > 0) {
			for (MarketActvity marketActvity : marketActvities) {
				marketActivityIds.add(marketActvity.getId());
			}
		}
		
		//2、保存商机单
		BusinessBill businessBill = new BusinessBill();
		
		businessBill.setCustomerName(businessBillReqDto.getCustomerName());
		businessBill.setCustomerPhone(businessBillReqDto.getCustomerPhone());
		businessBill.setCustomerAddr(businessBillReqDto.getCustomerAddr());
		businessBill.setCustomerRemark(businessBillReqDto.getCustomerRemark());
		businessBill.setStatusCd("10");
		businessBill.setGeneralChannelId(Integer.valueOf(businessBillReqDto.getGeneralChannelId()));
		businessBill.setIsUsed("0");
		businessBill.setMarketActivityIds(StringUtils.join(marketActivityIds, ","));
		businessBill.setBusinessBillType(businessBillReqDto.getBusinessBillType());
		
		businessBillMapper.insert(businessBill);
		
		log.error("商机单保存用户信息，返回结果：{}", JsonUtil.objToStr(new AppResult<Boolean>(ResultFlag.SUCCESS.name(), "成功！")));
		
		return new AppResult<Boolean>(ResultFlag.SUCCESS.name(), "成功");
	}
	
	@Override
	public void writeCustomerRejectReason(BusinessBill businessBill) {
		businessBillMapper.writeCustomerRejectReason(businessBill);
		
	}
	
	@Override
	public List<BusinessBill> findAllByGeneralChannelId(Integer generalChannelId) {
		// TODO Auto-generated method stub
		return businessBillMapper.findAllByGeneralChannelId(generalChannelId);
	}

	@Override
	public BaseMapper<BusinessBill> getMapper() {
		// TODO Auto-generated method stub
		return null;
	}
	
	@Override
	public BusinessBill findById(Integer id) {
		// TODO Auto-generated method stub
		return businessBillMapper.findById(id);
	}

	@Override
	public void doingBusinessBill(Long businessBillId) {
		log.info("商机单正在处理， businessBillId = {}", businessBillId);
	}

	@Override
	@Transactional
	public Boolean completeBusinessBill(BusinessBillOrderReqDto businessBillOrderReqDto) {
		log.debug("商机单竣工， BusinessBillOrderReqDto = {}", JsonUtil.objToStr(businessBillOrderReqDto));
		
		try {
			//获取主键
			Long businessBillOrderId = businessBillMapper.findBusinessBillOrderId();
			
			businessBillOrderReqDto.setId(businessBillOrderId);
			businessBillMapper.insertBusinessBillOrder(businessBillOrderReqDto);
			if (!ObjectIsNull.check(businessBillOrderReqDto.getOfferArr()) && businessBillOrderReqDto.getOfferArr().size() > 0) {
				for (Offer offer : businessBillOrderReqDto.getOfferArr()) {
					offer.setCustOrderId(businessBillOrderReqDto.getCustOrderId());
					businessBillMapper.insertBusinessBillOrderOffer(offer);
				}
			}
			BusinessBill businessBill = new BusinessBill();
			businessBill.setId(businessBillOrderReqDto.getBusinessBillId().intValue());
			businessBill.setUpdateStaff(-1L);
			businessBill.setStatusCd("20");
			
			businessBillMapper.update(businessBill);
		} catch (Exception e) {
			log.error("商机单竣工信息保存失败： {}", e.getMessage());
			return false;
		}
		
		try {
			BusinessBill businessBill = businessBillMapper.findById(businessBillOrderReqDto.getBusinessBillId().intValue());
			GeneralChannel generalChannel = generalChannelMapper.selectById(businessBill.getGeneralChannelId());
			sendMessageToGeneralChannelWhenComplete(businessBillOrderReqDto, businessBill, generalChannel);
		} catch (Exception e) {
			log.error("商机单竣工发送短信失败：{}", e.getMessage());
		}
		return true;
	}
	
	
	/**
	 * 商机单竣工发送短信
	 * @param phone
	 */
	private void sendMessageToGeneralChannelWhenComplete(BusinessBillOrderReqDto businessBillOrderReqDto, BusinessBill businessBill, GeneralChannel generalChannel) {
		/**
			XX年XX月XX日，填写的商机单XXXXXXXX已成功办理，套餐名称xxx（订单项是新装的套餐名称，只展现C网套餐名称，若有多个新装C网套餐展示多个名称）,可与结对门店XXXX联系确认酬金支付事宜。
			备注：XX年XX月XX日：商机收集时间
      		商机单XXXXXXXX：商机收集商机单号
 	     	结对门店XXXX：泛渠道的结对门店名称
		 */
		String context = "";
		String sendMessage = "";
		if (ObjectIsNull.check(generalChannel.getPhone())) {
			sendMessage = "0";
			context = "泛渠道编码："+ generalChannel.getCode() +"，绑定手机号码为空!";
		} else {
			Date currentTime = new Date();
			SimpleDateFormat formatter = new SimpleDateFormat("yyyy年MM月dd日");
			String dateString = formatter.format(currentTime);
			
			StringBuffer offerNames = new StringBuffer();
			if (!ObjectIsNull.check(businessBillOrderReqDto.getOfferArr()) && businessBillOrderReqDto.getOfferArr().size() > 0) {
				for (Offer offer : businessBillOrderReqDto.getOfferArr()) {
					offerNames.append(offer.getOfferName());
					offerNames.append(",");
				}
			}
			sendMessage = "1"; 
			context = dateString + "，填写的商机单"+ businessBillOrderReqDto.getBusinessBillId() +"已成功办理，套餐名称"+ offerNames.toString() +","
					+ "可与结对门店"+ generalChannel.getChannelName() +"联系确认酬金支付事宜。";
			try {
				// 短信发送
				SendMassageUtil_SX.sendMassage(generalChannel.getPhone(), "290", context);
			} catch (Exception e) {
				log.error("短信发送失败： {}", e.getMessage());
			}
		}
		
		try {
			businessBillOrderReqDto.setSendMessage(sendMessage);
			businessBillOrderReqDto.setMessageContext(generalChannel.getPhone() + " : "+ context);
			businessBillMapper.updateBusinessBillOrderById(businessBillOrderReqDto);
		} catch (Exception e) {
			log.error("保存短信日志记录失败： {}", e.getMessage());
		}
	}
}
