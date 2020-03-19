/**
 * Created by 136891 on 2015/9/20.
 */
$.fn.extend({
    searchWithPage:function(confObj){
        var defaults = {
            totalCount: 0,  // 总记录数
            totalPage: 1,   // 总分页数
            pageSize: 10,    // 分页大小
            curPage: 1,     // 当前页
            containerClass: "pageContainer",// 分页容器样式
            normalClass: "",       // 普通按钮样式
            currentClass: "current",    // 当前按钮样式
            showOnLessTwoPage: false,   // 当总页数小于2的时候是否显示
            needLeader: true,// 引导文字
            showMsgFunc: "",    // 提示方法
            needInitSearchData: true,   // 初始化时是否需要搜索数据
            needNumBtn: true,   // 是否需要数字按钮
            // 上一页
            needPre: true,      // 是否需要显示上一页
            preClass: 'goup',   // 上一页按钮样式
            preTxt: '上一页',  // 上一页按钮文字
            // 下一页
            needNext: true,     // 是否显示下一页
            nextClass: 'godown',    // 下一页按钮样式
            nextTxt: '下一页',     // 下一页按钮文字
            templateId: "_tablePageBtns",   // 分页按钮列表模板ID
            needGotoInput: true,        // 是否需要调整表单
            isGoto: false,          // 当前分页操作是否通过表单跳转
            needGotoPageMsg: "请先填写要跳转的目标页！",    // 提示输入指定页
            gotoPageLgMsg: "指定的页码不存在！",   // 指定页大于总页数提示信息
            needPageSizeList: true,     // 是否需要分页大小选择器
            pageSizeList: [10, 15, 20, 30, 50], // 分页大小选择器列表
            searchFunc: "", // 分页搜索数据的方法
            filters: {},    // 搜索条件
            showDatas: ""   // 搜索请求的结果展示
        };
        var setting = $.extend({}, defaults, confObj);
        var retResults = [];
        var hasRecords = false;
        var eleObj = this;
        var needSearch = setting.needInitSearchData;
        searchDatas();

        /**
         * 搜索数据的方法
         */
        function searchDatas(needEmpty) {
            // 是否需要清空上一次操作的分页按钮展示
            if(typeof needEmpty == 'undefined') {
                needEmpty = false;
            }
            if(setting.searchFunc && needSearch) {
                retResults = setting.searchFunc(setting.filters);
                setting.pageSize = setting.filters.pageSize;
                setting.curPage = setting.filters.curPage;
                setting.filters.totalCount = retResults.totalCount;
                setting.totalCount = retResults.totalCount;
                hasRecords = retResults.totalCount;
            }
            if(setting.showDatas) {
                setting.showDatas(retResults);
            }
            renderPageHtml(needEmpty);
        }

        /**
         * 生成分页按钮
         * @returns {Array}
         */
        function makePageBtns() {
            setting.totalPage = Math.ceil(setting.totalCount / setting.pageSize);
            var pageBtns = [];
            // 上一页
            if(setting.needPre) {
                var preBtn = {
                    className: setting.preClass,
                    pageNum: parseInt(setting.curPage) - 1,
                    pageTxt: setting.preTxt
                };
                pageBtns.push(preBtn);
            }
            // 数字按钮
            if(setting.needNumBtn) {
                var startPage = setting.totalPage > 5 ? (setting.curPage < 3 ? 1 : setting.curPage - 2) : 1;
                var endPage = startPage + 4 > setting.totalPage ? setting.totalPage : startPage + 4;
                for(var pindex = startPage; pindex <= endPage; pindex++) {
                    var pageBtn = {
                        className: setting.normalClass,
                        pageNum: pindex,
                        pageTxt: pindex
                    };
                    if(pindex == setting.curPage) {
                        pageBtn.className = setting.currentClass;
                    }
                    pageBtns.push(pageBtn);
                }
            }
            // 下一页
            if(setting.needNext) {
                var nextBtn = {
                    className: setting.nextClass,
                    pageNum: parseInt(setting.curPage) + 1,
                    pageTxt: setting.nextTxt
                };
                pageBtns.push(nextBtn);
            }
            return pageBtns;
        }

        /**
         * 弹出提示信息
         * @param text
         */
        function alertInfoMsg(text) {
            if(setting.showMsgFunc) {
                setting.showMsgFunc(text);
            } else {
                alert(text);
            }
        }

        /**
         * 渲染分页按钮到模板
         * @param page
         */
        function renewPage(page) {
            if(typeof page == 'undefined') {
                page = 1;
            }
            if(setting.searchFunc) {
                setting.curPage = page;
                setting.filters.curPage = page;
                searchDatas(true);
            }
        }

        /**
         * 展示分页按钮
         * @param needEmpty
         */
        function renderPageHtml(needEmpty) {
            var btns = makePageBtns();
            if(typeof needEmpty == "undefined") {
                needEmpty = false;
            }
            if(needEmpty) {
                eleObj.html("");
            }
            if(setting.showOnLessTwoPage && setting.totalPage < 2 ) {
                eleObj.html("");
                return false;
            }
            var containerObj = $("<div class='form-inline'>");
            if(setting.containerClass) {
                containerObj.addClass(setting.containerClass);
            }
            // 分页引导
            if(setting.needLeader) {
                var leadObj = $("<div class='page-leader'>");
                leadObj.html("共<span>"+setting.totalCount+"条，第" + setting.curPage + "/" + setting.totalPage + "页</span>");
                containerObj.append(leadObj);
            }
            var mainObj = $("<div class='page-main'>");
            var btnsContainerObj = $("<ul class='btn-group btn-group-sm page-btn-list' >");
            for( var bkey in btns ) {
                var pageBtn = btns[bkey];
                var btnObj;
                var lastKey = btns.length - 1;
                if(bkey == 0) {
                    btnObj = $("<li class='"+pageBtn.className+"' data-page='"+pageBtn.pageNum+"' id='prevPage'>");
                } else if(bkey == lastKey) {
                    btnObj = $("<li class='"+pageBtn.className+"' data-page='"+pageBtn.pageNum+"' id='nextPage'>");
                } else {
                    btnObj = $("<li class='"+pageBtn.className+"' data-page='"+pageBtn.pageNum+"'>");
                }
                btnObj.on("click", function() {
                    var toPage = parseInt($(this).attr("data-page"));
                    if(toPage > 0 && toPage <= setting.totalPage) {
                        renewPage(toPage);
                    }
                });
                btnObj.html(pageBtn.pageTxt);
                btnsContainerObj.append(btnObj);
            }
            mainObj.append(btnsContainerObj);
            containerObj.append(mainObj);
            if(setting.needGotoInput) {
                var gotoObj = $("<div class='goto'>");
                var gotoInputObj = $("<input type='text' class='page-input-h30 toPage bgGray1' size='3'>");
                if(setting.isGoto) {
                    gotoInputObj.val(setting.curPage);
                }

                var gotoBtnObj = $("<div  class='btn btn-sm btn-primary'>&nbsp;&nbsp;确定&nbsp;&nbsp;</div>");
                gotoBtnObj.on('click', function() {
                    var toPage = parseInt($(this).prev(".toPage").val());
                    if(!toPage) {
                        alertInfoMsg(setting.needGotoPageMsg);
                    } else if(toPage > setting.totalPage) {
                        alertInfoMsg(setting.gotoPageLgMsg);
                    } else if(toPage < 1) {
                        alertInfoMsg("目标页不能小于1");
                    } else {
                        setting.isGoto = true;
                        renewPage(toPage);
                    }
                });
                gotoObj.append(gotoInputObj);
                gotoInputObj.before("去&nbsp;&nbsp;");
                gotoInputObj.after("&nbsp;&nbsp;页&nbsp;&nbsp;&nbsp;");
                gotoObj.append(gotoBtnObj);
                containerObj.append(gotoObj);
            }
            // 分页大小信息
            if(setting.needPageSizeList) {
                var pageSizeContainerObj = $("<div class='page-size-list' style='float: left;margin-left:26px;'>");
                var pageSizeListObj = $("<select class='form-control page-size' value='"+setting.pageSize+"'>");
                for( skey in setting.pageSizeList) {
                    var size = setting.pageSizeList[skey];
                    var pageSizeObj = $("<option value='"+size+"'>"+size+"</option>");
                    if(size == setting.pageSize) {
                        pageSizeObj.attr("selected", "selected");
                    }
                    pageSizeObj.html(size);
                    pageSizeListObj.append(pageSizeObj);
                }
                pageSizeListObj.on("change", function() {
                    var pageSize = $(this).val();
                    if(pageSize) {
                        setting.curPage = 1;
                        setting.filters.curPage = 1;
                        setting.pageSize = pageSize;
                        setting.filters.pageSize = pageSize;
                        renewPage();
                    }
                });
                pageSizeContainerObj.append(pageSizeListObj);
                pageSizeListObj.before("每页&nbsp;&nbsp;");
                pageSizeListObj.after("&nbsp;&nbsp;条记录");
                containerObj.append(pageSizeContainerObj);
            }
            eleObj.html(containerObj);
        }

        return {
            researchWithNewFilter: function(newFilter) {
                if(!needSearch) {
                    needSearch = true;
                }
                setting.filters = newFilter;
                searchDatas(true);
            },
            hasRecord: function() {
                return hasRecords;
            }
        };
    }
});