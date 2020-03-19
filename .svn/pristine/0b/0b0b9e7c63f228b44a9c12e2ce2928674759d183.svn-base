/**
 * 选择所属区域
 * @constructor
 */
var chooseSystemRole = function () {
	var _this;
    var table = null;
    this.defaultPageSizeB = 1;  //默认每页10条
    this.currentPageB=1;
    this.checkNum = 0;
    
    this.chooseOrgs = [];
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
    		 _this.table.clearAllSels();
    		 chooseSystemRole.initTable();
         });
    	 
    	 $("#choose").click(function(){
    		 chooseSystemRole.chooseEvent();
         });
    }
    
    
    this.getParam = function(){
    	
    	var orgName = $("#orgName").val();
    	var orgId = $("#orgId").val();
    	var orgCode = $("#orgCode").val();
    	var param = {
    			"orgCode":orgCode,
    			"orgName":orgName,
    			"orgId":orgId
    	}
    	return param;
    }
    this.initTable = function(){
    	var  $el= this;
        // 清空历史信息
        $("#orgTable").empty();
        var param = this.getParam();

        this.currentPageB = this.getCurrentPageB() == null ? 1 : this.getCurrentPageB();
        this.defaultPageSizeB = this.getPageSizeB() == null ? 10 : this.getPageSizeB();
        _this.table = Dic.table.build({
            tableObj : $("#orgTable"),
            model : 0,
            pageSize : 10,
            currentPage:1,
            pageCount : true,
            freeze : false,
            leftWidth : '900px',
            rightWidth: '1100px',
            waitTime : 15,
            initParam: param,
            url : ctx + 'outerring/queryOrganizationList.do',
            head : [
                {dis:'组织标识', name:'orgId', checked:true,width:'1%',align:'left',freeze:true},
                {dis:'组织标识', name:'orgId',width:'2%',align:'left',freeze:true},
                {dis:'组织编码', name:'orgCode',width:'2%',align:'left',freeze:true},
                {dis:'组织名称', name:'orgName',width:'3%',align:'left',freeze:true},
            ],
            load : function(){
            	chooseSystemRole.setCurrentPageB(_this.table.getCurrentPage());
                chooseSystemRole.setPageSizeB(_this.table.getPageSize());
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
    	var choosedArr = _this.table.getAllSelRows();
    	var chooseCount = choosedArr.length;
    	
    	if(chooseCount == 0){
    		layer.alert("至少选择一个岗位");
    	}else{
    		var orgMaxLength = Dic.Url.getParams('orgMaxLength');
            if(orgMaxLength && chooseCount > orgMaxLength){
            	layer.alert("至多只能选择["+orgMaxLength+"]个岗位");
                return;
            }
            
            var chooseOrgs = [];
            for (var i=0;i<choosedArr.length; i++) {
            	var choosOrg = {
            			orgId: choosedArr[i].orgId,
            			orgCode: choosedArr[i].orgCode,
            			orgName: choosedArr[i].orgName
                    };
            	chooseOrgs.push(choosOrg);
            }
            //返回参数
            parent.getChildIframeOrgsData(chooseOrgs);
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

var chooseSystemRole = new chooseSystemRole();

$(document).ready(function () {
	chooseSystemRole.init();
});