package com.tydic.generalChannelView.generalChannel.bean;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.validation.constraints.NotNull;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.Data;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.tydic.generalChannelView.business.bean.BusinessBill;
import com.tydic.generalChannelView.marketActvity.bean.MarketActvity;
import com.tydic.generalChannelView.marketActvity.bean.MarketActvityResDto;

@Data
public class QueryGeneralChannelDetailResDto implements Serializable {/**
	 * 
	 */
private static final long serialVersionUID = 1L;
	
	private Integer id;

	@NotNull(message = "名称不能为空！")
	private String name;
	
	@NotNull(message = "编码不能为空！")
	private String code;
	
	@NotNull(message = "业态信息不能为空！")
	private String format;
	
	@NotNull(message = "类型不能为空！")
	private String type;
	
	@NotNull(message = "联系电话不能为空！")
	private String phone;
	
	@NotNull(message = "地址不能为空！")
	private String addr;
	
	@NotNull(message = "结对渠道不能为空！")
	private String channelNbr;
	
	@NotNull(message = "负责人信息不能为空！")
	private String salesCode;
	
	private Long commonRegionId;
	
	@NotNull(message = "状态不能为空！")
	private String statusCd;
	
	@DateTimeFormat(pattern="yyyy-MM-dd")
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone="GMT+8")
	private Date beginDate;
	
	private String beginDateStr;
	
	@DateTimeFormat(pattern="yyyy-MM-dd")
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone="GMT+8")
	private Date endDate;
	
	private String endDateStr;
	
	@DateTimeFormat(pattern="yyyy-MM-dd")
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone="GMT+8")
	private Date statusDate;
	
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
    
    private String lonY;	//经度
    	
    private String latX;	//纬度
    
    private String shopCode;
    
    private String ifShop = "0";	//是否翼支付商户号 1：是， 0否
    
    private String ifOld = "0";		//是否旧数据 1：是， 0否
    
    private String ifCity;			//是否城乡（城市：1，农村： 0）
    
    private String villageName;	//行政村名称
    
   
    
    /**
     * 扩展返回字段
     */
    private String staffName;
    
    private String firstFormatId;
    
    private String firstFormatName;
    
    private String secondFormatName;
    
    private String createStaffName;
    
    private String updateStaffName;
    
    private String regionName;
    
    private String channelName;
    
    private Long channelId;
    
    private Long childCommonRegionId;
    
    private String childRegionName;
    
    private Long commonRegionTownId;
    
    private String commonRegionTownName;
    
    private Long specializedTeamsId;
    
    private String specializedTeamsName;
    
    private List<String> channelNbrs;
    
    private List<Integer> ids;
    
    private List<Integer> unIds;
    
    private List<MarketActvity> marketActvities;
    
    private List<BusinessBill> businessBills;
    
    private String qrcodeUrl;
	
    
    private Long loginStaffId;  //当前登陆用户
    
    private String loginSysUserCode;	//当前登陆用户工号
    
    private List<MarketActvityResDto> marketActvityResDtos;
}
