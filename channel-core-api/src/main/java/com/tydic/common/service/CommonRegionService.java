package com.tydic.common.service;

import java.util.List;
import java.util.Map;

import com.tydic.channelview.staff.bean.StaffBean;
import com.tydic.common.bean.CommonRegion;
import com.tydic.common.page.PageResult;

public interface CommonRegionService extends IService<CommonRegion> {
	/**
	 * 查询公共管理区域列表-分页
	 * @param commonRegion
	 * @return
	 */
	PageResult<CommonRegion> findAll(CommonRegion commonRegion);
	
	/**
	 * 本地网下拉框列表
	 * @return
	 */
	List<Map<String, Object>> findAllBy1300();
	
	/**
	 * 本地网下拉框列表
	 * @param staff  员工
	 * @return
	 */
	Map<String, Object> findAllBy1300AndStaff(StaffBean staff);
	
	/**
	 * 区县/乡镇下拉框列表
	 * @param parRegionId
	 * @return
	 */
	List<Map<String, Object>> findAllByParRegionId(Long parRegionId);
	
	
	/**
	 * 区县/乡镇下拉框列表
	 * @param parRegionId 
	 * @param staff 员工
	 * @return
	 */
	Map<String, Object> findAllByParRegionIdAndStaff(Long parRegionId, StaffBean staff);
	
	
	/**
	 * 查看详情
	 * @param regionId
	 * @return
	 */
	CommonRegion findById(Long regionId);
	
	/**
	 * 根据srcRegionId查询详情
	 * @param srcRegionId
	 * @return
	 */
	CommonRegion findBySrcRegionId(Long srcRegionId);
}
