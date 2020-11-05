$(document).ready(function () {
    $.ajax({
        url: ServiceURL + "/api/UserRegistration/UserEmailVerification",
        type: "GET",
        data: { acode: ACode },
        dataType: "json",
        success: function (data) {
            if (!data) {
                BootStrapRedirect("Invalid Request.", "/ManageUsers/Users/Login");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            BootstrapAlert(jqXHR.responseJSON.message, 'txtPassword');
            $('#txtPassword').val("");
        }
    });
    $("#MyForm").keypress(function (e) {
        kCode = e.keyCode || e.charCode //for cross browser
        if (kCode == 13) {
            var defaultbtn = $(this).attr("DefaultButton");
            $("#" + defaultbtn).click();
            return false;
        }
    });
});
function ValidateForm() {
    if (!BlankTextBox('txtPassword', 'Password')) {
        return false;
    }
    else if (!IsWhiteSpace1stPalce('txtPassword')) {
        return false;
    }
    else if (!isValidPassword('txtPassword')) {
        return false;
    }
    else if (!BlankTextBox('txtCnfmPassword', 'Confirm Password')) {
        return false;
    }
    else if (!IsWhiteSpace1stPalce('txtCnfmPassword')) {
        return false;
    }
    else if (!isPasswordMatch('txtPassword', 'txtCnfmPassword')) {
        return false;
    }
    else {
        return true;
    }
}
$('#btnSubmit').click(function () {
    if (ValidateForm()) {
        CallSave();
    }
    function CallSave() {
        var usersParam = JSON.stringify({
            EmailId: ACode,
            Password: $('#txtCnfmPassword').val()
        });
        $.ajax({
            url: ServiceURL + "/api/UserRegistration/ResetPassword",
            type: "POST",
            data: usersParam,
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                if (data.retOut == "2") {
                    localStorage.clear();
                    $.post("/ManageUsers/Users/RomoveAuth", function (data) {
                        if (data == 1) {
                            BootStrapRedirect("Your password has been reset successfully.", "/ManageUsers/Users/Login");
                        }
                    });
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
});