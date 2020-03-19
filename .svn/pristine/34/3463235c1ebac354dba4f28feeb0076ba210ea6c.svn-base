/**
 * ztree搜索对象
 * @param _myTreeObj ztree对象
 * @returns ztree排序对象
 * @author yuanxh
 */
function ztreeSreachObj(_myTreeObj){
	this.selectedNodes=[];
	this.myTreeObj =_myTreeObj;
	
	this.searchZtreeNode=function(keyword) {
		this.resetZtree();
		if(keyword) {
			this.selectedNodes = this.myTreeObj.getNodesByParamFuzzy("name", keyword, null);
			this.updateNodeCustom(true);
		}
	};
	
	this.updateNodeCustom = function(highlight) {
		for(var i=0;i<this.selectedNodes.length;i++) {
			var node = this.selectedNodes[i];
			node.highlight = highlight;
			this.myTreeObj.updateNode(node);
			if(highlight && node.children) {
				this.myTreeObj.expandNode(node, true, false, false);// 展开
			} else if(highlight && !node.children) {
				var pnode = node.getParentNode();
				this.myTreeObj.expandNode(pnode, true, false, false);// 展开
			}
		}
	};
	
	this.resetZtree = function() {
		if(this.selectedNodes.length>0) {
			this.updateNodeCustom(false);// 去掉高亮显示
			this.myTreeObj.setting.view.expandSpeed = "";
			this.myTreeObj.expandAll(false);// 全部收起
			this.myTreeObj.setting.view.expandSpeed = "fast";
		}
	};
	
};

function getFontCss(treeId, treeNode) {
	return (!!treeNode.highlight) ? {color:"#A60000", "font-weight":"bold"} : {color:"#333", "font-weight":"normal"};
}