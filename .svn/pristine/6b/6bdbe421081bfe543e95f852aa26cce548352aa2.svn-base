package com.tydic.channelview.staff.service;

import com.tydic.channelview.staff.bean.StaffBean;
import com.tydic.common.page.PageResult;
import com.tydic.common.service.IService;

public interface StaffService extends IService<StaffBean> 
{
    StaffBean findStaffById(Long staffId) ;
    
    void addStaff(StaffBean staffBean);
    
    int deleteStaffById(Long staffId);

    int updateStaffById(StaffBean staffBean);
    
    PageResult<StaffBean> findAllByChannelId(StaffBean staffBean);
    
    StaffBean findByStaffCode(String staffCode);
}
