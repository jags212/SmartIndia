var uid;
var result = parseJwt(localStorage.getItem("jwtToken"));
$(document).ready(function () {
    uid = parseInt(result.unique_name);
    BindCountry();
    getProfileImagee();
});
function BindCountry() {
    $.get("" + ServiceURL + "/api/MasterData/GetCountryData", function (dataList) {
        $.each(dataList, function (data, value) {
            $("#ddlCountry").append($("<option></option>").val(value.id).html(value.countryName));
        })
    });
}
function BindInterest(dataList) {
    var Interest = '';
    $.each(dataList, function (i, value) {
        Interest += '<div class="interest-area-box"><label class="checkbox-label">'
            + '<input type = "checkbox" name = "interestarea" value = "' + dataList[i].id + '" ' + dataList[i].isChecked+'/>'
            + '<span class="checkbox-custom" ></span ></label ><span>' + dataList[i].courseCategoryName + '</span></div>';
    });
    $(".interest-area").append(Interest);
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

    var img = obj.imageName;
    var imgext = obj.imageExt;
    $("#hfimg").val(img + "." + imgext);
    $("#hfimgName").val(img);

    if (obj.otherCourseCategoryName) {
        $('#chkOtherInterest').prop('checked', true);
        $('#interestArea').val(obj.otherCourseCategoryName);
        $("#otherInterestArea").slideDown("2000");
    }

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
    BindInterest(obj.interests);
}

function getProfileImagee() {

    var UId = localStorage.getItem("userID");
    var usersParam2 = JSON.stringify({
        UserId: parseInt(UId),
    });
    $.ajax(
        {
            type: "GET",
            url: ServiceURL + "/api/UserRegistration/GetProfileImage",
            data: JSON.parse(usersParam2),
            dataType: "json",
            contentType: "application/json",
            success: function (data) {

                $("#imgProfilee").attr('src', data[0].imageUrl);
               // $("#imgProfile").attr('src', data[0].imageUrl);
            },
            error: function (msg) {
                alert(msg.responseText);
            }
        });
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
function SaveImage(imgId) {
    const fdata = new FormData();

    var files = $("#fileuploadImg").get(0).files;

    // Add the uploaded image content to the form data collection
    if (files.length > 0) {
        fdata.append("UploadedImage", files[0]);
    }

    // Make Ajax request with the contentType = false, and procesDate = false
    var ajaxRequest = $.ajax({
        type: "POST",
        url: ServiceURL + "/api/UserRegistration/UploadImage?id=" + imgId,
        contentType: false,
        processData: false,
        data: fdata
    });

    ajaxRequest.done(function (responseData, textStatus) {
        if (textStatus == 'success') {
            $("#fileuploadImg").val('');
        }
    });
}
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
        //var ImgExt = $("#fileuploadImg").val().split('.')[1];
        if ($("#fileuploadImg").val() != "") {
            var ImgExt = $("#fileuploadImg").val().split('.')[1];
        } else {
            var ImgExt = $("#hfimg").val().split('.')[1];
        }
        var arr = new Array();
        $('input:checkbox[name=interestarea]:checked').each(function () {
            var interestId = {};
            interestId.InterestId = parseInt($(this).val());
            arr.push(interestId);
        });
        var OtherInterest = '';
        if ($('#chkOtherInterest').is(":checked")) {

            OtherInterest = $('#interestArea').val();
        }
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
            UpdatedById: uid,
            OtherCourseCategoryName: OtherInterest,
            ImageExt: ImgExt,
            Interests: arr
        });
        $.ajax({
            url: ServiceURL + "/api/UserRegistration/UpdateUserProfile",
            type: "POST",
            data: usersParam,
            dataType: "json",
            contentType: "application/json",
            success: function (data) {

                var fileIMG = $("#fileuploadImg").val();

                if (fileIMG) {
                    SaveImage($("#hfimgName").val());
                } else {
                }

                if (data.retOut == "2") {
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
$('#btnCancel').click(function () {
    window.location.href = '/ManageUsers/Users/Profile';
});