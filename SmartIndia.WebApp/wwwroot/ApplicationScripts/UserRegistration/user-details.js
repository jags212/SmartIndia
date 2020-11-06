$(document).ready(function () {
    var uid;
    var result = parseJwt(localStorage.getItem("jwtToken"));
    uid = parseInt(result.unique_name);
    $.get("" + ServiceURL + "/api/UserRegistration/GetUserDetails?userid=" + uid, function (data) {
        $('#spnFirstName').html(data.profileName);
        $('#spnFullName').html(data.firstName + " " + data.lastName);
        $('#spnRole').html('(' + result.role + ')');
        $('#spnEmail').html(data.emailId);
    });
    getProfileImage();
});
function getProfileImage() {

    var UId = localStorage.getItem("userID");
    var usersParam2 = JSON.stringify({
        UserId: parseInt(UId),
    });
    $.ajax(
        {
            type: "GET",
            url: ServiceURL + "/api/UserRegistration/GetProfileImage",
            data: JSON.parse(usersParam2),
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                $("#imgProfile").attr('src', data[0].imageUrl);
                $("#imgProfileee").attr('src', data[0].imageUrl);
            },
            error: function (msg) {
                alert(msg.responseText);
            }
        });
}