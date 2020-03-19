package com.tydic.common.sso;

import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.httpclient.Header;
import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.HttpMethod;
import org.apache.commons.httpclient.methods.GetMethod;
import org.apache.commons.httpclient.methods.PostMethod;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;

/**
 * 登录cas获取ticket
 * @author HLF
 *
 */
public class CasLogin {
	
	public static void main(String[] args) {
		CasLogin cl=new CasLogin();
		try {
			System.out.println(cl.login("http://192.168.128.89:9081/sso/login","admin", "`123qwer","isFirstLogin=&code=&mobilePhone=&randomCode=&code2="));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 
	 * @param casUrl
	 * @param username
	 * @param password
	 * @param extQeqParamStr 扩展请求参数，格式：paramName1=paramValue1&paramName2=paramValue2
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("deprecation")
	public String login(String casUrl,String username, String password,String extQeqParamStr) throws Exception{
		HttpClient httpclient = new HttpClient();
        
        Map<String, String> params = getParams(httpclient,casUrl);
        String lt = params.get("lt");
        String cookie = params.get("Set-Cookie");
        PostMethod method = new PostMethod();
        method.setRequestBody((extQeqParamStr==null ? "" : extQeqParamStr)+"&_eventId=submit&lt="+lt+
        		"&username="+URLEncoder.encode(username, "UTF-8")+"&password="+URLEncoder.encode(password, "UTF-8"));
        method.setFollowRedirects(false);
        method.addRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        method.addRequestHeader(new Header("Cookie", cookie));
        method.setPath(casUrl);
        httpclient.executeMethod(method);
        
        Header tgtHead = method.getResponseHeader("Set-Cookie");
        return getTicket(tgtHead.getValue());
	}
	
	public String login(String casUrl,String username, String password) throws Exception{
        return login(casUrl,username,password,"");
	}

	private String getTicket(String headStr){
    	if(headStr==null || !headStr.contains("CASTGC=")){
    		return null;
    	}
    	String regex="(?<=CASTGC=).*(?=; )";
    	Pattern pattern = Pattern.compile(regex);
		Matcher matcher=null;
		try {
			matcher = pattern.matcher(headStr);
		} catch (Exception e) {
		}
		if (matcher.find()) {
			return matcher.group(0);
		}
		return null;
    }

    private Map<String, String> getParams(HttpClient httpclient,String loginUrl) throws Exception {
        HttpMethod method = new GetMethod();
        method.setPath(loginUrl);
        method.setFollowRedirects(false);
        httpclient.executeMethod(method);
        String cont = method.getResponseBodyAsString();
        Document doc = Jsoup.parse(cont);
        
        Map<String, String> params = new HashMap<String,String>();
        params.put("Set-Cookie", method.getResponseHeader("Set-Cookie").getValue());
        params.put("lt", doc.getElementsByAttributeValue("name", "lt").attr("value"));
        return params;
    }
	
}
