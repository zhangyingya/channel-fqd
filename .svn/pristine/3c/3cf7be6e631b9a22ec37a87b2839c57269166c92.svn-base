package com.tydic.generalChannelView.report.bean;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.validation.constraints.NotNull;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * 可视化分析请求对象 Dto
 * @author Administrator
 * @since 2019-06-05
 */
@Setter
@Getter
@ToString
public class BusinessBillReport implements Serializable {
	
	/**
	 * 序列化
	 */
	private static final long serialVersionUID = 1L;
	
	private Integer id;
	
	private String customerName;
	
	private String customerPhone;
	
	private String customerAddr;
	
	private String customerRemark;
	
	//业务办理结果 : 10未处理商机单，20转订单成功,30用户拒绝,40商机单业务办理中"
	private String statusCd = "10";
	
	//用户拒绝理由
	private String customerRejectReason;
	
	//业务类型（10，手机类型，20管带业务，30其他业务）
	private String businessBillType = "10";
	
	@DateTimeFormat(pattern="yyyy-MM-dd")
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone="GMT+8")
    private Date createDate;
	
	
    @DateTimeFormat(pattern="yyyy-MM-dd")
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone="GMT+8")
    private Date updateDate;

    private String updateStaffName;
	
	private String generalChannelName;
	private String generalChannelCode;
	private String channelName;
	private String channelNbr;
	private String latnName;
	private String regionName;
	private String townName;
	
	private String villageName;
	
	private String specializedTeamsName;
	
	private String shopCode;
	/**
	 * 订单转化时间
	 */
	@DateTimeFormat(pattern="yyyy-MM-dd")
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone="GMT+8")
	private Date orderCreateDate;
	
	/**
	 * 竣工业务套餐名称
	 */
	private String orderOfferNameArr;
	
	/**
	 * 受理业务店员
	 */
	private String orderStaffName;
	
	/**
	 * CRM竣工时间
	 */
	@DateTimeFormat(pattern="yyyy-MM-dd")
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone="GMT+8")
	private Date orderCompleteDate;
	
}
