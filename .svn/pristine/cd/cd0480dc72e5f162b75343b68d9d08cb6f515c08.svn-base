package com.tydic.channelview.operator.service.impl;

import javax.annotation.Resource;
import com.tydic.channelview.channel.bean.ChannelBean;
import com.tydic.channelview.channel.service.ChannelService;
import com.tydic.channelview.operator.bean.OperatorBean;
import com.tydic.channelview.operator.mapper.OperatorBeanMapper;
import com.tydic.channelview.operator.service.OperatorService;
import com.tydic.common.BaseMapper;
import com.tydic.common.service.AbstractService;

public class OperatorServiceImpl extends AbstractService<OperatorBean> implements OperatorService
{

    @Resource
    private OperatorBeanMapper operatorBeanMapper;

    @Override
    public BaseMapper<OperatorBean> getMapper()
    {
        return null;
    }

    @Override
    public OperatorBean findOperatorById(Long operatorsId)
    {
        return operatorBeanMapper.selectByPrimaryKey(operatorsId);
    }

    @Override
    public void addOperator(OperatorBean operatorBean)
    {
       operatorBeanMapper.insert(operatorBean);
    }

    @Override
    public int deleteOperatorById(Long operatorsId)
    {
        return operatorBeanMapper.deleteByPrimaryKey(operatorsId);
    }

    @Override
    public int updateOperatorById(OperatorBean operatorBean)
    {
        return operatorBeanMapper.updateByPrimaryKey(operatorBean);
    }
  
    
}
