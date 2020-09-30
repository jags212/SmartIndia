﻿$(document).ready(function () {
    BindList();
});
//List Bind
function BindList() {
    var UId = localStorage.getItem("userID");
    jQuery.support.cors = true;
    var usersParam = JSON.stringify({
        ACTIONCODE: "C"
    });
    $.ajax(
        {
            type: "GET",
            url: ServiceURL + "/api/AttendeeEnrolcourses/AttendeeEnrollclass",
            data: JSON.parse(usersParam),
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                var trHTML = '';

                $.each(data, function (i, item) {
                    if (data[i].attendeeUserId == UId) {
                        var fab = '<i class="bx bxs-star">';
                    }
                    else {
                        var fab = '<i class="bx bx-star">';
                    }

                    trHTML += '<li class="list-group-item justify-content-between ocr-list-group"> '
                        + '<div class="sm-card-title" >'
                        + ' <a data-toggle="tooltip" data-placement="bottom" title="' + data[i].courseName + '" href="' + ClientURL + '/Attendee/EnrollCourses/EnrollCourseDetails?SID=' + data[i].courseId + '&bt=' + data[i].batchName + '" >' + data[i].courseName + ' ' + "<span class='topic-font'>(" + '' + data[i].topics + '' + ")</span>" + ' </a>'
                        + '</div>'
                        +'<div class="enroll-course-show" > '
                        //+ '<span  onclick="AddShowInterest(' + data[i].courseId + ',' + data[i].batchName + ')" class="show-interest" data - toggle="tooltip" data - placement="bottom" title = "Show Interest" > <i class="bx bx-flag"></i></span>'
                        + '<span onclick="AddShowFavorite(' + data[i].courseId + ',' + "'" + '' + data[i].batchName + '' + "'" + ')" class="add-to-favorite" data - toggle="tooltip" data - placement="bottom" title = "Add to Favorite" > '+ fab +'</i></span>'
                        +'</div> '
                        + '<span class="sm-host-name">'
                        + '<i class="bx bx-task"></i>' + data[i].uname + ''
                        + '</span>'
                        + ' <p class="card-text sm-cli-text ellip-box two-lines">' + data[i].courseDesc + '</p>'
                        + '<div class="sm-bottom-info">'
                        + '<span class="sm-date">'
                        + ' <i class="bx bx-calendar"></i>' + dateFormat(data[i].startDate, 'dd-mmm-yy') + ' To ' + dateFormat(data[i].endDate, 'dd-mmm-yy') + ''
                        + '</span>'
                        + '<span class="sm-time">'
                        + ' <i class="bx bx-time"></i> ' + data[i].duration + ' Days'
                        + '</span>'
                        + '</div >'
                        + '</li >'
                });

                $('#coursedetails').append(trHTML);
                $('.action-inline').tooltip();
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