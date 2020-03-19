package com.tydic.generalChannelView.app.bean;

import java.io.Serializable;
import java.util.List;

import javax.validation.constraints.NotNull;

import lombok.Data;

@Data
public class AppCommonRegionReqDto implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	/**
	 * 当前登陆用户工号
	 */
	@NotNull(message = "工号不能为空！")
	private String loginSysUserCode;
	
	/**
	 * 本地网
	 */
	private String latnId;
	
	/**
	 * 当前工号角色id集合
	 */
	private List<String> systemRoleIds;

}
