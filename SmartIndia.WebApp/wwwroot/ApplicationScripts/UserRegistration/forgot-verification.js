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
        const itemEmail = localStorage.getItem("emailOTP")
        if (!itemEmail) {
            return null
        }
        const emailOTP = JSON.parse(itemEmail)
        const now = new Date();
        if (now.getTime() > emailOTP.expiry) {
            localStorage.removeItem("emailOTP");
            BootstrapAlert("Email OTP is expired, Please resend OTP", "txtEmailOTP");
            return null
        }
        else {
            if (emailOTP.value == $('#txtEmailOTP').val()) {
                window.location.href = "/ManageUsers/Users/ResetPassword";
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