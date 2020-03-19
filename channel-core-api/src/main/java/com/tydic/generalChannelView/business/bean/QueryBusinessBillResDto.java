package com.tydic.generalChannelView.business.bean;

import java.io.Serializable;
import java.util.Date;

import javax.validation.constraints.NotNull;

import lombok.Data;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

@Data
public class QueryBusinessBillResDto implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private String id;
	
	private String customerName;
	
	private String customerPhone;
	
	private String customerAddr;
	
	private String customerRemark;
	
	private Integer generalChannelId;
	
	@DateTimeFormat(pattern="yyyy-MM-dd")
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone="GMT+8")
    private Date createDate;
	
	private String generalChannelName;
	
	private String generalChannelCode;
	
	private String channelName;
	
	private String channelNbr;
	
	private String regionName;
	
	private Long regionId;
	
	private String latnName;
	
	private Long latnId;
	
	private String statusCd;
	
	private String businessBillType;
	
	private String customerRejectReason;
	
	private String isUsed = "0";

}
