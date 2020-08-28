$(document).ready(function () {
    getallcourses();
}); $("#btnSubmit").show();
$("#btnUpdate").hide();



function getallcourses() {
    jQuery.support.cors = true;
    //var UserId = localStorage.getItem("UserId");
    var UId = 6;
    var usersParam = JSON.stringify({
        UserId: UId,
        ACTIONCODE: "B"
    });

    var inputCourses = $("#inputCourses");
    inputCourses.empty().append('<option selected="selected" value="0" disabled = "disabled">Loading.....</option>');

    $.ajax(
        {

            type: "GET",
            url: ServiceURL + "/api/HostCourses/GetHostCourse",
            data: JSON.parse(usersParam),
            dataType: "json",
            contentType: "application/json",
            success: function (response) {

                var s = '<option value="0">Choose...</option>';
                for (var i = 0; i < response.length; i++) {
                    s += '<option value="' + response[i].courseId + '">' + response[i].courseName + '</option>';
                }
                $("#inputCourses").html(s);



            },



            error: function (msg) {

                alert(msg.responseText);
            }
        });
}
