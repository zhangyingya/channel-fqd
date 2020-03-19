/**
 * 选择渠道信息
 * @returns
 */
var ChooseGeneralChannelInfo = function () {
    var _this;
    var table = null;
    this.defaultPageSizeB = 1;  //默认每页10条
    this.currentPageB=1;
    this.unIds = [];

    /*
    *初始化
    */
    this.init = function () {
        _this = this;
        this.unIds = Dic.Url.getParams('unGenernalChannelIds');
        this.initLatn();
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
    
    /*
     * 添加事件
     */
    this.bind = function(){
    	 $("#search").click(function(){
    		 _this.initTable();
         });
    	 
    	 $("#choose").bind('click', _this.chooseEvent);
    	 
    	 $("#latnUl").on("click","li",function(){
    		 	$("#latnName").val($(this).attr("tValue"));
    		 	$("#latnId").val($(this).attr("key"));
    		 	
    		 	var latnId = $("#latnId").val();
    		 	if (!Dic.isNull(latnId)) {
    		 		chooseGeneralChannelInfo.initArea(latnId);
    		 	} else {
    		 		$("#areaUl").find("li").remove(); 
    		 	}
    	 	});
     	
     	$("#areaUl").on("click","li",function(){
    		 	$("#areaName").val($(this).attr("tValue"));
    		 	$("#areaId").val($(this).attr("key"));
    	 	});
    	 
    };
    

    
    this.getParam = function(){
    	var commonRegionId = $("#latnId").val();
    	var childCommonRegionId = $("#areaId").val();
    	var channelNbr = $("#channelNbr").val();
    	var name = $("#name").val();
    	var code = $("#code").val();
    	
    	var param = {
    			"unIds":this.unIds,
				"commonRegionId": commonRegionId,
				"childCommonRegionId": childCommonRegionId,
				"channelNbr": Dic.trim(channelNbr),
				"name": Dic.trim(name),
				"code": Dic.trim(code),
				"statusCd":'20'
    	};
    	
    	return param;
    };
    
    this.initTable = function(){
    	var  $el= this;
        // 清空历史信息
        $("#generalChannelTable").empty();
        var param = this.getParam();

        this.currentPageB = this.getCurrentPageB() == null ? 1 : this.getCurrentPageB();
        this.defaultPageSizeB = this.getPageSizeB() == null ? 10 : this.getPageSizeB();
        _this.table = Dic.table.build({
            tableObj : $("#generalChannelTable"),
            model : 0,
            pageSize : 10,
            currentPage:1,
            pageCount : true,
            freeze : false,
            leftWidth : '900px',
            rightWidth: '1100px',
            waitTime : 15,
            initParam: param,
            url : ctx + 'generalChannel/findAll.do',
            head : [
					{dis:'选择', name:'id', width:'1%', align:'left',checked:true,freeze : true},
					{dis:'本地网', name:'regionName',width:'2%',align:'left'},
					{dis:'区县', name:'childRegionName',width:'2%',align:'left'},
					{dis:'结对渠道单元名称', name:'channelName',width:'3%',align:'left'},
					{dis:'名称', name:'name',width:'3%',align:'left'},
					{dis:'编码', name:'code',width:'2%',align:'left'}
            ],
            load : function(){
            	_this.setCurrentPageB(_this.table.getCurrentPage());
                _this.setPageSizeB(_this.table.getPageSize());

            },
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
        this.setCurrentPageB(_this.table.getCurrentPage());
        this.setPageSizeB(_this.table.getPageSize());
    };

    this.chooseEvent = function() {
    	var choosedArr = _this.table.getAllSelRows();
        var chooseCount = choosedArr.length;
        if(chooseCount == 0){
        	layer.alert('至少选择一个渠道单元');
        }else{
            var userMaxLength = Dic.Url.getParams('userMaxLength');
            if('-1' != userMaxLength){	//userMaxLength == -1代表选择用户数没有限制
            	if(userMaxLength && chooseCount > userMaxLength){
            		layer.alert("至多只能选择["+userMaxLength+"]个渠道单元");
                    return;
                }
            }
            
            var chooseGeneralChannels = [];
            for (var i=0;i<choosedArr.length; i++) {
            	var generalChannel = {
            			id: choosedArr[i].id,
            			name: choosedArr[i].name,
            			channelName: choosedArr[i].channelName,
            			regionName: choosedArr[i].regionName,
            			code: choosedArr[i].code
                    };
            	chooseGeneralChannels.push(generalChannel);
            }
            
            //返回参数
            parent.getChildIframeGeneralChannelData(chooseGeneralChannels);
            //关闭父页面
            parent.layer.closeAll();
        }
    };

    this.getCurrentPageB = function () {return window.top.currentPageB;}
    this.setCurrentPageB = function (currentPageB) {window.top.currentPageB = currentPageB;}

    this.getPageSizeB = function () {return window.top.pageSizeB;}
    this.setPageSizeB = function (pageSizeB) {window.top.pageSizeB = pageSizeB;}
}

var chooseGeneralChannelInfo = new ChooseGeneralChannelInfo();

$(document).ready(function () {
	chooseGeneralChannelInfo.init();
});