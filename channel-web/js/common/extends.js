var comm = {
	userInfo:{},
	
	ajax:function(url,param,success,error){
		$.ajax({
			cache : false,
			type : 'POST',
			url : ctx + url + '?' + (new Date()).getTime(),
			dataType : 'json',
			timeout : 10000,
			data : param, 
			success : function(data) {
				success(data);
			},
			error : function(data){
				error(data);
			}
		});
	},
		
	ajaxFalse:function(url,param,success,error){
		$.ajax({
 		 		async : false,
				cache : false,
				type : 'POST',
				url : ctx + url + '?' + (new Date()).getTime(),
				dataType : 'json',
				timeout : 10000,
				data : param, 
				success : function(data) {
					success(data);
				},
				error : function(data){
					error(data);
				}
		 });
	},
	
	getUserInfo : function(){
		comm.ajaxFalse('commonRegion/findUserInfo.do',null,function(data){
			if(data){
				comm.userInfo = data;
			}
		})
	},
	
	getsysRole : function(){
		var sysRole = {};
		var param = {
				sysUserId : comm.userInfo.authSystemUser.sysUserId	
		};
		comm.ajaxFalse('commonRegion/findRoleInfo.do',param,function(data){
			if(data){
				sysRole = data;
			}
		});
		return sysRole;
	},
	
	

};

~(function($){
	
	$.extend({
		comm:comm
	});
	
	$.comm.getUserInfo();
	
})($);