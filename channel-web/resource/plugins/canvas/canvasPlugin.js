+(function($, window, document,undefined) {
    //����Canvas�Ĺ��캯��
    var Canvas = function(ele, opt,callback) {
        this.$element = ele,							//domԪ��
        this.defaults = {	//Ĭ��ֵ
			'value' : 35,						//��ֵ
			'percent' : 35,						//�ٷֱ�
			'width' : 200,						//canvas��		Ϊ�Ż���� �˿�Ϊcanvas��style�Ŀ������ ��Ҳ��
			'height' : 200,						//canvas��
			'lineWidth' : 10,					//���߿��
			'waveWidth' : 0.025,				//���˿��,��ԽСԽ�� 
			'waveHeight' :16,					//���˸߶�,��Խ��Խ��
			'speed' : 0.08,						//�����ٶȣ���Խ���ٶ�Խ��
			'xOffset' : 0,						//����xƫ����
			'isdrawCircled' : false,			//�Ƿ񻭱���
			'fillStyle' : '#fee3cb',	//���ɫ
			'start' : 0.5*Math.PI,						//�ٷֱ������Ŀ�ʼ�Ƕ�
			'end' : 0,				//�ٷֱ������Ľ����Ƕ�
			'percentColor' : [					//�ٷֱȵĽ���ɫֵ
								{
									'offset' : '0',
									'color' : '#F9BF51'
								},
								{
									'offset' : '1',
									'color' : '#F87F28'
								}
							],
			'percentShadowColor' : '#FDD7AA',	//�ٷֱ���Ӱɫֵ
			'percentShadowBlur' : 20,			//�ٷֱȵ���Ӱ���
			'bgColor' : [						//ԲȦ������ɫ
							{
								'offset' : '0',
								'color' : '#dedede'
							},
							{
								'offset' : '1',
								'color' : '#dedede'
							}
						],
			'bgShadowColor' : '#eee',			//ԲȦ������ɫ��Ӱ��ɫ
			'bgShadowBlur' : 20,				//ԲȦ������ɫ��Ӱ��
			'fontSize' : 40,					//�����С
			'fontColor' : '#333',				//������ɫ
			'fontY' : 95						//����Y��ƫ����
			
		},
        this.options = $.extend({}, this.defaults, opt),	//�ϲ��Զ������
		this.callback = callback						//��һ���ص�����
    }
	
    //����Canvas�ķ���
    Canvas.prototype = {
		init: function(){
			/*********��ʼ��*********/
			var id = this.$element.attr("id");
			var obj = document.getElementById(id);
			//��this����c_obj
			var c_obj = this;
			//��ʼ��canvas����
			c_obj.ctx = obj.getContext("2d");
			//Բ����
			obj.width = this.options.width;
			obj.height = this.options.height;
			c_obj.ctx.lineWidth = c_obj.options.lineWidth;
			c_obj.r = this.options.height / 2; //Բ��
			c_obj.cR = c_obj.r - this.options.lineWidth; //Բ�뾶
			//Sin ��������
			c_obj.sX = 0;
			c_obj.sY = this.options.height / 2;
			c_obj.axisLength = this.options.width; //�᳤
			
			
			setTimeout(function(){
				c_obj.render(c_obj);
			});
		},
		drawCircle: function(c_obj){
			//1.���ٷֱ���Բ
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
			
			//2.����Բ��ɫ
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
			
			//3.���ˮ��
			c_obj.ctx.beginPath();
			c_obj.ctx.shadowColor = '';
			c_obj.ctx.shadowBlur = 0;
			c_obj.ctx.arc(c_obj.r, c_obj.r, c_obj.cR-c_obj.options.lineWidth/2, 0, 2 * Math.PI);
			c_obj.ctx.clip();
		},
		drawSin: function(c_obj){
			c_obj.ctx.save();
			var points=[]; //���ڴ�Ż���Sin���ߵĵ�
			c_obj.ctx.beginPath();
			//�������᳤��ȡ��
			for(var x = c_obj.sX; x < c_obj.sX + c_obj.axisLength; x += 20 / c_obj.axisLength){
				//�˴�����(x,y)��ȡ�㣬������ʽ �������*sin(x*����� + ���ƫ����)��
				var y = -Math.sin((c_obj.sX + x) * c_obj.options.waveWidth + c_obj.options.xOffset);
				var dY = c_obj.options.height * (1 - c_obj.options.percent / 100 );
				points.push([x, dY + y * c_obj.options.waveHeight]);
				c_obj.ctx.lineTo(x, dY + y * c_obj.options.waveHeight);  
			}
			//���·��
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
			c_obj.ctx.font = size + 'px ΢���ź�';
			c_obj.ctx.textAlign = 'center';
			c_obj.ctx.fillStyle = c_obj.options.fontColor;
			c_obj.ctx.fillText(~~c_obj.options.value, c_obj.r, c_obj.options.fontY);
			c_obj.ctx.restore();
		},
		render: function(c_obj){
			//�������
			c_obj.ctx.clearRect(0, 0, c_obj.options.width, c_obj.options.height);
			
			//step1  ����Բ
			if(c_obj.options.isdrawCircled == false){
				c_obj.drawCircle(c_obj); 
			}
			 
			//step2  ���߲���
			c_obj.drawSin(c_obj);
			//step3  д�ٷֱ��ı�����
			c_obj.drawText(c_obj);
			c_obj.options.xOffset += c_obj.options.speed;
			setTimeout(function(){
				c_obj.render(c_obj);
			},c_obj.options.speed);
		}
    }
	
    //�ڲ����ʹ��cavans����
    $.fn.myCanvas = function(options,callback) {
        //����canvas��ʵ��
        var canvas = new Canvas(this, options,callback);
        //�����䷽��
        return canvas.init();
    }
})(jQuery, window, document);
//����
window.requestAnimationFrame = (function(){  
  return  window.requestAnimationFrame       ||  
          window.webkitRequestAnimationFrame ||  
          window.mozRequestAnimationFrame    ||  
          function( callback ){  
            window.setTimeout(callback, 1000 / 60);  
          };  
})();