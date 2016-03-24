$(function() {
	if ( $('.introduction .banner').length > 0 ) {
		$('.introduction .banner').css({
			'background': 'url("'+$('.introduction .banner img').attr('src')+'") no-repeat center center',
			'background-size': 'cover'
		});
	}
	if ( $('.tile-element').length > 0 ) {
		$('.tile-element img.bg').each(function() {
			$(this).parent().css({
				'background': 'url("'+$(this).attr('src')+'") no-repeat center center',
				'background-size': 'cover'
			});
		});
	}
	$('.progress-bar li').each(function() {
		var p = eval($(this).find('em').text());
		$(this).find('h4').stop().delay(200).animate({
			'width': p+'%'
		}, 1000);
		$(this).find('span').stop().delay(200).animate({
			'opacity': '1'
		}, 500);
	});
	if ( $('.carousel').length > 0 ) {
		$('.carousel ul').jcarousel({
			scroll: 1,
			animation: 500,
			easing: 'easeInOutQuad',
			wrap: 'circular'
		});
		$('.carousel .jcarousel-container').bind('swipeleft', function() {
			$('.carousel .jcarousel-next').trigger('click');
		});
		$('.carousel .jcarousel-container').bind('swiperight', function() {
			$('.carousel .jcarousel-prev').trigger('click');
		});
	}
	if ( $('input[type="checkbox"]').length > 0 ) {
		$('input[type="checkbox"]').uniform();
	}
	$('.modal').append('<span class="close"></span>');
	$('[data-open]').bind('click', function(e) {
		e.preventDefault();
		var t = $('.modal[data-target="'+$(this).attr('data-open')+'"]');
		$('.fade').stop(true,true).fadeIn(400);
		var h = $(window).scrollTop()+($(window).height()-t.outerHeight())/2;
		if ( h < 0 ) {
			h = 0;
		}
		t.css({
			'top': h+'px'
		}).stop(true,true).fadeIn(400);
	});
	$('.fade, .modal .close').bind('click', function(e) {
		e.preventDefault();
		$('.fade, .modal').stop(true,true).fadeOut(400);
	});
	$('input, textarea').each(function() {
		$(this).data('holder', $(this).attr('placeholder'));
		$(this).focusin(function() {
			$(this).attr('placeholder', '');
		});
		$(this).focusout(function() {
			$(this).attr('placeholder', $(this).data('holder'));
		});
	});
});