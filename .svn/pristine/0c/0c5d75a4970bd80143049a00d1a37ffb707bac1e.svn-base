package com.tydic.generalChannelView.business.bean;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.validation.constraints.NotNull;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class QueryBusinessBillReqDto implements Serializable {

	private static final long serialVersionUID = 1L;
	
	private String id;
	
	private String customerName;
	
	private String customerPhone;
	
	private String customerAddr;
	
	private String generalChannelName;
	
	private String generalChannelCode;
	
	private String channelName;
	
	private String channelNbr;
	
	private String commonRegionId;
	
	@NotNull(message="当前页数不能为空")
	private String pageSize;
	
	@NotNull(message="当前页不能为空")
	private String curPage;
	
	private String statusCd;
	
	private String businessBillType;
	
	private Integer latnId;
	
	private String latnName;
	
	private Integer regionId;
	
	private String regionName;
	
	/**
	 * 开始时间
	 */
	private String startDateStr;
	
	/**
	 * 结束时间
	 */
    private String endDateStr;
	
	/**
	 * 泛渠道电话号码
	 */
	private String generalChannelPhone;
	
	/**
	 * 当前登陆工号
	 */
	private String loginSysUserCode;
	
	/**
	 * 当前工号角色ID集合
	 */
	private List<String> sysRoleIds;

}
