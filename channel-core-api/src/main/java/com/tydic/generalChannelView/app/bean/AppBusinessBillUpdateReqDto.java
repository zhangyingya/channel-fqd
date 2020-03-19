package com.tydic.generalChannelView.app.bean;

import java.io.Serializable;

import javax.validation.constraints.NotNull;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class AppBusinessBillUpdateReqDto implements Serializable {
	
	private static final long serialVersionUID = 1L;

	/**
	 * 商机单ID
	 */
	@NotNull(message="商机单ID不能为空 ！")
	private Integer id;
	
	/**
	 * 商机单状态（10未处理商机单，20转订单成功,30用户拒绝）
	 */
	@NotNull(message="状态不能为空 ！")
	private String statusCd = "10";
	
	/**
	 * 当前工号
	 */
	@NotNull(message="当前工号不能为空 ！")
	private String loginSysUserCode;
}
