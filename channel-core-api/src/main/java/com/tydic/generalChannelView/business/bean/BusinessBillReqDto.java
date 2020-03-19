package com.tydic.generalChannelView.business.bean;

import java.io.Serializable;

import javax.validation.constraints.NotNull;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class BusinessBillReqDto implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@NotNull(message="用户姓名不能为空！")
	private String customerName;
	
	@NotNull(message="用户电话不能为空！")
	private String customerPhone;
	
	private String customerAddr;
	
	private String customerRemark;
	
	@NotNull(message="泛渠道ID不能为空！")
	private String generalChannelId;
	
	@NotNull(message="业务类型不能为空（10：手机类型，20：宽带业务，30：其他业务, 默认为：10）")
	private String businessBillType;
}
