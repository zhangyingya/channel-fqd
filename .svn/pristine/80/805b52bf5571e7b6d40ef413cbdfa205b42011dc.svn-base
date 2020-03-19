/**
 * 可视化分析报表
 * @constructor
 */
var Report = function() {
	var table = null;
	var _this = null;
    
    this.init = function () {
    	 _this = this;
    	 this.initIframe();
    	 this.bind();
    };
    
    this.bind = function(){
    	
    	$.starFold("#starFold3", "fast", 1, "click");
    	$("#testSimpleTab").simpleTab();
    	
    	$('#checkTitle').find('li').bind('click',function(){
			_this.initIframe();
		});
        
    };
    
    this.initIframe = function() {
    	//1、清空历史信息
        $("#divIframe").empty();
        //2、获取iframe Url
        var iframeUrl = "";
        var liId = $('#checkTitle').find('li[class=selected]').attr('id');
        
        if (liId == "guiReport") {
        	iframeUrl = "../../html/generalchannel/guiReport.html";
        } else if (liId == "generalChannelReport") {
        	iframeUrl = "../../html/generalchannel/generalChannelReport.html";
        } else if (liId == "busineseBillReport") {
        	iframeUrl = "../../html/generalchannel/guiReport.html";
        } else if (liId == "allReport") {
        	iframeUrl = "../../html/generalchannel/guiReport.html";
        } else {
        	iframeUrl = "../../html/generalchannel/guiReport.html";
        }
        
        //3、跳转iframe
    	$('#divIframe').append('<iframe id="reportFrm" name="reportFrm" src="'+iframeUrl+'" frameborder="0" scrolling="auto" width="100%" height="570px;"></iframe>');
    	//4、设置iframe高度
    	//document.getElementById("divIframe").style.height=document.getElementById("mainFrm0").offsetHeight+ "px";
    };
};

var report = new Report();

$(document).ready(function () {
	report.init();
	report.initIframe();
});