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
        $.ajax({
            url: ServiceURL + "/api/UserRegistration/AddUser",
            type: "POST",
            data: usersParam,
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                if (data.retOut == "1") {
                    processOTPVerification(data.userID, $('#txtMobileNo').val(), $('#selected-flag-dial-code').html());
                }
                else if (data.retOut == "3") {
                    BootstrapAlert('Email ID Alreday Exist.');
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
        const now = new Date()
        const itemSMS = {
            value: generateOTP(),
            expiry: now.getTime() + 300000,
        }
        const itemEMail = {
            value: generateOTP(),
            expiry: now.getTime() + 300000,
        }
        localStorage.setItem("smsOTP", JSON.stringify(itemSMS));
        localStorage.setItem("emailOTP", JSON.stringify(itemEMail));
        localStorage.setItem("emailID", $('#txtEmail').val());
        localStorage.setItem("mobileNo", $('#txtMobileNo').val());
        localStorage.setItem("firstName", $('#txtFirstName').val());

        sendSMS(MobileNo, itemSMS.value);
        sendEmail($('#txtFirstName').val(), $('#txtEmail').val(), itemEMail.value);
        window.location.href = "/ManageUsers/Users/Verification?id=" + userid + "";

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
