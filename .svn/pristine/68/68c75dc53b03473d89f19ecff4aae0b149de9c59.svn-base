/**
 * 版本管控-添加
 * @constructor
 */
var GeneralChannelDetail = function () {
    var _this = null;
    var table = null;
    this.id = null;
    this.code = null;
    this.name = null;
    this.url = null;
    /*
    *初始化
    */
    this.init = function () {
        _this = this;
        this.id = Dic.Url.getParams('id');
        this.initGeneralChannelActivity();
        this.bind();
    };
    
    this.initGeneralChannelActivity = function() {
    	
    	$.ajax({
	 		async : false,
			cache : false,
			type : 'POST',
			url : ctx + "marketActvity/findById.do",
			dataType : 'json',
			data : {id: generalChannelDetail.id},
			success : function(data) {
				if(!Dic.isNull(data)){
					$("#name").text(data.name);
					$("#type").text(generalChannelDetail.getTypeName(data.type));
					$("#url").text(data.url);
					$("#origin").text(data.origin);
					$("#statusCd").text(data.statusCd == "1000" ? "有效" : data.statusCd == "1100" ? "无效" : "");
					$("#url").text(data.url);
					$("#description").text(data.description);
					
					if(data.generalChannels && data.generalChannels.length > 0){
						for(var i = 0; i< data.generalChannels.length; i++){
							var item = data.generalChannels[i];
							var $tr = $('<tr class="marketActivityItem">'+$('#marketActivityTemp').html()+'</tr>')
							$tr.find('#latnName').html(item.regionName);
							$tr.find('#channelName').html(item.channelName);
							$tr.find('#generalChannelName').html(item.name);
							$tr.find('#generalChannelCode').html(item.code);
							
							$('#marketActivityTable').append($tr);
						}
					}
				}
			}
		});	
    };
    
    this.getTypeName = function(type) {
    	if (type == '10'){
    		return "广告营销";
    	} else if (type == '20') {
    		return "活动推广";
    	} else {
    		return "";
    	}
    };
    
    this.bind = function(){
        
        $("#cancel").click(function(){
        	parent.layer.closeAll();
        });
        
    };
    
};

var generalChannelDetail = new GeneralChannelDetail();

$(document).ready(function () {
	generalChannelDetail.init();
});