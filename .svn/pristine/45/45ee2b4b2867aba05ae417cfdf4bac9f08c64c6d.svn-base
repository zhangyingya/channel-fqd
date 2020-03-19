/**
 * 商机单
 * @constructor
 */
var BusinessBillList = function() {
	var table = null;
	var _this = null;
    this.defaultPageSizeB = 1;  //默认每页10条
    this.currentPageB=1;
    this.phonePattern=/^[1][3,4,5,7,8][0-9]{9}$/;
    
    this.init = function () {
    	 _this = this;
    	 this.initLatn();
    	 this.initDate();
    	 this.initDate();
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
    
    this.bind = function(){
    	
    	$("#latnUl").on("click","li",function(){
   		 	$("#latnName").val($(this).attr("tValue"));
   		 	$("#latnId").val($(this).attr("key"));
   		 	
   		 	var latnId = $("#latnId").val();
   		 	if (!Dic.isNull(latnId)) {
   		 		businessBillList.initArea(latnId);
   		 	} else {
   		 		$("#areaUl").find("li").remove(); 
   		 	}
   	 	});
    	
    	$("#areaUl").on("click","li",function(){
   		 	$("#areaName").val($(this).attr("tValue"));
   		 	$("#areaId").val($(this).attr("key"));
   	 	});
    	
        $("#search").click(function(){
        	businessBillList.initTable();
        });
        
        $("#clean").click(function(){
        	$("#latnId").val('');
        	$("#areaId").val('');
        	$("#channelName").val('');
        	$("#channelNbr").val('');
        	$("#businessBillTypeName").val('全部');
        	$("#businessBillType").val('');
        	$("#statusCdName").val('全部');
        	$("#statusCd").val('');
        	$("#generalChannelName").val('');
        	$("#generalChannelCode").val('');
        	generalChannelList.initDate();
        });
        
        new Tablib().init({
	         operationDiv : $('#businessBillTypeUl'),
	         tagData : eval("[{'codeVal':'','codeName':'全部'},{'codeVal':'10','codeName':'手机业务'}," +
	         				"{'codeVal':'20','codeName':'宽带业务'},{'codeVal':'30','codeName':'其他业务'}]")
	    });
        
        new Tablib().init({
	         operationDiv : $('#statusCdUl'),
	         tagData : eval("[{'codeVal':'','codeName':'全部'},{'codeVal':'10','codeName':'未处理'}," +
	         				"{'codeVal':'20','codeName':'受理成功'},{'codeVal':'30','codeName':'用户拒绝'}]")
	    });
        
        $("#export").click(function(){
        	businessBillList.exportExcel();
        });
    };
        
    this.exportExcel = function (){
    	
    	var latnId = $("#latnId").val();
    	var regionId = $("#areaId").val();
    	var generalChannelName = $("#generalChannelName").val();
    	var generalChannelCode = $("#generalChannelCode").val();
    	var channelName = $("#channelName").val();
    	var channelNbr = $("#channelNbr").val();
    	var statusCd = $("#statusCd").val();
    	var businessBillType = $("#businessBillType").val();
    	var startDateStr = $("#beginDate").val() + " 00:00:00";
    	var endDateStr = $("#endDate").val() + " 23:59:59";
    	
		window.location.href =  ctx + "file/export.do?latnId=" + latnId +
										"&regionId=" + regionId +
										"&channelNbr=" + channelNbr +
										"&statusCd=" + statusCd +
										"&businessBillType=" + businessBillType +
										"&generalChannelName=" + generalChannelName +
										"&generalChannelCode=" + generalChannelCode + 
										"&channelName=" + channelName + 
										"&startDateStr=" + startDateStr + 
										"&endDateStr=" + endDateStr + 
										"&exportType=businessBillReport";
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
							
							businessBillList.initArea(data.commonRegions[0].code);
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
    
    this.writeRejectReason = function(id) {
    	var customerRejectReason = "";
    	
    	layer.prompt({
    		  formType: 2,
    		  value: '',	//默认值
    		  maxlength: 280,
    		  title: '请填写用户拒绝理由',
    		  area: ['500px', '150px'] 	//自定义文本域宽高
    		}, function(value, index, elem){
    			customerRejectReason = value;
    	    	
    	    	$.ajax({
    	 		 	async : false,
    					cache : false,
    					type : 'POST',
    					url : ctx + "businessBill/writeCustomerRejectReason.do",
    					dataType : 'json',
    					timeout : 10000,
    					data : {id: id, customerRejectReason:customerRejectReason}, 
    					success:function(data){
        					if(data != null){
        						layer.close(index);
        						businessBillList.initTable();
        					}
        				},
        				error: function(){
        					layer.alert(data.msg);
        				}
    			 });
    			
    		});
    	
    	
    };
    
    this.rejectReason = function(id) {
    	var obj = businessBillList.findBusinessBill(id);
    	
    	//layer.alert(obj.customerRejectReason);
    	layer.prompt(
    			{
		  		  	formType: 2,
		  		  	value: obj.customerRejectReason,	//默认值
		  		  	title: '用户拒绝详情:',
		  		  	btn: ['取消'],
		  		  	area: ['500px', '150px'] 	//自定义文本域宽高
  				}, 
  				function(value, index, elem){
  					layer.close(index);
  				}
  		);
    };
    
    this.toOrder = function(id) {
    	
    	$.ajax({
 		 	async : false,
				cache : false,
				type : 'POST',
				url : ctx + "businessBill/toOrder.do",
				dataType : 'json',
				timeout : 10000,
				data : {id: id, ctx:ctxStart}, 
				success : function(data) {
					if (!Dic.isNull(data.url)) {
						var orderUrl = ctxStart + data.url;
						var param = "";
						
						businessBillList.initNewTab("业务受理", orderUrl + param);
					} else {
						layer.alert(data.error, {icon: 4}); 
					}
				}
		 });
    	
    	
    };
    
    this.findBusinessBill  = function(id) {
    	var obj = new Object();
    	
    	$.ajax({
 		 	async : false,
				cache : false,
				type : 'POST',
				url : ctx + "businessBill/findById.do",
				dataType : 'json',
				timeout : 10000,
				data : {id: id}, 
				success : function(data) {
					if(!Dic.isNull(data)){
						obj = data;
					}
				}
		 });
    	
    	return obj;
    };
	
    this.getParam = function(){
    	var latnId = $("#latnId").val();
    	var regionId = $("#areaId").val();
    	var generalChannelName = $("#generalChannelName").val();
    	var generalChannelCode = $("#generalChannelCode").val();
    	var channelName = $("#channelName").val();
    	var channelNbr = $("#channelNbr").val();
    	var statusCd = $("#statusCd").val();
    	var businessBillType = $("#businessBillType").val();
    	var startDateStr = $("#beginDate").val() + " 00:00:00";
    	var endDateStr = $("#endDate").val()  + " 23:59:59";
    	
    	
    	var param = {
    			"latnId" : latnId,
    			"regionId" : regionId,
				"generalChannelName": Dic.trim(generalChannelName),
				"generalChannelCode":generalChannelCode,
				"channelName": Dic.trim(channelName),
				"channelNbr": channelNbr,
				"statusCd":statusCd,
				"businessBillType" : businessBillType,
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
            url : ctx + 'generalChannelReport/findBusinessBillReport.do',
            head : [
	                //{dis:'选择', name:'id', width:'1%', align:'left',checked:true,freeze : true},
            		{dis:'所属市', name:'latnName',width:'2%',align:'left'},
            		{dis:'所属区县', name:'regionName',width:'2%',align:'left'},
            		{dis:'所在乡镇', name:'townName',width:'2%',align:'left'},
            		{dis:'所在行政村', name:'villageName',width:'2%',align:'left'},
            		{dis:'商机单编号', name:'id',width:'2%',align:'left'},
            		{dis:'泛渠道名称', name:'generalChannelName',width:'3%',align:'left'},
	                {dis:'泛渠道编码', name:'generalChannelCode',width:'2%',align:'left'},
	                {dis:'翼支付商户编码', name:'shopCode',width:'2%',align:'left'},
	                {dis:'商机联系人', name:'customerName',width:'2%',align:'left'},
	                {dis:'商机联系电话', name:'customerPhone',width:'2%',align:'left'},
	                {dis:'商机产品', name:'businessBillType',width:'1%',align:'left', replace:function(data){
	                	if (data.businessBillType == '10') {
	                		return "手机业务";
	                	} else if (data.businessBillType == '20') {
	                		return "宽带业务";
	                	} else {
	                		return "其他业务";
	                	}
	                	
	                }},
	                {dis:'联系地址', name:'customerRemark',width:'3%',align:'left'},
	                {dis:'商机生成时间', name:'createDate',width:'2%',align:'left'},
	                {dis:'商机单单状态', name:'statusCd',width:'1%',align:'left',replace:function(data){
						if (data.statusCd == '10'){
	                		return "未处理";
	                	} else if (data.statusCd == '20') {
	                		return "受理成功";
	                	} else if (data.statusCd == '30') {
	                		return "用户拒绝";
	                	}else {
	                		return "";
	                	}
	                }},
	                {dis:'用户拒绝原因', name:'customerRejectReason',width:'3%',align:'left'},
	                {dis:'结对渠道名称', name:'channelName',width:'3%',align:'left'},
	                {dis:'结对渠道编码', name:'channelNbr',width:'2%',align:'left'},	               
	                {dis:'订单转化时间',name:'orderCreateDate',width:'2%',align:'left'},
	                {dis:'竣工业务套餐名称',name:'orderOfferNameArr',width:'3%',align:'left'},
	                {dis:'受理业务店员',name:'orderStaffName',width:'1%',align:'left'},
	                {dis:'CRM竣工时间',name:'orderCompleteDate',width:'2%',align:'left'}
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
    
    
    /**
     * 初始化新tab
     * @param instFlightId
     */
    this.initNewTab = function (name, url) {
    	var parentPanel = parent.parent.indexMenu;
    	if(null == parentPanel.panelFrame) {
    		this.initPanelPage();
    	}
    	// STEP-1 查询该URL是否已经打开
    	var ttIndex = parentPanel.panelFrame.getFrameNumFun(name);
    	if(null == ttIndex) {
    		this.addTable(name, url);
    	} else {
    		this.deleteTable(name);
    		this.addTable(name, url);
    	}
    };
    
    /**
     * 打开tab页面
     * @param instFlightId
     */
    this.addTable = function(name, url){
    	var parentPanel = parent.parent.indexMenu;
    	// STEP-1.1 增加新的panel并显示等操作
    	if(parentPanel.panelFrame.getLiLength() >= 12) {	// table page max is 8 .
    		layer.alert("已超过12个标签页");
    		return;
    	} else {
    		var liDataLength = parentPanel.panelFrame.getLiDataLength();
    		var frameIndex = liDataLength == 0 ? 0 : liDataLength ;
    		// STEP-2 动态增加mainFrame
    		parentPanel.mainDiv.append('<iframe id="mainFrm' +frameIndex+ '" name="mainFrm' +frameIndex+ '" frameborder="0" scrolling="auto" style="display: none;"></iframe>');
    		// STEP-3 动态增加mainFrame的样式
    		parentPanel.setMainFrmLayout(frameIndex);
    		// STEP-4 添加到panel table 中
    		var panelIndex = parentPanel.panelFrame.addLiFun({
    			title : name ,
    			content : parentPanel.mainDiv.find('#mainFrm' + frameIndex ) ,
    			url : url ,
    			closeable : true
    		});
    		// STEP-5 最后展示这个刚刚添加的panel page
    		parentPanel.panelFrame.showLiFun(panelIndex);
    	}
    };

    /**删除table页*/
    this.deleteTable = function(name){
    	var parentPanel = parent.parent.indexMenu;
    	parentPanel.panelFrame.deleteLiFun(name);
    };
};

var businessBillList = new BusinessBillList();

$(document).ready(function () {
	businessBillList.init();
	businessBillList.initTable();
});