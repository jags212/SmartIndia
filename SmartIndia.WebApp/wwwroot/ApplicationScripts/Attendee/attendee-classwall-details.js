$(document).ready(function () {
    Coursedetails();
});
function Coursedetails() {

    jQuery.support.cors = true;
    var UId = localStorage.getItem("userID");
    var usersParam = JSON.stringify({
        UserId: parseInt(UId),
        ACTIONCODE: "D",
        SchedularId: $("#hfScId").val()
    });
    $.ajax(
        {
            type: "GET",
            url: ServiceURL + "/api/AttendeeUpcomingClasses/AttendeeUpcommingClassDetail",
            data: JSON.parse(usersParam),
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                $("#coursename").html(data[0].courseName);
                $("#topic").html("( " + data[0].topics + " )");
                $("#Batchname").html(data[0].batchName);
                $("#hostname").html(data[0].uname);
                $("#startdate").html(dateFormat(data[0].scheduleDate, 'dd-mmm-yy'));
                $("#starttime").html(timeConvert(data[0].startTime));
                $("#desc").html(data[0].courseDesc);

                $("#imgBanner").attr('src', data[0].imageUrl);

                $("#imgbrouchure").attr('src', data[0].brouchureUrl);
                $("#urlbrouchure").attr('href', data[0].brouchureUrl);
            },

            error: function (msg) {
                alert(msg.responseText);
            }
        });
}