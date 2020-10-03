var uid;
var result = parseJwt(localStorage.getItem("jwtToken"));
$(document).ready(function () { 
    uid = parseInt(result.unique_name);
    BindCountry();
});
function BindCountry() {
    $.get("" + ServiceURL + "/api/MasterData/GetCountryData", function (dataList) {
        $.each(dataList, function (data, value) {
            $("#ddlCountry").append($("<option></option>").val(value.id).html(value.countryName));
        })
    });
}
function BindUserData(obj) {
    $('#hFullName').html(obj.firstName + " " + obj.lastName);
    $('#spnRoleName').html(result.role);
    $('#txtFirstName').val(obj.firstName);
    $('#txtLastName').val(obj.lastName);
    $('#txtProfileName').val(obj.profileName);
    $('#profileEmail').val(obj.emailId);
    $('#profileMobileNo').val(obj.mobileNo);
    $('#dobdatepicker').val(dateFormat(obj.dob, "dd-mmm-yy"));
    $('#txtPin').val(obj.pin);
    $('#txtCity').val(obj.city);
    $('#ddlCountry').val(obj.countryId);
    $('input[name="gender"][value="' + obj.gender + '"]').prop('checked', true);
    var isEmailPrivate = obj.isEmailPrivate == true ? "Private" : "Public";
    $('input[name="emailpripub"][value="' + isEmailPrivate + '"]').prop('checked', true);
    var isMobilePrivate = obj.isMobilePrivate == true ? "Private" : "Public";
    $('input[name="mobilepripub"][value="' + isMobilePrivate + '"]').prop('checked', true);
    if (obj.emailConfirmed) {
        $('#spnEmailVer').show();
    }
    else {
        $('#spnEmailVer').hide();
    }
    if (obj.mobileConfirmed) {
        $('#spnMobileVer').show();
    }
    else {
        $('#spnMobileVer').hide();
    }
}
function ValidateForm() {
    if (!BlankTextBox('txtFirstName', 'First Name')) {
        return false;
    }
    else if (!IsWhiteSpace1stPalce('txtFirstName')) {
        return false;
    }
    else if (!BlankTextBox('txtProfileName', 'Profile Name')) {
        return false;
    }
    else if (!IsWhiteSpace1stPalce('txtProfileName')) {
        return false;
    }
    else {
        return true;
    }
}
$(window).on('load', function () {
    $.get("" + ServiceURL + "/api/UserRegistration/GetUserDetails?userid=" + uid, function (data) {
        BindUserData(data);
    });
});
$('#btnSave').click(function () {
    if (ValidateForm()) {
        if (BootStrapSubmit('btnSave', 'Are You Sure To Update ?', 'Are You Sure To Update ?', CallSave)) {
            return false;
        }
        else {
            return true;
        }
    }
    function CallSave() {
        var usersParam = JSON.stringify({
            ACTIONCODE: 'U',
            UserId: uid,
            FirstName: $('#txtFirstName').val(),
            LastName: $('#txtLastName').val(),
            ProfileName: $('#txtProfileName').val(),
            CountryId: parseInt($('#ddlCountry').val()),
            PIN: parseInt($('#txtPin').val()),
            City: $('#txtCity').val(),
            Gender: $('input[name="gender"]:checked').val(),
            DOB: dateFormat($('#dobdatepicker').val(), 'yyyy-mm-dd'),
            IsEmailPrivate: $('input[name="emailpripub"]:checked').val() == "Private" ? true : false,
            IsMobilePrivate: $('input[name="mobilepripub"]:checked').val() == "Private" ? true : false,
            UpdatedById: uid
        });
        $.ajax({
            url: ServiceURL + "/api/UserRegistration/UpdateUserProfile",
            type: "POST",
            data: usersParam,
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                if (data == "2") {
                    BootStrapRedirect("Data updated successfully.", "/ManageUsers/Users/Profile");
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