$(document).ready(function () {
  //아코디언
  $(".section-header").click(function () {
    const parent = $(this).closest(".accordion-group");
    const content = parent.find(".section-content .detail-wrap");
    const plusIcon = $(this).find(".plus");
    const minusIcon = $(this).find(".minus");

    // active 클래스 토글
    parent.toggleClass("active");

    // slideToggle 효과 적용
    content.stop().slideToggle();

    // 아이콘 상태 변경
    plusIcon.toggleClass("hidden", !parent.hasClass("active"));
    minusIcon.toggleClass("hidden", parent.hasClass("active"));
  });

  //fancybox
  Fancybox.bind("[data-fancybox]", {
    // Your options go here
  });
});
var swiper = new Swiper(".mySwiper", {
  spaceBetween: 10,
  slidesPerView: 3,
  freeMode: true,
  watchSlidesProgress: true,
  navigation: {
    nextEl: ".btn-swiper-next",
    prevEl: ".btn-swiper-prev",
  },

  scrollbar: {
    el: ".swiper-scrollbar",
    draggable: true,
  },
});
var swiper2 = new Swiper(".mySwiper2", {
  spaceBetween: 10,
  thumbs: {
    swiper: swiper,
  },
});
