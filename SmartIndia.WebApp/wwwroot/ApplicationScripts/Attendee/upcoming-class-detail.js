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
                $("#coursename").html(data.upcomingClassDetails[0].courseName);
                $("#topic").html("( " + data.upcomingClassDetails[0].topics+" )");
                $("#Batchname").html(data.upcomingClassDetails[0].batchName);
                $("#hostname").html(data.upcomingClassDetails[0].uname);
                $("#startdate").html(dateFormat(data.upcomingClassDetails[0].scheduleDate, 'dd-mmm-yy'));
                $("#starttime").html(timeConvert(data.upcomingClassDetails[0].startTime));
                $("#desc").html(data.upcomingClassDetails[0].courseDesc);

                $("#imgBanner").attr('src', data.upcomingClassDetails[0].imageUrl);
                if (data[0].imageExt != null && data.upcomingClassDetails[0].imageExt != "") {
                    $("#imgg").show();
                } else {
                    $("#imgg").hide();
                }

                if (data[0].brochureExt == "pdf") {
                    $("#imgbrouchurepdf").attr('src', data.upcomingClassDetails[0].brouchureUrl);
                    $("#urlbrouchurepdf").attr('href', data.upcomingClassDetails[0].brouchureUrl);

                    $("#imgbrouchure").hide();
                    $("#urlbrouchure").hide();
                    $("#imgbrouchurepdf").show();
                    $("#urlbrouchurepdf").show();
                }
                else {
                    $("#imgbrouchure").attr('src', data.upcomingClassDetails[0].brouchureUrl);
                    $("#urlbrouchure").attr('href', data.upcomingClassDetails[0].brouchureUrl);
                    $("#imgbrouchurepdf").hide();
                    $("#urlbrouchurepdf").hide();
                    $("#imgbrouchure").show();
                    $("#urlbrouchure").show();
                }
            },

            error: function (msg) {
                alert(msg.responseText);
            }
        });
}