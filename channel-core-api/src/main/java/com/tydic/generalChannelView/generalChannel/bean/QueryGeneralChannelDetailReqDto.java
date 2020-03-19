package com.tydic.generalChannelView.generalChannel.bean;

import java.io.Serializable;

import javax.validation.constraints.NotNull;

import lombok.Data;

@Data
public class QueryGeneralChannelDetailReqDto implements Serializable {/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@NotNull(message="泛渠道Id不能为空!")
	private String id;
}
