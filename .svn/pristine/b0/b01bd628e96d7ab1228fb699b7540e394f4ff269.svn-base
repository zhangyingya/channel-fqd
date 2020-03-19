/**
 * 初始化下拉组件
 * infoContent : 下拉内容数据如：[
	                       {"ID":1, "NAME":"名1"},
	                       {"ID":2, "NAME":"名2"},
	                       {"ID":3, "NAME":"名3"}]
 * inputId : 输入框ID
 * hideId : 隐藏框ID
 * callBack: 选择内容后触发的回调方法 function(json){}
 * defValue : 默认选择值
 */
function initAutoCompSel(infoContent, inputId, hideId, callBack, defValue)
{
	var inputObj = null;
	var hideObj = null;
	if(typeof inputId == 'string'){
		inputObj = $("#"+ inputId);
	} else {
		inputObj =inputId;
	}
	if(typeof hideId == 'string'){
		hideObj = $("#"+ hideId);
	} else {
		hideObj =hideId;
	}
	//如果存在默认值
	if (defValue && defValue != "")
	{
		var ii = 0;
		while (ii < infoContent.length)
		{
			if (infoContent[ii].ID == defValue)
			{
				hideObj.val(defValue);
				inputObj.val(infoContent[ii].NAME);
				break;
			}
			ii++;
		}
	}
	
	//绑定向下箭头的单击事件
	inputObj.next().click(function(event)
	{
		inputObj.click();
		inputObj.focus().click();
	});
	
	//绑定回车
	inputObj.unbind("keydown").keydown(function(event) 
	{
		if (event.keyCode == '46') 
		{ 
			event.keyCode='13'; 
		}
	});
	var type = 0;
	var tempName = "";
	var viewWidth = inputObj.width() + 10;
	//清除下拉列表缓存
	inputObj.flushCache();
	inputObj.autocomplete(infoContent,
	{
		minChars:0,
		width:viewWidth, //下拉宽度
		matchContains:true,
		scrollHeight:150, //提示的高度，溢出显示滚动条
		scroll: true,     //滚动条
		mustMatch: false,
		selectFirst: true,
		formatItem: function(row, i, max) 
		{
			if ((inputObj.val() == row.NAME) && type == 0)
			{
				tempName = row.NAME;
				hideObj.val(row.ID);
				if (callBack)
				{
					callBack(row);
				}
				type = 1;
			}
			else if (type == 0)
			{
				tempName = "";
				hideObj.val("");
			}
			if (i == max)
			{
				type = 0;
			}
			return row.NAME;
		},
		formatMatch: function(row, i, max) {
			return row.NAME;
		},
		formatResult: function(row) {
			return row.NAME;
		}
	}).result(function(event, data, formatted){
			try{
				if(undefined != data.NAME && null != data.NAME){
					tempName = data.NAME;
					hideObj.val(data.ID);
				}else{
					tempName = "";
					hideObj.val("");
				}
				if (callBack){
					callBack(data);
				}
			}catch(e){
				hideObj.val("");
			}
	});
	//失去焦点时触发的事件
	inputObj.blur(function()
	{
		var val = this.value; 
		if (val == "")
		{
			hideObj.val("");
			tempName = "";
		}
		else if (hideObj.val() == "" || val != tempName)
		{
			inputObj.val("");
			hideObj.val("");
			tempName = "";
		}
	});
	//变更事件
	inputObj.keyup(function(event)
	{
		if(event.keyCode == "8" || event.keyCode == "46")    
		{
			return false;
		}
		var val = $.trim(this.value);
		if (val != "")
		{
			var tempVal, tempInfo;
			var eq = false;
			var onlyOne = true;
			tempVal = val.toUpperCase();
			for (var k = 0; k < infoContent.length; k++)
			{
				tempInfo = infoContent[k];
				if (tempInfo.NAME.indexOf(tempVal) > -1 && tempInfo.NAME.length > tempVal.length)
				{
					onlyOne = false;
				}
				if (tempInfo.NAME == tempVal)
				{
					eq = true;
				}
			}
			if(!eq || !onlyOne)
			{
				return false;
			}
			
			//根据名称进行拆分匹配Id
			for (var j = 0; j < infoContent.length; j++)
			{
				tempInfo = infoContent[j];
				if (tempInfo.NAME == tempVal)
				{
					try{
						if(undefined != tempInfo.NAME && null != tempInfo.NAME){
							tempName = tempInfo.NAME;
							hideObj.val(tempInfo.ID);
							inputObj.val(tempInfo.NAME);
						}else{
							tempName = "";
							hideObj.val("");
							inputObj.val("");
						}
						if (callBack){
							callBack(tempInfo);
						}
					}catch(e){
						hideObj.val("");
						inputObj.val("");
					}
					break;
				}
			}
		}
	});
}

/**
 * 初始化下拉组件
 * _url : 数据请求地址
 * _extraParams : 请求参数 如：{"findPath":"2", "serviceId":"100157"}
 * inputId : 输入框ID
 * hideId : 隐藏框ID
 * _minChars : 最小输入字符0，就是全查询
 * callBack: 选择内容后触发的回调方法 function(json){}
 */
function initAutoCompSel2(_url, _extraParams, inputId, hideId, _minChars, callBack)
{
	var inputObj = null;
	var hideObj = null;
	if(typeof inputId == 'string'){
		inputObj = $("#"+ inputId);
	} else {
		inputObj =inputId;
	}
	if(typeof hideId == 'string'){
		hideObj = $("#"+ hideId);
	} else {
		hideObj =hideId;
	}
		
	//绑定向下箭头的单击事件
	inputObj.next().click(function(event)
	{
		inputObj.click();
		inputObj.focus().click();
	});
	
	//绑定回车
	inputObj.unbind("keydown").keydown(function(event) 
	{
		if (event.keyCode == '46') 
		{ 
			event.keyCode='13'; 
		}
	});
	var type = 0;
	var tempName = "";
	var viewWidth = inputObj.width() + 10;
	//清除下拉列表缓存
	inputObj.flushCache();
	inputObj.autocomplete(_url,
	{
		minChars : _minChars,
		dataType : "json",
		extraParams : _extraParams,
		cacheLength : 0,
		parse : function(data) 
		{  
            var rows = [];  
            if (data != undefined)
            {
            	for(var i=0; i<data.length; i++)
            	{    
            		rows[rows.length] = {    
            				data:data[i],              	//下拉框显示数据格式   
            				value:data[i].ID,     		//选定后实际数据格式  
            				result:data[i].NAME   	//选定后输入框显示数据格式  
            		}; 
            	}
            }
            return rows;  
        }, 
		width:viewWidth, //下拉宽度
		matchContains:true,
		scrollHeight:150, //提示的高度，溢出显示滚动条
		scroll: true,     //滚动条
		mustMatch: false,
		selectFirst: true,
		formatItem: function(row, i, max) 
		{
			if ((inputObj.val() == row.NAME) && type == 0)
			{
				tempName = row.NAME;
				hideObj.val(row.ID);
				if (callBack)
				{
					callBack(row);
				}
				type = 1;
			}
			else if (type == 0)
			{
				tempName = "";
				hideObj.val("");
			}
			if (i == max)
			{
				type = 0;
			}
			return row.NAME;
		},
		formatMatch: function(row, i, max) {
			return row.NAME;
		},
		formatResult: function(row) {
			return row.NAME;
		}
	}).result(function(event, data, formatted){
		try{
			if(undefined != data.NAME && null != data.NAME){
				tempName = data.NAME;
				hideObj.val(data.ID);
			}else{
				tempName = "";
				hideObj.val("");
			}
			if (callBack){
				callBack(data);
			}
		}catch(e){
			hideObj.val("");
		}
	});
	//失去焦点时触发的事件
	inputObj.blur(function()
	{
		var val = this.value;
		if (val == "")
		{
			hideObj.val("");
			tempName = "";
		}
		else if (hideObj.val() == "" || val != tempName)
		{
			inputObj.val("");
			hideObj.val("");
			tempName = "";
		}
	});
}

/**
 * 初始化下拉组件（支持模糊大小写字符查询过滤，前提是需要对sql的查询条件做小写转换匹配）
 * _url : 数据请求地址
 * _extraParams : 请求参数 如：{"findPath":"2", "serviceId":"100157"}
 * inputId : 输入框ID
 * hideId : 隐藏框ID
 * _minChars : 最小输入字符0，就是全查询
 * isCase ：true 全部转换成小写字母传值给后台
 * callBack: 选择内容后触发的回调方法 function(json){}
 */
function initAutoCompSel3(_url, _extraParams, inputId, hideId, _minChars, isCase, callBack)
{
	var inputObj = null;
	var hideObj = null;
	if(typeof inputId == 'string'){
		inputObj = $("#"+ inputId);
	} else {
		inputObj =inputId;
	}
	if(typeof hideId == 'string'){
		hideObj = $("#"+ hideId);
	} else {
		hideObj =hideId;
	}
		
	//绑定向下箭头的单击事件
	inputObj.next().click(function(event)
	{
		inputObj.click();
		inputObj.focus().click();
	});
	
	//绑定回车
	inputObj.unbind("keydown").keydown(function(event) 
	{
		if (event.keyCode == '46') 
		{ 
			event.keyCode='13'; 
		}
	});
	var type = 0;
	var tempName = "";
	var viewWidth = inputObj.width() + 10;
	//清除下拉列表缓存
	inputObj.flushCache();
	inputObj.autocomplete(_url,
	{
		minChars : _minChars,
		dataType : "json",
		extraParams : _extraParams,
		cacheLength : 0,
		parse : function(data) 
		{  
            var rows = [];  
            if (data != undefined)
            {
            	for(var i=0; i<data.length; i++)
            	{    
            		rows[rows.length] = {    
            				data:data[i],              	//下拉框显示数据格式   
            				value:data[i].ID,     		//选定后实际数据格式  
            				result:data[i].NAME   	//选定后输入框显示数据格式  
            		}; 
            	}
            }
            return rows;  
        }, 
		width:viewWidth, //下拉宽度
		matchContains:true,
		scrollHeight:150, //提示的高度，溢出显示滚动条
		scroll: true,     //滚动条
		matchCase: isCase == true ? false :true ,	// 把输入的值转换成小写传给后台做模糊查询
		mustMatch: false,
		selectFirst: true,
		formatItem: function(row, i, max) 
		{
			if ((inputObj.val() == row.NAME) && type == 0)
			{
				tempName = row.NAME;
				hideObj.val(row.ID);
				if (callBack)
				{
					callBack(row);
				}
				type = 1;
			}
			else if (type == 0)
			{
				tempName = "";
				hideObj.val("");
			}
			if (i == max)
			{
				type = 0;
			}
			return row.NAME;
		},
		formatMatch: function(row, i, max) {
			return row.NAME;
		},
		formatResult: function(row) {
			return row.NAME;
		}
	}).result(function(event, data, formatted){
		try{
			if(undefined != data.NAME && null != data.NAME){
				tempName = data.NAME;
				hideObj.val(data.ID);
			}else{
				tempName = "";
				hideObj.val("");
			}
			if (callBack){
				callBack(data);
			}
		}catch(e){
			hideObj.val("");
		}
	});
	//失去焦点时触发的事件
	inputObj.blur(function()
	{
		var val = this.value;
		if (val == "")
		{
			hideObj.val("");
			tempName = "";
		}
		else if (hideObj.val() == "" || val != tempName)
		{
			inputObj.val("");
			hideObj.val("");
			tempName = "";
		}
	});
}

/**
 * 初始化下拉组件
 * _url : 数据请求地址
 * _extraParams : 请求参数 如：{"findPath":"2", "serviceId":"100157"}
 * inputId : 输入框ID
 * hideId : 隐藏框ID
 * _minChars : 最小输入字符0，就是全查询
 * width : 宽度   可选参数 下拉框宽度  避免输入框隐藏时加载的下拉框没有宽度问题 20180120
 * callBack: 选择内容后触发的回调方法 function(json){}
 */
function initAutoCompSel4(_url, _extraParams, inputId, hideId, _minChars, callBack, width)
{
	var inputObj = null;
	var hideObj = null;
	if(typeof inputId == 'string'){
		inputObj = $("#"+ inputId);
	} else {
		inputObj =inputId;
	}
	if(typeof hideId == 'string'){
		hideObj = $("#"+ hideId);
	} else {
		hideObj =hideId;
	}
		
	//绑定向下箭头的单击事件
	inputObj.next().click(function(event)
	{
		inputObj.click();
		inputObj.focus().click();
	});
	
	//绑定回车
	inputObj.unbind("keydown").keydown(function(event) 
	{
		if (event.keyCode == '46') 
		{ 
			event.keyCode='13'; 
		}
	});
	var type = 0;
	var tempName = "";
	var viewWidth;
	if(width != undefined && typeof width == 'string'){
		viewWidth = width;
	}else{
		viewWidth = inputObj.width() + parseInt(inputObj.css("paddingLeft")) + parseInt(inputObj.css("paddingRight"));
	}
	//清除下拉列表缓存
	inputObj.flushCache();
	inputObj.autocomplete(_url,
	{
		minChars : _minChars,
		dataType : "json",
		extraParams : _extraParams,
		cacheLength : 0,
		parse : function(data) 
		{  
            var rows = [];  
            if (data != undefined)
            {
            	for(var i=0; i<data.length; i++)
            	{    
            		rows[rows.length] = {    
            				data:data[i],              	//下拉框显示数据格式   
            				value:data[i].ID,     		//选定后实际数据格式  
            				result:data[i].NAME   	//选定后输入框显示数据格式  
            		}; 
            	}
            }
            return rows;  
        }, 
		width:viewWidth, //下拉宽度
		matchContains:true,
		scrollHeight:150, //提示的高度，溢出显示滚动条
		scroll: true,     //滚动条
		mustMatch: false,
		selectFirst: true,
		formatItem: function(row, i, max) 
		{
			if ((inputObj.val() == row.NAME) && type == 0)
			{
				tempName = row.NAME;
				hideObj.val(row.ID);
				if (callBack)
				{
					callBack(row);
				}
				type = 1;
			}
			else if (type == 0)
			{
				tempName = "";
				hideObj.val("");
			}
			if (i == max)
			{
				type = 0;
			}
			return row.NAME;
		},
		formatMatch: function(row, i, max) {
			return row.NAME;
		},
		formatResult: function(row) {
			return row.NAME;
		}
	}).result(function(event, data, formatted){
		try{
			if(undefined != data.NAME && null != data.NAME){
				tempName = data.NAME;
				hideObj.val(data.ID);
			}else{
				tempName = "";
				hideObj.val("");
			}
			if (callBack){
				callBack(data);
			}
		}catch(e){
			hideObj.val("");
		}
	});
	//失去焦点时触发的事件
	inputObj.blur(function()
	{
		var val = this.value;
		if (val == "")
		{
			hideObj.val("");
			tempName = "";
		}
		else if (hideObj.val() == "" || val != tempName)
		{
			inputObj.val("");
			hideObj.val("");
			tempName = "";
		}
	});
}