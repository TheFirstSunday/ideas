require(['jquery', 'dialog'], function($, Dialog){

	$('#btn').on('click', function(){
		//实例化Dialog类，因为一个页面可能弹出多个窗口，所以此处用的是类
		var dialog = new Dialog();
		dialog.open({//传入自定义参数
			title: '我是对话框',
			width: 500,
			url: 'login.html'
		});
	});

	/*$('#btn-close').on('click', function(){
		dialog.close();
	});*/



});