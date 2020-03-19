package com.tydic.generalChannelView.generalChannel.service.impl;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import com.alibaba.dubbo.config.annotation.Service;
import com.tydic.channelview.staff.bean.StaffBean;
import com.tydic.channelview.staff.mapper.StaffBeanMapper;
import com.tydic.common.BaseMapper;
import com.tydic.common.PageContext;
import com.tydic.common.SpringContext;
import com.tydic.common.bean.Result.ResultFlag;
import com.tydic.common.exception.ServiceException;
import com.tydic.common.page.PageResult;
import com.tydic.common.service.AbstractService;
import com.tydic.common.service.CommonService;
import com.tydic.common.utils.JsonUtil;
import com.tydic.common.utils.ObjectIsNull;
import com.tydic.generalChannelView.app.AppResult;
import com.tydic.generalChannelView.business.bean.BusinessBill;
import com.tydic.generalChannelView.business.mapper.BusinessBillMapper;
import com.tydic.generalChannelView.generalChannel.bean.GeneralChannel;
import com.tydic.generalChannelView.generalChannel.bean.GeneralChannelVillage;
import com.tydic.generalChannelView.generalChannel.bean.QueryGeneralChannelDetailReqDto;
import com.tydic.generalChannelView.generalChannel.bean.QueryGeneralChannelDetailResDto;
import com.tydic.generalChannelView.generalChannel.mapper.GeneralChannelMapper;
import com.tydic.generalChannelView.generalChannel.mapper.GeneralChannelVillageMapper;
import com.tydic.generalChannelView.generalChannel.service.GeneralChannelService;
import com.tydic.generalChannelView.marketActvity.bean.MarketActvity;
import com.tydic.generalChannelView.marketActvity.bean.MarketActvityResDto;
import com.tydic.generalChannelView.marketActvity.mapper.MarketActvityMapper;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class GeneralChannelServiceImpl extends AbstractService<GeneralChannel> implements GeneralChannelService {
	
	@Resource
	private GeneralChannelMapper generalChannelMapper ;
	
	@Resource
	private MarketActvityMapper marketActvityMapper;
	
	@Resource
	private BusinessBillMapper businessBillMapper;
	
	@Resource
	private GeneralChannelVillageMapper villageMapper;
	
	@Resource 
	StaffBeanMapper staffBeanMapper;
	
	@Autowired
	private CommonService commonService;

	@Override
	public PageResult<GeneralChannelVillage> findTownNames(GeneralChannelVillage village) {
		
		List<GeneralChannelVillage> villages = villageMapper.findTownNames(village);
		
		return new PageResult<GeneralChannelVillage>(village, PageContext.getPageTotal(), villages);
	}
	
	@Override
	public PageResult<GeneralChannelVillage> findVillageNames(GeneralChannelVillage village) {
		
		List<GeneralChannelVillage> villages = villageMapper.findVillageNames(village);
		
		return new PageResult<GeneralChannelVillage>(village, PageContext.getPageTotal(), villages);
	}
	
	@Override
	public BaseMapper<GeneralChannel> getMapper() {
		return null;
	}

	@Override
	public PageResult<GeneralChannel> findAll(GeneralChannel generalChannel) {
		//查询员工信息
		StaffBean staffBean = staffBeanMapper.findByStaffCode(generalChannel.getLoginSysUserCode());
		//获取角色类型
		String roleType = commonService.getRoleType(generalChannel.getLoginSysUserCode(), generalChannel.getSysRoleIds());
		
		if ("general".equals(roleType)) {
			generalChannel.setLoginStaffId(staffBean.getStaffId());
		}
		
		if ("other".equals(roleType)) {
			return null;
		}
		
		List<GeneralChannel> resultChannels = generalChannelMapper.findAll(generalChannel);
		
		return new PageResult<GeneralChannel>(generalChannel, PageContext.getPageTotal(), resultChannels);
	}
	
	@Override
	@Transactional
	public void add(GeneralChannel generalChannel) {
		Long totalCodes = isExistGeneralChannelCode(generalChannel.getCode());
		
		if (totalCodes.longValue() > 1) {
			throw new ServiceException("泛渠道编码已存在！");
		}
		
		generalChannelMapper.insert(generalChannel);
	}
	
	@Override
	@Transactional
	public void edit(GeneralChannel entity) {
		generalChannelMapper.update(entity);
	}
	
	@Override
	public GeneralChannel find(long id) {
		Integer generalChannelId = Integer.valueOf(String.valueOf(id));
		
		GeneralChannel generalChannel = generalChannelMapper.selectById(generalChannelId);
		
		List<MarketActvity> marketActvities = marketActvityMapper.findAllByGeneralChannelId(generalChannelId);
		
		List<BusinessBill> businessBills = businessBillMapper.findAllByGeneralChannelId(generalChannelId);
		
		generalChannel.setMarketActvities(marketActvities);
		generalChannel.setBusinessBills(businessBills);
		
		return generalChannel;
	}
	
	@Override
	public AppResult<QueryGeneralChannelDetailResDto> findById(QueryGeneralChannelDetailReqDto generalChannelDetailReqDto) {
		log.info("App查看泛渠道详情，请求参数： {}", JsonUtil.objToStr(generalChannelDetailReqDto));
		AppResult<QueryGeneralChannelDetailResDto> appResult = new AppResult<QueryGeneralChannelDetailResDto>();
		
		if (ObjectIsNull.check(generalChannelDetailReqDto)) {
			new AppResult<QueryGeneralChannelDetailResDto>(ResultFlag.FAIL.toString(), "泛渠道详情，请求对象不能为空！");
		}
		
		if (ObjectIsNull.check(generalChannelDetailReqDto.getId())) {
			new AppResult<QueryGeneralChannelDetailResDto>(ResultFlag.FAIL.toString(), "泛渠道详情，请求对象ID不能为空！");
		}
		
		QueryGeneralChannelDetailResDto generalChannelResDto = new QueryGeneralChannelDetailResDto();
		List<MarketActvityResDto> marketActvityResDtos = new ArrayList<MarketActvityResDto>();
		
		//获取泛渠道详情
		Integer generalChannelId = Integer.valueOf(generalChannelDetailReqDto.getId());
		
		GeneralChannel generalChannel = generalChannelMapper.selectById(generalChannelId);
		if (!ObjectIsNull.check(generalChannel)) {
			generalChannelResDto.setId(generalChannel.getId());
			generalChannelResDto.setName(generalChannel.getName());
			generalChannelResDto.setCode(generalChannel.getCode());
			generalChannelResDto.setAddr(generalChannel.getAddr());
			generalChannelResDto.setPhone(generalChannel.getPhone());
			generalChannelResDto.setStaffName(generalChannel.getStaffName());
			generalChannelResDto.setSalesCode(generalChannel.getSalesCode());
			generalChannelResDto.setStatusCd(generalChannel.getStatusCd());
			generalChannelResDto.setCreateDate(generalChannel.getCreateDate());
			generalChannelResDto.setRemark(generalChannel.getRemark());
			
			generalChannelResDto.setChannelId(generalChannel.getChannelId());
			generalChannelResDto.setChannelNbr(generalChannel.getChannelNbr());
			generalChannelResDto.setChannelName(generalChannel.getChannelName());
			
			generalChannelResDto.setCommonRegionId(generalChannel.getCommonRegionId());
			generalChannelResDto.setRegionName(generalChannel.getRegionName());
			generalChannelResDto.setChildCommonRegionId(generalChannel.getChildCommonRegionId());
			generalChannelResDto.setChildRegionName(generalChannel.getChildRegionName());
			generalChannelResDto.setCommonRegionTownId(generalChannel.getCommonRegionTownId());
			generalChannelResDto.setCommonRegionTownName(generalChannel.getCommonRegionTownName());
			generalChannelResDto.setVillageName(generalChannel.getVillageName());
			
			generalChannelResDto.setFirstFormatId(generalChannel.getFirstFormatId());
			generalChannelResDto.setFirstFormatName(generalChannel.getFirstFormatName());
			generalChannelResDto.setSecondFormatName(generalChannel.getSecondFormatName());
			
			generalChannelResDto.setSpecializedTeamsId(generalChannel.getSpecializedTeamsId());
			generalChannelResDto.setSpecializedTeamsName(generalChannel.getSpecializedTeamsName());
			
			generalChannelResDto.setIfCity(generalChannel.getIfCity());
			generalChannelResDto.setIfOld(generalChannel.getIfOld());
			generalChannelResDto.setIfShop(generalChannel.getIfShop());
			generalChannelResDto.setShopCode(generalChannel.getShopCode());
		}
		
		//获取二维码地址
		String qrcodeUrl = "";
		String serverUrl = "";
		
		if ("1".equals(generalChannel.getIfOld())) {
			serverUrl = SpringContext.getProperty("general.channel.qrcode.old.url");
		} else {
			serverUrl = SpringContext.getProperty("general.channel.qrcode.new.url");
		}
		
		if (!ObjectIsNull.check(serverUrl)) {
			qrcodeUrl = serverUrl + generalChannelDetailReqDto.getId() ;
			generalChannelResDto.setQrcodeUrl(qrcodeUrl);
		} else {
			log.error("配置文件读取二维码地址失败");
		}
		//获取关联营销活动
		List<MarketActvity> marketActvities = marketActvityMapper.findAllByGeneralChannelId(generalChannelId);
		if (!ObjectIsNull.check(marketActvities) && marketActvities.size() > 0) {
			for (MarketActvity marketActvity : marketActvities) {
				MarketActvityResDto marketActvityResDto = new MarketActvityResDto();
				BeanUtils.copyProperties(marketActvity, marketActvityResDto);
				
				marketActvityResDtos.add(marketActvityResDto);
			}
		}
		
		generalChannelResDto.setMarketActvityResDtos(marketActvityResDtos);
		
		appResult.setFlag(ResultFlag.SUCCESS.toString());
		appResult.setMessage("成功");
		appResult.setData(generalChannelResDto);
		
		log.info("查看泛渠道详情，返回结果： {}", JsonUtil.objToStr(appResult));
		
		return appResult;
	}
	
	@Override
	public String getGeneralChannelCode(String channelNbr) {
		return getCode(channelNbr);
	}
	
	private String getCode(String channelNbr) {
		String code = "";
		//Random r=new Random();
		String channelSub = channelNbr.substring(0, 6);
		//int randomNum = r.nextInt(99999) + 800000;
		
		Integer id = selectPrimaryKey();
		
		code = "G" + channelSub + String.valueOf(id).substring(0, 6);
		
		Long totalCodes = generalChannelMapper.isExistGeneralChannelCode(code);
		
		if (totalCodes.longValue() < 1) {
			return code;
		} else {
			getCode(channelNbr);
		}
		
		return code;
	}
 	
	private Long isExistGeneralChannelCode(String code) {
		Long totalCodes = generalChannelMapper.isExistGeneralChannelCode(code);
		
		return totalCodes;
		
	}
	
	private Integer selectPrimaryKey() {
		return generalChannelMapper.selectPrimaryKey();
	}

	@Override
	@Transactional
	public void deleteByIds(GeneralChannel generalChannel) {
		generalChannelMapper.deleteByIds(generalChannel);
	}

	@Override
	@Transactional
	public void deleteById(Integer id) {
		generalChannelMapper.deleteById(id);
	}
	
	@Override
	public Boolean isExistTelePhone(String phone) {
		Long countPhone = generalChannelMapper.isExistGeneralChannelPhone(phone);
		
		if (countPhone.longValue() > 0) {
			return true;
		}
		
		return false;
	}
}
