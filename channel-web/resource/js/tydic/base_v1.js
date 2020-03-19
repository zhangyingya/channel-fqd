/**
 * 2013.3.5
 *  刘超
 *
 */

/**
 * GUID生成工具
 *
 * @type UUID
 * @class UUID
 */
var UUID = {
    S4 : function() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    },
    /**
     * 生成32位GUID,速度慢
     *
     * @return {}
     */
    randomUUID : function() {

        return (UUID.S4() + UUID.S4() + "-" + UUID.S4() + "-" + UUID.S4() + "-"
                + UUID.S4() + "-" + UUID.S4() + UUID.S4() + UUID.S4());
    },
    d : new Date().getTime() + "_" + Math.random().toString().replace('.', '_')
            + "_",
    c : 0,
    /**
     * 生成客户端唯一ID,速度快
     *
     * @return {}
     */
    cID : function() {
        ++UUID.c;
        return 'cid_' + UUID.d + UUID.c;
    }
};

/**
 * 字符处理对象
 *
 * @class StringBuffer
 */
function StringBuffer() {
    this._strings_ = [];
};
/**
 * 添加string
 *
 * @param {string}
 *            str
 */
StringBuffer.prototype.append = function(str) {
    this._strings_.push(str);
};
/**
 * 返回字符处理结果
 *
 * @return {string} 字符
 */
StringBuffer.prototype.toString = function(split) {
    if (split == null)
        split = '';
    return this._strings_.join(split);
};
/**
 * @return {}
 */
String.prototype.Trim = function() {
    return this.replace(/(^\s*)|(\s*$)/g, "");
};
/**
 * @param {}
 *            rename
 * @param {}
 *            edname
 * @return {}
 */
String.prototype.replaceall = function(rename, edname) {
    var ret = this;
    if (edname == null)
        edname = '';
    ret = ret.replace(rename, edname);

    while (ret.indexOf(rename) >= 0) {
        ret = ret.replace(rename, edname);
    }
    return ret;
};

/**
 * hashtable 哈希表
 *
 * @class hashtable
 */
var hashtable = function() {
    this.keys = {};
};
/**
 * 检验是否包含指定key
 *
 * @param {object}
 *            key
 * @return {Boolean} 检验结果
 */
hashtable.prototype.contains = function(key) {
    if (this.count == 0)
        return false;
    return this.keys.hasOwnProperty(key);
};
/**
 * 包含的key value对数量
 *
 * @type Number
 */
hashtable.prototype.count = 0;
/**
 * 添加一个key value对
 *
 * @param {}
 *            key
 * @param {}
 *            value
 */
hashtable.prototype.add = function(key, value) {
    if (this.contains(key))
        return;
    this.keys[key] = value;
    this.count++;
};

/**
 * 根据key获取value
 *
 * @param {}
 *            key
 * @return {}
 */
hashtable.prototype.getvalue = function(key) {
    return this.keys[key];
};

/**
 * 根据key替换指定的value
 *
 * @param {}
 *            key
 * @param {}
 *            newvalue
 */
hashtable.prototype.replace = function(key, newvalue) {
    if (this.contains(key))
        this.keys[key] = newvalue;
};

/**
 * 根据key删除key value对
 *
 * @param {}
 *            key
 */
hashtable.prototype.remove = function(key) {
    this.keys[key] = null;
    delete this.keys[key];
    this.count--;
};

/**
 * 清除所有项
 */
hashtable.prototype.clear = function() {
    this.keys = null;
    this.keys = {};
    this.count = 0;
};
/**
 * 复制
 *
 * @return {} hashtable对象
 */
hashtable.prototype.clone = function() {
    var _keys = this.keys;
    var ret = new hashtable();
    for ( var k in _keys) {
        ret.add(k, this.getvalue(k));
    }
    return ret;
};
var Dic = {};


/**
 *@desc check array
 * 将选中的ID存放到数组，
 * dom再次渲染时，判断数组是否包含，
 * 如果有默认选中
 * 
 */
Dic.checkData = {};
Dic.curSel = [];
Dic.curArray = [];

/**
 * Dic注册事件
 *
 * @param {}
 *            element 事件对象
 * @param {}
 *            type 事件类型
 * @param {}
 *            fun 调用方法
 * @param {}
 *            args 参数集合
 * @param {}
 *            domain 作用域
 */
Dic.addEvent = function(element, type, fun, args, domain) {
    if (!domain)
        domain = null;
    element.bind(type, function(arg) {
        fun.call(domain, arg, args);
    });
};

/**
 * 验证是否为空
 */
Dic.isEmptyObject = function(obj) {
    for ( var name in obj) {
        return false;
    }
    return true;
};
/**
 * 复制
 */
Dic.clone = function(arg) {
    var ret = new Object();
    for ( var p in arg) {
        ret[p] = arg[p];
    }
    return ret;
};

/**
 * 获取数据
 *
 * @param {}
 *            pageObj 事件对象
 *
 * @return {} Object对象
 */
Dic.getData = function(pageObj) {
    var pageData = pageObj.serializeArray();
    var obj = {};
    for ( var index = 0; index < pageData.length; index++) {
        var p = pageData[index];
        if(obj[p["name"]])
            obj[p["name"]] =obj[p["name"]]+","+ p["value"];
        else
            obj[p["name"]] =p["value"];
    }
    return obj;
};

/**
 * 获取对象的属性集合
 *
 * @param {}
 *            elsObj 事件对象
 * @param {}
 *            attrName 要获取属性数组
 * @param {}
 *            key 默认的元素key值
 *
 * @return {} Object对象
 *
 */
Dic.getAttrData = function(elsObj, attrName, key, elarray) {
    var elArray = elarray || {};
    if (!elsObj && !attrObj)
        return;
    var elobj = elsObj
            .find("input[type=text]:visible,input[type=hidden],input[type=radio]:visible,input[type=checkbox]:visible,select:visible,textarea");
    var k = key || "id";
    attrName = attrName || "";
    for ( var int = 0; int < elobj.length; int++) {
        var element = $(elobj[int]);
        var att = element.attr(k);
        var type = element.attr("type");
        if ((type === "radio" || type === "checkbox") && !att
                && !element.attr("checked"))
            continue;
        var attrVal = Dic.getAttrObject(element, attrName);
        var val = elArray[att];
        if (val)
            elArray[att].push(attrVal);
        else {
            elArray[att] = [ attrVal ];
        }
    }
    return elArray;
};

/**
 * 获取对象的属性集合
 *
 * @param {}
 *            element 事件对象
 * @param {}
 *            attrName 要获取属性数组
 *
 * @return {} Object对象
 *
 */
Dic.getAttrObject = function(element, attrName) {
    var attrObj = {};
    for ( var int = 0; int < attrName.length; int++) {
        attrObj[attrName[int]] = element.attr(attrName[int]);
    }
    attrObj["value"] = element.val();
    return attrObj;
};

/**
 * 根据值删除数组成员
 */
Dic.ArrayRemoveByValue = function(arr, val)
{
    for(var i=0; i<arr.length; i++)
    {
       if(arr[i] == val) {
        arr.splice(i, 1);
         break;
        }
    }
};

/**
 * 设置数据、目前只做了input的设置
 */
Dic.setData = function(pageObj, data, attrName) {
    if (!pageObj || !data)
        return;
    var input = pageObj
            .find("input[type=text],input[type=hidden],input[type=radio],input[type=checkbox],select,textarea");
    for ( var int = 0; int < input.length; int++) {
        var input_element = $(input[int]);
        var v = data[input_element.attr((attrName || "id"))] || null;
        if (v)
            input_element.val(v);
    }
};

/**
 * 异步提交表单时，获取表单数据（适合含有table数据） 多个相同的变量名不同值的区分
 *
 * @param {}
 *            element 事件对象
 * @param {}
 *            splitType 区分分隔符
 */
Dic.getTableData = function(pageObj, splitType) {
    var pageData = pageObj.serializeArray();
    var obj = {};
    for ( var index = 0; index < pageData.length; index++) {
        var p = pageData[index];
        if (null == obj[p["name"]] || 'undefined' == obj[p["name"]]) {
            obj[p["name"]] = p["value"];
        } else {
            obj[p["name"]] = obj[p["name"]] + splitType + p["value"];
        }
    }
    return obj;
};

Dic.Url = {};
Dic.Url.getpar = function() {
    var url = location.href;
    return url.substring(url.indexOf("?") + 1, url.length);
};
Dic.Url.getParams = function(paras) {
    var paraString = Dic.Url.getpar().split("&");
    var paraObj = {};
    for ( var i = 0; j = paraString[i]; i++) {
        paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j
                .indexOf("=") + 1, j.length);
    }
    if (paras == null)
        return paraObj;
    var returnValue = paraObj[paras.toLowerCase()];
    if (typeof (returnValue) == "undefined") {
        return "";
    } else {
        return returnValue.replace(/#/g, "");
    }
};

/**
 * 处理form所有text文本框中字符串的前后空格 num:指定的那个form位置，从0开始计算
 */
Dic.trim = function(num) {
    if (num == null) {
        num = 0;
    }
    var frm = document.forms[num];
    var els = frm.elements;
    for ( var i = 0; i < els.length; i++) {
        if (els[i].type == 'text') {
            els[i].value = els[i].value.replace(/(^\s*)|(\s*$)/g, '');
        }
    }
};

Dic.Ajax = {};
Dic.Ajax.request = function(ops) {
    var dataObj = null;
    if (typeof ops["data"] == "undefined") {
        ops["data"] = {};
    }
    ops["data"].loginId= localStorage.getItem('loginId');
    ops["data"].token= localStorage.getItem('token');
    $.ajax({
        url : ops["url"],
        type : 'POST',
        async : false,
        cache : false,
        data : ops["data"],
        dataType : ops["dataType"]||'html',
        timeout : 6000000,
        error : function() {
            alert('获取数据失败!');
        },
        success : function(result) {
            if(result.resultCode=='160104'){
                //token过期返回登录页面
                localStorage.removeItem('loginId');
                localStorage.removeItem('token');
                window.top.location.href = getRootPath()+'/login.html';
            }else{
                dataObj = $.parseJSON(result);
            }
        }
    });

    return dataObj;

};
Dic.Ajax.requestToContenTypeJson = function(ops) {
    var dataObj = null;
    if (typeof ops["data"] == "undefined") {
        ops["data"] = {};
    }
    ops["data"].loginId= localStorage.getItem('loginId');
    ops["data"].token= localStorage.getItem('token');
    $.ajax({
        url : ops["url"],
        type : 'POST',
        async : false,
        cache : false,
        data : ops["data"],
        dataType : 'json',
        contentType: 'application/json',
        timeout : 60000,
        success : function(result) {
            if(result.resultCode=='160104'){
                //token过期返回登录页面
                localStorage.removeItem('loginId');
                localStorage.removeItem('token');
                window.location.href = getRootPath()+'/login.html';
            }else{
                dataObj = result;
            }
        }
    });
    return dataObj;

}
/**
 * ajax异步请求、并产生全局遮罩层
 * @param ops
 * @returns {*}
 */
Dic.Ajax.requestDeferredMaskLayer = function(ops) {

    var defer = $.Deferred();
    $.ajax({
        type: "post",
        dataType : 'json',
        url: ops["url"],
        data: ops["data"],
        timeout : 60000,
        cache : false,
        beforeSend:function(){
            $("body").mLoading("show");
        },
        success: function (data) {
            defer.resolve(data);
            $("body").mLoading("hide");
        },
        error : function() {
            $("body").mLoading("hide");
            return false;
        }
    });
    return defer.promise();
};

/**
 * ajax异步请求、并产生局部遮罩层
 * @param ops
 * @returns {*}
 */
Dic.Ajax.requestDeferredMaskLayerPart = function(ops,maskObj) {
    var defer = $.Deferred();
    $.ajax({
        type: "post",
        dataType : 'json',
        url: ops["url"],
        data: ops["data"],
        timeout : 60000,
        cache : false,
        beforeSend:function(){
            if($(maskObj)!=null&&$(maskObj)!=undefined)
            {
                $(maskObj).mLoading("show");
            }
        },
        success: function (data) {
            defer.resolve(data);
            if($(maskObj)!=null&&$(maskObj)!=undefined) {
                $(maskObj).mLoading("hide");
            }
        },
        error : function() {
            if($(maskObj)!=null&&$(maskObj)!=undefined) {
                $(maskObj).mLoading("hide");
            }
            return false;
        }
    });
    return defer.promise();
};
/**
 * ajax异步请求
 * @param ops
 * @returns {*}
 */
Dic.Ajax.requestDeferred = function(ops) {
    var defer = $.Deferred();
    $.ajax({
        type: "post",
        dataType : 'json',
        url: ops["url"],
        data: ops["data"],
        timeout : 60000,
        cache : false,
        beforeSend:function(){
        },
        success: function (data) {
            defer.resolve(data);
        },
        error : function() {
            return false;
        }
    });
    return defer.promise();
};

/**
 * 树
 *
 * @type
 */
Dic.Tree = {};

Dic.Tree.html = " <LI init=false id=@id  _value=@value _value1=@value1 _value2=@value2 _value3=@value3 > <a class='tree_item_pre'><label class='tree_child'></label><div @icon ></div><input type='checkbox' @checked ></a><a href='javascript:void(0)' class='tree_item_title'>@text</a><!--childs--></LI>";
Dic.Tree.html1 = "<LI init=false id=@id  _value=@value _value1=@value1 _value2=@value2 _value3=@value3>  <a class='tree_item_pre'><label class='tree_child'></label><div @icon ></div></a><a href='javascript:void(0)' class='tree_item_title'>@text</a><!--childs--></LI>";

/**
 * 初始化树事件
 *
 * @param {}
 *            element
 */
Dic.Tree.InitEvent = function(element) {
    var init = element.attr("InitEvent");
    if (init == "true") {
        return;
    }
    element.attr("InitEvent", "true");
    Dic.addEvent(element, "click", Dic.Tree.Events, element);

};

/**
 * Tree事件集合对象
 *
 * @param {}
 *            element 事件参数
 * @param {}
 *            arg 事件内部对象
 */
Dic.Tree.Events = function(arg, element) {
    var type = arg.type;
    var taget = arg.target;
    if (type == "click") {
        var name = taget.tagName;
        var item = $(taget).parents("LI:first");
        if (name == "LABEL") {
            Dic.Tree.offOnNode(item);
            var init = item.attr("init");
            var c = $(taget).attr("class");
            if (init == "false" && c != "tree_child" && c != "tree_closed") {
                element.trigger({
                    type : "itemInit",
                    item : item
                });
            }
            // 当点击节点下面的子节点的时候触发事件 add by shiyj 2013/2/26
            if (c != "tree_closed") {
                element.trigger({
                    type : "selectNode",
                    item : item
                });
            }
        } else {
            if (name == "A") {
                var t = $(taget);
                var c = t.attr("class");
                if (c.indexOf("tree_item_title") > -1) {
                    Dic.Tree.setSelectedItem(element, t);
                    element.trigger({
                        type : "selectedItemChange",
                        item : item
                    });
                }
            }
        }
        if (name == "INPUT") {
            element.trigger({
                type : "checkedChanged",
                item : item
            });
            if (Dic.Tree.defaults["childCheck"])
                Dic.Tree.setItemChildChecked(element, item, $(taget).attr(
                        "checked"));
        }
    }
};

/**
 *
 * @type
 */
Dic.Tree.defaults = {
    'icon' : false,
    'hasChild' : false,
    'fatherCheck' : false,
    'childCheck' : true,
    'showCheck' : false,
    'checked' : false,
    'level' : 0,
    'openChild' : true
};

/**
 * 构造节点html
 *
 * @param {}
 *            options 继承Dic.Tree.default
 */
Dic.Tree.buildItem = function(options) {
    var s = "";
    if (options.showCheck) {
        s = Dic.Tree.html;
        if (options["checked"])
            s = s.replace("@checked", "checked=true");
        else
            s = s.replace("@checked", " ");
    } else {
        s = Dic.Tree.html1;
    }
    s = s.replace("@text", options["text"]);
    if (options.icon) {
        s = s.replace("@icon", "style='background-image: url( "
                + options["icon"] + " )'");
    }

    if (options.hasChild) {
        if (options.openChild)
            s = s.replace("tree_child", "tree_opened");
        else
            s = s.replace("tree_child", "tree_closed");
    }
    return s.replace("@id", options["id"]).replace("@value", options["value"])
            .replace("@value1", options["value1"]).replace("@value2",
                    options["value2"]);
};

/**
 * 一次性添加多个tree节点
 *
 * @param {}
 *            element tree对象
 * @param {}
 *            parentItem 父节点
 * @param {}
 *            data 加载的多个节点数据(有序的数据—从父节点到子节点)
 */
Dic.Tree.addItems = function(element, parentItem, data) {
    if (!data)
        return;
    options = $.extend({}, Dic.Tree.defaults);
    Dic.Tree.InitEvent(element);
    var hash = new hashtable();
    for ( var index = 0; index < data.length; index++) {
        var d = data[index];
        d["html"] = Dic.Tree.buildItem($.extend({}, options, d));
        d["index"] = index;
        hash.add(d["id"], d);
    }

    for ( var index = data.length - 1; index >= 0; index--) {
        var d = data[index];
        var parent = hash.getvalue(d["parent"]);
        if (parent != null) {
            d["html"] = d["html"].replace("<!--childs-->", "");
            var parentData = data[parent["index"]];
            if (!parentData)
                continue;
            if (parentData["hassetul"] != true) {
                parent.hassetul = true;
                var par = $.extend({}, options, parentData);
                var imgType = "tree_opened";
                var ulType = "display:block";
                if (par.openChild == false) {
                    imgType = "tree_closed";
                    ulType = "display:none";
                }
                parentData["html"] = parentData["html"].replace("init=false",
                        "init=true").replace('tree_child', imgType).replace(
                        "<!--childs-->",
                        "<UL style='" + ulType + "'> <!--childs--> </UL>");
            }
            parentData["html"] = parentData["html"].replace("<!--childs-->",
                    "<!--childs-->" + d["html"]);
            data[index] = null;
        }
    }

    var sb = new StringBuffer();
    for ( var index = 0; index < data.length; index++) {
        var def = data[index];
        if (def == null)
            continue;
        sb.append(def.html);
    }
    if (parentItem == null) {
        element.html(element.html() + sb.toString());
    } else {

        var ulType = "";
        if ($.extend({}, options, data[0])["openChild"] == false) {
            ulType = "display:none";
        } else {
            ulType = "display:block";
        }
        parentItem.html(parentItem.html() + "<!--childs--><UL style='" + ulType
                + "'> " + sb.toString() + "</UL>");
    }

};

/**
 * 添加一个节点
 *
 * @param {}
 *            element tree对象
 * @param {}
 *            parentItem 父节点
 * @param {}
 *            data 节点数据
 * @param {}
 *            options 参数设置
 */
Dic.Tree.addItem = function(element, parentItem, data) {
    if (!data)
        return;
    Dic.Tree.InitEvent(element);
    options = $.extend({}, Dic.Tree.defaults, data);
    var item = Dic.Tree.buildItem(options);
    if (parentItem == null) {
        element.html(element.html() + item);
    } else {
        var ul = parentItem.find("ul:first");
        if (ul == null || ul.length == 0) {
            parentItem.attr("init", "true");
            ul = $(document.createElement("UL"));
            parentItem.append(ul);
            parentItem.find("a>label:first").attr("class", "tree_opened");
            parentItem = null;
            parentItem = ul;
            ul = null;
        } else {
            parentItem = null;
            parentItem = ul;
            ul = null;
        }
        parentItem.html(parentItem.html() + item);
    }
    s = text = value = fontColor = icon = null;
    return element.find("#" + data["id"]);
};

/**
 * 关闭、展开节点
 *
 * @param {}
 *            item
 */
Dic.Tree.offOnNode = function(item) {
    var node = item.find("a>label:first");
    if (node != null && node.length > 0) {
        var c = node.attr("class");
        if (c == "tree_opened") {
            node.attr("class", "tree_closed");
            item.find(">ul:first").hide();
        } else {
            if (c == "tree_closed") {
                node.attr("class", "tree_opened");
                item.find(">ul:first").show();
            }
        }
    }
};

/**
 * 设置选择的节点
 *
 * @param {string/htmlelement}
 *            element 树
 * @param {string/htmlelement}
 *            item 节点
 */
Dic.Tree.setSelectedItem = function(element, item) {
    if (element == null) {
        return;
    }
    var s = element.find("a.tree_item_on");
    if (s.length > 0) {
        s.attr("class", "tree_item_title");
        s.removeAttr("selected");
    }
    item.attr("selected");
    item.addClass("tree_item_on");
};

/**
 * 获取选择的节点
 *
 * @param {string/htmlelement}
 *            element 树
 */
Dic.Tree.getSelectedItem = function(element) {
    var s = element.find("a.tree_item_on");
    if (s.length > 0) {
        return s.parents("LI:first");
    }
};
/**
 * 设置节点与父子节点的勾选状态
 *
 * @param {string/htmlelement}
 *            element 树
 * @param {string/htmlelement}
 *            item 节点
 * @param {boolean}
 *            checked 是否勾选
 */
Dic.Tree.setItemChildChecked = function(element, item, checked) {
    var pinput = item.parents("li");
    if (checked)
        for ( var j = 0; j < pinput.length; j++) {
            $(pinput[j]).find("input[type=checkbox]:first")[0].setAttribute(
                    "checked", true);
        }
    var input = item.find("input[type=checkbox]");
    var l = input.length;
    for ( var i = 0; i < l; i++) {
        var chk = input[i];
        if (checked) {
            chk.setAttribute("checked", true);
        } else {
            chk.setAttribute("checked", null);
            chk.removeAttribute("checked");
        }
    }
};

/**
 * 获取勾选的节点
 *
 * @param {string/htmlelement}
 *            element 树
 * @return {array} 勾选的节点清单
 */
Dic.Tree.getCheckedItems = function(element) {
    if (element == null) {
        return;
    }
    return element.find("input[checked]").parents("LI:first");
};

/**
 * 获取勾选的节点的值
 *
 * @param {string/htmlelement}
 *            element 树
 * @return {array} 勾选的节点清单
 */
Dic.Tree.getCheckedValues = function(element) {
    if (element == null) {
        return;
    }
    var input = element.find("input[checked]");
    var ret = [];
    for ( var i = 0; i < input.length; i++) {
        var item = $(input[i]).parents("LI:first");
        var v = item.attr("_value");
        ret.push(v);
    }
    return ret;
};

/**
 * 删除勾选的节点
 *
 * @param {string/htmlelement}
 *            element 树
 */
Dic.Tree.removeCheckedItems = function(element) {
    if (element == null) {
        return;
    }
    var input = element.find("input[checked]");
    for ( var i = 0; i < input.length; i++) {
        var item = $(input[i]).parents("LI:first");
        item.remove();
    }
};

/**
 * 获取父节点
 *
 * @param {}
 *            item
 */
Dic.Tree.getParent = function(item) {
    return item.parent("LI:first");
};

/**
 * 获取所有的子节点
 *
 * @param {}
 *            item
 * @return {}
 */
Dic.Tree.getAllChild = function(item) {
    var p = item.parents("ul:first");
    var li = p.find("li");
    return li;
};

/**
 * 获取子节点
 *
 * @param {}
 *            item
 * @return {}
 */
Dic.Tree.getChild = function(item) {
    var li = item.children("ul>li");
    return li;
};

/**
 * 更新节点
 *
 * @param {string/htmlelement}
 *            item 节点
 * @param {string}
 *            text 文本
 * @param {string}
 *            value 值
 */
Dic.Tree.updateItem = function(item, text, value) {
    var textnode = item.find(">a:last");
    if (textnode != null) {
        textnode.text(text);

    }
    if (value == null) {
        item.removeAttr("_value");
    } else {
        item.attr("_value", value);
    }
    textnode = null;
};

/**
 * 获取文本内容
 */
Dic.Tree.getItemText = function(item) {
    var it = item.find(">a:last");
    return it.length > 0 ? it[0].innerText : null;
};

/**
 * 设置树文本内容
 *
 * @param {}
 *            item
 * @param {}
 *            value
 */
Dic.Tree.setItemText = function(item, value) {
    var it = item.find(">a:last");
    if (it.length > 0) {
        it[0].innerText = value;
    }
};

/**
 * 获取节点的属性
 *
 * @param {}
 *            item
 * @param {}
 *            attr
 * @return {}
 */
Dic.Tree.getItem = function(item, attr) {
    return item.attr(attr);
};

/**
 * 清空item节点下面的子节点信息
 *
 * @param {}
 *            item
 */
Dic.Tree.removeChilds = function(item) {
    item.find("UL").remove();
};

/**
 * 生成一个假的序列 保存时用于暂时替换表主键,外键之类的地方
 */
var tmpTime;
Dic.getSeq = function(seqName) {
    var time = new Date().getTime();
    if (tmpTime == null) {
        tmpTime = time;
    } else {
        if (tmpTime <= time) { // 如果seq的值<=系统时间则把当前系统时间值设为序列值并加1
            tmpTime = time++;
        }
    }
    seqName = seqName ? seqName : "";
    var nameArr = seqName.split(",");
    var valArr = [];
    for ( var i = 0; i < nameArr.length; i++) {
        valArr[i] = "__-" + (tmpTime++) + "__";
    }
    return valArr.toString();
};
// 用于需要判断动态添加tab的地方,订单专用
Dic.addTab = function(title, url, tabNum) {
    var odmTask = Dic.getOdmTask();
    if (typeof (odmTask) != 'undefined') {// 如果没有第tabNum个tab,则给它添加一个tab
        if (typeof (odmTask.get(tabNum)) == 'undefined') {
            odmTask.add({
                height : top.tabHeight,
                closeable : false,
                title : title,
                url : url,
                position : "bottom"
            });
        } else {
            // 如果有第tabNum个tab,则重用
            odmTask.repTitle(tabNum, title);
            odmTask.url(tabNum, url);
            odmTask.show(tabNum);
        }
    }
};

Dic.getOdmTask = function() {
    return typeof (window.parent.odmTask) == 'undefined' ? (typeof (window.parent.parent.odmTask) == 'undefined' ? window.odmTask
            : window.parent.parent.odmTask)
            : window.parent.odmTask;
};

/**
 * add by shiyj 判断是否为空 param str为函数或者字符串 return boolean
 */
Dic.isNull = function(str) {
    if (typeof (str) == "function") {
        return false;
    }
    if (str == null || typeof (str) == "undefined"
            || (typeof (str) == "string" && str.replace(/\s/g, "") == "")) {
        return true;
    }
    if (typeof (str) == "object") {
        return false;
    }

    return false;
};

Dic.getSysdate = function(days) {
    var now = new Date();
    if (days) {
        var timer = now.getTime() + (days * 24 * 60 * 60 * 1000);
        now.setTime(timer);
    }
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    month = month < 10 ? "0" + month : month;
    var day = now.getDate();
    day = day < 10 ? "0" + day : day;
    return year + "-" + month + "-" + day;
};

Dic.getSystime = function() {
    return new Date().format("yyyy-MM-dd hh:mm:ss");
};

/**
 * 打开DicWin
 *
 * @param url
 *            :链接地址
 * @param name
 *            :标题
 * @param name
 *            :高度
 */
Dic.dicWin = function(url, name, height) {
    var cfg = {
        title : name,
        height : height,
        url : url,
        drag : true,
        opacity : 1,
        modal : true,
        beforeClose : function() {

        },
        close : function() {

        }
    };

    window.top.win = window.top.$.dicWin(cfg);
    return window.top.win;
},

Dic.disableBtn = function(arr) {
    for ( var i = 0; i < arr.length; i++) {
        $(arr[i]).attr("disabled", "disabled");
    }
}, Dic.enableBtn = function(arr) {
    for ( var i = 0; i < arr.length; i++) {
        $(arr[i]).removeAttr("disabled");
    }
};

Dic.bubble = function(content) {
    var html = '<img src = "' + dicPath + 'space.gif" class = "' + ('msg-bg0')
            + '" ' + ('title = "' + content + '"') + ' />' + content;
    window.top.$.dicBubble({
        title : '验证提示',// 广播标题设置
        content : html,// 广播内容设置
        width : 300,
        height : 100,
        close : true
    });
};

/**
 * 删除左右两端的空格
 */
Dic.trim = function(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
};

/**
 * 公用方法添加滚动条
 *
 * @param content
 * @param waitTime
 * @returns
 */
Dic.dicProgress = function(content, waitTime) {
    var prog = $.dicProgress({
        style : 0,
        text : content,
        percent : true,
        waitTime : waitTime,
        breakTime : function() {
            alert('超时!请重试!');
        }
    });

    return prog;
};

Dic.table = {};
Dic.table.htmlTemp = '<table cft="noRes" width="100%" border="0" cellspacing="0" cellpadding="0" style="table-layout:fixed;padding:0;margin:0;" '
        + ' %freeze% ><tr>%left%<td  vAlign="top"  ><div id="rightDiv" style="position: relative; overflow-x: auto;overflow-y: auto;float:left;width:100%" >'
        // + '<div style="position:absolute;left:0;right:0;border-left: 1px solid #ddd;border-right: 1px solid #ddd;bottom:0;height:23px;"></div>'
        + '<table class="dataGrid" border="0" cellspacing="0" cellpadding="0"  %rightWidth% style="table-layout:fixed;padding:0;margin:0;" ><thead><tr>%rightHead%</tr></thead><tbody/></table></div></td></tr></table>'
        + '<table id="page"  width="100%" class="page mT5" height="28" border="0" cellspacing="0" cellpadding="0" style="table-layout:fixed;padding:0;margin:0;" ><tr><td width = "100%">'
        +'<div style="height:28px;line-height:28px;width:auto;float:left;" />%page%</td></tr></table>';
// Dic.table.htmlLeftTemp = "<td valign='top' width=%leftWidth% style='position:relative;'><div style='position:absolute;width:100%;border-left: 1px solid #ddd;bottom:0;height:18px;'></div><div id='leftDiv' style='margin-top:0px;overflow:hidden;float:left;width:100%'><table class='dataGrid' style='table-layout:fixed' width='100%' ><thead><tr>%leftHead%</tr></thead><tbody/></table></div></td> ";
Dic.table.htmlLeftTemp = "<td valign='top' width=%leftWidth% style='position:relative;'><div id='leftDiv' style='margin-top:0px;overflow:hidden;float:left;width:100%'><table class='dataGrid' style='table-layout:fixed' width='100%' ><thead><tr>%leftHead%</tr></thead><tbody/></table></div></td> ";


Dic.table.initEvent = function(options){
    options["tableObj"].find("#PageNum").change(function(){
        options.pageSize = '' + $(this).val();
        // var currentPage = options.currentPage;
        var currentPage = 1;
        if(currentPage==null || currentPage == undefined){
            options.currentPage = 1;
        }else{
            //根据当前页数 和  选择的 每页记录数  计算 一共多少页，如果当前页数超出了总页数，则设置当前页数为最后一页。
            var rowTotal = options.TotalRecord;
            var totalPage = Math.ceil(rowTotal/options.pageSize);
            if(currentPage > totalPage){
                options.currentPage = totalPage;
            }else{
                options.currentPage = currentPage;
            }
        }
         Dic.table.fill(options);
    });
      if(options["freeze"]){
       var leftDivS=options["tableObj"].find('#leftDiv');
        options["tableObj"].find('#rightDiv').unbind("scroll").scroll(
            function(){
                leftDivS.scrollTop(this.scrollTop);
            });
      }
    options["tableObj"].unbind( "click");
    Dic.addEvent(options["tableObj"], "click", Dic.table.clickEvent, options);
    $("#currentPage").on("keypress",function(e){
        if(e.keyCode == "13"){  
            if($(this).val() > 0 && $(this).val() <= options["TotalPage"]){
                options["currentPage"]= $(this).val();
                Dic.table.fill(options);
            }
        }  
    });

};

Dic.table.clickEvent=function(arg,opt){
    var taget = arg.target;
    var id=taget.id;
    if(id == "Next"){
        if(Number(opt["currentPage"])+1 >opt["TotalPage"] )
            return;
       opt["currentPage"]= Number(opt["currentPage"])+1;
       Dic.table.fill(opt);
    }else if(id =="Prev"){
        if(opt["currentPage"]-1==0)return;
         opt["currentPage"]= opt["currentPage"]-1;
         Dic.table.fill(opt);
    }else if(id=="all"){
        opt["tableObj"].find("[type='checkbox']").attr("checked",'true');
    }else if(id == "noall"){
        $("[type='checkbox']").each(function(){
            if($(this).attr("checked")){
                $(this).removeAttr("checked");
            }else{
                $(this).attr("checked",'true');
            }
        });
    }else if(id == "no"){
        opt["tableObj"].find("[type='checkbox']").removeAttr("checked");
    }else if(id == "sort"){
        var cft=taget["cft"];
        var order;
        var orderCol=taget["name"];
        if(cft=="asc"){
            taget["cft"]="desc";
            order="desc";
        }else{
            taget["cft"]="asc";
            order="asc";
        }
        opt["orderCol"]=orderCol;
        opt["order"]=order;
        Dic.table.fill(opt);
    }else if($(taget).closest("ul").attr("id") == "pageLists"){
        var length = $(taget).closest("ul").find("li").size();
        var index = $(taget).parent().index();
        if(index !== 0 && index !== (length - 1) && index !== (length -2)){
            if($(taget).parent().attr("id") === 'morePage'){
                var n = $(taget).parent().prevAll("li").size() == 2 ? Number($(taget).parent().next().find("a").html()) -1 : Number($(taget).parent().prev().find("a").html()) + 1;
                opt["currentPage"]= n;
            }else{
                opt["currentPage"]= $(taget).html();
            }
            
            Dic.table.fill(opt);
        }
    }

};


Dic.table.build = function(options) {
    var opt = $.extend(  {  head : [],
        pageSize : 10,
        model : 0,
        progress : true,
        initParam : {},
        currentPage : 1,
        waitTime : 60,
        leftWidth : '1px',
        pageCount : false,
        freeze : false,
        tableObj:null,
        load : function() {
        }} , options);
    opt.noResult = $.i18n('grd-no');
    var freeze = opt["freeze"];
    //设置当前页数和每页展示数
    if(options.currentPage != null){
        opt["currentPage"] = options.currentPage;
    }
    if(options.pageSize != null){
        opt["pageSize"] = options.pageSize;
    }
    var rightWidth = opt["rightWidth"] ? (" width=" + opt["rightWidth"]) : " ";
    var left = freeze ? Dic.table.htmlLeftTemp.replace("%leftWidth%",
            opt["leftWidth"]) : "";
    // var page='<div style="height:45px;line-height:45px;float:left;font-weight: bold;"  >%chk%</div><div style="height:45px;line-height:45px;float:right"  >%PageNum%</div><div style="height:45px;line-height:45px;float:right"  >%currentPage%</div><div style="height:45px;line-height:45px;float:right"  >%updonw%</div><div style="height:45px;line-height:45px;float:right"  >%TotalRecord%</div>' ;
    var page = '<div class="fr page-detail">'
                    + '%TotalRecord%'           //总数
                    + '%updonw%'                //上下页
                    + '%currentPage%'           //当前页
                    + '%PageNum%'               //每页数据量
                + '</div>';
    var page = '<div class="paging fr">'+
'            <span class="fl">%TotalRecord%</span>  '+
'            <span style="color: #666;float: left;">%PageNum%/页</span>'+
'           <ul class="fl" id="pageLists">'+
'                 '+
'                <li class="first-child"><a id="Prev">上一页</a></li>'+
// '                <li><a>1</a></li>'+
// '                <li><a class="hover">2</a></li>'+
// '                <li><a>3</a></li>'+
// '                <li><a>4</a></li>'+
// '                <li><a>5</a></li>'+
// '                <li class="slh" id="morePage"><a>...</a></li>'+
// '                <li><a>10</a></li>'+
// '                   %pages%' +
'                <li class="plr5"><input name="" type="text" value="1" class="inp-page fl mt5" id="currentPage">&nbsp;/&nbsp;<em id="TotalPage"></em>页</li>'+
'                <li class="last-child"><a id="Next">下一页</a></li>  '+
'                <div class="clear"></div>  '+
'            </ul>'+
'        </div>';
    var html = Dic.table.htmlTemp.replace("%freeze%",
            freeze ? "" : "colspan=2").replace("%rightWidth%",
            freeze ? rightWidth : "width=100% ").replace("%left%", left);
    if(opt["pageCount"]) {
        html = html.replace("%page%",page);
    } else {
        html = html.replace("%page%",'');
    }
    var leftHead="";
    var rightHead="";
    var chk_=false;
    for ( var i = 0; i < opt["head"].length; i++) {
        var h=opt["head"][i];
        if( h == undefined || h == null){
            continue;
        }
        var tableId = opt["tableObj"].attr('id');
        // var widths = '';
        // if(opt.head[i] != null && opt.head[i].width){
        //     widths = ' width = "' + opt.head[i].width+'"';
        // }
        var widths= opt.head[i].width?' width = "' + opt.head[i].width+'"':'' ;
        if(h.checked){
            var th = '<th' + (h.hide ? ' style = "display:none" ':' style ="white-space: nowrap; overflow: hidden;"')+ widths +' title = "' + (h.dis ? h.dis: h.name) + '"  nowrap ><span class="checkbox-base" name='+ tableId +' id=' + tableId + '_allCheckbox onclick="Dic.allCheck(this);"><input type="checkbox"/></span></th>';
        }
        else{
            var th = '<th' + (h.hide ? ' style = "display:none" ':' style ="white-space: nowrap; overflow: hidden; "')+ widths +' title = "' + (h.dis ? h.dis: h.name) + '"  nowrap  >%text%</th>';
        }
        if(h["sort"]){
            th= th.replace('%text%','<div id="sort" cft=""  name="'+h.name+'"  style = "background:url(' + dicPath + 'sort.gif) no-repeat 10px center;cursor:pointer;">&nbsp;&nbsp;&nbsp;&nbsp;' + (h.dis ?h.dis: h.name) + '&nbsp;</div>');
        }else{
            th= th.replace("%text%", ('' + (h.dis ? h.dis: h.name) + ''));
        }
        if (h["checked"]) {
            chk_ = true;
        }
        if (freeze && h["freeze"])leftHead+=th;
        else rightHead+=th;
    }
    html=html.replace("%leftHead%",leftHead).replace("%rightHead%",rightHead);

    if(chk_){
        html=html.replace("%chk%",' ' + $.i18n('grd-select') + ' : <span id="all" class = "cB" style="cursor:pointer;font-weight: bold;">' + $.i18n('grd-selall') + '</span> - <span id="noall" class = "cB" style="cursor:pointer;font-weight: bold;">' + $.i18n('grd-revsel') + '</span> - <span id="no" class = "cB" style="cursor:pointer;font-weight: bold;">' + $.i18n('grd-nosel') + '</span>');
    }else html=html.replace("%chk%"," ");
    if(opt["pageCount"]) {
        html=html.replace("%PageNum%",(' ' + '<select  id="PageNum" name = "PageNum"><option value="10">10</option><option value="50">50</option><option value="100">100</option><option value="200">200</option><option value="300">300</option><option value="400">400</option><option value="500">500</option><option value="800">800</option></select>'))
        .replace("%currentPage%",'<span id = "currentPage">0</span>/<span id = "TotalPage">0</span>&nbsp;&nbsp;').replace("%updonw%", '&nbsp;&nbsp;&nbsp;&nbsp;  <span id = "Prev">' + $.i18n('grd-pre') + '</span> - <span id = "Next">' + $.i18n('grd-nxt') + '</span> &nbsp;&nbsp;&nbsp;&nbsp;')
        .replace("%TotalRecord%", ' ' + $.i18n('grd-total') + ' <em id = "TotalRecord" class = "cR"> 0 </em> ' + $.i18n('grd-data') + ' ');

    }
    opt["tableObj"].html(html);
    Dic.table.fill(opt);
    Dic.table.initEvent(opt);
    opt["tableObj"].find("option[value="+opt["pageSize"]+"]").attr("selected","true");
    return {
        getSelIds:function(){
            var re='';
            var id = opt["tableObj"].attr("id") + "_allCheckbox";
            $(opt["tableObj"]).find("td").find("input:checkbox").each(function(){
                var checked = $(this).attr("checked");
                if(checked == "checked"){
                     var parentId = $(this).parent().attr("id");
                     if(id != parentId){
                         re += $(this).val() + ',';
                     }
                }
            });
            if (re.length > 0 && re.lastIndexOf(',') > -1) {
                re = re.substring(0, re.length - 1);
            } else {
                re = null;
            }
            return re;
        },
        getAllSelIds:function(){
        	return Dic.curSel.join(",");
        },
        clearAllSels:function(){
        	Dic.checkData = {};
        	Dic.curSel = [];
        	Dic.curArray = [];
        },
        getRows:function(){
            return opt["tableObj"].data("Data")||[];
        },
        getPageSize:function(){
              return opt['pageSize'];
        },
        getSelRows:function(){
            var arr = [];
            var data=opt["tableObj"].data("Data");
            $(opt["tableObj"]).find("td").find("input:checkbox").each(function(){
	            var checked = $(this).attr("checked");
	            if(checked == "checked"){
	                if(data[$(this).attr("t")]){
	                   arr.push(data[$(this).attr("t")]);
		            }
            	}
            });
            return arr;
        },
        getAllSelRows:function(){
        	return Dic.curArray;
        },
        getTotalNum: function() {
            return opt['TotalRecord'];
        },
        getTotalPage: function() {
            return opt['TotalPage'];
        },
        getCurrentPage: function() {
            return opt['currentPage'];
        },
        changePageSize: function(pageSize) {
            opt["pageSize"] =  pageSize;
            opt['currentPage'] = 1;
            Dic.table.fill(opt);
        },
        page: function(n) {
            opt["currentPage"] = n;
            Dic.table.fill(opt);
        },
        show: function() {
            opt["tableObj"].show();
        },
        hide: function() {
            opt["tableObj"].hide();
        },
        setParam: function(p) {
            opt["initParam"] = p;
        }
    };
};

Dic.table.fill=function(opt){
    var  p=$.dicProgress({
        style : 0,
        percent : true,
        waitTime : 6000
        });

      $.ajax({
            type: "POST",
            url:  opt.url,
            data: Dic.table.getParam(opt),
            success: function(j) {
                if(j.resultCode=='160104'){
                    //token过期返回登录页面
                    localStorage.removeItem('loginId');
                    localStorage.removeItem('token');
                    window.top.location.href = getRootPath()+'/login.html';
                }else{
                    if (opt["processJSON"]) {
                        j = opt.processJSON.call(null, j);
                    }
                    if(p!=null)
                        p.close();
                    
                    Dic.checkData["dataTable"] = j;
                    Dic.table.render(j,opt);
                    opt.load();
                }
            },
            dataType: "json",
            error:function(){
                opt.noResult = $.i18n('grd-timeout');
                var freeze = opt["freeze"];
                var leftBody=opt["tableObj"].find("#leftDiv tbody:first");
                var rightBody=opt["tableObj"].find("#rightDiv tbody:first");
                opt["tableObj"].removeData('Data');
                leftBody.css({'tableLayout': 'auto'}).html("");
                rightBody.css({'tableLayout': 'auto'}).html("");
                opt["tableObj"].find("[cft=title]").remove();
                opt["tableObj"].find("[cft=noRes]").append('<tr cft="title"><td colspan="'+(freeze?2:1)+'" align = "center" class = "cR">' + opt.noResult + '!</td></tr>');
                opt["tableObj"].find("#page").hide();
                p.close();
            }
        });
};

Dic.table.getParam=function(opt){
     var p = {},
     pm =opt["initParam"];

     p['pageSize'] =opt['pageSize'];
     p['curPage'] = opt['currentPage'];
     p["orderCol"]=opt["orderCol"]||"";
     p["order"]=opt["order"]||"";

     p["loginId"]= localStorage.getItem('loginId');
     p["token"]= localStorage.getItem('token');

     if (pm) {
         for (var i in pm) {
             p[i] = $.isArray(pm[i]) ? pm[i][0] : pm[i];
         }
     }
     return p;
};

Dic.table.render=function(data,opt){
    var count=data&&data["infoContent"]?data["infoContent"].length:0;
    var leftBody=opt["tableObj"].find("#leftDiv tbody:first");
    var rightBody=opt["tableObj"].find("#rightDiv tbody:first");
    var freeze = opt["freeze"];
    var noResult = false;
    if(count < 1){
        noResult = true;
        opt["tableObj"].removeData('Data');
        leftBody.css({'tableLayout': 'auto'}).html("");
        rightBody.css({'tableLayout': 'auto'}).html("");
        opt["tableObj"].find("[cft=title]").remove();
        opt["tableObj"].find("[cft=noRes]").append(
                '<tr cft="title">'
                 + '<td colspan="'+(freeze?2:1)+'" align = "center" class = "cG">' + opt.noResult + '!'
                 + '</td>'
                 + '</tr>'
        );
        opt["tableObj"].find("#rightDiv").css("overflow","hidden");
        opt["tableObj"].find("#page").hide();
    }else{
        noResult = false;
        opt["tableObj"].find("#rightDiv").css("overflow","auto");
        opt["TotalRecord"]=data["rowTotal"];
        opt["TotalPage"]=Math.ceil(data["rowTotal"]/opt["pageSize"]);
        opt["tableObj"].data('Data',data["infoContent"]);
        opt["tableObj"].find("[cft=title]").remove();
        var leftHtml="",rightHtml="";
        leftBody.css({'tableLayout': 'auto'}).html("");
        rightBody.css({'tableLayout': 'auto'}).html("");
        opt["tableObj"].find("#page").show();
        var tmp;
        for ( var i = 0; i < count; i++) {
            var tempClass=(0 == i % 2 ? 'dataGridWRow2': 'dataGridWRow');
            leftHtml+='<tr class = "' + tempClass + '">';
            rightHtml+='<tr class = "' + tempClass + '">';
            for ( var j = 0; j <  opt["head"].length; j++) {
            	var cell=opt["head"][j];
                var val=data["infoContent"][i];
                if( cell == undefined || cell == null){
                    continue;
                }
                if(cell["name"]=='seq'){//显示序列号by add jt
                    tmp=i+1;
                }else{
                    tmp=null == val[cell["name"]] ? '': '' + val[cell["name"]];
                }
                if (cell.replace) {
                    tmp = cell.replace(data["infoContent"][i]);
                }
                if (cell.link) {
                    tmp = '<span class = "cB">' + tmp + '</span>';
                }
                var widths=cell.width?' width ="' + cell.width + ' " ':' ';
                var title  = val[cell["name"]]?(" title=" + val[cell["name"]]):"";
                title = title.replaceAll("<","&lt;");
                title = title.replaceAll(">","&gt;");
                var td = '';
                // if(cell.checked){
                var tableId = opt["tableObj"].attr('id');
                var allCheckboxId = tableId + '_allCheckbox';
                var td = '<td  ' + (cell.hide ? ' style = "display:none"': '') + ' align = "' + cell.align + '"  '+title+'  '+  widths  + (freeze ? "": "style=word-wrap:break-word") + ' >'+tmp+'</td>';

                if(cell.checked){
                	var checked = "";
                	var span = "checkbox-base";
                	$.each(Dic.curSel,function(i,o){
                		if(tmp == o){
                			checked = "checked";
                			span = "checkbox-base  checked";
                			return false;
                		}
                	});
                    td = '<td' + (cell.hide ? ' style = "display:none"': '') + ' align = "center"  ' + widths + ' >'
                        +'<span class="'+span+'" name='+ tableId +' onclick="Dic.singleCheck(this,\''+ allCheckboxId +'\');"><input dicKey="'+cell.name+'"   '+(checked == "checked" ? 'checked = "checked"' : '')+' type="checkbox" t = "' + i + '" name = "dic" value = "' + tmp + '"></span></td>';
                }
                if(cell.radio){
                    td = '<td' + (cell.hide ? ' style = "display:none"': '') + ' align = "center"  ' + widths + ' >'
                        +'<span class="radio-base" name='+ tableId +' onclick="Dic.radioCheck(this);"><input type="radio" t = "' + i + '" name = "dic" value = "' + tmp + '"></span></td>';
                }


               if (cell["freeze"] &&freeze) leftHtml+=td;
               else  rightHtml+=td;
            }
            leftHtml+="</tr>";
            rightHtml+="</tr>";
            if(i==20){
                rightBody.append(rightHtml);
                if(freeze){
                    leftBody.append(leftHtml);
                }
                rightHtml="";
                leftHtml="";
            }

        }
        rightBody.append(rightHtml);
        if(freeze){
            leftBody.append(leftHtml);
        }
        opt["tableObj"].find("#currentPage").val(opt["currentPage"]);
        opt["tableObj"].find("#TotalPage").html(opt["TotalPage"]);
        opt["tableObj"].find("#TotalRecord").html(opt["TotalRecord"]);
        Dic.table.sortPages(opt["tableObj"],opt["TotalPage"],opt["currentPage"]);
        if (opt['currentPage'] - 1 > 0) {
            opt["tableObj"].find("#Prev").addClass('cB').css({
                cursor: 'pointer'
                });
        }else{
            opt["tableObj"].find("#Prev").removeClass('cB');
        }

        if (opt['CurPage'] != opt['TotalPage']) {
            opt["tableObj"].find("#Next").addClass('cB').css({
                cursor: 'pointer'
            });
        }else
            opt["tableObj"].find("#Next").removeClass('cB');


        var maxHeight=opt["tableObj"]["maxHeight"];
        Dic.table.resizeTable(opt["tableObj"],opt["leftWidth"],opt["rightWidth"],maxHeight,noResult);
    }
};
/**
 * [调整表格样式]          thx
 * @param  {[type]} $tableObj  [表格对象]
 * @param  {[type]} leftWidth  [description]
 * @param  {[type]} rightWidth [description]
 * @param  {[type]} maxHeight  [description]
 * @param  {[type]} noResult   [description]
 * @return {[type]}            [description]
 */
Dic.table.resizeTable=function($tableObj,leftWidth,rightWidth,maxHeight,noResult){
   //var other_height;
    if(!maxHeight){
        maxHeight = parseInt($tableObj.parent().css("paddingTop")) + parseInt($tableObj.parent().css("paddingBottom")) +parseInt($tableObj.find("#rightDiv").css("paddingTop"));
        var pObjs=$tableObj.siblings();
        for(var i = 0; i < pObjs.length; i++){
            var mt = $(pObjs[i]).css("marginTop") == "auto" ? "0" : $(pObjs[i]).css("marginTop");
            var mb = $(pObjs[i]).css("marginBottom") == "auto" ? "0" : $(pObjs[i]).css("marginBottom");
            maxHeight+= pObjs[i].offsetHeight + parseInt(mt) + parseInt(mb);
        }
            
        //other_height = maxHeight;
        maxHeight=document.documentElement.clientHeight -maxHeight-60;
        var outerWidth = $tableObj.width();
        if(rightWidth && rightWidth !=null && leftWidth != ''){
            var rightRestWidth = outerWidth - parseInt(leftWidth);
            var overflowXFlag = rightRestWidth <= parseInt(rightWidth);
            /*有横向滚动条 加滚动条高度*/
            if(overflowXFlag){
                maxHeight = maxHeight -17;
            }
        }
    }
    /*页面不够展示表格 固定表头*/
   if( $tableObj.find("#rightDiv table").height()> maxHeight){
        $tableObj.find("#leftDiv").css("height",(maxHeight-17)+"px");
        $tableObj.find("#rightDiv").css("height",maxHeight+"px");

       var leftTableWidth = $("#leftDiv table").width();
       var rightTableWidth = $("#rightDiv table").width();

       var $leftHeadObj = $("#leftDiv thead");
       var $rightHeadObj = $("#rightDiv thead");

       var absoluteLeftHead = '';
       var absoluteRightHead = '';

       if($tableObj.find("#leftDiv .absoluteHead").length == 0 && $leftHeadObj.length != 0){
            absoluteLeftHead = '<div class="absoluteHead"><table class="dataGrid" width='+ leftTableWidth +'><thead>'+ $leftHeadObj.html() +'</thead></table></div>';
            $("#leftDiv").append(absoluteLeftHead);
            $leftHeadObj.remove();
       }else{
            $tableObj.find("#leftDiv .absoluteHead table").css("width",$tableObj.find("#leftDiv .dataGrid").width()+"px");
       }
       if($tableObj.find("#rightDiv .absoluteHead").length == 0 && $rightHeadObj.length != 0){
            absoluteRightHead = '<div class="absoluteHead"><table class="dataGrid" width='+ rightTableWidth +'><thead>'+ $rightHeadObj.html() +'</thead></table></div>';
            $("#rightDiv").append(absoluteRightHead);
            $rightHeadObj.remove();
       }else{
            $tableObj.find("#rightDiv .absoluteHead table").css("width",$tableObj.find("#rightDiv .dataGrid").width()+"px");
       }
       var absoluteHeadHeight = $('.absoluteHead').height();
       $("#leftDiv,#rightDiv").css('paddingTop',absoluteHeadHeight + 'px');
       $("#leftDiv,#rightDiv").scroll(function () {
            var _this = $(this);
            $(".absoluteHead").css("top", _this.scrollTop());//将滚动条高度赋给悬浮框。
        });
       $("#leftDiv,#rightDiv").scrollTop(0);
    }
    else{
        /*页面足够展示表格*/
        // if(rightWidth && rightWidth !=null && leftWidth != ''){
            if(noResult == undefined || noResult == null){
                noResult = false;
            }
            var rightRestWidth = outerWidth - parseInt(leftWidth);
            var overflowXFlag = rightRestWidth <= parseInt(rightWidth);
            var $absoluteLeftHead = $tableObj.find("#leftDiv .absoluteHead");
            var $absoluteRightHead = $tableObj.find("#rightDiv .absoluteHead");
            /*如果是固定表头的 移除*/
            if($absoluteLeftHead && $absoluteLeftHead != null){
                var absoluteLeftHeadHtml = $absoluteLeftHead.find("table").html();
                var absoluteRightHeadHtml = $absoluteRightHead.find("table").html();
                $absoluteLeftHead.remove();
                $absoluteRightHead.remove();
                $("#leftDiv table").prepend(absoluteLeftHeadHtml);
                $("#rightDiv table").prepend(absoluteRightHeadHtml);
                $tableObj.find("#leftDiv,#rightDiv").css('paddingTop',0 + 'px');
                $("#leftDiv,#rightDiv").scroll(function(){
                    return;
                });

                $tableObj.find("#leftDiv").height($tableObj.find("#leftDiv table").height());
                if(noResult){
                    $tableObj.find("#rightDiv").height($tableObj.find("#rightDiv table").height()+1);
                    return;
                }
                if(overflowXFlag){
                    $tableObj.find("#rightDiv").height($tableObj.find("#rightDiv table").height()+18);
                }else{
                    $tableObj.find("#rightDiv").height($tableObj.find("#rightDiv table").height()+1);
                }
            }
        // }
    }
};
/**
 * [自定义复选框单选事件]
 * @param  {[type]} obj   [复选框对象]
 * @param  {[type]} allId [全选对象ID]
 * @return {[type]}
 */
Dic.singleCheck = function(obj,allId){
    if($(obj).hasClass("checked")){
    	if($(obj).find("input").val() != 'on'){
    		Dic.curSel.remove($(obj).find("input").val());
        	var oo = $(obj).find("input").attr("dicKey");
        	var vv = $(obj).find("input").val();
        	
        	for(var i=0;i<Dic.curArray.length;i++){
        		$.each(Dic.curArray[i],function(a,b){
        			if(a == oo && b == vv){
        				Dic.curArray.remove(Dic.curArray[i]);
        				return false;
        			}
        		});
        	}
        	
    	}
    	
        $(obj).removeClass("checked");
        $(obj).find("input").removeAttr("checked");
        $(obj).find("input").prop("checked",false);
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
        $(selector).find("input").prop("checked",false);
    }else{
    	if($(obj).find("input").val() != 'on'){
    		Dic.curSel.push($(obj).find("input").val());
        	var oo = $(obj).find("input").attr("dicKey");
        	var vv = $(obj).find("input").val();
        	$.each(Dic.checkData["dataTable"]["infoContent"],function(i,o){
        		$.each(o,function(a,b){
        			if(a == oo && b == vv){
        				Dic.curArray.push(o);
        				return false;
        			}
        		});
        	});
    	}
        $(obj).addClass("checked");
        $(obj).find("input").attr("checked","checked");
     	$(obj).find("input").prop("checked",true);
    }
}
/**
 * [自定义复选框全选事件]
 * @param  {[type]} obj [全选对象]
 * @return {[type]}
 */
Dic.allCheck = function(obj){
    var groupName = $(obj).attr("name");
    // 去掉全选checkbox事件
    $("#"+groupName+"_allCheckbox").find("input").unbind();
    Dic.singleCheck(obj);
  /* if($(obj).hasClass("checked")){
       $(".checkbox-base[name=" + groupName +"]").addClass("checked");
       $(".checkbox-base[name=" + groupName +"]").find("input").prop("checked",false);
    }else{
        $(".checkbox-base[name=" + groupName +"]").removeClass("checked");
        $(".checkbox-base[name=" + groupName +"]").find("input").prop("checked",true);
    }*/
  if($(obj).hasClass("checked")){
        $(".checkbox-base[name=" + groupName +"]:not(#"+groupName+"_allCheckbox):not(.checked)").each(function() {
            // 触发子未选中的checkbox click事件
            $(this).find("input").removeAttr("checked");
            $(this).find("input").prop("checked",false);
            $(this).find("input").click();// 每次点击都会触发singleCheck，所以先把checked设为false
        });
    } else {
        $(".checkbox-base.checked[name=" + groupName +"]:not(#"+groupName+"_allCheckbox)").each(function() {
            // 触发子选中的checkbox click事件
        	$(this).find("input").attr("checked","checked");
            $(this).find("input").prop("checked",true);
            $(this).find("input").click();
        });
    }
   
}
/**
 * [自定义单选框事件]
 * @param  {[type]} obj [对象]
 * @return {[type]}
 */
Dic.radioCheck = function(obj){
    var name = $(obj).find("input").attr("name");
    $(".radio-base").each(function(){
        var eachName = $(this).find("input").attr("name");
        if(name == eachName){
            $(this).removeClass("checked");
            $(this).find("input").attr("checked","");
        }
    });
    $(obj).addClass("checked");
    $(obj).find("input").attr("checked","checked");
}
Dic.table.sortPages = function($tableObj,totalPage,currentPage){
    var $pagesList = $tableObj.find(".paging ul");
    var length = $pagesList.find("li").length;
    var liDel = [];
    $pagesList.find("li").each(function(){
        var index = $(this).index();
        var _this = $(this);
        if(index !== 0 && index !== (length - 1) && index !== (length -2)){
            liDel.push(_this);
        }
    });
    for(var j = 0; j < liDel.length; j++){
        liDel[j].remove();
    }
    var li = '';
    currentPage = Number(currentPage);
    if(totalPage < 7 && currentPage < 7){
        for(var i = 1; i <= totalPage; i++){
            var className = i == currentPage ? 'hover' : '';
            li += '<li><a class="' + className + '">' + i + '</a></li>';
        }
        $pagesList.find("#Prev").parent().after(li);
    }else{
        if(currentPage + 5 < totalPage){
            for(var i = 0; i < 5; i++){
                var className = i == 0 ? 'hover' : '';
                li += '<li><a class="' + className + '">' + (Number(currentPage) + i) + '</a></li>';
            }
            li += '<li class="slh" id="morePage"><a>...</a></li>';
            li += '<li><a>' + totalPage + '</a></li>';
            $pagesList.find("#Prev").parent().after(li);
        }else if(currentPage - 5 > 0 && currentPage + 4 >= totalPage){
            li += '<li><a>1</a></li>';
            li += '<li class="slh" id="morePage"><a>...</a></li>';
            var cP = Number(currentPage);
            // if((cP + 4) >= totalPage){
                for(var i = 4; i >= 0; i--){
                    var className = cP == (totalPage - i) ? 'hover' : '';
                    li += '<li><a class="' + className + '">' + (totalPage - i) + '</a></li>';
                }
            // }else{
            //     li = '';
            //    for(var i = 0; i < 5; i++){
            //        var className = i == 0 ? 'hover' : '';
            //        li += '<li><a class="' + className + '">' + (Number(currentPage) + i) + '</a></li>';
            //    }
            //    li += '<li class="slh" id="morePage"><a>...</a></li>';
            //    li += '<li><a>' + totalPage + '</a></li>';
            // }
            // li += '<li><a>' + totalPage + '</a></li>';
            $pagesList.find("#Prev").parent().after(li);
        }else{
            for(var i = currentPage; i <= totalPage; i++){
                var className = i == currentPage ? 'hover' : '';
                li += '<li><a class="' + className + '">' + i + '</a></li>';
            }
            $pagesList.find("#Prev").parent().after(li);
        }
    }
    currentPage === 1 ? $pagesList.find("#Prev").parent().addClass("disable") : $pagesList.find("#Prev").parent().removeClass("disable");
    currentPage === totalPage ? $pagesList.find("#Next").parent().addClass("disable") : $pagesList.find("#Next").parent().removeClass("disable");

}