/**
 *泛渠道关系配置
 * @constructor
 */
var AddGeneralChanenl = function () {
	var _this = null;
	this.id = null;
    /*
    *初始化
    */
    this.init = function () {
    	_this = this;
    	this.id = Dic.Url.getParams('id');
    	this.initGeneralChannel();
        this.bind();
    } 
    
    /*
     * 添加事件
     */
    this.bind = function(){
    	$("#chooseGeneralChanenlBtn").click(function(){
    		addGeneralChanenl.chooseGeneralChanenl();
 		});
		
		$("#saveBtn").click(function(){
			addGeneralChanenl.saveGeneralChanenls();
		});
		
		$("#cancelBtn").click(function(){
			parent.layer.closeAll();
 		});
    }
    
	this.initGeneralChannel = function() {
		var params = {
			id: addGeneralChanenl.id
		};

		$.ajax({
			cache: false,
			async: false,
			type: "POST",
			dataType: 'json',
			url : ctx + "marketActvity/findById.do",
			data: params,
			timeout: 600000,
			success: function(data) {
				if (data.generalChannels) {
					var html = "";
					for (var i = 0; i < data.generalChannels.length; i++) {
						var item = data.generalChannels[i];
						var $tr = $('<tr class="generalChannelItem">'+$("#generalChannelTemp").html()+'</tr>');
						$tr.find('.latnName').html(item.regionName);
						$tr.find('.channelName').html(item.channelName);
						$tr.find('.generalChannelName').html(item.name);
						$tr.find('.generalChannelName').attr('generalChannelId', item.id);
						$tr.find('.generalChannelCode').html(item.code);
						
						$tr.find('.delGeneralChannel').bind('click', function(){
							$(this).parent().parent().remove();
						});
						
						$("#generalChannelTbody").append($tr);
					}
				}
			}
		});
	};
    
	this.chooseGeneralChanenl = function(){
		var activityChannels = addGeneralChanenl.getGeneralChanenls();
		var genernalChannelIds = [];
		
		for(var i=0;i<activityChannels.length;i++) {
			genernalChannelIds.push(activityChannels[i].generalChannelId);
		}
		
        var url = web_ctx+'/html/generalchannel/chooseGeneralChannelPage.html';
		var param = "?unGenernalChannelIds="+genernalChannelIds;
		
		layer.open({
			  title: '选择泛渠道单元',
			  type: 2,
			  area: ['700px', '380px'],
			  skin: 'layui-layer-rim', //加上边框
			  content : url + param
		});
	};
	
	this.getGeneralChanenls = function(){
		var activityChannels = new Array();
		$('#generalChannelTbody tr.generalChannelItem').each(function(i){
			var activityChannel = {
					marketActivityId :addGeneralChanenl.id,
					generalChannelId :$(this).find('.generalChannelName').attr('generalChannelId')
				}
			
			activityChannels.push(activityChannel);
		});
		return activityChannels;
	};
	
	this.saveGeneralChanenls = function() {
		
		if (addGeneralChanenl.getGeneralChanenls().length < 1) {
			layer.alert("提交数据为空，不能提交！", {icon: 7});
        	return;
		}
		
		$.ajax({
			cache: false,
			type: "POST",
			dataType: 'json',
			url: ctx + 'generalChannelActivity/batchAdd.do',
			data: {jsonStr:JSON.stringify(addGeneralChanenl.getGeneralChanenls())},
			timeout: 600000,
			success: function(data) {
				if (data != null) {
					if (data.flag == 'SUCCESS') {
						layer.alert(data.msg, function(index) {
					    	layer.close(index);
						});
						
						$("#saveBtn").hide();
					} else {
						layer.alert(data.msg);
					}
				}
			},
			error: function() {
				layer.alert('新增泛渠道单元信息失败');
			}
		});
	}
    
}

function getChildIframeGeneralChannelData(generalChannels) {
	if (generalChannels != null && generalChannels.length != 0) {
		var html = "";
		
		for (var i = 0; i < generalChannels.length; i++) {
			var item = generalChannels[i];
			var $tr = $('<tr class="generalChannelItem">'+$("#generalChannelTemp").html()+'</tr>');
			$tr.find('.latnName').html(item.regionName);
			$tr.find('.channelName').html(item.channelName);
			$tr.find('.generalChannelName').html(item.name);
			$tr.find('.generalChannelName').attr('generalChannelId', item.id);
			$tr.find('.generalChannelCode').html(item.code);
			
			$tr.find('.delGeneralChannel').bind('click', function(){
				$(this).parent().parent().remove();
			});
			
			$("#generalChannelTbody").append($tr);
		}
	}
};

var addGeneralChanenl = new AddGeneralChanenl();

$(document).ready(function () {
	addGeneralChanenl.init();
});
