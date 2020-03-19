package com.tydic.generalChannelView.marketActvity.bean;

import java.util.Date;
import java.util.List;

import javax.validation.constraints.NotNull;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.tydic.common.BaseBean;
/**
 * 泛渠道与营销活动关系
 * @author Administrator
 *
 */
@Setter
@Getter
@ToString
public class GeneralChannelActivity extends BaseBean {
	
	private static final long serialVersionUID = 1L;
	
	private Integer id;
	
	@NotNull(message = "泛渠道ID不能为空！")
	private Integer generalChannelId;
	
	@NotNull(message = "营销活动ID不能为空！")
	private Integer marketActivityId;
	
	private String statusCd;
	
	private String action;
	
	private String remark;
	
	@DateTimeFormat(pattern="yyyy-MM-dd")
	@JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone="GMT+8")
	private Date createDate;

	private Long createStaff;

	@DateTimeFormat(pattern="yyyy-MM-dd")
	@JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone="GMT+8")
	private Date updateDate;

	private Long updateStaff;
	
	private String staffName;
	
	private List<Integer> ids;

}
