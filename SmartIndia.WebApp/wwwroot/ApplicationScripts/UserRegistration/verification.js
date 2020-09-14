$(document).ready(function () {
    if (!localStorage.getItem("smsOTP")) {
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
function CallSMSOTP() {
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
    if (!BlankTextBox('txtSMSOTP', 'SMS OTP')) {
        return false;
    }
    else if (!IsSpecialCharacter1stPalce('txtSMSOTP')) {
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
            BootstrapAlert("SMS OTP is expired, Please resend OTP", "txtSMSOTP");
        }
        else { 
            if (smsOTP.value == $('#txtSMSOTP').val()) {
                UpdateVerfiedUser();
            }
            else {
                BootstrapAlert("SMS OTP do not match", "txtSMSOTP");
            }
        }
    }
    if (ValidateForm()) {
        CallSave();
    }
});
function UpdateVerfiedUser() {
    var uid = GetParameterValues('id');
    var usersParam = JSON.stringify({
        ACTIONCODE: 'V',
        UserId: parseInt(uid)
    });
    $.ajax({
        url: ServiceURL + "/api/UserRegistration/UpdateVerifiedUser",
        type: "POST",
        data: usersParam,
        dataType: "json",
        contentType: "application/json",
        success: function (data) {
            if (data.retOut == "2") {
                localStorage.clear();
                var usersParam = JSON.stringify({
                    ACode: data.userID
                });
                $.ajax({
                    url: ServiceURL + "/api/users/authenticateByEmail",
                    type: "POST",
                    data: usersParam,
                    dataType: "json",
                    contentType: "application/json",
                    success: function (data) {
                        if (data.id != "") {
                            localStorage.setItem("userID", data.id);
                            localStorage.setItem("emailID", data.emailID);
                            localStorage.setItem("firstName", data.firstName);
                            localStorage.setItem("jwtToken", data.jwtToken);
                            localStorage.setItem("refreshToken", data.refreshToken);
                            localStorage.setItem("direct", 1);
                            window.location.href = "/Attendee/Dashboard/AttendeeDashboard";
                        }
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        BootstrapAlert(jqXHR.responseJSON.message, 'txtPassword');
                        $('#txtPassword').val("");
                    }
                });
            }
            else {
                localStorage.clear();
                BootStrapRedirect('Something went wrong. Please try again', '/ManageUsers/Users/Login');
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus + "\nError Tirado: \n" + errorThrown);
        }
    });
}