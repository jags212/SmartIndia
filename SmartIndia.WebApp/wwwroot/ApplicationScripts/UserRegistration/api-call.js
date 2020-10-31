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
            SignUpBy: $('#myregiTab li #email-tab').hasClass('active') == true ? 1 : 2,
            DeviceResources: 1

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
                        $.post("/ManageUsers/Users/AthenticationUser?username=" + data.userID + "", function (data) {
                            if (data == 1) {
                                window.location.href = "/ManageUsers/Users/VerificationEmail";
                            }
                        }); 
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
