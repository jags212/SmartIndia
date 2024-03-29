//Clearable text inputs of enroll courses
$(".clearable").each(function () {

    var $inp = $(this).find("input:text"),
        $cle = $(this).find(".clearable__clear");

    $inp.on("input", function () {
        $cle.toggle(!!this.value);
    });

    $cle.on("touchstart click", function (e) {
        e.preventDefault();
        $inp.val("").trigger("input");
    });

});

//Clearable text inputs
$(".ocr-clearable").each(function () {

    var $inp = $(this).find("input:text"),
        $cle = $(this).find(".ocr-clearable-clear");

    $inp.on("input", function () {
        $cle.toggle(!!this.value);
    });

    $cle.on("touchstart click", function (e) {
        e.preventDefault();
        $inp.val("").trigger("input");
    });

});