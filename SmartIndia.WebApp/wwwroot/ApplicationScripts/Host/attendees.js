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
                var trHTML = '';
                var cancel = '';
                $.each(data, function (i, item) {
                   // trHTML += '<tr  class=""><td>' + (i + 1) + '</td><td>' + data[i].courseName + '</td><td>' + dateFormat(data[i].startDate, 'dd-mmm-yy') + '</td><td data-toggle="modal" data-target="#GetAttendeesModal"><a href="javascript:void(0);" class="attendee-tooltip" data-toggle="tooltip" data-placement="bottom" title="Attendees">' + data[i].noOfAttendee + '</a></td> </tr>';

                    trHTML +='<div class="col-lg-4 col-md-6">'
                        +'<div class="card p-0 mb-10">'
                        +'<div class="card-body p-3 text-secondary border-secondary" >'
                        + '<h5 class="card-title font-weight-bold">' + data[i].courseName + ' <span class="topic-font">(' + data[i].topics + ')</span></h5>'
                        + '<p class="card-text v-ellipsis"> ' + data[i].courseDesc + ' </p>'
                        + '<div class="sm-bottom-info">'
                        + '<span class="sm-co-date">'
                        + '<small><i class="bx bx-calendar"></i>' + dateFormat(data[i].startDate, 'dd-mmm-yy') + '</small>'
                        + '</span>'
                        + '<span class="sm-co-users" data-toggle="modal" data-target="#GetAttendeesModal">'
                        + '<small><i class="fa fa-users"></i>' + data[i].noOfAttendee + '</small>'
                        + '</span>'
                        + '</div>'
                        + '</div>'
                        + '</div>'
                        + '</div>';
                });
                $('#divcoursewiseattendee').append(trHTML);
                //$('.attendee-tooltip').tooltip();
                //$('#tbl_attendees').DataTable({
                //    'columnDefs': [{
                //        //'targets': [3],
                //        //'orderable': false,
                //    }],
                //});
            },
            error: function (msg) {
                alert(msg.responseText);
            }
        });
}
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
                    trHTML += '<tr  class=""><td>' + (i + 1) + '</td><td>' + data[i].userId + '</td><td data-toggle="modal" data-target="#GetCoursesModal"><a href="javascript:void(0);" class="attendee-tooltip" data-toggle="tooltip" data-placement="bottom" title="Courses">' + data[i].noOfCourses + '</a></td> </tr>';
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