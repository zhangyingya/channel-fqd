$(document).ready(function(){
	
	// indexMenu.init();
	
	//userxx-头部鼠标经过下拉
	$(".user").hover(function(){
		$(".user-xx").show();
		$(".user-xx").hover(function(){$(this).show()},function(){$(this).hide();});
	},function(){
		$(".user-xx").hide();
	});
	
	//点击收起head
	$(".sq-list").click(function(){
		if($(".head").is(":visible")){
			$(".head").hide();
			$(this).removeClass("zk-list");
		}else{
			$(".head").show();
			$(this).addClass("zk-list")
		}
		
	});
	
	$(window).resize(function(){
		setMenu();
	});
	
	//解决placeholder在IE8下无效的问题（仅针对type=text，type=password无效）
	if( !('placeholder' in document.createElement('input')) ){
		$('input[placeholder],textarea[placeholder]').each(function(){  
			var that = $(this),  
			text= that.attr('placeholder');  
			if(that.val()===""){  
				that.val(text).addClass('placeholder');  
			}  
			that.focus(function(){  
				if(that.val()===text){  
					that.val("").removeClass('placeholder');  
				}  
			})  
			.blur(function(){  
				if(that.val()===""){  
					that.val(text).addClass('placeholder');  
				}  
			})  
			.closest('form').submit(function(){  
				if(that.val() === text){  
					that.val('');  
				}  
			});  
		});
	}
});

function num_tcc() {
	window.location.href=ctx+'/index/logout.do';
}
