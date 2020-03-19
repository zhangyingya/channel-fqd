/**
 * 营销活动-修改
 * @constructor
 */
var MarketActivityUpdate = function () {
    var _this = null;
    var table = null;
    this.phonePattern=/^[1][3,4,5,7,8][0-9]{9}$/;
    this.id = null;
    /*
    *初始化
    */
    this.init = function () {
        _this = this;
       
        this.id = Dic.Url.getParams('id');
        this.initMarketActivity();
        this.bind();
    };
    
    this.initMarketActivity = function() {
    	$.ajax({
	 		async : false,
			cache : false,
			type : 'POST',
			url : ctx + "marketActvity/findById.do",
			dataType : 'json',
			data : {id: marketActivityUpdate.id},
			success : function(data) {
				if(!Dic.isNull(data)){
					$("#name").val(data.name);
					$("#type").val(data.type);
					$("#url").val(data.url);
					$("#origin").val(data.origin);
					$("#statusCd").val(data.statusCd);
					$("#url").val(data.url);
					$("#description").val(data.description);
				}
			}
		});	
    };
    
    this.bind = function(){
        $("#updateMarketActivity").click(function(){
        	_this.updateMarketActivity();
        });
        
        $("#cancel").click(function(){
        	parent.layer.closeAll();
        });
        
        new Tablib().init({
	         operationDiv : $('#statusCdUl'),
	         tagData : eval("[{'codeVal':'','codeName':'全部'},{'codeVal':'1000','codeName':'有效'}," +
	         				"{'codeVal':'1100','codeName':'无效'}]")
	    });
       
       new Tablib().init({
	         operationDiv : $('#typeUl'),
	         tagData : eval("[{'codeVal':'','codeName':'全部'},{'codeVal':'10','codeName':'广告营销'}," +
	         				"{'codeVal':'20','codeName':'活动推广'}]")
	    });
    };
    
    
    this.updateMarketActivity = function() {
    	
        var name = $("#name").val();
        if (Dic.isNull(name)) {
        	layer.alert("请输入营销活动名称！", {icon: 7});
        	return;
        }
        
        var type = $("#type").val();
        if (Dic.isNull(type)) {
        	layer.alert("请输入营销活动类型！", {icon: 7});
        	return;
        }
        
        var origin = $("#origin").val();
        if (Dic.isNull(origin)) {
        	layer.alert("请输入营销活动业务系统来源！", {icon: 7});
        	return;
        }
        
        var url = $("#url").val();
        if (Dic.isNull(url)) {
        	layer.alert("请输入营销活动URL！", {icon: 7});
        	return;
        }
        
        
        var param = new Object();
    	
    	param = {
    			"id":marketActivityUpdate.id,
        		"name":name,
        		"type":type,
        		"origin":origin,
        		"url":url,
        		"statusCd":$("#statusCd").val(),
        		"description":$("#description").val()
        };
    	
    	marketActivityUpdate.toAdd(param);
    	
    };
    
    this.toAdd = function(param) {
    	$.ajax({
			cache:false,
			type:"POST",
			async:false,
			dataType: "json", 
			contentType:"application/json;charset=UTF-8",
		    data: JSON.stringify(param),
		    url : ctx + "marketActvity/update.do",
	    	success:function(data){
				if(data != null){
					if (data.flag == 'SUCCESS') {
						layer.alert(data.msg, function(index) {
							//关闭后的操作
					    	parent.layer.closeAll();
					    	parent.marketActivityList.initTable();
						});
					} else {
						layer.alert(data.msg);
					}
				}
			},
			error: function(){
				layer.alert(data.msg);
			}
		});
    }
};

var marketActivityUpdate = new MarketActivityUpdate();

$(document).ready(function () {
	marketActivityUpdate.init();
});