/**
 * [StarFold 折叠面板]
 * @param {[type]} obj      [折叠面板]
 * @param {[type]} speed    [折叠速度]
 * @param {[type]} obj_type [展示方式：（1：只打开一个，可以全部关闭；2：必须有一个打开；3：可打开多个）]
 * @param {[type]} Event    [触发折叠事件（click/mouseover）]
 */
jQuery.starFold = function(obj, speed, obj_type, Event) {
    var $b = $("<b>+</b>");
    var $item = $(obj).find(".item");
    var $item_title = $item.find(".star-panel-header");
    $item_title.append($b);
    
    $item.filter(".selected").find(".star-panel-header b").html("-");
    $item.filter(".selected").find(".star-panel-header").next().show();

    var $visItem = $item.find(".star-panel-body:visible");
    if (obj_type == 1) {
        if ($visItem.length>1) {
            var $notFirst = $visItem.not($visItem[0]).parent();
            $.each($notFirst, function(i, n){
                $(n).find(".star-panel-header b").html("+");
                $(n).find(".star-panel-header").removeClass("selected").next().hide();
            });
        }
    }else if(obj_type == 2){
        if ($visItem.length>1) {
            var $notFirst = $visItem.not($visItem[0]).parent();
            $.each($notFirst, function(i, n){
                $(n).find(".star-panel-header b").html("+");
                $(n).find(".star-panel-header").removeClass("selected").next().hide();
            });
        }else if ($visItem.length<=0){
            $item_title.first().find("b").html("-");
            $item_title.first().next().show();
        }
    }
    $item_title.bind(Event, function() {
        if ($(this).next().is(":visible")) {
            if (obj_type == 2) {
                return false;
            } else {
                $(this).next().slideUp(speed).end().removeClass("selected");
                $(this).find("b").html("+");
            }
        } else {
            if (obj_type == 3) {
                $(this).next().slideDown(speed).end().addClass("selected");
                $(this).find("b").html("-");
            } else {
                $item.find(".star-panel-body").slideUp(speed);
                $(obj).removeClass("selected");
                $(obj).find("b").html("+");
                $(this).next().slideDown(speed).end().addClass("selected");
                $(this).find("b").html("-");
            }
        }
    });
}
