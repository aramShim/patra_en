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

  langSelect();
  mypageSelect();
  familySiteSelect();
  selectUi();

  createInfoModify();
  Modal();
  
  if($('[data-toggle="datepicker"]').length > 0) datePicker(); 
  if($('.start-date').length > 0) rangeDatePicker();
  if($('.month-date').length > 0) monthDatePicker();
  if($('.year-date').length > 0) yearDatePicker();

  trToggle();
  
  imgFileInsert();
  cdAdd();

  customUploadButton();
  if($('.colresiable').length > 0){colResiable();}
});

$(window).on("load", function () {
  scrollMove();
});
function colResiable(){
  $('.colresiable').colResizable({
    resizeMode:'overflow'
  })
}
function selectDisplay(select){
  var selectedValue = $(select).val();
  console.log(selectedValue);
  if(selectedValue === 'individual') {
    $('.individual').show();
    $('.entrepreneur').hide();
  } else if(selectedValue === 'entrepreneur') {
    $('.entrepreneur').show();
    $('.individual').hide();
  }
}
function fileRemove(a){
  $(a).parents('.file-upload-label .input-file').val('');
  $(a).parents('.file-upload-label').removeClass('selected');
  $(a).parents(".file-upload-text").addClass("not-selected");
  $(a).parents(".file-upload-text span").text('');
}
function customUploadButton() {
  $('.file-upload-input').on('change', function () {
      var val = $(this).val().split(/(\\|\/)/g).pop();
      if (val !== "") {
          $('.file-upload-label').addClass('selected');
          $(".file-upload-text span").text(val);
          $(".file-upload-text").removeClass("not-selected");
      } else {
          $('.file-upload-label').removeClass('selected');
          $(".file-upload-text span").text('');
          $(".file-upload-text").addClass("not-selected");          
      }
  });
}
function cdAdd(){
  $('#cdAdd').click(function(){
    if($('.cd-wrap').eq(1).hasClass('disabled') == false){
      alert('CD는 최대 2개까지 추가 가능합니다.')
    }
    $('.cd-wrap.disabled').removeClass('disabled');
  })
}

function datePicker(){
  $('[data-toggle="datepicker"]').datepicker({
    format: 'yyyy.mm.dd'
  });
}
function rangeDatePicker(){
  var $startDate = $('.start-date');
  var $endDate = $('.end-date');

  $startDate.datepicker({
    autoHide: true,
  });
  $endDate.datepicker({
    autoHide: true,
    startDate: $startDate.datepicker('getDate'),
  });

  $startDate.on('change', function () {
    $endDate.datepicker('setStartDate', $startDate.datepicker('getDate'));
  });
}
function monthDatePicker(){
  var $monthDate = $('.month-date');
  $monthDate.datepicker({
    format: 'yyyy.mm'
  })
}
function yearDatePicker(){
  var $yearDate = $('.year-date');
  $yearDate.datepicker({
    format: 'yyyy'
  })
  
}
function imgFileInsert(){
  $('.imageUpload').change(function(){
    var thisInput = $(this);
    var imgPreview = $(this).parents('.file-custom');
    readImgUrlAndPreview(this);
    function readImgUrlAndPreview(input){
      console.log(input.files);
      if (input.files && input.files[0]) {
        var fileReader = new FileReader();                        
        fileReader.onload = function (e) {	
          var file = e.target;
          var reader ='';
          reader += '<div class="imagePreview"><img class=\"imageThumb\" src=\"' + e.target.result + '\" title=\"' + file.name + '\"/>';
          reader += '<span class=\"remove-file\"><i class="icon-sign03"></i></span></div>';          
          imgPreview.append(reader);

          $('.remove-file').click(function(){
            $(this).parents('.imagePreview').remove();
            // 초기화
            thisInput.val('');
          });
        }
        };
        fileReader.readAsDataURL(input.files[0]);
    }	
  }); 
}

function trToggle(){
  $('.tr-toggle-btn').click(function(){
    var $this = $(this);
    $this.find('i').toggleClass('rotate');
    $(this).closest('tr').next('tr.toggle-wrap').find('.toggle').slideToggle()
  })
}
// function datePicker(){
//   $("#datepicker1").datepicker({
//     dateFormat: 'yy.mm.dd' //달력 날짜 형태
//     ,showOtherMonths: true //빈 공간에 현재월의 앞뒤월의 날짜를 표시
//     ,showMonthAfterYear:true // 월- 년 순서가아닌 년도 - 월 순서
//     ,changeYear: true //option값 년 선택 가능
//     ,changeMonth: true //option값  월 선택 가능                
//     ,monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'] //달력의 월 부분 텍스트
//     ,monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'] //달력의 월 부분 Tooltip
//     ,dayNamesMin: ['일','월','화','수','목','금','토'] //달력의 요일 텍스트
//     ,dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'] //달력의 요일 Tooltip
//   });
//   $("#datepicker2").datepicker({
//     dateFormat: 'yy.mm.dd' //달력 날짜 형태
//     ,showOtherMonths: true //빈 공간에 현재월의 앞뒤월의 날짜를 표시
//     ,showMonthAfterYear:true // 월- 년 순서가아닌 년도 - 월 순서
//     ,changeYear: true //option값 년 선택 가능
//     ,changeMonth: true //option값  월 선택 가능                
//     ,monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'] //달력의 월 부분 텍스트
//     ,monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'] //달력의 월 부분 Tooltip
//     ,dayNamesMin: ['일','월','화','수','목','금','토'] //달력의 요일 텍스트
//     ,dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'] //달력의 요일 Tooltip
//   });
//   $("#month1").datepicker({
//     changeMonth: true,
//     changeYear: true,
//     showButtonPanel: true,
//     dateFormat: 'yy.mm',
//     showMonthAfterYear:true, // 월- 년 순서가아닌 년도 - 월 순서
//     monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'], //달력의 월 부분 텍스트
//     monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'], //달력의 월 부분 Tooltip
//     onClose: function(dateText, inst) { 
//         var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
//         var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
//         $(this).datepicker('setDate', new Date(year, month, 1));
//     },
//     beforeShow : function(input, inst) {
//         if ((datestr = $(this).val()).length > 0) {
//             actDate = datestr.split('-');
//             year = actDate[0];
//             month = actDate[1]-1;
//             $(this).datepicker('option', 'defaultDate', new Date(year, month));
//             $(this).datepicker('setDate', new Date(year, month));
//         }
//     }
//   });
//   $("#month2").datepicker({
//     changeMonth: true,
//     changeYear: true,
//     showButtonPanel: true,
//     dateFormat: 'yy.mm',
//     showMonthAfterYear:true, // 월- 년 순서가아닌 년도 - 월 순서
//     monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'], //달력의 월 부분 텍스트
//     monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'], //달력의 월 부분 Tooltip
//     onClose: function(dateText, inst) { 
//         var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
//         var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
//         $(this).datepicker('setDate', new Date(year, month, 1));
//     },
//     beforeShow : function(input, inst) {
//         if ((datestr = $(this).val()).length > 0) {
//             actDate = datestr.split('-');
//             year = actDate[0];
//             month = actDate[1]-1;
//             $(this).datepicker('option', 'defaultDate', new Date(year, month));
//             $(this).datepicker('setDate', new Date(year, month));
//         }
//     }
//   });
//   $("#yearPicker").datepicker( {
//     dateFormat: 'yy'
//   });
// }
function selectUi() {
  $(".select").each(function () {
    const $this = $(this);
    const $selected = $this.children(".selected-label");
    let $checked = $this.find("input[checked]");

    if ($checked.length > 0) {
      $selected.text($checked.next().text());
    }

    $selected.on("click", function () {
      if (!$this.hasClass("active")) {
        $(".select").removeClass("active");
      }
      $this.toggleClass("active");
    });
    $this.find("label").on("click", function () {
      $this.toggleClass("active");
      $selected.text($(this).text());
    });
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

    $('.side-right').css("bottom", bottom);
  }
}

function scrolled() {
  const $header = $("body:not(.fullpage) #header");
  if ($header.length > 0) {
    if ($(window).scrollTop() > 0) {
      $header.addClass("scrolled");
    } else {
      $header.removeClass("scrolled");
    }
  }
}

function langSelect() {
  const $langWrap = $(".lang-wrap");
  $langWrap.children("button").on("click", function () {
    $(this).parent().toggleClass("active");
  });
  $langWrap.on("mouseleave", function () {
    $(this).removeClass("active");
  });
}

function mypageSelect() {
  const $langWrap = $(".mypage-hd");
  $langWrap.children("button").on("click", function () {
    $(this).parent().toggleClass("active");
  });
  $langWrap.on("mouseleave", function () {
    $(this).removeClass("active");
  });
}

function createInfoModify(e){
  const $button = $('.infoModify');
  const $creatCont = $('.infoModify').parents('.mypage-section-title').next('.create-content');
  $button.click(function(){
    if($creatCont.hasClass('disabled')){
      $creatCont.removeClass('disabled');
      $button.text('저장');
    }
  })
}

function Modal(){
  //const $modal = $('.modal');
  const $modalBtn = $('.modal-btn');
  const $modalClose = $('.modal-close');
  $modalBtn.click(function(){
    const $openModal = $(this).data('modal');
    $('body').addClass('open');
    $($openModal).addClass('open');
    

  });
 
  $modalClose.click(function(){
    $('body').removeClass('open');
    $(this).parents('.modal').removeClass('open');
  })  
}



function familySiteSelect() {
  const $siteWrap = $(".f-family-site");
  $siteWrap.children("button").on("click", function () {
    $(this).parent().toggleClass("active");
  });
  $siteWrap.on("mouseleave", function () {
    $(this).removeClass("active");
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
      "overflow": "hidden",
      "touch-action": "none"
    });
    $mMenu.addClass("active");
  }

  function menuClose() {
    $html.css({
      "overflow": "auto",
      "touch-action": "auto"
    });
    $mMenu.removeClass("active");
  }
}

function scrollMove() {

  if ($(".scroll-tab").length < 1) {
    return;
  }

  $(".sub-lnav").before("<div class='sub-lnav-position'></div>");

  let headerHeight;
  let tabMenuY;
  let $contentList = $(".scroll-con");
  let $tabList = $(".scroll-tab li");
  let contentListPos;
  let lastY = window.pageYOffset;

  const $header = $("body:not(.main) #header");
  let activeIndex;

  let targetValue;
  let targetList = [];
  const targetKey = "con";

  init();
  initEvent();
  updateScroll();

  let timer = null;
  $(window).on("resize", function () {
    clearTimeout(timer);
    timer = setTimeout(function () {
      init();
    }, 300);
  });

  function init() {
    headerHeight = $("#header").height();
    tabMenuHeight = $(".scroll-tab").height();
    tabMenuY = $(".sub-lnav-position").offset().top - tabMenuHeight;
    contentListPos = [];

    if (lastY < 1 && $tabList.filter(".active").length < 1) {
      $tabList.eq(0).addClass("active");
      activeIndex = 0;
    }

    const vars = window.location.search.substring(1).split("&");
    if (vars.length > 0) {
      for (let i = 0; i < vars.length; i++) {
        let pair = vars[i].split("=");
        if (pair[0] == targetKey) {
          targetValue = pair[1];
        }
      }
      if (targetValue) {
        $contentList.each(function (index) {
          targetList.push($contentList.eq(index).attr("data-target"));
        });
      }
    }

    $contentList.each(function (index) {
      let y = Math.floor($contentList.eq(index).offset().top - headerHeight);
      contentListPos.push(y);
      if (targetValue) {
        targetList.push(
            $contentList.eq(index).attr("data-target"));
      }
    });

  }

  function initEvent() {
    $(window).on("scroll", function () {
      updateScroll();
    });
    $tabList.on("click", function () {
      if ($contentList.length < 1) {
        return;
      }
      goContent($(this).index());

      setTimeout(function () {
        $header.addClass("up");
        $(".sub-lnav").css("top", 0);
      }, 1000);

    });
    $tabList.children("a").on("click", function (e) {
      if ($contentList.length > 0) {
        e.preventDefault();
      }
    });
    if (targetValue) {
      goContent(targetList.findIndex(item => item == targetValue));
    }
  }

  function goContent(index) {
    $(window).scrollTop(contentListPos[index] + 1);
  }

  function updateScroll() {
    if (checkedTabMenuFixed() == true) {
      updateTabMenu();
    }
    lastY = window.pageYOffset;
  }

  function checkedTabMenuFixed() {
    let scrollY = window.pageYOffset;
    if (0 > tabMenuY - scrollY) {
      $(".sub-lnav").addClass("fixed");
      if (lastY != 0 && lastY <= scrollY) {
        $header.addClass("up");
        $(".sub-lnav").css("top", 0);
      } else {
        $header.removeClass("up");
        $(".sub-lnav").css("top", headerHeight);
      }
      return true;
    } else {
      $(".sub-lnav").removeClass("fixed");
      $header.removeClass("up");
      $(".sub-lnav").css("top", headerHeight);
      return false;
    }
  }

  function updateTabMenu() {
    let scrollY = window.pageYOffset;
    [...$contentList].forEach((el, index) => {
      let tabContentY = contentListPos[index];
      if (scrollY >= tabContentY) {
        $tabList.filter(".active").removeClass("active");
        $tabList.eq(index).addClass("active");
        $contentList.filter(".active").removeClass("active");
        $contentList.eq(index).addClass("active");
        activeIndex = index;
      }
    });
  }
}

function historySlider() {
  new Swiper(".history-wrap", {
    loop: false,
    speed: 600,
    slidesPerView: "auto",
    navigation: {
      nextEl: ".history-swiper-control .btn-swiper-next",
      prevEl: ".history-swiper-control .btn-swiper-prev",
    },
  });
}

function subsidiarySlider() {
  new Swiper(".subsidiary-wrap", {
    loop: false,
    speed: 600,
    slidesPerView: 3,
    spaceBetween: 24,
    breakpoints: {
      884: {
        slidesPerView: "auto",
        spaceBetween: 12,
      },
    },
    pagination: {
      el: ".subsidiary-paging",
    },
    followFinger: false,
  });
}

function dataCenterSlider() {
  new Swiper(".service-photo-slider", {
    loop: true,
    speed: 1000,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    pagination: {
      el: ".service-photo-slider .pagination",
    },
  });
}

function introVideo() {
  const $video = document.querySelector(".intro-video video");
  const $btnPlay = $(".intro-video .btn-play");

  $btnPlay.on("click", function () {
    $video.play();
    $(this).hide();
  });
  $video.addEventListener("play", () => $btnPlay.hide());
  $video.addEventListener("pause", () => $btnPlay.show());
  $video.addEventListener("ended", () => $btnPlay.show());
}
