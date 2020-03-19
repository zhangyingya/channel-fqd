package com.tydic.generalChannelView.business.bean;

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
 * 商机单实体
 */
@Setter
@Getter
@ToString
public class BusinessBill extends BaseBean {
	
	private static final long serialVersionUID = 1L;

	private Integer id;
	
	@NotNull(message="用户姓名不能为空！")
	private String customerName;
	
	@NotNull(message="用户电话不能为空！")
	private String customerPhone;
	
	@NotNull(message="用户地址不能为空！")
	private String customerAddr;
	
	private String customerRemark;
	
	@NotNull(message="业务办理结果 : 10未处理商机单，20转订单成功,30用户拒绝,40商机单业务办理中")
	private String statusCd = "10";
	
	//用户拒绝理由
	private String customerRejectReason;
	
	@NotNull(message="泛渠道ID不能为空！")
	private Integer generalChannelId;
	
	private String marketActivityIds;
	
	//业务类型（10，手机类型，20管带业务，30其他业务）
	private String businessBillType = "10";
	
	private String isUsed = "0";
	
	@DateTimeFormat(pattern="yyyy-MM-dd")
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone="GMT+8")
    private Date createDate;
	
    private Long createStaff;
	
    @DateTimeFormat(pattern="yyyy-MM-dd")
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone="GMT+8")
    private Date updateDate;

    private Long updateStaff;
	
	private String generalChannelName;
	private String generalChannelCode;
	private String generalChannelPhone;
	private String channelName;
	private String channelNbr;
	
	/**
	 * 开始时间
	 */
	private String startDateStr;
	
	/**
	 * 结束时间
	 */
    private String endDateStr;
	
	private Integer commonRegionId;
	
	private Integer latnId;
	
	private String latnName;
	
	private Integer regionId;
	
	private String regionName;
	
	private String specializedTeamsName;
	
	private Long loginStaffId;
	
	private String loginSysUserCode;
	
	private List<String> sysRoleIds;
	
}
