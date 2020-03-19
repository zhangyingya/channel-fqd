/**
 * 选择渠道信息
 * @returns
 */
var ChooseStaffInfo = function () {
    var _this;
    var table = null;
    this.defaultPageSizeB = 1;  //默认每页10条
    this.currentPageB=1;

    this.chooseStaffs = new Array();

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
    		 _this.initTable();
         });
    	 
    	 $("#choose").bind('click', _this.chooseEvent);
    	 
    };
    

    
    this.getParam = function(){
    	var staffName = $("#staffName").val();
    	var salesCode = $("#salesCode").val();
    	var param = {
    			"staffName" : staffName,
    			"salesCode" : salesCode,
    			"channelId" : Dic.Url.getParams('channelId')
    	}
    	return param;
    };
    
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
            url : ctx + 'staff/findAllByChannelId.do',
            head : [
                {dis:'员工标识', 	name:'staffId', checked:true,width:'1%',align:'left',freeze:true},
                {dis:'销售员姓名', 	name:'staffName',width:'3%',align:'left',freeze:true},
                {dis:'销售员编码', 	name:'salesCode',width:'3%',align:'left',freeze:true}
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
            
            var chooseStaffs = [];
            for (var i=0;i<choosedArr.length; i++) {
            	var chooseStaff = {
            			staffId: choosedArr[i].staffId,
            			staffName: choosedArr[i].staffName,
            			salesCode: choosedArr[i].salesCode
                    };
            	chooseStaffs.push(chooseStaff);
            }
            
            //返回参数
            parent.getChildIframeSalesCodeData(chooseStaffs);
            //关闭父页面
            parent.layer.closeAll();
        }
    };

    this.getCurrentPageB = function () {return window.top.currentPageB;}
    this.setCurrentPageB = function (currentPageB) {window.top.currentPageB = currentPageB;}

    this.getPageSizeB = function () {return window.top.pageSizeB;}
    this.setPageSizeB = function (pageSizeB) {window.top.pageSizeB = pageSizeB;}
}

var chooseStaffInfo = new ChooseStaffInfo();

$(document).ready(function () {
	chooseStaffInfo.init();
});