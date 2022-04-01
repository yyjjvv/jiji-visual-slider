var img_w = $(".slide li").width();
var img_n = $(".slide li").length; //length는 전체 갯수를 추출. index()는 몇 번째인지 추출.
var oldIndex = 0; //기존 인덱스
var Index = 0; //새로운 인덱스
console.log(img_n);
$(".slide li:last").prependTo(".slide");
$(".slide").css({ left: -img_w });

function slideImage(Index, m) {
    if (m == 0) {//prev btn
        $(".slide").stop().animate({ left: "+=" + img_w }, 600, "easeOutCubic", function () {
            $(".slide li:last").prependTo(".slide");
            $(".slide").css({ left: -img_w });
        });
        $(".slide_btn li").eq(oldIndex).removeClass("active");
        $(".slide_btn li").eq(Index).addClass("active");
    } else {//next btn
        $(".slide").stop().animate({ left: "-=" + img_w + "px" }, 600, "easeOutCubic", function () {
            $(".slide li:first").appendTo(".slide");
            $(".slide").css({ left: -img_w });
        });
        $(".slide_btn li").eq(oldIndex).removeClass("active");
        $(".slide_btn li").eq(Index).addClass("active");
    }
    oldIndex = Index;
}
//automaticSlide
var auto = setInterval(autoSlide, 5000);
function autoSlide() {
    Index++;
    if (Index > (img_n - 1)) {
        Index = 0;
    }
    slideImage(Index, 1);
}

$(".next").click(function () {
    clearInterval(auto);
    autoSlide();
    auto = setInterval(autoSlide, 5000);
    // Index++;
    // if(Index>(img_n-1)){
    //     Index=0;
    // }
    // slideImage(Index, 1);
});
$(".prev").click(function () {
    clearInterval(auto);
    reverseSlide();
    auto = setInterval(autoSlide, 5000);
});
function reverseSlide() {
    Index--;
    if (Index < 0) {
        Index = img_n - 1;
    }
    slideImage(Index, 0);
}

$(".slide_btn li").click(function () {
    Index = $(this).index();
    //재배치
    for (var i = 1; 1 <= img_n; i++) {
        $(".slide li.pic" + i).appendTo(".slide");
    }
    $(".slide li:last").prependTo(".slide");
    $(".slide li:last").prependTo(".slide");
    clearInterval(auto);
    for (var i = 1; 1 <= Index+1; i++) {
        slideImage(Index, 1);
    }
    auto = setInterval(autoSlide, 5000);
});