/**
 * 选择渠道信息
 * @returns
 */
var ChooseChannelInfo = function () {
    var _this;
    var table = null;
    this.defaultPageSizeB = 1;  //默认每页10条
    this.currentPageB=1;
    this.channelSubtypeCds = null;
    this.chooseChannels = new Array();

    /*
    *初始化
    */
    this.init = function () {
        _this = this;
        this.channelSubtypeCds = Dic.Url.getParams('channelSubtypeCds');
        this.initLatn();
        this.initTable();
        this.bind();
        
        
        
    } 
    
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
 	 	});
    };
    

    
    this.getParam = function(){
    	var channelName = $("#channelName").val();
    	var channelNbr = $("#channelNbr").val();
    	var latnId = $("#latnId").val();
    	var param = {
    			"latnId" : latnId,
    			"channelName" : channelName,
    			"channelNbr" : channelNbr,
    			"channelSubtypeCds" : this.channelSubtypeCds
    	}
    	return param;
    };
    
    this.initLatn = function() {
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
						}
							
					}
				}
		 });
    };
    
    this.initTable = function(){
    	var  $el= this;
        // 清空历史信息
        $("#channelTable").empty();
        var param = this.getParam();

        this.currentPageB = this.getCurrentPageB() == null ? 1 : this.getCurrentPageB();
        this.defaultPageSizeB = this.getPageSizeB() == null ? 10 : this.getPageSizeB();
        _this.table = Dic.table.build({
            tableObj : $("#channelTable"),
            model : 0,
            pageSize : 10,
            currentPage:1,
            pageCount : true,
            freeze : false,
            leftWidth : '900px',
            rightWidth: '1100px',
            waitTime : 15,
            initParam: param,
            url : ctx + 'channel/findAll.do',
            head : [
                {dis:'渠道标识', 	name:'channelId', checked:true,width:'1%',align:'left',freeze:true},
                {dis:'本地网', 		name:'latnName',width:'3%',align:'left',freeze:true},
                {dis:'渠道名称', 	name:'channelName',width:'3%',align:'left',freeze:true},
                {dis:'渠道编码', 	name:'channelNbr',width:'3%',align:'left',freeze:true}
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
            
            var chooseChannels = [];
            for (var i=0;i<choosedArr.length; i++) {
            	var chooseChannel = {
            			channelId: choosedArr[i].channelId,
            			channelName: choosedArr[i].channelName,
            			channelNbr: choosedArr[i].channelNbr,
            			latnId: choosedArr[i].latnId,
            			commonRegionTownId : choosedArr[i].commonRegionTownId,
            			specializedTeamsId : choosedArr[i].specializedTeamsId,
            			specializedTeamsName : choosedArr[i].specializedTeamsName
                    };
            	chooseChannels.push(chooseChannel);
            }
            
            //返回参数
            parent.getChildIframeChannelData(chooseChannels);
            //关闭父页面
            parent.layer.closeAll();
        }
    };

    this.getCurrentPageB = function () {return window.top.currentPageB;}
    this.setCurrentPageB = function (currentPageB) {window.top.currentPageB = currentPageB;}

    this.getPageSizeB = function () {return window.top.pageSizeB;}
    this.setPageSizeB = function (pageSizeB) {window.top.pageSizeB = pageSizeB;}

    /**
     * [处理空对象]
     * @param  {[type]} tempData [对象]
     * @return {[type]}     
     */
    this.processUndefined = function (tempData) {
        if(tempData == null){
            tempData = 0;
        }
        return tempData == undefined ? 0 : tempData;
    }
}

var chooseChannelInfo = new ChooseChannelInfo();

$(document).ready(function () {
	chooseChannelInfo.init();
});