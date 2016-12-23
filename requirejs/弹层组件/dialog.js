define(['jquery'],function($){

	function Dialog(){//Dialog类
	}
	Dialog.prototype.open = function(options){
			var self = this;
			var settings = {
				width: 400,//默认值
				height: 300
			};

			$.extend(settings, options);//将传递过来的参数与默认值合并

			//下面提定义弹层的dom结构
			this.$container = $('<div class="dialog-container"></div>');
			this.$mask = $('<div class="dialog-mask"></div>');
			this.$dialogBox = $('<div class="dialog-box"></div>');
			this.$titleBox = $('<div class="dialog-title-box"></div>');
			this.$title = $('<span class="dialog-title"></span>');
			this.$btnClose = $('<span class="dialog-close-btn">[X]</span>');
			this.$content = $('<div class="dialog-content"></div>');
			
			//下面是dom操作
			this.$container.append(this.$mask);
			this.$dialogBox.css({
				width: settings.width,
				height: settings.height,
				marginLeft: -settings.width/2,
				marginTop: -settings.height/2
			}).appendTo(this.$container);
			this.$title.html(settings.title).appendTo(this.$titleBox);
			this.$btnClose.on('click', function(){
				self.close();
			}).appendTo(this.$titleBox)
			this.$titleBox.appendTo(this.$dialogBox);
			this.$content.load(settings.url).appendTo(this.$dialogBox);

			this.$mask.on('click', function(){
				self.close();
			});

			$(document.body).append(this.$container);//打开弹层窗口方法
	};

	Dialog.prototype.close = function(){//关闭弹层窗口方法
		this.$container.remove();
	};

	return Dialog;//返回Dialog类，在require这个模块时，可以直接new Dialog对象

});