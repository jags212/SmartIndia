$(document).ready(function () {
    Coursedetails();
});
function Coursedetails() {
    jQuery.support.cors = true;
    var usersParam = JSON.stringify({
        ACTIONCODE: "D",
        CourseId: $("#hfScId").val(),
        BatchName: $("#hfbatch").val()
    });
    $.ajax(
        {
            type: "GET",
            url: ServiceURL + "/api/AttendeeEnrolcourses/GetCoursedetails",
            data: JSON.parse(usersParam),
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                $("#coursename").html(data[0].courseName);
                $("#topic").html("( " + data[0].topics + " )");
                $("#startdate").html(dateFormat(data[0].startDate, 'dd-mmm-yy'));
                $("#desc").html(data[0].courseDesc);

                $("#imgbrouchure").attr('src', data[0].brochureUrl);
                $("#urlbrouchure").attr('href', data[0].brochureUrl);
            },
            error: function (msg) {
                alert(msg.responseText);
            }
        });
}
$('#btn_enroll').click(function () {
    //$('#GetAttendeePerminumModal').css("display", "none");
    function CallSave() {
        var UId = localStorage.getItem("userID");
        var usersParam = JSON.stringify({
            ACTIONCODE: 'A',
            UserId: parseInt(UId),
            CourseId: parseInt($('#hfScId').val()),
            BatchName: $('#hfbatch').val(),
        });
        $.ajax({
            url: ServiceURL + "/api/AttendeeEnrolcourses/EnrollClass",
            type: "POST",
            data: usersParam,
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                if (data == "1") {
                    BootStrapRedirect('Course Enrolled Successfully.', '/Attendee/EnrollCourses/EnrollCourse');
                }
                else if (data == "3") {
                    BootstrapAlert('Course Alreday Enrolled.');
                }
                else {
                    BootstrapAlert('Something went wrong. Please try again');
                }
            },
            error: function (error) {
                console.log(error.statusText);
            }
        });
    }
    if (BootStrapSubmit('btn_enroll', 'Are You Sure To Enroll ?', 'Are You Sure To Update ?', CallSave)) {
        return false;
    }
    else {
        return true;
    }


});
