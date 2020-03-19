package com.tydic.common.utils;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.tydic.common.SpringContext;
import com.tydic.common.bean.CodeModel;
import com.tydic.common.service.CodeTypeService;

/**
 * 
 * @author yuanxh
 *
 */
public class CodeTypeManager {

	private static final Logger logger = LoggerFactory.getLogger(CodeTypeManager.class.getName());
	
	private static CodeTypeManager instance;
	
	private CodeTypeService codeTypeService;
	
	private CodeTypeManager() {
		codeTypeService = SpringContext.getBean("codeTypeService",CodeTypeService.class);
	}
	
	public static CodeTypeManager getInstance() {
		if(instance == null) {
			instance = new CodeTypeManager();
		}
		return instance;
	}
	
	/*public Map<String, Map<String, String>> getModelMap(String moduleCode)
	{
		byte[] obj = redisManager.get(new String("CodeManager.moduleCode." + moduleCode).getBytes());
		if (obj != null)
		{
			return (Map<String, Map<String, String>>) ((CacheObject)ObjectUtil.ByteToObject(obj) ).getObj();
		}
		return null;
	}*/
	
	public String getTypeName(String codeType, String codeCType) {
		try {
			if(ObjectIsNull.check(codeType) || ObjectIsNull.check(codeCType)) {
				logger.error("codeType和codeCType不能为空:"+codeType+"---"+codeCType);
			}
			CodeModel param = new CodeModel();
			param.setCodeType(codeType);
			param.setCodeCType(codeCType);
			List<CodeModel> codeModels = codeTypeService.findCodeByParam(param);
			if(!ObjectIsNull.check(codeModels)) {
				return codeModels.get(0).getCodeName();
			}
			
		}catch (Exception e) {
			throw new RuntimeException(e.getMessage(), e);
		}
		return "";
	}
	
	public String getDescByCType(String codeType, String codeCType) {
		try {
			if(ObjectIsNull.check(codeType) || ObjectIsNull.check(codeCType)) {
				logger.error("codeType和codeCType不能为空:"+codeType+"---"+codeCType);
			}
			CodeModel param = new CodeModel();
			param.setCodeType(codeType);
			param.setCodeCType(codeCType);
			List<CodeModel> codeModels = codeTypeService.findCodeByParam(param);
			if(!ObjectIsNull.check(codeModels)) {
				return codeModels.get(0).getCodeDesc();
			}
			
		}catch (Exception e) {
			throw new RuntimeException(e.getMessage(), e);
		}
		return "";
	}
	
	public String getTypeNameByValue(String codeType, String value) {
		try {
			if(ObjectIsNull.check(codeType) || ObjectIsNull.check(value)) {
				logger.error("codeType和value不能为空:"+codeType+"---"+value);
			}
			CodeModel param = new CodeModel();
			param.setCodeType(codeType);
			param.setCodeValue(value);
			List<CodeModel> codeModels = codeTypeService.findCodeByParam(param);
			if(!ObjectIsNull.check(codeModels)) {
				return codeModels.get(0).getCodeName();
			}
		}catch (Exception e) {
			throw new RuntimeException(e.getMessage(), e);
		}
		return "";
	}
	
	public String getTypeValue(String codeType, String codeCType) {
		try {
			if(ObjectIsNull.check(codeType) || ObjectIsNull.check(codeCType)) {
				logger.error("codeType和codeCType不能为空:"+codeType+"---"+codeCType);
			}
			CodeModel param = new CodeModel();
			param.setCodeType(codeType);
			param.setCodeCType(codeCType);
			List<CodeModel> codeModels = codeTypeService.findCodeByParam(param);
			if(!ObjectIsNull.check(codeModels)) {
				return codeModels.get(0).getCodeValue();
			}
			
		}catch (Exception e) {
			throw new RuntimeException(e.getMessage(), e);
		}
		return "";
	}
	/**
	 * 根据codeType+value获取codeCType
	 * @param codeType
	 * @param value
	 * @return
	 */
	public String getCodeCTypeByValue(String codeType, String value) {
		try {
			if(ObjectIsNull.check(codeType) || ObjectIsNull.check(value)) {
				logger.error("codeType和value不能为空:"+codeType+"---"+value);
			}
			CodeModel param = new CodeModel();
			param.setCodeType(codeType);
			param.setCodeValue(value);
			List<CodeModel> codeModels = codeTypeService.findCodeByParam(param);
			if(!ObjectIsNull.check(codeModels)) {
				return codeModels.get(0).getCodeCType();
			}
			
		}catch (Exception e) {
			throw new RuntimeException(e.getMessage(), e);
		}
		return "";
	}
	
	/*public String getMapperValueByCodeType(String codeType, String mapperCode) {
		Map<String, String[]> map = null;
		try {
			map = getCodeTypeArray(codeType);
			if (null == map || StringUtils.isBlank(mapperCode)) {
				return null;
			}
			Iterator<Entry<String, String[]>> iterator = map.entrySet().iterator();
			Entry<String, String[]> entry = null;
			while (iterator.hasNext()) {
				entry = iterator.next();
				if (mapperCode.equals(entry.getValue()[2])) {
					return entry.getValue()[0];
				}
			}
			return null;
		} catch (Exception e) {
			logger.debug("======================================" + map);
			throw new RuntimeException(e.getMessage(), e);
		}
	}*/
	
	@SuppressWarnings("unchecked")
	public Map<String, String[]> getCodeTypeArray(String codeType) {
		Map<String, String[]> result = new HashMap<String, String[]>();
		try {
			if(ObjectIsNull.check(codeType)) {
				logger.error("codeType不能为空:"+codeType);
			}
			CodeModel param = new CodeModel();
			param.setCodeType(codeType);
			List<CodeModel> codeModels = codeTypeService.findCodeByParam(param);
			if(!ObjectIsNull.check(codeModels)) {
				String strCodeCType = null;
				String[] array = null;
				for (CodeModel code : codeModels) {
					array = new String[4];
					strCodeCType = code.getCodeCType();
					array[0] = code.getCodeValue();
					array[1] = code.getCodeName();
					array[2] = code.getMappingValue();
					array[3] = code.getCodeDesc();
					result.put(strCodeCType, array);
				}
			}
		}catch (Exception e) {
			throw new RuntimeException(e.getMessage(), e);
		}
		return result;
	}

	public CodeTypeService getCodeTypeService() {
		return codeTypeService;
	}

	public void setCodeTypeService(CodeTypeService codeTypeService) {
		this.codeTypeService = codeTypeService;
	}
}
