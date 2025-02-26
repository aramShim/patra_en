$(document).ready(function(){
	mainFullpage();

	main.introduction.init();

	const $mainPop = $("#layer-popup-pr");
	if($mainPop.hasClass('show')){
		popupAction();
	}

	$(".arr-down a").on("click", function(e){
		e.preventDefault();
		$.fn.fullpage.moveTo(2);
	});
	
});
$(window).on("load", function(){

	//introPhotoFlow();
	mainVisualSlider();
	brandVisualSlider();
	AOS.init({
		duration: 600,
		once: true,
	});

	$("#fullpage").find("a").attr("tabindex","-1");
	$("#fullpage").find("button").attr("tabindex","-1");

	$(".skip-nav a").on("click", function(e){
		if($(this).attr("href") == "#footer"){
			e.preventDefault();
			$("#container").attr("tabindex", 0).focus();
			$(".section").find("[data-aos]").addClass("aos-animate");
			$.fn.fullpage.moveTo(5);
		}
	});
});

function popupAction(){
	const dayClose = document.querySelector("#input-day-close");
	const oneWeek = 604800;

	$(window).on("load", function(){
		$.fn.fullpage.setAllowScrolling(false);
	});

	$('#btn-pop-close, .btn-pop-footer-close').on('click', function(){
		$.fn.fullpage.setAllowScrolling(true);
		$("#layer-popup-pr, .overlay").removeClass('show');

		if (dayClose.checked) {
			document.cookie = "MAIN_NOTICE=1; max-age=" + oneWeek;
		}
	});
}

function mainFullpage(){
	const $header = $("#header");
	const $sec = $(".section");
	let isPc = ($("html").hasClass("pc")) ? true : false;

	let iscrollEnded = false;
	let iscrollTimeout;

	$("#fullpage").fullpage({
		anchors: ['page1', 'page2', 'page3', 'page4', 'page5'],
		verticalCentered: true,
		scrollOverflow: isPc,
		scrollOverflowReset: false,
		scrollOverflowOptions: {
			disablePointer: false,
			scrollbars: false,
			probeType: 3,
			useTransition: true
		},
		navigation: false,
		css3: true,
		fitToSection: true,
		responsiveWidth: 1100,
		scrollingSpeed: 800,
		easing: 'linear',
		afterRender: function () {
			$.fn.fullpage.silentMoveTo(1);
		},
		onLeave : function(index, nextIndex, direction){
			if(direction =="down") {
				$header.addClass("scrolled");
				addAnimation(direction);
			}else{
				if( nextIndex == 1) {
					$header.removeClass("scrolled");
					$(".pc .go-top").removeClass("on");
				}
				if(index < 3) removeAnimation();
			}
		},
		afterLoad: function(anchorLink, index){
			if(index > 1){
				$(".pc .go-top").addClass("on");

				if(index == $sec.length){
					$sec.find("[data-aos]").addClass("aos-animate");
				}else{
					addAnimation();
				}
			} else {
				removeAnimation();
			}

			iscrollEnded = true;
			clearTimeout(iscrollTimeout);
			var iscroll = $('.pc .fp-section.active').find('.fp-scrollable');
			var iscrollData = $('.pc .fp-section.active').find('.fp-scrollable').data('iscrollInstance');
			if(iscroll.length == 1){
				iscrollEnded = false;
				iscrollData.on('scroll', function(){
					if((this.y == 0 && this.directionY !== 1) || (this.y == this.maxScrollY && this.directionY !== -1)){
						iscrollTimeout = setTimeout(function(){
							iscrollEnded = true;
						}, 500)
					}
					$.fn.fullpage.setAllowScrolling(iscrollEnded);
				})
			}else{
				$.fn.fullpage.setAllowScrolling(true);
			}

		},
	});

	function removeAnimation(){
		$(".pc .section [data-aos]").removeClass("aos-animate");
	}
	function addAnimation(direction){
		if(direction){
			$(".pc .section.active + .section [data-aos]").addClass("aos-animate");
		}else{
			$(".pc .section.active [data-aos]").addClass("aos-animate");
		}
	}

	$(".pc .main .go-top").on("click", function(){
		removeAnimation();
		$.fn.fullpage.moveTo(1);
	});

	let scrollTop;
	$(window).on("scroll", function(){
		scrollTop = $(window).scrollTop();
		if($("html").hasClass("mobile")){
			(scrollTop > 56) ? $header.addClass("scrolled") : $header.removeClass("scrolled");
		}
	});
}
function brandVisualSlider(){
	let visualSLiderTotal = $(".brand-visual .swiper-slide").length;
	let delay = 6965;
	let brandVisual = new Swiper(".brand-visual",{
		loop: true,
		speed: 600,
		autoplay: {
			delay: delay,
			disableOnInteraction: false,
		},

		observeParents:true,
		observeSlideChildren: true,
	});

	brandVisual.on("slideChangeTransitionStart", function(){
		$(".visual-progressbar").removeClass("play");
	});
	brandVisual.on("slideChangeTransitionEnd", function(){
		$(".visual-progressbar").addClass("play");
	});

	brandVisual.on("slideChange", function(){
		$(".sec-brand .visual-swiper-control .current-page").text(`0${brandVisual.realIndex + 1}`);
	});

	$(".sec-brand .visual-swiper-control .btn-swiper-next").on("click", function(){
		brandVisual.slideNext();
	})
	$(".sec-brand .visual-swiper-control .btn-swiper-prev").on("click", function(){
		brandVisual.slidePrev();
	});
}
function mainVisualSlider(){
	let visualSLiderTotal = $(".main-visual .swiper-slide").length;
	let delay = 6965;
	let mainVisual = new Swiper(".main-visual",{
		effect:'fade',
		loop: true,
		speed: 600,
		autoplay: {
			delay: delay,
			disableOnInteraction: false,
		},

		observeParents:true,
		observeSlideChildren: true,
	});

	$(".main-visual .visual-progressbar").addClass("play");
	$(".main-visual .visual-progressbar.play .bar").css("animation-duration", `${delay}ms`);

	mainVisual.on("slideChangeTransitionStart", function(){
		$(".main-visual .visual-progressbar").removeClass("play");
	});
	mainVisual.on("slideChangeTransitionEnd", function(){
		$(".main-visual .visual-progressbar").addClass("play");
	});

	mainVisual.on("slideChange", function(){
		$(".main-visual .visual-swiper-control .current-page").text(`0${mainVisual.realIndex + 1}`);
		//videoPromiss();
	});
	$(".main-visual .visual-swiper-control .total-page").text(`0${visualSLiderTotal}`);

	mainVisual.on("beforeTransitionStart", function(){
		videoReset();
	});


	$(".main-visual .visual-swiper-control .btn-swiper-next").on("click", function(){
		mainVisual.slideNext();
	})
	$(".main-visual .visual-swiper-control .btn-swiper-prev").on("click", function(){
		mainVisual.slidePrev();
	});



	
	function videoReset(){
		const video = document.querySelector('.main-visual .swiper-slide-active video');
		if (video !== null) { video.currentTime = 0; }
	}

	const $btnStop = $(".main-visual .visual-swiper-control .btn-swiper-stop");
	$btnStop.on("click", function(){
		$(this).hasClass("on") ? sliderPlay() : sliderStop();
	});

	function sliderStop(){
		$btnStop.addClass("on");
		mainVisual.autoplay.stop();
	}
	function sliderPlay(){
		$btnStop.removeClass("on");
		mainVisual.autoplay.start();
	}
}

function introPhotoFlow(){

	let bannerLeft = 0;
	let first = 1;
	let last;
	let imgCnt = 0;
	const $img = $(".scroller-row picture");
	const $slider = $(".scroller-row ");
	let $first;
	let $last;
	let firstImgWidth;
	let imgGap;
	let wrapperHeight;
	const imgWidth = [];
	const speed_fast = 1;
	const speed_slow = 0.5;
	let speed = speed_fast;
	let rate;

	[...$img].forEach((el, index) => {
		imgWidth[index] = $(el).width();
	});

	function imgSize(rate){
		[...$img].forEach((el, index) => {
			$(el).css("width", imgWidth[index] * rate);
		});
	}

	function imgSet(){
		rate = ($("html").hasClass("pc")) ? 0.6666 : 0.37;
		imgSize(rate);

		bannerLeft = 0;
		imgCnt = 0;
		wrapperHeight = 0;
		firstImgWidth = -1 * imgWidth[0] * rate;
		imgGap = $("html").hasClass("pc") ? 24 : 12;

		[...$img].forEach((el, index) => {
			const $this = $(el);

			$this.css("left", bannerLeft);
			bannerLeft += $this.width() + imgGap;
			$this.attr("id", "banner" + (++imgCnt));

			if(wrapperHeight < $this.height()){
				wrapperHeight = $this.height();
			}
		});

		$slider.css("height", wrapperHeight);
	}

	imgSet();

	const mediaQueryList = window.matchMedia("(max-width: 1099px)");
	mediaQueryList.addEventListener("change", function() {
		imgSet();

		first = 1;
		last = imgCnt;
	});

	$slider.on("mouseenter", ()=>{ speed = speed_slow; });
	$slider.on("mouseleave", ()=>{ speed = speed_fast; });

	if (imgCnt > 4) {
		last = imgCnt;
		setInterval(function () {
			$img.each(function () {
				$(this).css("left", $(this).position().left - speed);
			});
			$first = $("#banner" + first);
			$last = $("#banner" + last);

			if ($first.position().left < $first.width()*2*-1 ) {
				$first.css("left", $last.position().left + $last.width() + imgGap);
				first++;
				last++;
				if (last > imgCnt) { last = 1; }
				if (first > imgCnt) { first = 1; }
			}
		}, 10);
	}
};




var main = {		
	introduction : {
		container : null,			
		init : function(){
			this.container = $('.main-introduction');		
			var outDuration = 60;
			var overDuration = 160;
			
			var firstElement , firstElementDom , secondElement , secondElementDom, thirdElement , thirdElementDom;
			
			firstElementDom = '';
			secondElementDom = '';
			thirdElementDom = '';
			this.container.find('.scroller-group').find('picture').each(function(){				
				if($(this).hasClass('nav-1') || $(this).hasClass('nav-3')){
					firstElementDom += $(this)[0].outerHTML;
					
				}else if($(this).hasClass('nav-2') || $(this).hasClass('nav-4')){
					secondElementDom += $(this)[0].outerHTML;					
				}else {
					thirdElementDom += $(this)[0].outerHTML;
				};
			});

			firstElement = '<div class="scroller-group">' + firstElementDom + '</div>';			
			secondElement = '<div class="scroller-group">' + secondElementDom + '</div>';
			thirdElement = '<div class="scroller-group">' + thirdElementDom + '</div>';
			this.container.find('.main-introduction-data .row-1').html('');
			
			for(var i = 0; i < 3; i ++){
				this.container.find('.main-introduction-data .row-1').append(firstElement);
			};
			for(var k = 0; k < 3; k++){
				this.container.find('.main-introduction-data .row-2').append(secondElement);
			};	
			for(var j = 0; j < 3; j++){
				this.container.find('.main-introduction-data .row-3').append(thirdElement);
			};				
		
			
			var timeline1 = gsap.timeline({repeat : -1, duration : 1});
			
			timeline1.to( this.container.find('.row-1 .scroller-group').eq(0) , { x : ' -100%' , duration : outDuration , ease:Linear.easeNone } , 0);		
			timeline1.to( this.container.find('.row-1 .scroller-group').eq(1) , { x : ' -100%' , duration : outDuration , ease:Linear.easeNone } , 0);		
			timeline1.to( this.container.find('.row-1 .scroller-group').eq(2) , { x : ' -100%' , duration : outDuration , ease:Linear.easeNone } , 0);		
			
			$(document).on('mouseenter mouseleave' , '.main-introduction .row-1' , function(e){
				if(e.type == 'mouseenter'){
					timeline1.duration	(overDuration);		
				}else{
					timeline1.duration	(outDuration);							
				};
			});
			
			var timeline2 = gsap.timeline({repeat : -1, duration : 1});
			
			timeline2.to( this.container.find('.row-2 .scroller-group').eq(0) , { x : ' 100%' , duration : outDuration , ease:Linear.easeNone } , 0);		
			timeline2.to( this.container.find('.row-2 .scroller-group').eq(1) , { x : ' 100%' , duration : outDuration , ease:Linear.easeNone } , 0);		
			timeline2.to( this.container.find('.row-2 .scroller-group').eq(2) , { x : ' 100%' , duration : outDuration , ease:Linear.easeNone } , 0);		
			
			$(document).on('mouseenter mouseleave' , '.main-introduction .row-2' , function(e){
				if(e.type == 'mouseenter'){
					timeline2.duration	(overDuration);		
				}else{
					timeline2.duration	(outDuration);							
				};
			});

			var timeline3 = gsap.timeline({repeat : -1, duration : 1});
			
			timeline3.to( this.container.find('.row-3 .scroller-group').eq(0) , { x : ' -100%' , duration : outDuration , ease:Linear.easeNone } , 0);		
			timeline3.to( this.container.find('.row-3 .scroller-group').eq(1) , { x : ' -100%' , duration : outDuration , ease:Linear.easeNone } , 0);		
			timeline3.to( this.container.find('.row-3 .scroller-group').eq(2) , { x : ' -100%' , duration : outDuration , ease:Linear.easeNone } , 0);		
			
			$(document).on('mouseenter mouseleave' , '.main-introduction .row-3' , function(e){
				if(e.type == 'mouseenter'){
					timeline3.duration	(overDuration);		
				}else{
					timeline3.duration	(outDuration);							
				};
			});				
		}
	},	

};

