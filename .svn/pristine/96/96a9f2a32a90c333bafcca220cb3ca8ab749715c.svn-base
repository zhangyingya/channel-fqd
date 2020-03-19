+(function($, window, document,undefined) {
    //定义Canvas的构造函数
    var Canvas = function(ele, opt,callback) {
        this.$element = ele,							//dom元素
        this.defaults = {	//默认值
			'value' : 35,						//数值
			'percent' : 35,						//百分比
			'width' : 200,						//canvas宽		为优化锯齿 此宽为canvas的style的宽的两倍 高也是
			'height' : 200,						//canvas高
			'lineWidth' : 10,					//边线宽度
			'waveWidth' : 0.025,				//波浪宽度,数越小越宽 
			'waveHeight' :16,					//波浪高度,数越大越高
			'speed' : 0.08,						//波浪速度，数越大速度越快
			'xOffset' : 0,						//波浪x偏移量
			'isdrawCircled' : false,			//是否画边线
			'fillStyle' : '#fee3cb',	//填充色
			'start' : 0.5*Math.PI,						//百分比线条的开始角度
			'end' : 0,				//百分比线条的结束角度
			'percentColor' : [					//百分比的渐变色值
								{
									'offset' : '0',
									'color' : '#F9BF51'
								},
								{
									'offset' : '1',
									'color' : '#F87F28'
								}
							],
			'percentShadowColor' : '#FDD7AA',	//百分比阴影色值
			'percentShadowBlur' : 20,			//百分比的阴影宽度
			'bgColor' : [						//圆圈线条底色
							{
								'offset' : '0',
								'color' : '#dedede'
							},
							{
								'offset' : '1',
								'color' : '#dedede'
							}
						],
			'bgShadowColor' : '#eee',			//圆圈线条底色阴影颜色
			'bgShadowBlur' : 20,				//圆圈线条底色阴影宽
			'fontSize' : 40,					//字体大小
			'fontColor' : '#333',				//字体颜色
			'fontY' : 95						//字体Y轴偏移量
			
		},
        this.options = $.extend({}, this.defaults, opt),	//合并自定义参数
		this.callback = callback						//下一个回调函数
    }
	
    //定义Canvas的方法
    Canvas.prototype = {
		init: function(){
			/*********初始化*********/
			var id = this.$element.attr("id");
			var obj = document.getElementById(id);
			//将this对象赋c_obj
			var c_obj = this;
			//初始化canvas对象
			c_obj.ctx = obj.getContext("2d");
			//圆属性
			obj.width = this.options.width;
			obj.height = this.options.height;
			c_obj.ctx.lineWidth = c_obj.options.lineWidth;
			c_obj.r = this.options.height / 2; //圆心
			c_obj.cR = c_obj.r - this.options.lineWidth; //圆半径
			//Sin 曲线属性
			c_obj.sX = 0;
			c_obj.sY = this.options.height / 2;
			c_obj.axisLength = this.options.width; //轴长
			
			
			setTimeout(function(){
				c_obj.render(c_obj);
			});
		},
		drawCircle: function(c_obj){
			//1.画百分比外圆
			c_obj.ctx.beginPath();
			var percentGra = c_obj.ctx.createLinearGradient(0, 0, c_obj.options.width, c_obj.options.height);
			for(i = 0; i < c_obj.options.percentColor.length; i++){
				var percent = c_obj.options.percentColor[i];
				var offset = percent.offset;
				var color = percent.color;
				percentGra.addColorStop(offset,color);
			}
			c_obj.ctx.strokeStyle = percentGra;
			c_obj.ctx.shadowColor = c_obj.options.percentShadowColor;
			c_obj.ctx.shadowBlur = c_obj.options.percentShadowBlur;
			c_obj.ctx.arc(c_obj.r, c_obj.r, c_obj.cR, c_obj.options.start, c_obj.options.end);
			c_obj.ctx.stroke();
			
			//2.画外圆底色
			var bgGra = c_obj.ctx.createLinearGradient(0, 0, c_obj.options.width, c_obj.options.height);
			for(i = 0; i < c_obj.options.bgColor.length; i++){
				var percent = c_obj.options.bgColor[i];
				var offset = percent.offset;
				var color = percent.color;
				bgGra.addColorStop(offset,color);
			}
			c_obj.ctx.strokeStyle = bgGra;
			c_obj.ctx.shadowColor = c_obj.options.bgShadowColor;
			c_obj.ctx.shadowBlur = c_obj.options.bgShadowBlur;
			c_obj.ctx.beginPath();
			c_obj.ctx.arc(c_obj.r, c_obj.r, c_obj.cR, c_obj.options.end, c_obj.options.start);
			c_obj.ctx.stroke();
			
			//3.填充水波
			c_obj.ctx.beginPath();
			c_obj.ctx.shadowColor = '';
			c_obj.ctx.shadowBlur = 0;
			c_obj.ctx.arc(c_obj.r, c_obj.r, c_obj.cR-c_obj.options.lineWidth/2, 0, 2 * Math.PI);
			c_obj.ctx.clip();
		},
		drawSin: function(c_obj){
			c_obj.ctx.save();
			var points=[]; //用于存放绘制Sin曲线的点
			c_obj.ctx.beginPath();
			//在整个轴长上取点
			for(var x = c_obj.sX; x < c_obj.sX + c_obj.axisLength; x += 20 / c_obj.axisLength){
				//此处坐标(x,y)的取点，依靠公式 “振幅高*sin(x*振幅宽 + 振幅偏移量)”
				var y = -Math.sin((c_obj.sX + x) * c_obj.options.waveWidth + c_obj.options.xOffset);
				var dY = c_obj.options.height * (1 - c_obj.options.percent / 100 );
				points.push([x, dY + y * c_obj.options.waveHeight]);
				c_obj.ctx.lineTo(x, dY + y * c_obj.options.waveHeight);  
			}
			//封闭路径
			c_obj.ctx.lineTo(c_obj.axisLength, c_obj.options.height);
			c_obj.ctx.lineTo(c_obj.sX, c_obj.options.height);
			c_obj.ctx.lineTo(points[0][0],points[0][1]);
			c_obj.ctx.fillStyle = c_obj.options.fillStyle;
			c_obj.ctx.fill();
			c_obj.ctx.restore();
		},
		drawText: function(c_obj){
			c_obj.ctx.save();
			var size = c_obj.options.fontSize;
			c_obj.ctx.font = size + 'px 微软雅黑';
			c_obj.ctx.textAlign = 'center';
			c_obj.ctx.fillStyle = c_obj.options.fontColor;
			c_obj.ctx.fillText(~~c_obj.options.value, c_obj.r, c_obj.options.fontY);
			c_obj.ctx.restore();
		},
		render: function(c_obj){
			//清除画布
			c_obj.ctx.clearRect(0, 0, c_obj.options.width, c_obj.options.height);
			
			//step1  画外圆
			if(c_obj.options.isdrawCircled == false){
				c_obj.drawCircle(c_obj); 
			}
			 
			//step2  曲线波动
			c_obj.drawSin(c_obj);
			//step3  写百分比文本函数
			c_obj.drawText(c_obj);
			c_obj.options.xOffset += c_obj.options.speed;
			setTimeout(function(){
				c_obj.render(c_obj);
			},c_obj.options.speed);
		}
    }
	
    //在插件中使用cavans对象
    $.fn.myCanvas = function(options,callback) {
        //创建canvas的实体
        var canvas = new Canvas(this, options,callback);
        //调用其方法
        return canvas.init();
    }
})(jQuery, window, document);
//兼容
window.requestAnimationFrame = (function(){  
  return  window.requestAnimationFrame       ||  
          window.webkitRequestAnimationFrame ||  
          window.mozRequestAnimationFrame    ||  
          function( callback ){  
            window.setTimeout(callback, 1000 / 60);  
          };  
})();