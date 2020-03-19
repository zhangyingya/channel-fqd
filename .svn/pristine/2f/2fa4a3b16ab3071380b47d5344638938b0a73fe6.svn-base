/**
 * 选择所属区域
 * @constructor
 */
var chooseStaff = function () {
	var _this;
    var table = null;
    this.defaultPageSizeB = 1;  //默认每页10条
    this.currentPageB=1;
    this.checkNum = 0;
    /*
    *初始化
    */
    this.init = function () {
        _this = this;
        this.initTable();
        this.bind();
    } 
    
    /*
     * 添加事件
     */
    this.bind = function(){
    	
    	 $("#search").click(function(){
    		 chooseStaff.initTable();
         });
    	 
    	 $("#choose").click(function(){
    		 chooseStaff.chooseEvent();
         });
    }
    
    
    this.getParam = function(){
    	
    	var staffName = $("#staffName").val();
    	var staffCode = $("#staffCode").val();
    	var staffId = $("#staffId").val();
    	var param = {
    			"staffId":staffId,
    			"staffCode":staffCode,
    			"staffName":staffName
    	}
    	return param;
    }
    this.initTable = function(){
    	var  $el= this;
        // 清空历史信息
        $("#staffTable").empty();
        var param = this.getParam();

        this.currentPageB = this.getCurrentPageB() == null ? 1 : this.getCurrentPageB();
        this.defaultPageSizeB = this.getPageSizeB() == null ? 10 : this.getPageSizeB();
        _this.table = Dic.table.build({
            tableObj : $("#staffTable"),
            model : 0,
            pageSize : 10,
            currentPage:1,
            pageCount : true,
            freeze : false,
            leftWidth : '900px',
            rightWidth: '1100px',
            waitTime : 15,
            initParam: param,
            url : ctx + 'outerring/queryStaffList.do',
            head : [
                {dis:'员工标识', name:'staffId', checked:true,width:'1%',align:'left',freeze:true},
                {dis:'员工标识', name:'staffId',width:'2%',align:'left',freeze:true},
                {dis:'员工编码', name:'staffCode',width:'2%',align:'left',freeze:true},
                {dis:'员工姓名', name:'staffName',width:'3%',align:'left',freeze:true},
                {dis:'员工状态', name:'statusCd',width:'2%',align:'left',freeze:true,replace:function(data){
                	if(data.statusCd == '1000'){
                		return "有效";
                	}else if(data.statusCd == '1001'){
                		return "暂停";
                	}else if(data.statusCd == '1010'){
                		return "锁定";
                	}else if(data.statusCd == '1011'){
                		return "密码错误锁定";
                	}else if(data.statusCd == '1020'){
                		return "停用";
                	}else if(data.statusCd == '1100'){
                		return "无效";
                	}else if(data.statusCd == '1200'){
                		return "未生效";
                	}else if(data.statusCd == '1210'){
                		return "审批通过";
                	}else if(data.statusCd == '1220'){
                		return "审批中";
                	}else if(data.statusCd == '1230'){
                		return "审批未通过";
                	}
                }}
            ],
            load : function(){
            	chooseStaff.setCurrentPageB(_this.table.getCurrentPage());
                chooseStaff.setPageSizeB(_this.table.getPageSize());
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
    			var statusCd = $(this).children().eq(4).html();
    			
    			if(statusCd != '有效'){
    				layer.alert("只能选择状态为有效的员工！");
    				return;
    			}
    		}
    	});
    	$(".dataGridWRow").each(function (i){
    		
    		var tds = $(this).children().eq(0);
    		
    		var checkbox = tds.find("input:checkbox");
    		
    		var checked = checkbox.attr("checked");
    		
    		if(checked == "checked"){
    			
    			var statusCd = $(this).children().eq(4).html();
    			
    			if(statusCd != '有效'){
    				layer.alert("只能选择状态为有效的员工！");
    				return;
    			}
    		}
    	});
    	
    	var chooseStaffArr = chooseStaff.table.getAllSelRows();
    	
    	if(chooseStaffArr.length == 0){
    		layer.alert("请选择一个员工！");
    	}else if(chooseStaffArr.length > 1){
    		layer.alert("只能选择一个员工！");
    	}else{
    		//返回参数
            parent.getChildIframeStaffData(chooseStaffArr);
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

var chooseStaff = new chooseStaff();

$(document).ready(function () {
	chooseStaff.init();
});