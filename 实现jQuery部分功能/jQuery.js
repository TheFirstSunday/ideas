function getStyle(elem, prop){
	if(elem.currentStyle){//IE
		return elem.currentStyle[prop];
	}else{//标准
		return window.getComputedStyle(elem, null)[prop];
	}
}

function setCss(elem, attr, value){
    switch(attr){
        case 'width':
        case 'height':
        case 'padding':
        case 'paddingLeft':
        case 'paddingRight':
        case 'paddingTop':
        case 'paddingBottom':
            value = /\%/.test(value)?value:Math.max(parseInt(value), 0) + 'px';
            break;
        case 'left':
        case 'top':
        case 'bottom':
        case 'right':
        case 'margin':
        case 'marginLeft':
        case 'marginRight':
        case 'marginTop':
        case 'marginBottom':
            value = /\%/.test(value)?value:parseInt(value) + 'px';
            break;
    }
    elem.style[attr] = value;
}

function JQuery(arg) {
	this.elements = [];
	switch (typeof arg) { //arg: function, object, string
		case 'function': //文档就绪函数
			window.addEventListener('load', arg, false);
			break;
		case 'object':
			this.elements.push(arg);
			break;
		case 'string': //arg: #aa, .aa, aa
			var prefix = arg.charAt(0);
			switch (prefix) {
				case '#': //id
					var domObj = document.getElementById(arg.substring(1));
					if (domObj) {
						this.elements.push(domObj);
					}
					break;
				case '.': //class
					this.elements = document.getElementsByClassName(arg.substring(1));
					break;
				default: //tag
					this.elements = document.getElementsByTagName(arg);
					break;

			}
			break;
	}
}
JQuery.prototype.on = function(type, selector, fn) {
	for (var i = 0; i < this.elements.length; i++) {
		if (typeof selector == 'string') {
			this.elements[i].addEventListener(type, function(e) {
				var prefix = selector.charAt(0);
				switch (prefix) {
					case '#': //id
						if (e.target.id == selector.substring(1)) {
							fn.call(e.target);
						}
						break;
					case '.': //class
						if (e.target.className == selector.substring(1)) {
							fn.call(e.target);
						}
						break;
					default: //tag
						break;
				}
			}, false);
		} else {
			fn = selector;
			this.elements[i].addEventListener(type, fn, false);
		}
	}
	return this;
};
JQuery.prototype.click = function(fn) {
	for (var i = 0; i < this.elements.length; i++) {
		this.elements[i].addEventListener('click', fn, false);
	}
	return this;
};
JQuery.prototype.mouseover = function(fn) {
	for (var i = 0; i < this.elements.length; i++) {
		this.elements[i].addEventListener('mouseover', fn, false);
	}
	return this;
};
JQuery.prototype.css = function(propertyName, value){
	if(value){//value有值说明传了两个参数，代表设置第一个参数的属性值为value
		for(var i=0; i<this.elements.length; i++){
			this.elements[i].style
			[propertyName] = value;
		}
	}else{
		if(typeof propertyName == 'string'){
			//return this.elements[0].style[propertyName];
			return getStyle(this.
				elements[0], propertyName);
		}else{
			var obj = propertyName;
			for(var p in obj){
				for(var i=0; i<this.elements.
					ength; i++){
					//this.elements[i].style[p] = parseInt(obj[p]) + 'px';
					setCss(this.elements[i], p, obj[p]);
				}
			}
		}
	}
	return this;
};
JQuery.prototype.offset = function(coordinates){
	if(coordinates){//要设置元素的coordinates位置
		for(var i=0; i<this.elements.length; i++){
			//this.elements[i].style.left = coordinates.left
			var position = getStyle(this.elements[i], 'position');
			if(position == 'static'){
				this.elements[i].style.position = 'relative';
			}
			setCss(this.elements[i], 'left', coordinates.left);
			setCss(this.elements[i], 'top', coordinates.top);
		}
	}else{//获得匹配元素中第一个元素的位置，相对于文档
		var iTop = iLeft = 0;
		var elem = this.elements[0];
		do{
			iTop += elem.offsetTop;
			iLeft += elem.offsetLeft;
			elem = elem.offsetParent;
			// console.log(elem);
		}while(elem);
		return {
			left: iLeft,
			top: iTop
		};
	}
	return this;
};
JQuery.prototype.hover = function(fnOver, fnOut){
	for(var i=0; i<this.elements.length; i++){
		this.elements[i].addEventListener('mouseover', fnOver, false);
		this.elements[i].addEventListener('mouseout', fnOut, false);
	}
	return this;
};


function $(arg) {
	return new JQuery(arg);
}