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
    this.qrcodeUrl = null;
    this.generalChannelName = null;
    /*
    *初始化
    */
    this.init = function () {
        _this = this;
        this.id = Dic.Url.getParams('id');
        this.initGeneralChannel();
        this.initQrcode();
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
					
					$("#channelName").text(generalChannelDetail.processUndefined(data.channelName));
					$("#code").text(generalChannelDetail.processUndefined(data.code));
					$("#name").text(generalChannelDetail.processUndefined(data.name));
					$("#imaName").text(generalChannelDetail.processUndefined(data.name));
					$("#imaCode").text(generalChannelDetail.processUndefined(data.code));
					
					$("#phone").text(generalChannelDetail.processUndefined(data.phone));
					
					$("#firstFormatName").text(generalChannelDetail.processUndefined(data.firstFormatName));
					$("#secondFormatName").text(generalChannelDetail.processUndefined(data.secondFormatName));
					
					$("#staffName").text(generalChannelDetail.processUndefined(data.staffName));
					$("#statusCdName").text(generalChannelDetail.getStatusCdName(data.statusCd));
					//$("#beginDate").text(data.beginDate.substring(0, 10));
					//$("#endDate").text(data.endDate.substring(0, 10));
					$("#typeName").text(data.type == "10" ? "店" : data.type == "20" ? "人" : "");
					$("#addr").text(generalChannelDetail.processUndefined(data.addr));
					$("#remark").text(data.remark == null ? "" : data.remark);
					
					$("#specializedTeamsName").text(data.specializedTeamsName == null ? "" : data.specializedTeamsName);
					$("#regionName").text(data.regionName == null ? "" : data.regionName);
					$("#childRegionName").text(data.childRegionName == null ? "" : data.childRegionName);
					$("#townName").text(data.townName == null ? "" : data.townName);
					$("#villageName").text(data.villageName == null ? "" : data.villageName);
					
					$("#shopCode").text(data.shopCode == null ? "" : data.shopCode);
					$("#ifShop").text(data.ifShop == "1" ? "是" : data.ifShop == "0" ? "否" : "");
					$("#createDate").text(generalChannelDetail.processUndefined(data.createDate));
					$("#staffName").text(generalChannelDetail.processUndefined(data.staffName));
					$("#createStaffName").text(generalChannelDetail.processUndefined(data.createStaffName));
					
					generalChannelDetail.name = data.name;
					generalChannelDetail.code = data.code;
					generalChannelDetail.url = "";
					generalChannelDetail.qrcodeUrl = data.qrcodeUrl;
				}
			}
		});	
    };
    
    this.getStatusCdName = function(type) {
    	if (type == '10'){
    		return "未生效";
    	} else if (type == '20') {
    		return "在用";
    	} else if (type == '30') {
    		return "冻结";
    	} else if (type == '40') {
    		return "失效";
    	} else {
    		return "";
    	}
    }
    
    this.initQrcode = function() {
    	$('#qrcodeDiv').qrcode({
				render: !!document.createElement('canvas').getContext ? 'canvas' : 'table', //为了支持ie8及以下
				text: generalChannelDetail.qrcodeUrl,		
				correctLevel : 0,//纠错等级 
				typeNumber : -1,      //计算模式    	
				width: 250,
			    height: 240
		});
    };
    
    this.bind = function(){
    	
    	$("#detail input").prop("disabled", true);
    	$("#versionConfigAddForm select").prop("disabled", true);
    	$("#detail textarea").prop("disabled", true);
        
        $("#cancel").click(function(){
        	parent.layer.closeAll();
        });
        
        $("#downloadImg").click(function(){
        	generalChannelDetail.downloadForJS();
        });
    };
    
    this.downloadForJS =function() {
        //使用html2canvas 转换html为canvas
        html2canvas(document.getElementById('imgDiv')).then(function (canvas) {
            var imgUri = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"); // 获取生成的图片的url 　
            var saveLink = document.createElement('a');
            saveLink.href = imgUri;
            saveLink.download = generalChannelDetail.name + '.png';
            saveLink.click();
        });
    };
    
    /**
     * [处理空对象]
     * @param  {[type]} tempData [对象]
     * @return {[type]}     
     */
    this.processUndefined = function (tempData) {
        if(tempData == null){
            tempData = "";
        }
        return tempData == undefined ? "" : tempData;
    }
    
};

var generalChannelDetail = new GeneralChannelDetail();

$(document).ready(function () {
	generalChannelDetail.init();
});