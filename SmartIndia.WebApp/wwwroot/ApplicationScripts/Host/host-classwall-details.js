$(document).ready(function () {
    Coursedetails();
});
function Coursedetails() {

    jQuery.support.cors = true;
    var UId = localStorage.getItem("userID");
    var usersParam = JSON.stringify({
        UserId: parseInt(UId),
        ACTIONCODE: "F",
        SchedularId: $("#hfScId").val()
    });
    $.ajax(
        {
            type: "GET",
            url: ServiceURL + "/api/HostUpcomingClasses/HostUpcommingClassDetail",
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
            },

            error: function (msg) {
                alert(msg.responseText);
            }
        });
}