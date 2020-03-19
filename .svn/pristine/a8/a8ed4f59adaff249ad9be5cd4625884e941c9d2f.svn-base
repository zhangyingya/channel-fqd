/**
 * 
选择所属区域
 * @constructor
 */
var chooseRegion = function () {
	var _this;
    var table = null;
    var flag = "";
    this.defaultPageSizeB = 1;  //默认每页10条
    this.currentPageB=1;
    this.checkNum = 0;
    this.latnId = null;
    /*
    *初始化
    */
    this.init = function () {
        _this = this;
        this.latnId = Dic.Url.getParams('latnId');
        this.initTable();
        this.bind();
    } 
    
    /*
     * 添加事件
     */
    this.bind = function(){
    	
    	 $("#search").click(function(){
    		 flag = true;
    		 _this.table.clearAllSels();
    		 chooseRegion.initTable();
         });
    	 
    	 $("#choose").click(function(){
    		 chooseRegion.chooseEvent();
         });
    }
    
    
    this.getParam = function(){
    	var commonRegionId = "";
    	var regionName = $("#regionName").val();
    	if(flag == true){	//点击搜索
    		commonRegionId = $("#commonRegionId").val();
    	}else{
    		var latnId = chooseRegion.latnId;
        	if(latnId != '888' && latnId != ''){
        		commonRegionId = chooseRegion.latnId;
        	}
    	}
    	var param = {
			"commonRegionId":commonRegionId,
			"regionName":regionName
    	}
    	
    	flag = false;
    	return param;
    }
    this.initTable = function(){
    	var  $el= this;
        // 清空历史信息
        $("#regionTable").empty();
        var param = this.getParam();

        this.currentPageB = this.getCurrentPageB() == null ? 1 : this.getCurrentPageB();
        this.defaultPageSizeB = this.getPageSizeB() == null ? 10 : this.getPageSizeB();
        _this.table = Dic.table.build({
            tableObj : $("#regionTable"),
            model : 0,
            pageSize : 10,
            currentPage:1,
            pageCount : true,
            freeze : false,
            leftWidth : '900px',
            rightWidth: '1100px',
            waitTime : 15,
            initParam: param,
            url : ctx + 'outerring/queryRegionList.do',
            head : [
                {dis:'区域标识', name:'commonRegionId', checked:true,width:'1%',align:'left',freeze:true},
                {dis:'区域标识', name:'commonRegionId',width:'2%',align:'left',freeze:true},
                {dis:'区域编码', name:'regionNbr',width:'2%',align:'left',freeze:true},
                {dis:'本地网', name:'regionName',width:'2%',align:'left',freeze:true},
                {dis:'区域类型', name:'regionType',width:'3%',align:'left',freeze:true,replace:function(data){
                	if(data.regionType == '1000'){
                		return "集团";
                	}else if(data.regionType == '1100'){
                		return "省公司";
                	}else if(data.regionType == '1200'){
                		return "省级大区";
                	}else if(data.regionType == '1300'){
                		return "地市公司";
                	}else{
                		return "地市公司以下";
                	}
                }},
                {dis:'状态', name:'statusCd',width:'2%',align:'left',freeze:true,replace:function(data){
                	if(data.statusCd == '1000'){
                		return "有效";
                	}else if(data.statusCd == '1100'){
                		return "无效";
                	}else{
                		return "未生效";
                	}
                }},
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
    }
    
    this.chooseEvent = function() {
    	
    	$(".dataGridWRow2").each(function (i){
    		
    		var tds = $(this).children().eq(0);
    		
    		var checkbox = tds.find("input:checkbox");
    		
    		var checked = checkbox.attr("checked");
    		
    		if(checked == "checked"){
    			var statusCd = $(this).children().eq(5).html();
    			
    			if(statusCd != '有效'){
    				layer.alert("只能选择状态为有效的区域！");
    				return;
    			}
    		}
    	});
    	$(".dataGridWRow").each(function (i){
    		
    		var tds = $(this).children().eq(0);
    		
    		var checkbox = tds.find("input:checkbox");
    		
    		var checked = checkbox.attr("checked");
    		
    		if(checked == "checked"){
    			var statusCd = $(this).children().eq(5).html();
    			
    			if(statusCd != '有效'){
    				layer.alert("只能选择状态为有效的区域！");
    				return;
    			}
    		}
    	});
    	
    	debugger;
    	
    	var chooseRegionArr = chooseRegion.table.getAllSelRows();
    	
    	if(chooseRegionArr.length == 0){
    		layer.alert("请选择一个区域！");
    	}else if(chooseRegionArr.length > 1){
    		layer.alert("只能选择一个区域！");
    	}else{
    		//返回参数
            parent.getChildIframeRegionData(chooseRegionArr);
            //关闭父页面
            parent.layer.closeAll();
    	}
    	
	}

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

var chooseRegion = new chooseRegion();

$(document).ready(function () {
	chooseRegion.init();
});