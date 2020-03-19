package com.tydic.channelview.channel.bean;

import java.io.Serializable;
import java.util.List;

import javax.validation.constraints.NotNull;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class QueryChannelReqDto  implements Serializable {
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	/**
	 * 渠道单元实体类
	 */
	
	@NotNull(message="当前页数不能为空")
	private String pageSize;
	
	@NotNull(message="当前页不能为空")
	private String curPage;

	/**
	 * 营业厅id
	 */
	private Integer channelId;
	/**
	 * 营业厅名称
	 */
    private String channelName;
    /**
     * 营业厅编码
     */
    private String channelNbr;
    /**
     * 本地网
     */
    private String latnId;
    /**
     * 区县
     */
    private String regionId;
    /**
     * 当前登陆工号
     */
    private String loginSysUserCode;
    /**
     * 当前工号所属角色id集合
     */
    private List<String> sysRoleIds;
}