$(document).ready(function () {
  //fancybox
  Fancybox.bind("[data-fancybox]", {
    // Your options go here
  });
  viewmoreBtn();
});
function viewmoreBtn() {
  $(".more-btn").click(function (e) {
    e.preventDefault();
    var $hidden = $(".project-img.hidden");
    // 다음이미지 보여주기
    $($hidden).slice(0, 5).removeClass("hidden");
    $($hidden).slice(0, 5).fadeIn(800);
    // 다섯개면 없애기
    if ($hidden.length == 5) {
      $(this).fadeOut();
    }
  });
}
