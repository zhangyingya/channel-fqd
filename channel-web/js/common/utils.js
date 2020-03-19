﻿﻿/**
 * post 方法
 * @param url
 * @param params
 * @returns {*}
 */
function post(url, params) {
    if (typeof params == "undefined") {
        params = {};
    }
    if (url != '/login/userlogin.html'&& url !='survey/getSurveyJson.html' && url !='survey/addSurveyReplay.html'&& url !='survey/getSurveyStatus.html') {
    	//alert(localStorage.getItem('accessToken'));
    	//alert(localStorage.getItem('userId'));
    	//alert(localStorage.getItem('accessToken') && localStorage.getItem('userId'));
        //判断有没有权限，如果有权限获取，没有跳转到登录页面
        if (localStorage.getItem('accessToken') && localStorage.getItem('userId')) {
            params.accessToken = localStorage.getItem('accessToken');
            params.userId = localStorage.getItem('userId');
            params.userName = localStorage.getItem('userName');
        } else {
    	 	window.location.href = '../../index.html';
        }
    }
    var dataResult = null;
    jQuery.support.cors = true;
    $.ajax({
        type: "post",
		dataType : 'json',
        url: comUrl + url,
        data: rsaEncrypt(url,params),
        //data: params,
        async: false,
        success: function (data) {
            if(data.result == 1000){
       		 	if(typeof(window.parent.location.href) == "undefined" || window.parent.location.href=="null") { 
       		 		window.location.href = '../../index.html';
       		 	}else{
       		 		window.parent.location.href = '../../index.html';
       		 	}
            }else{
            	dataResult = data;
            }
        },error : function(response, textStatus, errorThrown) {
            return false;
        }
    });
    return dataResult;
}

﻿﻿/**
 * post 方法 出现笼罩层
 * @param url
 * @param params
 * @returns {*}
 */
function postShroud(url, params) {
    if (typeof params == "undefined") {
        params = {};
    }
    if (url != '/login/userlogin.html'&& url !='survey/getSurveyJson.html' && url !='survey/addSurveyReplay.html'&& url !='survey/getSurveyStatus.html') {
    	//alert(localStorage.getItem('accessToken'));
    	//alert(localStorage.getItem('userId'));
    	//alert(localStorage.getItem('accessToken') && localStorage.getItem('userId'));
        //判断有没有权限，如果有权限获取，没有跳转到登录页面
        if (localStorage.getItem('accessToken') && localStorage.getItem('userId')) {
            params.accessToken = localStorage.getItem('accessToken');
            params.userId = localStorage.getItem('userId');
            params.userName = localStorage.getItem('userName');
        } else {
    	 	window.location.href = '../../index.html';
        }
    }
    var dataResult = null;
    jQuery.support.cors = true;
    $.ajax({
        type: "post",
		dataType : 'json',
        url: comUrl + url,
        data: rsaEncrypt(url,params),
        //data: params,
        async: false,
        beforeSend:function(){        	
        	  $("body").mLoading("show");
        },
        success: function (data) {
            if(data.result == 1000){
       		 	if(typeof(window.parent.location.href) == "undefined" || window.parent.location.href=="null") { 
       		 		window.location.href = '../../index.html';
       		 	}else{
       		 		window.parent.location.href = '../../index.html';
       		 	}
            }else{
            	dataResult = data;
            }
            $("body").mLoading("hide");
           // spinner.spin();
        },error : function(response, textStatus, errorThrown) {
        	//spinner.spin();
            $("body").mLoading("hide");
            return false;
        }
    });
    return dataResult;
}

function rsaEncrypt(url,params){
	if(url=="/login/userlogin.html"){
		var toParams = null;
		RSAUtils.setMaxDigits(200);
		var key = new RSAUtils.getKeyPair("10001", "", "a078841a79b714d7313f233d5ddfbb956986f42b8d871a7fa2f2f2535c1bd7ad1fa0cb8e209cdaef34480803201420b1a35b3bfda64f94b21bc26f73c4a5a3ddf391461ae9bc43a96da22d1ba3184d714ea22de236cf4b8f25f9be34f1a28e33ddba6554d31160ea14377900d39ca786981cee36345e6630eb117c49990d0151");
		for(var paramKey in params)
		{
		    //alert("Key是:" + key);
		    //alert("对应的值是:" + params[key]);
			if(paramKey=="password"){
				params[paramKey] = RSAUtils.encryptedString(key,params[paramKey].split("").reverse().join(""));
			}
		    //alert("加密后对应的值是:" + params[paramKey]);
		}
		//encrypedPwd = RSAUtils.encryptedString(key,orgPwd.split("").reverse().join("")); 
		//var paramsRsa = RSAUtils.encryptedString(key,JSON.stringify(params).split("").reverse().join(""));
		//var jsonParams = {"params":paramsRsa};
		//return jsonParams;
	}
	return params;
	
}
/**
 * post 方法
 * @param url
 * @param params
 * @returns {*}
 */
function postDeferredShroud(url, params) {
    if (typeof params == "undefined") {
        params = {};
    }

    var defer = $.Deferred();
    if (url != '/login/userlogin.html') {
        //判断有没有权限，如果有权限获取，没有跳转到登录页面
        if (localStorage.getItem('accessToken') && localStorage.getItem('userId')) {
            params.accessToken = localStorage.getItem('accessToken');
            params.userId = localStorage.getItem('userId');
        } else {
    	 	window.location.href = '../../index.html';
        }
    }
    var dataResult = null;
    jQuery.support.cors = true;
    $.ajax({
        type: "post",
		dataType : 'json',
        url: comUrl + url,
        data: params,
        beforeSend:function(){
        	$("body").mLoading("show");
        },
        success: function (data) {
        	     defer.resolve(data);
        	     $("body").mLoading("hide");
                },
        error : function(response, textStatus, errorThrown) {
   	        $("body").mLoading("hide");
            return false;
        }
    });
    return defer.promise();
}
/**
 * post 方法
 * @param url
 * @param params
 * @returns {*}
 */
function postDeferred(url, params) {
    if (typeof params == "undefined") {
        params = {};
    }

    var defer = $.Deferred();
    if (url != '/login/userlogin.html') {
    	//alert(localStorage.getItem('accessToken'));
    	//alert(localStorage.getItem('userId'));
    	//alert(localStorage.getItem('accessToken') && localStorage.getItem('userId'));
        //判断有没有权限，如果有权限获取，没有跳转到登录页面
        if (localStorage.getItem('accessToken') && localStorage.getItem('userId')) {
            params.accessToken = localStorage.getItem('accessToken');
            params.userId = localStorage.getItem('userId');
        } else {
    	 	window.location.href = '../../index.html';
        }
    }
    var dataResult = null;
    jQuery.support.cors = true;
    $.ajax({
        type: "post",
		dataType : 'json',
        url: comUrl + url,
        data: params,
       // async: isAsync,
        success: function (data) {
        	     defer.resolve(data);
                },
        error : function(response, textStatus, errorThrown) {
            return false;
        }
    });
    return defer.promise();
}

function postPass(url, params) {
    if (typeof params == "undefined") {
        params = {};
    }
    
    var dataResult = null;
    jQuery.support.cors = true;
    $.ajax({
        type: "post",
		dataType : 'json',
        url: comUrl + url,
        data: params,
        async: false,
        success: function (data) {
            
            	dataResult = data;
            
        },error : function(response, textStatus, errorThrown) {
            return false;
        }
    });
    return dataResult;
}

function postMethod(RequestMethod, url, params) {
    if (typeof params == "undefined") {
        params = {};
    }
    
    var dataResult = null;
    jQuery.support.cors = true;
    $.ajax({
        type: RequestMethod,
		dataType : 'json',
        url: comUrl + url,
        data: params,
        async: false,
        success: function (data) {
            
            	dataResult = data;
            
        },error : function(response, textStatus, errorThrown) {
            return false;
        }
    });
    return dataResult;
}

function postUrl(url, params) {
    if (typeof params == "undefined") {
        params = {};
    }
    if (url != '/login/userlogin.html') {
        //判断有没有权限，如果有权限获取，没有跳转到登录页面
        if (localStorage.getItem('accessToken') && localStorage.getItem('userId')) {
            params.accessToken = localStorage.getItem('accessToken');
            params.userId = localStorage.getItem('userId');
        } else {
        	window.location.href = '../../index.html';
            //window.location.href = '/login.html';
        }
    }
    var dataResult = null;
    jQuery.support.cors = true;
    $.ajax({
        type: "post",
        // cache: false,
        url: url,
        data: params,
        async: false,
        success: function (data) {
        	if(data.result == 1000){
	       		 //window.location.href = 'login_account.html';
	       		 if(typeof(window.parent.location.href) == "undefined" || window.parent.location.href=="null") { 
	    		 	   window.location.href = '../../index.html';
	    		 }else{
	    		 	   window.parent.location.href = '../../index.html';
	    		 }
            }else{
            	dataResult = data;
            }
        }, error: function (XMLHttpRequest, textStatus, errorThrown) {
        	art.artDialog.error('请求失败!');
            return false;
        }
    });
    return dataResult;
}


/**
 * 渲染数据并显示
 * @param contStr——容器
 * @param renderId——模板
 * @param data——数据
 */
function renderHtml(contStr, renderId, data) {
    var html = template(renderId, data);
    $(contStr).html(html);
}

/**
 *
 * 弹框提示 需要引用这个js
 * info类型消息提示框
 * @param text
 */
function showMsg(text,callback) {
	art.dialog.message('info',text,callback);
}

/**
*
* 弹框提示 需要引用这个js
* error类型消息提示框
* @param text
*/
function showErrorMsg(text,callback) {
	art.dialog.message('error',text,callback);
}

/**
*
* 弹框提示 需要引用这个js
* succeed类型消息提示框
* @param text
*/
function showSucceedMsg(text,callback) {
	art.dialog.message('succeed',text,callback);
}


/**
*
* 弹框提示 需要引用这个js
* warning类型消息提示框
* @param text
*/
function showWarningMsg(text,callback) {
	art.dialog.message('warning',text,callback);
}


/**
*
* 弹框提示 需要引用这个js
* question类型消息提示框
* @param text
*/
function showQuestionMsg(text,callback) {
	art.dialog.message('question',text,callback);
}

/**
*
* 弹框提示 需要引用这个js
* face-sad类型消息提示框
* @param text
*/
function showFaceSadMsg(text,callback) {
	art.dialog.message('face-sad',text,callback);
}


/**
*
* 弹框提示 需要引用这个js
* face-smile类型消息提示框
* @param text
*/
function showFaceSmileMsg(text,callback) {
	art.dialog.message('face-smile',text,callback);
}
/**
 *
 * 确认提示弹框 需要引用这个js
 * @param message  yesCallBackFn noCallBackFn
 */
function showConfirmBox(text, yesCallBackFn,noCallBackFn){
	art.dialog.isSubmit(text,yesCallBackFn,noCallBackFn);
}

//日期判断
function zeroTxt(tx) {
    var txt = tx.toString();
    if (txt) {
        if (txt.length > 1) {
            return txt;
        } else {
            return "0" + txt;
        }
    }
}
//返回年月日日期：2015-03-19
function formatDateYYYMMDD(date) {  
    var y = date.getFullYear();  
    var m = date.getMonth() + 1;  
    m = m < 10 ? '0' + m : m;  
    var d = date.getDate();  
    d = d < 10 ? ('0' + d) : d;  
    return y + '-' + m + '-' + d;  
}
function getAfterOrBeforDay(date,day){
	date.setDate(date.getDate()+day);
    return 	formatDateYYYMMDD(date);
}

//获取URL里的参数
function GetQueryString(name){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  unescape(r[2]); return null;
};
    
    
    