//Email Tab
$('#email-tab').click(function () {
    $("#email-tab-panel").css("display", "block");
    $("#mobile-tab-panel").css("display", "none");
    $('#txtMobileNo').val("");
    $("#mobile-tab").removeClass("active");
    $("#email-tab").addClass("active");
});

//Mobile Tab
$('#mobile-tab').click(function () {
    $("#email-tab-panel").css("display", "none");
    $("#mobile-tab-panel").css("display", "block");
    $('#txtEmail').val("");
    $("#email-tab").removeClass("active");
    $("#mobile-tab").addClass("active");
});