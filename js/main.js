$(document).ready(function () {
  const $mainPop = $("#layer-popup-pr");
  if ($mainPop.hasClass("show")) {
    popupAction();
  }
});
$(window).on("load", function () {
  mainVisualSlider();

  AOS.init({
    duration: 600,
    once: true,
  });
});

function popupAction() {
  const dayClose = document.querySelector("#input-day-close");
  const oneWeek = 604800;

  $("#btn-pop-close, .btn-pop-footer-close").on("click", function () {
    $.fn.fullpage.setAllowScrolling(true);
    $("#layer-popup-pr, .overlay").removeClass("show");

    if (dayClose.checked) {
      document.cookie = "MAIN_NOTICE=1; max-age=" + oneWeek;
    }
  });
}

function mainVisualSlider() {
  let delay = 6965;
  let mainVisual = new Swiper(".main-visual", {
    cssMode: true,
    navigation: {
      nextEl: ".btn-swiper-prev",
      prevEl: ".btn-swiper-next",
    },
    pagination: {
      el: ".swiper-pagination",
    },
    mousewheel: true,
    keyboard: true,
    effect: "fade",
    loop: true,
    speed: 600,
    // autoplay: {
    //   delay: delay,
    //   disableOnInteraction: false,
    // },

    observeParents: true,
    observeSlideChildren: true,
  });

  // mainVisual.on("slideChangeTransitionStart", function () {
  //   $(".main-visual .visual-progressbar").removeClass("play");
  // });
  // mainVisual.on("slideChangeTransitionEnd", function () {
  //   $(".main-visual .visual-progressbar").addClass("play");
  // });

  // mainVisual.on("slideChange", function () {
  //   $(".main-visual .visual-swiper-control .current-page").text(
  //     `0${mainVisual.realIndex + 1}`,
  //   );
  //   //videoPromiss();
  // });

  // $(".main-visual .visual-swiper-control .btn-swiper-next").on(
  //   "click",
  //   function () {
  //     mainVisual.slideNext();
  //   },
  // );
  // $(".main-visual .visual-swiper-control .btn-swiper-prev").on(
  //   "click",
  //   function () {
  //     mainVisual.slidePrev();
  //   },
  // );
}
