package com.tydic.channelview.channel.bean;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import com.tydic.common.BaseBean;

import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
public class ChannelBean extends BaseBean{
    /**
	 * 渠道单元实体类
	 */
	private static final long serialVersionUID = 1731508490699925672L;

	private Integer channelId;

    private String channelName;

    private String channelLevelCd;

    private String channelTypeCd;

    private String channelSubtypeCd;

    private String statusCd;

    private Integer parentChnId;

    private String channelNbr;

    private Long commonRegionId;

    private String provCode;

    private Integer channelSpecId;

    private Integer capacity;

    private Date startDt;

    private Date endDt;

    private Date openTime;

    private Date closeTime;

    private String description;

    private Date version;

    private String ccCodeMkt;

    private String ccCodePart;

    private String ccCodeOper;

    private BigDecimal operFlag;

    private Date statusDate;

    private String ccProvince;

    private String ccCity;

    private String ccCounty;

    private String ccTown;

    private String ccAddr;

    private BigDecimal isIphone;

    private Integer latnId;

    private Long zoneId;

    private String ccNumberOper;

    private String jtUniNumber;

    private String lordNumber;

    private Short ifJt;

    private Long orgId;

    private String channelClass;

    private String channelThirdType;

    private String action;

    private Date channelCreateTime;

    private String ecsCode;

    private String cbsCode;

    private String longitude;

    private String latitude;

    private BigDecimal locX;

    private BigDecimal locY;

    private BigDecimal gpsLocX;

    private BigDecimal gpsLocY;

    private String chnTypeCd;

    private Long fiveGridId;
    
    private String latnName;
    
    private String commonRegionTownId;
    
    private List<String> channelSubtypeCds;
    
    private Long specializedTeamsId;
    
    private String specializedTeamsName;
    
    private List<String> specializedTeamsNames;
    
    private Long loginStaffId;
    
    private String loginSysUserCode;
    
    private List<String> sysRoleIds;
}