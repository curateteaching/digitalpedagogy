/*-----------------------------------------------------------------------------------*/
/* Preloader & Initialize Masonry Script
/*-----------------------------------------------------------------------------------*/

// Set jQuery to NoConflict Mode
jQuery.noConflict();

// Horizontally Center the caption
function ag_center_caption(centeredCaption) {
 	sliderWidth = jQuery('div.fullwidthbanner-container').width();
    if (sliderWidth <= 960) {
    	centeredCaption.css('width', sliderWidth);
    } else {
    	centeredCaption.css('width', '960');
    }
}
 
jQuery(document).ready(function($){
	centerCaption = jQuery('div.homeheadline.center');
	ag_center_caption(centerCaption);
  jQuery(window).resize(function ($) {
  	ag_center_caption(centerCaption);
  });
});

// Add tables to vertically center nav, sections, page titles and buttons. 
jQuery(document).ready(function($){
  if ($.browser.msie && $.browser.version == 7)
  {
    $(".verticalcenter .cell.verticalcenter").wrap("<td />");
    $(".container_row").wrap("<tr />");
    $(".container.verticalcenter").wrapInner("<table />");
  }
});


/*-----------------------------------------------------------------------------------*/
/* JQuery Background Cover for non-CSS3 browsers
/*-----------------------------------------------------------------------------------*/

(function($) {
    
    $(document).ready(function() {
    
        if ($('html').hasClass('no-backgroundsize')) {
        
        function extractUrl(input)
        {
        // remove quotes and wrapping url()
        return input.replace(/"/g,"").replace(/url\(|\)$/ig, "");
        }
        
        
         jQuery('.no-backgroundsize div.section, .no-backgroundsize div.pagetitle').each(function() {
            $section         = jQuery(this);
            
            if (!($section.hasClass('repeat'))) {
            bg = extractUrl($section.css("background-image"));
                    if (bg != 'none') {
                        $section.prepend('<img src="' + bg + '" class="bg"/>');
                    }  
            }
        });
        
        
            $(window).load(function() {
            
            
             
            var theWindow        = $(window);                                    
                function resizeBg() {
                
                    jQuery('.no-backgroundsize div.section, .no-backgroundsize div.pagetitle').each(function() {
                        $section         = jQuery(this),
                        $bg              = $section.find('.bg'),
                        aspectRatio      = $bg.width() / (($bg.height()) - 70),
                        $sectionaspect   = $section.width() / $section.height();

                        $bg.css('display', 'block');
                        
                        if ( ($sectionaspect) < aspectRatio ) {
                            $bg
                                .removeClass('bgwidth')
                                .addClass('bgheight')
                                .css({
                                    'margin-top': '0', 
                                    'top': '0'
                                   /* 'left': '50%',
                                    'margin-left': -($bg.width()/2)*/
                                 });
                        } else {
                            $bg
                                .removeClass('bgheight')
                                .addClass('bgwidth')
                                .css({
                                    'margin-top': -($bg.height()/2), 
                                    'top': '50%',
                                    'left': '0',
                                    'margin-left': '0'                            
                                });
                        }
                        
                    }); // each section and pagetitle function
                    
                } //resizebg function
                
                theWindow.resize(resizeBg).trigger("resize");
                
                resizeBg();
              
                });  // window load function
        
        } //if body has no-backgroundsize class
            
    }); // document ready function
    
})(jQuery);


/*-----------------------------------------------------------------------------------*/
/* Sticky Footer
/*-----------------------------------------------------------------------------------*/

(function($){
  var footer;
 
  $.fn.extend({
    stickyFooter: function(options) {
      footer = this;
       
      positionFooter();
 
      $(window)
        .scroll(positionFooter)
        .resize(positionFooter);
 
      function positionFooter() {
        var docHeight = $(document.body).height() - $("#sticky-footer-push").height();
        if(docHeight < $(window).height()){
          var diff = $(window).height() - docHeight;
          if (!$("#sticky-footer-push").length > 0) {
            $(footer).before('<div id="sticky-footer-push"></div>');
          }
          $("#sticky-footer-push").height(diff);
        }
      }
    }
  });
})(jQuery);



jQuery("#footer").stickyFooter();

/*-----------------------------------------------------------------------------------*/
/* Superfish Initialization
/*-----------------------------------------------------------------------------------*/

jQuery(function() { 
      jQuery('ul.sf-menu').superfish({ 
          autoArrows:  true
      }); 
});

/*-----------------------------------------------------------------------------------*/
/* jQuery Mobile Nav Helper
/*-----------------------------------------------------------------------------------*/

/* Mobile Nav will work without jQuery, this just helps User Experience */

jQuery(document).ready(function($){
  
  $(".scroll").click(function(event){
    event.preventDefault();
    $this = $(this);

    var offset = $($(this).attr('href')).offset().top;
    $('html, body').animate({scrollTop:offset - 75}, 500, 'easeOutCubic');

    $links = $this.parent().find('div.mobilenavigation ul a').not('div.mobilenavigation ul li#back a, div.mobilenavigation ul li#back_top a');
    $backlinks = $this.parent().find('div.mobilenavigation ul li#back, div.mobilenavigation ul li#back_top');

    $links.addClass('display');
    $backlinks.addClass('display');
  });


  $(".menutop").click(function(event){
    event.preventDefault();
    $this = $(this);

    $links = $this.closest('.mobilenavcontainer').find('div.mobilenavigation ul a').not('div.mobilenavigation ul li#back a, div.mobilenavigation ul li#back_top a');
    
    $backlink =  $this.parent('.display').removeClass('display');
    $links.removeClass('display');

  });

});

	
/*-----------------------------------------------------------------------------------*/
/* Pretty Photo
/*-----------------------------------------------------------------------------------*/
var viewportWidth = jQuery('body').innerWidth();
	
	jQuery(function(){
		var lighboxSkin = jQuery('body').attr('data-lightbox') ? jQuery('body').attr('data-lightbox') : 'light_square';
	   jQuery("a[rel^='prettyPhoto']").prettyPhoto({
			animation_speed: 'fast', /* fast/slow/normal */
			slideshow: 5000, /* false OR interval time in ms */
			autoplay_slideshow: false, /* true/false */
			opacity: 0.80, /* Value between 0 and 1 */
			show_title: false, /* true/false */
			allow_resize: true, /* Resize the photos bigger than viewport. true/false */
			default_width: 500,
			default_height: 344,
			counter_separator_label: '/', /* The separator for the gallery counter 1 "of" 2 */
			theme: lighboxSkin, /* light_rounded / dark_rounded / light_square / dark_square / facebook */
			horizontal_padding: 20, /* The padding on each side of the picture */
			hideflash: false, /* Hides all the flash object on a page, set to TRUE if flash appears over prettyPhoto */
			wmode: 'opaque', /* Set the flash wmode attribute */
			autoplay: true, /* Automatically start videos: True/False */
			modal: false, /* If set to true, only the close button will close the window */
			deeplinking: true, /* Allow prettyPhoto to update the url to enable deeplinking. */
			overlay_gallery: true, /* If set to true, a gallery will overlay the fullscreen image on mouse over */
			keyboard_shortcuts: true, /* Set to false if you open forms inside prettyPhoto */
			changepicturecallback: function(){
                // 1024px is presumed here to be the widest mobile device. Adjust at will.
                if (viewportWidth < 480) {
                    $(".pp_pic_holder.pp_default").css("top",window.pageYOffset+"px");
                }
            
            }, /* Called everytime an item is shown/changed */
			callback: function(){}, /* Called when prettyPhoto is closed */
			ie6_fallback: true,
            social_tools: ''
			});
	});
	
	
/*-----------------------------------------------------------------------------------*/
/* Hover Effects
/*-----------------------------------------------------------------------------------*/

    function hover_overlay_slides() {
         jQuery('.featured-image a').not('.section .featured-image a, .featured-image .nivo-directionNav a').each(function() {
             var $this = jQuery(this).parent().find('img');
                jQuery(this).hover( function() {
                    $this.stop().animate({opacity : 0.5}, 250, 'easeOutCubic');
                }, function() {
                    $this.stop().animate({opacity : 1}, 250, 'easeOutCubic');
                });
         });
    }
    
    function hover_overlay_portfolio() {
       
         jQuery('a.thumblink').each(function() {
          jQuery(this).closest('.featured-image').addClass('highlight').addClass('loaded').css({'min-height': '0'});;
          var $this = jQuery(this).find('img');
                $this.hover( function() {
                    $this.stop().animate({opacity : 0.5}, 250, 'easeOutCubic');
                }, function() {
                    $this.stop().animate({opacity : 1}, 250, 'easeOutCubic');
                });
         });
    }
    
    function hide_loading() {
    	jQuery('.featured-image').not('.isobrick .featured-image').css({'background': 'none', 'min-height': '0'});
        
    }
    
    (function($){ $(window).load(function() { hover_overlay_portfolio();  hide_loading(); }); })(jQuery); 
   
    
    function hover_overlay_images() {
    
     jQuery('a img').not('.slider a img, .featured-image a img, .ag_recentprojects_widget a img').each(function() {
        jQuery(this).hover( function() {
            var $this = jQuery(this).parent().children('img');
            jQuery($this).stop().animate({opacity : 0.5}, 250, 'easeOutCubic');
        }, function() {
            var $this = jQuery(this).parent().children('img');
            jQuery($this).stop().animate({opacity : 1}, 250, 'easeOutCubic');
        });
        
      });
      
    }
    
    hover_overlay_images();
		

/*-----------------------------------------------------------------------------------*/
/*  Scroll to Top by Andre Gagnon
/*-----------------------------------------------------------------------------------*/

jQuery(document).ready(function() {
						   
  jQuery(window).scroll(function () {
						   
 	  var y_scroll_pos = window.pageYOffset;
    var scroll_pos_test = 50;             // set to whatever you want it to be
	
    if(y_scroll_pos > scroll_pos_test) {
        jQuery('.top').fadeIn(1000);
        jQuery('.iphone').children('.top').css('display', 'none !important');
		} else { 
      jQuery('.top').fadeOut(500);
    }

	});

	jQuery('.top').click(function(){
			jQuery('html, body').animate({scrollTop:0}, 500, 'easeOutCubic');
			return false;
	});
});


/*-----------------------------------------------------------------------------------*/
/*  jQuery Isotope
/*-----------------------------------------------------------------------------------*/

if(jQuery().isotope) {

var $selector = '*';
      
	jQuery(window).load(function($){
	    var $container = jQuery('div.isotopecontainer');  

	  	$container.each(function($) {
	  		var $this = jQuery(this),
	  	 	 	columnNumber = $this.attr('data-value'),
	  	 	 	isoBrick = jQuery('.isobrick'),
	  	 	 	$colnum2;

				isoBrick.css({
					'margin-left': 0,
					'margin-right': 0 
				});
		  
			  /* Calculate column number */
			  /*====================================*/

			  if ($this.width() < 500 ) {
			    $colnum2 = 2;
			  } else {
			    $colnum2 = columnNumber;
			  }

			  /* Call Isotope with selected Columns */
			  /*====================================*/

			  if (columnNumber != '1') {

				  $this.isotope({
				  masonry: {
				      columnWidth: $this.width() / $colnum2
				    },
				    itemSelector : '.isobrick',
				    layoutMode : 'masonry'
				  });

				}


			  /* Run Isotope on Resize Event */
			  /*=============================*/

			  jQuery(window).resize(function () {

			     if ($this.width() < 500 ) {
				    $colnum2 = 2;
				  } else {
				    $colnum2 = columnNumber;
				  }


				if (columnNumber != '1') {
				      /* Resize Isotope Container */
				      $this.isotope({
				          // update columnWidth to a percentage of container width
				          masonry: { 
				          	columnWidth: $this.width() / $colnum2
				           },
				          itemSelector : '.isobrick',
				          layoutMode : 'masonry'
				      });
				}	
			      
			  });

		  	  /* Filter when link is clicked */
			  /*=============================*/

				jQuery('#filters a, a.filtersort').click(function(){
				    jQuery('#filters a').removeClass("active");

				      $selector = jQuery(this).attr('data-filter');
				      
				          jQuery('#filters a').each(function() {
				              $filterselect = jQuery(this).attr('data-filter');
				              if ($filterselect == $selector){
				              	jQuery(this).addClass("active");
				              }
				          });

				      $this.isotope({ filter: $selector });
				      return false;
				});

			  /* Run Infinite Scroll         */
			  /*=============================*/

				$this.infinitescroll({
				    navSelector  : '.more-posts',    // selector for the paged navigation 
				    nextSelector : '.more-posts a',  // selector for the NEXT link (to page 2)
				    itemSelector : '.isobrick',     // selector for all items you'll retrieve
				    loading: {
				        finishedMsg: '',
				        img: twAjax.get_template_directory_uri + '/images/loader.gif',
				        msgText: ''
				      }
				    },
				    // call Isotope as a callback
				    function( newElements ) {
              var $newElements = jQuery(newElements).hide(); // hide to begin with
				    	
              jQuery('.more-posts').fadeIn('slow');

              $newElements.imagesLoaded(function(){
                $newElements.fadeIn(); // fade in when ready
                $this.isotope( 'insert', jQuery( newElements ), function(){  
                    hover_overlay_portfolio();   
                }); 
              });
				    }
				);

				// kill scroll binding for manual clicking of button
        jQuery(window).unbind('.infscr');

				jQuery('.more-posts a').click(function(){ 
					jQuery(document).trigger('retrieve.infscr');
					$this.infinitescroll('retrieve'); 
					return false; 
				});

	  	}); // End Each

	}); // End Window Load

} // if isotope

 					
/*-----------------------------------------------------------------------------------*/
/* Flexible Sliders
/*-----------------------------------------------------------------------------------*/

// Revolution Slider

var tpj = jQuery;               // MAKE JQUERY PLUGIN CONFLICTFREE
tpj.noConflict();

tpj(document).ready(function () {


    if (tpj.fn.cssOriginal != undefined)   // CHECK IF fn.css already extended
        tpj.fn.css = tpj.fn.cssOriginal;

    var slider = tpj('.revolution-district .fullwidthbanner'),
        container = slider.closest('.fullwidthbanner-container'),
        autoDelay = container.data('delay'),
        height = container.data('height');

    if (!autoDelay) {
        autoDelay = 9999999999999999999999;
    }

    if (!height) {
        height = 575;
    }

    if (tpj.fn.revolution) {
        slider.revolution({
            delay: autoDelay,
            startheight: height,
            startwidth: 960,

            minHeight: 375,

            hideThumbs: 200,

            thumbWidth: 100,
            thumbHeight: 50,
            thumbAmount: 5,

            navigationType: "both",
            navigationArrows: "verticalcentered",
            navigationStyle: "round",
            touchenabled: "on",
            onHoverStop: "on",

            navOffsetHorizontal: 0,
            navOffsetVertical: 20,

            hideCaptionAtLimit: 0,
            hideAllCaptionAtLilmit: 0,
            hideSliderAtLimit: 0,

            stopAtSlide: -1,
            stopAfterLoops: -1,

            shadow: 1,
            fullWidth: "on"

        });

    }
});

(function($){  //Self Invoking Anonymous Function


/*-----------------------------------------------------------------------------------*/
/* Slider for the Blog Posts, Sections and Portfolio Items
/*-----------------------------------------------------------------------------------*/

jQuery('ul.bxslider').each(function() {
	var $this = jQuery(this);
    $this.bxSlider({
      adaptiveHeight: true,
      mode: 'fade',
      pager: false,
      touchEnabled: true,
      captions: true,
      preloadImages: 'visible',
      onSliderLoad: function() {
      	$this.css('position', 'relative');
        $this.closest('div.featured-image').find('.bx-controls-direction a').animate({'opacity': 1}, 500);
      	$this.animate({'opacity': 1}, 500, function() {
        	$this.closest('div.featured-image').css({
            	'min-height': 'none',
                'background': 'none'
                });
            hover_overlay_slides();
        });
      }
    }); 
});  

})(jQuery); 

/*-----------------------------------------------------------------------------------*/
/* FitVid Fluid Video
/*-----------------------------------------------------------------------------------*/

jQuery(document).ready(function(){
    jQuery("body").fitVids();
});
 
/*-----------------------------------------------------------------------------------*/
/* Form Validation
/*-----------------------------------------------------------------------------------*/
 
jQuery(document).ready(function(){
	jQuery("#contactform").validate();
	jQuery("#quickform").validate();
  jQuery("#commentsubmit").validate();
});

/*-----------------------------------------------------------------------------------*/
/* Tabs
/*-----------------------------------------------------------------------------------*/

if(jQuery() .tabs) {   
  jQuery( "#tabs" ).tabs().addClass( "ui-tabs-vertical ui-helper-clearfix" );
  jQuery( "#tabs li" ).removeClass( "ui-corner-top" ).addClass( "ui-corner-left" );
  jQuery( "#tabs" ).tabs({ fx: { opacity: 'toggle' } });
};

jQuery(document).ready(function($) {

  /* Tabs Activiation
  ================================================== */

  var tabs = $('ul.tabs');

  tabs.each(function(i) {

    //Get all tabs
    var tab = $(this).find('> li > a');

    // make first active
    $('.tabs-content').find('li:first-child').addClass('active');

    tab.click(function(e) {

      //Get Location of tab's content
      var contentLocation = $(this).attr('href');

      //Let go if not a hashed one
      if(contentLocation.charAt(0)=="#") {

        e.preventDefault();
        //Make Tab Active
        tab.removeClass('active');
        $(this).addClass('active');

        //Show Tab Content & add active class
        $(contentLocation).fadeIn(500).addClass('active').siblings().hide().removeClass('active');

      }
    });
  });
}); 

/*-----------------------------------------------------------------------------------*/
/* Toggle
/*-----------------------------------------------------------------------------------*/
jQuery(document).ready(function(){
	jQuery("h3.ag-toggle-trigger").click(function(){
		jQuery(this).toggleClass("active").next().slideToggle("fast");
		return false;
	});
}); 
/*-----------------------------------------------------------------------------------*/
/* Accordion
/*-----------------------------------------------------------------------------------*/
jQuery(document).ready(function(){
	if (jQuery.isFunction(jQuery.fn.accordion)) {
		jQuery(".ag-accordion").accordion({autoHeight: false});
	}
});