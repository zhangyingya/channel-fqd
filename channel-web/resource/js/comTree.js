/**
 * 树原型
 * @param orgId 组织id
 * @param token
 * @param queryType 查询类型
 * @param keywords 关键字
 * @constructor
 */
function TreeView(orgId, token) {
    /**
     * 数据来源(参数不用传)
     * @param treeId
     * @param parentNode
     * @param childNodes
     * @returns {*}
     */
    function filter(treeId, parentNode, childNodes) {
        if (!childNodes) return null;
        var list = [];
        if (typeof childNodes.data != 'undefined') {
            for (var i = 0, l = childNodes.data.length; i < l; i++) {
                var node = childNodes.data[i];
                //图片显示是否父节点
                if (node.nodeType == '2') {
                    node.icon = '../../img/service.png';
                } else {
                    node.icon = '../../img/branch.png';
                }
                if (node.subNumbers > 0)
                    node.isParent = true;
                else {
                    node.isParent = false;
                }
                node.id = node.parentId;
                list.push(node);
            }
        }
        return list;
    };


    /**
     * 基本配置
     * @type {{selectedMulti: boolean, async: {enable: boolean, url: string, autoParam: string[], otherParam: {orgId: *, token: *, queryType: *, keywords: *}, dataFilter: filter}}}
     */
    TreeView.prototype.setting = {
        async: {
            enable: true,
            url: comUrl + '/org/getOrgMemberList',
            autoParam: ["id=parentId"],
            otherParam: {
                "orgId": orgId,
                'accessToken': token
            },
            dataFilter: filter,
            type: "post"
        },
        view: {
            selectedMulti: false
        }
    };


    /**
     * 从根节点刷新树的方法
     * @param treeId 树id
     */
    TreeView.prototype.refreshNode = function (treeId) {
        var zTree = $.fn.zTree.getZTreeObj(treeId);
        zTree.reAsyncChildNodes(null, "refresh");
    };


    /**
     * 后台异步加载完成树
     * @param treeId
     */
    TreeView.prototype.asyncAll = function (treeId) {
        var zTree = $.fn.zTree.getZTreeObj(treeId);
        TreeView.asyncNode(treeId, zTree.getNodes());
    };
    TreeView.prototype.asyncNodes = function (treeId, nodes) {
        if (!nodes) return;
        var zTree = $.fn.zTree.getZTreeObj(treeId);
        for (var i = 0, l = nodes.length; i < l; i++) {
            if (nodes[i].isParent && nodes[i].zAsync) {
                asyncNodes(treeId, nodes[i].children);
            } else {
                zTree.reAsyncChildNodes(nodes[i], "refresh", true);
            }
        }
    };


    /**
     * 默认选中
     * @param treeId dom树id
     * @param attr   节点属性
     * @param value  属性值
     * @param parentNode 搜索范围，指定在某个父节点下的子节点中进行搜索 可以为null
     */
    TreeView.prototype.defSelected = function (treeId, attr, value, parentNode) {
        var treeObj = $.fn.zTree.getZTreeObj(treeId);
        var node = treeObj.getNodeByParam(attr, value, parentNode);
        treeObj.selectNode(node, false);
    };


    /**
     * 获取选中节点对象
     * @param treeId dom树id
     * @returns {*}
     */
    TreeView.prototype.getSelectedNode = function (treeId) {
        var treeObj = $.fn.zTree.getZTreeObj(treeId);
        return treeObj.getSelectedNodes();
    };


    /**
     * 展开树节点
     * @param treeId dom树id
     */

    TreeView.prototype.expandNode = function (treeId) {
        var zTree = $.fn.zTree.getZTreeObj(treeId),
            nodes = zTree.getSelectedNodes();
        for (var i = 0, l = nodes.length; i < l; i++) {
            zTree.setting.view.fontCss = {};
            zTree.expandNode(nodes[i], true, null, null, true);
        }
    };


    /**
     * 获取选中节点父节点对象
     * @param treeId dom树id
     * @returns {*}
     */
    TreeView.prototype.getParentNode = function (treeId) {
        var treeObj = $.fn.zTree.getZTreeObj(treeId);
        var nodes = treeObj.getSelectedNodes();
        var parentNode = nodes[0].getParentNode();
        if (parentNode) {
            return treeObj.getSelectedNodes();
        } else {
            return null;
        }
    };


    /**
     * 添加子节点刷新
     * @param treeId dom树id
     * @param type 类型 1是岗位,2是部门
     * @param nodeName 要添加的nodename
     * @param nodeId 要添加的nodeid
     * @returns {boolean}
     */
    TreeView.prototype.addChild = function (treeId, type, newnode) {
        var treeObj = $.fn.zTree.getZTreeObj(treeId);
        var node = {};
        //获取选中的父节点
        var nodes = treeObj.getSelectedNodes();
        if (nodes) {
            treeNode = nodes[0];
            treeNode = treeObj.addNodes(treeNode, newNode(2, type, newnode, null));
        } else {
            showMsg('请选择父节点');
            return false;
        }
    };

    /**
     * 添加兄弟节点刷新
     * @param treeId dom树id
     * @param type 类型 1是岗位
     * @param nodeName 要添加的nodename
     * @param nodeId 要添加的nodeid
     * @returns {boolean}
     */
    TreeView.prototype.addBroNode = function (treeId, type, newnode) {
        var treeObj = $.fn.zTree.getZTreeObj(treeId);
        //获取选中的父节点
        var nodes = treeObj.getSelectedNodes();
        var parentNode = nodes[0].getParentNode();            //父节点
        var node = {};
        if (parentNode) {
            treeNode = nodes[0];
            treeNode = treeObj.addNodes(parentNode, newNode(1, type, newnode, parentNode.id));
        } else {
            showMsg('请选择父节点');
            return false;
        }
    };


    /**
     * 删除树节点
     * @param treeId dom树id
     * @param node 要删除节点的对象
     */
    TreeView.prototype.removeNode = function (treeId, node) {
        var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
        treeObj.removeNode(node);
    };


    /**
     *修改节点后更新 仅显示名称
     * @param treeId dom树id
     * @param name 显示名称
     */
    TreeView.prototype.updateNode = function (treeId, name) {
        var treeObj = $.fn.zTree.getZTreeObj(treeId);
        var nodes = treeObj.getSelectedNodes();
        if (name) {
            nodes[0].name = name;
        }
        treeObj.updateNode(nodes[0]);
    };


    /**
     *
     * @param type 类型,同级 1 /子集  2
     * @param addtype  1是岗位,2是部门
     * @param nodeId  添加的节点id
     * @param nodeName 添加的节点名称
     * @param parentId 父节点id
     * @returns {{}}
     */
    function newNode(type, addtype, newnode, parentId) {
        var node = {};
        node = newnode;
        if (addtype == '2') {
            node.icon = treeBranchIcon;
            node.nodeType = 1;
            node.useStatus = 0;
            if (type == '1') {
                node.parentId = parentId;    //父节点id
            }
        } else if (addtype == '1') {
            node.icon = treeEmpIcon;
            node.nodeType = 0;
            node.useStatus = 1;
        }
        node.isParent = false;      //是否是父节点,新添加都是子节点


        if (addtype == '1') {
            node.name = newnode.post;
            if (newnode.nodeId) {
                node.id = newnode.postId;
                node.parentId = newnode.nodeId;
            }
        } else if (addtype == '2') {
            node.name = newnode.nodeName;
            node.id = newnode.nodeId;
        }
        return node;
    }
}




