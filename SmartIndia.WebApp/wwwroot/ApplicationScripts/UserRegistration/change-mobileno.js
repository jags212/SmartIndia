
//$(document).ready(function () {
//    $("#MobilenoOTPModal").css("display", "block");
//    $("#MobilenoOTPModal").css("display", "none");
//});
function checkMobileNo() {
   
    var result = parseJwt(localStorage.getItem("jwtToken"));
    uid = result.nameid;

    var usersParam = JSON.stringify({
        MobNo: $('#txt_currentmob').val(),
        UID: uid,
    });
    $.ajax(
        {
            type: "GET",
            url: ServiceURL + "/api/UserRegistration/CkeckCurrentmob",
            data: JSON.parse(usersParam),
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                if (data == true) {
                    $('#MobilenoOTPModal').modal("show");
                    const now = new Date()
                    const itemSMS = {
                        value: generateOTP(),
                        expiry: now.getTime() + 300000,
                    }
                    localStorage.setItem("smsOTP", JSON.stringify(itemSMS));
                    var usersParam;
                    usersParam = JSON.stringify({
                        MobileNo: $('#txt_newmob').val(),
                        UID: uid,
                        OTP: itemSMS.value
                    });
                    $.ajax({
                        url: ServiceURL + "/api/UserRegistration/UpdateMobileNo",
                        type: "POST",
                        data: usersParam,
                        dataType: "json",
                        contentType: "application/json; charset=utf-8",
                        success: function (data) {
                            if (data == "1") {
                                // BootStrapRedirect(' Successfully.', '');

                            }
                            else {
                                BootstrapAlert('Something went wrong. Please try again');
                            }
                        },
                        error: function (error) {
                            console.log(error.statusText);
                        }
                    });
                }
                else {
                    BootstrapAlert('Current mobile no is not correct...', 'txt_currentmob');
                }
            },
            error: function (msg) {
                alert(msg.responseText);
            }
        });
}
$('#btnSubmit').click(function () {
    function CallSave() {
        checkMobileNo();
    }
    if (ValidateBlankCheck()) {
        if (BootStrapSubmit('btnsubmit', 'Are You Sure To change mobile no ?', 'Are You Sure To Update ?', CallSave)) {
            return false;
        }
        else {
            return true;
        }
    }
});
function ValidateBlankCheck() {

    if (!BlankTextBox('txt_currentmob', 'Current mobile no')) {
        return false;
    }
    else if (!BlankTextBox('txt_newmob', 'New mobile no')) {
        return false;
    }
    else {
        return true;
    }
}
$('#btn_OtpVerify').click(function () {
    function CallSave() {
        const itemSMS = localStorage.getItem("smsOTP")
        if (!itemSMS) {
            return null
        }
        const smsOTP = JSON.parse(itemSMS)
        const now = new Date();
        if (now.getTime() > smsOTP.expiry) {
            localStorage.removeItem("smsOTP");
            BootstrapAlert("OTP is expired, Please resend OTP", "txtVerifyOtp");
            return null
        }
        else {
            if (smsOTP.value == $('#txtVerifyOtp').val()) {
                var result = parseJwt(localStorage.getItem("jwtToken"));
                uid = result.nameid;
                var usersParam;
                usersParam = JSON.stringify({
                    UID: uid
                });
                $.ajax({
                    url: ServiceURL + "/api/UserRegistration/UpdateMobileConfirmed",
                    type: "POST",
                    data: usersParam,
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    success: function (data) {
                        if (data == "1") {
                            BootStrapRedirect('Mobile Number Verified...', '/ManageUsers/Users/Profile');
                        }
                        else {
                            BootstrapAlert('Something went wrong. Please try again');
                        }
                    },
                    error: function (error) {
                        console.log(error.statusText);
                    }
                });

               // window.location.href = "/ManageUsers/Users/ResetPassword?Id=" + localStorage.getItem("uid");
            }
            else {
                BootstrapAlert("OTP do not match", "txtVerifyOtp");
            }
        }


    }
    if (ValidateBlankCheck()) {
        CallSave();
    }
});