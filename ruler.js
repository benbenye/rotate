/**
 * @Abstract    尺子
 * @Datatime    13-8-16 上午11:20
 * @Author      Jayuh [511977533@qq.com]
 * @WebSite     http://jayuh.com
 * @Version     1.0
 */

(function(){

	// 如果已经加载，不再加载
	if(document.getElementById('ruler')) return;

	/***** START：样式 *****/
	var css = '', imgUrl = 'http://jayuh.com/demo/ruler/';

	/* 重置 */
	css += '#ruler *{box-sizing:content-box;}';

	/* 尺子 */
	css += '#ruler{position: absolute;z-index:99999;top: 200px;left:200px;width: 698px;height: 100px;overflow: hidden;border: 1px solid #000;background:#FFFFD7 url(' + imgUrl + 'ruler.gif) repeat-x -1px 0;font:12px/160% Arial,Simsun;color: #000;-moz-user-select:none;-webkit-user-select:none;user-select:none;}';

	/* 选取刻度范围 */
	css += '.ruler_mark{position: absolute;top: 0;left: 0;width: 100%;height: 20px;cursor:text;}';
	css += '.ruler_mark_b{top: auto;bottom: 0;}';
	css += '.ruler_mark div{position: absolute;top: 0;left: 0;width: 0;height: 30px;background-color:#FFFF28;overflow: hidden;opacity:0.6;filter:alpha(opacity=60);}';
	css += '.ruler_mark_b div{top: auto;bottom: 0;}';

	/* 刻度数 */
	css += '.ruler_num{position: absolute;top: 15px;left: 0;}';
	css += '.ruler_num_b{top: auto;bottom: 35px;}';
	css += '.ruler_num div{position: absolute;margin-left: -22px;width: 40px;text-align: center;line-height: 20px;}';

	/* 文件文字 */
	css += '.ruler_text_wrap{position: absolute;width: 100%;line-height: 100px;text-align: center; font-size:14px;font-weight: bold;}';
	css += '.ruler_text_d{margin-left: 20px;}';

	/* 左右拉伸按钮 */
	css += '.ruler_btn_left{position: absolute;top: 30px;left: 0;width: 15px;height: 40px;line-height: 40px;cursor: w-resize;font-size: 16px;text-align: right;}';
	css += '.ruler_btn_right{position: absolute;top: 30px;right: 0;width: 15px;height: 40px;line-height: 40px;cursor: w-resize;font-size: 16px;}';

	/* 中间可拖动区域 */
	css += '.ruler_drag{position: absolute;top: 20px;left: 0;width: 100%;height: 60px;cursor:pointer;cursor:-webkit-grab;cursor:-moz-grab;cursor:pointer \9;}';
	css += '.ruler_drag_move{cursor:-webkit-grabbing; cursor: -moz-grabbing;}';

	/* 选项 */
	css += '#ruler_blank{ position:absolute; z-index:99999; top:0; left:0; display:none; width:100%; height:100%; background-color:#FFF;opacity:0;filter:alpha(opacity=0);}';
	css += '.ruler_option{ position:absolute; top:44px; left:30px;}';
	css += '.ruler_option a{ float:left; display:block; width:12px; height:12px; margin-right:5px; border:1px solid #FFFFD7; background:url(' + imgUrl + 'ruler.gif) no-repeat;}';
	css += '.ruler_option a:hover{ border:1px solid #E0E0E0; border-right-color:#666; border-bottom-color:#666; cursor:default;}';
	css += '.ruler_option a.ruler_rectangle{ background-position:0 -100px;}';
	css += '.ruler_option a.ruler_line{ background-position:-12px -100px;}';
	css += '.ruler_option a.ruler_minimize{ background-position:-24px -100px;}';
	css += '.ruler_option a.ruler_close{ background-position:-36px -100px;}';

	/* 矩形 */
	css += '.ruler_new_rectangle{ position:absolute; z-index:99999; left:0; top:0; width:0; height:0;background:rgba(255,0,0,0.6);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=#99FF0000,endColorstr=#99FF0000);text-align:right;}';
	css += '.ruler_new_rectangle .ruler_new_text{ position:absolute; bottom:15px; right:15px; background-color:#F4EA1E; padding:3px 5px;color: #000;}';
	css += ':root .ruler_new_rectangle .ruler_new_rectangle{filter:none}';

	/* 点对点连线 */
	css += '.ruler_new_line{ position:absolute;}';
	css += '.ruler_new_line div{position: absolute;width: 1px;height: 1px;overflow: hidden;background-color: #F00;}';
	css += '.ruler_new_line .ruler_new_text{ position:absolute; top: 50%;left: 50%;width: 100px;height: 20px;margin: -10px 0 0 -50px;background-color: transparent;text-align: center;font-weight: bold;color: #000;}';

	/* 最小化尺子 */
	css += '#ruler_mini{ position:fixed; z-index:99999; left:0; bottom:0; display:none; width:50px; height:15px; margin:5px; overflow:hidden; border:1px solid #000; background:url(' + imgUrl + 'ruler.gif) no-repeat 0 -85px; cursor:pointer;}';
	css += '* html{background-image:url(about:blank);}';
	css += '* html #ruler_mini{ position:absolute;top:expression(eval(document.documentElement.scrollTop+document.documentElement.clientHeight-this.offsetHeight)-(parseInt(this.currentStyle.marginTop,10)||0)-(parseInt(this.currentStyle.marginBottom,10)||0));}';

	/***** END：样式 *****/

	// 加载CSS
	var oStyle = document.createElement('style');
	oStyle.type = 'text/css';
	oStyle.innerHTML = css;
	document.getElementsByTagName('head')[0].appendChild(oStyle);

	// 创建尺子的HTML模型
	var oRuler = document.createElement('div'),
		oRulerText =
		'<div class="ruler_text_wrap">W=<span class="ruler_text_w">0</span>px<span class="ruler_text_d"></span></div>'+
		'<div class="ruler_num"></div>'+
		'<div class="ruler_num ruler_num_b"></div>'+
		'<div class="ruler_mark"><div></div></div>'+
		'<div class="ruler_mark ruler_mark_b"><div></div></div>'+
		'<div class="ruler_drag"></div>'+
		'<div class="ruler_option"><a href="javascript:void(0);" title="矩形区域" class="ruler_rectangle"></a><a href="javascript:void(0);" title="点对点距离" class="ruler_line"></a><a href="javascript:void(0);" title="最小化" class="ruler_minimize"></a><a href="javascript:void(0);" title="关闭" class="ruler_close"></a></div>'+
		'<div class="ruler_btn_left">‹‹</div>'+
		'<div class="ruler_btn_right">››</div>';
	oRuler.setAttribute('id', 'ruler');
	oRuler.innerHTML = oRulerText;
	document.body.appendChild(oRuler);
	// 初始化尺子位置
	oRuler.style.top = document.body.scrollTop + window.screen.availHeight/2 - 100 + 'px';
	oRuler.style.left = document.body.scrollLeft + window.screen.availWidth/2 - Math.round(parseInt(getStyle(oRuler, 'width')))/2 + 'px';


	// 全局节点
	var aMark = getClass(oRuler, 'ruler_mark'),						// 刻度
		aMarkNum = getClass(oRuler, 'ruler_num'),					// 刻度数
		oDrag = getClass(oRuler, 'ruler_drag')[0],					// 拖拽区域
		oTextW = getClass(oRuler, 'ruler_text_w')[0],				// 输出文字：尺子长度
		oTextD = getClass(oRuler, 'ruler_text_d')[0],				// 暑促文字：选取长度
		oBtnLeft = getClass(oRuler, 'ruler_btn_left')[0],			// 向左拉伸区域
		oBtnRight = getClass(oRuler, 'ruler_btn_right')[0],			// 向右拉伸区域
		oOption = getClass(oRuler, 'ruler_option')[0],
		oRectangle = getClass(oOption, 'ruler_rectangle')[0],		// 矩形选区
		oline = getClass(oOption, 'ruler_line')[0],					// 点对点距离
		oMinimize = getClass(oOption, 'ruler_minimize')[0],			// 最小化
		oClose = getClass(oOption, 'ruler_close')[0],				// 关闭
		rulerWidth = parseInt(getStyle(oRuler, 'width'));			// 尺子总长度

	// 初始化中间文字
	oTextW.innerHTML = rulerWidth + 2;

	// IE下禁止选中文字 Chrome、FF采用CSS的方法
	oTextW.onselectstart = selectFalse;		// 中间文字
	for(var i = 0; i < aMarkNum.length; i++){
		aMarkNum[i].onselectstart = selectFalse;	// 刻度数
	}
	oBtnLeft.onselectstart = selectFalse;	// 向左拉伸按钮
	oBtnRight.onselectstart = selectFalse;	// 向右拉伸按钮
	function selectFalse(){
		return false;
	}

	// 初始化刻度数
	function initMarkNum(rulerWidth){
		var count = 0, str = '';
		for(var i = 0; i < rulerWidth/50; i++){
			count += 50;
			str += '<div style="left:' + count + 'px;">' + count + '</div>';
		}
		for(var i = 0; i < aMarkNum.length; i++){
			aMarkNum[i].innerHTML = str;
		}
	}
	initMarkNum(rulerWidth);

	// 划取刻度范围
	for(var i = 0; i < aMark.length; i++){
		aMark[i].onmousedown = function(e){
			var event = e || window.event,
				startX = event.clientX,
				oRulerLeft = oRuler.offsetLeft,
				oNewDiv = document.createElement('div');

			// 清空DIV
			for(var i = 0; i < aMark.length; i++){
				aMark[i].innerHTML = '';
			}
			// 清空输出的文字
			oTextD.innerHTML = '';
			// 插入新DIV
			this.appendChild(oNewDiv);

			if(this.setCapture){
				this.onmousemove = mouseMove;
				this.onmouseup = mouseUp;
				this.setCapture();
			}else{
				document.onmousemove = mouseMove;
				document.onmouseup = mouseUp;
			}

			function mouseMove(e){
				var event = e || window.event,
					endX = event.clientX,
					width = endX - startX;

				if(endX > startX){
					oNewDiv.style.left = startX - oRulerLeft + 'px';
					var oRulerRight = oRulerLeft + parseInt(getStyle(oRuler, 'width')) + 1;
					width = endX > oRulerRight ? oRulerRight - startX : width;
					oNewDiv.style.width = width + 'px';
					oTextD.innerHTML = 'D=' + width + 'px';
				}else{
					if(endX < oRulerLeft - 1){
						width = oRulerLeft - startX - 1;
						oNewDiv.style.left = -1 + 'px';
					}else{
						oNewDiv.style.left = endX - oRulerLeft + 'px';
					}
					oNewDiv.style.width = 0 - width + 'px';
					oTextD.innerHTML = 'D=' + (0 - width) + 'px';
				}
			}

			function mouseUp(){
				this.onmousemove = null;
				this.onmouseup = null;
				if(this.releaseCapture)
				{
					this.releaseCapture();
				}
			}

			return false;	//阻止浏览器默认事件：防止Firefox的拖拽Bug。
		};
	}

	// 添加左右拉伸事件
	oBtnLeft.onmousedown = extrude;
	oBtnRight.onmousedown = extrude;
	oDrag.onmousedown = extrude;

	// 拖动方法
	function extrude(e){
		var thisObj = this,
			event = e || window.event,
			startX = event.clientX,
			startY = event.clientY,
			oRulerLeft = oRuler.offsetLeft,
			oRulerTop = oRuler.offsetTop;

		if(this.setCapture){
			// IE
			this.onmousemove = mouseMove;
			this.onmouseup = mouseUp;
			this.setCapture();
		}else{
			// Chrome、FF
			document.onmousemove = mouseMove;
			document.onmouseup = mouseUp;
		}

		if(thisObj === oDrag){
			addClass(oDrag, "ruler_drag_move");
		}

		function mouseMove(e){
			var event = e || window.event,
				endX = event.clientX,
				endY = event.clientY;

			switch(thisObj){
				case oDrag:
					// 拖动
					oRuler.style.left = endX - startX + oRulerLeft + 'px';
					oRuler.style.top = endY - startY + oRulerTop + 'px';
					break;
				case oBtnLeft:
				case oBtnRight:
					// 左右拉伸
					if(thisObj === oBtnLeft){
						oRuler.style.left = endX - (startX - oRulerLeft) + 'px';
						oRuler.style.width = rulerWidth + (startX - endX) + 'px';
					}else{
						oRuler.style.width = rulerWidth + (endX-startX) + 'px';
					}
					// 输出文字：尺子宽度
					var tempWidth = parseInt(getStyle(oRuler, 'width'));
					oTextW.innerHTML = tempWidth + 2;
					// 重置刻度数
					initMarkNum(tempWidth);
					break;
				default:
					break;
			}
		}

		function mouseUp(){
			if(thisObj === oBtnLeft || thisObj === oBtnRight){
				rulerWidth = parseInt(getStyle(oRuler, 'width'));
			}
			if(thisObj === oDrag){
				removeClass(oDrag, 'ruler_drag_move');
			}
			this.onmousemove = null;
			this.onmouseup = null;
			if(this.releaseCapture)
			{
				this.releaseCapture();
			}
		}

		return false;	//阻止浏览器默认事件：防止Firefox的拖拽Bug。
	}

	// 键盘时间：上下左右 控制尺子微移动
	window.onkeydown = function(e){
		var event = e || window.event;
		switch(event.keyCode){
			case 37:
				oRuler.style.left = oRuler.offsetLeft - 1 + 'px';
				break;
			case 38:
				oRuler.style.top = oRuler.offsetTop - 1 + 'px';
				break;
			case 39:
				oRuler.style.left = oRuler.offsetLeft + 1 + 'px';
				break;
			case 40:
				oRuler.style.top = oRuler.offsetTop + 1 + 'px';
				break;
			default:
				break;
		}
	};

	// 矩形选择工具
	oRectangle.onclick = paint;
	// 点对点距离
	oline.onclick = paint;

	// 矩形和点对点的公用方法
	function paint(){
		var thisObj = this;
		// 隐藏尺子 创建遮罩层
		if(!document.getElementById('ruler_blank')){
			document.body.appendChild(document.createElement('div')).id='ruler_blank';
		}
		var oRulerBlank = document.getElementById('ruler_blank');
		oRulerBlank.style.display = 'block';
		oRulerBlank.style.height = document.body.offsetHeight + 'px';
		oRuler.style.display = 'none';

		oRulerBlank.onmousedown = function(e){
			var event = e || window.event,
				startX = event.clientX + document.body.scrollLeft,
				startY = event.clientY + document.body.scrollTop,
				oNewDiv;

			if(thisObj === oRectangle){
				// ***矩形***
				// 创建矩形div
				oNewDiv = document.createElement('div');
				oNewDiv.className = 'ruler_new_rectangle';
			}else if(thisObj === oline){
				// ***点对点***
				// 创建点对点的父级div
				oNewDiv = document.createElement('div');
				oNewDiv.className = 'ruler_new_line';
			}
			oNewDiv.style.left = startX + 'px';
			oNewDiv.style.top = startY + 'px';
			document.body.appendChild(oNewDiv);

			// 创建文本
			var oNewTextDiv = document.createElement('div');
			oNewTextDiv.className = 'ruler_new_text';

			if(this.setCapture){
				this.onmousemove = mouseMove;
				this.onmouseup = mouseUp;
				this.setCapture();
			}else{
				document.onmousemove = mouseMove;
				document.onmouseup = mouseUp;
			}

			function mouseMove(e){
				var event = e || window.event,
					endX = event.clientX + document.body.scrollLeft,
					endY = event.clientY + document.body.scrollTop,
					width,
					height;

				// 判断鼠标相对于原点的水平位置
				if(endX > startX){
					width = endX - startX;
				}else{
					width = startX - endX;
					oNewDiv.style.left = startX - width + 'px';
				}
				if(endY > startY){
					height = endY - startY;
				}else{
					height = startY - endY;
					oNewDiv.style.top = startY - height + 'px';
				}

				// 赋值
				oNewDiv.style.width = width + 'px';
				oNewDiv.style.height = height + 'px';

				if(thisObj === oRectangle){
					// ***矩形***
					oNewTextDiv.innerHTML = width + '*' + height;
				}else if(thisObj === oline){
					// ***点对点***
					var divHtml = [],
						fx = function(h,w,i){return h * w / i};// h:大DIV高度 w:大DIV宽度 i:原点距鼠标X轴坐标
					if(endX < startX && endY < startY || endY > startY && endX > startX){
						// 第二象限和第四象限
						for(var i = 0; i < width; i++){
							divHtml.push('<div style="left:' + i + 'px;top:' + Math.ceil(fx(height, i, width)) + 'px;"></div>');
						}
					}else{
						// 第一象限和第三象限
						for(var i = 0; i < width; i++){
							divHtml.push('<div style="left:' + (width - i) + 'px;top:' + Math.ceil(fx(height, i, width)) + 'px;"></div>');
						}
					}
					oNewDiv.innerHTML = divHtml.join('');
					oNewTextDiv.innerHTML = Math.round(Math.sqrt(width * width + height * height)) + 'px';
				}

				oNewDiv.appendChild(oNewTextDiv);

			}

			function mouseUp(){
				this.onmousemove = null;
				this.onmouseup = null;
				if(this.releaseCapture)
				{
					this.releaseCapture();
				}
				// 恢复尺子
				oRulerBlank.style.display = 'none';
				oNewDiv.style.display = 'none';
				oRuler.style.display = 'block';
			}

			return false;
		};
	}

	// 最小化
	oMinimize.onclick = function(){
		oRuler.style.display = 'none';
		if(!document.getElementById('ruler_mini')){
			var oNewDiv = document.createElement('div');
			oNewDiv.id='ruler_mini';
			oNewDiv.title='还原尺子';
			document.body.appendChild(oNewDiv);
		}
		var oRulerMini = document.getElementById('ruler_mini');
		oRulerMini.style.display = 'block';
		oRulerMini.onclick = function(){
			this.style.display = 'none';
			oRuler.style.display = 'block';
		};
	};

	// 关闭
	oClose.onclick = function(){
		document.body.removeChild(oRuler);
	};





	// 获取类名元素
	function getClass(elem, className){
		if(elem.getElementsByClassName) {
			return elem.getElementsByClassName(className);
		}else{
			var results = [], elems = elem.getElementsByTagName("*");
			var reg = new RegExp(" " + className + "|" + className + " " + "|" + "^" + className + "$","ig");
			for(var i=0; i<elems.length; i++) {
				if(reg.test(elems[i].className)){
					results[results.length] = elems[i];
				}
			}
			return results;
		}
	}

	// 添加元素类名
	function addClass(elem, value){
		if(elem.className == ""){
			elem.className = value;
		}else{
			elem.className += " " + value;
		}
	}

	// 删除元素类名
	function removeClass(elem, value) {
		var oldClass, newClass;
		value = " " + value + " ";
		oldClass = " " + elem.className + " ";
		oldClass = oldClass.split(" ").join("  ");
		newClass = oldClass.replace(new RegExp(value,"g")," ");
		newClass = newClass.replace(/\s+/g," ");
		newClass = newClass.replace(/^\s+|\s+$/g,"");
		elem.className = newClass;
	}

	// 获取元素当前样式
	function getStyle(elem, name){
		if(elem.currentStyle){
			return elem.currentStyle[name];
		}else{
			return getComputedStyle(elem, false)[name];
		}
	}

})();