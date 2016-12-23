require(['jquery', 'carousel'], function($, Carousel){

	//['img/1.jpg','img/2.jpg','img/3.jpg','img/4.jpg'];
	/*$.get('http://image.baidu.com/xxx', function(data){
		var imgData = data;
	});*/
	var imgData = ['img/1.jpg','img/2.jpg','img/3.jpg','img/4.jpg'];

	new Carousel({
		selector: '#container',//容器的位置
		arrowPos: 'center',//center
		buttonType: 'squire',//squire
		imgData: imgData
	});

	new Carousel({
		selector: '#container2',//容器的位置
		buttonType: 'circle',//squire
		imgData: imgData
	});



});