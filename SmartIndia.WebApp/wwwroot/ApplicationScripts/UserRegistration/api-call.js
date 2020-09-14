$('#btnSignUp').click(function () {
    function CallSave() {
        var usersParam = JSON.stringify({
            ACTIONCODE: 'A',
            UserName: $('#myregiTab li #email-tab').hasClass('active') == true ? $('#txtEmail').val() : $('#txtMobileNo').val(),
            EmailId: $('#myregiTab li #email-tab').hasClass('active') == true ? $('#txtEmail').val() : "",
            MobileNo: $('#myregiTab li #email-tab').hasClass('active') == false ? $('#txtMobileNo').val() : "",
            Password: $('#txtCnfmPassword').val(),
            MobileCountryCode: $('#selected-flag-dial-code').html(),
            ServiceURL: ClientURL,
            SignUpBy: $('#myregiTab li #email-tab').hasClass('active') == true ? 1 : 2
        });
        $.ajax({
            url: ServiceURL + "/api/UserRegistration/AddUser",
            type: "POST",
            data: usersParam,
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                if (data.retOut == "1") { 
                    if ($('#myregiTab li #email-tab').hasClass('active')) {
                        window.location.href = "/ManageUsers/Users/VerificationEmail";
                    }
                    else {
                        processOTPVerification(data.userID, $('#txtMobileNo').val(), $('#selected-flag-dial-code').html());
                        window.location.href = "/ManageUsers/Users/Verification?id=" + data.userID + "";
                    }
                }
                else if (data.retOut == "3") {
                    var msg = $('#myregiTab li #email-tab').hasClass('active') == true ? "Email ID" : "Mobile No";
                    BootstrapAlert('' + msg + ' Alreday Exist.');
                }
                else {
                    BootstrapAlert('Something went wrong. Please try again');
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(textStatus + "\nError Tirado: \n" + errorThrown);
            }
        });
    }
    function SendEmailVerification(ActivationCode) {
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
                            "email": "" + $('#txtEmail').val() + "",
                            "name": "" + $('#txtEmail').val() + ""
                        }
                    ],
                    "subject": "Smart India OTP Confirmation",
                    "htmlContent": "<html><head></head><body>" +
                        "<p>Hello User,</p>" +
                        "<p>Thanks for signing up to Smart India! </p>" +
                        "<p> To get started, click the link below to confirm your account. </p>" +
                        "<p> <a href='" + ServiceURL + "/ManageUsers/Users/UserVerification/" + ActivationCode + "'>Confirm your account</a></p>" +
                        "</body></html>"
                }
            ),
        };

        $.ajax(settings).done(function (response) {
            console.log(response);
        });
    }
    function processOTPVerification(userid, MobileNo, Code) {
        const now = new Date();
        const itemSMS = {
            value: generateOTP(),
            expiry: now.getTime() + 300000,
        };
        localStorage.setItem("smsOTP", JSON.stringify(itemSMS));
        localStorage.setItem("mobileNo", $('#txtMobileNo').val());

        var settings = {
            "url": "http://59.162.167.52/api/MessageCompose?admin=napoleon.mohanta@gmail.com&user=karanjiacollege@gmail.com:G3L2P4V727&senderID=KJACLG&receipientno=" + MobileNo + "&msgtxt=Greetings from SmartIndia . Your OTP code is: " + itemSMS.value + " . Code valid for 5 minutes only.&state=4",
            "method": "POST",
            "timeout": 0,
        };

        $.ajax(settings).done(function (response) {
            console.log(response);
        });

    }
    if (ValidateForm()) {
        if (BootStrapSubmit('btnSignUp', 'Are You Sure To Register ?', 'Are You Sure To Update ?', CallSave)) {
            return false;
        }
        else {
            return true;
        }
    }
}); 
