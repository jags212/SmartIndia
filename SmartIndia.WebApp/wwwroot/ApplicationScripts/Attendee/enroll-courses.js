$(document).ready(function () {
    BindList();
});
//List Bind
function BindList() {
    var UId = localStorage.getItem("userID");
    jQuery.support.cors = true;
    var usersParam = JSON.stringify({
        ACTION: "A",
        CourseName: $('#txtCourse').val(),
        HostName: $('#txtHost').val(),
        DATE: dateFormat($('#searchDate').val(), 'yyyy-mm-dd'),
        MinPrice: $('#txtMinPrice').val() == "" ? 0 : parseFloat($('#txtMinPrice').val()),
        MaxPrice: $('#txtMaxPrice').val() == "" ? 0 : parseFloat($('#txtMaxPrice').val()),
        UserId: UId
    });
    $.ajax(
        {
            type: "GET",
            url: ServiceURL + "/api/AttendeeEnrolcourses/FilterEnrollCourses",
            data: JSON.parse(usersParam),
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                $('#tblCourses').DataTable().destroy();
                $("#divnoofdata").css("display", "block");
                $('#tblCourses tbody').empty();
                var trHTML = '';
                $.each(data, function (i, item) {
                    if (data[i].attendeeUserId == UId) {
                        var fab = '<i class="bx bxs-star">';
                        var toltip = 'Remove from your favorite';
                    }
                    else {
                        var fab = '<i class="bx bx-star">';
                        var toltip = 'Add to Favorite';
                    }
                    $("#spannoofdata").html(data[0].noOfData);
                    $("#spdata").html("Records found: ");
                    trHTML += '<tr class="odd list-group-item justify-content-between ocr-list-group">'
                        + '<td><div class="sm-card-title"><a data-toggle="tooltip" class="action-inline" data-placement="bottom" title="' + data[i].courseName + '" href="' + ClientURL + '/Attendee/EnrollCourses/EnrollCourseDetails?SID=' + data[i].courseId + '&bt=' + data[i].batchName + '" >' + data[i].courseName + ' ' + "<span class='topic-font'>(" + '' + data[i].topics + '' + ")</span>" + ' </a></div>'
                        + '<div class="enroll-course-show"><span onclick="AddShowFavorite(' + data[i].courseId + ',' + "'" + '' + data[i].batchName + '' + "'" + ')" class="add-to-favorite" data - toggle="tooltip" data - placement="bottom" title = "' + toltip+'">' + fab + '</i></span></div>'
                        + '<span class="sm-host-name"><i class="bx bxs-face"></i>' + data[i].uname + '</span>'
                        + '<p class="card-text sm-cli-text v-ellipsis">' + data[i].courseDesc + '</p>'
                        + '<div class="sm-bottom-info">'
                        + '<span class="sm-host-name"> <i class="bx bx-task"></i>' + data[i].batchName + '</span> '
                        + '<span class="sm-date"> <i class="bx bx-calendar"></i>' + dateFormat(data[i].startDate, 'dd-mmm-yy') + ' To ' + dateFormat(data[i].endDate, 'dd-mmm-yy') + '</span>'
                        + '<span class="sm-time"> <i class="bx bx-time"></i>' + data[i].duration + ' Days</span></div></td>'
                        + '</tr>';
                });
                $('#tblCourses').append(trHTML);
                var table = $('#tblCourses').DataTable(
                    {
                        "bSort": false,
                        //"bPaginate": false,
                        //"bFilter": false,
                        //"bInfo": false,
                        "lengthMenu": [[5, 10, 50, -1], [5, 10, 50, "All"]],
                        "pageLength": 5
                    }
                );
                $('#searchlist').keyup(function () {
                    table.search(this.value).draw();
                });
                $('.clear-datatable').click(function () {
                    table.search($('#searchlist').val()).draw();
                });
                $('.action-inline').tooltip();
                $('.add-to-favorite').tooltip();
            },

            error: function (msg) {
                //alert(msg.responseText);
            }
        });
}
$('#btnSearch').click(function () {
    if (ValidateForm()) {
        if (BindList()) {
            return false;
        }
        else {
            return true;
        }
    }
    $("#advanceSearchArea").hide();
});
function ValidateForm() {
    if (!IsSpecialCharacter1stPalce('txtCourse')) {
        return false;
    }
    else if (!IsWhiteSpace1stPalce('txtCourse')) {
        return false;
    }
    else if (!IsWhiteSpace1stPalce('txtHost')) {
        return false;
    }
    else if (!IsSpecialCharacter1stPalce('txtHost')) {
        return false;
    }
    else if (!CompareNumberRange('txtMinPrice', 'txtMaxPrice', 'Min Price', 'Max Price')) {
        return false;
    }
    else {
        return true;
    } 
} 
//Clear Filter
$("#clearfilter").click(function () {
    $("#advanceSearchArea :input").val("");
    BindList();
});
function AddShowInterest(CID, Batch) {
    alert("int");
    var UId = localStorage.getItem("userID");
    var usersParam = JSON.stringify({
        ACTIONCODE: 'A',
        UserId: parseInt(UId),
        CourseId: parseInt(CID),
        BatchName: Batch

    });
    $.ajax(
        {
            url: ServiceURL + "/api/AttendeeEnrolcourses/ShowInterest",
            type: "POST",
            data: usersParam,
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                if (data == "1") {
                    BootStrapRedirect('Show Interest.', '/Attendee/EnrollCourses/EnrollCourse');
                }
                else if (data == "3") {
                    BootstrapAlert('Data Alreday Exist.');
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
function AddShowFavorite(CID, Batch) {
    var UId = localStorage.getItem("userID");
    var usersParam = JSON.stringify({
        ACTIONCODE: 'A',
        UserId: parseInt(UId),
        CourseId: parseInt(CID),
        BatchName: Batch

    });
    $.ajax(
        {
            url: ServiceURL + "/api/AttendeeEnrolcourses/AddtoFavorite",
            type: "POST",
            data: usersParam,
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                if (data.retOut == "1") {
                    BindList();
                    //window.location.href = '/Attendee/EnrollCourses/EnrollCourse';
                }
                else if (data.retOut == "3") {
                    BindList();
                    //window.location.href = '/Attendee/EnrollCourses/EnrollCourse';
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