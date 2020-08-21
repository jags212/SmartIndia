$('#btnSignUp').click(function () {
    function CallSave() {
        var usersParam = JSON.stringify({
            ACTIONCODE: 'A',
            FirstName: $('#txtFirstName').val(),
            LastName: $('#txtLastName').val(),
            EmailId: $('#txtEmail').val(),
            MobileNo: $('#txtMobileNo').val(),
            Password: $('#txtCnfmPassword').val(),
            MobileCountryCode: $('#selected-flag-dial-code').html()
        });
        var settings = {
            "url": ServiceURL + "/api/UserRegistration/AddUser",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/json"
            },
            "data": usersParam,
        };

        $.ajax(settings).done(function (response) {
            processOTPVerification(response, $('#txtMobileNo').val(), $('#selected-flag-dial-code').html());
        });
        //$.ajax({
        //    url: ServiceURL + "/api/UserRegistration/AddUser",
        //    type: "POST",
        //    data: usersParam,
        //    dataType: "json",
        //    contentType: "application/json; charset=utf-8",
        //    success: function (data) {
        //        if (data == "1") {
        //            BootStrapRedirect('User Registration Successful.', "/ManageUsers/Users/Thankyou"); 
        //        }
        //        else if (data == "3") {
        //            BootstrapAlert('Email ID Alreday Exist.');
        //        }
        //        else {
        //            BootstrapAlert('Something went wrong. Please try again');
        //        }
        //    },
        //    error: function (jqXHR, textStatus, errorThrown) {
        //        console.log(textStatus + "\nError Tirado: \n" + errorThrown);
        //    }
        //});
    }
    function processOTPVerification(data, MobileNo, Code) {
        if (data == "1") {
            const now = new Date()
            const itemSMS = {
                value: generateOTP(),
                expiry: now.getTime() + 5000,
            }
            const itemEMail = {
                value: generateOTP(),
                expiry: now.getTime() + 5000,
            }
            localStorage.setItem("smsOTP", JSON.stringify(itemSMS));
            localStorage.setItem("emailOTP", JSON.stringify(itemEMail));

            sendSMS(MobileNo, itemSMS.value);
            sendEmail($('#txtFirstName').val(), $('#txtEmail').val(), itemEMail.value);
            window.location.href = "/ManageUsers/Users/Verification";
        }
        else if (data == "3") {
            BootstrapAlert('Email ID Alreday Exist.');
        }
        else {
            BootstrapAlert('Something went wrong. Please try again');
        }
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
