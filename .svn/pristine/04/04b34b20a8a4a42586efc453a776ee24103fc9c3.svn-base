package com.tydic.channelview.staff.mapper;

import java.util.List;

import com.tydic.channelview.staff.bean.StaffBean;
import com.tydic.common.BaseMapper;

public interface StaffBeanMapper  extends BaseMapper<StaffBean>{
    void insert(StaffBean record);
    
    int deleteByPrimaryKey(Long staffId);

    StaffBean selectByPrimaryKey(Long staffId);

    int updateByPrimaryKey(StaffBean record);
    
    List<StaffBean> findAllByChannelId(StaffBean staffBean);
    
    StaffBean findByStaffCode(String staffCode);

	Long findAllByChannelIdCount(StaffBean staffBean);
}