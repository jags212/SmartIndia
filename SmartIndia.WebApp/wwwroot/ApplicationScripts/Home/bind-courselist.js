$(document).ready(function () {
    BindList();
});
//List Bind
function ValidateForm() {
     if (!IsSpecialCharacter1stPalce('txtCourse')) {
        return false;
     }
     else if (!IsWhiteSpace1stPalce('txtCourse')) {
         return false;
     }
     else if (!IsWhiteSpace1stPalce('txtHost')) {
         return false;
     }
    else if (!IsSpecialCharacter1stPalce('txtHost')) {
        return false;
    }
    // else if (!CompareNumberRange('txtMinPrice', 'txtMaxPrice', 'Min Price', 'Max Price')) {
    //    return false;
    //}
    else {
        return true;
    }
    alert("hi validation");
} 
$('#btnSearch').click(function () {
    if (ValidateForm()) {
        if (BindList()) {
            return false;
        }
        else {
            return true;
        }
    }
});
$("#clearfilter").click(function () {
    BindList();
});
function BindList() {
    var UId = localStorage.getItem("userID");
    jQuery.support.cors = true;
    var usersParam = JSON.stringify({
        ACTION: "A",
        CourseName: $('#txtCourse').val(),
        HostName: $('#txtHost').val(),
        DATE: dateFormat($('#searchDate').val(), 'yyyy-mm-dd'),
        MinPrice: $('#txtMinPrice').val() == "" ? 0 : parseFloat($('#txtMinPrice').val()),
        MaxPrice: $('#txtMaxPrice').val() == "" ? 0 : parseFloat($('#txtMaxPrice').val())
    });
    $.ajax(
        {
            type: "GET",
           // url: ServiceURL + "/api/AttendeeEnrolcourses/AttendeeEnrollclass",
            url: ServiceURL + "/api/AttendeeEnrolcourses/FilterEnrollCourses",
            data: JSON.parse(usersParam),
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                var trHTML = '';
                $('#div_courselist').empty();
                $.each(data, function (i, item) {
                    if (data[i].attendeeUserId == UId) {
                        var fab = '<i class="bx bxs-star">';
                    }
                    else {
                        var fab = '<i class="bx bx-star">';
                    }

                    trHTML += '<div class="col-lg-4 col-md-6">'
                        + '<div class="card ocr-card p-0 mb-30">'
                        + '<div class="card-body">'
                        + '<div class="edgt-cli-top-info">'
                        + '<h5 class="card-title font-weight-bold">'
                        + '<a itemprop="url" href="' + ClientURL + '/Home/CourseDetails?SID=' + data[i].courseId + '&bt=' + data[i].batchName + '" target="_self">' + data[i].courseName + '</a>'
                        + '</h5>'
                        + '<div class="edgt-ci-price-holder clearfix">'
                        + '<span class="edgt-ci-price-value">₹' + data[i].cost + '</span>'
                        + '</div>'
                        + '<span class="co-add-to-favorite" data-toggle="tooltip" data-placement="bottom" title="Add To Favorite">'
                        + '<a href="/ManageUsers/Users/Login"><i class="bx bx-star"></i></a>'
                        + '</span>'
                    // ManageUsers / Users / Login
                        //+ '<span onclick="AddShowFavorite(' + data[i].courseId + ',' + "'" + '' + data[i].batchName + '' + "'" + ')" class="add-to-favorite" data - toggle="tooltip" data - placement="bottom" title = "Add to Favorite" > ' + fab + '</i></span>'

                        + '<span class="ocr-host-name">' + data[i].uname + '</span>'
                        + '</div>'
                        + '<p class="card-text edgt-cli-excerpt v-ellipsis" >' + data[i].courseDesc + '</p>'
                        + '<div class="edgt-cli-bottom-info">'
                        + '<div class="edgt-students-number-holder" data-toggle="tooltip" data-placement="bottom" title="Attendees">'
                        + '<span aria-hidden="true" class="fa fa-users"></span>'
                        + '<span>1</span>'
                        + '</div>'
                        + '<div class="edgt-cli-duration-holder" data-toggle="tooltip" data-placement="bottom" title="Duration">'
                        + '<span aria-hidden="true" class="fa fa-clock"></span>'
                        + '<span class="edgt-duration-period">' + data[i].duration + ' Days</span>'
                        + '</div>'
                        + '<a href="/ManageUsers/Users/Login" class="co-enroll">Enroll<i class="bx bx-plus bx-pad"></i></a>'
                        + '</div>'
                        + '</div>'
                        + '</div>'
                        + '</div>'
                });

                $('#div_courselist').append(trHTML);
                $('.action-inline').tooltip();
                $().vEllipsis({
                    'lines': 2,
                    'responsive': true
                });
            },

            error: function (msg) {
                alert(msg.responseText);
            }
        });
}



function AddShowInterest(CID, Batch) {
    alert("int");
    var UId = localStorage.getItem("userID");
    var usersParam = JSON.stringify({
        ACTIONCODE: 'A',
        UserId: parseInt(UId),
        CourseId: parseInt(CID),
        BatchName: Batch

    });
    $.ajax(
        {
            url: ServiceURL + "/api/AttendeeEnrolcourses/ShowInterest",
            type: "POST",
            data: usersParam,
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                if (data == "1") {
                    BootStrapRedirect('Show Interest.', '/Attendee/EnrollCourses/EnrollCourse');
                }
                else if (data == "3") {
                    BootstrapAlert('Data Alreday Exist.');
                }
                else {
                    BootstrapAlert('Something went wrong. Please try again');
                }
            },
            error: function (error) {
                console.log(error.statusText);
            }
        }
    );

}
function AddShowFavorite(CID, Batch) {
    var UId = localStorage.getItem("userID");
    var usersParam = JSON.stringify({
        ACTIONCODE: 'A',
        UserId: parseInt(UId),
        CourseId: parseInt(CID),
        BatchName: Batch

    });
    $.ajax(
        {
            url: ServiceURL + "/api/AttendeeEnrolcourses/AddtoFavorite",
            type: "POST",
            data: usersParam,
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                if (data == "1") {
                    //BootstrapAlert('Add To Favorite.');
                    //BootStrapRedirect('Add To Favorite.', '/Attendee/EnrollCourses/EnrollCourse');
                    $('#coursedetails').empty();
                    BindList();
                }
                else if (data == "3") {
                    $('#coursedetails').empty();
                    BindList();
                    //BootStrapRedirect('Data Alreday Exist.', '/Attendee/EnrollCourses/EnrollCourse');
                }
                else {
                    BootstrapAlert('Something went wrong. Please try again');
                }
            },
            error: function (error) {
                console.log(error.statusText);
            }
        }
    );

}