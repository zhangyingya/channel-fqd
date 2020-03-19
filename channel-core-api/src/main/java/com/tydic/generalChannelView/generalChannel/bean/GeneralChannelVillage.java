package com.tydic.generalChannelView.generalChannel.bean;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import com.tydic.common.BaseBean;
/**
 * 泛渠道乡村
 * @author Administrator
 *
 */
@Setter
@Getter
@ToString
public class GeneralChannelVillage extends BaseBean {
	
	private static final long serialVersionUID = 1L;
	
	private Long latnId;
	
	private String latnName;
	
	private Long regionId;
	
	private String regionName;
	
	private Long townId;
	
	private String townName;
	
	private Long villageId;
	
	private String villageName;
	
	private String statusCd;
	
	private String type;			//10  乡村类型
	
	private String description;
	
	private String distinctTown;
}
