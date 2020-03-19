package com.tydic.channelview.channel.mapper;

import java.util.List;

import com.tydic.channelview.channel.bean.ChannelBean;
import com.tydic.common.BaseMapper;

public interface ChannelBeanMapper extends BaseMapper<ChannelBean> {


    void insert(ChannelBean channelBean);

    int deleteByPrimaryKey(Integer channelId);
    
    int updateByPrimaryKey(ChannelBean channelBean);
     
    ChannelBean selectByPrimaryKey(Integer channelId);
    
    List<ChannelBean> findAll(ChannelBean channelBean);
    
    Long countFindAllByHanderPage(ChannelBean channelBean);
    
    List<ChannelBean> findAllByHanderPage(ChannelBean channelBean);
    
}