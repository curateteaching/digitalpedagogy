jQuery(document).ready(function($) {

	// Toggle mobile-menu
	$(".nav-toggle").on("click", function(){	
		$(this).toggleClass("active");
		$(".mobile-menu").slideToggle();
		if ($(".search-toggle").hasClass("active")) {
			$(".search-toggle").removeClass("active");
			$(".blog-search").slideToggle();
		}
	});
	
	// Toggle search form
	$(".search-toggle").on("click", function(){	
		$(this).toggleClass("active");
		$(".blog-search").slideToggle();
		if ($(".nav-toggle").hasClass("active")) {
			$(".nav-toggle").removeClass("active");
			$(".mobile-menu").slideToggle();
		}
	});
	
	
	// Show mobile-menu > 700
	$(window).resize(function() {
		if ($(window).width() > 800) {
			$(".toggle").removeClass("active");
			$(".mobile-menu").hide();
			$(".blog-search").hide();
		}
	});
	
	
	// Cool header image scroll
	$(window).scroll(function(e){
		if ($(window).width() > 800) {
			$('.header').css({
				'bottom' : -($(this).scrollTop()/3)+"px",
			}); 
			var thisdist = $(this).scrollTop();
			var headerheight = $(".header").outerHeight();
			$('.blog-info').css({
				'opacity' : (1 - thisdist/headerheight)
			}); 
		} else {
			$('.header').css({'bottom' : 'auto'}); 	
			$('.blog-info').css({'opacity' : "1" });
		}
	});
	
		
	// resize videos after container
	var vidSelector = ".post iframe, .post object, .post video, .widget-content iframe, .widget-content object, .widget-content iframe";	
	var resizeVideo = function(sSel) {
		$( sSel ).each(function() {
			var $video = $(this),
				$container = $video.parent(),
				iTargetWidth = $container.width();

			if ( !$video.attr("data-origwidth") ) {
				$video.attr("data-origwidth", $video.attr("width"));
				$video.attr("data-origheight", $video.attr("height"));
			}

			var ratio = iTargetWidth / $video.attr("data-origwidth");

			$video.css("width", iTargetWidth + "px");
			$video.css("height", ( $video.attr("data-origheight") * ratio ) + "px");
		});
	};

	resizeVideo(vidSelector);

	$(window).resize(function() {
		resizeVideo(vidSelector);
	});
	
	// Smooth scroll to header
    $('.tothetop').click(function(){
		$('html,body').animate({scrollTop: 0}, 500);
		$(this).unbind("mouseenter mouseleave");
        return false;
    });
	

});