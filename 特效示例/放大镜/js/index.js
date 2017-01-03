;(function(){
    var oSmallPic = document.getElementById('small-pic');
    var oDrag = document.getElementById('drag');
    var oBigPic = document.getElementById('big-pic');
    var oMask = document.getElementById('mask');
    var oBigImg = document.getElementById('big-img');
    oMask.onmouseover = function(){
        oDrag.style.display = 'block';
        oBigPic.style.display = 'block';
    };
    oMask.onmouseout = function(){
        oDrag.style.display = 'none';
        oBigPic.style.display = 'none';
    };
    oMask.onmousemove = function(e){
        e = e || event;
        var left = e.clientX - oDrag.offsetWidth / 2;
        var top = e.clientY - oDrag.offsetHeight / 2;
        if(left > oSmallPic.offsetWidth - oDrag.offsetWidth){
            left = oSmallPic.offsetWidth - oDrag.offsetWidth;
        }
        if(left < 0){
            left = 0;
        }
        if(top < 0){
            top = 0;
        }
        if(top > oSmallPic.offsetHeight - oDrag.offsetHeight){
            top = oSmallPic.offsetHeight - oDrag.offsetHeight;
        }
        oDrag.style.left = left + 'px';
        oDrag.style.top = top + 'px';

        var scaleX = left / (oSmallPic.offsetWidth - oDrag.offsetWidth);
        var scaleY = top / (oSmallPic.offsetHeight - oDrag.offsetHeight);
        oBigImg.style.left = -scaleX * (oBigImg.offsetWidth - oBigPic.offsetWidth) + 'px';
        oBigImg.style.top = -scaleY * (oBigImg.offsetHeight - oBigPic.offsetHeight) + 'px';
    };
})();
