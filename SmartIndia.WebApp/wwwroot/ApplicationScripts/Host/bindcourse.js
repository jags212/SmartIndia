$(document).ready(function () {
    getallcoursesDDL();
}); $("#btnSubmit").show();
$("#btnUpdate").hide();



function getallcoursesDDL() {
    jQuery.support.cors = true;
    var UId = localStorage.getItem("userID");
    var usersParam = JSON.stringify({
        UserId: parseInt(UId),
        ACTIONCODE: "B"
    });

    var inputCourses = $("#inputCourses");
    inputCourses.empty().append('<option selected="selected" value="0" disabled = "disabled">Loading.....</option>');

    $.ajax(
        {

            type: "GET",
            url: ServiceURL + "/api/HostCourses/GetCourse",
            data: JSON.parse(usersParam),
            dataType: "json",
            contentType: "application/json",
            success: function (response) {

                var s = '<option value="0">Choose...</option>';
                for (var i = 0; i < response.length; i++) {
                    s += '<option value="' + response[i].courseId + '">' + response[i].courseName + '</option>';
                }
                $("#inputCourses").html(s);
                $("#uinputCourses").html(s);


            },



            error: function (msg) {

                alert(msg.responseText);
            }
        });
}
