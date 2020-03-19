/**
 * 选择渠道信息
 * @returns
 */
var ChooseVillageInfo = function () {
    var _this;
    var table = null;
    this.defaultPageSizeB = 1;  //默认每页10条
    this.currentPageB=1;

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
    	var townName = $("#townName").val();
    	var regionName = $("#regionName").val();
    	var latnId = Dic.Url.getParams('latnId');
    	var param = {
    			"latnId" : latnId,
    			"townName" : townName,
    			"regionName" : regionName,
    			"distinctTown" : "distinctTown"
    	}
    	return param;
    };
    
    this.initTable = function(){
    	var  $el= this;
        // 清空历史信息
        $("#generalChanenlVillageTable").empty();
        var param = this.getParam();

        this.currentPageB = this.getCurrentPageB() == null ? 1 : this.getCurrentPageB();
        this.defaultPageSizeB = this.getPageSizeB() == null ? 10 : this.getPageSizeB();
        _this.table = Dic.table.build({
            tableObj : $("#generalChanenlVillageTable"),
            model : 0,
            pageSize : 10,
            currentPage:1,
            pageCount : true,
            freeze : false,
            leftWidth : '900px',
            rightWidth: '1100px',
            waitTime : 15,
            initParam: param,
            url : ctx + 'generalChannel/findTownNames.do',
            head : [
            	{dis:'乡镇', 	name:'townName', checked:true,width:'1%',align:'left',freeze:true},
                {dis:'本地网', 	name:'latnName',width:'3%',align:'left',freeze:true},
                {dis:'区县', 	name:'regionName',width:'3%',align:'left',freeze:true},
                {dis:'乡镇', 	name:'townName',width:'3%',align:'left',freeze:true}
                //{dis:'行政村', 	name:'villageName',width:'3%',align:'left',freeze:true},
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
        	layer.alert('至少选择一个乡镇');
        }else{
            var userMaxLength = Dic.Url.getParams('userMaxLength');
            if('-1' != userMaxLength){	//userMaxLength == -1代表选择用户数没有限制
            	if(userMaxLength && chooseCount > userMaxLength){
            		layer.alert("至多只能选择["+userMaxLength+"]个乡镇");
                    return;
                }
            }
            
            var chooseVillages = [];
            for (var i=0;i<choosedArr.length; i++) {
            	var chooseVillage = {
            			townName : choosedArr[i].townName
                    };
            	chooseVillages.push(chooseVillage);
            }
            
            //返回参数
            parent.getChildIframeTownData(chooseVillages);
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

var chooseVillageInfo = new ChooseVillageInfo();

$(document).ready(function () {
	chooseVillageInfo.init();
});