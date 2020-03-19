package com.tydic.generalChannelView.business.bean;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.validation.constraints.NotNull;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class BusinessBillOrderReqDto implements Serializable {
	
	/**
	 * 序列化
	 */
	private static final long serialVersionUID = 1L;
	
	/**
	 * 商机单和订单关系表主键id
	 */
	private Long id;
	
	/**
	 * 商机单ID/编码
	 */
	@NotNull(message = "商机单ID/编码不能为空！")
	private Long businessBillId;
	
	/**
	 * 商机单状态
	 */
	private String businessBillStatusCd;
	
	/**
	 * 订单ID
	 */
	private Long custOrderId = -1L;
	
	/**
	 * 订单类型,orderType：250-新装
	 */
	private String orderType;
	
	/**
	 * 生产订单时间
	 */
	@DateTimeFormat(pattern="yyyy-MM-dd")
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone="GMT+8")
	private Date createTime;
	
	/**
	 * 竣工时间
	 */
	@DateTimeFormat(pattern="yyyy-MM-dd")
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone="GMT+8")
	private Date completeTime;
	
	private Date currentDate;
	
	/**
	 * 工号id
	 */
	private Long sysUserId = -1L;
	
	/**
	 * 工号
	 */
	@NotNull(message = "工号不能为空！")
	private String sysUserCode;
	
	/**
	 * 员工id
	 */
	private Long staffId = -1L;
	
	/**
	 * 员工姓名
	 */
	private String staffName;
	
	/**
	 * 营业厅id
	 */
	private Long channelId = -1L;
	
	/**
	 * 营业厅id
	 */
	private Long channelNbr;
	
	/**
	 * 营业厅名称
	 */
	private String channelName;
	
	
	/**
	 * 受理手机号码
	 */
	private String telePhone;

	/**
	 * 套餐集合
	 */
	private List<Offer> offerArr;
	
	/**
	 * 是否已发送 1 ： 发送，0 未发送
	 */
	private String sendMessage;
	
	/**
	 * 短信内容
	 */
	private String messageContext;

}
