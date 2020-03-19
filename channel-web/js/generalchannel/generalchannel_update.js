/**
 * 版本管控-添加
 * @constructor
 */
var GeneralChannelUpdate = function () {
    var _this = null;
    var table = null;
    this.phonePattern=/^0?(13|14|15|17|18|19)[0-9]{9}$/;
    this.regu = /^[1-9]\d*$/;
    this.id = null;
    this.specializedTeamsName = null;
    /*
    *初始化
    */
    this.init = function () {
        _this = this;
        this.id = Dic.Url.getParams('id');
        this.initGeneralChannel();
        this.initFirstFormat();
        this.bind();
    };
    
    this.initGeneralChannel = function() {
    	
    	$.ajax({
		 		async : false,
			cache : false,
			type : 'POST',
			url : ctx + "generalChannel/findById.do",
			dataType : 'json',
			data : {id: this.id},
			success : function(data) {
				if(!Dic.isNull(data)){
					$("#commonRegionId").val(data.commonRegionId);
					$("#channelId").val(data.channelId);
					$("#channelNbr").val(data.channelNbr);
					$("#channelName").val(data.channelName);
					if (Dic.isNull(data.code) && !Dic.isNull(data.channelNbr) ) {
						generalChannelUpdate.getCode(data.channelNbr);
					} else {
						$("#code").val(data.code);
					}
					
					$("#name").val(data.name);
					$("#phone").val(data.phone);
					
					$("#firstFormat").val(data.firstFormatId);
					$("#firstFormatName").val(data.firstFormatName);
					$("#secondFormat").val(data.format);
					$("#secondFormatName").val(data.secondFormatName);
					
					if ("1" == data.ifShop) {
						$("#isShop_1").attr("checked","true");
						$("#isShopTh").show();
						$("#isShopTd").show();
						
						$("#blankTh").hide();
						$("#blankTd").hide();
						
					} else {
						$("#isShop_0").attr("checked","true");
						$("#isShopTh").hide();
						$("#isShopTd").hide();
						
						$("#blankTh").show();
						$("#blankTd").show();
					}
					$("#shopCode").val(data.shopCode);
					$("#salesCode").val(data.salesCode);
					$("#staffName").val(data.staffName);
					$("#statusCd").val(data.statusCd);
					//$("#beginDate").val(data.beginDate.substring(0, 10));
					//$("#endDate").val(data.endDate.substring(0, 10));
					$("#type").val(data.type);
					$("#addr").val(data.addr);
					$("#remark").val(data.remark);
					
					if (!Dic.isNull(data.townName)) {
    					$("#showVillageName").show();
    					$("#townName").val(data.townName);
    					$("#villageName").val(data.villageName);
    					//$("#townName").val(data.villageName.substr(0, data.villageName.indexOf("-")));
    					//$("#villageName").val(data.villageName.substr(data.villageName.indexOf("-")+1));
					}
					
					if (!Dic.isNull(data.specializedTeamsName) && data.specializedTeamsName.indexOf("农村") != -1) {
						generalChannelUpdate.specializedTeamsName = data.specializedTeamsName;
					} else {
						generalChannelUpdate.specializedTeamsName = null;
					}
				}
			}
		});	
    };
    
    this.bind = function(){
    	
    	$(document).on("click",".isShop",function(){
    		var isShop = $("input[name='isShop']:checked").val();
    		
    		if (isShop == "1") {
    			$("#isShopTh").show();
    			$("#isShopTd").show();
    			
    			$("#blankTh").hide();
				$("#blankTd").hide();
    		} else {
    			if (!Dic.isNull($("#shopCode").val())) {
    				layer.confirm('确定设置翼支付商户号为空吗？', {
      				  btn: ['确定', '取消'] //可以无限个按钮
      				  ,
      				}, function(index, layero){
      					$("#shopCode").val('');
      					$("#isShopTh").hide();
      					$("#isShopTd").hide();
      					
      					$("#blankTh").show();
						$("#blankTd").show();
              			
              			layer.close(index);
      				}, function(index){
      					$("#isShop_1").attr("checked","true");
      					$("#isShopTh").show();
      					$("#isShopTd").show();
      					
      					$("#blankTh").hide();
						$("#blankTd").hide();
              			
              			layer.close(index);
      				});
    			} else {
    				$("#isShopTh").show();
    				$("#isShopTd").show();
    				
    				$("#blankTh").hide();
					$("#blankTd").hide();
    				
    			}
    		}
    	});
    	
    	$("#firstFormatUl").on("click","li",function(){
   		 	$("#firstFormatName").val($(this).attr("tValue"));
   		 	$("#firstFormat").val($(this).attr("key"));
   		 	
   		 	var firstFormatId = $("#firstFormat").val();
   		 	if (!Dic.isNull(firstFormatId)) {
   		 		generalChannelUpdate.initSecondFormat(firstFormatId);
   		 	} else {
   		 		$("#secondFormatUl").find("li").remove(); 
   		 	}
   	 	});
    	
    	$("#secondFormatUl").on("click","li",function(){
   		 	$("#secondFormatName").val($(this).attr("tValue"));
   		 	$("#secondFormat").val($(this).attr("key"));
   	 	});
    	
        $("#addGeneralChannel").click(function(){
        	_this.addGeneralchannel();
        });
        
        $("#cancel").click(function(){
        	parent.layer.closeAll();
        });
        
        $("#phone").change(function() {
        	if (generalChannelUpdate.isExistPhone($("#phone").val())) {
        		$("#phone").val("");
        		layer.alert('手机号码重复！', {icon: 2}); 
        	}
        });
        
        $("#updateCode").click(function(){
        	var channelNbr = $("#channelNbr").val();
        	if (Dic.isNull(channelNbr)) {
        		layer.alert("请先选择结对渠道信息！");
        		return;
        	}
        });
        
        
        $("#channelName").click(function(){
            var url = web_ctx+'/html/choosePage/chooseChannelPage.html';
            var param = "?userMaxLength=1";
            
            layer.open({
	   			  title: '选择结对渠道',
	   			  type: 2,
	   			  area: ['800px', '480px'],
	   			  skin: 'layui-layer-rim', //加上边框
	   			  content : url + param
            });
        });
        
        $("#villageName").click(function(){
        	var specializedTeamsName = generalChannelUpdate.specializedTeamsName;
        	
        	if (Dic.isNull(specializedTeamsName)) {
        		return;
        	}
        	
        	if (Dic.isNull($("#townName").val())) {
        		layer.alert("请先选择城镇信息！");
        		return;
        	}
        	
            var url = web_ctx+'/html/choosePage/chooseVillagePage.html';
            var param = "?userMaxLength=1&latnId="+$("#commonRegionId").val()+"&townName="+encodeURI($("#townName").val());
            
            layer.open({
	   			  title: '选择行政村信息',
	   			  type: 2,
	   			  area: ['800px', '480px'],
	   			  skin: 'layui-layer-rim', //加上边框
	   			  content : url + param
            });
        });
        
        $("#townName").click(function(){
        	var specializedTeamsName = generalChannelUpdate.specializedTeamsName;
        	
        	if (Dic.isNull(specializedTeamsName)) {
        		return;
        	}
        	
            var url = web_ctx+'/html/choosePage/chooseTownPage.html';
            var param = "?userMaxLength=1&latnId="+$("#commonRegionId").val();
            
            layer.open({
	   			  title: '选择城镇信息',
	   			  type: 2,
	   			  area: ['800px', '480px'],
	   			  skin: 'layui-layer-rim', //加上边框
	   			  content : url + param
            });
        });
        
        $("#staffName").click(function(){
        	var channelId = $("#channelId").val();
        	
        	if (Dic.isNull(channelId)) {
        		layer.alert("请先选择结对渠道信息！");
        		return;
        	}
        	
            var url = web_ctx+'/html/generalchannel/chooseStaffPage.html';
            var param = "?userMaxLength=1&channelId="+channelId;
            
            layer.open({
	   			  title: '选择泛渠道负责人',
	   			  type: 2,
	   			  area: ['800px', '480px'],
	   			  skin: 'layui-layer-rim', //加上边框
	   			  content : url + param
            });
        });
        
       /* new Tablib().init({
	         operationDiv : $('#typeUl'),
	         tagData : eval("[{'codeVal':'','codeName':'全部'},{'codeVal':'10','codeName':'店'}," +
	         				"{'codeVal':'20','codeName':'人'}]")
	    });*/
       
        new Tablib().init({
	         operationDiv : $('#statusCdUl'),
	         tagData : eval("[{'codeVal':'','codeName':'全部'},{'codeVal':'10','codeName':'未生效'}," +
     				"{'codeVal':'20','codeName':'在用'},{'codeVal':'30','codeName':'冻结'}," +
     				"{'codeVal':'40','codeName':'失效'}]")
	    });
    };
    
	this.getCode = function(channelNbr) {
    	
    	//code = "G" + channelNbr.substring(0, 6) + (Math.floor(Math.random()*99999) + 800000);
    	
    	$.ajax({
 		 	async : false,
				cache : false,
				type : 'POST',
				url : ctx + "generalChannel/getGeneralChannelCode.do",
				dataType : 'json',
				data : {channelNbr : channelNbr},
				timeout : 10000,
				success : function(data) {
					if(!Dic.isNull(data)){
						$("#code").val(data.code);
					}
				},
				error: function(){
					layer.alert("获取泛渠道权限编码失败！");
				}
		 });
    };
    
    this.isExistPhone = function(phone) {
    	$.ajax({
 		 	async : false,
				cache : false,
				type : 'POST',
				url : ctx + "generalChannel/isExistTelePhone.do",
				dataType : 'json',
				data : {phone : $("#phone").val()},
				timeout : 10000,
				success : function(data) {
					if(!Dic.isNull(data) && data.isExist == true){
						$("#phone").val("");
		        		layer.alert('手机号码重复！', {icon: 2}); 
					}
				},
				error: function(){
					layer.alert("验证手机号码唯一性失败！");
				}
		 });
    	
    };
    
    this.initFirstFormat = function() {
    	$("#firstFormatUl").find("li").remove(); 
    	
    	$.ajax({
 		 	async : false,
				cache : false,
				type : 'POST',
				url : ctx + "generalChannelFormat/findAllByTop.do",
				dataType : 'json',
				timeout : 10000,
				success : function(data) {
					if(!Dic.isNull(data)){
						var appInfoHTML = "";
							appInfoHTML +='<li key="" tValue="全部" style="width:100%;"><a>'+"全部"+'</a></li>';
						
						for(var i =0 ;i<data.length;i++){
							var item = data[i];
							
							appInfoHTML += '<li key="'+item.code+'" tValue="'+item.name+'" style="width:100%;"><a>'+item.name+'</a></li>';
						}
						
						$("#firstFormatUl").append(appInfoHTML);
						
						//$("#firstFormatName").val("全部");
					}
				}
		 });
    };
    
    this.initSecondFormat = function(firstFormatId) {
    	$("#secondFormatUl").find("li").remove(); 
    	
    	$.ajax({
 		 	async : false,
				cache : false,
				type : 'POST',
				url : ctx + "generalChannelFormat/findAllByParId.do",
				dataType : 'json',
				data : {parId :firstFormatId },
				timeout : 10000,
				success : function(data) {
					if(!Dic.isNull(data)){
						var appInfoHTML = "";
							appInfoHTML +='<li key="" tValue="全部" style="width:100%;"><a>'+"全部"+'</a></li>';
						
						for(var i =0 ;i<data.length;i++){
							var item = data[i];
							
							appInfoHTML += '<li key="'+item.code+'" tValue="'+item.name+'" style="width:100%;"><a>'+item.name+'</a></li>';
						}
						
						$("#secondFormatUl").append(appInfoHTML);
						
						$("#secondFormatName").val("全部");
					}
				}
		 });
    };
    
    
    this.addGeneralchannel = function() {
        var channelNbr = $("#channelNbr").val();
        if (Dic.isNull(channelNbr)) {
        	layer.alert('请输入结对渠道信息！', {icon: 7});
        	return;
        }
        
        var salesCode = $("#salesCode").val();
        if (Dic.isNull(salesCode)) {
        	layer.alert("请输入结对渠道管控人员信息！", {icon: 7});
        	return;
        }
        
        var name = $("#name").val();
        if (Dic.isNull(name)) {
        	layer.alert("请输入泛渠道单元名称！", {icon: 7});
        	return;
        }
        
        var type = "10";
        /*if (Dic.isNull(type)) {
        	layer.alert("请输入泛渠道单元类型！", {icon: 7});
        	return;
        }*/
        
        var firstFormat = $("#firstFormat").val();
        if (Dic.isNull(firstFormat)) {
        	layer.alert("请输入泛渠道单元一级业态信息！", {icon: 7});
        	return;
        }
        
        var format = $("#secondFormat").val();
        if (Dic.isNull(format)) {
        	layer.alert("请输入泛渠道单元二级业态信息！", {icon: 7});
        	return;
        }
        
        var phone = $("#phone").val();
        if (Dic.isNull(phone)) {
        	layer.alert("请输入泛渠道单元负责人电话信息！", {icon: 7});
        	return;
        }
        
        if(!this.phonePattern.test(phone)){
			layer.alert("手机号码格式不正确!");
  			return;
  		}	
        
        var addr = $("#addr").val();
        if (Dic.isNull(addr)) {
        	layer.alert("请输入泛渠道单元地址信息！", {icon: 7});
        	return;
        }
        
        var statusCd = $("#statusCd").val();
        if (Dic.isNull(statusCd)) {
        	layer.alert("请输入泛渠道单元状态信息！", {icon: 7});
        	return;
        }
        
        var isShop = $("input[name='isShop']:checked").val();
        var shopCode = $("#shopCode").val();
        if (isShop == '1' && Dic.isNull($("#shopCode").val())) {
        	layer.alert("请输入翼支付商户信息！", {icon: 7});
        	return;
        }
        
        if (isShop == "0") {
        	shopCode = "";
        }
        
        var townName = $("#townName").val();
        if (!Dic.isNull(generalChannelUpdate.specializedTeamsName)) {
        	if (Dic.isNull(townName)) {
            	layer.alert("请选择城镇信息！", {icon: 7});
            	return;
            }
        }
        
        var villageName = $("#villageName").val();
        /*if (!Dic.isNull(generalChannelUpdate.specializedTeamsName)) {
        	if (Dic.isNull(villageName)) {
            	layer.alert("请选择行政村属性！", {icon: 7});
            	return;
            }
        }*/
        
        var param = new Object();
    	
    	param = {
    			"id": this.id,
    			"channelNbr":channelNbr,
        		"name":name,
        		"code":$("#code").val(),
        		"type":type,
        		"format":format,
        		"salesCode":salesCode,
        		"phone":phone,
        		"addr":addr,
        		"statusCd":statusCd,
        		//"beginDateStr":$("#beginDate").val(),
        		//"endDateStr":$("#endDate").val(),
        		"commonRegionId":$("#commonRegionId").val(),
        		"remark":$("#remark").val(),
        		"lonY":"-1",
        		"latX":"-1",
        		"shopCode":shopCode,
        		"ifShop" : isShop,
        		"villageName" : villageName,
        		"townName" : townName
        };
    	
    	generalChannelUpdate.toAdd(param);
    	
    };
    
    this.toAdd = function(param) {
    	$.ajax({
			cache:false,
			type:"POST",
			async:false,
			dataType: "json", 
			contentType:"application/json;charset=UTF-8",
		    data: JSON.stringify(param),
		    url : ctx + "generalChannel/update.do",
	    	success:function(data){
				if(data != null){
					if (data.flag == 'SUCCESS') {
						layer.alert(data.msg, function(index) {
							//关闭后的操作
					    	parent.layer.closeAll();
					    	parent.generalChannelList.initTable();
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

function getChildIframeChannelData(chooseChannels) {
	if (chooseChannels != null && chooseChannels.length != 0) {
		
		$("#channelId").val(chooseChannels[0].channelId);
		$("#channelName").val(chooseChannels[0].channelName);
		$("#channelNbr").val(chooseChannels[0].channelNbr);
		$("#commonRegionId").val(chooseChannels[0].latnId);
	}
	
	//泛渠道编码生成之后，不能修改
	//generalChannelUpdate.getCode(chooseChannels[0].channelNbr);
	generalChannelUpdate.specializedTeamsName = chooseChannels[0].specializedTeamsName;
	
	if (!Dic.isNull(generalChannelUpdate.specializedTeamsName) && generalChannelUpdate.specializedTeamsName.indexOf("农村") != -1) {
		$("#showVillageName").show();
	} else {
		$("#showVillageName").hide();
		generalChannelUpdate.specializedTeamsName = null;
	}
	
	$("#salesCode").val("");
	$("#staffName").val("");
	$("#villageName").val("");
	$("#townName").val("")
};

function getChildIframeSalesCodeData(chooseStaffs) {
	if (chooseStaffs != null && chooseStaffs.length != 0) {
		
		$("#staffName").val(chooseStaffs[0].staffName);
		$("#salesCode").val(chooseStaffs[0].salesCode);
	}
};

//获取城镇信息
function getChildIframeTownData(chooseVillages) {
	if (chooseVillages != null && chooseVillages.length != 0) {
		
		$("#townName").val(chooseVillages[0].townName);
		$("#villageName").val("");
	}
};

//获取农村信息
function getChildIframeVillageData(chooseVillages) {
	if (chooseVillages != null && chooseVillages.length != 0) {
		
		$("#villageName").val(chooseVillages[0].villageName);
	}
};

var generalChannelUpdate = new GeneralChannelUpdate();

$(document).ready(function () {
	generalChannelUpdate.init();
});