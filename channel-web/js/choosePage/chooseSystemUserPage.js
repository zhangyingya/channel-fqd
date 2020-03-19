var ChooseSystemUser = function () {
    var _this;
    var table = null;
    this.defaultPageSizeB = 1;  //默认每页10条
    this.currentPageB=1;
    this.unSysUserIds = [];
    this.chooseUsers = new Array();
    
    /*
    *初始化
    */
    this.init = function () {
        _this = this;
        this.unSysUserIds = Dic.Url.getParams('unSysUserIds');
        this.initLatnSelect();
        this.initTable();
        this.bind();
        
    };
    
    /**
     * 初始化本地网选择框
     */
    this.initLatnSelect = function() {
     	 $.ajax({
  		 	async : false,
  			cache : false,
  			type : 'POST',
  			url : ctx + "outerring/querySXLatnList.do",
  			dataType : 'json',
  			timeout : 10000,
  			success : function(data) {
  				if(data.result != null){
  					if(data.staffLatnId!= null && data.staffLatnId == 888){
  						$("#latnName").val("全部");
  						appInfoHTML='<li key="" tValue="全部" style="width:100%;"><a>'+"全部"+'</a></li>';
  						for(var i =0 ;i<data.result.length;i++){
  							var result = data.result[i];
  							appInfoHTML += '<li key="'+result.code+'" tValue="'+result.name+'" style="width:100%;"><a>'+result.name+'</a></li>';
  						}
  						$("#latnUl").append(appInfoHTML);
  					}else{
  						appInfoHTML='';
  						for(var i =0 ;i<data.result.length;i++){
  							var result = data.result[i];
  							if(data.staffLatnId==result.code){
  								 $("#latnName").val(result.name);
  					    		 $("#latnId").val(result.code);
  								appInfoHTML += '<li key="'+result.code+'" tValue="'+result.name+'" style="width:100%;"><a>'+result.name+'</a></li>';
  								$("#latnUl").append(appInfoHTML);
  							}
  						}
  					}
  				
  				}
  			}
  		});
    };
    
    /*
     * 添加事件
     */
    this.bind = function(){
 	 	 $("#latnUl").on("click","li",function(){
 	 		 $("#latnName").val($(this).attr("tValue"));
 	 		 $("#latnId").val($(this).attr("key"));
 	 	 });
    	
    	 $("#search").click(function(){
    		 _this.table.clearAllSels();
    		 _this.initTable();
         });
    	 
    	 $("#choose").bind('click', _this.chooseEvent);
    	 
    	 new Tablib().init({
	         operationDiv : $('#userStatusCDUl'),
	         tagData : eval("[{'codeVal':'','codeName':'全部'},{'codeVal':'1000','codeName':'有效'},{'codeVal':'1100','codeName':'无效'},{'codeVal':'1200','codeName':'冻结'}]")
	     });
    };
    
    
    this.getParam = function(){
    	var latnId = $("#latnId").val();
    	var sysUserCode = $("#sysUserCode").val();
    	var staffName = $("#staffName").val();
    	var statusCd = $("#statusCd").val();
    	
    	var param = {
    			"sysUserCode":sysUserCode,
    			"staffName":staffName,
    			"statusCd":statusCd,
    			"latnId":latnId,
    			"unSysUserIds":chooseSystemUser.unSysUserIds
    			
    	};
    	return param;
    };
    this.initTable = function(){
    	var  $el= this;
        // 清空历史信息
        $("#systemUserTable").empty();
        var param = this.getParam();

        this.currentPageB = this.getCurrentPageB() == null ? 1 : this.getCurrentPageB();
        this.defaultPageSizeB = this.getPageSizeB() == null ? 10 : this.getPageSizeB();
        _this.table = Dic.table.build({
            tableObj : $("#systemUserTable"),
            model : 0,
            pageSize : 10,
            currentPage:1,
            pageCount : true,
            freeze : false,
            leftWidth : '900px',
            rightWidth: '1100px',
            waitTime : 15,
            initParam: param,
            url : ctx + 'systemuser/querySystemUserList.do',
            head : [
                {dis:'系统用户标识', name:'sysUserId', checked:true,width:'1%',align:'left',freeze:true},
                {dis:'本地网', name:'latnName',width:'3%',align:'left',freeze:true},
                {dis:'工号', name:'sysUserCode',width:'3%',align:'left',freeze:true},
                {dis:'员工姓名', name:'staffName',width:'3%',align:'left',freeze:true},
                {dis:'用户状态', name:'statusCd',width:'2%',align:'left',freeze:true,replace:function(data){
                	if(data.statusCd == '1000'){
                		return "有效";
                	}else if(data.statusCd == '1100'){
                		return "无效";
                	}else{
                		return "冻结";
                	}
                }}
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
    	//var choosedArr = _this.table.getSelRows();
    	var choosedArr = _this.table.getAllSelRows();
        var chooseCount = choosedArr.length;
        if(chooseCount == 0){
        	layer.alert('至少选择一个用户');
        }else{
            var userMaxLength = Dic.Url.getParams('userMaxLength');
            if('-1' != userMaxLength){	//userMaxLength == -1代表选择用户数没有限制
            	if(userMaxLength && chooseCount > userMaxLength){
            		layer.alert("至多只能选择["+userMaxLength+"]个用户");
                    return;
                }
            }
            
            var chooseUsers = [];
            for (var i=0;i<choosedArr.length; i++) {
            	var chooseUser = {
            			sysUserId: choosedArr[i].sysUserId,
                        staffName: choosedArr[i].staffName,
                        sysUserCode: choosedArr[i].sysUserCode
                    };
            	chooseUsers.push(chooseUser);
            }
            
            //返回参数
            parent.getChildIframeUserData(chooseUsers);
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
    };
};

var chooseSystemUser = new ChooseSystemUser();

$(document).ready(function () {
	chooseSystemUser.init();
});