ulresult = document.getElementById("ulresult");
ulresultLis = ulresult.childNodes;
var lis = selectlable(ulresultLis,"li");	// 塞选出li节点

// alert(getvalue(lis,0,0));

var categories = new Set();	// 存储种类
for (var i = 0; i < lis.length; i++) {
	var str = getvalue(lis,i,2);
	if (str == "") {
		categories.add("其他");
	}else{
		categories.add(str);
	} 			
}

var resultdiv = document.getElementById("result");
// alert(finallyresult);


for (var x of categories){
	finallyset(resultdiv,lis,x);
}

// 给定目标节点，把一个分好的类加进去
function finallyset(point,lis,cateName){
	var div = document.createElement("div");
	var newlist = [];
	for (var i = 0, j = 0; i < lis.length; i++) {
		var str = getvalue(lis,i,2);
		if (str == "") str = "其他"; 				
		if (cateName == str) {
			newlist[j++] = lis[i]; 
		}			
	}
	createpointdiv(div,newlist,cateName);
	point.appendChild(div);
}
// 给一个div节点，然后把cateName分类加进去
function createpointdiv(pointdiv,newlist,cateName){
	var h3=document.createElement("h3");
	var node=document.createTextNode(cateName);
	h3.appendChild(node);
	var ul=document.createElement("ul");
	for (var lis of newlist) {
		var url = getlivalue(lis,0);
		var title = getlivalue(lis,1);
		var date = getlivalue(lis,3).substring(0,10);
		var li=document.createElement("li");
		str = "\<a href=\'" + url + "\'\>" + title + "\<\/a>" +
		"<span style=\'float:right;\'>" + date + "<\/span>";
		li.innerHTML = str;
		ul.appendChild(li);
	}
	pointdiv.appendChild(h3);
	pointdiv.appendChild(ul);
}
// 获取 第 a 个标签 的 b 个span innerText值
function getvalue(lis,a,b){
	if (b > 3 || a >= lis.length || b < 0 || a < 0 ) return "";
	return selectlable(lis[a].childNodes,"span")[b].innerText;
}

function getlivalue(li,b){
	if (b > 3|| b < 0) return "";
	return selectlable(li.childNodes,"span")[b].innerText;
}
// 从list中筛选出str标签
function selectlable(list,str){
	var result = [];	// 塞选出li节点
	for (var i = 0, j = 0; i < list.length; i++) {
		if (list[i].nodeName.toLowerCase() == str ) {
			result[j++] = list[i];
		}
	}
	return result;
}