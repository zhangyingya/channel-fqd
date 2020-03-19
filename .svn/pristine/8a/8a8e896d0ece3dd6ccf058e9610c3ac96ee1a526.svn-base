package com.tydic.generalChannelView.business.bean;

import java.util.Date;

import javax.validation.constraints.NotNull;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.tydic.common.BaseBean;
/**
 * 商机单日志
 * @author Administrator
 * 已废弃-不用
 */
@Setter
@Getter
@ToString
public class BusinessBillLog extends BaseBean {
	/**
	 * BUSINESS_BILL
	 */
	private static final long serialVersionUID = 1L;

	private Integer id;
	
	@NotNull(message="用户电话不能为空！")
	private String customerPhone;
	
	@NotNull(message="泛渠道ID不能为空！")
	private Integer generalChannelId;
	
	private String marketActivityIds;
	
	//业务类型（10，手机类型，20管带业务，30其他业务）
	private String businessBillType = "10";
	
	private String isUsed = "0";
	
	@DateTimeFormat(pattern="yyyy-MM-dd")
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone="GMT+8")
    private Date createDate;
}
