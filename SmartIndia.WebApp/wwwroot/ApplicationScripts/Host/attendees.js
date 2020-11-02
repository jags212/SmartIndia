$(document).ready(function () {
    //$("#attendeesCoursesList").css("display", "block");
    BindCWA();
})
function BindCWA() {
    jQuery.support.cors = true;
    var UId = localStorage.getItem("userID");
    var usersParam = JSON.stringify({
        UserId: parseInt(UId),
        ACTIONCODE: "B"
    });
    $.ajax(
        {
            type: "GET",
            url: ServiceURL + "/api/Attendees/BindAttendees",
            data: JSON.parse(usersParam),
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                if (data.length == 0) {
                    $("#divcardbody").css("display", "none");
                    $("#divcardbodynodata").css("display", "block");
                }
                else {
                    $("#divcardbody").css("display", "block");
                    $("#divcardbodynodata").css("display", "none");
                    var trHTML = '';
                    var cancel = '';
                    $.each(data, function (i, item) {
                        trHTML += '<div class="col-lg-4 col-md-6">'
                            + '<div class="card p-0 mb-10">'
                            + '<div class="card-body p-3 text-secondary border-secondary" >'
                            + '<h5 class="card-title font-weight-bold">' + data[i].courseName + ' <span class="topic-font">(' + data[i].topics + ')</span></h5>'
                            + '<p class="card-text v-ellipsis"> ' + data[i].courseDesc + ' </p>'
                            + '<div class="sm-bottom-info">'
                            + '<span class="sm-co-date">'
                            + '<small><i class="bx bx-calendar"></i>' + dateFormat(data[i].startDate, 'dd-mmm-yy') + '</small>'
                            + '</span>'
                            + '<span class="sm-co-users"> <a href="javascript:void(0);" onclick="getattendeedetail(' + data[i].courseId + ')" data-toggle="modal" data-target="#GetAttendeesModal"><small><i class="fa fa-users"></i>' + data[i].noOfAttendee + '</small></a>'
                            + '</span>'
                            + '</div>'
                            + '</div>'
                            + '</div>'
                            + '</div>';
                    });
                    $('#divcoursewiseattendee').append(trHTML);
                }
            },
            error: function (msg) {
                alert(msg.responseText);
            }
        });
}
function getattendeedetail(CID) {
    jQuery.support.cors = true;
    var UId = localStorage.getItem("userID");
    var usersParam = JSON.stringify({
        UserId: parseInt(UId),
        CourseId: CID,
        ACTIONCODE: "C"
    });
    $.ajax(
        {
            type: "GET",
            url: ServiceURL + "/api/Attendees/BindCWA",
            data: JSON.parse(usersParam),
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                $('#tbl_attendeeDetails tbody').empty();
                $('#tbl_attendeeDetails').dataTable().fnClearTable();
                $('#tbl_attendeeDetails').dataTable().fnDraw();
                $('#tbl_attendeeDetails').dataTable().fnDestroy();

                var trHTML = '';
                var cancel = '';
                $.each(data, function (i, item) {
                    trHTML += '<tr  class=""><td>' + (i + 1) + '</td><td>' + data[i].firstName + '</td> </tr>';
                });
                $('#tbl_attendeeDetails').append(trHTML);
                $('.attendee-tooltip').tooltip();
                $('#tbl_attendeeDetails').DataTable({
                });
            },
            error: function (msg) {
                alert(msg.responseText);
            }
        });
};
$(document).ready(function () {
    BindAWC();
})
function BindAWC() {
    jQuery.support.cors = true;
    var UId = localStorage.getItem("userID");
    var usersParam = JSON.stringify({
        UserId: parseInt(UId),
        ACTIONCODE: "A"
    });
    $.ajax(
        {
            type: "GET",
            url: ServiceURL + "/api/Attendees/BindAWC",
            data: JSON.parse(usersParam),
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                var trHTML = '';
                var cancel = '';
                $.each(data, function (i, item) {
                    trHTML += '<tr  class=""><td>' + (i + 1) + '</td><td>' + data[i].hostname + '</td><td data-toggle="modal" data-target="#GetCoursesModal"><a href="javascript:void(0);" onclick="getattendeedetails(' + data[i].userId + ')" class="attendee-tooltip" data-toggle="tooltip" data-placement="bottom" title="Courses">' + data[i].noOfCourses + '</a></td> </tr>';
                });
                $('#tbl_awc').append(trHTML);
                $('.attendee-tooltip').tooltip();
                $('#tbl_awc').DataTable({
                });
            },
            error: function (msg) {
                alert(msg.responseText);
            }
        });
}
function getattendeedetails(AID) {
    jQuery.support.cors = true;
    var UId = localStorage.getItem("userID");
    var usersParam = JSON.stringify({
        UserId: parseInt(UId),
        AttendeeId: AID,
        ACTIONCODE: "D"
    });
    $.ajax(
        {
            type: "GET",
            url: ServiceURL + "/api/Attendees/BindAttendeeCourseDetails",
            data: JSON.parse(usersParam),
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                $('#tbl_courseDetails tbody').empty();
                $('#tbl_courseDetails').dataTable().fnClearTable();
                $('#tbl_courseDetails').dataTable().fnDraw();
                $('#tbl_courseDetails').dataTable().fnDestroy();

                var trHTML = '';
                var cancel = '';
                $.each(data, function (i, item) {
                    trHTML += '<tr  class=""><td>' + (i + 1) + '</td><td>' + data[i].courseName + '</td> <td>' + dateFormat(data[i].startDate, 'dd-mmm-yy') + '</td> <td>' + dateFormat(data[i].endDate, 'dd-mmm-yy') + '</td> </tr>';
                });
                $('#tbl_courseDetails').append(trHTML);
                $('.attendee-tooltip').tooltip();
                $('#tbl_courseDetails').DataTable({
                });
            },
            error: function (msg) {
                alert(msg.responseText);
            }
        });
};