(function(){
	
	var oBigImg = document.getElementById('big-img');
	var aBigImgs = oBigImg.children;
	var oThumbImg = document.getElementById('thumb-img');
	var aThumbImgs = oThumbImg.children;
	/*	for(var i=0; i<aBigImgs.length; i++){
		aBigImgs[i].style.zIndex = aBigImgs.length - i;
	}*/

	var oLeftMask = document.getElementById('left-mask');
	var oRightMask = document.getElementById('right-mask');
	var oPrevBtn = document.getElementById('prev-btn');
	var oNextBtn = document.getElementById('next-btn');

	var oTitle = document.getElementById('title');
	oTitle.innerHTML = aBigImgs[0].children[0].title;

	var oCurrPage = document.getElementById('curr-page');

	var index = 0;
	var zIndex = 6;

	oLeftMask.onmouseover = oRightMask.onmouseover = oPrevBtn.onmouseover = oNextBtn.onmouseover = function(){
		if(this == oLeftMask || this == oPrevBtn){
			animate(oPrevBtn, {opacity: 100});
		}else{
			animate(oNextBtn, {opacity: 100});
		}
	};
	oLeftMask.onmouseout = oRightMask.onmouseout = oPrevBtn.onmouseout = oNextBtn.onmouseout = function(){
		if(this == oLeftMask || this == oPrevBtn){
			animate(oPrevBtn, {opacity: 0});
		}else{
			animate(oNextBtn, {opacity: 0});
		}
	};

	oNextBtn.onclick = function(){
		index++;
		if(index == aBigImgs.length){
			index = 0;
		}
		changeImg(index);
	};

	function changeImg(index){
		var oNextImg = aBigImgs[index];
		oNextImg.style.height = 0;
		oNextImg.style.zIndex = ++zIndex;
		oTitle.innerHTML = oNextImg.children[0].title;
		oCurrPage.innerHTML = index + 1;
		animate(oNextImg, {height: 320});
	}

	for(var i=0; i<aThumbImgs.length; i++){
		aThumbImgs[i].index = i;
		aThumbImgs[i].onmouseover = function(){
			animate(this, {opacity: 100});
		};
		aThumbImgs[i].onmouseout = function(){
			if(index != this.index){
				animate(this, {opacity: 50});
			}
		};

		aThumbImgs[i].onclick = function(){
			for(var i=0; i<aThumbImgs.length; i++){
				aThumbImgs[i].style.opacity = 0.5;
				aThumbImgs[i].style.filter = 'alpha(opacity=50)';
			}
			this.style.opacity = 1;
			this.style.filter = 'alpha(opacity=100)';

			index = this.index;

			changeImg(index);
			
			var iLeft = 10;
			if(index == 0){
				iLeft = 0;
			}else if(index == aThumbImgs.length - 1){
				iLeft = (index - 2) * aThumbImgs[0].offsetWidth;
			}else{
				iLeft = (index - 1) * aThumbImgs[0].offsetWidth;
			}
			iLeft -= 10;
			animate(oThumbImg, {left: -iLeft});
		};
	}





















})();
