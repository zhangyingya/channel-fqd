;
(function() {
    var SimpleTab = function(ele, opt) {
        this.$ele = ele;

        this.def = {
            "change": function($tabItem) {
                
            }
        };

        this.options = $.extend({}, this.def, opt);
    };

    SimpleTab.prototype = {
        // 初始化分页
        _init: function() {
            this.$tabs = this.$ele.find("ul.star-simple-tab-title li");
            var $selectedTab = this.$tabs.hasClass("selected");
            if($selectedTab.length > 0){
            	$selectedTab = $selectedTab.eq(0);
            }else{
            	$selectedTab = this.$tabs.eq(0);
            	$selectedTab.addClass("selected");
            }
            var selectedIndex = this.$tabs.index($selectedTab);
            this.$tabItems = this.$ele.find(".star-simple-tab-content .star-simple-tab-item");
            this.$tabItems.hide();

            this.$tabItems.eq(selectedIndex).show();

            this._bindTabEvent();
        },
        _bindTabEvent: function(){
        	var then = this;
        	this.$tabs.bind("click", function(){
        		var $this = $(this);
        		then.$tabs.removeClass("selected");
        		$this.addClass("selected");
        		var selectedIndex = then.$tabs.index($this);

        		then.$tabItems.hide();
        		then.$tabItems.eq(selectedIndex).show();

                if (then.options.change && typeof(then.options.change) == "function") {
                    then.options.change($this);
                }
        	});
        }
    };

    $.fn.simpleTab = function(opt) {
        var simpleTab = new SimpleTab($(this), opt);
        simpleTab._init();
        return simpleTab;
    };

    
})(jQuery, window, document);