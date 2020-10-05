function ValidateForm() {
    if (!BlankTextBox('txtEmail', 'Email Id / Mobile No')) {
        return false;
    }
    else if (!IsSpecialCharacter1stPalce('txtEmail')) {
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
            contentType: "application/json",
            success: function (data) {
                if (data.id != "") {
                    localStorage.setItem("userID", data.id);
                    localStorage.setItem("emailID", data.emailID);
                    localStorage.setItem("firstName", data.firstName);
                    localStorage.setItem("jwtToken", data.jwtToken);
                    var resultData = parseJwt(localStorage.getItem("jwtToken")); 
                    $.post("/ManageUsers/Users/AthenticationUserRole?UserId=" + data.id + "&RoleName=" + resultData.role, function (data) {
                        if (data == 1) {
                            if (resultData.role == "Host") {
                                window.location.href = "/Hosts/HostDashboard/Dashboard";
                            }
                            else {
                                window.location.href = "/Attendee/Dashboard/AttendeeDashboard";
                            }
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
$(document).ready(function () {
    $("#MyForm").keypress(function (e) {
        kCode = e.keyCode || e.charCode //for cross browser
        if (kCode == 13) {
            var defaultbtn = $(this).attr("DefaultButton");
            $("#" + defaultbtn).click();
            return false;
        }
    });
});
