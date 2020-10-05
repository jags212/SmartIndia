function UpdateUserRole() {
    var UId = localStorage.getItem("userID");
    $.ajax(
        {
            url: ServiceURL + "/api/AttendeeClassWall/UpdateUserRole?Userid=" + parseInt(UId) + "",
            type: "POST",
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                if (data == "1") {
                    $.post("/ManageUsers/Users/AthenticationUserRole?UserId=" + UId + "&RoleName=Host", function (data) {
                        if (data == 1) {
                            window.location.href = "/Hosts/HostDashboard/Dashboard";
                        }
                    });
                }
                else {
                    BootstrapAlert('Something went wrong. Please try again');
                }
            },
            error: function (error) {
                console.log(error.statusText);
            }
        }
    );

}