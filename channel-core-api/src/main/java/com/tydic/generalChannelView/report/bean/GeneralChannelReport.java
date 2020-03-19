package com.tydic.generalChannelView.report.bean;

import java.io.Serializable;
import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * 泛渠道报表
 * @author Administrator
 * @since 2019-06-05
 */
@Setter
@Getter
@ToString
public class GeneralChannelReport implements Serializable {
	
	/**
	 * 序列化
	 */
	private static final long serialVersionUID = 1L;
	
	private String latnName;
	
	private String regionName;
	
	private String townName;
	
	private String villageName;
	
	private String channelName;
	
	private String channelNbr;
	
	private String staffName;
	
	private String generalChannelName;
	
	private String generalChannelCode;
	
	private String generalChannelAddr;
	
	private String generalChannelPhone;
	
	private String ifShop;
	
	private String shopCode;
	
	private String firstFormatName;
	    
	private String secondFormatName;
    
    private String specializedTeamsName;
    
    @DateTimeFormat(pattern="yyyy-MM-dd")
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone="GMT+8")
    private Date createDate;
    
    private String createStaffName;
    
    private String statusCd;
}
