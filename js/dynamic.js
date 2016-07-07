$(function() {
	function responsive() {
		var desktop = Modernizr.mq('(max-width:1299px) and (min-width:991px)');
		var tablet = Modernizr.mq('(max-width:990px) and (min-width:661px)');
		var mobile = Modernizr.mq('(max-width:660px)');
		var item, cols;
		col1 = $('footer > div').width();
		col2 = Math.floor((col1-21)/2);
		col3 = Math.floor((col1-21*2)/3);
		col4 = Math.floor((col1-21*3)/4);
		if ( desktop ) {
			item = col3;
			cols = 3;
		} else if ( tablet ) {
			item = col2;
			cols = 2;
		} else if ( mobile ) {
			item = col1;
			cols = 1;
		} else {
			item = col4;
			cols = 4;
		}
		if ( mobile ) {
			$('.index-m .aside').css({
				'min-height': 'none'
			});
		} else {
			$('.index-m .aside').css({
				'min-height': '373px'
			});
		}
		$('.grid > li').width(item);
		if ( mobile || tablet || desktop ) {
			$('.grid > li.wide').width(item);
		} else {
			$('.grid > li.wide').width(item*2+21);
		}
		$('.index-a .grid > li.aside').each(function() {
			var h = $(this).outerHeight();
			var s = $(this).siblings('.card').outerHeight();
			$(this).outerHeight(Math.ceil(h/s)*s);
		});
		$('.grid > li.aside').css({
			'left': item*(cols-1)+(cols-1)*21
		});
		if ( desktop ) {
			$('.index-m .grid > li').width(col2);
			$('.index-m .grid > li.aside').css({
				'left': col2+21+'px'
			});
		}
		if ( tablet || mobile ) {
			$('.main-b .core, .main-b aside, .introduction .lc, .introduction .rc').css({
				'float': 'none',
				'width': '100%'
			});
		} else if ( desktop ) {
			$('.main-b .core, .introduction .lc').css({
				'float': 'left',
				'width': col3*2+21+'px'
			});
			$('.main-b aside, .introduction .rc').css({
				'float': 'right',
				'width': col3+'px'
			});
		} else {
			$('.main-b .core, .introduction .lc').css({
				'float': 'left',
				'width': col4*3+42+'px'
			});
			$('.main-b aside, .introduction .rc').css({
				'float': 'right',
				'width': col4+'px'
			});
		}
	}
	function nav() {
		var w = $('header .type').position().left-$('header .logo').position().left-310;
		$('header nav').width(w);
		var l = 0;
		$('header nav > ul > li').each(function() {
			l += $(this).outerWidth();
		});
		$('header nav > ul > li > a').css({
			'padding-right': Math.ceil((w-l)/$('header nav > ul > li').size())+'px',
			'opacity': '1'
		});
	}
	responsive();
	$(window).load(function() {
		nav();
	});
	$(window).bind('resize', function() {
		responsive();
	});
	var bh = 0;
	function showMobileMenu() {
		$('.menu-m').stop().animate({
			'right': '17px'
		}, 400);
		$('.fade').stop().fadeIn(400);
		bh = $('body').scrollTop();
		$('body').css({'position': 'fixed', 'top': -bh+'px', 'overflow-y': 'scroll'});
	}
	function hideMobileMenu() {
		$('.menu-m').stop().animate({
			'right': '-320px'
		}, 400);
		$('.fade').stop().fadeOut(400);
		$('body').css({'position': 'static', 'top': '0', 'overflow-y': 'auto'});
		$('body').scrollTop(bh);
	}
	function currencyOpen() {
		$('.panel .drop ul').stop().slideDown(200);
		$('.panel .drop p').addClass('opened');
	}
	function currencyClose() {
		$('.panel .drop ul').stop().slideUp(200);
		$('.panel .drop p').removeClass('opened');
	}
	$('.panel .drop p').bind('click', function(e) {
		e.preventDefault();
		if ( $(this).siblings('ul').is(':hidden') ) {
			currencyOpen();
		} else {
			currencyClose();
		}
	});
	$('html').click(function() {
		currencyClose();
	});
	$('.panel .drop').click(function(e) {
		e.stopPropagation();
	});
	$('header .menu-open').bind('click', function(e) {
		e.preventDefault();
		showMobileMenu();
	});
	$('.menu-mobile-trigger').bind('swipeleft', function(e) {
		e.preventDefault();
		showMobileMenu();
		currencyClose();
	});
	$('.menu-m, .fade').bind('swiperight', function(e) {
		e.preventDefault();
		hideMobileMenu();
	});
	$('.fade').bind('click', function(e) {
		e.preventDefault();
		hideMobileMenu();
	});
	$('footer .menu-open').bind('click', function(e) {
		e.preventDefault();
		$(this).siblings('.nav-group').stop().slideToggle(400);
	});
	$('.index-a ul.grid, .index-m ul.grid, .lc ul.grid').masonry({
		itemSelector: '.card',
		gutter: 0,
		transitionDuration: 0,
		stamp: '.aside'
	});
	/*if ( $('.introduction .banner').length > 0 ) {
		$('.introduction .banner').css({
			'background': 'url("'+$('.introduction .banner img').attr('src')+'") no-repeat center center',
			'background-size': 'cover'
		});
	}*/
	$('img.bg').each(function() {
		$(this).parent().css({
			'background': 'url("'+$(this).attr('src')+'") no-repeat center center',
			'background-size': 'cover'
		});
	});
	$('.progress-bar li').each(function() {
		var p = eval($(this).find('em').text());
		$(this).find('h4').stop().delay(200).animate({
			'width': p+'%'
		}, 1000);
		var textWidth = $(this).find('h4 span').outerWidth();
		var barWidth = $(this).find('div').width()*p/100;
		if ( textWidth > barWidth ) {
			$(this).find('span').css({
				'right': -textWidth+'px',
				'color': '#000000'
			});
		} else {
			$(this).find('span').css({
				'right': '0',
				'color': '#ffffff'
			});
		}
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
	$('.file .upload').bind('click', function() {
		$(this).siblings('input[type="file"]').trigger('click');
	});
	$('.file input[type="file"]').change(function() {
		$(this).siblings('.title').text($(this).val().split('/').pop().split('\\').pop());
	});
	$('.side-sl').slick({
		infinite: true,
		arrows: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		adaptiveHeight: true,
		autoplay: true,
		autoplaySpeed: 5000
	});
});