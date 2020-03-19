package com.tydic.common.http;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

import lombok.extern.slf4j.Slf4j;

import org.apache.commons.httpclient.HttpStatus;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.util.EntityUtils;

@Slf4j
public class HttpClientUtils {
    /**
     * post请求(13月销量报表专用)
     * @param url
     * @param json
     * @return
     */
    public static String doPost(String url,String jsonParam){
        DefaultHttpClient client = new DefaultHttpClient();
        HttpPost post = new HttpPost(url);
        HttpResponse res = null;
        try {
            StringEntity s = new StringEntity(jsonParam);
            s.setContentEncoding("UTF-8");
            s.setContentType("application/json");//发送json数据需要设置contentType
            post.setEntity(s);
            post.addHeader("X-APP-KEY", "4842ea8eedb53394411badd7ca46db0b");
            post.addHeader("X-APP-ID", "6be492816bf048c8379b41382a479fef");
            post.addHeader("X-CTG-Request-Id", "2019032223232323021546987");
            res = client.execute(post);
            if(res.getStatusLine().getStatusCode() == HttpStatus.SC_OK){
                HttpEntity entity = res.getEntity();
                String result = EntityUtils.toString(entity);// 返回json格式：
                return result;
            }else{
            	log.error("调用13月报表数据响应Code: {}", res.getStatusLine().getStatusCode());
            	return "error";
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
    
    
    
    /*public static void main(String[] args) {
       Map<String ,Object> rootMap = new HashMap<String ,Object>();
       rootMap.put("TOKEN", "278DD7A6A9574889931716C7A0D0AC09");
       rootMap.put("ID", "49");
       rootMap.put("PARAM", "{acct_month:'201902'}");
       String param=JSON.toJSONString(rootMap);
       System.out.println(param);
		String result = HttpClientUtils.doPost("http://133.64.86.161:9005/SCC/capacityRestfulService/api/QDST_GX/getDataRestful", param);
		System.out.println("返回查询的结果为:"+result);
	}*/
    
    
    public static void main(String[] args) {
    	SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMM");
        Date date = new Date();
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date); // 设置为当前时间
        calendar.set(Calendar.MONTH, calendar.get(Calendar.MONTH) - 1); // 设置为上一个月
        date = calendar.getTime();
        String monthId = dateFormat.format(date);
	}
}
