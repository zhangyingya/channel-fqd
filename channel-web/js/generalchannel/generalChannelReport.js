/**
 * 泛渠道管理
 * @constructor
 */
var GeneralChannelList = function() {
	var table = null;
	var _this = null;
    this.defaultPageSizeB = 1;  //默认每页10条
    this.currentPageB=1;
    this.phonePattern=/^[1][3,4,5,7,8][0-9]{9}$/;
    
    this.init = function () {
    	 _this = this;
    	 this.initLatn();
    	 this.initDate();
    	 this.initFirstFormat();
    	 this.initTable();
    	 this.bind();
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
    
    this.initLatn = function() {
    	$("#latnUl").find("li").remove(); 
    	
    	$.ajax({
 		 	async : false,
				cache : false,
				type : 'POST',
				url : ctx + "generalChannel/findLatnList.do",
				dataType : 'json',
				timeout : 10000,
				success : function(data) {
					if(!Dic.isNull(data.commonRegions)){
						var appInfoHTML = "";
						if (data.commonRegions.length > 1) {
							appInfoHTML +='<li key="" tValue="全部" style="width:100%;"><a>'+"全部"+'</a></li>';
							
							for(var i =0 ;i<data.commonRegions.length;i++){
								var item = data.commonRegions[i];
								
								appInfoHTML += '<li key="'+item.code+'" tValue="'+item.name+'" style="width:100%;"><a>'+item.name+'</a></li>';
							}
							
							$("#latnUl").append(appInfoHTML);
							
							$("#latnName").val("全部");
						} else {
							appInfoHTML += '<li key="'+data.commonRegions[0].code+'" tValue="'+data.commonRegions[0].name+'" style="width:100%;"><a>'+data.commonRegions[0].name+'</a></li>';
							
							$("#latnUl").append(appInfoHTML);
							
							$("#latnId").val(data.commonRegions[0].code);
							$("#latnName").val(data.commonRegions[0].name);
							
							generalChannelList.initArea(data.commonRegions[0].code);
						}
							
					}
				}
		 });
    };
    
    this.initArea = function(latnId) {
    	$("#areaUl").find("li").remove(); 
    	$("#areaId").val("");
		$("#areaName").val("");
		
    	$.ajax({
 		 	async : false,
				cache : false,
				type : 'POST',
				url : ctx + "generalChannel/findRegionList.do",
				dataType : 'json',
				timeout : 10000,
				data : {parRegionId: latnId}, 
				success : function(data) {
					if(!Dic.isNull(data.commonRegions)){
						var appInfoHTML = "";
						if (data.commonRegions.length > 1) {
							appInfoHTML +='<li key="" tValue="全部" style="width:100%;"><a>'+"全部"+'</a></li>';
							
							for(var i =0 ;i<data.commonRegions.length;i++){
								var item = data.commonRegions[i];
								
								appInfoHTML += '<li key="'+item.code+'" tValue="'+item.name+'" style="width:100%;"><a>'+item.name+'</a></li>';
							}
							
							$("#areaUl").append(appInfoHTML);
							
							$("#areaName").val("全部");
						} else {
							appInfoHTML += '<li key="'+data.commonRegions[0].code+'" tValue="'+data.commonRegions[0].name+'" style="width:100%;"><a>'+data.commonRegions[0].name+'</a></li>';
							
							$("#areaUl").append(appInfoHTML);
							
							$("#areaId").val(data.commonRegions[0].code);
							$("#areaName").val(data.commonRegions[0].name);
						}
							
					}
				}
		 });
    };
    
    this.initFirstFormat = function() {
    	$("#firstFormatUl").find("li").remove(); 
    	
    	$.ajax({
 		 	async : false,
				cache : false,
				type : 'POST',
				url : ctx + "generalChannelFormat/findAllByTop.do",
				dataType : 'json',
				timeout : 10000,
				success : function(data) {
					if(!Dic.isNull(data)){
						var appInfoHTML = "";
						if (data.length > 1) {
							appInfoHTML +='<li key="" tValue="全部" style="width:100%;"><a>'+"全部"+'</a></li>';
						}
						
						for(var i =0 ;i<data.length;i++){
							var item = data[i];
							
							appInfoHTML += '<li key="'+item.code+'" tValue="'+item.name+'" style="width:100%;"><a>'+item.name+'</a></li>';
						}
						
						$("#firstFormatUl").append(appInfoHTML);
						
						if (data.length > 1) {
							$("#firstFormatName").val("全部");
						}
					}
				}
		 });
    };
    
    this.initSecondFormat = function(firstFormatId) {
    	$("#secondFormatUl").find("li").remove(); 
    	
    	$.ajax({
 		 	async : false,
				cache : false,
				type : 'POST',
				url : ctx + "generalChannelFormat/findAllByParId.do",
				dataType : 'json',
				data : {parId :firstFormatId },
				timeout : 10000,
				success : function(data) {
					if(!Dic.isNull(data)){
						var appInfoHTML = "";
						if (data.length > 1) {
							appInfoHTML +='<li key="" tValue="全部" style="width:100%;"><a>'+"全部"+'</a></li>';
						}
							
						for(var i =0 ;i<data.length;i++){
							var item = data[i];
							
							appInfoHTML += '<li key="'+item.code+'" tValue="'+item.name+'" style="width:100%;"><a>'+item.name+'</a></li>';
						}
						
						$("#secondFormatUl").append(appInfoHTML);
						
						if (data.length > 1) {
							$("#secondFormatName").val("全部");
						}
					}
				}
		 });
    };
    
    this.bind = function(){
    	
    	$("#latnUl").on("click","li",function(){
   		 	$("#latnName").val($(this).attr("tValue"));
   		 	$("#latnId").val($(this).attr("key"));
   		 	
   		 	var latnId = $("#latnId").val();
   		 	if (!Dic.isNull(latnId)) {
   		 		generalChannelList.initArea(latnId);
   		 	} else {
   		 		$("#areaUl").find("li").remove(); 
   		 	}
   	 	});
    	
    	$("#areaUl").on("click","li",function(){
   		 	$("#areaName").val($(this).attr("tValue"));
   		 	$("#areaId").val($(this).attr("key"));
   	 	});
    	
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
    	
    	$("#secondFormatUl").on("click","li",function(){
   		 	$("#secondFormatName").val($(this).attr("tValue"));
   		 	$("#secondFormat").val($(this).attr("key"));
   	 	});
    	
        $("#search").click(function(){
        	var phone = $("#phone").val();
        	if (!Dic.isNull(phone)) {
        		if(!generalChannelList.phonePattern.test(phone)){
         			layer.alert("手机号码格式不正确!");
           			return;
           		}
        	}
        	generalChannelList.initTable();
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
	         operationDiv : $('#statusCdUl'),
	         tagData : eval("[{'codeVal':'','codeName':'全部'},{'codeVal':'10','codeName':'未生效'}," +
     				"{'codeVal':'20','codeName':'在用'},{'codeVal':'30','codeName':'冻结'}," +
     				"{'codeVal':'40','codeName':'失效'}]")
	    });
        
        /*new Tablib().init({
	         operationDiv : $('#specializedTeamsUl'),
	         tagData : eval("[{'codeVal':'','codeName':'全部'},{'codeVal':'自营厅','codeName':'自营厅'}," +
    				"{'codeVal':'城市商圈','codeName':'城市商圈'},{'codeVal':'城市社区','codeName':'城市社区'}," +
    				"{'codeVal':'农村市场','codeName':'农村市场'}]")
	    });*/
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
    	var latnId = $("#latnId").val();
    	var regionId = $("#areaId").val();
    	var channelName = $("#channelName").val();
    	var channelNbr = $("#channelNbr").val();
    	var firstFormatId = $("#firstFormat").val();
    	var secondFormatId = $("#secondFormat").val();
    	var statusCd = $("#statusCd").val();
    	var startDateStr = $("#beginDate").val() + " 00:00:00";
    	var endDateStr = $("#endDate").val() + " 23:59:59";
    	
    	var param = {
				"latnId": latnId,
				"regionId": regionId,
				"channelName": Dic.trim(channelName),
				"channelNbr": Dic.trim(channelNbr),
				"firstFormatId": firstFormatId,
				"secondFormatId":secondFormatId,
				"statusCd":statusCd,
				"startDateStr":startDateStr,
				"endDateStr":endDateStr
    	};
    	
    	return param;
    };
    
    this.initTable = function(){
        // 清空历史信息
        $("#orderTable").empty();
        var param = this.getParam();

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
            url : ctx + 'generalChannelReport/findGeneralChannelReport.do',
            head : [
	                //{dis:'选择', name:'id', width:'1%', align:'left',checked:true,freeze : true},
            	
	                {dis:'所属市', name:'latnName',width:'2%',align:'left'},
	                {dis:'所属区县', name:'regionName',width:'2%',align:'left'},
	                
	                {dis:'泛渠道单元名称', name:'generalChannelName',width:'3%',align:'left'},
	                {dis:'泛渠道单元编码', name:'generalChannelCode',width:'2%',align:'left'},
	                
	                {dis:'泛渠道一级分类', name:'firstFormatName',width:'2%',align:'left'},
	                {dis:'泛渠道二级分类', name:'secondFormatName',width:'2%',align:'left'},
	                {dis:'专业团队', 	name:'specializedTeamsName',width:'2%',align:'left'},
	                {dis:'是否翼支付商户', name:'ifShop',width:'1%',align:'left',replace:function(data){
						if (data.ifShop == '1'){
	                		return "是";
	                	} else if (data.ifShop == '0') {
	                		return "否";
	                	}else {
	                		return "";
	                	}
	                	
	                }},
	                {dis:'商户编码', name:'shopCode',width:'2%',align:'left'},
	                
	                {dis:'泛渠道地址', name:'generalChannelAddr',width:'3%',align:'left'},
	                {dis:'联系电话', name:'generalChannelPhone',width:'2%',align:'left'},
	                
	                {dis:'状态', name:'statusCd',width:'1%',align:'left',replace:function(data){
						if (data.statusCd == '10'){
	                		return "未生效";
	                	} else if (data.statusCd == '20') {
	                		return "在用";
	                	} else if (data.statusCd == '30') {
	                		return "冻结";
	                	} else if (data.statusCd == '40') {
	                		return "失效";
	                	} else {
	                		return "";
	                	}
	                	
	                }},
	                
	                {dis:'结对厅店名称', name:'channelName',width:'3%',align:'left'},
	                {dis:'结对厅店编码', name:'channelNbr',width:'3%',align:'left'},
	                {dis:'结对厅店管控人员', name:'staffName',width:'2%',align:'left'},
	                {dis:'联系电话', name:'generalChannelPhone',width:'2%',align:'left'},
	                
	                {dis:'创建人', name:'createStaffName',width:'1%',align:'left'},
	                {dis:'创建时间', name:'createDate',width:'3%',align:'left'},
	                
	                {dis:'乡镇', name:'townName',width:'2%',align:'left'},
	                {dis:'行政村', name:'villageName',width:'2%',align:'left'}
				],
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
	generalChannelList.initTable();
});