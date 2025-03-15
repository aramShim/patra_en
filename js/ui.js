$(document).ready(function () {
  respond();
  $(window).on("resize", function () {
    respond();
  });
  $(window).on("scroll", function () {
    scrolled();
  });

  scrolled();
  goTopMove();
  if ($("html.pc").length > 0) {
    navHover();
  }
  if ($("html.mobile").length > 0) {
    menuClickFunctionStop();
    moMenuAccordion();
  }

  if ($(".modal-btn").length > 0) {
    Modal();
  }
  if ($(".tab-btn").length > 0) {
    tabAction();
  }
  AOS.init({
    duration: 600,
    once: false,
  });
});
gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
});

function raf(time) {
  lenis.raf(time);
  ScrollTrigger.update();
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

//탭
function tabAction() {
  $(".tab-btn").click(function () {
    const targetTab = $(this).data("hs-tab"); // 클릭한 버튼의 data-hs-tab 값 (ex: #tab-item-1)

    // 모든 탭 버튼의 active 제거 & 클릭한 버튼만 active 추가
    $(".tab-btn").removeClass("active");
    $(this).addClass("active");

    // 모든 탭 콘텐츠 숨기기 & 선택한 탭 콘텐츠만 표시
    $("[role='tabpanel']").hide();
    $(targetTab).show();
  });

  // 초기 로드 시 첫 번째 탭만 표시
  $("[role='tabpanel']").hide();
  $(".tab-btn.active").trigger("click");
}
function menuClickFunctionStop() {
  $("#js-toggle").click(function () {
    // $("#m-gnav").toggleClass("active");
    $(".gnav-wrap").toggleClass("mo-active");
    $(this).toggleClass("on");
    $("html, body").toggleClass("active-overflow-hidden");
  });
}
function moMenuAccordion() {
  $(".nav-item.is-parent .nav-link > a").click(function () {
    $(this).toggleClass("active");
    $(this).parents(".nav-link").next(".megamenu-content").slideToggle();
    //$(this).next(".megamenu-content").slideToggle();
  });
}

function navHover() {
  $(".nav-item.is-parent").hover(
    function () {
      $(this).addClass("is-open"); // 현재 nav-item에 is-open 추가
      $(this).find(".megamenu-content").addClass("megamenu-visible");
    },
    function () {
      $(this).removeClass("is-open"); // 현재 nav-item에서 is-open 제거
      // 다른 nav-item이 열려 있는지 확인하고, 없으면 #header에서 is-open 제거
      if ($(".nav-item.is-open").length === 0) {
      }
    }
  );
  $(".nav-item.is-parent").click(function () {
    $(this).addClass("is-open"); // 현재 nav-item에 is-open 추가
    $(this).find(".megamenu-content").addClass("megamenu-visible");
  });
}
function respond() {
  let w = $("html").width();
  w < 1100 ? mobileLayout() : pcLayout();
}

function mobileLayout() {
  $("html").removeClass("pc").addClass("mobile");
}

function pcLayout() {
  $("html").removeClass("mobile").addClass("pc");
}

function goTopMove() {
  if ($(".go-top").length < 1) {
    return;
  }

  const $btn = $(".go-top");
  const $window = $(window);
  const $footer = $("#footer");
  const bottom_origin = $("html").hasClass("pc") ? 40 : 20;
  const checkY = $("html").hasClass("pc") ? 600 : 300;
  let scrollY = $window.scrollTop();
  let bottom;
  let gap;
  let vh = window.innerHeight * 0.01;
  let window_height = vh * 100;

  $btn.on("click", function (e) {
    e.preventDefault();
    $window.scrollTop(0);
  });

  $window.on("scroll", function () {
    btnPosition();
  });
  $window.on("resize", function () {
    btnPosition();
  });

  function btnPosition() {
    vh = window.innerHeight * 0.01;
    window_height = vh * 100;

    scrollY = $(this).scrollTop();
    scrollY > checkY ? $btn.addClass("on") : $btn.removeClass("on");
    gap = scrollY + window_height - $footer.offset().top;

    if (gap > 0) {
      bottom = gap + bottom_origin;
    } else {
      bottom = bottom_origin;
    }

    $(".side-right").css("bottom", bottom);
  }
}

function scrolled() {
  const $header = $("#header");
  if ($header.length > 0) {
    if ($(window).scrollTop() > 0) {
      $header.addClass("scrolled");
    } else {
      $header.removeClass("scrolled");
    }
  }
}

function Modal() {
  //const $modal = $('.modal');
  const $modalBtn = $(".modal-btn");
  const $modalClose = $(".modal-close");
  $modalBtn.click(function () {
    const $openModal = $(this).data("modal");
    $("body").addClass("open");
    $($openModal).addClass("open");
  });

  $modalClose.click(function () {
    $("body").removeClass("open");
    $(this).parents(".modal").removeClass("open");
  });
}
