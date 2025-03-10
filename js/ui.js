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

  navHover();
  menuClickFunctionStop();
  moMenuAccordion();

  Modal();

  //탭
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
});
function menuClickFunctionStop() {
  $("#js-toggle").click(function () {
    $("#m-gnav").toggleClass("active");
    $(this).toggleClass("on");
  });
}
function moMenuAccordion() {
  $(".menu_item.has_sub > a").click(function () {
    $(this).toggleClass("active");
    $(this).next(".sub-menu").slideToggle();
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
    },
  );
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
