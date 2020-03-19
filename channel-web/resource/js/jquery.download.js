jQuery.extend({
	download : function (url, data, method) {
		// 获得url和data
		if (url && data) { 
	        // data 是 string 或者 array/object
			data = typeof data == "string" ? data : $.param(data);
	        // 把参数组装成 form的  input
			var inputs = "";
			$.each(data.split("&"), function () {
				var pair = this.split("=");
				inputs += "<input type='hidden' name='" + pair[0] + "' value='" + pair[1] + "' />";
			});
	        // request发送请求
			$("<form action='" + url + "' method='" + (method || "post") + "'>" + inputs + "</form>").appendTo("body").submit().remove();
		}
	}
});