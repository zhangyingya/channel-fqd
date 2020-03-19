package com.tydic.generalChannelView.generalChannel.bean;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import com.tydic.common.BaseBean;
/**
 * 泛渠道业态
 * @author Administrator
 *
 */
@Setter
@Getter
@ToString
public class GeneralChannelFormat extends BaseBean{/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private Long id;
	
	private Long parId;
	
	private String value;
	
	private String type;
	
	private String statusCd;
	
	private String description;
	
}
