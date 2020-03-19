package com.tydic.generalChannelView.marketActvity.bean;

import java.io.Serializable;
import java.util.Date;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

@Setter
@Getter
@ToString
public class MarketActvityResDto implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	private Integer id;
	
	private String name;
	
	private String type;
	
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

}
