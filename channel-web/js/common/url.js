var hostname = location.hostname;
var port = location.port;
var ctxStart = "http://"+hostname+":"+port;
// 157测试服务接口地址
var ctx = ctxStart+'/channel-serve-rest/';
var web_ctx = ctxStart+'/channel-web/';
var systemLocal="sx";


$.ajaxSetup({
    //设置ajax请求结束后的执行动作  
    complete : function(XMLHttpRequest, textStatus) {
    try{
     	var resText = XMLHttpRequest.responseText;  
     	if(resText.indexOf("cas-login") != -1) {
     		window.top.location.href=ctxStart+"/sso";
     		return;
     	}
     }catch(e){
     }
   }
});