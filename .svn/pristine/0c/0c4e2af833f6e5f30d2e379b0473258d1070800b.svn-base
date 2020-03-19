package com.tydic.generalChannelView.report.bean;

import java.math.BigDecimal;
import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.tydic.common.BaseBean;
import com.tydic.generalChannelView.business.bean.BusinessBillOrderReqDto;

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
public class GeneralChanenlAndBusinessBillReport extends BaseBean {
	/**
	 * 序列化
	 */
	private static final long serialVersionUID = 1L;
	/**
	 *
		地市（按照层级、市、区县、五级片区、结对门店下钻）	
		结对厅店编码	
		商机单量
		商机完成量	
		商机结单完成率	
		商机转化成功量	
		转化成功率	
		泛渠道网点数	
		泛渠道店均甩单数	
		泛渠道店均甩单成功数	
		有效泛渠道网点数	
		活跃泛渠道网点数	
		村代触点活跃率	
		乡镇泛渠道活跃率
	 *
	 */
	/**
	 * 本地网
	 */
	private String latnName;
	
	private Integer latnId;
	/**
	 * 区县
	 */
	private String regionName;
	private Integer regionId;
	/**
	 * 结对渠道名称
	 */
	private String channelName;
	/**
	 * 结对渠道编码
	 */
	private String channelNbr;
	/**
	 * 泛渠道名称
	 */
	private String generalChannelName;
	/**
	 * 泛渠道编码
	 */
	private String generalChannelCode;
	/**
	 * 商机单量
	 */
	private Integer countBusinessBills;
	/**
	 * 商机完成量	
	 */
	private Integer countCompleteBusinessBills;
	/**
	 * 商机结单完成率	
	 */
	private String percentCompleteBusinessBill;
	/**
	 * 商机转化成功量	
	 */
	private Integer countBusinessToOrder;
	/**
	 * 转化成功率
	 */
	private String percentBusinessToOrder;
	/**
	 * 泛渠道网点数	
	 */
	private Integer countGeneralChannels;
	/**
	 * 泛渠道店均甩单数	
	 */
	private Integer averageGeneralChannelToOrder;
	/**
	 * 泛渠道店均甩单成功数
	 */
	private Integer averageCompleteGeneralChannelToOrder;
	/**
	 * 有效泛渠道网点数	
	 */
	private Integer countEffectiveGeneralChannel;
	/**
	 * 活跃泛渠道网点数	
	 */
	private Integer countActiveGeneralChannel;
	/**
	 * 村代触点活跃率
	 */
	private Integer countActiveVillegeChild;
	private Integer countActiveVillegePar;
	
	private String percentActiveVillege;
	/**
	 * 乡镇泛渠道活跃率
	 */
	private Integer countActiveTownChild;
	private Integer countActiveTownPar;
	
	private String percentActiveTown;
	/**
	 * 商机单ID
	 */
	private Integer businessBillId;
	/**
	 * 商机单客户名称
	 */
	private String customerName;
	/**
	 * 商机单客户电话
	 */
	private String customerPhone;
	
	private String customerAddr;
	
	private String customerRemark;
	
	//业务办理结果 : 10未处理商机单，20转订单成功,30用户拒绝,40商机单业务办理中"
	private String businessBillStatusCd = "10";
	
	//用户拒绝理由
	private String customerRejectReason;
	
	//业务类型（10，手机类型，20管带业务，30其他业务）
	private String businessBillType = "10";
	
	@DateTimeFormat(pattern="yyyy-MM-dd")
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone="GMT+8")
    private Date businessBillCreateDate;
	
	
    @DateTimeFormat(pattern="yyyy-MM-dd")
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone="GMT+8")
    private Date businessBillUpdateDate;

    private String updateStaffName;
	
	

	private String townName;
	private String villageName;
	
	private String specializedTeamsName;
	
	private BusinessBillOrderReqDto businessBillOrder;
}
