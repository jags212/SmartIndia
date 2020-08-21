$('#btnSubmit').click(function () {
    function CallSave() {
        var usersParam = JSON.stringify({
            ACTIONCODE: 'A',
            CourseName: $('#txtName').val(),
            CourseDesc: $('#txtDesc').val(),
            Topics: $('#txtTopics').val(),
            StartDate: $('#fdate').val(),
            EndDate: $('#edate').val(),

            Duration: parseInt($('#durationDate').val(), 10),
            Cost: parseFloat($('#txtCost').val()),
            ClassFrequency: $('#ddlFrequency').val(),
            NoOfClass: parseInt($('#txtNoOfClass').val(), 10)

        });
        $.ajax({
            url: ServiceURL + "/api/HostCourses/AddCourse",
            type: "POST",
            data: usersParam,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                clearinput();
                $('#dataTable tbody').empty();
                getallcourses();
                if (data == "1") {
                    BootstrapAlert('Course Save Successfully.');
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
        });
    }
    if (ValidateForm()) {
        if (BootStrapSubmit('btnSignUp', 'Are You Sure To Submit ?', 'Are You Sure To Update ?', CallSave)) {
            return false;
        }
        else {
            return true;
        }
    }
});

function clearinput() {
    $('#txtName').val("");
    $('#txtDesc').val("");
    $('#txtTopics').val("");
    $('#sdatepicker').val("");
    $('#edatepicker').val("");
    $('#durationDate').val("");
    $('#txtCost').val("");
    $('#ddlFrequency').val(0);
    $('#txtNoOfClass').val("");
}


$(document).ready(function () {
    getallcourses();
})
function getallcourses() {
    $("#btnSubmit").show();
    $("#btnUpdate").hide();
    jQuery.support.cors = true;
    //var UserId = localStorage.getItem("UserId");
    var UId = 1;
    var usersParam = JSON.stringify({
        UserId: UId,
        ACTIONCODE: "B"
    });
    $.ajax(
        {

            type: "GET",
           // url: "https://localhost:44394/api/HostCourses/GetHostCourse",
            url: ServiceURL + "/api/HostCourses/GetHostCourse",
            data: JSON.parse(usersParam),
            dataType: "json",
            contentType: "application/json",
            success: function (data) {

                var trHTML = '';

                $.each(data, function (i, item) {

                    // trHTML += '<tr  class=""><td>' + (i + 1) + '</td><td>' + data[i].courseName + '</td><td>' + data[i].courseDesc + '</td><td>' + data[i].topics + '</td><td>' + dateFormat(data[i].startDate, 'dd-mmm-yyyy') + '</td><td>' + dateFormat(data[i].endDate, 'dd-mmm-yyyy') + '</td><td>' + data[i].duration + '</td><td>' + data[i].cost + '</td><td>' + data[i].classFrequency + '</td><td>' + data[i].noOfClass + '</td> <td> <div class="action-inline" data-toggle="tooltip" data-placement="top" title="Edit"> <a href="javascript:void(0);" onclick="getcourseidd(' + data[i].courseId + ')"  class="form-control table-edit "><i class="bx bx-edit-alt"></i></a> </div>     <div class="action-inline" data-toggle="tooltip" data-placement="top" title="View">  <a href="javascript:void(0);" onclick="getcoursedetails(' + data[i].courseId + ')" class="form-control table-view" data-toggle="modal" data-target="#ViewDetailsModal"><i class="fa fa-fw fa-eye"></i></a> </div>  </td> </tr>';
                    trHTML += '<tr  class=""><td>' + (i + 1) + '</td><td>' + data[i].courseName + '</td><td>' + data[i].courseDesc + '</td><td>' + data[i].topics + '</td><td>' + dateFormat(data[i].startDate, 'dd-mmm-yyyy') + '</td><td>' + dateFormat(data[i].endDate, 'dd-mmm-yyyy') + '</td><td>' + data[i].duration + '</td> <td> <div class="action-inline" data-toggle="tooltip" data-placement="top" title="Edit"> <a href="javascript:void(0);" onclick="getcourseidd(' + data[i].courseId + ')"  class="form-control table-edit "><i class="bx bx-edit-alt"></i></a> </div>     <div class="action-inline" data-toggle="tooltip" data-placement="top" title="View">  <a href="javascript:void(0);" onclick="getcoursedetails(' + data[i].courseId + ')" class="form-control table-view" data-toggle="modal" data-target="#ViewDetailsModal"><i class="fa fa-fw fa-eye"></i></a> </div>  </td> </tr>';

                });

                $('#dataTable').append(trHTML);

            },

            error: function (msg) {

                alert(msg.responseText);
            }
        });
}
function getcourseidd(CID) {
    function Update() {
        $("#btnSubmit").hide();
        $("#btnUpdate").show();
        $("#CourseId").val(CID);
        var usersParam1 = JSON.stringify({
            ACTIONCODE: 'U',
            UserId: CID,
        });

        $.ajax(
            {

                type: "GET",
                //url: "https://localhost:44394/api/HostCourses/GetHostCourse",
                url: ServiceURL + "/api/HostCourses/GetHostCourse",
                data: JSON.parse(usersParam1),
                dataType: "json",
                contentType: "application/json",
                success: function (data) {
                    $("#txtName").val(data[0].courseName);
                    $("#txtDesc").val(data[0].courseDesc);
                    $("#txtTopics").val(data[0].topics);
                    $("#sdatepicker").val(dateFormat(data[0].startDate, 'dd-mmm-yyyy'));
                    $("#edatepicker").val(dateFormat(data[0].endDate, 'dd-mmm-yyyy'));
                    $("#durationDate").val(data[0].duration);
                    $("#fdate").val(data[0].startDate);
                    $("#edate").val(data[0].endDate);

                    $("#txtCost").val(data[0].cost);
                    $("#ddlFrequency").val(data[0].classFrequency);
                    $("#txtNoOfClass").val(data[0].noOfClass);
                    $("#txtName").focus();
                },
                error: function (msg) {

                    alert(msg.responseText);
                }
            });
    }
    if (BootStrapSubmit('btnUpdate', 'Are You Sure To Edit ?', 'Are You Sure To Update ?', Update)) {
        return false;
    }
    else {
        return true;
    }
}

function getcoursedetails(CID) {

    var usersParam2 = JSON.stringify({
        ACTIONCODE: 'U',
        UserId: CID,
    });
    $.ajax(
        {
            type: "GET",
           // url: "https://localhost:44394/api/HostCourses/GetHostCourses",
            url: ServiceURL + "/api/HostCourses/GetHostCourse",
            data: JSON.parse(usersParam2),
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                $("#cname").html(data[0].courseName);
                $("#cdesc").html(data[0].courseDesc);
                $("#topic").html(data[0].topics);
                $("#sdt").html(dateFormat(data[0].startDate, 'dd-mmm-yyyy'));
                $("#edt").html(dateFormat(data[0].endDate, 'dd-mmm-yyyy'));

                $("#duration").html(data[0].duration);
                $("#ccost").html(data[0].cost);
                $("#Cf").html(data[0].classFrequency);

                $("#noclass").html(data[0].noOfClass);
            },
            error: function (msg) {

                alert(msg.responseText);
            }
        });
}

//update 
$('#btnUpdate').click(function () {
    function CallUpdate() {
        var usersParam = JSON.stringify({
            ACTIONCODE: 'U',
            CourseId: parseInt($('#CourseId').val(), 10),
            CourseName: $('#txtName').val(),
            CourseDesc: $('#txtDesc').val(),
            Topics: $('#txtTopics').val(),
            StartDate: $('#fdate').val(),
            EndDate: $('#edate').val(),

            Duration: parseInt($('#durationDate').val(), 10),
            Cost: parseFloat($('#txtCost').val()),
            ClassFrequency: $('#ddlFrequency').val(),
            NoOfClass: parseInt($('#txtNoOfClass').val(), 10)

        });
        $.ajax({
           // url: "https://localhost:44394/api/HostCourses/AddCourse",
            url: ServiceURL + "/api/HostCourses/AddCourse",
            type: "POST",
            data: usersParam,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                clearinput();
                $('#dataTable tbody').empty();
                getallcourses();
                if (data == "2") {
                    BootstrapAlert('Course Update Successfully.');
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
        });
    }
    if (ValidateForm()) {
        if (BootStrapSubmit('btnUpdate', 'Are You Sure To Update ?', 'Are You Sure To Update ?', CallUpdate)) {
            return false;
        }

        else {
            return true;
        }
        $("#btnSubmit").show();
        $("#btnUpdate").hide();
    }
});
