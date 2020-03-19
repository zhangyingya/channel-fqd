package com.tydic.generalChannelView.business;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.httpclient.HttpStatus;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.util.EntityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tydic.common.Result;
import com.tydic.common.Result.ResultType;
import com.tydic.common.SpringContext;
import com.tydic.common.controller.AbstractController;
import com.tydic.common.page.PageResult;
import com.tydic.common.utils.JsonUtil;
import com.tydic.common.utils.ObjectIsNull;
import com.tydic.generalChannelView.business.bean.BusinessBill;
import com.tydic.generalChannelView.business.service.BusinessBillService;
import com.tydic.sso.bean.AuthSystemUser;
import com.tydic.sso.bean.SystemUserDetail;
import com.tydic.sx.systemUserSpecialPriv.bean.StaffPrivReqDto;
import com.tydic.sx.systemUserSpecialPriv.bean.StaffPrivResDto;
import com.tydic.sx.systemUserSpecialPriv.service.SystemUserSpecialPrivService;

import lombok.extern.slf4j.Slf4j;

/**
 * 商机单
 * @author Administrator
 *
 */

@Controller
@RequestMapping(value = "/businessBill")
@Slf4j
public class BusinessBillController extends AbstractController {
	
	@Autowired
	private BusinessBillService businessBillService;
	
	@Autowired
	private SystemUserSpecialPrivService systemUserSpecialPrivService;
	
	@RequestMapping("/findAll")
	@ResponseBody
	public PageResult<BusinessBill> findAll(HttpServletRequest request, BusinessBill businessBill) {
		setPageInfo(request, businessBill);
		SystemUserDetail userDetail = getLoginUserInfo(request);
		businessBill.setLoginSysUserCode(userDetail.getAuthSystemUser().getSysUserCode());
		businessBill.setSysRoleIds(findRoleIds(userDetail.getAuthSystemUser().getSysUserId()));
		
		log.info("商机单列表请求参数：{}", JsonUtil.objToStr(businessBill));
		
		PageResult<BusinessBill> pageResult = businessBillService.findAll(businessBill);
		
		log.info("商机单列表返回结果：{}", JsonUtil.objToStr(pageResult));
		return pageResult;
	}
	
	@RequestMapping("/findById")
	@ResponseBody
	public BusinessBill findById(Integer id) {
		log.info("获取商机单详情：id= {}", id);
		BusinessBill businessBill = businessBillService.findById(id);
		log.info("获取商机单详情,返回结果", JsonUtil.objToStr(businessBill));
		return businessBill;
	}
	
	@RequestMapping("/writeCustomerRejectReason")
	@ResponseBody
	public Result writeCustomerRejectReason(HttpServletRequest request, String customerRejectReason, Integer id) {
		log.info("泛渠道商家单，填写用户拒绝理由：customerRejectReason= {}", customerRejectReason);
		
		BusinessBill businessBill = new BusinessBill();
		businessBill.setCustomerRejectReason(customerRejectReason);
		businessBill.setId(id);
		
		setLoginStaff(request, businessBill);
		
		businessBillService.writeCustomerRejectReason(businessBill);
		
		return Result.getInstance(ResultType.SUCCESS, "填写用户拒绝理由成功！");
	}
	
	@RequestMapping("/toOrder")
	@ResponseBody
	public Map<String, Object> toOrder(HttpServletRequest request, Integer id, String ctx) {
		log.info("开始，业务办理跳转：id= {}", id);
		Map<String, Object> map = new HashMap<String, Object>();
		SystemUserDetail userDetail = getLoginUserInfo(request);
		
		//业务办理权限编码
		String orderPrivCode = "121555454001111";
		
		log.info("查询权限请求url：{}", ctx + "/esmp-serve-rest/rest/serve.do");
		//ps:上线时间紧急，应用dubbo服务，临时改为http服务，233
		String privResult = doPost(ctx + "/esmp-serve-rest/rest/serve.do", getOrderUrl(userDetail.getAuthSystemUser()));
		
		log.info("返回权限：{}"+privResult);
		if (!ObjectIsNull.check(privResult)) {
			if (!privResult.contains(orderPrivCode)) {
				map.put("error", "该工号无业务受理权限，请先联系本地网管理员！");
				return map;
			}
		}
		
		BusinessBill businessBill = businessBillService.findById(id);
		
		log.info("3.0用户信息："+JsonUtil.objToStr(userDetail.getAuthSystemUser()));
		
		String url = "";
		
		String serverUrl = SpringContext.getProperty("order.service.url");
		
		if (!ObjectIsNull.check(serverUrl)) {
			url = serverUrl;
		} else {
			map.put("error", "配置文件，获取业务受理跳转地址为空！");
			return map;
		}
		
		String result = doPost(url, getJson(userDetail.getAuthSystemUser(), businessBill));
		
		log.info("业务受理返回结果：{}", result);
		
		Map<String, Object> resultMap = JSON.parseObject(result);
    	
    	Map<String, Object> contractRoot = (Map<String, Object>)resultMap.get("contractRoot");
    	
    	Map<String, Object> svcCont = (Map<String, Object>)contractRoot.get("svcCont");
    	
    	String resultCode = (String)svcCont.get("resultCode");
		
		if (!ObjectIsNull.check(resultCode) && "0".equals(resultCode)) {
			map.put("url", (String)svcCont.get("resultObject"));
		} else {
			log.error("获取结果信息失败！");
		}
		
	    return map;
	}
	
	private String getJson(AuthSystemUser systemUser, BusinessBill businessBill) {
		Map<String, Object> tcpCont = new HashMap<String, Object>();
		tcpCont.put("sign", "AAAzrWAA9AAHOldAAJ");
		tcpCont.put("transactionId", "29010604938251117");
		tcpCont.put("requestId", "29020171026200511488");
		tcpCont.put("svcCode", "QRY_BUSINESS_URL");
		tcpCont.put("reqTime", "20171026200511505");
		tcpCont.put("reqType", "null");
		tcpCont.put("appKey", "SSO");
		tcpCont.put("version", "V1.0");
		tcpCont.put("pubSign", "null");
		
		
		Map<String, Object> svcCont = new HashMap<String, Object>();
		svcCont.put("latnId", systemUser.getLatnId());
		svcCont.put("busNbr", businessBill.getId());
		svcCont.put("staffId", systemUser.getStaffId());
		
		
		Map<String, Object> contractRoot = new HashMap<String, Object>();
		contractRoot.put("tcpCont", tcpCont);
		contractRoot.put("svcCont", svcCont);
		
		Map<String, Object> root = new HashMap<String, Object>();
		
		root.put("contractRoot", contractRoot);
		
		String string = "";
		
		try {
			string = new ObjectMapper().writeValueAsString(root);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
		
		return string;
	}
	
	
	 private String doPost(String url,String jsonParam){
		 log.info("业务受理请求参数，url=" + url + ", param = " + jsonParam);
		 
	        DefaultHttpClient client = new DefaultHttpClient();
	        HttpPost post = new HttpPost(url);
	        HttpResponse res = null;
	        try {
	            StringEntity s = new StringEntity(jsonParam);
	            s.setContentEncoding("UTF-8");
	            s.setContentType("application/json");//发送json数据需要设置contentType
	            post.setEntity(s);
	            res = client.execute(post);
	            if(res.getStatusLine().getStatusCode() == HttpStatus.SC_OK){
	                HttpEntity entity = res.getEntity();
	                String result = EntityUtils.toString(entity);// 返回json格式：
	                return result;
	            }else{
	            	return "error";
	            }
	        } catch (Exception e) {
	            throw new RuntimeException(e);
	        }
	 }
	 
	 private List<StaffPrivResDto> findPrivByAppIdAndSysUserId(String appId, String sysUserId, String privCode) {
		 StaffPrivReqDto reqDto = new StaffPrivReqDto();
		 reqDto.setSysUserId(sysUserId);
		 reqDto.setSystemInfoId(appId);
		 List<StaffPrivResDto> resDtos = systemUserSpecialPrivService.findStaffPrivList(reqDto);
		 
		 return resDtos;
	 } 
	 
	 private String getOrderUrl(AuthSystemUser systemUser) {
			Map<String, Object> tcpCont = new HashMap<String, Object>();
			tcpCont.put("sign", "AAAzrWAA9AAHOldAAJ");
			tcpCont.put("transactionId", "29010604938251117");
			tcpCont.put("svcCode", "70500100140001");
			tcpCont.put("reqTime", "20171026200511505");
			tcpCont.put("reqType", "null");
			tcpCont.put("appKey", "10031");
			tcpCont.put("version", "V1.0");
			
			Map<String, Object> requestObject = new HashMap<String, Object>();
			requestObject.put("systemInfoId", "310");
			requestObject.put("sysUserId", systemUser.getSysUserId());
			Map<String, Object> svcCont = new HashMap<String, Object>();
			
			svcCont.put("requestObject", requestObject);
			
			
			Map<String, Object> contractRoot = new HashMap<String, Object>();
			contractRoot.put("tcpCont", tcpCont);
			contractRoot.put("svcCont", svcCont);
			
			Map<String, Object> root = new HashMap<String, Object>();
			
			root.put("contractRoot", contractRoot);
			
			String string = "";
			
			try {
				string = new ObjectMapper().writeValueAsString(root);
			} catch (JsonProcessingException e) {
				e.printStackTrace();
			}
			
			return string;
	}
    
}
