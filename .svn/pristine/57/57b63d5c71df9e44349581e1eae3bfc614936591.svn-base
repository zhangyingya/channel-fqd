/**
 * 自定义JS
 */
/**
 * GUID生成工具
 * 
 * @type UUID
 * @class UUID
 */
var UUID = {
	S4 : function() {
		return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
	},
	/**
	 * 生成32位GUID,速度慢
	 * 
	 * @return {}
	 */
	randomUUID : function() {

		return (UUID.S4() + UUID.S4() + "-" + UUID.S4() + "-" + UUID.S4() + "-"
				+ UUID.S4() + "-" + UUID.S4() + UUID.S4() + UUID.S4());
	},
	d : new Date().getTime() + "_" + Math.random().toString().replace('.', '_')
			+ "_",
	c : 0,
	/**
	 * 生成客户端唯一ID,速度快
	 * 
	 * @return {}
	 */
	cID : function() {
		++UUID.c;
		return 'cid_' + UUID.d + UUID.c;
	}
};

/**
 * 字符处理对象
 * 
 * @class StringBuffer
 */
function StringBuffer() {
	this._strings_ = [];
}
/**
 * 添加string
 * 
 * @param {string}
 *            str
 */
StringBuffer.prototype.append = function(str) {
	this._strings_.push(str);
}
/**
 * 返回字符处理结果
 * 
 * @return {string} 字符
 */
StringBuffer.prototype.toString = function(split) {
	if (split == null)
		split = '';
	return this._strings_.join(split);
}
/**
 * @return {}
 */
String.prototype.Trim = function() {
	return this.replace(/(^\s*)|(\s*$)/g, "");
}
/**
 * @param {}
 *            rename
 * @param {}
 *            edname
 * @return {}
 */
String.prototype.replaceall = function(rename, edname) {
	var ret = this;
	if (edname == null)
		edname = '';
	ret = ret.replace(rename, edname);

	while (ret.indexOf(rename) >= 0) {
		ret = ret.replace(rename, edname);
	}
	return ret;
}

/**
 * hashtable 哈希表
 * 
 * @class hashtable
 */
var hashtable = function() {
	this.keys = {};
}
/**
 * 检验是否包含指定key
 * 
 * @param {object}
 *            key
 * @return {Boolean} 检验结果
 */
hashtable.prototype.contains = function(key) {
	if (this.count == 0)
		return false;
	return this.keys.hasOwnProperty(key);
}
/**
 * 包含的key value对数量
 * 
 * @type Number
 */
hashtable.prototype.count = 0;
/**
 * 添加一个key value对
 * 
 * @param {}
 *            key
 * @param {}
 *            value
 */
hashtable.prototype.add = function(key, value) {
	if (this.contains(key))
		return;
	this.keys[key] = value;
	this.count++;
}

/**
 * 根据key获取value
 * 
 * @param {}
 *            key
 * @return {}
 */
hashtable.prototype.getvalue = function(key) {
	return this.keys[key];
}

/**
 * 根据key替换指定的value
 * 
 * @param {}
 *            key
 * @param {}
 *            newvalue
 */
hashtable.prototype.replace = function(key, newvalue) {
	if (this.contains(key))
		this.keys[key] = newvalue;
}

/**
 * 根据key删除key value对
 * 
 * @param {}
 *            key
 */
hashtable.prototype.remove = function(key) {
	this.keys[key] = null;
	delete this.keys[key];
	this.count--;
}

/**
 * 清除所有项
 */
hashtable.prototype.clear = function() {
	this.keys = null;
	this.keys = {};
	this.count = 0;
}
/**
 * 复制
 * 
 * @return {} hashtable对象
 */
hashtable.prototype.clone = function() {
	var _keys = this.keys;
	var ret = new hashtable();
	for (var k in _keys) {
		ret.add(k, this.getvalue(k));
	}
	return ret;
}


/** 
 * bin
 * 删除数组元素指定值
 */
Array.prototype.indexOf = function(val) { 
	for (var i = 0; i < this.length; i++) {
		if (this[i] == val) return i;
	}
	return -1;
};
Array.prototype.remove = function(val) {
	var index = this.indexOf(val);
	if (index > -1) {
		this.splice(index, 1);            
	}
};
Array.prototype.contain = function(val){
	var flag = false;
	$.each(this,function(index,item){
		if(item == val){
			flag = true;
			return false;
		}
	});
	return flag;
};
/**删除数组重复项*/          
var toObject = function(a) { 
	var o = {}; 
	for (var i=0, j=a.length; i<j; i=i+1) {
		o[a[i]] = true; 
	}
	return o; 
};
var keys = function(o) { 
	var a=[], i; 
	for (i in o) { 
		if (o.hasOwnProperty(i)) {
			a.push(i); 
		}
	}
	return a;
}; 
var uniq = function(a) { 
	return keys(toObject(a)); 
};


var Dic = new Object();
/**
 * Dic注册事件
 * 
 * @param {}
 *            element 事件对象
 * @param {}
 *            type 事件类型
 * @param {}
 *            fun 调用方法
 * @param {}
 *            args 参数集合
 * @param {}
 *            domain 作用域
 */
Dic.addEvent = function(element, type, fun, args, domain) {
	if (!domain)
		domain = null;
	element.bind(type, function(arg) {
				eval(fun.call(domain, arg, args));
			});
}

Dic.getData = function(pageObj) {
	var pageData = pageObj.serializeArray();
	var obj = new Object();
	for (var index = 0; index < pageData.length; index++) {
		var p = pageData[index];
		obj[p["name"]] = p["value"];
	}
	return obj;
}

/**
 * 异步提交表单时，获取表单数据（适合含有table数据） 多个相同的变量名不同值的区分
 * 
 * @param {}
 *            element 事件对象
 * @param {}
 *            splitType 区分分隔符
 */
Dic.getTableData = function(pageObj, splitType) {
	var pageData = pageObj.serializeArray();
	var obj = new Object();
	for (var index = 0; index < pageData.length; index++) {
		var p = pageData[index];
		if (null == obj[p["name"]] || 'undefined' == obj[p["name"]]) {
			obj[p["name"]] = p["value"];
		} else {
			obj[p["name"]] = obj[p["name"]] + splitType + p["value"];
		}
	}
	return obj;
}

Dic.Url = {};
Dic.Url.getpar = function() {
	var url = location.href;
	return url.substring(url.indexOf("?") + 1, url.length);
}

/**
 * 获取URL中的参数
 * 注：该方法已经过时，请用新的Dic.Url.getRequestParams
 * @deprecated
 */
Dic.Url.getParams = function(paras) {
	var paraString = Dic.Url.getpar().split("&");
	var paraObj = {}
	for (i = 0; j = paraString[i]; i++) {
		paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j
						.indexOf("=")
						+ 1, j.length);
	}
	if (paras == null)
		return paraObj;
	var returnValue = paraObj[paras.toLowerCase()];
	if (typeof(returnValue) == "undefined") {
		return "";
	} else {
		return returnValue.replace(/#/g, "");
	}
}

/**
 * 处理form所有text文本框中字符串的前后空格 num:指定的那个form位置，从0开始计算
 */
Dic.trim = function(num) {
	if (num == null) {
		num = 0;
	}
	var frm = document.forms[num];
	var els = frm.elements;
	for (var i = 0; i < els.length; i++) {
		if (els[i].type == 'text') {
			els[i].value = els[i].value.replace(/(^\s*)|(\s*$)/g, '');
		}
	}
}

Dic.Ajax = {};
Dic.Ajax.request = function(ops) {
	var dataObj = null;
	if (typeof ops["data"] == "undefined") {
		ops["data"] = {};
    }
	ops["data"].loginId= localStorage.getItem('loginId');
	ops["data"].token= localStorage.getItem('token');
	$.ajax({
		url : ops["url"],
		type : 'POST',
		async : false,
		cache : false,
		data : ops["data"],
		dataType : 'json',
		timeout : 60000,
		success : function(result) {
			if(result.resultCode=='160104'){
				//token过期返回登录页面
				localStorage.removeItem('loginId');
				localStorage.removeItem('token');
				window.location.href = getRootPath()+'/login.html';
			}
			dataObj = result;
		}
	});
	return dataObj;

}
Dic.Ajax.requestToString = function(ops) {
	var dataObj = null;
	$.ajax({
		url : ops["url"],
		type : 'POST',
		async : false,
		cache : false,
		data : ops["data"],
		dataType : 'text',
		timeout : 60000,
		success : function(result) {
			dataObj = result;
		}
	});
	return dataObj;
}

/**
 * 获取Object的数据长度
 */
Dic.getObjectCount = function(o) {   
   var n, count = 0;   
   for(n in o){   
      if(o.hasOwnProperty(n)){   
         count++;   
      }   
   }   
   return count;   
}

/**
 * 日期格式化
 * 2013-04-19
 */
// 根据传入的日期进行格式化
Dic.dateFormat = function(day) {
	var Year = 0;
	var Month = 0;
	var Day = 0;
	var CurrentDate = "";
	//初始化时间
	//Year       = day.getYear();//有火狐下2008年显示108的bug
	Year       = day.getFullYear();//ie火狐下都可以
	Month      = day.getMonth()+1;
	Day        = day.getDate();
	CurrentDate += Year + "-";
	if (Month >= 10 ) {
		CurrentDate += Month + "-";
	} else {
		CurrentDate += "0" + Month + "-";
	}
	if (Day >= 10 ) {
		CurrentDate += Day ;
	} else {
		CurrentDate += "0" + Day ;
	}
	return CurrentDate;
}
// 根据当天的日期格式化
Dic.nowDateFormat = function() {
	var day = new Date();
	return Dic.dateFormat(day);
}

/**获取默认日期(当前日期+2年)*/
Dic.getDefDate = function(){
	var theDate = new Date();
	var year = theDate.getFullYear() + 2;
	var month = theDate.getMonth() + 1;
	var day = theDate.getDate() - 1;
	month = month < 10 ? "0" + month : month;
	day = day < 10 ? "0" + day : day;
	
	return year + "-" + month + "-" + day;
};

/**
 * 获取自定义日期，参数为空则默认是当前日期的YYYY-MM-DD
 * num如果是正数，则是按照当天加num天，否则是减num天
 */
Dic.getCustomDate = function(num){
	if (num == null) {
		num = 0;
	}
	var theDate = new Date();
	var yesterday_milliseconds=theDate.getTime()+1000*60*60*24*num;        
    var yesterday = new Date();        
    yesterday.setTime(yesterday_milliseconds); 
	var year = yesterday.getFullYear();
	var month = yesterday.getMonth() + 1;
	var day = yesterday.getDate();
	month = month < 10 ? "0" + month : month;
	day = day < 10 ? "0" + day : day;
	return year + "-" + month + "-" + day;
}

/**
 * 处理空对象
 */
Dic.processNULL = function(val) {
	if(undefined == val ||'undefined' == val || null == val || 'null' == val) {
		return '';
	} else {
		return val;
	}
}

/**
 * 是否是一个整数
 */
Dic.isInteger = function(str) {
    return (/^-?\d+$/.test(str));
}

Dic.isRange = function(str){
	return /^((\d|[123456789]\d)(\.\d+)?|100)$/.test(str);
}

/**
 * 身份证验证
 */
Dic.isIdCardNo = function(idNumber) {
	if("" == idNumber) {
		return false;
	}
	// 身份证长度不正确
	if(idNumber.length != 15 && idNumber.length != 18) {
		return false; 
	}
	if(idNumber.length == 15) {
		if(!Dic.isInteger(idNumber)) {
			return false; 
		}
	} else {
		str1 = idNumber.substring(0,17); 
		str2 = idNumber.substring(17,18); 
		alpha = "X0123456789"; 
		if(!Dic.isInteger(str1) || alpha.indexOf(str2) == -1) { 
			return false; 
		}
	}
	return true; 
}

/**
 * 验证非法字符(只能是0-9之间的字符串) str:将要验证的字符串
 */
Dic.validateNumChar = function(str) {
	var reg = /^[0-9]{1,}$/; 
	return reg.test(str);
}

/**
* 验证特殊字符
*/
Dic.validateSpecialChar = function(str){	
	var reg = /^[a-zA-z0-9\u4E00-\u9FA5]+$/gi;
	return reg.test(str);
}

/**
 * 验证非法字符(只能是0-9，a-z，A-Z之间的字符串)
 */
Dic.validateIllegalCharacter = function(str){
	var reg = /^[a-zA-Z0-9_\s]{1,}$/; 
    return reg.test(str);
}

/**
 * 验证账号非法字符(只能是0-9，a-z，A-Z，_@.-之间的字符串)
 */
Dic.validateEmpeeAcct = function(str){
	var reg = /^[a-zA-Z0-9_@\.\-\s]{1,}$/;
    return reg.test(str);
}

/**
 * 验证非空字符
 */
Dic.validateNullCharacter = function(str){
	var fstr = str.trim();
	if('undefined' == fstr || null == fstr || '' == fstr) {
		return true;
	} else {
		return false;
	}
}

/**
 * 是否是一个浮点数
 * str:要检测的字符串

 */
Dic.isFloat = function (str){
	var patrn = /^(-?\d+)(\.\d+)?$/;
	return patrn.test(str);
}

/**
 * 验证IP非空字符
 */
Dic.checkIpArea = function(cStaticIpBegin , cStaticIpEnd){
	if('' != cStaticIpBegin && '' != cStaticIpEnd ) {
  		var startips = cStaticIpBegin.split('.');
  		var endips = cStaticIpEnd.split('.');
  		if((startips.length == 4 && endips.length == 4) 
  			|| (startips.length == 6 && endips.length == 6) ) {
	  		for(var ipIndex = 0 ;ipIndex < startips.length ; ipIndex++ ) {
	  			if(!Dic.isInteger(startips[ipIndex]) || !Dic.isInteger(endips[ipIndex]) ) {
	  				return false;
	  			} else {
		  			if( startips[ipIndex] < 0 || startips[ipIndex] > 255 ) {
		  				return false;
		  			}
		  			if( endips[ipIndex] - startips[ipIndex] < 0 ) {
		  				return false;
		  			}
	  			}
	  		}
	  		return true;
  		} else {
			return false;
  		}
  	} else {
		return false;
  	}
}

/**
 * 处理undefined字符串
 */
Dic.processUndefined = function (tempData) {
	return tempData == undefined ? '' : tempData; 
}

/**
 * 获取Cookies中参数
 */
Dic.getCookies = function(_key) {
	var cookies = document.cookie ? document.cookie.split('; ') : [];
	for (var i = 0, l = cookies.length; i < l; i++) {
		var parts = cookies[i].split('=');
		var key = parts[0];
		if (_key && _key === key) {
			return parts[1];
		}
	}
	return '';
}


/********************2015-05-20 新增JS支持国际化，如下：***********************/

/**
 * 获取url请求参数
 */
Dic.Url.requestParams = null;
Dic.Url.getRequestParams = function(paras) {
	if(null == Dic.Url.requestParams) {
		var paraObj = {};
		var paraString = Dic.Url.getpar().split("&");
		for (i = 0; j = paraString[i]; i++) {
			paraObj[j.substring(0, j.indexOf("="))] = j.substring(j
							.indexOf("=")
							+ 1, j.length);
		}
		Dic.Url.requestParams = paraObj;
	}
	if (paras == null || paras == 'undefined' ){
		return Dic.Url.requestParams;
	}
	var returnValue = Dic.Url.requestParams[paras];
	if (typeof(returnValue) == 'undefined') {
		return "";
	} else {
		return returnValue.replace(/#/g, "");
	}
}

Dic.i18n = '';	// URL传参数过来的国际化标示
Dic.defaultI18n = '';	// 默认浏览器中的国际化语言（一定不能为空,如果为空则采用URL传参数）

/** 
 * 获取浏览器的国际化
 * Ensure language code is in the format aa_AA. 
 */
Dic.getLanguageCode = function() {
	//navigator.language /* Mozilla */ || navigator.userLanguage /* IE */;
	var lang = navigator.language||navigator.userLanguage;
    lang = lang.toLowerCase();
    if(lang.length > 3) {
        lang = lang.substring(0, 3) + lang.substring(3).toUpperCase();
    }
    return lang;
};

/**
 * 国际化初始化
 */
(function($) {
	//Dic.i18n = Dic.Url.getRequestParams('i18n');
	Dic.i18n = Dic.getCookies('SYS_I18N');
	// 目前以默认传参数的国际化为主，否则JS获取浏览器参数
	if(Dic.i18n == '') {
		//Dic.defaultI18n = Dic.getLanguageCode();
		Dic.defaultI18n = "zh-CN";
	} else {
		Dic.defaultI18n = Dic.i18n;
	}
})(jQuery);

/**
 * 对跳转的URL，公共处理方法
 * url：待跳转的URL；
 * param：需要携带的参数
 * 注意：会默认带上随机时间防止页面缓存
 */
Dic.processPublicUrl = function (url) {
	var timstamp = new Date().valueOf();
	var proUrl = "";
	if (url.indexOf("?") >= 0 ) {  
		proUrl = url + "&t=" + timstamp;
	}else {  
		proUrl = url + "?t=" + timstamp;
	}
	//if (Dic.i18n.length > 0 ) {  
	//	proUrl += "&i18n=" +Dic.i18n;
	//}
	return proUrl;
}
/**
 * 对跳转的URL，公共处理方法
 * param一定不能为空，否则使用上面一个方法
 */
Dic.processPublicUrl = function (url , param) {
	var timstamp = new Date().valueOf();
	var proUrl = "";
	if (url.indexOf("?") >= 0 ) {  
		proUrl = url + "&t=" + timstamp;
	}else {  
		proUrl = url + "?t=" + timstamp;
	}
	//if (Dic.i18n.length > 0 ) {  
	//	proUrl += "&i18n=" +Dic.i18n;
	//}
	for(var key in param){
		proUrl += "&" +key+ "=" +param[key]; 
	}
	return proUrl;
}

