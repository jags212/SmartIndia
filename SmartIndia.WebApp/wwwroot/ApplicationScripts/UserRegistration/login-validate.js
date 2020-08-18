﻿function ValidateForm() {
    if (!BlankTextBox('txtEmail', 'Email')) {
        return false;
    }
    else if (!IsSpecialCharacter1stPalce('txtEmail')) {
        return false;
    }
    else if (!ValidateEmail('txtEmail')) {
        return false;
    }
    else if (!BlankTextBox('txtPassword', 'Password')) {
        return false;
    }
    else if (!IsWhiteSpace1stPalce('txtPassword')) {
        return false;
    }
    else {
        return true;
    }
}
$('#btnLogin').click(function () {
    function CallSave() {
        var pass = $('#txtPassword').val();
        $('#txtPassword').val($('#txtPassword').val() + Math.random());
        var usersParam = JSON.stringify({
            EmailID: $('#txtEmail').val(),
            Password: pass
        });
        $.ajax({
            url: ServiceURL + "/api/users/authenticate",
            type: "POST",
            data: usersParam,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                if (data.id != "") {
                    localStorage.setItem("userID", data.id);
                    localStorage.setItem("emailID", data.emailID);
                    localStorage.setItem("firstName", data.firstName);
                    $.ajaxSetup({
                        beforeSend: function (xhr) {
                            xhr.setRequestHeader('Authorization', 'Bearer ' + data.jwtToken + '');
                        }
                    });
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                BootstrapAlert(jqXHR.responseJSON.message, 'txtPassword');
                $('#txtPassword').val("");
            }
        });
    }
    if (ValidateForm()) {
        CallSave();
    }
}); 