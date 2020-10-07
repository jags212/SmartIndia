$(document).ready(function () {
    var uid;
    var result = parseJwt(localStorage.getItem("jwtToken"));
    uid = parseInt(result.unique_name);
    $.get("" + ServiceURL + "/api/UserRegistration/GetUserDetails?userid=" + uid, function (data) {
        $('#spnFirstName').html(data.firstName);
        $('#spnFullName').html(data.firstName + " " + data.lastName);
        $('#spnRole').html('(' + result.role + ')');
        $('#spnEmail').html(data.emailId);
    });
});