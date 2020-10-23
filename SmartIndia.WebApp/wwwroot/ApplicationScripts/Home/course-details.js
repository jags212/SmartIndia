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
                $("#cost").html("₹"+data[0].cost);
                $("#Uname").html(data[0].uname);
                $("#EmailId").html(data[0].emailId);
                $("#MobileNo").html(data[0].mobileNo);
                //$("#topic").html("( " + data[0].topics + " )");
               // $("#startdate").html(dateFormat(data[0].startDate, 'dd-mmm-yy'));
                $("#desc").html(data[0].courseDesc);
                $("#imgBanner").attr('src', data[0].imageUrl);
                if (data[0].imageExt != null && data[0].imageExt != "") {
                    $("#imgBanner").show();
                } else {
                    $("#imgBanner").hide();
                }
            },
            error: function (msg) {
                alert(msg.responseText);
            }
        });
}
