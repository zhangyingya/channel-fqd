package com.tydic.channelview.channel;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tydic.channelview.channel.bean.ChannelBean;
import com.tydic.channelview.channel.service.ChannelService;
import com.tydic.common.controller.AbstractController;
import com.tydic.common.page.PageResult;
import com.tydic.sso.bean.SystemUserDetail;

@Controller
@RequestMapping("/channel")
public class ChannelController extends AbstractController {
    
	@Autowired
    private ChannelService channelService;
    
    @RequestMapping("findAll")
    @ResponseBody
    public PageResult<ChannelBean> findAll(HttpServletRequest request, ChannelBean channelBean) {
    	setPageInfo(request, channelBean);
    	SystemUserDetail userDetail = getLoginUserInfo(request);
    	channelBean.setLoginSysUserCode(userDetail.getAuthSystemUser().getSysUserCode());
    	channelBean.setSysRoleIds(findRoleIds(userDetail.getAuthSystemUser().getSysUserId()));
		
        return channelService.findAll(channelBean);
    }
    
}
