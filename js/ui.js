$(document).ready(function () {
  respond();
  $(window).on("resize", function () {
    respond();
  });
  $(window).on("scroll", function () {
    scrolled();
  });

  topMenu();
  topMenu_m();
  scrolled();
  goTopMove();

  navHover();

  Modal();
});

function navHover() {
  $(".nav-item.is-parent").hover(
    function () {
      $(this).addClass("is-open"); // 현재 nav-item에 is-open 추가
    },
    function () {
      $(this).removeClass("is-open"); // 현재 nav-item에서 is-open 제거
      // 다른 nav-item이 열려 있는지 확인하고, 없으면 #header에서 is-open 제거
      if ($(".nav-item.is-open").length === 0) {
      }
    }
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

// 사용X
function topMenu() {
  const $ganvLi = $(".gnav-list > li");
  const activeNum = $(".gnav-list > li.active").index();

  $("#gnav").on("mouseleave", function () {
    if (activeNum >= 0) {
      $ganvLi.eq(activeNum).addClass("active");
    }
  });
  $ganvLi.children("a").on("mouseenter", function () {
    $ganvLi.removeClass("active");
    $(this).parent().addClass("active");
  });
  $ganvLi.on("mouseleave", function () {
    $ganvLi.removeClass("active");
  });
}

function topMenu_m() {
  const $btnMenu = $(".m-menu");
  const $btnClose = $(".m-gnav .btn-menu-close");
  const $mMenu = $(".m-gnav");
  const $html = $("html");

  $btnMenu.on("click", function () {
    menuOpen();
  });
  $btnClose.on("click", function () {
    menuClose();
  });

  function menuOpen() {
    $html.css({
      overflow: "hidden",
      "touch-action": "none",
    });
    $mMenu.addClass("active");
  }

  function menuClose() {
    $html.css({
      overflow: "auto",
      "touch-action": "auto",
    });
    $mMenu.removeClass("active");
  }
}
