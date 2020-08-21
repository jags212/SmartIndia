function ValidateForm() {
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
        $("#btnok").button({
            text: true,
            icons: { primary: "ui-icon-search" }
        });
        var pass = $('#txtPassword').val();
        $('#txtPassword').val($('#txtPassword').val() + Math.random());
        var usersParam = JSON.stringify({
            EmailID: $('#txtEmail').val(),
            Password: pass
        });
        var settings = {
            "url": ServiceURL + "/api/users/authenticate",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/json"
            },
            "data": usersParam,
        };

        $.ajax(settings).done(function (response) {
            processAuthenticate(response);
        });
        //$.ajax({
        //    url: ServiceURL + "/api/users/authenticate",
        //    type: "POST",
        //    data: usersParam,
        //    dataType: "json",
        //    contentType: "application/json; charset=utf-8",
        //    headers: {
        //        "accept": "application/json",
        //        "Access-Control-Allow-Origin": "*",
        //        "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
        //        "Access-Control-Allow-Headers": "Content-Type"
        //    },
        //    success: function (data) {
        //        if (data.id != "") {
        //            localStorage.setItem("userID", data.id);
        //            localStorage.setItem("emailID", data.emailID);
        //            localStorage.setItem("firstName", data.firstName);
        //            $.ajaxSetup({
        //                beforeSend: function (xhr) {
        //                    xhr.setRequestHeader('Authorization', 'Bearer ' + data.jwtToken + '');
        //                }
        //            });
        //            window.location.href = "/Attendee/Dashboard/AttendeeDashboard";
        //        }
        //    },
        //    error: function (jqXHR, textStatus, errorThrown) {
        //        BootstrapAlert(jqXHR.responseJSON.message, 'txtPassword');
        //        $('#txtPassword').val("");
        //    }
        //});
    }

    function processAuthenticate(data) {
        if (data.id != "") {
            localStorage.setItem("userID", data.id);
            localStorage.setItem("emailID", data.emailID);
            localStorage.setItem("firstName", data.firstName);

            $.ajaxSetup({
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Accept", "application/vvv.website+json;version=1");
                    xhr.setRequestHeader("Authorization", "Bearer " + data.jwtToken + "");
                }
            });

            window.location.href = "/Attendee/Dashboard/AttendeeDashboard";
        }
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
