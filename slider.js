var Touch = function() {

	var el = null;
	var max;
	var left_init;
	var X_init;

	this.start = function(element, evX) {
		el = element;
		$(el).addClass("active");
		left_init = parseInt($(el).css("left"));
		X_init = parseInt($(el).css("left")) + evX;
	}

	this.update = function(evX) {
		if (el != null) {
			console.log($(el).prev().width());
			var X_cur = parseInt($(el).css("left")) + evX;
			var max = $(el).parent().width() - $(el).width() - 2*parseInt($(el).css("border-width"));
			var left_cur = Math.min(Math.max(0, left_init + (X_cur - X_init)/2), max);
			var unhidingWidth = left_cur == 0 ? 0 : left_cur + $(el).width();
			$(el).css("left", left_cur + "px");
			$(el).prev().css("left", "calc(" + left_cur + "px + 1.2em)");
			$(el).parent().prev().css("width", unhidingWidth + "px");
		}
	}

	this.end = function() {
		$(el).removeClass("active").animate({
			"left": "0px"
		}, 200);
		$(el).prev().animate({
			"left": "1.2em"
		}, 200);
		if ($(el).parent().prev().width() != 0) {
			$(el).parent().prev().animate({
				"width": $(el).width() + "px"
			}, {
				duration: 200,
				complete: function() {
					$(el).parent().prev().css("width", "0px");
					el = null;
				}
			});
		} else {
			el = null;
		}
	}

};

function handleSliders() {
	var sliders = $(".slider");
	for (var i=0 ; i<sliders.length ; i++) {
		var titre = $(sliders[i]).html();
		$(sliders[i]).html(
			"<div class='slider_champ slider_contenu'></div>" +
			"<div class='slider_champ'><div class='slider_cache'><div> " + titre + " </div></div><div class='slider_touch'><img src='fleche.png' /></div></div>"
		);
	}

	var touch = new Touch();

	$(".slider_touch").on("touchstart", function(ev) {
		ev.preventDefault();
		touch.start(this, ev.originalEvent.touches[0].pageX);
	}).on("touchend", function(ev) {
		ev.preventDefault();
		touch.end();
	}).on("touchmove", function(ev) {
		ev.preventDefault();
		touch.update(ev.originalEvent.touches[0].pageX);
	});

	$(".slider_touch").on("mousedown", function(ev) {
		ev.preventDefault();
		touch.start(this, ev.clientX);
	});
	$("#body").on("mousemove", function(ev) {
		ev.preventDefault();
		touch.update(ev.clientX);
	});
	$(document).on("mouseup", function(ev) {
		ev.preventDefault();
		touch.end();
	});	
}
