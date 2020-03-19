/**
 * 泛渠道管理
 * @constructor
 */
var GeneralChannelList = function() {
	var table = null;
	var _this = null;
	
	this.rows = [
        {dis:'商机单量', name:'countBusinessBills',width:'2%',align:'left'},
        {dis:'商机完成量', name:'countCompleteBusinessBills',width:'2%',align:'left'},
        {dis:'商机结单完成率', name:'percentCompleteBusinessBill',width:'3%',align:'left'},
        {dis:'商机转化成功量', name:'countBusinessToOrder',width:'3%',align:'left'},
        {dis:'转化成功率', 	name:'percentBusinessToOrder',width:'2%',align:'left'},
        {dis:'泛渠道网点数', name:'countGeneralChannels',width:'2%',align:'left'},
        {dis:'泛渠道店均甩单数', name:'averageGeneralChannelToOrder',width:'3%',align:'left'},
        {dis:'泛渠道店均甩单成功数', name:'averageCompleteGeneralChannelToOrder',width:'4%',align:'left'},
        {dis:'有效泛渠道网点数', name:'countEffectiveGeneralChannel',width:'3%',align:'left'},
        {dis:'活跃泛渠道网点数', name:'countActiveGeneralChannel',width:'3%',align:'left'},
        {dis:'村代触点活跃率', name:'percentActiveVillege',width:'3%',align:'left'},
        {dis:'乡镇泛渠道活跃率', name:'percentActiveTown',width:'3%',align:'left'},
	];
	
	
    this.defaultPageSizeB = 1;  //默认每页10条
    this.currentPageB=1;
    this.phonePattern=/^[1][3,4,5,7,8][0-9]{9}$/;
    
    //用户信息
    this.userInfo = $.comm.userInfo;
    this.sysRoles = $.comm.getsysRole();
    
    //角色类型
    this.roleType = '';
    
    this.staffBean = {};
    
    this.init = function () {
    	 _this = this;
    	 this.initDate();
    	 this.bind();
    	 this.getRoleType(function(result){
    		 
    		 $.comm.ajaxFalse('commonRegion/channelStaff.do',null,function(result){
    	    		_this.staffBean = result;
	    	 }); 
    		 
    		 _this.roleType = result;
    		 if(_this.roleType == 'province'){
    			 _this.reloadTable(_this.roleType,null);
    		 }else if(_this.roleType == 'city'){
    			 _this.reloadTable(_this.roleType,_this.userInfo.authSystemUser.latnId);
    		 }else if(_this.roleType == 'area'){
    			 _this.reloadTable(_this.roleType,_this.staffBean.commonRegion);
    		 }
    	 });
    };
    
    
    this.tableType = function(type,id){
    	var obj = {};
    	if( type == 'province'){
    		var html = [];
    		obj.url = 'generalChannelReport/findAllReportByLatn.do';
    		html.push({dis:'所属市', name:'latnName',width:'2%',align:'left',replace:function(data){
    			return '<a onclick="generalChannelList.reloadTable(\'city\','+data.latnId+')">'+data.latnName+'</a>'
    		}});
    		html.push.apply(html,_this.rows);
    		obj.head = html;
    		obj.param = {};
    	}else if(type == 'city'){
    		var html = [];
    		obj.url = 'generalChannelReport/findAllReportByRegion.do';
    		html.push({dis:'所属区县', name:'regionName',width:'2%',align:'left',replace:function(data){
    			return '<a onclick="generalChannelList.reloadTable(\'area\','+data.regionId+')">'+data.regionName+'</a>'
    		}});
    		html.push.apply(html,_this.rows);
    		obj.head = html;
    		obj.param = {
    				'latnId'	:	id
    		};
    	}else if(type == 'area'){
    		var html = [];
    		obj.url = 'generalChannelReport/findAllReportByChannel.do';
    		html.push({dis:'所属营业厅', name:'channelName',width:'2%',align:'left'});
    		html.push({dis:'结对厅店编码', name:'channelNbr',width:'2%',align:'left'});
    		html.push.apply(html,_this.rows);
    		obj.head = html;
    		obj.param = {
    				'regionId'	:	id
    		};
    	}else{
    		var html = [];
    		obj.url = 'generalChannelReport/findAllReportByLatn.do';
    		html.push({dis:'所属市', name:'latnName',width:'2%',align:'left'});
    		html.push.apply(html,_this.rows);
    		obj.head = html;
    	}
    	return obj;
    };
    
    this.reloadTable = function(type,id){
    	_this.initTable(_this.tableType(type,id));
    }
    
    this.getRoleType = function(callback){
    	$.comm.ajax('commonRegion/roleType.do',null,function(result){
    		callback(result);
    	});
    };
    
    this.initDate = function () {
    	var today=new Date();
		var h=today.getFullYear();
	    var m=today.getMonth()+1;
	    var d=today.getDate();
	    var hh=today.getHours();
	    var mm=today.getMinutes();
	    var ss=today.getSeconds();
	    m= m<10?"0"+m:m;     
	    d= d<10?"0"+d:d;
	    hh = hh < 10 ? "0" + hh:hh;
	    mm = mm < 10 ? "0" + mm:mm;
	    ss = ss < 10 ? "0" + ss:ss;
	    var date = h+"-"+m+"-"+d;    
    	
        $("#beginDate").val(date);
        $("#endDate").val(date);
    };
    
    this.bind = function(){
    	
    	$("#firstFormatUl").on("click","li",function(){
   		 	$("#firstFormatName").val($(this).attr("tValue"));
   		 	$("#firstFormat").val($(this).attr("key"));
   		 	
   		 	var firstFormatId = $("#firstFormat").val();
   		 	if (!Dic.isNull(firstFormatId)) {
   		 		generalChannelList.initSecondFormat(firstFormatId);
   		 	} else {
   		 		$("#secondFormatUl").find("li").remove(); 
   		 	}
   	 	});
    	
        $("#search").click(function(){
	   		 if(_this.roleType == 'province'){
	   			 _this.reloadTable(_this.roleType,null);
	   		 }else if(_this.roleType == 'city'){
	   			 _this.reloadTable(_this.roleType,_this.userInfo.authSystemUser.latnId);
	   		 }else if(_this.roleType == 'area'){
	   			 _this.reloadTable(_this.roleType,_this.staffBean.commonRegion);
	   		 }
        });
        
        $("#clean").click(function(){
        	$("#latnId").val('');
        	$("#areaId").val('');
        	$("#channelName").val('');
        	$("#channelNbr").val('');
        	$("#firstFormat").val('');
        	$("#secondFormat").val('');
        	$("#statusCd").val('');
        	generalChannelList.initDate();
        });
        
       
        new Tablib().init({
	         operationDiv : $('#firstFormatUl'),
	         tagData : eval("[{'codeVal':'','codeName':'全部'},{'codeVal':'城市社区','codeName':'城市社区'}," +
     				"{'codeVal':'农村市场','codeName':'农村市场'}]")
	    });
        
        $("#export").click(function(){
        	generalChannelList.exportExcel();
        });
    };
        
    this.exportExcel = function (){
    	var staffName = encodeURI(encodeURI($("#staffName").val()));
    	var latnId = $("#latnId").val();
    	var regionId = $("#areaId").val();
    	var channelName = $("#channelName").val();
    	var channelNbr = $("#channelNbr").val();
    	var firstFormatId = $("#firstFormat").val();
    	var secondFormatId = $("#secondFormat").val();
    	var statusCd = $("#statusCd").val();
    	var startDateStr = $("#beginDate").val() + " 00:00:00";
    	var endDateStr = $("#endDate").val() + " 23:59:59";
    	
		window.location.href =  ctx + "file/export.do?latnId=" + latnId +
										"&regionId=" + regionId +
										"&channelNbr=" + channelNbr +
										"&statusCd=" + statusCd+
										"&firstFormatId=" + firstFormatId +
										"&secondFormatId=" + secondFormatId + 
										"&channelName=" + channelName + 
										"&startDateStr=" + startDateStr + 
										"&endDateStr=" + endDateStr + 
										"&exportType=generalChannelReport";
    };
    
    this.getParam = function(){
    	var startDateStr = $("#beginDate").val() + " 00:00:00";
    	var endDateStr = $("#endDate").val() + " 23:59:59";
    	var firstFormat = $("#firstFormat").val();//专业团队
    	
    	var param = {
				"startDateStr"	: 	startDateStr,
				"endDateStr"	: 	endDateStr,
				"specializedTeamsName"	: 	firstFormat
    	};
    	return param;
    };
    
    this.initTable = function(obj){
        // 清空历史信息
        $("#orderTable").empty();
        var param =  $.extend(this.getParam(), obj.param);
        //var tableType = _this.reloadTable(_this.roleType,'');
        
        this.currentPageB = 1;
        this.defaultPageSizeB = this.getPageSizeB() == null ? 10 : this.getPageSizeB();
        this.table = Dic.table.build({
            tableObj : $("#orderTable"),
            model : 0,
            pageSize : this.defaultPageSizeB,
            currentPage:this.currentPageB,
            pageCount : true,
            //freeze : true,
            leftWidth : '800px',
            rightWidth: '1200px',
            waitTime : 15,
            initParam: param,
            url : ctx + obj.url,
            head : obj.head,
            load : function(){
            	_this.setCurrentPageB(_this.table.getCurrentPage());
            	_this.setPageSizeB(_this.table.getPageSize());
            },
            check : function(checkbox, data) {alert("ss")},
            processJSON : function(rtnData){
                if (!Dic.isNull(rtnData)) {
                    var result = rtnData.result;
                    var retJs = {};
                    retJs.rowTotal  =  rtnData.totalRecord;
                    retJs.infoContent = result;
                    return retJs;
                }
            }
        });
        this.setCurrentPageB(this.table.getCurrentPage());
        this.setPageSizeB(this.table.getPageSize());
    };
    this.getCurrentPageB = function () {return window.top.currentPageUserInfoList;}
    this.setCurrentPageB = function (currentPageB) {window.top.currentPageUserInfoList = currentPageB;}
    this.getPageSizeB = function () {return window.top.pageSizeUserInfoList;}
    this.setPageSizeB = function (pageSizeB) {window.top.pageSizeUserInfoList = pageSizeB;}
    
};

var generalChannelList = new GeneralChannelList();

$(document).ready(function () {
	generalChannelList.init();
});