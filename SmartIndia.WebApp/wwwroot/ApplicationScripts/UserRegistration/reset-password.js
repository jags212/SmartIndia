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
            EmailId: localStorage.getItem("emailID"),
            Password: $('#txtCnfmPassword').val()
        });
        $.ajax({
            url: ServiceURL + "/api/UserRegistration/ResetPassword",
            type: "POST",
            data: usersParam,
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                if (data == "2") {
                    localStorage.clear();
                    BootStrapRedirect("Your password has been reset successfully.", "/ManageUsers/Users/Login")
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