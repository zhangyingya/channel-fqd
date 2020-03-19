//首页-三大入口鼠标经过
function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}
function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}
function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}
function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}

$().ready(function() {	
//	if(!localStorage.getItem('accessToken')) {
//        window.location.href = '../html/登录_手机登录.html';
//    }
	$("#loginName").text(localStorage.getItem('userName'));
	//我的订单-下拉框
	$(".seachSelect").hover(function(){
		$(".seachSelect ul").show();
	},function(){
		$(".seachSelect ul").hide();
	});
	//select下拉选择
	$(".xiala").hover(function(){
		$(this).find(".xl_con").show();
	},function(){
		$(this).find(".xl_con").hide();
	});
	//模板-色卡选择
	$(".styled-select a,.ssq .add_btn").toggle(function(){
		$(".color").show();
	},function(){
		$(".color").hide();
	});
	//DIY拆分
	$(".dw_btn").toggle(function(){
		$("ul.chai").show();
	},function(){
		$("ul.chai").hide();
	});
	//DIY编辑
	$("#diy").click(function(){
		$(".editor").show();
	});
	$("#close").click(function(){
		$(".editor").hide();
	});
	
	//浏览器窗口发生变化时同时变化DIV高度
	//autodivheight();
	//window.onresize=autodivheight; 
});

function autodivheight(){ //函数：获取尺寸
    //获取浏览器窗口高度
    var winHeight=0;
    if (window.innerHeight)
        winHeight = window.innerHeight;
    else if ((document.body) && (document.body.clientHeight))
        winHeight = document.body.clientHeight;
    //通过深入Document内部对body进行检测，获取浏览器窗口高度
    if (document.documentElement && document.documentElement.clientHeight)
        winHeight = document.documentElement.clientHeight;
    //DIV高度为浏览器窗口的高度
    //document.getElementById("test").style.height= winHeight +"px";
    //DIV高度为浏览器窗口高度的一半
    var height = (winHeight-100)+"px";
    $(".leftMenu").height(height);
    $(".content").height(height);
}


//选项卡
function setTab(name,cursel,n){
 for(i=1;i<=n;i++){
  var menu=document.getElementById(name+i);
  var con=document.getElementById("con_"+name+"_"+i);
  menu.className=i==cursel?"hover":"";
  con.style.display=i==cursel?"block":"none";
 }
}
//检查特殊字符
function checkSC(str)
{
   var reg=/[~！@#￥^%……&*]/;
   if(reg.test(str))
   {
	   return true;
   }
  return false;
}
//获取下拉框内容
function getOption(dicType,selVal,isHas)
{
	var option='';
	if(isHas)
	{
		option='<option value="">全部</option>';
	}
	var param = {dicType:dicType};//'ST001'
	var url = "subject/getOptions.html";
	var response = post(url, param);
	if (response.result == 200) {
	    var data = response.data;
        for(var i=0;i<data.length;i++)
	    {
	        var items=data[i];
	        var item=items.split("#");
	        if(selVal==item[0])
	        {
	          option+='<option value="'+item[0]+'" selected>'+item[1]+'</option>';
	        }
	        else
	        {
	          option+='<option value="'+item[0]+'">'+item[1]+'</option>';	
	        }
	       
	     }
	   
	} else {
		art.artDialog.error(response.msg);
	      return option;
	}
	return option;
}
//获取模板内容
function getSurveyTempContent(id)
{
    var content='';
	var param = {id:id};//'ST001'
	var url = "survey/queryTempContent.html";
	var response = post(url, param);
	if (response.result == 200) {
		content = response.data;        	   
	} else {
		art.artDialog.error(response.msg);
	      return content;
	}
	return content;
}
//判断输入内容是否超出长度
function outlength(obj,length)
{
	 //过滤html特殊字符
  var reg=/<[^<>]+>/g;
  //$(obj).html($(obj).text().replace(reg,'')); 
  var html=$(obj).html().replace(reg,'')
  if(html.length>0)
  {
	   if(html.length>length)
	   {
	 	  var string=html.substring(0,length);
	 	  $(obj).focus().html(string);
	 	  //$('<div>').appendTo('body').addClass('alert alert-success').html('输入超出长度').show().delay(3000).fadeOut();
	 	  bindQTip(obj,'输入超出长度,最大输入长度为'+length+'字符');
	 	  set_focus(obj);
	 	  
	   }
	   else if(checkSC($(obj).text()))
	   {
		   bindQTip(obj,'含有特殊字符');
	   }
	   else
	   {
		   destoryQTip(obj);
	   }

   }
  else
  {
	  bindQTip(obj,'请输入内容');
	  
  }
  $(obj).trigger('click');

}
//判断输入内容是否超出长度
function outlengthVal(obj,length)
{
  if($(obj).val().length>0)
  {
	   if($(obj).val().length>length)
	   {
	 	  var string=$(obj).val().substring(0,length);
	 	  $(obj).focus().val(string);
	 	  //$('<div>').appendTo('body').addClass('alert alert-success').html('输入超出长度').show().delay(3000).fadeOut();
	 	  bindQTip(obj,'输入超出长度,最大输入长度为'+length+'字符');
	 	  //set_focus(obj);
	 	  
	   }
	   else if(checkSC($(obj).val()))
	   {
		   bindQTip(obj,'含有特殊字符');
	   }
	   else
	   {
		   destoryQTip(obj);
	   }

   }
  else
  {
	  bindQTip(obj,'请输入内容');
	  
  }
  $(obj).trigger('click');

}
//或得焦点
function set_focus(el)
{
    //el=document.getElementById(id);
    //el=el[0];  //jquery 对象转dom对象
    el.focus();
    if($.support.msie)
    {
        var range = document.selection.createRange();
        this.last = range;
        range.moveToElementText(el);
        range.select();
        document.selection.empty(); //取消选中
    }
    else
    {
        var range = document.createRange();
        range.selectNodeContents(el);
        range.collapse(false);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    }
}
//控件绑定提示
function bindQTip(obj,content)
{
	$(obj).qtip({  
        content: content,  
        style: { classes: 'qtip-light qtip-shadow qtip-rounded'},  
     position: { 
                my: 'bottom left', 
                at: 'right center' 
               }, 
         show: {
                event: 'click'
               }
	});
}
//控件解除提示
function destoryQTip(obj)
{
	$(obj).qtip('destroy',true);
}
//模板详情-高度
function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}
function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}
//模板详情-评论	
$(function() {
	s2 = 'open';	
	$('#open-comment,#gallery-comment-mask').click(h);
	function h(h0) {
		var q0 = '#gallery-comment-mask',
			y0 = '#gallery-comment';
		if (h0.target.id == 'open-comment') {
			if (h0 && h0.preventDefault) {
				h0.preventDefault();
			} else {
				window.event.returnValue = N;
			}
			$(y0).addClass(s2);
			$(q0).addClass(s2);
		} else {
			$(y0).removeClass(s2);
			$(q0).removeClass(s2);
			h0.stopPropagation();
			return;
		}
	}
})

//后台二级菜单展开收起效果
$(document).ready(function(){
	
	   //禁用菜单键
	   $("body").bind("contextmenu", function(event) {  
		  return false;  
	   }); 
	   //禁用快捷键
	   $("body").bind("keydown",function(e){    
		    e=window.event||e; 
		    //禁止空格键翻页  
		   /* if(event.keyCode==32){ 
		    	return false;  
		    } */
		    //禁止F12
		    /**if(event.keyCode==123){ 
		    	return false;  
		    }*/
		    //屏蔽F5刷新键  
		   /* if(event.keyCode==116){ 
			     e.keyCode = 0; //IE下需要设置为keyCode为false  
			     return false;  
		    }  */
		    //屏蔽 Alt+ 方向键 ←  
		    //屏蔽 Alt+ 方向键 → 
		    /*if ((event.altKey)&&((event.keyCode==37)||(event.keyCode==39)))  
		    {  
			     event.returnValue=false;  
			     return false; 
		    } */
		    //屏蔽退格删除键  
		    /*if(event.keyCode==8){ 
		    	return false;  
		    } */
		   //屏蔽ctrl+R  
		  /* if((event.ctrlKey) && (event.keyCode==82)){ 
			     e.keyCode = 0;  
			     return false;  
		   } */
	});
	
	$(".service-select .text").click(function(){
		if($(".topbar-nav-item").find("li").length != 0){
			$(this).closest(".service-select").toggleClass("open");
		}
	});
	$(".top-bar-navList a").click(function(){
		$(this).closest(".service-select").find(".text").text($(this).find(".a_text").html());
		$(this).closest(".service-select").removeClass("open");
		window.location.href = $(this).attr("url");
	});
	
//	if($(".service-select li")==null || $(".service-select li")=="undefined" || $(".service-select li").length==0){
//		window.location.href = "login_account.html";
//	}
	
	
	$(".leftMenu #secondMenu:not(:first)").hide();
	$(".leftMenu #secondMenu .thirdMenu").hide();
	$(".leftMenu li").click(function(){
		$(this).next("#secondMenu").slideToggle("slow")
		.siblings("#secondMenu:visible").slideUp("slow");
	});
	$("#secondMenu .secondLi").click(function(){
		$(this).next(".thirdMenu").slideToggle("slow")
		.siblings(".thirdMenu:visible").slideUp("slow");
	});
	
	$("#secondMenu li").click(function(){
		var $obj = $(this).parents("#secondMenu");
		if(!$(this).hasClass("secondLi")){
			$obj.siblings("li").find("a").removeClass("hover");
			$obj.prev().find("a").addClass("hover");
		}
	});
	
	//点击左侧菜单栏打开页面
	$("#secondMenu ul li a").click(function(){

		var url = $(this).attr("url");
		if (!(typeof(url) == "undefined")){
			if(url.indexOf("queryGroupNo.html")>0){
				localStorage.removeItem('groupId');
				localStorage.removeItem('groupName');
			}
		}
		$.ajaxSetup ({
			cache: false //关闭AJAX相应的缓存
		});
		$(".rightBody").empty(); 
		$(".rightBody").load(url);
	});
	//用户登出操作
	$("#loginOut").click(function(){
		var params = {};
		var url = "/login/loginOut.html";
        var response = post(url,params);
        if (response.result == 200) {
            var data = response.data;
            localStorage.removeItem('userId');
            localStorage.removeItem('accessToken');
            localStorage.removeItem('userName');
            localStorage.removeItem("userInfoJson");
            localStorage.removeItem("roleModuleJson");
            window.location.href = '../index.html';
            /*if(data.auth){

            }else{
                window.location.href = 'indexOnly.html';
            }*/


        } else {
        	(response.msg);
            return false;
        }
	});
	
});
Date.prototype.Format = function (fmt) { //author: meizz 
	 var o = {
	     "M+": this.getMonth() + 1, //月份 
	     "d+": this.getDate(), //日 
	     "h+": this.getHours(), //小时 
	     "m+": this.getMinutes(), //分 
	     "s+": this.getSeconds(), //秒 
	     "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
	     "S": this.getMilliseconds() //毫秒 
	 };
	 if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	 for (var k in o)
	 if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	 return fmt;
}
