package com.tydic.generalChannelView.marketActvity.bean;

import java.util.Date;
import java.util.List;

import javax.validation.constraints.NotNull;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.tydic.common.BaseBean;
import com.tydic.generalChannelView.generalChannel.bean.GeneralChannel;
/**
 * 营销活动配置表
 * @author Administrator
 *
 */
@Setter
@Getter
@ToString
public class MarketActvity extends BaseBean {
	
	private static final long serialVersionUID = 1L;
	
	private Integer id;
	
	@NotNull(message = "营销活动名称不能为空！")
	private String name;
	
	private String type;
	
	@NotNull(message = "营销活动URl不能为空！")
	private String url;
	
	private String origin;
	
	private String statusCd;
	
	private String action;
	
	private String description;
	
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
    
    private List<GeneralChannel> generalChannels;
}
