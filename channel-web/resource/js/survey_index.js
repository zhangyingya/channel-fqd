/**
 * 首页引入index.js控制ul标签显示隐藏个人和企业资料修改链接。
自定义js实现：根据账户名，提交检出用户类型。根据用户类型 
显示隐藏个人和企业资料修改的ul标签
 */
var roleModuleJson;
var userInfoJson;
var indexPermission = false;
var loadRoleModule = function(moduleJson){
	$.each(moduleJson,function(index,content)
		{ 
				var isPermission  = false;
				if(null != userInfoJson.degree && userInfoJson.degree!=-1){
					$.each(roleModuleJson,function(roleModuleIndex,roleModuleContent){
						if(roleModuleContent.id == content.id){
							isPermission = true;
							return false;
						}
					});
				}else{
					isPermission = true;
				}
				if(isPermission){
					var isChildreen = content.childrenList!=null && content.childrenList!="undefined" &&content.childrenList.length>0;
					$.each(content.childrenList,function(childrenIndex,childrenContent){
						if(childrenContent.action == 1){
							isChildreen = false;
							return false;
						}
					});
					if(content.moduleLevel==1){
						if(content.url=='survey_index.html'){
							$(".service-select .text").html(content.moduleName);
							indexPermission = true;
						}
						var html = '<li><a href="#" url="'+content.url+'" class="'+content.iconClass+'"><span class="a_text">'+content.moduleName+'</span></a></li>';
						$(".topbar-nav-item ul").prepend(html);
						if(content.url=='index.html' || content.url=='system_manager_index.html'){
							return true;
						}
					}else if(content.moduleLevel==2){
						var html = '<li><a href="'+content.url+'" class="'+content.iconClass+'">'+content.moduleName+'</a></li><div name="secondMenu_'+content.id+'" id="secondMenu"><ul></ul></div>'
						$(".leftMenu").children("ul:first").append(html);
					}else if(content.moduleLevel==3){
						if(isChildreen){
							var html = '<li class="secondLi"><a class="secondA" href="#">'+content.moduleName+'</a></li><div name="secondMenu_'+content.id+'" class="thirdMenu"><ul></ul></div>'
							$('div[name="secondMenu_'+content.parentId+'"]').children("ul:first").append(html);
						}else{
							if(content.url=='/html/template/templateVerify.html'){
								if(userInfoJson.degree==-1){
									var html = '<li><a href="#" url="'+content.url+'">'+content.moduleName+'</a></li>'
									$('div[name="secondMenu_'+content.parentId+'"]').children("ul:first").append(html);
								}else{
									var html = '<li style="display:none"><a href="#" url="'+content.url+'">'+content.moduleName+'</a></li>'
									$('div[name="secondMenu_'+content.parentId+'"]').children("ul:first").append(html);
								}
							}else{
								var html = '<li><a href="#" url="'+content.url+'">'+content.moduleName+'</a></li>'
								$('div[name="secondMenu_'+content.parentId+'"]').children("ul:first").append(html);
							}
						}
					}else if(content.moduleLevel==4){
						var html = '<li><a href="#" class="thirdA" url="'+content.url+'">'+content.moduleName+'</a></li>'
						$('div[name="secondMenu_'+content.parentId+'"]').children("ul:first").append(html);
					}
					if(isChildreen){
						loadRoleModule(content.childrenList);
					}
				}
  	});
}

var index = function(){
	var _this={
		init:function(){
			userInfoJson = jQuery.parseJSON(localStorage.getItem('userInfoJson'));
			if(localStorage.getItem('roleModuleJson')==null || localStorage.getItem('roleModuleJson')=='undefined'){
				roleModuleJson =[];
			}else{
				roleModuleJson =  jQuery.parseJSON(localStorage.getItem('roleModuleJson'));
			}
			var url = "/module/getModulesJson.html";
			var param = {moduleId:1};
		    var response = post(url, param);
		    if (response.result == 200) {
		        var data = $.parseJSON(response.data);
		        loadRoleModule(data);
		    } 
		    if(!indexPermission){
		    	$("#rightBody .content").empty();
		    	$("#rightBody .content").html("");
		    	showFaceSmileMsg("尊敬的用户您好：<br>您无任何操作权限，请联系管理员开通相关服务！~");
		    }
		}
	};
	return _this;
}();


$(function(){
	index.init();
});