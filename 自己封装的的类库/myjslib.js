function getById(elemId){
	return document.getElementById(elemId);
}

/**
	@clsName 搜索的class名称
	@[context] 上下文
*/
function getByClass(clsName, context, tag){
	var result = [];
	context = context || document;
	tag = tag || '*';
	var arr = context.getElementsByTagName(tag);
	for(var i=0; i<arr.length; i++){
		var re = new RegExp("\\b"+clsName+"\\b", 'g');
		if(re.test(arr[i].className)){
			result.push(arr[i]);
		}
	}
	return result;
}

function getByTag(tagName, context){
	context = context || document;
	return context.getElementsByTagName(tagName);
}

/**
	@elem 指定的元素
	@name 元素的属性名称
	@value 元素的属性值
	@return 属性值
*/
function attr(elem, name, value) {
    //Make sure that a valid name was provided
    if ( !name || name.constructor != String ) 
        return '';

     //Figure out if the name is one of the weird naming cases

    name = { 'for': 'htmlFor', 'class': 'className' }[name] || name;

    // If the user is setting a value, also
    if ( value != null ) {
        // Set the quick way first
        elem[name] = value;

        // If we can, use setAttribute
        if ( elem.setAttribute )
            elem.setAttribute(name,value);
    }

    // Return the value of the attribute
    return elem[name] || elem.getAttribute(name) || '';
}

function getStyle( elem, name ) {
    //If the property exists in style[], then it’s been set recently (and is current)
    if (elem.style[name])
        return elem.style[name];

    // Otherwise, try to use IE’s method
    else if (elem.currentStyle)
        return elem.currentStyle[name];

    // Or the W3C’s method, if it exists,
    // document.defaultView属性返回当前 document 对象所关联的 window 对象，如果没有，会返回 null
    else if (document.defaultView && document.defaultView.getComputedStyle) {
        // It uses the traditional ‘text-align’ style of rule writing, instead of textAlign
        name = name.replace(/([A-Z])/g,"-$1"); //textAlgin=>text-Align
        name = name.toLowerCase();//text-Align => text-align

        // Get the style object and get the value of the property (if it exists)
        var s = document.defaultView.getComputedStyle(elem,"");
        return s && s.getPropertyValue(name);

    // Otherwise, we’re using some other browser
    } else
        return null;
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

function css(elem, attr, value){
	if(value){
		setCss(elem, attr, value);
	}else{
		if(typeof attr == 'string'){
			return getStyle(elem, attr);
		}else{
			var obj = attr;//{width:300, height:200}
			for(var p in obj){
				setCss(elem, p, obj[p])
			}
		}
	}
}

function addClass(elem, className){
	// elem.className += " " + className;
	var re = new RegExp('\\b' + className + '\\b', 'g');
	if(!re.test(elem.className)){
		elem.className += " " + className;
	}
}

function removeClass(elem, className){
	// elem.className += " " + className;
	var re = new RegExp('\\b' + className + '\\b', 'g');
	if(re.test(elem.className)){
		elem.className = trim(elem.className.replace(re, ""));//"bb aa" => "bb"
	}
}

function trim(str){
	return str.replace(/^\s+|\s+$/g, "");
}

// Get the actual height (using the computed CSS) of an element
function getHeight( elem ) {
    // Gets the computed CSS value and parses out a usable number
    return parseInt( getStyle( elem, 'height' ) );
}

// Get the actual width (using the computed CSS) of an element
function getWidth( elem ) {
    // Gets the computed CSS value and parses out a usable number
    return parseInt( getStyle( elem, 'width') );
}

// Find the height of the viewport
function windowHeight() {
    // A shortcut, in case we’re using Internet Explorer 6 in Strict Mode
    var de = document.documentElement;

    // If the innerHeight of the browser is available, use that
    return self.innerHeight ||

        // Otherwise, try to get the height off of the root node
        ( de && de.clientHeight ) ||

        // Finally, try to get the height off of the body element
        document.body.clientHeight;
}

// Find the width of the viewport
function windowWidth() {
    // A shortcut, in case we’re using Internet Explorer 6 in Strict Mode
    var de = document.documentElement;

    // If the innerWidth of the browser is available, use that
    return self.innerWidth ||

        // Otherwise, try to get the width off of the root node
        ( de && de.clientWidth ) ||

        // Finally, try to get the width off of the body element
        document.body.clientWidth;
}

// Returns the height of the web page
// (could change if new content is added to the page)
function pageHeight() {
    return document.body.scrollHeight;
}

// Returns the width of the web page
function pageWidth() {
    return document.body.scrollWidth;
}

// Find the full, possible, height of an element (not the actual,
// current, height)
function fullHeight( elem ) {
    // If the element is being displayed, then offsetHeight
    // should do the trick, barring that, getHeight() will work
    if ( getStyle( elem, 'display' ) != 'none' )
        return elem.offsetHeight || getHeight( elem );

    // Otherwise, we have to deal with an element with a display
    // of none, so we need to reset its CSS properties to get a more
    // accurate reading
    var old = resetCSS( elem, {
        display: 'block',
        visibility: 'hidden',
        position: 'absolute'
    });

    // Figure out what the full height of the element is, using clientHeight
    // and if that doesn't work, use getHeight
    var h = elem.clientHeight || getHeight( elem );

    // Finally, restore the CSS properties back to what they were
    restoreCSS( elem, old );

    // and return the full height of the element
    return h;
}

// Find the full, possible, width of an element (not the actual,
// current, width)
function fullWidth( elem ) {
    // If the element is being displayed, then offsetWidth
    // should do the trick, barring that, getWidth() will work
    if ( getStyle( elem, 'display' ) != 'none' )
        return elem.offsetWidth || getWidth( elem );

    // Otherwise, we have to deal with an element with a display
    // of none, so we need to reset its CSS properties to get a more
    // accurate reading
    var old = resetCSS( elem, {
        display: 'block',
        visibility: 'hidden',
        position: 'absolute'
    });

    // Figure out what the full width of the element is, using clientWidth
    // and if that doesn't work, use getWidth
    var w = elem.clientWidth || getWidth( elem );

    // Finally, restore the CSS properties back to what they were
    restoreCSS( elem, old );

    // and return the full width of the element
    return w;
}


// A function used for setting a set of CSS properties, which
// can then be restored back again later
function resetCSS( elem, prop ) {
    var old = {};

    // Go through each of the properties
    for ( var i in prop ) {
        // Remember the old property value
        old[ i ] = elem.style[ i ];

        // And set the new value
        elem.style[ i ] = prop[i];
    }

    // Retun the set of changed values, to be used by restoreCSS
    return old;
}

// A function for restoring the side effects of the resetCSS function
function restoreCSS( elem, prop ) {
    // Reset all the properties back to their original values
    for ( var i in prop )
        elem.style[ i ] = prop[ i ];
}

// Find the X (Horizontal, Left) position of an element
function pageX(elem) {
    var p = 0;

    // We need to add up all of the offsets for every parent
    while ( elem.offsetParent ) {
        // Add the offset to the current count
        p += elem.offsetLeft;

        // and continue on to the next parent
        elem = elem.offsetParent;
    }

    return p;
}

// Find the Y (Vertical, Top) position of an element
function pageY(elem) {
    var p = 0;

    // We need to add up all the offsets for every parent
    while ( elem.offsetParent ) {
        // Add the offset to the current count
        p += elem.offsetTop;

        // and continue on to the next parent
        elem = elem.offsetParent;
    }

    return p;
}

// Find the left position of an element
function posX(elem) {
    // Get the computed style and get the number out of the value
    return parseInt( getStyle( elem, "left" ) );
}

// Find the top position of an element
function posY(elem) {
    // Get the computed style and get the number out of the value
    return parseInt( getStyle( elem, "top" ) );
}

// Find the horizontal positioing of an element within its parent
function parentX(elem) {
    // If the offsetParent is the element’s parent, break early
    return elem.parentNode == elem.offsetParent ?
        elem.offsetLeft :

        // Otherwise, we need to find the position relative to the entire
        // page for both elements, and find the difference
        pageX( elem ) - pageX( elem.parentNode );
}

// Find the vertical positioing of an element within its parent
function parentY(elem) {
    // If the offsetParent is the element’s parent, break early
    return elem.parentNode == elem.offsetParent ?
        elem.offsetTop :

        // Otherwise, we need to find the position relative to the entire
        // page for both elements, and find the difference
        pageY( elem ) - pageY( elem.parentNode );
}

// Find the horizontal position of the cursor
function getX(e) {
    // Normalize the event object
    e = e || window.event;

    // Check for the non-IE position, then the IE position, and finally return 0
    return e.pageX || e.clientX + document.body.scrollLeft || 0;
}

// Find the vertical position of the cursor
function getY(e) {
    // Normalize the event object
    e = e || window.event;

    // Check for the non-IE position, then the IE position, and finally return 0
    return e.pageY || e.clientY + document.body.scrollTop || 0;
}

// A function for adding a number of pixels to the horizontal
// position of an element 
function addX(elem,pos) {
    // Get the current horz. position and add the offset to it.
    setX( posX(elem) + pos );
}

// A function that can be used to add a number of pixels to the
// vertical position of an element
function addY(elem,pos) {
    // Get the current vertical position and add the offset to it
    setY( posY(elem) + pos );
}

// A function for determining how far horizontally the browser is scrolled
function scrollX() {
    // A shortcut, in case we’re using Internet Explorer 6 in Strict Mode
    var de = document.documentElement;

    // If the pageXOffset of the browser is available, use that
    return self.pageXOffset ||

        // Otherwise, try to get the scroll left off of the root node
        ( de && de.scrollLeft ) ||

        // Finally, try to get the scroll left off of the body element
        document.body.scrollLeft;
}

// A function for determining how far vertically the browser is scrolled
function scrollY() {
    // A shortcut, in case we’re using Internet Explorer 6 in Strict Mode
    var de = document.documentElement;

    // If the pageYOffset of the browser is available, use that
    return self.pageYOffset ||

        // Otherwise, try to get the scroll top off of the root node
        ( de && de.scrollTop ) ||

        // Finally, try to get the scroll top off of the body element
        document.body.scrollTop;
}

// Get the X position of the mouse relative to the element target
// used in event object ‘e’
function getElementX( e ) {
    // Find the appropriate element offset
    return ( e && e.layerX ) || window.event.offsetX;
}
 
// Get the Y position of the mouse relative to the element target
// used in event object ‘e’
function getElementY( e ) {
    // Find the appropriate element offset
    return ( e && e.layerY ) || window.event.offsetY;
}

function append( parent, elem ) {
    // Get the array of elements
    var elems = checkElem( elem );

    // Append them all to the element
    for ( var i = 0; i < elems.length; i++ ) {
        parent.appendChild( elems[i] );
    }
}

function checkElem(a) {
    var r = [];
    // Force the argument into an array, if it isn’t already
    if ( a.constructor != Array ) a = [ a ];//a => array
    //a = [dom]

    for ( var i = 0; i < a.length; i++ ) {
        // If there’s a String
        //a[i]="<div><h1>hehehe</h1></div>"
        if ( a[i].constructor == String ) {
            // Create a temporary element to house the HTML
            var div = document.createElement("div");

            // Inject the HTML, to convert it into a DOM structure
            div.innerHTML = "<div><h1>hehehe</h1></div>";

             // Extract the DOM structure back out of the temp DIV
             for ( var j = 0; j < div.childNodes.length; j++ ){
                 r[r.length] = div.childNodes[j];
             }
        } else if ( a[i].length ) { // If it’s an array
            // Assume that it’s an array of DOM Nodes
            for ( var j = 0; j < a[i].length; j++ )
                r[r.length] = a[i][j];
        } else { // Otherwise, assume it’s a DOM Node
            r[r.length] = a[i];
        }
    }
    return r;
}

function before( parent, before, elem ) {
    // Check to see if no parent node was provided
    if ( elem == null ) {
        elem = before;
        before = parent;
        parent  = before.parentNode;
    }
    parent.insertBefore( checkElem( elem ), before );
}

function addEvent(elem, type, handler){
    if(elem.addEventListener){
        elem.addEventListener(type, handler, false);
    }else if(elem.attachEvent){
        elem[type+handler] = function(){
            handler.call(elem);
        };
        elem.attachEvent('on'+type, elem[type+handler]);
    }else{
        elem['on'+type] = handler;
    }
}

function removeEvent(elem, type, handler){
    if(elem.removeEventListener){
        elem.removeEventListener(type, handler, false);
    }else if(elem.detachEvent){
        elem.detachEvent('on'+type, elem[type+handler]);
    }else{
        elem['on'+type] = null;
    }
}

function hide(elem, duration){
    if(duration){//width, height, opacity
        /*var currStyle = {
            width: parseInt(getStyle(elem, 'width')),
            height: parseInt(getStyle(elem, 'height'))
        };
        setInterval(function(){
            for(var s in currStyle){
                var speed = currStyle[s]/duration*30;
                elem.style[s] = (currStyle[s]-=speed) + 'px';
            }
            if(currStyle[s] <= 0){
                clearInterval(timer);
                elem.style.display = 'none';
            }
        }, 30);*/
        var currWidth = parseInt(getStyle(elem, 'width'));
        var currHeight = parseInt(getStyle(elem, 'height'));
        var currOpacity = getStyle(elem, 'opacity');

        var speedWidth = (currWidth / duration) * 30;
        var speedHeight = (currHeight / duration) * 30;
        var speedOpacity = (currOpacity / duration) * 30;

        var timer = setInterval(function(){
            currWidth -= speedWidth;
            elem.style.width = currWidth + 'px';

            currHeight -= speedHeight;
            elem.style.height = currHeight + 'px';

            currOpacity -= speedOpacity;
            elem.style.opacity = currOpacity;
            elem.style.filter = 'alpha(opacity: '+currOpacity*100+')';

            if(currWidth <= 0 || currHeight<=0 || currOpacity<=0){
                clearInterval(timer);
                elem.style.display = 'none';
            }
        }, 30);
    }else{  
        elem.style.display = 'none';
    }
}

function show(elem, duration){
    if(duration){

    }else{
        elem.style.display = 'block';
    }
}

function toggle(elem, duration){
    var curDisplay = getStyle( elem, 'display' );

    if ( curDisplay == 'none' ){
        show(elem, duration);
    }else{
        hide(elem, duration)
    }
}

function animate(elem, attr, callback){
    clearInterval(elem.timer);
    elem.timer = setInterval(function(){
        var bStop = true;//一个标识位，值为true是代表需要停止定时器，为false不需要停止
        for(var prop in attr){//取出所有attr对象中的属性
            var currentStyle;

            if(prop == 'opacity'){//如果prop是opacity
                currentStyle = parseInt(getStyle(elem, prop)*100);//那么将获取出来的当前值转换成为百分制
            }else{
                currentStyle = parseInt(getStyle(elem, prop));
            }

            var speed = (attr[prop] - currentStyle) / 8;
            speed = speed < 0 ? Math.floor(speed) : Math.ceil(speed);


            if(currentStyle != attr[prop]){
                bStop = false;
            }

            currentStyle += speed;
            if(prop == 'opacity'){
                elem.style.opacity = currentStyle / 100;
                elem.style.filter = "alpha(opacity:"+currentStyle+")";
            }else{
                elem.style[prop] = currentStyle + 'px';
            }
        }

        if(bStop){
            clearInterval(elem.timer);
            if(callback) callback();
        }
    }, 30);
}







































