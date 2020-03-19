$(function(){
	 $(function(){
        /*低jQuery版本不支持on方法*/
        // $(".checkbox-base").on("click",function(){
        //     if($(this).hasClass("checked")){
        //         $(this).removeClass("checked");
        //         $(this).find("input").attr("checked","");
        //         var groupName = $(this).attr("name");
        //         $("#all[name=" + groupName +"]").removeClass("checked");
        //         $("#all[name=" + groupName +"]").find("input").attr("checked","");
        //     }else{
        //         $(this).addClass("checked");
        //         $(this).find("input").attr("checked","checked");
        //     }
        // });
        // $("#allCheckbox").on("click",function(){
        //     var groupName = $(this).attr("name");
        //     if($(this).hasClass("checked")){
        //         $(".checkbox-base[name=" + groupName +"]").addClass("checked");
        //         $(".checkbox-base[name=" + groupName +"]").find("input").attr("checked","checked");
        //     }else{
        //         $(".checkbox-base[name=" + groupName +"]").removeClass("checked");
        //         $(".checkbox-base[name=" + groupName +"]").find("input").attr("checked","");
        //     }
        // });
        // $(".search-more").click(function(){
        //     $(this).parent().siblings(".search-hide").slideToggle(200);
        //     $(this).toggleClass("down");
        //     $(this).find("span").each(function(){
        //         $(this).toggleClass("hide");
        //     });
        // });
        
        // $(document).on("click",".radio-base",function(){
        //     var name = $(this).find("input").attr("name");
        //     $(".radio-base").each(function(){
        //         var eachName = $(this).find("input").attr("name");
        //         if(name == eachName){
        //             $(this).removeClass("checked");
        //             $(this).find("input").attr("checked","");
        //         }
        //     });
        //     $(this).addClass("checked");
        //     $(this).find("input").attr("checked","checked");
        // });
    });
});
/**
 * [自定义复选框单选事件]
 * @param  {[type]} obj   [复选框对象]
 * @param  {[type]} allId [全选对象ID]
 * @return {[type]}       
 */
function singleCheck(obj,allId){
    if($(obj).hasClass("checked")){
        $(obj).removeClass("checked");
        $(obj).find("input").attr("checked","");
        /*依靠name属性区分分组*/
        var groupName = $(obj).attr("name");
        if(allId == undefined){
            allId = "allCheckbox";
        }
        else{
            allId = allId; 
        }
        /*置空全选*/
        var selector = "#" + allId + "[name=" + groupName +"]";
        $(selector).removeClass("checked");
        $(selector).find("input").attr("checked","");
    }else{
        $(obj).addClass("checked");
        $(obj).find("input").attr("checked","checked");
    }
}
/**
 * [自定义复选框全选事件]
 * @param  {[type]} obj [全选对象]
 * @return {[type]}     
 */
function allCheck(obj){
    var groupName = $(obj).attr("name");
    singleCheck(obj);
    if($(obj).hasClass("checked")){
        $(".checkbox-base[name=" + groupName +"]").addClass("checked");
        $(".checkbox-base[name=" + groupName +"]").find("input").attr("checked","checked");
    }else{
        $(".checkbox-base[name=" + groupName +"]").removeClass("checked");
        $(".checkbox-base[name=" + groupName +"]").find("input").attr("checked","");
    }
}
/**
 * [查看更多搜索条件]
 * @param  {[type]} obj        [当前对象]
 * @param  {[type]} tableId    [要调整高度的table id]
 * @param  {[type]} leftWidth  [description]
 * @param  {[type]} rightWidth [description]
 * @return {[type]}            [description]
 */
function moreSearch (obj,tableId,leftWidth,rightWidth){
    $(obj).parent().siblings(".search-hide").slideToggle(200,function(){
        if(tableId && tableId != undefined &&tableId != null ){
            var tableObj = $(tableId);
            /*调整table*/
            Dic.table.resizeTable(tableObj,leftWidth,rightWidth);
        }
    });
    $(obj).toggleClass("down");
    $(obj).find("span").each(function(){
        $(this).toggleClass("hide");
    });
    
}