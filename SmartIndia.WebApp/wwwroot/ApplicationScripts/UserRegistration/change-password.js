function ValidateForm() {
    if (!BlankTextBox('txtCurrentPass', 'Current Password')) {
        return false;
    }
    else if (!IsWhiteSpace1stPalce('txtCurrentPass')) {
        return false;
    }
    else if (!BlankTextBox('txtPassword', 'New Password')) {
        return false;
    }
    else if (!IsWhiteSpace1stPalce('txtPassword')) {
        return false;
    }
    else if (!isValidPassword('txtPassword')) {
        return false;
    }
    else if (!BlankTextBox('txtCnfmPassword', 'Confirm New Password')) {
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
$('#btnChange').click(function () {
    if (ValidateForm()) {
        var result = parseJwt(localStorage.getItem("jwtToken"));
        var uid = result.nameid;
        $.get("" + ServiceURL + "/api/UserRegistration/UserPass?uid=" + uid + "&pass=" + $('#txtCurrentPass').val(), function (data) {
            if (data.retOut) {
                CallSave();
            }
            else {
                BootstrapAlert("Current password is wrong.", "txtCurrentPass");
            }
        });
    }
    function CallSave() {
        var result = parseJwt(localStorage.getItem("jwtToken"));
        var uid = result.nameid;
        var usersParam = JSON.stringify({
            EmailId: uid,
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
                    BootStrapRedirect("Your password has been changed successfully.", "/ManageUsers/Users/Profile");
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