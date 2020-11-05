$(document).ready(function () {
    getallReScheduling();
})
function getallReScheduling() {
    jQuery.support.cors = true;
    var UId = localStorage.getItem("userID");
    var usersParam = JSON.stringify({
        UserId: parseInt(UId),
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
                var cancel = '';
                $.each(data, function (i, item) {

                    if (data[i].status == 0) {
                       // cancel = '<div class="text-red">Cancelled</div>';
                        cancel = '<div class="action-inline" data-toggle="tooltip" data-placement="top" title="View"><a href="javascript:void(0);" onclick="chedularView(' + data[i].schedularId + ')" class="form-control table-cancel" data-toggle="modal" data-target="#ModalViewDetails"><i class="bx bx-x"></i></a></div>';
                    }
                    else if (data[i].status == 1) {
                        cancel = '<div class="action-inline" data-toggle="tooltip" data-placement="top" title="Rescheduling">  <a href="javascript:void(0);" onclick="getcourseidd(' + data[i].schedularId + ')"  class="form-control table-edit" ><i class="bx bx bx-reset"></i></a> </div>' 
                            + '<div class="action-inline" data-toggle="tooltip" data-placement="top" title="View"><a href="javascript:void(0);" onclick="chedularView(' + data[i].schedularId + ')" class="form-control table-view" data-toggle="modal" data-target="#ModalViewDetails"> <i class="fa fa-fw fa-eye"></i></a></div>'
                            +'<div class="action-inline" data-toggle="tooltip" data-placement="top" title = "Cancel"> <a href="javascript:void(0);" onclick="getschedularId(' + data[i].schedularId + ')" class="form-control table-cancel" data-toggle="modal" data-target="#ConCancelModal"><i class="bx bx-trash"></i></a></div> ';
                    }

                    trHTML += '<tr  class=""><td>' + (i + 1) + '</td><td>' + data[i].courseName + '</td><td>' + dateFormat(data[i].scheduleDate, 'dd-mmm-yy') + '</td><td>' + timeConvert(data[i].startTime) + '</td><td>' + timeConvert(data[i].endTime) + '</td> <td>' + data[i].batchName + '</td><td> ' + cancel + ' </td> </tr>';

                });
                $('#dataTable').append(trHTML);
                $('.action-inline').tooltip();
                $('#dataTable').DataTable({
                    'columnDefs': [{
                        'targets': [6],
                        'orderable': false,
                    }],
                });
            },
            error: function (msg) {
                alert(msg.responseText);
            }
        });
}
$('#btnCancel').click(function () {
    $("#reschedulingModal").modal("hide");
    $("#CancelModal").modal("hide");
});
$('#btnRCancel').click(function () {
    $("#reschedulingModal").modal("hide");
    $("#CancelModal").modal("hide");
});
function getcourseidd(CID) {
    function Update() {
        $("#reschedulingModal").modal("show");
        $("#btnUpdate").show();
        $("#hfSchedularId").val(CID);
        var usersParam1 = JSON.stringify({
            ACTIONCODE: 'G',
            SchedularId: CID,
        });

        $.ajax(
            {
                type: "GET",
                url: ServiceURL + "/api/HostRescheduling/GetSchedular",
                data: JSON.parse(usersParam1),
                dataType: "json",
                contentType: "application/json",
                success: function (data) {
                    $("#existingdate").html(dateFormat(data[0].scheduleDate, 'dd-mmm-yy'));
                    $("#inputCourses").val(data[0].courseId);
                    $("#SccDate").val(data[0].scheduleDate);
                    $("#ScDate").val(dateFormat(data[0].scheduleDate, 'dd-mmm-yy'));
                    $("#StartTime").val(data[0].startTime);
                    $("#Duration").val(data[0].duration);
                    $("#hfEndTime").val(data[0].endTime)
                    $("#BatchNameOnce").val(data[0].batchName);
                    
                    $("#BatchNameOnce").focus();
                },
                error: function (msg) {

                    alert(msg.responseText);
                }
            });
    }
    if (BootStrapSubmit('btnRSUpdate', 'Are You Sure To Reschedule ?', 'Are You Sure To Update ?', Update)) {
        return false;
    }
    else {
        return true;
    }
}

// for update
$('#btnRSUpdate').click(function () {
    function CallSave() {

            var duration = $("#Duration").val();
            var timestr = $("#StartTime").val();
            var now = new Date('1900-01-01 ' + timestr + ':00');
            var endtime = new Date(now.getTime() + parseInt(duration) * 60000);

        var UId = localStorage.getItem("userID");
        var usersParam;
        usersParam = JSON.stringify({
            ACTIONCODE: 'A',
            UserId: parseInt(UId),
            UpdatedById: parseInt(UId),
            SchedularId: parseInt($('#hfSchedularId').val(), 10),
            CourseId: parseInt($('#inputCourses').val(), 10),
            ScheduleDate: dateFormat($('#SccDate').val(), 'yyyy-mm-dd'),
            StartTime: $('#StartTime').val(),
            EndTime: endtime.toTimeString().split(' ')[0].toString('hh:mm'),
            Duration: $('#Duration').val(),
            BatchName: $('#BatchNameOnce').val(),
            Remarks: $('#Remarks').val(),
        })
        $.ajax({
            url: ServiceURL + "/api/HostRescheduling/UpdateSchedular",
            type: "POST",
            data: usersParam,
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                $('#dataTable tbody').empty();
                if (data == "1") {
                    $("#reschedulingModal").modal("hide");
                    clearinput();
                    BootStrapRedirect(' Rescheduled Successfully.', '/Hosts/Rescheduling/Rescheduling');

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
        if (BootStrapSubmit('btnRSUpdate', 'Are You Sure To Reschedule ?', 'Are You Sure To Update ?', CallSave)) {
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
function chedularView(HSID) {
    $("#uhfSchedularId").val(HSID);
    var usersParam1 = JSON.stringify({
        ACTIONCODE: 'G',
        SchedularId: parseInt(HSID),
    });
    $.ajax(
        {
            type: "GET",
            url: ServiceURL + "/api/HostSchedular/GetSchedular",
            data: JSON.parse(usersParam1),
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                $("#vcname").html(data[0].courseName);
                $("#vScdate").html(dateFormat(data[0].scheduleDate, 'dd-mmm-yy'));
                $("#vstartTime").html(timeConvert(data[0].startTime));
                $("#vendTime").html(timeConvert(data[0].endTime))
            },
            error: function (msg) {

                alert(msg.responseText);
            }
        });
}
$('#btcancel').click(function () {
    function CallSave() {
        var UId = localStorage.getItem("userID");
        var usersParam;
        usersParam = JSON.stringify({
            ACTIONCODE: 'C',
            UserId: parseInt(UId),
            UpdatedById: parseInt(UId),
            SchedularId: parseInt($('#hfSchedularId').val()),
            Remarks: $('#cancelReason').val(),
        })
        $.ajax({
            url: ServiceURL + "/api/HostRescheduling/CancelSchedular",
            type: "POST",
            data: usersParam,
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                clearinput();
                $('#dataTable tbody').empty();
                if (data == "1") {
                    BootStrapRedirect(' Canceled Successfully.', '/Hosts/Rescheduling/Rescheduling');
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
        if (BootStrapSubmit('btnCancel', 'Are You Sure To Cancel ?', 'Are You Sure To Update ?', CallSave)) {
            return false;
        }
        else {
            return true;
        }
    }
});








