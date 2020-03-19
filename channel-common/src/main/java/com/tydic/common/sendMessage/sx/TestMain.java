package com.tydic.common.sendMessage.sx;

import java.util.Calendar;
import java.util.Date;


public class TestMain {
	public static void main(String[] args) throws Exception {
		String wsdlUrl="http://192.168.128.89:19002/smp_in/servlet/BillDataServlet";
		java.net.URL url = new java.net.URL(wsdlUrl);
		
		BillDataSvr soap = new BillDataSvrLocator();
		BillDataSvrPortType portType = soap.getBillDataSvrHttpPort(url);
		
		BillReqVo vo = new BillReqVo();
		vo.setChannelType(1);
		vo.setEndDate(Calendar.getInstance());
		vo.setBeginDate(Calendar.getInstance());
		vo.setPushUrl(null);
		vo.setProductType(null);
		vo.setToTel("18226610505");
		vo.setBeginHour("00:00");
		vo.setCreateDespart("1");
		vo.setBusinessId(5407l);
		vo.setParams(null);
		vo.setPlanId("1");
		vo.setEndHour("24:00");
		vo.setCreateStaff(null);
		vo.setLatnId("919");
		vo.setProductId(null);
		vo.setFlowCode("123");
		vo.setSentContent("C4E3B0AECED2BBB9CAC7CBFD");
		vo.setSysCode("001");
		vo.setSentType(null);
		
		BillReqVo[] bills = {vo};
		
		UserVo user = new UserVo();
		user.setUserName("admin");
		user.setPassWord("e64b78fc3bc91bcbc7dc232ba8ec59e0");
		user.setSysCode("001");
		user.setProductId("1");
		
		BillResVo billResVo = portType.billInfo(user, bills);
    	System.out.println(billResVo.getState()+"--"+billResVo.getStateDesc());
    	
	}
}
