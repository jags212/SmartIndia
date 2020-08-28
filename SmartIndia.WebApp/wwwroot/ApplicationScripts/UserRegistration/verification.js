$(document).ready(function () {
    if (!localStorage.getItem("emailOTP")) {
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
    const now = new Date() 
    const itemEMail = {
        value: generateOTP(),
        expiry: now.getTime() + 300000,
    } 
    localStorage.setItem("emailOTP", JSON.stringify(itemEMail));
    var settings = {
        "url": "https://api.sendinblue.com/v3/smtp/email",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "api-key": "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",
            "Content-Type": "application/json"
        },
        "data": JSON.stringify(
            {
                "sender": {
                    "name": "Smart India",
                    "email": "napoleon.mohanta@gmail.com"
                },
                "to": [
                    {
                        "email": "" + localStorage.getItem("emailID") + "",
                        "name": "" + localStorage.getItem("firstName") + ""
                    }
                ],
                "subject": "Smart India OTP Confirmation",
                "htmlContent": "<html><head></head><body><p>Hello " + localStorage.getItem("firstName") + ",</p>Greetings from Smart India. Your OTP is <b>" + itemEMail.value + "</b>. Code valid for 5 minutes only.</p></body></html>"
            }
        ),
    };

    $.ajax(settings).done(function (response) {
        localStorage.setItem("emailOTP", JSON.stringify(itemEMail));
    });
}
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
    if (!BlankTextBox('txtEmailOTP', 'Email OTP')) {
        return false;
    }
    else if (!IsSpecialCharacter1stPalce('txtEmailOTP')) {
        return false;
    }
    else if (!BlankTextBox('txtSMSOTP', 'SMS OTP')) {
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
        const itemEmail = localStorage.getItem("emailOTP")
        const itemSMS = localStorage.getItem("smsOTP")
        if (!itemEmail) {
            return null
        }
        else if (!itemSMS) {
            return null
        }
        const emailOTP = JSON.parse(itemEmail)
        const smsOTP = JSON.parse(itemSMS)
        const now = new Date();
        if (now.getTime() > emailOTP.expiry) {
            localStorage.removeItem("emailOTP");
            localStorage.removeItem("smsOTP");
            BootstrapAlert("Email OTP is expired, Please resend OTP", "txtEmailOTP");
            return null
        }
        else if (now.getTime() > smsOTP.expiry) {
            localStorage.removeItem("emailOTP");
            localStorage.removeItem("smsOTP");
            BootstrapAlert("SMS OTP is expired, Please resend OTP", "txtSMSOTP");
        }
        else {
            if (emailOTP.value == $('#txtEmailOTP').val()) {
                if (smsOTP.value == $('#txtSMSOTP').val()) {
                    UpdateVerfiedUser();
                }
                else {
                    BootstrapAlert("SMS OTP do not match", "txtSMSOTP");
                }
            }
            else {
                BootstrapAlert("Email OTP do not match", "txtEmailOTP");
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
                window.location.href = "/ManageUsers/Users/Thankyou";
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