/**
 * 选择所属区域
 * @constructor
 */
var chooseSystemRole = function () {
    var table = null;
    var _this;
    this.defaultPageSizeB = 1;  //默认每页10条
    this.currentPageB=1;
    this.checkNum = 0;
    this.chooseRoles = [];
    this.unSysRoleIds = [];
    this.curSelect = {};
    this.latnId = null;
    this.flag = null;
    /*
    *初始化
    */
    this.init = function () {
    	this.unSysRoleIds=Dic.Url.getParams('unSysRoleIds');
    	this.latnId = Dic.Url.getParams('latnId');
    	this.flag = Dic.Url.getParams('flag');
        _this = this;
        //获取本地网信息（加载本地网下拉框）
        this.getLatnInfo();
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
    	 
	 	 $("#latnUl").on("click","li",function(){
	 		 $("#latnName").val($(this).attr("tValue"));
	 		 $("#latnId").val($(this).attr("key"));
	 	 });
    }
    
    /**
     * 获取本地网信息（加载本地网下拉框）
     */
    this.getLatnInfo = function(){
    	$.ajax({
 		 	async : false,
				cache : false,
				type : 'POST',
				url : ctx + "outerring/querySXLatnList.do",
				dataType : 'json',
				timeout : 10000,
				success : function(data) {
					if(data.result != null){
						var appInfoHTML = "";
						_this.latnId = data.staffLatnId;
						if(_this.latnId != null && _this.latnId == '888'){
							appInfoHTML='<li key="" tValue="全部" style="width:100%;"><a>'+"全部"+'</a></li>';
							for(var i = 0 ;i < data.result.length; i++){
								var result = data.result[i];
								appInfoHTML += '<li key="'+result.code+'" tValue="'+result.name+'" style="width:100%;"><a>'+result.name+'</a></li>';
							}
							$("#latnUl").append(appInfoHTML);
						}else{
							latnFlag = _this.latnId;
							appInfoHTML='<li key="" tValue="全部" style="width:100%;"><a>'+"全部"+'</a></li>';
							for(var i = 0 ;i < data.result.length; i++){
								var result = data.result[i];
								if(_this.latnId == result.code || '888' == result.code ){
									appInfoHTML += '<li key="'+result.code+'" tValue="'+result.name+'" style="width:100%;"><a>'+result.name+'</a></li>';
								}
							}
							$("#latnUl").append(appInfoHTML);
						}
					
					}
				}
		 });
    };
    
    
    this.getParam = function(){
    	var sysRoleName = $("#sysRoleName").val();
    	var regionId = $("#latnId").val();
    	var latnFlag = "";
    	if(this.latnId != '888'){
    		latnFlag = _this.latnId;
    	}
    	var param = {
    			"sysRoleName":sysRoleName,
    			"regionId": regionId,
    			"statusCd":"1000",
    			"unSysRoleIds":this.unSysRoleIds,
    			"flag":this.flag
    	}
    	
    	return param;
    }
    this.initTable = function(){
    	var  $el= this;
        // 清空历史信息
        $("#roleTable").empty();
        var param = this.getParam();

        this.currentPageB = this.getCurrentPageB() == null ? 1 : this.getCurrentPageB();
        this.defaultPageSizeB = this.getPageSizeB() == null ? 10 : this.getPageSizeB();
        _this.table = Dic.table.build({
            tableObj : $("#roleTable"),
            model : 0,
            pageSize : 10,
            currentPage:1,
            pageCount : true,
            //freeze : false,
            leftWidth : '900px',
            rightWidth: '1100px',
            waitTime : 15,
            initParam: param,
            url : ctx + 'systemrole/querySystemRoleList.do',
            head : [
                {dis:'角色标识', name:'sysRoleId', checked:true,width:'1%',align:'left',freeze:true},
                {dis:'本地网', name:'regionName',width:'2%',align:'left',freeze:true},
                {dis:'角色编码', name:'sysRoleCode',width:'3%',align:'left',freeze:true},
                {dis:'角色名称', name:'sysRoleName',width:'3%',align:'left',freeze:true}
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
    };
    
    
    this.chooseEvent = function() {
    	//var choosedArr = _this.table.getSelRows();
    	var choosedArr = _this.table.getAllSelRows();
    	var chooseCount = choosedArr.length;
    	
    	if(chooseCount == 0){
    		layer.alert("至少选择一个角色");
    	}else{
    		var roleMaxLength = Dic.Url.getParams('roleMaxLength');
            if(roleMaxLength && chooseCount > roleMaxLength){
            	layer.alert("至多只能选择["+roleMaxLength+"]个角色");
                return;
            }
            
            var chooseRoles = [];
            for (var i=0;i<choosedArr.length; i++) {
            	var chooseRole = {
                        sysRoleId: choosedArr[i].sysRoleId,
                        sysRoleName: choosedArr[i].sysRoleName,
                        sysRoleCode: choosedArr[i].sysRoleCode
                    };
                 chooseRoles.push(chooseRole);
            }
            //返回参数
            parent.getChildIframeRoleData(chooseRoles);
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

var chooseSystemRole = new chooseSystemRole();

$(document).ready(function () {
	chooseSystemRole.init();
});