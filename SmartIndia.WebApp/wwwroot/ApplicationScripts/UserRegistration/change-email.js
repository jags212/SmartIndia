﻿
$(document).ready(function () {
    $("#divmailchange").css("display", "block");
    $("#divmsg").css("display", "none");
});
function checkEmail() {
    var result = parseJwt(localStorage.getItem("jwtToken"));
    uid = result.nameid;

    var usersParam = JSON.stringify({
        Email: $('#currentemail').val(),
        UID: uid,
    });
    $.ajax(
        {
            type: "GET",
            url: ServiceURL + "/api/UserRegistration/CkeckCurrentEmail",
            data: JSON.parse(usersParam),
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                if (data.retOut == true) {
                    var usersParam;
                    usersParam = JSON.stringify({
                        Emailid: $('#newemail').val(),
                        UID: uid,
                        ServiceURL: ClientURL
                    })
                    $.ajax({
                        url: ServiceURL + "/api/UserRegistration/UpdateEmail",
                        type: "POST",
                        data: usersParam,
                        dataType: "json",
                        contentType: "application/json;",
                        success: function (data) {
                            if (data.retOut == "1") {
                                $("#divmailchange").css("display", "none");
                                $("#divmsg").css("display", "block");
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
                    BootstrapAlert('Current email is not correct...', 'currentemail');
                }
            },
            error: function (msg) {
                alert(msg.responseText);
            }
        });
}
$('#btnSubmit').click(function () {
    function CallSave() {
        checkEmail();
    }
    if (ValidateBlankCheck()) {
        if (BootStrapSubmit('btnsubmit', 'Are You Sure To change email id ?', 'Are You Sure To Update ?', CallSave)) {
            return false;
        }
        else {
            return true;
        }
    }
});
function ValidateBlankCheck() {

    if (!BlankTextBox('currentemail', 'Current email')) {
        return false;
    }
    else if (!IsSpecialCharacter1stPalce('currentemail')) {
        return false;
    }
    else if (!ValidateEmail('currentemail')) {
        return false;
    }
    else if (!BlankTextBox('newemail', 'New email')) {
        return false;
    }
    else if (!IsSpecialCharacter1stPalce('newemail')) {
        return false;
    }
    else if (!ValidateEmail('newemail')) {
        return false;
    }


    else {
        return true;
    }
}