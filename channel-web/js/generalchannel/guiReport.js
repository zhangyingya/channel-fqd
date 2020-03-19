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
    	 this.initFirstFormat();
    	 this.initTable();
    	 this.bind();
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
        	$("#name").val('');
        	$("#code").val('');
        	$("#phone").val('');
        	$("#type").val('');
        	$("#staffName").val('');
        	$("#firstFormat").val('');
        	$("#secondFormat").val('');
        	$("#statusCd").val('');
        	$("#specializedTeams").val('');
        });
        
        $("#add").click(function(){
        	generalChannelList.add();
        });
        
        $("#batchDelete").click(function(){
        	generalChannelList.batchDelete();
        });
        
        /*new Tablib().init({
	         operationDiv : $('#typeUl'),
	         tagData : eval("[{'codeVal':'','codeName':'全部'},{'codeVal':'10','codeName':'店'}," +
	         				"{'codeVal':'20','codeName':'人'}]")
	    });*/
       
        new Tablib().init({
	         operationDiv : $('#statusCdUl'),
	         tagData : eval("[{'codeVal':'','codeName':'全部'},{'codeVal':'10','codeName':'未生效'}," +
     				"{'codeVal':'20','codeName':'在用'},{'codeVal':'30','codeName':'冻结'}," +
     				"{'codeVal':'40','codeName':'失效'}]")
	    });
        
        new Tablib().init({
	         operationDiv : $('#specializedTeamsUl'),
	         tagData : eval("[{'codeVal':'','codeName':'全部'},{'codeVal':'自营厅','codeName':'自营厅'}," +
    				"{'codeVal':'城市商圈','codeName':'城市商圈'},{'codeVal':'城市社区','codeName':'城市社区'}," +
    				"{'codeVal':'农村市场','codeName':'农村市场'}]")
	    });
        
    };
        
    this.batchDelete = function(){
    	var ids = new Array();
    	
    	var selectRows = _this.table.getSelRows();
    	if(selectRows.length==0){
    		layer.alert("请至少选中一条数据！");
    	}else{
    		for (var i = 0; i < selectRows.length; i++) {
    			ids.push(selectRows[i].id);
    		}
    		layer.confirm("确定删除渠道单元信息吗?", {icon: 3, title:'提示'}, function(index){
    			$.ajax({
        			cache:false,
        			type:"POST",
        			async:false,
        			dataType: "json", 
        		    data: {ids:JSON.stringify(ids)},
        			url:ctx+"/generalChannel/deleteByIds.do",
        			success:function(data){
        				if(data.flag=="SUCCESS"){
        					layer.alert(data.msg, function(index) {
        						_this.initTable();
								layer.close(index);
							});
        				}else{
        					layer.alert(data.msg);
        				}
        			}
        		});
    		});
    	}
    };
    
    this.deleteById = function(id, statusCd) {
    	if (!Dic.isNull(statusCd) && statusCd == "40") {
    		layer.alert("该泛渠道已是无效状态！");
    		
    		return;
    	}
    	
    	var ids = new Array();
    	
    	ids.push(id);
    	
    	layer.confirm("确定删除渠道单元信息吗?", {icon: 3, title:'提示'}, function(index){
			$.ajax({
    			cache:false,
    			type:"POST",
    			async:false,
    			dataType: "json", 
    		    data: {ids:JSON.stringify(ids)},
    			url:ctx+"/generalChannel/deleteByIds.do",
    			success:function(data){
    				if(data.flag=="SUCCESS"){
    					layer.alert(data.msg, function(index) {
    						_this.initTable();
							layer.close(index);
						});
    				}else{
    					layer.alert(data.msg);
    				}
    			}
    		});
		});				
    };
    
    this.update = function(id) {
    	var url = web_ctx + '/html/generalchannel/generalchannel_update.html';
		var param = "?id="+id;
		layer.open({
			 title: '修改泛渠道单元信息',
			 type: 2,
			 area: ['1000px', '540px'],
			 skin: 'layui-layer-rim', //加上边框
			 content : url + param
		});
    };
    
    this.add = function(){
		var url = web_ctx + '/html/generalchannel/generalchannel_add.html';
		var param = "";
		layer.open({
			 title: '新增泛渠道单元信息',
			 type: 2,
			 area: ['1000px', '540px'],
			 skin: 'layui-layer-rim', //加上边框
			 content : url + param
		});
    };
    
    this.detail = function(id) {
    	var url = web_ctx + '/html/generalchannel/generalchannel_detail.html';
		var param = "?id="+id;
		layer.open({
			 title: '泛渠道单元信息详情',
			 type: 2,
			 area: ['1000px', '540px'],
			 skin: 'layui-layer-rim', //加上边框
			 content : url + param
		});
    };
	
    this.getParam = function(){
    	var commonRegionId = $("#latnId").val();
    	var childCommonRegionId = $("#areaId").val();
    	var channelName = $("#channelName").val();
    	var channelNbr = $("#channelNbr").val();
    	var name = $("#name").val();
    	var code = $("#code").val();
    	var phone = $("#phone").val();
    	//var addr = $("#addr").val();
    	var type = $("#type").val();
    	var staffName = $("#staffName").val();
    	var firstFormatId = $("#firstFormat").val();
    	var format = $("#secondFormat").val();
    	var statusCd = $("#statusCd").val();
    	var specializedTeamsName = $("#specializedTeams").val();
    	var shopCode = $("#shopCode").val();
    	
    	
    	if(!Dic.isNull(phone)){
    		if(!generalChannelList.phonePattern.test(phone)){
    			layer.alert("手机号码格式不正确!");
	  			return;
	  		}
    	}
    	
    	var param = {
				"commonRegionId": commonRegionId,
				"childCommonRegionId": childCommonRegionId,
				"channelName": Dic.trim(channelName),
				"channelNbr": Dic.trim(channelNbr),
				"name": Dic.trim(name),
				"code": Dic.trim(code),
				"phone": Dic.trim(phone),
				//"addr": Dic.trim(addr),
				"type": type,
				"staffName": Dic.trim(staffName),
				"firstFormatId": firstFormatId,
				"format":format,
				"statusCd":statusCd,
				"specializedTeamsName":specializedTeamsName,
				"shopCode" : shopCode
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
            url : ctx + 'generalChannel/findAll.do',
            head : [
	                {dis:'选择', name:'id', width:'1%', align:'left',checked:true,freeze : true},
	                {dis:'泛渠道名称', name:'name',width:'3%',align:'left'},
	                {dis:'泛渠道编码', name:'code',width:'2%',align:'left'},
	                {dis:'本地网', name:'regionName',width:'2%',align:'left'},
	                {dis:'区县', name:'childRegionName',width:'2%',align:'left'},
	                {dis:'结对渠道单元名称', name:'channelName',width:'3%',align:'left'},
	                {dis:'结对渠道编码', name:'channelNbr',width:'3%',align:'left'},
	                {dis:'结对渠道管控人员', name:'staffName',width:'2%',align:'left'},
	                {dis:'联系电话', name:'phone',width:'2%',align:'left'},
	                {dis:'一级分类', name:'firstFormatName',width:'2%',align:'left'},
	                {dis:'二级分类', name:'secondFormatName',width:'2%',align:'left'},
	                /*{dis:'类型', name:'type',width:'1%',align:'left',replace:function(data){
	                	if (data.type == '10'){
	                		return "店";
	                	} else if (data.type == '20') {
	                		return "人";
	                	} else {
	                		return "";
	                	}
	                }},*/
	                                           
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
	                {dis:'创建时间', name:'createDate',width:'3%',align:'left'},
					{dis:'操作', name:'',width:'3%',align:'left',replace:function(data){
	                	var html = "";
	                	
	                	html += "<a onclick='generalChannelList.detail("+data.id+")'>详情</a>&nbsp;&nbsp;";
	                	html += "<a onclick='generalChannelList.update("+data.id+")'>修改</a>&nbsp;&nbsp;";
	                	html += "<a onclick='generalChannelList.deleteById("+data.id+","+data.statusCd+")'>删除</a>&nbsp;&nbsp;";
	                	
	                	return html;
	                }}
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