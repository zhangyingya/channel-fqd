package com.tydic.generalChannelView.report.bean;

import java.util.Date;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.tydic.common.BaseBean;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * 可视化分析请求对象 Dto
 * @author Administrator
 * @since 2019-06-05
 */
@Setter
@Getter
@ToString
public class ReportReqDto extends BaseBean {
	
	/**
	 * 序列化
	 */
	private static final long serialVersionUID = 1L;
	
	/**
	 * 本地网
	 */
	private Integer latnId;
	
	/**
	 * 区县
	 */
	private Integer regionId;
	
	/**
	 * 营业厅
	 */
	private String channelName;
	
	/**
	 * 营业厅编码
	 */
	private String channelNbr;
	
	/**
	 * 泛渠道编码
	 */
	private String generalChannelCode;
	
	/**
	 * 泛渠道名称
	 */
	private String generalChannelName;
	
	/**
	 * 商机单类型
	 */
	private String businessBillType;
	
	/**
	 * 员工姓名
	 */
	private String staffName;
	
	/**
	 * 一级业态
	 */
	private String firstFormatId;
	
	/**
	 * 二级业态
	 */
	private String secondFormatId;
	
	/**
	 * 专业团队 
	 */
	private String specializedTeamsName;
	
	/**
	 * 状态
	 */
	private String statusCd;
    
	/**
	 * 开始时间
	 */
	@DateTimeFormat(pattern="yyyy-MM-dd")
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone="GMT+8")
    private Date startDate;
	
	private String startDateStr;
	
	/**
	 * 结束时间
	 */
	@DateTimeFormat(pattern="yyyy-MM-dd")
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone="GMT+8")
    private Date endDate;
	
	private String endDateStr;
	
	/**
	 * 当前登陆渠道视图工号id
	 */
	private Long loginStaffId;
	
	/**
	 * 当前工号在3.0所属集合
	 */
	private List<String> sysRoleIds;
     
	/**
	 * 当前登陆用户工号
	 */
	private String loginSysUserCode;
	
	/**
	 * 文件导出类型
	 */
	private String exportType;
}
