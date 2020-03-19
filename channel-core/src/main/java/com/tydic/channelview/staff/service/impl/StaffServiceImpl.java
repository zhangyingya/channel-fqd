package com.tydic.channelview.staff.service.impl;

import java.util.List;

import javax.annotation.Resource;

import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Service;

import com.tydic.channelview.staff.bean.StaffBean;
import com.tydic.channelview.staff.mapper.StaffBeanMapper;
import com.tydic.channelview.staff.service.StaffService;
import com.tydic.common.BaseMapper;
import com.tydic.common.PageContext;
import com.tydic.common.page.PageResult;
import com.tydic.common.service.AbstractService;

@Service
@Slf4j
public class StaffServiceImpl extends AbstractService<StaffBean> implements StaffService
{

    @Resource
    private StaffBeanMapper staffBeanMapper;

    @Override
    public BaseMapper<StaffBean> getMapper()
    {
        return null;
    }

    @Override
    public StaffBean findStaffById(Long staffId)
    {
        return staffBeanMapper.selectByPrimaryKey(staffId);
    }

    @Override
    public void addStaff(StaffBean staffBean)
    {
        staffBeanMapper.insert(staffBean);      
    }

    @Override
    public int deleteStaffById(Long staffId)
    {
        return staffBeanMapper.deleteByPrimaryKey(staffId);
    }

    @Override
    public int updateStaffById(StaffBean staffBean)
    {
        return staffBeanMapper.updateByPrimaryKey(staffBean);
    }

	@Override
	public PageResult<StaffBean> findAllByChannelId(StaffBean staffBean) {
		List<StaffBean> staffBeans = staffBeanMapper.findAllByChannelId(staffBean);
		return new PageResult<StaffBean>(staffBean, PageContext.getPageTotal(), staffBeans);
	}

    @Override
    public StaffBean findByStaffCode(String staffCode) {
    	StaffBean staffBean = null;
    	try {
    		staffBean = staffBeanMapper.findByStaffCode(staffCode);
		} catch (Exception e) {
			log.error("根据工号查询用户详情失败：staffCode = {}," + e.getMessage(), staffCode);
		}
    	
    	return staffBean;
    }
    
}
