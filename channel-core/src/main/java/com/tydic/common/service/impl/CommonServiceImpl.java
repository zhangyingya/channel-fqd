package com.tydic.common.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.tydic.common.BaseMapper;
import com.tydic.common.SpringContext;
import com.tydic.common.bean.CommonRegion;
import com.tydic.common.bean.RoleType;
import com.tydic.common.service.AbstractService;
import com.tydic.common.service.CommonService;
import com.tydic.common.utils.ObjectIsNull;

@Service
public class CommonServiceImpl  extends AbstractService<CommonRegion> implements CommonService {
	
	@Override
	public String getRoleType(String sysUserCode, List<String> sysRoleIds) {
		//泛渠道-省级角色
		String provinceRoleId  = SpringContext.getProperty("province.role.id") == null ? "" : SpringContext.getProperty("province.role.id");
		//泛渠道-市级角色
		String cityRoleId  = SpringContext.getProperty("city.role.id") == null ? "" : SpringContext.getProperty("city.role.id");
		//泛渠道-区县角色
		String areaRoleId  = SpringContext.getProperty("area.role.id") == null ? "" : SpringContext.getProperty("area.role.id");
		//泛渠道-普通角色
		String generalRoleId  = SpringContext.getProperty("general.role.id") == null ? "" : SpringContext.getProperty("general.role.id");
		
		if (!ObjectIsNull.check(sysRoleIds) && sysRoleIds.size() > 0) {
			StringBuffer stringBuffer = new StringBuffer();

			for (String sysRoleId : sysRoleIds) {
				stringBuffer.append(sysRoleId);
				stringBuffer.append(",");
			}
			
			// 省级角色信息
			if (stringBuffer.toString().contains(provinceRoleId)) {
				return RoleType.PROVINCE.getKey();
			}
			
			// 市级角色信息
			if (stringBuffer.toString().contains(cityRoleId)) {
				return RoleType.CITY.getKey();
			}
			
			// 区县角色信息
			if (stringBuffer.toString().contains(areaRoleId)) {
				return RoleType.AREA.getKey();
			}

			// 普通角色
			if (stringBuffer.toString().contains(generalRoleId)) {
				return RoleType.GENERAL.getKey();
			}
		}
		
		return RoleType.OTHER.getKey();
	}

	@Override
	public BaseMapper<CommonRegion> getMapper() {
		return null;
	}
}
