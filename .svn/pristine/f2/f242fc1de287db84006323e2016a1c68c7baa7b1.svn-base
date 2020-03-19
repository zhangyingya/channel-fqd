/**
 * @autor   thx
 * @date    2017
 * tab滚动
 * @param  {[type]} $         [description]
 * @param  {[type]} window    [description]
 * @param  {[type]} document  [description]
 * @param  {[type]} undefined [description]
 * @return {[type]}           [description]
 */
+(function($, window, document,undefined) {
    //定义TabScroll的构造函数
    var TabScroll = function(ele, opt,callback) {
        this.$outer = ele,                                  //dom元素 容器
        this.defaults = {   //默认值
            'ul' : null,                                    //tab列表
            'leftArrow' : null,                             //左箭头
            'rightArrow' : null,                            //右箭头
            'scroll' : true                                 //是否滚动
        },
        this.options = $.extend({}, this.defaults, opt),    //合并自定义参数
        this.callback = callback,                           //下一个回调函数
        this.leftEditN = 0,                                 //左边隐藏个数
        this.rightEditN = 0,                                //右边隐藏个数
        this.clickFlag = true                               //是否可点击
    }
    
    //定义TabScroll的属性和方法
    TabScroll.prototype = {
        ifScroll: function(){
            var _this = this;
            var ulWidth = 0;
            // debugger
            this.options.ul.find("dl").each(function(){
                var $li = $(this);
                ulWidth += calcWidth($li);
            });
            var outerDivWidth = this.$outer.width();
            var padding = parseInt(this.$outer.css("paddingLeft")) + parseInt(this.$outer.css("paddingRight"));
            
            if((outerDivWidth - padding) < ulWidth && this.options.scroll){
                this.$outer.addClass("scroll");
                var restWidth = ulWidth - outerDivWidth;
                var showN = 0;
                var showWidth = 0;
                this.options.ul.find("dl").each(function(){
                    var $dom = $(this);
                    var width2 = calcWidth($dom);
                    showWidth += width2;
                    if(showWidth > outerDivWidth){
                        return;
                    }else{
                        showN++;
                    }
                });
                var restN = this.options.ul.find("dl").length - showN;
                this.options.ul.find("dl:first-child").css("marginLeft",0 + "px");
                
                this.leftEditN = restN;
                this.rightEditN = 0;
                this.options.rightArrow.on("click",function(e){
                    e.stopPropagation();
                    if( _this.leftEditN  > 0 && _this.clickFlag){
                        var $nextLi = _this.options.ul.find("dl").eq(_this.rightEditN);
                        var liW = calcWidth($nextLi) +4;
                        _this.animate(-liW);
                        _this.leftEditN--;
                        _this.rightEditN++;
                    }
                });
                this.options.leftArrow.on("click",function(e){
                    e.stopPropagation();
                    if( _this.rightEditN  > 0 && _this.clickFlag){
                        var $prevLi = _this.options.ul.find("dl").eq(_this.rightEditN-1);
                        var liW = calcWidth($prevLi) +4;
                        _this.animate(liW);
                        _this.rightEditN--;
                        _this.leftEditN++;
                    }
                });
            }else{
                this.$outer.removeClass("scroll");
            }
            if(this.callback != null){
                this.callback();
            }
        },
        /**
         * [箭头点击滚动事件]
         * @param  {[type]} liWidth [description]
         * @return {[type]}         [description]
         */
        animate : function(liWidth){
            var _this = this;
            this.clickFlag=false;
            var marginBefore = parseInt(this.options.ul.find("dl:first-child").css("marginLeft"));
            var marginAfter = marginBefore + liWidth;
            this.options.ul.find("dl:first-child").animate(
            {
                marginLeft : marginAfter + "px"
            },"fast",function(){
                _this.clickFlag=true;
            });
        }
    }
    
    //在插件中使用树对象
    $.fn.tabScroll = function(options,callback) {
        //创建canvas的实体
        var tabScroll = new TabScroll(this, options,callback);
        // //调用其判断滚动的方法
        // return tabScroll.ifScroll();
        return tabScroll;
    }
})(jQuery, window, document);
/**
 * 计算元素的实际宽度 包括padding
 * @param  {[type]} $dom [description]
 * @return {[type]}      [description]
 */
function calcWidth($dom){
    var result = $dom.width() + parseInt($dom.css("paddingLeft")) + parseInt($dom.css("paddingRight"))
    return result;
}

/**
	用法：
	var options = {
		ul : $("#menuPanelDiv>ul"),
		leftArrow : $(".left-arrow"),
		rightArrow : $(".right-arrow"),
	};
	this.tabScroll = $("#menuPanelDiv").tabScroll(options);
	this.tabScroll.ifScroll();
	
	HTML结构
		<div id="menuPanelDiv" class="outer">
			<div class="left-arrow"></div>			//绝对定位
			<div class="right-arrow"></div>
			<ul>
				<li><a href=""></a> </li>
				<li><a href=""></a></li>
			</ul>
		</div>
		
	
*/