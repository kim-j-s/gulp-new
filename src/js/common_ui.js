var ui = {
	/*
	* comment  : reset
	*/
	window: {
		$this: $(window),
		height: null,
		scrollTop: null
	},
	document: {
		$this: $(document),
		height: null,
	},
	$header: null,
	init: function() {
		this.fxEventWindow();
		//this.fxHeader();
		this.fxCheckAll();
		this.fxSlide();
		this.fxpageTop();
		this.fxoutOff();
		this.fxCopyUrl();
	},
	/**
     * comment  : �덈룄�� �대깽��
     * param    :
     * @author  :
     * @date    :
     */
	 fxEventWindow: function() {
		$(function() {
				ui.$body = $('body');
				ui.$topBanner = $('.top-banner');
				ui.$header = $('header');
				ui.$headerTop = $('.header-top');
				ui.$wrap = $('.wrap');
				ui.$footer = $('footer');
				ui.$quickMenu = $('.quick-menu');
		});
		ui.window.$this.on({
				'load': function() {
						ui.window.scrollTop = ui.window.$this.scrollTop();
						ui.window.height = ui.window.$this.height();
						ui.document.height = ui.document.$this.height();
						ui.$topBanner.height = ui.$topBanner.outerHeight();
						ui.$header.height = ui.$header.outerHeight();
						ui.$wrap.height = ui.$wrap.outerHeight();
						ui.$footer.height = ui.$footer.outerHeight();
				},
				'scroll': function() {
						ui.window.scrollTop = ui.window.$this.scrollTop();
						ui.window.height = ui.window.$this.height();
						ui.document.height = ui.document.$this.height();
						ui.$topBanner.height = ui.$topBanner.outerHeight();
						ui.$header.height = ui.$header.outerHeight();
						ui.$wrap.height = ui.$wrap.outerHeight();
						ui.$footer.height = ui.$footer.outerHeight();
				},
				'resize': function() {
						ui.window.height = ui.window.$this.height();
				}
		})
},
	/*
	* comment  : header
	*/
	fxHeader: function() {
		if ($('header').length) {
			ui.window.$this.on({
				'scroll': function() {
					// 만약 탑 베너가 존재하고 스크롤 높이가 0보다 큰 경우
					if (ui.window.scrollTop > 0 && $('.top-banner').length > 0) {
						// 탑 베너가 존재하는 경우 탑 베너 높이보다 스크롤이 클 경우 header fix 부여
						if (ui.window.scrollTop > ui.$topBanner.height) {
							console.log('1', ui.window.scrollTop, ui.$topBanner.height);
							$('header').addClass('fix');
							//$('.search-wrap').removeClass('active');
						}
					} else if (ui.window.scrollTop && $('.top-banner').length === 0) {
						console.log('2');
						$('header').addClass('fix');
						//$('.search-wrap').removeClass('active');
					}
					if (ui.window.scrollTop < ui.$header.offset().top && $('.top-banner').length > 0) {
						console.log('3');
						$('header').removeClass('fix');
					} else if (ui.window.scrollTop && $('.top-banner').length === 0) {
						console.log('4');
						$('header').removeClass('fix');
					}
				},
			});
		}
	},
	/*
	* comment  : check all checkbox
	*/
	fxCheckAll: function() {
		function enableCheckAll(element) {
			$(element).each(function(){
				var $chkItems = $(this).find(':checkbox').not('.checkall');
				$(this).find('.checkall').click(function() {
					$chkItems.prop('checked', this.checked);
				});
				$chkItems.change(function() {
					var numOfChecked = $chkItems.filter(':checked').length,
						numOfCheckboxes = $chkItems.length,
						isAllChecked = numOfChecked === numOfCheckboxes;
					$(this).closest(element).find('.checkall').prop('checked', isAllChecked);
				});
			});
		}
		enableCheckAll('.chkall-group');
	},
	/*
	* comment  : slide
	*/
	fxSlide: function() {
		$('.slide-trg').each(function(){
			var $trg = $(this);
			if ( $trg.hasClass('active') ) {
        $(this).closest('.slide-title').next('.slide-cont').find('.inner').css('display', 'block');
			}
		});
		$(document).on('click', '.slide-wrap .slide-trg', function(e) {
      var slideTime = 300;
			e.preventDefault();
			console.log('fxSlide');
			if ($(this).closest('.slide-title').next('.slide-cont').find(' .inner').css('display') === 'block') {
				$(this).closest('.slide-wrap').find('.slide-trg').removeClass('active');
				$(this).closest('.slide-wrap').find('.slide-cont').find('.inner').slideUp(slideTime);
			} else {
        $(this).closest('.slide-wrap').find('.slide-trg').removeClass('active');
				$(this).addClass('active');
        $(this).closest('.slide-wrap').find('.slide-cont').find('.inner').slideUp(slideTime);
				$(this).closest('.slide-title').next('.slide-cont').find('.inner').slideDown(slideTime);
			}
		});
	},
  fxpageTop: function() {
    $(document).on('click', '.page-top', function(e) {
      $('html, body').animate({
        scrollTop: 0
      }, 300);
    });
  },
  fxoutOff: function() {
		$('[data-tipopen]').on('click', function(){
			$(this).closest('.tooltip').find('.tooltip-cont').addClass('active');;
			return false;
		});
    $(window).on('click', function(event) {
      if (!$(event.target).closest('[data-widthout]').length) {
        $('[data-widthout]').removeClass('active');
      }
    });
  },
	fxCopyUrl: function() {
		var ct;
		$(document).on('click', '.clipboard', function(e) {
			e.preventDefault();
			end();
			var dummy = document.createElement("input");
			var text = location.href;
			document.body.appendChild(dummy);
			dummy.value = text;
			dummy.select();
			document.execCommand("copy");
			document.body.removeChild(dummy);
			$('.toast-msg').addClass('active');
			start();
    });

    function start() {
			ct = setTimeout(function() {
				$('.toast-msg').removeClass('active');
			}, 1000);
    }

    function end() {
      clearTimeout(ct);
    }
	},
}



$(function() {
  ui.init();

	var swiper = [];
	$('.sw').each(function(i){
		if ( $(this).hasClass('progress') ) {
			swiper[i] = new Swiper(this, {
				//slidesPerView: 1,
				spaceBetween: 20,
				loop: true,
				speed: 500,
				pagination: {
					el: '.swiper-pagination',
					type: "progressbar",
				},
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				},
			});
		} else if ( $(this).hasClass('pager') ) {
			swiper[i] = new Swiper(this, {
				slidesPerView: 2,
				spaceBetween: 0,
				loop: true,
				speed: 500,
				pagination: {
					el: '.swiper-pagination',
					clickable: true,
				},
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				},
			});
		} else if ( $(this).hasClass('autoplay') ) {
			swiper[i] = new Swiper(this, {
				autoplay: true,
				spaceBetween: 0,
				loop: true,
				speed: 500,
				pagination: {
					el: '.swiper-pagination',
					type: "fraction",
				},
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				},
			});
			$(this).find(".swiper-autoplay-play").click(function(){
				$(this).removeClass('active');
				swiper[i].autoplay.start();
			});
			$(this).find(".swiper-autoplay-stop").click(function(){
				$(this).prev().addClass('active');
				swiper[i].autoplay.stop();
			});
		} else {
			swiper[i] = new Swiper(this, {
				spaceBetween: 100,
				loop: true,
				speed: 500,
			});
		}
	});


});