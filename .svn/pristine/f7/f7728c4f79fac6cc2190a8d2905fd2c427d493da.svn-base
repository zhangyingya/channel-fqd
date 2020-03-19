/**
 * 首页控制JS
 * 
 */
Index_menu = function() {
	
	/**
	 * 头部+导航(一级菜单目录)
	 */
	this.firstMenuDiv = null;
	
	/**
	 * 二、三级菜单div
	 */
	this.secondMenuDiv = null;
	
	/**
	 * 主页面mainDiv
	 */
	this.mainDiv = null;
		
	/**
	 * 菜单数据集合
	 */
	this.menuData = null;
	
	/**
	 * 存放所有一级菜单的Array集合
	 */
	this.firstMenuArray = new Array();

	/**
	 * 存放所有一级菜单下面的子菜单的HTML(key=firstPrivilegeId;value=HTML)
	 */
	this.firstChildHtml = new Object();

	/**
	 * 存放所有1、2、3三级菜单所有节点(key=PrivilegeId;value=menuObject)
	 */
	this.allMenuObject = new Object();
	var _this = this;
	
	/**
	 * 异步查询当前登陆用户的数据（包括登陆的用户基本信息、菜单）
	 */
	this.ajaxFindUserData = function() {
		// 封装请求数据对象
		var domain = this;
		var fun = this.initFirstMenu;
		$.getJSON(ctx + '/index/findFuncMenuByUser.do?time=' + new Date(), function(json) {
			if (!json){
				return;
			}
			fun.call(domain, json);
		});
	};
	
	/**
	 * 初始化一级菜单
	 */
	this.initFirstMenu = function(json) {
		this.menuData = json;
		if(null != this.menuData && this.menuData.length > 0) {
			var firstMenuIndex = 0;
			for(var i = 0 ; i < this.menuData.length ; i ++ ) {
				var tMenu = this.menuData[i];
				if(tMenu.menuLevel == 1) {
					this.firstMenuArray[firstMenuIndex] = tMenu;
					this.firstChildHtml[parseInt(tMenu.menuId)] = -1;
					this.allMenuObject[parseInt(tMenu.menuId)] = tMenu;
					firstMenuIndex ++ ;
				}
			}
			this.writeFirstMenu();
		}
	};
	
	/**
	 * 写firstMenuDiv域下面的一级菜单
	 */
	this.writeFirstMenu = function() {
		// STEP-1 获取1级菜单的html
		var writeHTML = '';
		for(var i = 0 ; i < this.firstMenuArray.length ; i ++ ) {
			var tMenu = this.firstMenuArray[i];
			// 1、根据菜单的长度更改宽度样式
			// 2、判断是否有二级菜单
			if(false == tMenu.disable ) {
				var menuLen = tMenu.menuName.length;
				if (menuLen == 4){
					writeHTML += '<dl><dd firstMenuDl="' +tMenu.menuId+ '"  >' + '<a>' +tMenu.menuName+ '</a>'  + '</dd></dl>';
				} else if (menuLen == 5 || menuLen == 6) {
					writeHTML += '<dl style="width:110px;height:40px;text-align:center;position:relative;"><dd firstMenuDl="' +tMenu.menuId+ '">' + '<a>' +tMenu.menuName+ '</a>'  + '</dd></dl>';
				} else if (menuLen == 7) {
					writeHTML += '<dl style="width:130px;height:40px;text-align:center;position:relative;"><dd firstMenuDl="' +tMenu.menuId+ '">' + '<a>' +tMenu.menuName+ '</a>'  + '</dd></dl>';
				} else if (menuLen == 8) {
					writeHTML += '<dl style="width:150px;height:40px;text-align:center;position:relative;"><dd firstMenuDl="' +tMenu.menuId+ '">' + '<a>' +tMenu.menuName+ '</a>'  + '</dd></dl>';
				}
			} else {
				var menuLen = tMenu.menuName.length;
				if (menuLen == 4){
					writeHTML += '<dl><dd firstMenuDl="' +tMenu.menuId+ '" class="icon-jt" >' + '<a>' +tMenu.menuName+ '</a>'  + '</dd></dl>';
				} else if (menuLen == 5 || menuLen == 6) {
					writeHTML += '<dl style="width:110px;height:40px;text-align:center;position:relative;"><dd firstMenuDl="' +tMenu.menuId+ '" class="icon-jt" >' + '<a>' +tMenu.menuName+ '</a>'  + '</dd></dl>';
				} else if (menuLen == 7) {
					writeHTML += '<dl style="width:130px;height:40px;text-align:center;position:relative;"><dd firstMenuDl="' +tMenu.menuId+ '" class="icon-jt" >' + '<a>' +tMenu.menuName+ '</a>'  + '</dd></dl>';
				} else if (menuLen == 8) {
					writeHTML += '<dl style="width:150px;height:40px;text-align:center;position:relative;"><dd firstMenuDl="' +tMenu.menuId+ '" class="icon-jt" >' + '<a>' +tMenu.menuName+ '</a>'  + '</dd></dl>';
				}
			}
			
		}
		// STEP-2 显示html
		this.firstMenuDiv.html(writeHTML);
		// STEP-3 注入事件
		var thisObj = this;
		// 一级菜单鼠标移入样式
		this.firstMenuDiv.find('dd[firstMenuDl]>a').mouseenter(	// 鼠标移入移出样式
			function(){
				//鼠标移入
				thisObj.secondMenuDiv.hide();
				$(this).removeClass("hover");
                $(this).parent().siblings().find(">a").removeClass('hover');
		    	var firstPrivilegeId = $(this).parent().attr("firstMenuDl");
		    	if(thisObj.initSecondMenu(firstPrivilegeId)) {	// 2、3级菜单有数据才显示
		    		thisObj.secondMenuShow($(this).parent());
		    	}
			}
		);
		// 一级菜单鼠标点击事件
		this.firstMenuDiv.find('dd[firstMenuDl]').click(function() { 	// 鼠标点击事件
	    	var ttPrivilegeId = $(this).attr("firstMenuDl");
	    	var ttMenuObject = thisObj.allMenuObject[parseInt(ttPrivilegeId)];
	    	//ttMenuObject.disable:false没有子节点(is_leaf:0)，true有子节点(is_leaf:1)
	    	//ttMenuObject.open:true新开窗口(menu_target:newWin)，false
	    	if(true == ttMenuObject.open) {
//	    	if(false == ttMenuObject.disable && true == ttMenuObject.open) {
	    		/*  var menuRecordUrl = ctx+'/sso/MenuClickServlet?menu_url='+ttMenuObject.url+'&menu_name=' +encodeURI(encodeURI(ttMenuObject.name))+'&menu_level='+ttMenuObject.level+'&menu_id='+ttMenuObject.id;
				  $.getJSON(menuRecordUrl , function(json) {
				  });*/
	    		window.open(ttMenuObject.url,ttMenuObject.id,'top=0, left=0, toolbar=yes, menubar=yes, scrollbars=yes, resizable=yes, location=yes, status=yes');
//	    	} else if('mainFrm' == ttMenuObject.target && false == ttMenuObject.disable) {
	    	} else if('mainFrm' == ttMenuObject.target && false == ttMenuObject.disable) {
	    		thisObj.onloadChildSystemPage(ttMenuObject);
	    	}
		});
		// 2、3级菜单鼠标移出样式
		this.secondMenuDiv.mouseleave(	// 移出样式
			function(){
		    	//鼠标移出
		    	thisObj.secondMenuDiv.hide(200);
                //$(".menu-ul a").removeClass('hover');
			}
		);
		// 鼠标移入main主页面后隐藏2、3级菜单
		this.mainDiv.mouseenter(
			function(){
		    	//鼠标移出
		    	thisObj.secondMenuDiv.hide(200);
			}
		);
		// 设置菜单是否滚动
		this.resizeMenu();
	};
	
	/**
	 * 二、三级菜单的展示和展示位置
	 */
	this.secondMenuShow = function(firstMenuElement) {
        var firstMenuLeft = firstMenuElement.offset().left;
        var windowWidth = $(window).width();
        // 因为设置了padding 会影响20px
        var secondMenuWidth = this.secondMenuDiv.width();
        var secondMenuTop = firstMenuElement.offset().top + firstMenuElement.height();
        var secondMenuLeft = firstMenuLeft;
        var secondMenuRight = firstMenuLeft + secondMenuWidth;
        if(secondMenuLeft < 0) {
            secondMenuLeft = 0;
        }
        if(secondMenuRight + 24 >= windowWidth ) {
    		secondMenuLeft = windowWidth - secondMenuWidth - 24;
    		secondMenuRight = windowWidth - 24;
    	}
        firstMenuElement.find("a").addClass("hover").siblings("dd").find(">a").removeClass('hover');
		this.secondMenuDiv.css({
			top : secondMenuTop,
			left : secondMenuLeft,
			width : secondMenuWidth
		});
		// this.secondMenuDiv.slideDown("fast");
		this.secondMenuDiv.show();
	};
	

	/**
	 * 初始化二、三级菜单
	 */
	this.initSecondMenu = function(firstPrivilegeId) {
		// STEP-1 获取2、3级菜单的html
		var tHtml = this.firstChildHtml[parseInt(firstPrivilegeId)];
		if(-1 == tHtml) {
			tHtml = this.joinMenu(firstPrivilegeId);
		}
		// STEP-2 显示html
		this.secondMenuDiv.html(tHtml);
		if('' != tHtml) {
			// STEP-3 注入事件
			var thisObj = this;
			this.secondMenuDiv.find('a[menuA]').click(function() {
		    	var ttPrivilegeId = $(this).attr("menuA");
		    	var ttMenuObject = thisObj.allMenuObject[parseInt(ttPrivilegeId)];
		    	if( true == ttMenuObject.open ) {
		    		window.open(ttMenuObject.url,ttMenuObject.privilegeName,'top=0, left=0, toolbar=yes, menubar=yes, scrollbars=yes, resizable=yes, location=yes, status=yes');
		    	} else if('mainFrm' == ttMenuObject.target && false == ttMenuObject.disable) {
		    		/*  var menuRecordUrl = ctx+'/sso/servlet/MenuClickServlet?menu_url='+ttMenuObject.url+'&menu_name=' +encodeURI(encodeURI(ttMenuObject.name))+'&menu_level='+ttMenuObject.level+'&menu_id='+ttMenuObject.id;
					  $.getJSON(menuRecordUrl , function(json) {
					  });*/
		    		thisObj.onloadChildSystemPage(ttMenuObject);
		    	}
			});
			return true;
		} else {
			return false;
		}
	};
	
	/**
	 * 组合2、3级菜单
	 * return 返回组装好的html
	 */
	this.joinMenu = function(firstPrivilegeId) {
		var firstHtml = '';
		// STEP-1 获取该一级节点下所有二三级菜单
		for(var i = 0 ; i < this.menuData.length ; i ++ ) {
			var tMenu2 = this.menuData[i];
			if( (tMenu2.parMenuId + '') == firstPrivilegeId ) {
				this.allMenuObject[parseInt(tMenu2.menuId)] = tMenu2;
				// STEP-2 拼接2、3级菜单和保存3级菜单的数据
				firstHtml += '<ul>';
				firstHtml += '<li><a menuA="' +tMenu2.menuId+ '" class="a_h3">' +tMenu2.menuName+ '</a></li>';
				firstHtml += '<li class="ml10">';
				var second_num = "";
				for(var j = 0 ; j < this.menuData.length ; j ++ ) {
					var tMenu3 = this.menuData[j];
					if( tMenu3.parMenuId == tMenu2.menuId ) {
						// STEP-3保存3级菜单的数据
						this.allMenuObject[parseInt(tMenu3.menuId)] = tMenu3;
						firstHtml += '<a menuA="' +tMenu3.menuId+ '" href="#">' +tMenu3.menuName+ '</a><span>|</span>';
						second_num = '<a menuA="' +tMenu3.menuId+ '" href="#">' +tMenu3.menuName+ '</a><span>|</span>';
					}
				}
				//去除最后一个"|"
				if("" != second_num){
					firstHtml = firstHtml.replace(second_num, second_num.replace("<span>|</span>", "<span></span>"));
				}
				firstHtml += '</li>';
				firstHtml += '</ul>';
			}
		}
		this.firstChildHtml[parseInt(firstPrivilegeId)] = firstHtml;
		return firstHtml;
	};
	
	/**
	 * 加载各个集成子系统的页面
	 */
	this.onloadChildSystemPage = function(ttMenu) {  
		var timstamp = new Date().valueOf();
		var url = ttMenu.url;
		
		//记录菜单点击的点击的记录 BEGIN
		//url+="&menu_id="+ttMenu.id+"&menu_leve="+ttMenu.level+"&menu_name="+ttMenu.name;
			$.getJSON(ctx+"/sso/servlet/ssoMenuClick", { "menu_id": ttMenu.id, "menu_leve": ttMenu.level,"menu_name": ttMenu.name,"menu_url":ttMenu.url}, function(ret){});
		//记录菜单点击的点击的记录 END
		
		if(url) {
			if (url.indexOf("?")>=0){
				url = url +"&t=" + timstamp;
			}else {
				url = url + "?t=" + timstamp;
			}
			// STEP-1 动态增加mainFrame的样式
			this.setMainFrmLayout('');
			// STEP-2 点击改变iframe的url地址
			this.mainDiv.find('#mainFrm').show();
			this.mainDiv.find('#mainFrm').attr('src', url);
		}
		// sssssss
		//
		
	};
	
	
	
	/**
	 * 初始化指定的mainFrame的展示区域
	 */
	this.setMainFrmLayout = function(frameIndex) {
		var mainTop = this.mainDiv.offset().top;
		var windowHeight = $(window).height() - 20;
		var windowWidth = $(window).width() - 20;
		this.mainDiv.find('#mainFrm'+frameIndex).css({
			width: windowWidth,
			height: windowHeight - mainTop - 3,	// 3就是多table页的下边线的3px
			display : 'none'
		});
	};
	
	/**
	 * 进入portal首页
	 */
	this.gotoMainPage = function() {
		var portalFirstUrl = ctx + '/sso/servlet/PortalServlet';
		var timstamp = new Date().valueOf();
		if (portalFirstUrl.indexOf("?")>=0){  
			portalFirstUrl = portalFirstUrl + "&t=" + timstamp;   
		}else {  
			portalFirstUrl = portalFirstUrl + "?t=" + timstamp;  
		}
		this.mainDiv.html('<iframe id="mainFrm" name="mainFrm" frameborder="0" scrolling="auto"></iframe>');
		this.setMainFrmLayout('');
		this.mainDiv.find('#mainFrm').show();
		this.mainDiv.find('#mainFrm').attr('src', portalFirstUrl);
	};
	
	/**
	 * 设置菜单是否滚动
	 */
	this.resizeMenu = function() {
		var options = { ul : $("#firstMenuDiv"), leftArrow : $(".left-dir"), rightArrow : $(".right-dir")};
		$("#outer").tabScroll(options).ifScroll();
	};
	
	/**
	 * 头部员工信息滑动效果
	 */
	this.showUserInfo = function() {
		$(".user").hover(function(){
			$(".user-xx").show();
			$(".user-xx").hover(function(){$(this).show()},function(){$(this).hide();});
		},function(){
			$(".user-xx").hide();
		});
	};
	

	this.bindMethod = function() {
		this.allPage.find("img[name=welcomePage]").unbind().bind("click",function(){
			var mainDiv = $('#mainDiv');
			var portalFirstUrl = ctx + '/sso/servlet/PortalServlet';
			var timstamp = new Date().valueOf();
			if (portalFirstUrl.indexOf("?")>=0){  
				portalFirstUrl = portalFirstUrl + "&t=" + timstamp;   
			}else {  
				portalFirstUrl = portalFirstUrl + "?t=" + timstamp;  
			}
			mainDiv.find('#mainFrm').attr('src', portalFirstUrl);
		});
	};

	// 组装渠道
	this.pushJD = function(){
		$("#jdul").empty();
		if('' != EMPLOG_HALLS){
			var halls = $.parseJSON(EMPLOG_HALLS);
			var jdulHtml = '<li><a>' + EMPEE_NAME + '</a>&nbsp;&nbsp;所在渠道组织如下，请选择</li>';
			if(''!= halls && halls.length > 0){
				jdulHtml += '<li><div class="checkbox1" id="radiobox">';
				var currHall = halls[halls.length - 1];
				for (var index = 0; index < halls.length - 1; index++) {
					if(halls[index]["CHANNEL_ID"] == currHall["CHANNEL_ID"]){
						jdulHtml += '<p><span class="radio-check radio-checked"><input index="'+index+'" name="jdname" value="'+halls[index]["CHANNEL_ID"]+'" type="radio" checked/></span>&nbsp;&nbsp;['+halls[index]["CHANNEL_TYPE_NAME"]+']'+halls[index]["CHANNEL_NAME"]+'</p>';
					}else{
						jdulHtml += '<p><span class="radio-check"><input index="'+index+'" name="jdname" value="'+halls[index]["CHANNEL_ID"]+'" type="radio"/></span>&nbsp;&nbsp;['+halls[index]["CHANNEL_TYPE_NAME"]+']'+halls[index]["CHANNEL_NAME"]+'</p>';
					}
				}
				if ('1' != currHall["STATE"] && undefined != currHall["CHANNEL_ID"]) {
					jdulHtml += '<p><span class="radio-check radio-checked"><input name="jdname" value="'+currHall["CHANNEL_ID"]+'" type="radio" checked/></span>&nbsp;&nbsp;['+currHall["CHANNEL_TYPE_NAME"]+']'+currHall["CHANNEL_NAME"]+'</p>';
				}
				jdulHtml += '</div></li>';
				jdulHtml += '<li id="qudaoqr"><em>['+currHall["CHANNEL_TYPE_NAME"]+']'+currHall["CHANNEL_NAME"]+'&nbsp;&nbsp;&nbsp;&nbsp;是否确认？</em></li>';
				jdulHtml += '<li class="align-c"><button id="jdClick" class="gy-btn blue-btn">确定</button></li>';
				
				$("#jdul").html(jdulHtml);
				
				//	加载营业厅名称
				$("#changeBusHall").text(currHall["INTER_ORG_NAME"]);
				$("#changeBusHall").attr("title",currHall["INTER_ORG_NAME"]);
				
				//	单选按钮事件
				$('#radiobox input[name="jdname"]').click(function(){
					$('#radiobox span').removeClass('radio-checked');
					$(this).parent().addClass('radio-checked');
					var checkVal = $('#radiobox input[name="jdname"]:checked');
					var indR = checkVal.attr("index");
					currHall = halls[indR];
					$('#qudaoqr').html('<em>['+currHall["CHANNEL_TYPE_NAME"]+']'+currHall["CHANNEL_NAME"]+'&nbsp;&nbsp;&nbsp;&nbsp;是否确认？</em>');
				});
				
				// 添加渠道选择事件
				$("#jdClick").click(function(){
					$.get(ctx + '/sso/servlet/EmpHallServlet?selChnlID='
							+ currHall["CHANNEL_ID"] + '&selChnlName='
							+ encodeURI(encodeURI(currHall["CHANNEL_NAME"]))
							+ '&selChnlTypeCd=' + currHall["CHANNEL_TYPE_CD"]
							                               + '&selChnlTypeName='
							                               + encodeURI(encodeURI(currHall["CHANNEL_TYPE_NAME"]))
							                               + '&oldOrdId=' + halls[halls.length - 1]["INTER_ORG_ID"] + '&time=' + new Date());
					// 加载营业厅名称
					$("#changeBusHall").text(currHall["INTER_ORG_NAME"] == undefined ? currHall["CHANNEL_NAME"]:currHall["INTER_ORG_NAME"]);
					$("#changeBusHall").attr("title",currHall["INTER_ORG_NAME"]== undefined ? currHall["CHANNEL_NAME"]:currHall["INTER_ORG_NAME"]);
					dialog.close();
				});
			}else{
				$("#hall").hide();
			}
		}else{
			$("#hall").hide();
		}
		
	};
	
	// 公共方法打开div
	this.openDiv = function(message, bool, divObj) {
		dialog = art.dialog({
			title: message,
			width: '400px',
			padding: '0',
			content: divObj,
			lock: true,
			drag: bool, //禁止弹出层拖动
			resize: bool //禁止弹出层放大缩
	    });
	};
	
	//加载pc一线直达
	this.checkPc = function(userId){
		var uid = userId;
		var sysCode = 'CRM';
		var encode = uid + '$YZ^c|2.0' + this.getYYYYMMdd();
		var cipher = $.md5(encode);

		window.open(bussinesUrl+ '?userId='+uid+'&sysCode=CRM&cipher='+cipher);
	};
	
	//js日期
	this.getYYYYMMdd = function(){
		var today = new Date(),   //获取当前系统时间
		year = today.getFullYear(),
		month = today.getMonth()+1,
		day = today.getDate();

		if(month < 10){     //小于10就在前面补0
			month = "0"+month;
		}

		if(day < 10){     //小于10就在前面补0
			day = "0"+day;
		}

		return year + month + day;
	};
	
	/**
	 * 浏览器滚动效果
	 */
	this.windowAddMouseWheel = function(){
		var scrollFunc = function (e) {
	        e = e || window.event;
	        if (e.wheelDelta) {  //判断浏览器IE，谷歌滑轮事件
	            if (e.wheelDelta > 0) { //当滑轮向上滚动时
				    $("#headBody").show();	
	            	//alert("滑轮向上1");
	            }
	            if (e.wheelDelta < 0) { //当滑轮向下滚动时             				
					$("#headBody").hide();
	            	//alert("滑轮向下2");
	            }
	        }
	    };
	    // 给页面绑定滑轮滚动事件
	    if (document.addEventListener) {
	        document.addEventListener('DOMMouseScroll', scrollFunc, false);
	    }
	    // 滚动滑轮触发scrollFunc方法
	    window.onmousewheel = document.onmousewheel = scrollFunc;
	};
	 
	 /**
	 * 初始化
	 */
	this.init = function() {
		// STEP-1 初始化对象
		this.firstMenuDiv = $('#firstMenuDiv');
		this.secondMenuDiv = $('#secondMenuDiv');
		this.mainDiv = $('#mainDiv');
		this.allPage = $('div[name=allPage]');
	//	this.halls = $.parseJSON(EMPLOG_HALLS);
		
		// STEP-2 加载菜单和用户数据
		this.ajaxFindUserData();
		
		// STEP-3 进入portal首页
	//	this.gotoMainPage();
		
		// STEP-4 初始化一级菜单
		this.initFirstMenu();
		
		// STEP-5 头部员工信息滑动效果
	//	this.showUserInfo();
		
		// STEP-6 组装渠道
	//	this.pushJD();
		
		//初始化绑定事件
	//	this.bindMethod();
		
		// STEP-7 加载集团4A页面
	//	$("body").append('<div style="display:none"><iframe id="jtFrm" name="jtFrm" src="' +jtCrmSSOCookiesPage+ '" width="800" height="200" frameborder="0"></iframe></div>');
		
		//STEP-8 加载业务支撑平台
		/*if('true' == pcPrivilege){
			$("#gopc").show();
			$("#gopc").click(function(){
				_this.checkPc(EMPEE_ACCT);
			});
		}else{
			$("#gopc").hide();
		}
		*/
		
	};
};

var indexMenu = new Index_menu();

$(document).ready(function(){
	indexMenu.init();
	
	//
	
	
	
	
	// 监听浏览器事件
	$(window).resize(function(){
		indexMenu.resizeMenu();
    });
	
	indexMenu.windowAddMouseWheel();
	 
	// 点击收起head
	$(".sq-list").click(function(){
		if($(".head").is(":visible")){
			$(".head").hide();
			$(this).removeClass("zk-list");
		}else{
			$(".head").show();
			$(this).addClass("zk-list");
		}
	});
	
	// 添加退出事件
	$("#loginout").click(function(){
		indexMenu.mainDiv.find('#mainFrm').attr('src', ctx + '/sso/servlet/LogoutServlet?empeeId=' + empeeid);
		document.location.href = ctx + "/sx1/login.jsp";
	});
	
	// 添加营业厅切换事件
	$("#changeBusHall").click(function(){
		indexMenu.openDiv("选择渠道组织", true, document.getElementById("num_tcc"));
	});
	
	$("#changeBusHallImgDiv").click(function(){
		indexMenu.openDiv("选择渠道组织", true, document.getElementById("num_tcc"));
	});
	
	// 修改密码（调用4A系统页面）
	$("#updatePwd").click(function(){
	//	 window.open(user4A4ASettingUrl + "?userid="+userid+"&username="+username+"");
		var url = ctx + "/changePassword.jsp?empeeAcct=" + EMPEE_ACCT
		+ "&latnCode=" + LATN_ID + "&type=validate&time=" + new Date();
		crm2Win = window.$.dicWin({
					url : url,
					title : "修改密码",
					width : 450,
					height : 300,
					drag : true,
					closable : true
		});
	});
	
});