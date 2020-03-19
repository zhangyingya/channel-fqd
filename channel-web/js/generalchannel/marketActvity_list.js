/**
 * 泛渠道管理
 * @constructor
 */
var MarketActivityList = function() {
	var table = null;
	var _this = null;
    this.defaultPageSizeB = 1;  //默认每页10条
    this.currentPageB=1;
    this.phonePattern=/^[1][3,4,5,7,8][0-9]{9}$/;
    
    this.init = function () {
    	 _this = this;
    	 //this.initLatn();
    	 this.initTable();
    	 this.bind();
    };
    
    this.initLatn = function() {
    	$("#latnUl").find("li").remove(); 
    	
    	$.ajax({
 		 	async : false,
				cache : false,
				type : 'POST',
				url : ctx + "commonRegion/findAllBy1300.do",
				dataType : 'json',
				timeout : 10000,
				success : function(data) {
					if(!Dic.isNull(data.commonRegions)){
						var appInfoHTML = "";
							appInfoHTML +='<li key="" tValue="全部" style="width:100%;"><a>'+"全部"+'</a></li>';
						
						for(var i =0 ;i<data.commonRegions.length;i++){
							var item = data.commonRegions[i];
							
							appInfoHTML += '<li key="'+item.code+'" tValue="'+item.name+'" style="width:100%;"><a>'+item.name+'</a></li>';
						}
						
						$("#latnUl").append(appInfoHTML);
						
						$("#latnName").val("全部");
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
				url : ctx + "commonRegion/findAllByParRegionId.do",
				dataType : 'json',
				timeout : 10000,
				data : {parRegionId: latnId}, 
				success : function(data) {
					if(!Dic.isNull(data.commonRegions)){
						var appInfoHTML = "";
							appInfoHTML +='<li key="" tValue="全部" style="width:100%;"><a>'+"全部"+'</a></li>';
						
						for(var i =0 ;i<data.commonRegions.length;i++){
							var item = data.commonRegions[i];
							
							appInfoHTML += '<li key="'+item.code+'" tValue="'+item.name+'" style="width:100%;"><a>'+item.name+'</a></li>';
						}
						
						$("#areaUl").append(appInfoHTML);
						
						$("#areaName").val("全部");
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
   		 		marketActivityList.initArea(latnId);
   		 	} else {
   		 		$("#areaUl").find("li").remove(); 
   		 	}
   	 	});
    	
    	$("#areaUl").on("click","li",function(){
   		 	$("#areaName").val($(this).attr("tValue"));
   		 	$("#areaId").val($(this).attr("key"));
   	 	});
    	
        $("#search").click(function(){
        	marketActivityList.initTable();
        });
        
        $("#clean").click(function(){
        	$("#name").val('');
        	$("#type").val('');
        	$("#url").val('');
        	$("#origin").val('');
        	$("#description").val('');
        	$("#statusCd").val('');
        });
        
        $("#add").click(function(){
        	marketActivityList.add();
        });
        
        $("#batchDelete").click(function(){
        	marketActivityList.batchDelete();
        });
        
        new Tablib().init({
	         operationDiv : $('#statusCdUl'),
	         tagData : eval("[{'codeVal':'','codeName':'全部'},{'codeVal':'1000','codeName':'有效'}," +
	         				"{'codeVal':'1100','codeName':'无效'}]")
	    });
        
        new Tablib().init({
	         operationDiv : $('#typeUl'),
	         tagData : eval("[{'codeVal':'','codeName':'全部'},{'codeVal':'10','codeName':'广告营销'}," +
	         				"{'codeVal':'20','codeName':'活动推广'}]")
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
    	if (!Dic.isNull(statusCd) && statusCd == "1100") {
    		layer.alert("已是无效状态！");
    		
    		return;
    	}
    	
    	var ids = new Array();
    	
    	ids.push(id);
    	
    	layer.confirm("确定营销活动信息吗?", {icon: 3, title:'提示'}, function(index){
			$.ajax({
    			cache:false,
    			type:"POST",
    			async:false,
    			dataType: "json", 
    		    data: {ids:JSON.stringify(ids)},
    			url:ctx+"/marketActvity/deleteByIds.do",
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
    	var url = web_ctx + '/html/generalchannel/marketActivity_update.html';
		var param = "?id="+id;
		layer.open({
			 title: '修改营销活动信息',
			 type: 2,
			 area: ['800px', '400px'],
			 skin: 'layui-layer-rim', //加上边框
			 content : url + param
		});
    };
    
    this.add = function(){
		var url = web_ctx + '/html/generalchannel/marketActivity_add.html';
		var param = "";
		layer.open({
			 title: '新增营销活动信息',
			 type: 2,
			 area: ['800px', '400px'],
			 skin: 'layui-layer-rim', //加上边框
			 content : url + param
		});
    };
    
    this.addGeneralChannel = function(id) {
    	var url = web_ctx + '/html/generalchannel/marketActivity_addGeneralChannel.html';
    	var param = "?id="+id;
		layer.open({
			 title: '营销活动与泛渠道关系',
			 type: 2,
			 area: ['800px', '480px'],
			 skin: 'layui-layer-rim', //加上边框
			 content : url + param
		});
    };
    
    this.detail = function(id) {
    	var url = web_ctx + '/html/generalchannel/marketActivity_detail.html';
		var param = "?id="+id;
		layer.open({
			 title: '营销活动信息详情',
			 type: 2,
			 area: ['800px', '400px'],
			 skin: 'layui-layer-rim', //加上边框
			 content : url + param
		});
    };
	
    this.getParam = function(){
    	var name = $("#name").val();
    	var type = $("#type").val();
    	var url = $("#url").val();
    	var origin = $("#origin").val();
    	var description = $("#description").val();
    	var statusCd = $("#statusCd").val();
    	
    	
    	var param = {
				"name": Dic.trim(name),
				"type": type,
				"url": Dic.trim(url),
				"origin": Dic.trim(origin),
				"description": Dic.trim(description),
				"statusCd": statusCd
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
            url : ctx + 'marketActvity/findAll.do',
            head : [
	                {dis:'选择', name:'id', width:'1%', align:'left',checked:true,freeze : true},
	                {dis:'活动名称', name:'name',width:'3%',align:'left'},
	                {dis:'活动类型', name:'type',width:'1%',align:'left',replace:function(data){
         				if (data.type == '10'){
	                		return "广告营销";
	                	} else if (data.type == '20') {
	                		return "活动推广";
	                	} else {
	                		return "";
	                	}
	                }},
	                {dis:'活动Url', name:'url',width:'2%',align:'left'},
	                {dis:'活动来源系统', name:'origin',width:'2%',align:'left'},
	                {dis:'描述', name:'description',width:'3%',align:'left'},
					{dis:'状态', name:'statusCd',width:'1%',align:'left',replace:function(data){
	                	if (data.statusCd == '1000'){
	                		return "有效";
	                	} else if (data.statusCd == '1100') {
	                		return "无效";
	                	} else {
	                		return "";
	                	}
	                	
	                }},
	                {dis:'创建时间', name:'createDate',width:'2%',align:'left'},
					{dis:'操作', name:'',width:'2%',align:'left',replace:function(data){
	                	var html = "";
	                	
	                	html += "<a onclick='marketActivityList.detail("+data.id+")'>详情</a>&nbsp;&nbsp;";
	                	html += "<a onclick='marketActivityList.update("+data.id+")'>修改</a>&nbsp;&nbsp;";
	                	html += "<a onclick='marketActivityList.addGeneralChannel("+data.id+")'>加载泛渠道</a>&nbsp;&nbsp;";
	                	html += "<a onclick='marketActivityList.deleteById("+data.id+","+data.statusCd+")'>删除</a>&nbsp;&nbsp;";
	                	
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

var marketActivityList = new MarketActivityList();

$(document).ready(function () {
	marketActivityList.init();
	marketActivityList.initTable();
});