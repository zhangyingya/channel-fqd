/*
 * jQuery Autocomplete plugin 1.1
 *
 * Copyright (c) 2009 Jörn Zaefferer
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * Revision: $Id: jquery.autocomplete.js 15 2009-08-22 10:30:27Z joern.zaefferer $
 */
//标识当前是否正在选择
var START_SELECT = false;
;(function($) {

String.prototype.replaceAll = function(reallyDo, replaceWith, ignoreCase) {  
	if (!RegExp.prototype.isPrototypeOf(reallyDo)) {  
		return this.replace(new RegExp(reallyDo, (ignoreCase ? "gi": "g")), replaceWith);  
	} else {  
		return this.replace(reallyDo, replaceWith);  
	}  
}  
	
$.fn.extend({
	autocomplete: function(urlOrData, options) {
		var isUrl = typeof urlOrData == "string";
		options = $.extend({}, $.Autocompleter.defaults, {
			url: isUrl ? urlOrData : null,
			data: isUrl ? null : urlOrData,
			delay: isUrl ? $.Autocompleter.defaults.delay : 10,
			max: options && !options.scroll ? 10 : 150
		}, options);
		
		// if highlight is set to false, replace it with a do-nothing function
		options.highlight = options.highlight || function(value) { return value; };
		
		// if the formatMatch option is not specified, then use formatItem for backwards compatibility
		options.formatMatch = options.formatMatch || options.formatItem;
		
		return this.each(function() {
			new $.Autocompleter(this, options);
		});
	},
	result: function(handler) {
		return this.bind("result", handler);
	},
	search: function(handler) {
		return this.trigger("search", [handler]);
	},
	changeResult: function() {
		return this.trigger("result");
	},
	flushCache: function() {
		for(var a = 0;a<y;a++){
			$("#autocompleteDivId"+a+"").hide();
		}
		return this.trigger("flushCache");
	},
	setOptions: function(options){
		return this.trigger("setOptions", [options]);
	},
	unautocomplete: function() {
		return this.trigger("unautocomplete");
	}
});

//获取当前光标的位置
function getCursorAt(input)
{
	var cursorAt;
	//如果当前浏览器为IE10,则执行下面代码
	if ($(input).context.selectionStart != undefined)
	{
		cursorAt = $(input).context.selectionStart;
	}
	else
	{
		cursorAt = $(input).selection2().start;
	}
	return cursorAt;
} 

var y = 0;
var tt = 0;
$.Autocompleter = function(input, options) {

	var KEY = {
		UP: 38,
		DOWN: 40,
		DEL: 46,
		TAB: 9,
		RETURN: 13,
		ESC: 27,
		COMMA: 188,
		PAGEUP: 33,
		PAGEDOWN: 34,
		BACKSPACE: 8
	};

	// Create $ object for input element
	var $input = $(input).attr("autocomplete", "off").addClass(options.inputClass);

	var timeout;
	var previousValue = "";
	var cache = $.Autocompleter.Cache(options);
	var hasFocus = 0;
	var lastKeyPressCode;
	var type = 0;
	var temp = 0;
	var config = {
		mouseDownOnSelect: false
	};
	var select = $.Autocompleter.Select(options, input, selectCurrent, config);
	
	var blockSubmit;
	
	// prevent form submit in opera when selecting with return key
//	$.browser.opera && $(input.form).bind("submit.autocomplete", function() {
	//jQuery 从 1.9 版开始，移除了 $.browser 和 $.browser.version ， 取而代之的是 $.support 
	$.support.opera && $(input.form).bind("submit.autocomplete", function() {
		if (blockSubmit) {
			blockSubmit = false;
			return false;
		}
	});
	
	// only opera doesn't trigger keydown multiple times while pressed, others don't work with keypress at all
	$input.bind(($.support.opera ? "keypress" : "keydown") + ".autocomplete", function(event) 
	{
		// a keypress means the input has focus
		// avoids issue where input had focus before the autocomplete was applied
		hasFocus = 1;
		// track last key pressed
		lastKeyPressCode = event.keyCode;
		switch(event.keyCode) 
		{
			case KEY.UP:
				event.preventDefault();
				if ( select.visible() ) {
					select.prev();
				} else {
					onChange(0, true);
				}
				break;
				
			case KEY.DOWN:
				event.preventDefault();
				if ( select.visible() ) {
					select.next();
				} else {
					onChange(0, true);
				}
				break;
				
			case KEY.PAGEUP:
				event.preventDefault();
				if ( select.visible() ) {
					select.pageUp();
				} else {
					onChange(0, true);
				}
				break;
				
			case KEY.PAGEDOWN:
				event.preventDefault();
				if ( select.visible() ) {
					select.pageDown();
				} else {
					onChange(0, true);
				}
				break;
			
			// matches also semicolon
			case options.multiple && $.trim(options.multipleSeparator) == ";" && KEY.COMMA:
			case KEY.TAB:
			case KEY.RETURN:
				if( selectCurrent() ) {
					// stop default to prevent a form submit, Opera needs special handling
					event.preventDefault();
					blockSubmit = true;
					return false;
				}
				break;
				
			case KEY.ESC:
				select.hide();
				break;
				
			default:
				tt = 1;
				clearTimeout(timeout);
				timeout = setTimeout(onChange, options.delay);
				break;
		}
	}).focus(function(){
		// track whether the field has focus, we shouldn't process any
		// results if the field no longer has focus
		hasFocus++;
	}).blur(function() {
		hasFocus = 0;
		if (!config.mouseDownOnSelect) {
			START_SELECT = false;
			hideResults();
		}
		if(temp != 0){
			if(tt == 0){
				type = 1;
				onChange(0, true);
				for(var a = 0; a < y; a++){
					$("#autocompleteDivId" + a).hide();
				}
			}
			temp = 0;
		}
		tt = 0;
	}).click(function() {
		tt = 1;
		temp=0;
		// show select when clicking in a focused field
		//实现点击出现下拉框
		onChange(0, true);
		if ( hasFocus++ > 1 && !select.visible() ) {
			//onChange(0, true);
		}
	}).mousedown(function(event){
		if(event.button == "2"){
			tt = 0;
			temp=1;
			type = 1;
			onChange(0, true);
			if ( hasFocus++ > 1 && !select.visible() ) {
				//onChange(0, true);
			}
		}
	}).bind("search", function() {
		// TODO why not just specifying both arguments?
		var fn = (arguments.length > 1) ? arguments[1] : null;
		function findValueCallback(q, data) {
			var result;
			if( data && data.length ) {
				for (var i=0; i < data.length; i++) {
					if( data[i].result.toLowerCase() == q.toLowerCase() ) {
						result = data[i];
						break;
					}
				}
			}
			if( typeof fn == "function" ) fn(result);
			else $input.trigger("result", result && [result.data, result.value]);
		}
		$.each(trimWords($input.val()), function(i, value) {
			request(value, findValueCallback, findValueCallback);
		});
	}).bind("flushCache", function() {
		cache.flush();
	}).bind("setOptions", function() {
		//如果填充值时没有设置max属性，则设置
		var tempData = arguments[1].data;
		if (tempData && !arguments[1].max)
		{
			arguments[1]["max"] = tempData.length;
		}
		$.extend(options, arguments[1]);
		// if we've updated the data, repopulate
		if ( "data" in arguments[1] )
			cache.populate();
	}).bind("input", function() {
        onChange(0,true);
    }).bind("unautocomplete", function() {
		select.unbind();
		$input.unbind();
		$(input.form).unbind(".autocomplete");
	});
	
	
	function selectCurrent(_cursorAt) 
	{
		var selected = select.selected();
		if( !selected )
			return false;
		
		var v = selected.result;
		previousValue = v;
		
		if ( options.multiple ) {
			var words = trimWords($input.val());
			if ( words.length > 1 ) {
				var seperator = options.multipleSeparator.length;
				//var cursorAt = $(input).selection().start;
				var cursorAt = _cursorAt ? _cursorAt : getCursorAt(input);
				var wordAt, progress = 0;
				$.each(words, function(i, word) {
					progress += word.length;
					if (cursorAt <= progress) {
						wordAt = i;
						return false;
					}
					progress += seperator;
				});
				//如果选择的值已经存在，则不添加
				if ($.inArray(v, words) > -1)
				{
					//如果光标的位置与当前要替换的位置不相同，则替换为空的
					if($.inArray(v, words) != wordAt)
					{
						words[wordAt] = "";
					}
				}
				else
				{
					words[wordAt] = v;
				}
				//过滤空在数组值
				words = $.map(words, function(n)
				{
					return n != "" ? n : null;
				});
				// TODO this should set the cursor to the right position, but it gets overriden somewhere
				//$.Autocompleter.Selection(input, progress + seperator, progress + seperator);
				v = words.join( options.multipleSeparator );
			}
			//如果最后一个字符是空，则不加分隔符
			if (v.substr(v.length - 1) != " ")
			{
				v += options.multipleSeparator;
			}
		}
		$input.val(v);
		hideResultsNow();
		$input.trigger("result", [selected.data, selected.value]);
		return true;
	}
	
	function onChange(crap, skipPrevCheck) 
	{
		if( lastKeyPressCode == KEY.DEL ) 
		{
			select.hide();
			return;
		}
		var currentValue = $input.val();
		
		if ( !skipPrevCheck && currentValue == previousValue )
			return;
		
		previousValue = currentValue;
		currentValue = $.trim(lastWord(currentValue));
		if ( currentValue.length >= options.minChars) 
		{
			$input.addClass(options.loadingClass);
			if (!options.matchCase)
			{
				currentValue = currentValue.toLowerCase();
			}	
			request(currentValue, receiveData, hideResultsNow);
		} 
		else 
		{
			stopLoading();
			select.hide();
		}
	};
	
	function trimWords(value) {
		if (!value)
			return [""];
		if (!options.multiple)
			return [$.trim(value)];
		return $.map(value.split(options.multipleSeparator), function(word) {
			return $.trim(value).length ? $.trim(word) : null;
		});
	}
	
	function lastWord(value) {
		if ( !options.multiple )
			return value;
		var words = trimWords(value);
		if (words.length == 1) 
			return words[0];
		//var cursorAt = $(input).selection().start;
		var cursorAt = getCursorAt(input);
		if (cursorAt == value.length) {
			words = trimWords(value)
		} else {
			words = trimWords(value.replace(value.substring(cursorAt), ""));
		}
		return words[words.length - 1];
	}
	
	// fills in the input box w/the first match (assumed to be the best match)
	// q: the term entered
	// sValue: the first matching result
	function autoFill(q, sValue){
		// autofill in the complete box w/the first match as long as the user hasn't entered in more data
		// if the last user key pressed was backspace, don't autofill
		if( options.autoFill && (lastWord($input.val()).toLowerCase() == q.toLowerCase()) && lastKeyPressCode != KEY.BACKSPACE ) {
			// fill in the value (keep the case the user has typed)
			$input.val($input.val() + sValue.substring(lastWord(previousValue).length));
			// select the portion of the value not typed by the user (so the next character will erase)
			$(input).selection(previousValue.length, previousValue.length + sValue.length);
		}
	};

	function hideResults() {
		clearTimeout(timeout);
		timeout = setTimeout(hideResultsNow, 200);
	};

	function hideResultsNow() {
		var wasVisible = select.visible();
		select.hide();
		clearTimeout(timeout);
		stopLoading();
		if (options.mustMatch) {
			// call search and run callback
			$input.search(
				function (result){
					// if no value found, clear the input box
					//判断是否提示信息，如果是则不清空 
					//修改时间：2013-9-24
					//修改人：d2392
					if( !result && $input.val() != "请选择承载开发的项目" && $input.val() != "请选择承载实施的项目") {
						if (options.multiple) {
							var words = trimWords($input.val()).slice(0, -1);
							$input.val( words.join(options.multipleSeparator) + (words.length ? options.multipleSeparator : "") );
						}
						else {
							$input.val( "" );
							$input.trigger("result", null);
						}
					}
				}
			);
		}
	};

	function receiveData(q, data) 
	{
		if (( data && data.length && hasFocus ) || type == 1) 
		{
			stopLoading();
			select.display(data, q);
			autoFill(q, data[0].value);
			var account = (data[0].data.ACCOUNT ? data[0].data.ACCOUNT : "");
			//如果输入的内容与展示的内容完全一致，则隐藏展示层，否则显示下拉层
			if (($.trim(q).toUpperCase() == $.trim(data[0].result).toUpperCase() ||
					 $.trim(q).toUpperCase() == $.trim(account).toUpperCase()) && data.length == 1 && $.trim(q) != "")
			{
				select.hide();
			}
			else
			{
				select.show();
			}
		} 
		else 
		{
			hideResultsNow();
		}
	};

	function request(term, success, failure) 
	{
		if (!options.matchCase)
			term = term.toLowerCase();
		var data = cache.load(term);
		// recieve the cached data
		if (data && data.length) {
			success(term, data);
		// if an AJAX url has been supplied, try loading the data now
		} 
		else if( (typeof options.url == "string") && (options.url.length > 0) )
		{
			var extraParams = {
				timestamp: +new Date()
			};
			$.each(options.extraParams, function(key, param) {
				extraParams[key] = typeof param == "function" ? param() : param;
			});
			$.ajax({
				// try to leverage ajaxQueue plugin to abort previous requests
				mode: "abort",
				type : "post", 
				// limit abortion to this input
				port: "autocomplete" + input.name,
				dataType: options.dataType,
				url: options.url,
				data: $.extend({
					q: lastWord(term),
					"paramName" : lastWord(term),
					limit: options.max
				}, extraParams),
				success: function(json) {
					//alert(JSON.stringify(json));
					var data = json.data;
					var parsed = options.parse && options.parse(data) || parse(data);
					cache.add(term, parsed);
					success(term, parsed);
				}
			});
		} 
		else 
		{
			// if we have a failure, we need to empty the list -- this prevents the the [TAB] key from selecting the last successful match
			select.emptyList();
			failure(term);
		}
	};
	
	function parse(data) {
		var parsed = [];
		var rows = data.split("\n");
		for (var i=0; i < rows.length; i++) {
			var row = $.trim(rows[i]);
			if (row) {
				row = row.split("|");
				parsed[parsed.length] = {
					data: row,
					value: row[0],
					result: options.formatResult && options.formatResult(row, row[0]) || row[0]
				};
			}
		}
		return parsed;
	};

	function stopLoading() {
		$input.removeClass(options.loadingClass);
	};
};

$.Autocompleter.defaults = {
	inputClass: "ac_input",
	resultsClass: "ac_results",
	loadingClass: "ac_loading",
	minChars: 1,
	delay: 400,
	matchCase: true,	// 把输入的值转换成小写传给后台做模糊查询，false：全部转换成小写；true：不转换
	matchSubset: true,
	matchContains: false,
	cacheLength: 10,
	max: 50,
	mustMatch: false,
	extraParams: {},
	selectFirst: true,
	formatItem: function(row) { return row[0]; },
	formatMatch: null,
	autoFill: false,
	width: 0,
	multiple: false,
	multipleSeparator: ", ",
	highlight: function(value, term) {
		//return value.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + term.replace(/([\^\$\(\)\[\]\{\}\*\.\+\?\|\\])/gi, "\\$1") + ")(?![^<>]*>)(?![^&;]+;)", "gi"), "<strong>$1</strong>");
		//替换<> lxk 2012-11-22
		return value ? value.replaceAll(">", "&gt;").replaceAll("<", "&lt;").replaceAll(">;", ">") : "";
	},
    scroll: true,
    scrollHeight: 180
};

$.Autocompleter.Cache = function(options) {

	var data = {};
	var length = 0;
	
	function matchSubset(s, sub) {
		if (!options.matchCase) 
			s = s.toLowerCase();
		var i = s.indexOf(sub);
		if (options.matchContains == "word"){
			i = s.toLowerCase().search("\\b" + sub.toLowerCase());
		}
		if (i == -1) return false;
		return i == 0 || options.matchContains;
	};
	
	function add(q, value) {
		if (length > options.cacheLength){
			flush();
		}
		if (!data[q]){ 
			length++;
		}
		data[q] = value;
	}
	
	function populate(){
		if( !options.data ) return false;
		// track the matches
		var stMatchSets = {},
			nullData = 0;

		// no url was specified, we need to adjust the cache length to make sure it fits the local data store
		if( !options.url ) options.cacheLength = 1;
		
		// track all options for minChars = 0
		stMatchSets[""] = [];
		
		// loop through the array and create a lookup structure
		for ( var i = 0, ol = options.data.length; i < ol; i++ ) {
			var rawValue = options.data[i];
			// if rawValue is a string, make an array otherwise just reference the array
			rawValue = (typeof rawValue == "string") ? [rawValue] : rawValue;
			
			var value = options.formatMatch(rawValue, i+1, options.data.length);
			if ( value === false )
				continue;
				
			var firstChar = value.charAt(0).toLowerCase();
			// if no lookup array for this character exists, look it up now
			if( !stMatchSets[firstChar] ) 
				stMatchSets[firstChar] = [];

			// if the match is a string
			var row = {
				value: value,
				data: rawValue,
				result: options.formatResult && options.formatResult(rawValue) || value
			};
			
			// push the current match into the set list
			stMatchSets[firstChar].push(row);

			// keep track of minChars zero items
			if ( nullData++ < options.max ) {
				stMatchSets[""].push(row);
			}
		};

		// add the data items to the cache
		$.each(stMatchSets, function(i, value) {
			//如果内容为空，则不添加
			if (value.length > 0)
			{
				// increase the cache size
				options.cacheLength++;
				// add to the cache
				add(i, value);
			}
		});
	}
	
	// populate any existing data
	setTimeout(populate, 25);
	
	function flush(){
		data = {};
		length = 0;
	}
	
	return {
		flush: flush,
		add: add,
		populate: populate,
		load: function(q) {
			if (!options.cacheLength || !length)
				return null;
			/* 
			 * if dealing w/local data and matchContains than we must make sure
			 * to loop through all the data collections looking for matches
			 */
			if( !options.url && options.matchContains ){
				// track all matches
				var csub = [];
				//如果没有输入任何信息，则不进行重新排序
				if (q == "")
				{
					return data[q];
				}
				// loop through all the data grids for matches
				for( var k in data ){
					// don't search through the stMatchSets[""] (minChars: 0) cache
					// this prevents duplicates
					if( k.length > 0 ){
						var c = data[k];
						$.each(c, function(i, x) {
							// if we've got a match, add it to the array
							if (matchSubset(x.value, q)) {
								csub.push(x);
							}
						});
					}
				}				
				return csub;
			} else 
			// if the exact item exists, use it
			if (data[q]){
				return data[q];
			} else
			if (options.matchSubset) {
				for (var i = q.length - 1; i >= options.minChars; i--) {
					var c = data[q.substr(0, i)];
					if (c) {
						var csub = [];
						$.each(c, function(i, x) {
							if (matchSubset(x.value, q)) {
								csub[csub.length] = x;
							}
						});
						return csub;
					}
				}
			}
			return null;
		}
	};
};

$.Autocompleter.Select = function (options, input, select, config) {
	var CLASSES = {
		ACTIVE: "ac_over"
	};
	
	var listItems,
		active = -1,
		data,
		term = "",
		needsInit = true,
		element,
		list;
	var _cursorAt1;
	// Create results
	function init() 
	{
		if (options.multiple)
		{
			//记录输入框当前光标的位置
			_cursorAt1 = getCursorAt(input);
		}
		START_SELECT = true;
		
		if (!needsInit)
			return;
		
		//修改人：马晓鹏
		//修改时间：2011-8-22
		//修改原因：jquery.autocomplete在IE6下被下拉框遮挡
		//element = $("<div/>")
		element = $("<div id='autocompleteDivId"+y+"'><iframe style='position: absolute; z-index: -1; width: 100%; height: auto; top: -1;left: 0; scrolling: no;' frameborder='0' src='about:blank'></iframe></div>")
		.blur(function()
		{
			START_SELECT = false;
			if (config.mouseDownOnSelect)
			{
				config.mouseDownOnSelect = false;
				input.focus();
				input.blur();
			}
		})
		.hide()
		.addClass(options.resultsClass)
		.css("position", "absolute")
		.appendTo(document.body);
		y++;
		list = $("<ul/>").appendTo(element).mouseover( function(event) {
			if(target(event).nodeName && target(event).nodeName.toUpperCase() == 'LI') {
	            active = $("li", list).removeClass(CLASSES.ACTIVE).index(target(event));
			    $(target(event)).addClass(CLASSES.ACTIVE);            
	        }
		}).click(function(event) {
			$(target(event)).addClass(CLASSES.ACTIVE);
			input.focus();
			select(_cursorAt1);
			// TODO provide option to avoid setting focus again after selection? useful for cleanup-on-focus
			input.focus();
			START_SELECT = false;
			return false;
		}).mousedown(function() {
			config.mouseDownOnSelect = true;
		}).mouseup(function() {
			config.mouseDownOnSelect = false;
		}).scroll(function(){
			tt = 1; 
           config.mouseDownOnSelect = false;
           input.focus();
           return false;		
		});
		
		if( options.width > 0 )
			element.css("width", options.width);
			
		needsInit = false;
	} 
	
	function target(event) {
		var element = event.target;
		while(element && element.tagName != "LI")
			element = element.parentNode;
		// more fun with IE, sometimes event.target is empty, just ignore it then
		if(!element)
			return [];
		return element;
	}

	function moveSelect(step) {
		listItems.slice(active, active + 1).removeClass(CLASSES.ACTIVE);
		movePosition(step);
        var activeItem = listItems.slice(active, active + 1).addClass(CLASSES.ACTIVE);
        if(options.scroll) {
            var offset = 0;
            listItems.slice(0, active).each(function() {
				offset += this.offsetHeight;
			});
            if((offset + activeItem[0].offsetHeight - list.scrollTop()) > list[0].clientHeight) {
                list.scrollTop(offset + activeItem[0].offsetHeight - list.innerHeight());
            } else if(offset < list.scrollTop()) {
                list.scrollTop(offset);
            }
        }
	};
	
	function movePosition(step) {
		active += step;
		if (active < 0) {
			active = listItems.size() - 1;
		} else if (active >= listItems.size()) {
			active = 0;
		}
	}
	
	function limitNumberOfItems(available) {
		return options.max && options.max < available
			? options.max
			: available;
	}
	var iy = 0;
	function fillList() {
		list.empty();
		var max = limitNumberOfItems(data.length);
		for (var i=0; i < max; i++) {
			if (!data[i])
				continue;
			var formatted = options.formatItem(data[i].data, i+1, max, data[i].value, term);
			iy++;
			if ( formatted === false )
				continue;
			var li = $("<li/>").html( options.highlight(formatted, term) ).addClass(i%2 == 0 ? "ac_even" : "ac_odd").appendTo(list)[0];
			$.data(li, "ac_data", data[i]);
		}
		listItems = list.find("li");
		if ( options.selectFirst ) {
			listItems.slice(0, 1).addClass(CLASSES.ACTIVE);
			active = 0;
		}
		// apply bgiframe if available
		if ( $.fn.bgiframe )
			list.bgiframe();
	}
	
	return {
		display: function(d, q) {
			init();
			data = d;
			term = q;
			fillList();
		},
		next: function() {
			moveSelect(1);
		},
		prev: function() {
			moveSelect(-1);
		},
		pageUp: function() {
			if (active != 0 && active - 8 < 0) {
				moveSelect( -active );
			} else {
				moveSelect(-8);
			}
		},
		pageDown: function() {
			if (active != listItems.size() - 1 && active + 8 > listItems.size()) {
				moveSelect( listItems.size() - 1 - active );
			} else {
				moveSelect(8);
			}
		},
		hide: function() {
			element && element.hide();
			listItems && listItems.removeClass(CLASSES.ACTIVE);
			active = -1;
		},
		visible : function() {
			return element && element.is(":visible");
		},
		current: function() {
			return this.visible() && (listItems.filter("." + CLASSES.ACTIVE)[0] || options.selectFirst && listItems[0]);
		},
		show: function() {
			var offset = $(input).offset();
			//获取元素下的高度
			var heightList=iy*20;
			if(heightList > 200){
				heightList = 200;
			}
//			var height = document.body.clientHeight-(offset.top + input.offsetHeight);
			var height = $(window).height() - (offset.top + input.offsetHeight);
			//修改人：聂俊中
			//修改时间：2012-9-6
			//修改原因：jquery.autocomplete向下显示不完全就向上显示
			element.css({
				width: typeof options.width == "string" || options.width > 0 ? options.width : $(input).width(),
				top: offset.top + input.offsetHeight - 1,
				left: offset.left
			}).show();
			/*if(height > options.scrollHeight){
				element.css({
					width: typeof options.width == "string" || options.width > 0 ? options.width : $(input).width(),
					top: offset.top + input.offsetHeight - 1,
					left: offset.left
				}).show();
			}else{
				element.css({
					width: typeof options.width == "string" || options.width > 0 ? options.width : $(input).width(),
					top:  offset.top - heightList,
					left: offset.left
				}).show();
				heightList = 0;
			}*/
			iy = 0;
            if(options.scroll) {
                list.scrollTop(0);
                list.css({
					maxHeight: options.scrollHeight,
					overflow: 'auto'
				});
				
                //if($.browser.msie && typeof document.body.style.maxHeight === "undefined") {
				if(navigator.userAgent.match("MSIE") && ((typeof document.body.style.maxHeight === "undefined") || (document.body.style.maxHeight == '')))  
				{
					var listHeight = 0;
					listItems.each(function() {
						listHeight += this.offsetHeight;
					});
					var scrollbarsVisible = listHeight > options.scrollHeight;
                    list.css('height', scrollbarsVisible ? options.scrollHeight : listHeight );
					if (!scrollbarsVisible) {
						// IE doesn't recalculate width when scrollbar disappears
						listItems.width( list.width() - parseInt(listItems.css("padding-left")) - parseInt(listItems.css("padding-right")) );
					}
                }
                
            }
		},
		selected: function() {
			var selected = listItems && listItems.filter("." + CLASSES.ACTIVE).removeClass(CLASSES.ACTIVE);
			return selected && selected.length && $.data(selected[0], "ac_data");
		},
		emptyList: function (){
			list && list.empty();
		},
		unbind: function() {
			element && element.remove();
		}
	};
};

$.fn.selection = function(start, end) {
	if (start !== undefined) {
		return this.each(function() {
			if( this.createTextRange ){
				var selRange = this.createTextRange();
				if (end === undefined || start == end) {
					selRange.move("character", start);
					selRange.select();
				} else {
					selRange.collapse(true);
					selRange.moveStart("character", start);
					selRange.moveEnd("character", end);
					selRange.select();
				}
			} else if( this.setSelectionRange ){
				this.setSelectionRange(start, end);
			} else if( this.selectionStart ){
				this.selectionStart = start;
				this.selectionEnd = end;
			}
		});
	}
	var field = this[0];
	if ( field.createTextRange ) 
	{
		var range = document.selection.createRange(),
			orig = field.value,
			teststring = "<->",
			textLength = range.text.length;
		range.text = teststring;
		var caretAt = field.value.indexOf(teststring);
		field.value = orig;
		this.selection(caretAt, caretAt + textLength);
		return {
			start: caretAt,
			end: caretAt + textLength
		}
	} else if( field.selectionStart !== undefined ){
		return {
			start: field.selectionStart,
			end: field.selectionEnd
		}
	}
};

$.fn.selection2 = function()
{
	var s,e,range,stored_range;
	if(this[0].selectionStart == undefined)
	{  
		var selection=document.selection;  
		if (this[0].tagName.toLowerCase() != "textarea") 
		{  
			var val = this.val(),  
			range = selection.createRange().duplicate();
			range.moveEnd("character", val.length);
			s = (range.text == "" ? val.length:val.lastIndexOf(range.text));
			range = selection.createRange().duplicate();
			range.moveStart("character", -val.length);
			e = range.text.length;
		}
		else
		{
			range = selection.createRange();
			stored_range = range.duplicate();
			stored_range.moveToElementText(this[0]);
			stored_range.setEndPoint('EndToEnd', range);
			s = stored_range.text.length - range.text.length;
			e = s + range.text.length;
		}
	}
	else
	{
		s=this[0].selectionStart;
		e=this[0].selectionEnd;
	}
	var te=this[0].value.substring(s,e); 
	return {start:s, end:e, text:te}
};  

})(jQuery);