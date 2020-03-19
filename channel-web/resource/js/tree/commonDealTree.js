/**
 * 生成树
 * 
 * @author shiyj
 * @version 1.0
 */
var orderTree = {
	/*
	 * 定义树DIV @returns
	 */
	treeDiv : function() {
		return $("#orgTree");
	},

	/*
	 * 获取树阶段表的信息 @returns
	 */
	queryStage : function() {
		$.ajax({
			url : ctxPath + '/order/orderManager!queryStage.action?type=1',
			type : 'post',
			async : true, // true:异步 false:不同
			cache : false,
			dataType : 'json',
			success : function(rtnData) {
				if (!Dic.isNull(rtnData) && rtnData.length > 0) {
					orderTree.getTree(rtnData);
				}
			},
			error : function() {
				// alert("超时或没有数据!");
			}
		});
	},

	/*
	 * 组装树信息
	 */
	getTree : function(sso) {
		var data = [];
		var obj = {};
		// 功能树
		obj["id"] = "tree";
		obj["value"] = "funtree";
		obj["text"] = "功能树";
		data.push(obj);
		// 我的订单
		obj = new Object();
		obj["parent"] = "tree";
		obj["id"] = "MY";
		obj["value"] = "myOrder";
		obj["text"] = "我的订单";
		data.push(obj);
		// 待我处理订单
		obj = new Object();
		obj["parent"] = "tree";
		obj["id"] = "DEAL";
		obj["value"] = "dealOrder";
		obj["text"] = "待我处理订单";
		data.push(obj);

		// 循环遍历待我处理的订单
		for ( var i = 0; i < sso.length; i++) {
			obj = new Object();
			obj["parent"] = "DEAL";
			obj["id"] = "DEAL:" + sso[i].ORDER_STAGE_ID + "_1";
			// 修改VALUE的数值为 DEAL:1 获取环节下面节点的类型
			obj["value"] = "DEAL:" + sso[i].CREATE_BY;
			obj["text"] = sso[i].TASK_STAGE + "(<span style='color: red;'>" + sso[i].COUNT + "</span>)";
			obj["openChild"] = false;
			obj["hasChild"] = true;
			data.push(obj);
		}

		// 所有订单
		obj = new Object();
		obj["parent"] = "tree";// 父节点id
		obj["id"] = "ALL";
		obj["value"] = "allOrder";
		obj["text"] = "所有订单";
		data.push(obj);
		// 我已处理
		obj = new Object();
		obj["parent"] = "tree";// 父节点id
		obj["id"] = "MYDEAL";
		obj["value"] = "myDealOrder";
		obj["text"] = "我已处理";
		obj["openChild"] = false;
		data.push(obj);

		// 遍历我已处理所有的阶段信息
		for ( var i = 0; i < sso.length; i++) {
			obj = new Object();
			obj["parent"] = "MYDEAL";// 父节点id
			obj["id"] = "MYDEAL:" + sso[i].ORDER_STAGE_ID + "_1";
			obj["value"] = sso[i].ORDER_STAGE_ID;
			obj["text"] = sso[i].TASK_STAGE;
			obj["openChild"] = false;
			obj["hasChild"] = true;
			data.push(obj);
		}

		Dic.Tree.addItems(this.treeDiv(), null, data);
	},

	/*
	 * 绑定选择节点事件
	 */
	onItemChange : function(arg) {
		// 获取节点的ID
		var nodeId = arg.item[0].id;
		var nodeName = arg.item.prevObject[0].innerText;
		if (!Dic.isNull(nodeId) && nodeId == "tree") {
			return;
		}

		if (nodeId == "MY") {
			nodeName = "我的订单";
		}
		if (nodeId == "DEAL") {
			nodeName = "待我处理";
		}
		if (nodeId == "MYDEAL") {
			nodeName = "我已处理";
		}

		if (Dic.isNull($("#isRoot").val())) {
			var num = parent["treeManager"].getOrderManager().orderTab.get(1);
			if (!Dic.isNull(num)) {
				// 显示第一个Tab页
				parent["treeManager"].getOrderManager().orderTab.show(0);
			}
			parent["treeManager"].initOrder(nodeId, nodeName);
		} else {
			var param = "?isRoot=" + nodeId + "@" + nodeName;
			parent.parent.window.location.href = ctxPath + "/view/order/orderManager/orderManager.jsp" + param;
		}
	},

	/*
	 * 根据阶段ID查询该阶段下面的环节信息
	 */
	selectNode : function(org1) {
		var nodeId = org1.item[0];
		if (!Dic.isNull(nodeId)) {
			if (nodeId.id == "tree") {
				return;
			}
			if (nodeId.id == "DEAL") {
				return;
			}
			if (nodeId.id == "MYDEAL") {
				return;
			}
			orderTree.queryTacheByStageID(nodeId);
		}

	},
	
	/*
	 * 根据阶段ID获取某一个环节表的信息并计算待处理数量
	 */
	queryLink : function(stageId,stageType) {
		var ssoLink = null;
		$.ajax({
			url : ctxPath + '/order/orderManager!queryTacheByStageID.action?stageId=' + stageId + "&stageType=" + stageType + "&type=ORDER",
			type : 'post',
			async : false,
			cache : false,
			dataType : 'json',
			success : function(rtnData) {
				if (!Dic.isNull(rtnData)) {
					ssoLink = rtnData;
				}
			},
			error : function() {
				// alert("超时或没有数据!");
			}
		});

		return ssoLink;
	},

	/*
	 * 我已处理
	 * 根据阶段ID获取某一个环节表的信息
	 */
	queryLinkNoNum : function(stageId) {
		var ssoLink = null;
		$.ajax({
				url : ctxPath + '/order/orderManager!queryTacheByStageIDNoNum.action?stageId=' + stageId,
				type : 'post',
				async : false,
				cache : false,
				dataType : 'json',
				success : function(rtnData) {
					if (!Dic.isNull(rtnData)) {
						if (OdmSvcPub.isOk(rtnData)) {
							ssoLink = rtnData.SvcCont.SOO[0];
						}
					}
				},
				error : function() {
					// alert("超时或没有数据!");
				}
			});

		return ssoLink;
	},

	/*
	 * 根据阶段ID查询该阶段下面的环节信息
	 */
	queryTacheByStageID : function(nodeId) {
		// 清空父节点下面的子节点信息
		Dic.Tree.removeChilds($(nodeId));
		var data = [];
		var stageId = nodeId.id;
		var stateIdStr = stageId.split(":");
		var ssoLink = null;
		if ("DEAL" == stateIdStr[0]) {
			var stageType = nodeId._value.split(":")[1];
			ssoLink = orderTree.queryLink(stageId,stageType);
			var obj = {};
			// 待我处理阶段---》》预警,超期,到期
			for (var i = 0; i < ssoLink.length; i++) {
				obj = new Object();
				obj["id"] = stageId + ":" + ssoLink[i].OBJ_CODE;
				obj["value"] = ssoLink[i].OBJ_CODE;
				obj["text"] = ssoLink[i].OBJ_NAME + "(<span style='color: red;'>" + ssoLink[i].COUNT + "</span>)";
				data.push(obj);
			}
		} else {
			ssoLink = orderTree.queryLinkNoNum(stageId);
			var obj = {};
			for ( var i = 0; i < ssoLink.PUB_RES.SVC_COUNT_TOTAL; i++) {
				obj = new Object();
				obj["id"] = stageId + ":" + ssoLink.TACHES[i].TACHE_CODE;
				obj["value"] = ssoLink.TACHES[i].TACHE_CODE;
				obj["text"] = ssoLink.TACHES[i].TACHE_NAME;
				data.push(obj);
			}
		}

		Dic.Tree.addItems(orderTree.treeDiv(), $(nodeId), data);
	},

	/*
	 * 页面加载
	 */
	treePageLoad : function() {
		this.queryStage();
		Dic.addEvent(orderTree.treeDiv(), "selectedItemChange",this.onItemChange, this);
		Dic.addEvent(orderTree.treeDiv(), "selectNode", this.selectNode, this);
		Dic.Tree.defaults["showCheck"] = false;
		Dic.Tree.defaults["openChild"] = true;
	}
};

$(function() {
	orderTree.treePageLoad();
});
