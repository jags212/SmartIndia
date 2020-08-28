$(document).ready(function () {
    getallSchedular();
})
function getallSchedular() {
    jQuery.support.cors = true;
    //var UserId = localStorage.getItem("UserId");
    var UId = 6;
    var usersParam = JSON.stringify({
        UserId: UId,
        ACTIONCODE: "P"
    });
    $.ajax(
        {
            type: "GET",
            url: ServiceURL + "/api/HostRescheduling/Bindrescheduling",
            data: JSON.parse(usersParam),
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                var trHTML = '';
                $.each(data, function (i, item) {

                    trHTML += '<tr  class=""><td>' + (i + 1) + '</td><td>' + data[i].courseName + '</td><td>' + dateFormat(data[i].scheduleDate, 'dd-mmm-yyyy') + '</td><td>' + timeConvert(data[i].startTime) + '</td><td>' + timeConvert(data[i].endTime) + '</td> <td>' + data[i].batchName + '</td><td>     <div class="action-inline" data-toggle="tooltip" data-placement="top" title="Rescheduling">  <a href="javascript:void(0);" onclick="getcourseidd(' + data[i].schedularId + ')"  class="form-control table-edit" ><i class="bx bx-copy-alt"></i></a> </div>   <div class="action-inline" data-toggle="tooltip" data-placement="top" title="Cancel"><a href="javascript:void(0);"onclick="getschedularId(' + data[i].schedularId + ')" class="form-control table-cancel" data-toggle="modal" data-target="#ConCancelModal"><i class="bx bx-trash"></i></a></div> </td> </tr>';

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


            $("#rescheduling-section").css("display", "block");
            $("#rescheduling-section").focus();

        $("#btnUpdate").show();
        $("#hfSchedularId").val(CID);
        var usersParam1 = JSON.stringify({
            ACTIONCODE: 'G',
            SchedularId: CID,
        });

        $.ajax(
            {

                type: "GET",
                //url: "https://localhost:44394/api/HostCourses/GetHostCourse",
                url: ServiceURL + "/api/HostRescheduling/UpdateSchedular",
                data: JSON.parse(usersParam1),
                dataType: "json",
                contentType: "application/json",
                success: function (data) {
                    $("#existingdate").html(dateFormat(data[0].scheduleDate, 'dd-mmm-yyyy'));
                    $("#inputCourses").val(data[0].courseId);
                    $("#SccDate").val(data[0].scheduleDate);
                    $("#ScDate").val(dateFormat(data[0].scheduleDate, 'dd-mmm-yyyy'));
                    $("#StartTime").val(data[0].startTime);
                    $("#Duration").val(data[0].duration);
                    $("#hfEndTime").val(data[0].endTime)
                    $("#BatchNameOnce").val(data[0].batchName);
                    
                    $("#inputCourses").focus();
                },
                error: function (msg) {

                    alert(msg.responseText);
                }
            });
    }
    if (BootStrapSubmit('btnRSUpdate', 'Are You Sure To Edit ?', 'Are You Sure To Update ?', Update)) {
        return false;
    }
    else {
        return true;
    }
}

// for update
$('#btnRSUpdate').click(function () {
    function CallSave() {
        var UId = 6;
        var usersParam;
        usersParam = JSON.stringify({
            ACTIONCODE: 'A',
            UserId: UId,
            UpdatedById: UId,
            SchedularId: parseInt($('#hfSchedularId').val(), 10),
            CourseId: parseInt($('#inputCourses').val(), 10),
            ScheduleDate: dateFormat($('#SccDate').val(), 'yyyy-mm-dd'),
            StartTime: $('#StartTime').val(),
            EndTime: $('#hfEndTime').val(),
            Duration: $('#Duration').val(),
            BatchName: $('#BatchNameOnce').val(),
            Remarks: $('#Remarks').val(),

        })
        $.ajax({
            url: ServiceURL + "/api/HostRescheduling/UpdateSchedular",
            type: "POST",
            data: usersParam,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                clearinput();
                $('#dataTable tbody').empty();
                getallSchedular();
                if (data == "1") {
                    BootstrapAlert('Save Successfully.');
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
    if (ValidateSchedulingForm()) {
        if (BootStrapSubmit('btnRSUpdate', 'Are You Sure To Submit ?', 'Are You Sure To Update ?', CallSave)) {
            return false;
        }
        else {
            return true;
        }
    }
});

function clearinput() {
    $('#ScDate').val("");
    $('#inputCourses').val(0);
    $('#StartTime').val(0);
    $('#EndTime').val(0);
    $('#BatchNameOnce').val("");
    $('#cancelReason').val("");

    $("#rescheduling-section").css("display", "none");
    $("#CancelModal").modal("hide");
}
$('#btnCancel').click(function () {
    $("#rescheduling-section").css("display", "none");
});

function getschedularId(CID) {
    function Confirm() {


        $("#CancelModal").modal("show");

        $("#hfSchedularId").val(CID);
    }
    if (BootStrapSubmit('btnCancel', 'Are You Sure To Cancel ?', 'Are You Sure To Cancel ?', Confirm)) {
        return false;
    }
    else {
        return true;
    }
}
$('#btcancel').click(function () {
    function CallSave() {
        var UId = 6;
        var usersParam;
        usersParam = JSON.stringify({
            ACTIONCODE: 'C',
            UserId: UId,
            UpdatedById: UId,
            SchedularId: parseInt($('#hfSchedularId').val()),
            Remarks: $('#cancelReason').val(),
        })
        $.ajax({
            url: ServiceURL + "/api/HostRescheduling/CancelSchedular",
            type: "POST",
            data: usersParam,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                clearinput();
                $('#dataTable tbody').empty();
                getallSchedular();
                if (data == "1") {
                    BootstrapAlert('Cancel Successfully.');
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
    if (ValidateReschedulingCancel()) {
        if (BootStrapSubmit('btnCancel', 'Are You Sure To Submit ?', 'Are You Sure To Update ?', CallSave)) {
            return false;
        }
        else {
            return true;
        }
    }
});








