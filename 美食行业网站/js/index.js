// 滚动条滚动开始
$(function(){
	// 自定义一个带动画的scrollTop函数
	function scroTop(top){
		$(window.document.body).animate({
			scrollTop:top
		},"slow");
	};	

	$('#aHome').on('click',function(){
		scroTop(0);
	});
	$('#aAbout').on('click',function(){
		scroTop($('#about').offset().top)
	});
	$('#aIgredients').on('click',function(){
		scroTop($('#Igredients').offset().top);
	});
	$('#aMenu').on('click',function(){
		scroTop($('#Menu').offset().top);
	});	
	$('#psee').on('click',function(){
		scroTop($('#Menu').offset().top);
	});	
	$('#ch-see').on('click',function(){
		scroTop($('#Menu').offset().top);
	});
	$('#aReviews').on('click',function(){
		scroTop($('#reviews').offset().top);
	});
	$('#aReservations').on('click',function(){
		scroTop($('#reservations').offset().top);
	});
	$('#pbook').on('click',function(){
		scroTop($('#reservations').offset().top);
	});
	$('#ch-book').on('click',function(){
		scroTop($('#reservations').offset().top)
	});
	$('#top').on('click',function(){
		scroTop(0);
	});


	// var scroTop = function(elem,top){
	// 	$('elem').on('click',function(){
	// 		$(window.document.body).animate({
	// 			scrollTop:top
	// 		},"slow");
	// 	});
	// }
});
// 滚动条滚动结束

// 输入文本框校验开始
$(function(){
	var $finput = $('#fourinput :input');
	$finput.on('focus',function(){
		$(this).addClass('focus');
		if (this.value == this.defaultValue) {
			this.value = "";
			}
	}).on('blur',function(){
		$(this).removeClass('focus');
		if (this.value == "") {
			this.value = this.defaultValue;
			}
	});
	$('#Booknow').on('click',function(){
		var str = "请输入";
		var $firstinput = $('#fourinput :input:eq(0)');
		if($firstinput.val() == $firstinput[0].defaultValue){
			str+='名字、';
		}
		var $secinput = $('#fourinput :input:eq(1)');
		if($secinput.val() == $secinput[0].defaultValue){
			str+='电子邮箱、';
		}
		var $thrinput = $('#fourinput :input:eq(2)');
		if($thrinput.val() == $thrinput[0].defaultValue){
			str+='日期、';
		}
		if (str=="请输入") {
			alert("Book success!");
		} 
		else {
			str = str.substring(0,str.length-1);
			alert(str+'！');
		}
	});
});
// 输入文本框校验结束