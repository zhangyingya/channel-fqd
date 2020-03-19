/**
 * 自定义标签异步加载，目前支持：select、radio、checkbox；
 */
Tablib = function(){

	/**
	 * 展示区域的元素对象，该元素不做限制可以是div、ul等等
	 */
	this.operationDiv = null;

	/**
	 * 下拉框的主要样式名称（默认：xl_con）
	 */
	this.opClassName = 'xl_con';

	/**
	 * 【select下拉框】选择事件、【radio】选中事件、【checkbox】勾选或者取消事件
	 */
	this.onclick = null;
	
	/**默认值*/
	this.defaultId = null;

	/**
	 * 操作元素的类型，目前支持：select、radio、checkbox；
	 */
	this.elementName = 'select';
	
	/**
	 * 如果为radio、checkbox需要设置一个组名groupName(需要必须传递)
	 */
	this.groupName = '';

	/**
	 * 查询参数
	 */
	this.defaultConfig = {
		// 1-公共业务字典表查询，2-自定义表
		tagType : 1,
		// 条件集合，多个条件用逗号“#”隔开
		condition : '',
		// 如果需要在下拉框中加入全部项，则设置isAll=true
		isAll : false,
		allParam : '全部',	//下拉框默认参数
		// 查询sqlkey
		sqlscriptID : 'TAGLIB.queryConfigCode',
		// 仅仅只读，不加载事件
		readOnly : false
	};

	/**
	 * 展示的结果集
	 */
	this.tagData = null;
	
	/**
	 * 初始化select样式是设置值
	 */
	this.initSelectElement = function() {
		var _this = this;
		var xiala = this.operationDiv.parent().parent();
		
		if(true != this.defaultConfig.readOnly) {
			// 下拉层显示与隐藏
			xiala.hover(function(){
				$(this).find("."+ _this.opClassName).show();
			},function(){
				$(this).find("."+ _this.opClassName).hide();
			});
			// 下拉层选择赋值
			this.operationDiv.find("li").click(function(){
				var key = $(this).attr('key');
				var value = $(this).attr('tValue');
				xiala.find("input[tar=key]").attr("value",key);
				xiala.find("input[tar=value]").val(value);
				xiala.find("input[tar=value]").focus();
				xiala.find("."+ _this.opClassName).hide();
				// 调用自定义回调点击事件
				if(_this.onclick && _this.onclick != null ) {
					_this.onclick( key, value);
				}
			});
			xiala.find("input[tar=value]").change(function(){
				xiala.find("input[tar=key]").val('');
			});
		}
		// 根据select中已有的值，初始化显示到文本框中
		var defaultKey = xiala.find("input[tar=key]").val();
		if(defaultKey.length > 0) {
			var selli = xiala.find('li[key=' +defaultKey+ ']');
			xiala.find("input[tar=value]").val(selli.attr('tValue') );
		}
	}

	/**
	 * 初始化查询select中数据
	 */
	this.initTagData = function() {
		if(null == this.tagData) {
			// 封装请求数据对象
			var requestObj = new Object();
			requestObj['url'] = ctx + '/taglib/onloadData.html';
			requestObj['data'] = new Object();
			requestObj['data'].tagType = this.defaultConfig.tagType;
			requestObj['data'].condition = this.defaultConfig.condition;
			requestObj['data'].sqlscriptID = this.defaultConfig.sqlscriptID;
			var responseObj = Dic.Ajax.request(requestObj);
			if(null != responseObj && '200' == responseObj.resultCode && responseObj.result) {
				this.tagData = responseObj.result;
			}
		}
	}
	
	/**
	 * 加载radio
	 */
	this.radioProcess = function(){
		if(null != this.tagData) {
			var appInfoHTML = "";
			for (var i = 0 ; i < this.tagData.length ; i ++ ) {
				var appData = this.tagData[i];
				var isDisabled = "";
				if(true == this.defaultConfig.readOnly) {
					isDisabled = 'disabled="disabled"';
				}
				appInfoHTML += '<label class="ml20 fl"><input name="' + this.groupName + '" ' +isDisabled+ ' type="radio" value="' + appData.codeVal + '" ' + (this.defaultConfig.defaultId == appData.codeVal ? 'checked' : '') + '>' + appData.codeName + '</input></label>';
			}
			this.operationDiv.html(appInfoHTML);
			this.initRadioElement();
		} else {
			this.operationDiv.html('');
		}
	};
	/**
	 * 初始化radio选中事件
	 */
	this.initRadioElement = function() {
		var _this = this;
		if(true != this.defaultConfig.readOnly) {
			this.operationDiv.find("input[type=radio]").click(function(){
				// 调用自定义回调点击事件
				if(_this.onclick && _this.onclick != null) {
					_this.onclick($(this).val());
				}
			});
		}
	}
	
	/**
	 * 加载checkbox
	 */
	this.checkboxProcess = function(){
		if(null != this.tagData) {
			var appInfoHTML = '';
			for (var i = 0 ; i < this.tagData.length ; i ++ ) {
				var appData = this.tagData[i];
				var compareData = ',' + this.defaultConfig.defaultId + ',';
				var isCompCheck = '';
				if(compareData.indexOf(','+appData.code+ ',') > -1) {
					isCompCheck = 'checked="checked"';
				}
				var isDisabled = "";
				if(true == this.defaultConfig.readOnly) {
					isDisabled = 'disabled="disabled"';
				}
				appInfoHTML += '<label class="ml20 fl"><input name="' + this.groupName + '" ' +isDisabled+ ' type="checkbox" value="' + appData.codeVal + '" ' +isCompCheck+ '>' + appData.codeName + '</input></label>';
			}
			this.operationDiv.html(appInfoHTML);
			this.initCheckboxElement();
		} else {
			this.operationDiv.html('');
		}
	};
	/**
	 * 初始化checkbox选中事件
	 */
	this.initCheckboxElement = function() {
		var _this = this;
		if(true != this.defaultConfig.readOnly) {
			var inputBoxs = this.operationDiv.find("input[type=checkbox]");
			inputBoxs.click(function(){
				// 调用自定义回调点击事件
				if(_this.onclick && _this.onclick != null) {
	                var isSelArray = new Array();
	                _this.operationDiv.find("input[type=checkbox]:checkbox").each(function () {
	                    if ($(this).is(":checked")) {
	                    	isSelArray.push($(this).val());
	                    }
	                });
					_this.onclick(isSelArray.join(","));
				}
			});
		}
	}
	
	/**
	 * 加载select元素的内容并初始化事件
	 */
	this.selectProcess = function() {
		if(null != this.tagData) {
			//appInfoUl
			var appInfoHTML = "";
			if(this.defaultConfig.isAll) {
				appInfoHTML += '<li key="" tValue="' +this.defaultConfig.allParam+ '" style="width:100%;"><a>' +this.defaultConfig.allParam+ '</a></li>';
			}
			for (var i = 0 ; i < this.tagData.length ; i ++ ) {
				var appData = this.tagData[i];
				appInfoHTML += '<li key="'+appData.codeVal+'" tValue="'+appData.codeName+'" style="width:100%;"><a>'+appData.codeName+'</a></li>';

				var xiala = this.operationDiv.parent().parent();
				var hideVal = xiala.find("input[tar=key]").val();
				if(hideVal == appData.code){
					xiala.find("input[tar=key]").val(appData.codeVal);
					xiala.find("input[tar=value]").val(appData.codeName);
				}
			}
			this.operationDiv.html(appInfoHTML);
			this.initSelectElement();
		} else {
			this.operationDiv.html('');
		}
	}
	
	/**
	 * 加载元素的内容并初始化事件
	 */
	this.onload = function() {
		if ('select' == this.elementName) {
			this.initTagData();
			this.selectProcess();
		} else if ('radio' == this.elementName) {
			this.initTagData();
			this.radioProcess();
		} else if ('checkbox' == this.elementName) {
			this.initTagData();
			this.checkboxProcess();
		} else {
			alert('待开发中，请仔细阅读taglib.js');
		}
	}
	
	/**
	 * 组装请求参数
	 */
	this.setParam = function(tData) {
		// 1-公共业务字典表查询，2-自定义表
		this.defaultConfig.tagType = this.operationDiv.attr('tagType');
		// 条件集合，多个条件用逗号“#”隔开
		var cond = this.operationDiv.attr('condition');
		this.defaultConfig.condition = (cond == undefined || cond.length == 0 ) ? '' : cond;
		// 如果需要在下拉框中加入全部项，则设置isAll=true
		var isAll = this.operationDiv.attr('isAll');
		this.defaultConfig.isAll = (isAll != undefined && isAll == 'true' ) ? true : false;
		if(this.defaultConfig.isAll) {
			var allParam = this.operationDiv.attr('allParam');
			this.defaultConfig.allParam = (allParam != undefined && allParam.length > 0 ) ? allParam : "全部";
		}
		// 查询sqlkey
		this.defaultConfig.sqlscriptID = this.operationDiv.attr('sqlscriptID');
		this.defaultConfig.defaultId = this.operationDiv.attr("defaultId");
		// 操作元素的类型，目前支持：select、radio、checkbox；
		this.elementName = this.operationDiv.attr('elementName');
		// 如果为radio、checkbox需要设置一个组名groupName
		this.groupName = this.operationDiv.attr('groupName');
		if(this.groupName == undefined || this.groupName == '') {	// 为了兼容以前代码加上
			this.groupName = this.defaultConfig.condition;
		}
		// 设置是否可读
		var isReadOnly = this.operationDiv.attr('read');
		this.defaultConfig.readOnly = (isReadOnly == 'true') ? true : false;
	}
	
	this.init = function(tData) {
		// 列表table展示对象
		this.operationDiv = tData['operationDiv'];
		// 下拉框的主要样式名称（默认：xl_con）
		if(tData['className']) {
			this.opClassName = tData['className'];
		}
		// 下拉框选择事件
		if(tData['onclick']) {
			this.onclick = tData['onclick'];
		}
		// 下拉框选择的数据集合
		if(tData['tagData']) {
			this.tagData = tData['tagData'];
		}
		// 组装请求参数
		this.setParam();
		// 加载页面元素
		this.onload();
	}
	
}