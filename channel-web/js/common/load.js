(function(doc){
	
	var loadCssList = [
		"../../../resource/plugins/bootstrap/css/bootstrap.css",
		"../../../resource/css/common.css"
	];
	
	var loadJsList = [
		"../../../resource/js/jquery-1.10.2.min.js",
		"../../../resource/js/jquery.i18n.properties-1.0.9.js",
		"../../../js/common/basic.js",
		"../../../resource/js/esmp_base.js",
		"../../../resource/js/commonBase.js",
		"../../../js/common/url.js",
		"../../../resource/js/taglib.js",
		"../../../resource/js/tydic/base_v1.js",
		"../../../resource/js/tydic/jquery-browser.js",
		"../../../resource/js/tydic/tydic_dev.js",
		"../../../resource/js/tydic/json2.js",
		"../../../resource/layer/layer.js"
	];
	
	var jsHtml = [];
	
	for(var i=0; i<loadCssList.length; i++ ){
		jsHtml.push('<link rel="stylesheet" type="text/css" href="'+loadCssList[i]+'">')
	}
	
	for(var i=0; i<loadJsList.length; i++ ){
		jsHtml.push('<script type="text/javascript" src="'+loadJsList[i]+'"></script>')
	}
	
	doc.write(jsHtml.join(""));
	
})(document);