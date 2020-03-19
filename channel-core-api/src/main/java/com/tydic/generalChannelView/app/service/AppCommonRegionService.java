package com.tydic.generalChannelView.app.service;

import java.util.List;

import com.tydic.common.bean.CommonRegion;
import com.tydic.common.service.IService;
import com.tydic.generalChannelView.app.AppResult;
import com.tydic.generalChannelView.app.bean.AppCommonRegionReqDto;
import com.tydic.generalChannelView.app.bean.AppCommonRegionResDto;

public interface AppCommonRegionService extends IService<CommonRegion> {

	/**
	 * 泛渠道-查询员工本地网列表
	 * @param appCommonRegionReqDto
	 * @return
	 */
	AppResult<List<AppCommonRegionResDto>> findLatnList(AppCommonRegionReqDto appCommonRegionReqDto);
	
	
	/**
	 * 泛渠道-查询员工区县列表
	 * @param appCommonRegionReqDto
	 * @return
	 */
	AppResult<List<AppCommonRegionResDto>> findRegionList(AppCommonRegionReqDto appCommonRegionReqDto);
}
