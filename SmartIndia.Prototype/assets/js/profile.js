//Disable
$(document).ready(function () {
    $("#profileForm :input").prop("disabled", true);
    $("#profileForm :input").addClass("disable-color");
});

//Enable
$('#profileEdit').click(function () {
    $("#profileForm :input").prop("disabled", false);
    $("#profileForm :input").removeClass("disable-color");
    $("#profileEmail").prop("disabled", true);
    $("#profileEmail").addClass("disable-color");
});