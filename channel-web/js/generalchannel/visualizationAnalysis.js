/**
 * 可视化分析
 * @constructor
 */

var VisualizationAnalysis= function(){	
	 
	    this.findAllChannelAmounts = function() {
	    		    	
	    	$.ajax({
	 		 		async : false,
					cache : false,
					type : 'POST',
					url : ctx + "visualizationAnalysis/findAllChannelAmounts.do",
					dataType : 'json',
					timeout : 10000,
					success : function(data) {
						visualizationAnalysis.channelEcharts(data);							
					}
			 });
	    };
	    
	    
	    
   	
	    this.findAllBusinessOpportunityList = function() {
	    	
	    	$.ajax({
	 		 		async : false,
					cache : false,
					type : 'POST',
					url : ctx + "visualizationAnalysis/findAllBusinessOpportunityList.do",
					dataType : 'json',
					timeout : 10000,
					success : function(data) {						
						visualizationAnalysis.businessOpportunityEcharts(data);		
					
					}
			 });
	    }; 
	    
	    this.findChannelAmountsByEveryday = function() {	    
	    	
	    	$.ajax({
	 		 		async : false,
					cache : false,
					type : 'POST',
					url : ctx + "visualizationAnalysis/findChannelAmountsByEveryday.do",
					dataType : 'json',
					timeout : 10000,
					success : function(data) {						
						visualizationAnalysis.channelAmountsByEverydayEcharts(data);						
					}
			 });
	    };
		    
		this.findBusinessOpportunityAmountsByEveryday = function() {	    	
			    	
			    	$.ajax({
			 		 		async : false,
							cache : false,
							type : 'POST',
							url : ctx + "visualizationAnalysis/findBusinessOpportunityByEveryday.do",
							dataType : 'json',
							timeout : 10000,
							success : function(data) {
								visualizationAnalysis.businessOpportunityEverydayEcharts(data);								
							}
					 });
		};
	    
	    this.businessOpportunityEcharts=function(data) {
	       	var regionNames=[];
	    	var businessOpportunityAmounts=[];
	    	for(var i=0; i<data.length; i++) {
	    		regionNames.push(data[i].REGIONNAME);
	    		businessOpportunityAmounts.push(data[i].BUSINESSAMOUNTS);    	    				
	    		
	    	}
	    	
	    	// 基于准备好的dom，初始化echarts实例
	    	var myChart = echarts.init(document.getElementById('businessOpportunityDiv'));

	    	// 指定图表的配置项和数据	  
	    	var option = {
	    	    title: {
	    	        text: '各地市商机单统计'
	    	    },
	    	    tooltip: {
	    	    	trigger: 'axis',
	    	        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
	    	            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
	    	        }
	    	        
	    	    },
	    	    grid: {
	    	        left: '3%',
	    	        right: '4%',
	    	        bottom: '3%',
	    	        containLabel: true
	    	    },
	    	    legend: {
	    	        data:['商机单数量']
	    	    },
	    	    toolbox: {
	    	        show: true,
	    	        orient: 'vertical',
	    	        left: 'right',
	    	        top: 'center',
	    	        feature: {
	    	            mark: {show: true},
	    	            dataView: {show: true, readOnly: false},
	    	            magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
	    	            restore: {show: true},
	    	            saveAsImage: {show: true}
	    	        }
	    	    },
	    	    calculable: true,
	    	    dataZoom: [{
    	            type: 'inside'
	    	    }],
	    	    xAxis: [{
	    	    	type:'category',
	    	        data: regionNames,
	    	        axisTick: {
	                    alignWithLabel: true
	    	        }     
	            }],	    	   
	    	    yAxis: [{
		    	    	type:'value'
		    	}],
	    	    series: [{
	    	        name: '商机单数量',
	    	        type: 'bar',
	    	        barWidth: '60%',	    	        
	    	        data: businessOpportunityAmounts
	    	    }]
	    	};

	    	// 使用刚指定的配置项和数据显示图表。
	    	myChart.setOption(option);
	    }
	    
	    this.channelAmountsByEverydayEcharts=function(data) {
	    	var everyday=[];
	    	var channelAmounts=[];
	    	for(var i=0; i<data.length; i++) {
	    		everyday.push(data[i].EVERYDAY);
	    		channelAmounts.push(data[i].GENERALAMOUNTS);   		
	    		
	    	}
	    	
	    	// 基于准备好的dom，初始化echarts实例
	    	var myChart = echarts.init(document.getElementById('channelAmountsEverydayDiv'));

	    	// 指定图表的配置项和数据	  
	    	var option = {
	    	    title: {
	    	        text: '全省泛渠道发展量走势图'
	    	    },
	    	    tooltip: {
	    	    	trigger: 'axis',
	    	        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
	    	            type : 'line'        // 默认为直线，可选为：'line' | 'shadow'
	    	        }
	    	    },
	    	    legend: {
	    	        data:['泛渠道每日数量']
	    	    },
	    	    toolbox: {
	    	        show: true,
	    	        orient: 'vertical',
	    	        left: 'right',
	    	        top: 'center',
	    	        feature: {
	    	            mark: {show: true},
	    	            dataView: {show: true, readOnly: false},
	    	            magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
	    	            restore: {show: true},
	    	            saveAsImage: {show: true}
	    	        }
	    	    },
	    	    calculable: true,
	    	    dataZoom: [{
    	            type: 'inside'
	    	    }],
	    	    xAxis:[{
	    	    	type: 'category',
	    	        data: everyday,
	    	        axisTick: {
	                    alignWithLabel: true
	                }
	    	    }],
	    	    yAxis: [{
	    	    	type:'value'
	    	    }],
	    	    series: [{
	    	        name: '泛渠道每日数量',
	    	        type: 'line',
	    	        data: channelAmounts
	    	    }]
	    	};

	    	// 使用刚指定的配置项和数据显示图表。
	    	myChart.setOption(option);
	    }
	    
	    
	    this.businessOpportunityEverydayEcharts=function(data) {
	    	var everyday=[];
	    	var businessOpportunityAmounts=[];
	    	for(var i=0; i<data.length; i++) {
	    		everyday.push(data[i].EVERYDAY);
	    		businessOpportunityAmounts.push(data[i].BUSINESSAMOUNTS);  
	    		
	    	}
	    	
	    	// 基于准备好的dom，初始化echarts实例
	    	var myChart = echarts.init(document.getElementById('businessOpportunityEverydayDiv'));

	    	// 指定图表的配置项和数据	  
	    	var option = {
	    	    title: {
	    	        text: '全省商机录入走势图'
	    	    },
	    	    tooltip: {
	    	    	trigger: 'axis',
	    	        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
	    	            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
	    	        }
	    	    },
	    	    legend: {
	    	        data:['商机单每日数量']
	    	    },
	    	    toolbox: {
	    	        show: true,
	    	        orient: 'vertical',
	    	        left: 'right',
	    	        top: 'center',
	    	        feature: {
	    	            mark: {show: true},
	    	            dataView: {show: true, readOnly: false},
	    	            magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
	    	            restore: {show: true},
	    	            saveAsImage: {show: true}
	    	        }
	    	    },
	    	    calculable: true,
	    	    dataZoom: [{
    	            type: 'inside'
	    	    }],
	    	    xAxis: [{
	    	    	type: 'category',
	    	        data: everyday,
	    	        axisTick: {
	                    alignWithLabel: true
	                }
	    	    }],
	    	    yAxis:[{
	    	    	type:'value'
	    	    }],
	    	    series: [{
	    	        name: '商机单每日数量',
	    	        type: 'line',
	    	        data: businessOpportunityAmounts
	    	    }]
	    	};

	    	// 使用刚指定的配置项和数据显示图表。
	    	myChart.setOption(option);
	    }
	    
	    
	    this.channelEcharts=function(data) {
	    	
	    	var regionNames=[];
	    	var channelAmounts=[];
	    	for(var i=0; i<data.length; i++) {
	    		regionNames.push(data[i].REGIONNAME);
	    		channelAmounts.push(data[i].CHANNELAMOUNTS);   
	    		
	    	}
	    	
	    	// 基于准备好的dom，初始化echarts实例
	    	var myChart = echarts.init(document.getElementById('generalChanenlDiv'));

	    	// 指定图表的配置项和数据	  
	    	var option = {
	    	    title: {
	    	        text: '各地市泛渠道统计'
	    	    },
	    	    tooltip: {
	    	    	trigger: 'axis',
	    	        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
	    	            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
	    	        }
	    	    },
	    	    grid: {
	    	        left: '3%',
	    	        right: '4%',
	    	        bottom: '3%',
	    	        containLabel: true
	    	    },
	    	    legend: {
	    	        data:['泛渠道数量']
	    	    },
	    	    toolbox: {
	    	        show: true,
	    	        orient: 'vertical',
	    	        left: 'right',
	    	        top: 'center',
	    	        feature: {
	    	            mark: {show: true},
	    	            dataView: {show: true, readOnly: false},
	    	            magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
	    	            restore: {show: true},
	    	            saveAsImage: {show: true}
	    	        }
	    	    },
	    	    calculable: true,
	    	    dataZoom: [{
	    	            type: 'inside'
	    	    }],
	    	    xAxis: [{
	    	    	type:'category',
	    	        data: regionNames,
	    	        axisTick: {
	                    alignWithLabel: true
	    	        }
	            }],
	    	    yAxis:[{
	    	    	type:'value'
	    	    }],
	    	    series: [{
	    	        name: '泛渠道数量',
	    	        type: 'bar',
	    	        barWidth: '60%',
	    	        data: channelAmounts
	    	    }]
	    	};

	    	// 使用刚指定的配置项和数据显示图表。
	    	myChart.setOption(option);
	    };
	    
	    
	    
   	
}


var visualizationAnalysis = new VisualizationAnalysis();

$(document).ready(function () {
	visualizationAnalysis.findAllChannelAmounts();
	visualizationAnalysis.findAllBusinessOpportunityList();
	visualizationAnalysis.findBusinessOpportunityAmountsByEveryday();
	visualizationAnalysis.findChannelAmountsByEveryday();
	
});
