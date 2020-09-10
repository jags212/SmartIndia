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
    $("#profileMobileNo").prop("disabled", true);
    $("#profileMobileNo").addClass("disable-color");
});


//Interest Area Box
$(document).ready(function () {
    $('#chkOtherInterest').change(function () {
        if (this.checked) {
            $("#otherInterestArea").slideDown("2000");
        }
        else {
            $("#otherInterestArea").slideUp("2000");
        }
    });
});