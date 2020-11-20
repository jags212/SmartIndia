
$(document).ready(function () {
    CheckEnrollOrNot();
});
function CheckEnrollOrNot() {
    jQuery.support.cors = true;
    var UId = localStorage.getItem("userID");
    var usersParam = JSON.stringify({
        UserId: parseInt(UId),
        ACTIONCODE: "I"
    });
    $.ajax(
        {
            type: "GET",
            url: ServiceURL + "/api/AttendeeUpcomingClasses/AttendeeUpcomingClass",
            data: JSON.parse(usersParam),
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                if (data.length == 0) {
                    $("#divenroll").css("display", "block");
                }
                else {
                    $("#divenroll").css("display", "none");

                }
            },

            error: function (msg) {
                alert(msg.responseText);
            }
        });
}