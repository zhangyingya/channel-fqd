package com.tydic.channelview.staff;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.tydic.channelview.staff.bean.StaffBean;
import com.tydic.channelview.staff.service.StaffService;
import com.tydic.common.controller.AbstractController;
import com.tydic.common.page.PageResult;

@RestController
@RequestMapping("/staff")
public class StaffController extends AbstractController {
    
	@Autowired
    private StaffService staffService;
    
    @RequestMapping("findAllByChannelId")
    @ResponseBody
    public PageResult<StaffBean> findAllByChannelId(HttpServletRequest request, StaffBean staffBean) {
    	setPageInfo(request, staffBean);
        return staffService.findAllByChannelId(staffBean);
    }
}
