$(document).ready(function () {
    $("#Divimgbanner").hide();
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
            url: ServiceURL + "/api/HostUpcomingClasses/HostUpcommingClassDetail",
            data: JSON.parse(usersParam),
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                $("#coursename").html(data[0].courseName);
                $("#topic").html("( "+data[0].topics+" )");
                $("#Batchname").html(data[0].batchName);
                $("#hostname").html(data[0].uname);
                $("#startdate").html(dateFormat(data[0].scheduleDate, 'dd-mmm-yy'));
                $("#starttime").html(timeConvert(data[0].startTime));
                $("#desc").html(data[0].courseDesc);
                $("#imgBanner").attr('src', data[0].imageUrl);

                if (data[0].imageExt != null && data[0].imageExt != "") {
                    $("#imgg").show();
                    $("#Divimgbanner").show();
                } else {
                    $("#imgg").hide();
                    $("#Divimgbanner").hide();
                }
                

                if (data[0].brochureExt == "pdf") {
                    $("#imgbrouchurepdf").attr('src', data[0].brouchureUrl);
                    $("#urlbrouchurepdf").attr('href', data[0].brouchureUrl);

                    $("#imgbrouchure").hide();
                    $("#urlbrouchure").hide();
                    $("#imgbrouchurepdf").show();
                    $("#urlbrouchurepdf").show();
                }
                else {
                    $("#imgbrouchure").attr('src', data[0].brouchureUrl);
                    $("#urlbrouchure").attr('href', data[0].brouchureUrl);
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