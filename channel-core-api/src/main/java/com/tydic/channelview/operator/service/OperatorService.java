package com.tydic.channelview.operator.service;

import com.tydic.channelview.operator.bean.OperatorBean;
import com.tydic.common.service.IService;

public interface OperatorService extends IService<OperatorBean> {

    OperatorBean findOperatorById(Long operatorsId) ;
    
    void addOperator(OperatorBean operatorBean);

    int deleteOperatorById(Long operatorsId);

    int updateOperatorById(OperatorBean operatorBean);
}
