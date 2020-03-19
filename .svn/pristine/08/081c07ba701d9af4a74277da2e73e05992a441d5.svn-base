var Head = document.getElementsByTagName('head')[0], style = document.createElement('style');
var hostname = location.hostname;
var port = location.port;
var ctxStart = "http://"+hostname+":"+port;
// 157测试服务接口地址
var ctx = ctxStart+'/channel-serve-rest/';
var web_ctx = ctxStart+'/channel-web/';
var systemLocal="sx";
// 文件全部加载完成显示DOM
function getRootPath() {
	// 获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.jsp
	var curWwwPath = window.document.location.href;
	// 获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
	var pathName = window.document.location.pathname;
	var pos = curWwwPath.indexOf(pathName);
	// 获取主机地址，如： http://localhost:8083
	var localhostPaht = curWwwPath.substring(0, pos);
	// 获取带"/"的项目名，如：/uimcardprj
/*	var projectName = pathName
			.substring(0, pathName.substr(1).indexOf('/') + 1);*/
	var projectName = "/channel-web";
	return (localhostPaht + projectName);
}
var rootPath = getRootPath();
function linkScriptDOMLoaded(parm) {
	style.innerHTML = 'body{display:none}';// 动态加载文件造成样式表渲染变慢，为了防止DOM结构在样式表渲染完成前显示造成抖动，先隐藏body，样式表读完再显示
	Head.insertBefore(style, Head.firstChild);
	var linkScript, linckScriptCount = parm.length, currentIndex = 0;
	for (var i = 0; i < parm.length; i++) {
		if (/\.css[^\.]*$/.test(parm[i])) {
			if (!parm[i] || parm[i].length === 0) {
				throw new Error('argument "path" is required !');
			}
			linkScript = document.createElement("link");
			linkScript.type = "text/" + ("css");
			linkScript.rel = "stylesheet";
			if (parm[i].indexOf("?") > 0) {
				linkScript.href = rootPath + parm[i] + "&t="
						+ (new Date()).getTime().toString();
			} else {
				linkScript.href = rootPath + parm[i] + "?t="
						+ (new Date()).getTime().toString();
			}
		} else {
			if (!parm[i] || parm[i].length === 0) {
				throw new Error('argument "path" is required !');
			}
			linkScript = document.createElement("script");
			linkScript.type = "text/" + ("javascript");
			if (parm[i].indexOf("?") > 0) {
				linkScript.src = rootPath + parm[i] + "&t="
						+ (new Date()).getTime().toString();
			} else {
				linkScript.src = rootPath + parm[i] + "?t="
						+ (new Date()).getTime().toString();
			}
		}
		linkScript.async = false;
		Head.insertBefore(linkScript, Head.lastChild);
		linkScript.onload = linkScript.onerror = function() {
			currentIndex++;
			if (linckScriptCount == currentIndex) {
				style.innerHTML = 'body{display:block}';
				Head.insertBefore(style, Head.lastChild);
			}
		};
	}
}
var dynamicLoadingTable = {
	/**删除table页*/
	deleteTable : function(name){
			var parentPanel = parent.parent.indexMenu;
			parentPanel.panelFrame.deleteLiFun(name);
	},
	/**添加tab*/
	addTable : function(name,url) {
		var parentPanel = parent.parent.indexMenu;
			var name = name;
			var url = url;
			// STEP-1.1 增加新的panel并显示等操作
			if(parentPanel.panelFrame.getLiLength() >= 12) {	// table page max is 8 .
					art.dialog.message('warning',"已超过12个标签页",null);
					return;
			} else {
					var liDataLength = parentPanel.panelFrame.getLiDataLength();
					var frameIndex = liDataLength == 0 ? 0 : liDataLength ;
					// STEP-2 动态增加mainFrame
					parentPanel.mainDiv.append('<iframe id="mainFrm' +frameIndex+ '" name="mainFrm' +frameIndex+ '" frameborder="0" scrolling="auto" style="display: none;"></iframe>');
					// STEP-3 动态增加mainFrame的样式
					parentPanel.setMainFrmLayout(frameIndex);
					// STEP-4 添加到panel table 中
					var panelIndex = parentPanel.panelFrame.addLiFun({
							title : name ,
							content : parentPanel.mainDiv.find('#mainFrm' + frameIndex ) ,
							url : url ,
							closeable : true
					});
					// STEP-5 最后展示这个刚刚添加的panel page
					parentPanel.panelFrame.showLiFun(panelIndex);
			}
	}
}

/*//跳转登录页
$.ajaxSetup({
    //设置ajax请求结束后的执行动作  
    complete : function(XMLHttpRequest, textStatus) {
    try{
     	var resText = XMLHttpRequest.responseText;  
     	if(resText.indexOf("cas-login") != -1) {
     		window.location.href="http://192.1.17.36:2010/sso";
     		return;
     	}
    	var obj=$.parseJSON(resText);
        if(obj && obj.flag=='FAIL' && obj.exceptionHandler=='1'){
        	alert('error', obj.msg);
        }
     }catch(e){
     }
   }
});
*/