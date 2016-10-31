function handleSliders() {
	var sliders = $(".slider");
	for (var i=0 ; i<sliders.length ; i++) {
		var titre = $(sliders[i]).html();
		$(sliders[i]).html("<div class='slider_titre'>" + titre + "</div>" +
			"<div class='slider_champ slider_contenu'></div>" +
			"<div class='slider_champ'><div class='slider_cache'><div> Glisser pour révéler </div></div><div class='slider_touch'><img src='fleche.png' /></div></div>"
		);
		var var_width = $("#body").width() > 360 ? 109 : 90; // Variable
		var left_for_slider = $("#body").width()*0.8 / 2 - var_width;
		$(".slider_cache>div").css("margin-left", left_for_slider + "px");
	}

	var X_init = 0;
	var left_init = 0;

	$(".slider_touch").on("touchstart", function(ev) {
		ev.preventDefault();
		$(this).addClass("active");
		left_init = parseInt($(this).css("left"));
		X_init = parseInt($(this).css("left")) + ev.originalEvent.touches[0].pageX;
	}).on("touchend", function(ev) {
		ev.preventDefault();
		$(this).removeClass("active").animate({
			"left": "0px"
		}, 200);
		$(this).prev().animate({
			"left": "30px"
		}, 200);
		if ($(this).parent().prev().width() != 0) {
			var that = this;
			$(this).parent().prev().animate({
				"width": $(this).width() + "px"
			}, {
				duration: 200,
				complete: function() {
					$(that).parent().prev().css("width", "0px");
				}
			});
		}

	}).on("touchmove", function(ev) {
		var X_cur = parseInt($(this).css("left")) + ev.originalEvent.touches[0].pageX;
		var max = $("#body").width()*0.8 - 60;
		var left_cur = Math.min(Math.max(0, left_init + (X_cur - X_init)/2), max);
		$(this).css("left", left_cur + "px");
		$(this).prev().css("left", (left_cur + 30) + "px");
		if (left_cur == 0) {
			$(this).parent().prev().css("width", "0px");
		} else {
			$(this).parent().prev().css("width", (left_cur + $(this).width()) + "px");
		}
	});

	var isClicked = false;
	var element = null;

	$(".slider_touch").on("mousedown", function(ev) {
		ev.preventDefault();
		$(this).addClass("active");
		left_init = parseInt($(this).css("left")) - parseInt($("#body").css("left"));
		X_init = parseInt($(this).css("left")) + ev.clientX;
		isClicked = true;
		element = this;
	});
	$("#body").on("mousemove", function(ev) {
		if (isClicked) {
			var X_cur = parseInt($(this).css("left")) + ev.clientX;
			var max = $("#body").width()*0.8 - 60;
			var left_cur = Math.min(Math.max(0, left_init + (X_cur - X_init)), max);
			$(element).css("left", left_cur + "px");
			$(element).prev().css("left", (left_cur + 30) + "px");
			if (left_cur == 0) {
				$(element).parent().prev().css("width", "0px");
			} else {
				$(element).parent().prev().css("width", (left_cur + $(element).width()) + "px");
			}
		}
	});
	$(document).on("mouseup", function(ev) {
		ev.preventDefault();
		$(element).removeClass("active").animate({
			"left": "0px"
		}, 200);
		$(element).prev().animate({
			"left": "30px"
		}, 200);
		if ($(element).parent().prev().width() != 0) {
			$(element).parent().prev().animate({
				"width": $(element).width() + "px"
			}, {
				duration: 200,
				complete: function() {
					$(element).parent().prev().css("width", "0px");
				}
			});
		}
		isClicked = false;
	});	
}
