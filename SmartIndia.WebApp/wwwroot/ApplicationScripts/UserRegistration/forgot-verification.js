$(document).ready(function () {
    if (!localStorage.getItem("uid")) {
        window.location.href = "/ManageUsers/Users/Login";
    }
    $("#MyForm").keypress(function (e) {
        kCode = e.keyCode || e.charCode //for cross browser
        if (kCode == 13) {
            var defaultbtn = $(this).attr("DefaultButton");
            $("#" + defaultbtn).click();
            return false;
        }
    });
});
function CallEmailOTP() {
    $('#divOTP').hide();
    $('#divSuccess').show();
    const now = new Date()
    const itemSMS = {
        value: generateOTP(),
        expiry: now.getTime() + 300000,
    }
    localStorage.setItem("smsOTP", JSON.stringify(itemSMS));
    var settings = {
        "url": "http://59.162.167.52/api/MessageCompose?admin=napoleon.mohanta@gmail.com&user=karanjiacollege@gmail.com:G3L2P4V727&senderID=KJACLG&receipientno=" + localStorage.getItem("mobileNo") + "&msgtxt=Greetings from SmartIndia . Your OTP code is: " + itemSMS.value + " . Code valid for 5 minutes only.&state=4",
        "method": "POST",
        "timeout": 0,
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
    });
}
function ValidateForm() {
    if (!BlankTextBox('txtEmailOTP', 'OTP')) {
        return false;
    }
    else if (!IsSpecialCharacter1stPalce('txtEmailOTP')) {
        return false;
    }
    else {
        return true;
    }
}
$('#btnVerify').click(function () {
    function CallSave() {
        const itemSMS = localStorage.getItem("smsOTP")
        if (!itemSMS) {
            return null
        }
        const smsOTP = JSON.parse(itemSMS)
        const now = new Date();
        if (now.getTime() > smsOTP.expiry) {
            localStorage.removeItem("smsOTP");
            BootstrapAlert("OTP is expired, Please resend OTP", "txtEmailOTP");
            return null
        }
        else {
            if (smsOTP.value == $('#txtEmailOTP').val()) {
                window.location.href = "/ManageUsers/Users/ResetPassword?Id=" + localStorage.getItem("uid");
            }
            else {
                BootstrapAlert("OTP do not match", "txtEmailOTP");
            }
        }
    }
    if (ValidateForm()) {
        CallSave();
    }
}); 