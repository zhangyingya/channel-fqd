package com.tydic.schedule.task;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;

import javax.annotation.PostConstruct;
import javax.annotation.Resource;
import javax.sql.DataSource;

import lombok.extern.slf4j.Slf4j;

import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.tydic.common.SpringContext;
import com.tydic.common.ThreadPool;
import com.tydic.common.http.HttpClientUtils;
import com.tydic.common.utils.ListSplitUtil;
import com.tydic.report.report13List.bean.ChannelSales;
import com.tydic.report.report13List.service.ChannelSalesService;

@Slf4j
@Component
public class ChannelSales13ReportTask implements Job {
	
	private String url = SpringContext.getProperty("channelSales13ReportUrl");
	
	//静态初始化当前类
	private static ChannelSales13ReportTask channelSales13ReportTask;
	
	@Resource
	private ChannelSalesService channelSalesService;
	
	@Resource
	private ThreadPool threadPool;
	
	@PostConstruct
	public void init(){
		channelSales13ReportTask = this;
	}

	@Override
	public void execute(JobExecutionContext arg0) throws JobExecutionException {
		if(SpringContext.getApplicationContext() == null){
			log.error("任务未执行！");
			return;
		}
		
		log.info("调用13月销量报表接口开始执行！");
		//调用13月销量报表，插入表
		sendDataToChannelSales();
	}
	
	@SuppressWarnings("rawtypes")
	public void sendDataToChannelSales(){
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMM");
        Date date = new Date();
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date); // 设置为当前时间
        calendar.set(Calendar.MONTH, calendar.get(Calendar.MONTH) - 1); // 设置为上一个月
        date = calendar.getTime();
        String monthId = dateFormat.format(date);
		//String monthId = new SimpleDateFormat("yyyyMM").format(new Date());
		Map<String ,Object> rootMap = new HashMap<String ,Object>();
		rootMap.put("TOKEN", "278DD7A6A9574889931716C7A0D0AC09");
		rootMap.put("ID", "49");
		rootMap.put("PARAM", "{acct_month:" + monthId + "}");
		String param = JSON.toJSONString(rootMap);
		log.info("调用13月销量报表接口报文为： {}", param);
		Long dataSize = 0L;
		Map<String, Object> logParam = new HashMap<String, Object>();
		logParam.put("monthId", monthId);
		logParam.put("count", dataSize);
		logParam.put("isSuccess", 1);	//0：成功  1：失败
		try{
			String result = HttpClientUtils.doPost(url, param);
			
			if(result == null || "".equals(result)){
				log.info("调用13月销量报表返回为空！");
				logParam.put("exception", "调用13月销量报表返回为空！");
				channelSales13ReportTask.channelSalesService.insertChannelSalesLog(logParam);
				return;
			}
			
			if("error".equals(result)){
				log.info("调用13月销量报表接口响应失败！");
				logParam.put("exception", "调用13月销量报表接口响应失败！");
				channelSales13ReportTask.channelSalesService.insertChannelSalesLog(logParam);
				return;
			}
			
			//解析返回的数据,插入渠道视图表
			Map<String, Object> resultMap = JSON.parseObject(result);
			if(resultMap.get("DataList") == null || "".equals(resultMap.get("DataList"))){
				log.info("调用13月销量报表接口dataList为空！");
				logParam.put("exception", "调用13月销量报表接口dataList为空！");
				channelSales13ReportTask.channelSalesService.insertChannelSalesLog(logParam);
				return;
			}
			JSONArray jsonArray = (JSONArray) resultMap.get("DataList");
			if(null == jsonArray || "".equals(jsonArray)){
				log.info("调用13月销量报表接口转换数据结果为空！");
				logParam.put("exception", "调用13月销量报表接口转换数据结果为空！");
				channelSales13ReportTask.channelSalesService.insertChannelSalesLog(logParam);
				return;
			}
			
			dataSize = Long.valueOf(jsonArray.size());
			
			log.info("调用13月销量报表接口, {}月返回数据条数： {}", monthId, dataSize);
			
			ExecutorService executorService = channelSales13ReportTask.threadPool.getPool();
			
			List<Map> listP = JSONObject.parseArray(jsonArray.toJSONString(), Map.class);
			List<List<Map<String, Object>>> listSplit = ListSplitUtil.splitList(listP, 100);
			//开启线程计数器
			final CountDownLatch countDownLatch = new CountDownLatch(listSplit.size());
			log.info("listSplit size is {}", listSplit.size());
			
			long start = System.currentTimeMillis();
			log.info("开始时间： {}", start);
			
			for(int i = 0; i < listSplit.size(); i++){
				final List<Map<String, Object>> map = listSplit.get(i);
				log.info("第" + i + "次，插入的数据条数为{}", map.size());
				executorService.execute(new Runnable() {
						@Override
						public void run() {
						 try {
							 insertDate(map);
			                //List<ChannelSales> resultObj = combData(map);
			                //channelSales13ReportTask.channelSalesService.insertDataToChannelTreeSales(resultObj);
		                 } finally {
			                countDownLatch.countDown();
		                }
					}
	            });
				log.info("第" + i + "次，插入的数据结束" );
			}
			//阻塞主线程，待所有线程执行完
			countDownLatch.await();
			executorService.shutdown();
			log.info("总用时： {} ms", System.currentTimeMillis() - start);
		}catch(Exception e){
			log.error("调用13月销量报表接口失败！ {}", e.getMessage());
			logParam.put("exception", e.getMessage());
			logParam.put("count", dataSize);
			channelSales13ReportTask.channelSalesService.insertChannelSalesLog(logParam);
			e.printStackTrace();
		}
			
		//调用存储过程(如果没有数据就不调存储过程了)
		if(dataSize > 0){
			call13MonthSalesProduce(Integer.valueOf(monthId), logParam, dataSize);
		}
		
	}
	
	/**
	 * 调用13月销量报表存储过程
	 */
	public void call13MonthSalesProduce(int monthId, Map<String, Object> logParam, Long dataSize){
		log.info("开始调用13月报表存储过程！");
		DataSource dataSource = (DataSource) SpringContext.getApplicationContext().getBean("dataSource");
		Connection conn = null;
		try {
			conn = dataSource.getConnection();
		} catch (SQLException e1) {
			log.error("调用13月报表存储过程失败！");
			logParam.put("exception", e1.getMessage());
			logParam.put("count", dataSize);
			channelSales13ReportTask.channelSalesService.insertChannelSalesLog(logParam);
			e1.printStackTrace();
		}
		try {
            //存储过程函数固定格式：{call xxx}
            CallableStatement cs = conn.prepareCall("{call PROC_CHANNEL_SALES_VOLUME_13(?)}");
            //注册一个返回类型的参数
            //cs.registerOutParameter(1, Types.NUMERIC); //把第1个问号注册成输出参数
            cs.setInt(1, monthId);
            cs.execute();
            log.info("调用13月报表存储过程成功！");
            logParam.put("isSuccess", 0);
			logParam.put("exception", "");
			logParam.put("count", dataSize);
			channelSales13ReportTask.channelSalesService.insertChannelSalesLog(logParam);
        } catch (SQLException e) {
            log.error("调用13月报表存储过程失败！");
            logParam.put("exception", e.getMessage());
			logParam.put("count", dataSize);
			channelSales13ReportTask.channelSalesService.insertChannelSalesLog(logParam);
            e.printStackTrace();
        } finally {
        	try {
				conn.close();
			} catch (SQLException e) {
				log.error("调用13月报表存储过程失败！");
				logParam.put("exception", e.getMessage());
				logParam.put("count", dataSize);
				channelSales13ReportTask.channelSalesService.insertChannelSalesLog(logParam);
				e.printStackTrace();
			}
        }
	}
	
	private void insertDate(List<Map<String, Object>> ListMap) {
		DataSource dataSource = (DataSource) SpringContext.getApplicationContext().getBean("dataSource");
		Connection conn = null;
        PreparedStatement pst = null;
        try {
           conn = dataSource.getConnection();
           //conn.setAutoCommit(false);//关闭自动提交，不然conn.commit()运行到这句会报错
        }catch (SQLException e) {
           e.printStackTrace();
        }
	    
	    // sql前缀
        String prefix = "INSERT ALL ";
        String sql="";
        try {
            // 保存sql后缀
            StringBuffer suffix = new StringBuffer();
            // 设置事务为非自动提交
            conn.setAutoCommit(false);
            // 外层循环，总提交事务次数
            for (int i = 0; i < ListMap.size(); i++) {
            	HashMap<String,Object> map = (HashMap<String, Object>) ListMap.get(i);
            	suffix.append(" INTO TB_CHANNEL_TREE_SALES (month_id, province_name, latn_name, area_id, area_name,"
  				+"obu_id, obu_name, obu_type1_name, obu_type2_name, five_id, five_name, channel_id,"
  				+"yd_month, kd_month, iptv_month) VALUES  ("
  						+ "'" +Integer.valueOf(String.valueOf(map.get("ACCT_MONTH")))+"',"
            			+ "'"+String.valueOf(map.get("PROVINCE_NAME"))+"'"+ ","
            			+ "'"+String.valueOf(map.get("CITY_NAME"))+"'"+","
            			+ "'"+String.valueOf(map.get("AREA_ID"))+"'"+","
            		    + "'"+String.valueOf(map.get("AREA_NAME"))+"'"+","
    		    		+ "'"+String.valueOf(map.get("OBU_ID"))+"'"+","
    		    		+ "'"+String.valueOf(map.get("OBU_NAME"))+"'"+","
    		    		+ "'"+String.valueOf(map.get("OBU_TYPE1_NAME"))+"'"+","
    		    		+ "'"+String.valueOf(map.get("OBU_TYPE2_NAME"))+"'"+","
    		    		+ "'"+String.valueOf(map.get("BLOCK_ID"))+"'"+","
    		    		+ "'"+String.valueOf(map.get("BLOCK_NAME"))+"'"+","
    		    		+ "'"+String.valueOf(map.get("CHANNEL_ID"))+"'"+","
    		    		+ "'"+String.valueOf(map.get("MB_PRD_NUM"))+"'"+","
    		    		+ "'"+String.valueOf(map.get("WB_PRD_NUM"))+"'"+","
	    				+ "'"+String.valueOf(map.get("IPTV_PRD_NUM"))+"')");
			}
            suffix.append("SELECT 1 FROM DUAL;");
            
            // 构建完整SQL
             sql = prefix + suffix.substring(0, suffix.length() - 1);
            log.info("插入的sql: {}", String.valueOf(sql)); 
            pst = (PreparedStatement) conn.prepareStatement(sql);//准备执行语句
            // 添加执行SQL
            //pst.addBatch(sql);
            // 执行操作
            //pst.executeBatch();
            pst.executeQuery();
            // 提交事务
            conn.commit();
        } catch (SQLException e) {
            log.info("插入sql报错"+ String.valueOf(sql)+e.getMessage()); 
        }finally {
        	// 关闭连接
            try {
				pst.close();
				conn.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
       
	}
	
	@SuppressWarnings("unused")
	private List<ChannelSales> combData(List<Map<String, Object>> list){
		List<ChannelSales> reList = new ArrayList<ChannelSales>();
		
		for(Iterator<Map<String, Object>> it = list.iterator(); it.hasNext();){
			Map<String, Object> map = it.next();
			ChannelSales channelSales = new ChannelSales();
			channelSales.setMonthId(Integer.valueOf(String.valueOf(map.get("ACCT_MONTH"))));
			channelSales.setProvinceName(String.valueOf(map.get("PROVINCE_NAME")));
			channelSales.setLatnName(String.valueOf(map.get("CITY_NAME")));
			channelSales.setAreaId(String.valueOf(map.get("AREA_ID")));	//
			channelSales.setAreaName(String.valueOf(map.get("AREA_NAME")));	//
			channelSales.setObuId(String.valueOf(map.get("OBU_ID")));
			channelSales.setObuName(String.valueOf(map.get("OBU_NAME")));
			channelSales.setObuType1Name(String.valueOf(map.get("OBU_TYPE1_NAME")));
			channelSales.setObuType2Name(String.valueOf(map.get("OBU_TYPE2_NAME")));
			channelSales.setFiveId(String.valueOf(map.get("BLOCK_ID")));
			channelSales.setFiveName(String.valueOf(map.get("BLOCK_NAME")));
			channelSales.setChannelId(Integer.valueOf(String.valueOf(map.get("CHANNEL_ID"))));
			channelSales.setYdMonth(Integer.valueOf(String.valueOf(map.get("MB_PRD_NUM"))));
			channelSales.setKdMonth(Integer.valueOf(String.valueOf(map.get("WB_PRD_NUM"))));
			channelSales.setIptvMonth(Integer.valueOf(String.valueOf(map.get("IPTV_PRD_NUM"))));
			reList.add(channelSales);
		}
		return reList;
	}

}
