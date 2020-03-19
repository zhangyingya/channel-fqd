package com.tydic.common.sendMessage.sx;

import java.util.Calendar;
import java.util.Date;

import com.tydic.common.SpringContext;

/**
 * 短信发送工具类
 * @author yuanxh
 *
 */
public class SendMassageUtil_SX {
	
	public static final String SUCCESS="000";
	public static final String FAIL="001";
	
	/**
	 * 发送短信
	 * @param tel 手机号
	 * @param context 短信内容
	 * @return
	 * @throws Exception
	 */
	public static boolean sendMassage(String tel,String latnId, String context) throws Exception {
		try {
			String wsdlUrl=SpringContext.getProperty("reqUrl");
			java.net.URL url = new java.net.URL(wsdlUrl);
			BillDataSvr soap = new BillDataSvrLocator();
			BillDataSvrPortType portType = soap.getBillDataSvrHttpPort(url);
			
			BillReqVo vo = new BillReqVo();
			vo.setChannelType(Integer.parseInt(SpringContext.getProperty("channelType")));
			Calendar cBegin = Calendar.getInstance();
			// 设置日期
			cBegin.setTime(new Date());
			// 取日期当月第一天
			cBegin.set(Calendar.DAY_OF_MONTH, 1);
			vo.setBeginDate(cBegin);
			
			Calendar cEnd = Calendar.getInstance();
			// 设置日期
			cEnd.setTime(new Date());
			// 取日期当月第一天
			cEnd.set(Calendar.DAY_OF_MONTH, 1);
			// 取日期当月最后一天
			cEnd.roll(Calendar.DAY_OF_MONTH, -1);
			vo.setEndDate(cEnd);
			vo.setPushUrl(null);
			vo.setProductType(null);
			vo.setToTel(tel);
			vo.setBeginHour("00:00");
			vo.setCreateDespart(SpringContext.getProperty("createDespart"));
			vo.setBusinessId(Long.parseLong(SpringContext.getProperty("businessId")));
			vo.setParams(null);
			vo.setPlanId(SpringContext.getProperty("planId"));
			vo.setEndHour("24:00");
			vo.setCreateStaff(null);
			vo.setLatnId(latnId);
			vo.setProductId(null);
			vo.setFlowCode("esmp-"+System.currentTimeMillis());
			vo.setSentContent(context);
			vo.setSysCode(SpringContext.getProperty("sysCode"));
			vo.setSentType(null);
			
			BillReqVo[] bills = {vo};
			
			UserVo user = new UserVo();
			user.setUserName(SpringContext.getProperty("userName"));
			user.setPassWord(SpringContext.getProperty("passWord"));
			user.setSysCode(SpringContext.getProperty("sysCode"));
			user.setProductId(SpringContext.getProperty("productId"));
			
			
			BillResVo result =  portType.billInfo(user, bills);
			
			if(SUCCESS.equals(result.getState())) {
				return true;
			}
			return false;
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
		
	}
	
	public static void main(String[] args) {
		System.out.println(Calendar.getInstance());
	}

}
