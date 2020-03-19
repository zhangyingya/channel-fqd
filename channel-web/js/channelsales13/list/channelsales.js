var ChannelSalesList = function() {
	var table = null;
	var _this = null;
    this.defaultPageSizeB = 1;  //默认每页10条
    this.currentPageB=1;
    
    this.init = function () {
    	 _this = this;
    	 
 		if (parent.checkControlPrivilege("1007000036010001")) {
 			$("#generateReportClass").attr("style","display:block;");
 		}
    	 this.initSelect();
    	 this.initTable();
    	 this.bind();
    };
    
    /**
     * 初始化账期下拉框数据
     */
    this.initSelect = function(){
    	//连续获取一年的账期
    	var monthDataArr = DateUtils.getYearMonthSelect(12);
    	$("#monthId").val(monthDataArr[0].codeVal);
    	$("#monthName").val(monthDataArr[0].codeName);
    	new Tablib().init({
  	         operationDiv : $('#monthUl'),
  	         tagData : monthDataArr
   		});
    	
        //渠道单元归属类别下拉框（自营厅、城市商圈、城市社区、农村市场）
        new Tablib().init({
 	         operationDiv : $('#channelOwnTypeUl'),
 	         tagData : eval("[{'codeVal': '', 'codeName': '全部'}, " +
	 	         			"{'codeVal': '自营厅', 'codeName': '自营厅'}, " +
	 	         			"{'codeVal': '城市商圈', 'codeName': '城市商圈'}, " +
	 	         			"{'codeVal': '城市社区', 'codeName': '城市社区'}, " +
	 	         			"{'codeVal': '农村市场', 'codeName': '农村市场'}]")
  		});
        //初始化本地网下拉框
        this.getLatnInfo();
    };
    
    /**
     * 获取本地网信息（加载本地网下拉框）
     */
    this.getLatnInfo = function(){
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
				/*if(data != null){
					var appInfoHTML = "";
					var resultArr = data.commonRegions;
					if(data.latnId == '888'){
						$("#latnName").val("全部");
						appInfoHTML='<li key="" tValue="全部" style="width:100%;"><a>'+"全部"+'</a></li>';
						for(var i = 0 ; i < resultArr.length; i++){
							var result = resultArr[i];
							appInfoHTML += '<li key="'+result.code+'" tValue="'+result.name+'" style="width:100%;"><a>'+result.name+'</a></li>';
						}
						$("#latnUl").append(appInfoHTML);
					}else{
						for(var i = 0; i < resultArr.length; i++){
							if(resultArr[i].code == data.latnId){
								$("#latnName").val(resultArr[i].name);
					    		$("#latnId").val(resultArr[i].code);
								appInfoHTML += '<li key="'+resultArr[i].code+'" tValue="'+resultArr[i].name+'" style="width:100%;"><a>'+resultArr[i].name+'</a></li>';
								$("#latnUl").append(appInfoHTML);
							}
						}
					}
				}*/
			}
    	});
 	 
	 	 $("#latnUl").on("click","li", function(){
	 		 $("#latnName").val($(this).attr("tValue"));
	 		 $("#latnId").val($(this).attr("key"));
	 	 });
    };
    
    this.bind = function(){
        $("#search").click(function(){
        	channelSalesList.initTable();
        });
        
        $("#export").click(function(){
        	var monthId = $("#monthId").val();
        	var latnName = $("#latnName").val();
        	var channelGslb = $("#channelOwnTypeId").val();
        	window.location.href = ctx + 'channelSales/exportChannelSales.do?' +
        		"monthId=" + monthId + "&latnName=" + latnName + "&channelGslb=" + channelGslb;
        });
        
        $("#generateReport").click(function(){
        	$.ajax({url:ctx + 'generalChannelReport/generateReport.do',async:false});
        });
        
    };
        
    this.getParam = function(){
    	var monthId = $("#monthId").val();
    	var latnName = $("#latnName").val();
    	var channelGslb = $("#channelOwnTypeId").val();
    	var param = {
    			"monthId": monthId,
    			"latnName": latnName,
    			"channelGslb": channelGslb
    	}
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
            url : ctx + 'channelSales/findChannelSales.do',
            head : [
	                {dis:'本地网', name:'latnName',width:'2%',align:'left'},
	                {dis:'渠道单元名称', name:'channelName',width:'3%',align:'left'},
	                {dis:'渠道单元编码', name:'channelNbr',width:'3%',align:'left'},
	                {dis:'一级分类', name:'channelFirstType',width:'2%',align:'left'},
	                {dis:'二级分类', name:'channelSecondType',width:'2%',align:'left'},
	                {dis:'三级分类', name:'channelThirdType',width:'2%',align:'left'},
	                {dis:'渠道单元归属类别', name:'channelGslb',width:'2%',align:'left'}
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
        this.setCurrentPageB(this.table.getCurrentPage());
        this.setPageSizeB(this.table.getPageSize());
    };
    
    this.getCurrentPageB = function () {return window.top.currentPageUserInfoList;}
    this.setCurrentPageB = function (currentPageB) {window.top.currentPageUserInfoList = currentPageB;}

    this.getPageSizeB = function () {return window.top.pageSizeUserInfoList;}
    this.setPageSizeB = function (pageSizeB) {window.top.pageSizeUserInfoList = pageSizeB;}
};

var channelSalesList = new ChannelSalesList();

$(document).ready(function () {
	channelSalesList.init();
	channelSalesList.initTable();
});