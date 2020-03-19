


/**
 * 用户信息
 * @constructor
 */
var DataList = function () {
    var _this = null;

    /*
    *初始化
    */
    this.init = function () {
        _this = this;
        this.initTable();
        this.bind();
        
        new Tablib().init({
            operationDiv : $('#dayOfWeekUl'),
            tagData : eval("[{'codeVal':'MON','codeName':'周一'},{'codeVal':'TUE','codeName':'周二'}]")
        });

    }, 
    this.bind = function(){
        $("#search").click(function(){
            _this.initTable();
        });
        $("#clean").click(function(){
        	$("#userCode").val('');
        	$("#userName").val('');
        	$("#regStartTime").val(''); 
        	$("#regEndTime").val(''); 
        });


        $("#regStartTime").click(function() {
            WdatePicker({
                el:'createDate',
                lang: 'zh-CN', dateFmt: 'yyyy-MM-dd HH:mm:ss',
                // maxDate: '#F{$dp.$D(\'regStartTime\')}',
                maxDate: '%y-%M-%d',
                readonly: true
            });
        });
    }
    
    this.getParam = function(){
    	var menuName = $("#menuName").val();
        var createDate = $("#createDate").val();
        
    	var param = {
    			"menuName":menuName,
    			"createDate":createDate};
    	return param;
    },
    
    
    this.initTable = function(){
        // 清空历史信息
        $("#orderTable").empty();
        var param = this.getParam();

        this.currentPageB = 1;
        this.defaultPageSizeB = this.getPageSizeB() == null ? 10 : this.getPageSizeB();
        var table = Dic.table.build({
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
            url : ctx + 'index/findFuncMenuList.do',
            head : [
                {dis:'菜单名称', name:'menuName',width:'3%',align:'left',replace:function(data){
                	var bth='<a href="javascript:;" onclick="dataList.queryInfoDetail('+data.userId+')">'+dataList.processUndefined(data.userName)+'</a>';
            	return bth;
                }},      //
                {dis:'用户账号', name:'menuType',width:'3%',align:'left'},
                {dis:'电话号码', name:'menuLevel',width:'4%',align:'left'}, 
                {dis:'性别', name:'menuIndex',width:'2%',align:'left'}, 
                {dis:'账户余额', name:'parMenuId',width:'2%',align:'left'},      //
                {dis:'累计充值金额', name:'menuDesc',width:'3%',align:'left'},
                {dis:'累计消费金额', name:'createDate',width:'3%',align:'left'},        //
                {dis:'操作', name:'discountValue',width:'2%',align:'left',replace:function(data){
                	 var btn = '<a href="javascript:;" onclick="dataList.modUserInfo('+data.userId+')">修改</a>';
                	 return btn;
                }}
            ],
            load : function(){
            	dataList.setCurrentPageB(table.getCurrentPage());
            	dataList.setPageSizeB(table.getPageSize());
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
        this.setCurrentPageB(table.getCurrentPage());
        this.setPageSizeB(table.getPageSize());
    }
    this.getCurrentPageB = function () {return window.top.currentPageUserInfoList;}
    this.setCurrentPageB = function (currentPageB) {window.top.currentPageUserInfoList = currentPageB;}

    this.getPageSizeB = function () {return window.top.pageSizeUserInfoList;}
    this.setPageSizeB = function (pageSizeB) {window.top.pageSizeUserInfoList = pageSizeB;}

    /**
     * [处理空对象]
     * @param  {[type]} tempData [对象]
     * @return {[type]}     
     */
    this.processUndefined = function (tempData) {
        if(tempData == null){
            tempData = '';
        }
        return tempData == undefined ? '' : tempData;
    };
    this.queryInfoDetail = function(userId)
    {
    	window.location.href=rootPath+"/html/user/userInfoDetail.html?userId="+userId;
    };
    this.modUserInfo = function(userId)
    {
    	window.location.href=rootPath+"/html/user/userInfoMod.html?userId="+userId;
    };
};

var dataList = new DataList();

$(document).ready(function () {
	dataList.init();
});