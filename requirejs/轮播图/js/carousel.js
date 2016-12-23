define(['jquery'], function($){



	function Carousel(options){
		var self = this;
		this.index = 0;
		this.timer = null;
		
		var settings = {
			arrowPos: 'bottom',
			buttonType: 'squire'
		};
		$.extend(settings, options);

		var $container = $('<div class="carousel-container"></div>').hover(function(){
			self._pause();
		}, function(){
			self._start();
		}),
			$tab = $('<ul class="carousel-tab"></ul>'),
			$content = $('<div class="carousel-content"></div>'),
			$arrow = $('<div class="carousel-arrow"></div>'),
			$prev = $('<span class="carousel-prev">&lt;</span>').on('click', function(){
				self.index--;
				if(self.index == -1){
					self.index = imgData.length-1;
				}
				changeImg(self.index);
			});
			this.$next = $('<span class="carousel-next">&gt;</span>').on('click', function(){
				self.index++;
				if(self.index == imgData.length){
					self.index = 0;
				}
				changeImg(self.index);
			});

			var imgData = settings.imgData;
			for(var i=0; i<imgData.length; i++){
				$tab.append('<li class="'+(settings.buttonType)+(i==0?' selected':'')+'">'+(settings.buttonType=='squire'?i+1:'')+'</li>');
				$content.append('<img src="'+imgData[i]+'" class="'+(i==0?'selected':'')+'"/>');
			}
			$arrow.addClass(settings.arrowPos).append($prev).append(this.$next);

			$container.append($tab).append($content).append($arrow);

			$('li', $tab).on('click', function(){
				var index = $(this).index();
				changeImg(index);
			});

			$(settings.selector).append($container);

			this._start();


			var changeImg = function(idx){
				$('li', $tab).eq(idx).addClass('selected').siblings().removeClass('selected');
				$('img', $content).eq(idx).addClass('selected').siblings().removeClass('selected');
			};
	}
	Carousel.prototype._init = function(){

	};
	Carousel.prototype._pause = function(){
		clearInterval(this.timer);
	};
	Carousel.prototype._start = function(){
		var self = this;
		this.timer = setInterval(function(){
			self.$next.trigger('click');
		}, 2000);
	};
	return Carousel;












});