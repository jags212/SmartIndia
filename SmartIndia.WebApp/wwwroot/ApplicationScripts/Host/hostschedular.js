﻿$('#btnSubmit').click(function () {
    var duration = $("#Duration").val();
    var timestr = $("#StartTime").val();
    var now = new Date('1900-01-01 ' + timestr + ':00');
    var endtime = new Date(now.getTime() + parseInt(duration) * 60000);
    var UId = localStorage.getItem("userID");
    var usersParam;
    if ($('input[type=radio][name=rbtOnce]:checked').val() == 'once') {
        function CallSave() {
            usersParam = JSON.stringify({
                ACTIONCODE: 'A',
                UserId: parseInt(UId),
                UpdatedById: parseInt(UId),
                CourseId: parseInt($('#inputCourses').val(), 10),
                ScheduleDate: dateFormat($('#hfonceDate').val(), 'yyyy-mm-dd'),
                StartTime: $('#StartTime').val(),
                EndTime: endtime.toTimeString().split(' ')[0].toString('hh:mm'),
                Duration: $('#Duration').val(),
                BatchName: $('#BatchNameOnce').val(),
            })
            $.ajax({
                url: ServiceURL + "/api/HostSchedular/AddSchedularOnce",
                type: "POST",
                data: usersParam,
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    $('#dataTable tbody').empty();
                    getallSchedular();
                    if (data == "1") {
                        BootstrapAlert('Saved Successfully.');
                        clearinput();
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
        if (ValidateSchedularForm()) {
            if (BootStrapSubmit('btnSubmit', 'Are You Sure To Submit ?', 'Are You Sure To Update ?', CallSave)) {
                return false;
            }
            else {
                return true;
            }
        }
    }
    else if ($('input[type=radio][name=rbtOnce]:checked').val() == 'recurring') {
        function CallSaveRc() {
            if ($('#ddlrecurringschedule').val() == 'Daily') {

                var start = $("#SccDate").val(),
                    end = $("#SccTo").val(),
                    currentDate = new Date(start),
                    between = [];

                while (currentDate <= new Date(end)) {
                    between.push(new Date(currentDate));
                    currentDate.setDate(currentDate.getDate() + 1);
                }
                var schedularArray = new Array();
                $.each(between, function (i) {
                    var schedularParam = {};
                    schedularParam.ACTIONCODE = 'A',
                        schedularParam.UserId = parseInt(UId),
                        schedularParam.UpdatedById = parseInt(UId),
                        schedularParam.CourseId = parseInt($('#inputCourses').val(), 10),
                        schedularParam.ScheduleDate = dateFormat(between[i], 'yyyy-mm-dd'),
                        schedularParam.StartTime = $('#StartTime').val(),
                        schedularParam.EndTime = endtime.toTimeString().split(' ')[0].toString('hh:mm'),
                        schedularParam.Duration = $('#Duration').val(),
                        schedularParam.BatchName = $('#BatchNameOnce').val(),
                        schedularArray.push(schedularParam);
                });
                $.ajax({
                    url: ServiceURL + "/api/HostSchedular/AddSchedular",
                    type: "POST",
                    data: JSON.stringify(schedularArray),
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    success: function (data) {
                        usersParam = null;
                        $('#dataTable tbody').empty();
                        getallSchedular();
                        if (data == "1") {
                            BootstrapAlert('Saved Successfully.');
                            clearinput();
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
        }
        if (ValidateSchedularFormRc()) {
            if (BootStrapSubmit('btnSubmit', 'Are You Sure To Submit ?', 'Are You Sure To Update ?', CallSaveRc)) {
                return false;
            }
            else {
                return true;
            }
        }
    }
});


function clearinput() {
    $('#ScDate').val("");
    $('#inputCourses').val(0);
    $('#ddlrecurringschedule').val(0);
    $('#StartTime').val(0);
    $('#EndTime').val(0);
    $('#BatchNameOnce').val("");
    $('#ddlDayofweek').val(0);
    $('#ddlDateofMonth').val(0);
    $('#datepickerFrom').val("");
    $('#datepickerTo').val("");
    $('#ddlyearfrom').val(0);
    $('#ddlmonthfrom').val(0);
    $('#ddlyesrto').val(0);
    $('#ddlmonthto').val(0);
    $('#Duration').val(0);

    $('#uinputCourses').val(0);
    $('#uStartTime').val(0);
    $('#uDuration').val(0);
    $('#uBatchNameOnce').val("");
    $('#uRemarks').val("");
    $('#uDuration').val(0);
}
//------------------------------------- get host schedular-----------------------------------------
$(document).ready(function () {
    getallSchedular();
})
function getallSchedular() {
    $("#btnSubmit").show();
    $("#btnUpdate").hide();
    jQuery.support.cors = true;
    var UId = localStorage.getItem("userID");
    var usersParam = JSON.stringify({
        UserId: parseInt(UId),
        ACTIONCODE: "B"
    });
    $.ajax(
        {
            type: "GET",
            url: ServiceURL + "/api/HostSchedular/BindSchedular",
            data: JSON.parse(usersParam),
            dataType: "json",
            contentType: "application/json",
            success: function (data) {

                var trHTML = '';
                var publish = '';
                $.each(data, function (i, item) {
                    if (data[i].isPublished == 0) {
                        publish = '<a href="javascript: void (0); " class="form-control table-publish">Publish</a>';
                    }
                    else if (data[i].isPublished == 1) {
                        publish = '<a href="javascript: void (0); " class="form-control publish-active">Published</a>';
                    }

                    trHTML += '<tr  class=""><td>' + (i + 1) + '</td><td>' + data[i].courseName + '</td><td>' + dateFormat(data[i].startScheduleDate, 'dd-mmm-yyyy') + '</td><td>' + dateFormat(data[i].endScheduleDate, 'dd-mmm-yyyy') + '</td><td>' + timeConvert(data[i].startTime) + '</td><td>' + timeConvert(data[i].endTime) + '</td><td>' + data[i].duration + '</td><td>' + data[i].batchName + '</td> <td>      <div class="action-inline" data-toggle="tooltip" data-placement="right" title="View">  <a href="javascript:void(0);" onclick="getSchedulardetails(' + data[i].courseId + ',' + "'" + dateFormat(data[i].startScheduleDate, 'mm-dd-yyyy') + "'" + ',' + "'" + dateFormat(data[i].endScheduleDate, 'mm-dd-yyyy') + "'" + ',' + "'" + data[i].startTime + "'" + ',' + "'" + data[i].endTime + "'" + ',' + "'" + data[i].isPublished + "'" + ')" class="form-control table-view" data-toggle="modal" data-target="#ViewDetailsModal"><i class="fa fa-fw fa-eye"></i></a> </div>  </td> <td id="buPublish">' + publish + '</td> </tr>';
                });
                $('#dataTable').append(trHTML);
                $('.action-inline').tooltip();
            },
            error: function (msg) {
                alert(msg.responseText);
            }
        });
}

function getcourseidd(HSID) {
    function Update() {

        $("#reschedulingModal").modal("show");
        $("#ViewDetailsModal").modal("hide");
        $("#divremark").hide();
       // $("#btnUpdate").show();
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
                    $("#uexistingdate").html(dateFormat(data[0].scheduleDate, 'dd-mmm-yyyy'));
                    $("#uinputCourses").val(data[0].courseId);
                    $("#uSccDate").val(data[0].scheduleDate);
                    $("#uScDate").val(dateFormat(data[0].scheduleDate, 'dd-mmm-yyyy'));
                    $("#uStartTime").val(data[0].startTime);
                    $("#uDuration").val(data[0].duration);
                    $("#uhfEndTime").val(data[0].endTime)
                    $("#uBatchNameOnce").val(data[0].batchName);

                    $("#uBatchNameOnce").focus();
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

        var duration = $("#uDuration").val();
        var timestr = $("#uStartTime").val();
        var now = new Date('1900-01-01 ' + timestr + ':00');
        var endtime = new Date(now.getTime() + parseInt(duration) * 60000);

        var UId = localStorage.getItem("userID");
        var usersParam;
        usersParam = JSON.stringify({
            ACTIONCODE: 'U',
            UserId: parseInt(UId),
            UpdatedById: parseInt(UId),
            SchedularId: parseInt($('#uhfSchedularId').val(), 10),
            CourseId: parseInt($('#uinputCourses').val(), 10),
            ScheduleDate: dateFormat($('#uSccDate').val(), 'yyyy-mm-dd'),
            StartTime: $('#uStartTime').val(),
            EndTime: endtime.toTimeString().split(' ')[0].toString('hh:mm'),
            Duration: $('#uDuration').val(),
            BatchName: $('#uBatchNameOnce').val(),
            Remarks: $('#uRemarks').val(),
        })
        $.ajax({
            url: ServiceURL + "/api/HostSchedular/UpdateSchedular",
            //url: ServiceURL + "/api/HostSchedular/AddSchedular",
            type: "POST",
            data: usersParam,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                $('#dataTable tbody').empty();
                getallSchedular();
                if (data == "2") {
                    $("#reschedulingModal").modal("hide");
                    clearinput();
                    BootstrapAlert('Updated Successfully.');
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
    if (ValidateUpdateSchedulingForm()) {
        if (BootStrapSubmit('btnRSUpdate', 'Are You Sure To Reschedule ?', 'Are You Sure To Update ?', CallSave)) {
            return false;
        }
        else {
            return true;
        }
    }
});
$('#btnCancel').click(function () {
    $("#reschedulingModal").modal("hide");
});

function getSchedulardetails(CID, sdate, edate, stime, etime, isPub) {
    $("#hfCourseId").val(CID);
    $("#hfSdate").val(dateFormat(sdate, "yyyy-mm-dd"));
    $("#hfEdate").val(dateFormat(edate, "yyyy-mm-dd"));
    $("#StartTime").val(stime);
    $("#hfEndTime").val(etime);
    
    var UId = localStorage.getItem("userID");
    var usersParam2 = JSON.stringify({
        ACTIONCODE: 'U',
        UserId: parseInt(UId),
        CourseId: CID,
        StartScheduleDate: sdate,
        EndScheduleDate: edate,
        StartTime: stime,
        EndTime: etime

    });
    $.ajax(
        {
            type: "GET",
            url: ServiceURL + "/api/HostSchedular/GetHostSchedular",
            data: JSON.parse(usersParam2),
            dataType: "json",
            contentType: "application/json",
            success: function (data) {

                $('#tblDetails tbody').empty();
                var trHTML = '';
                $.each(data, function (i, item) {

                    if (isPub == "0") {
                        publish = ' <div class="action-inline" data-toggle="tooltip" data-placement="top" title="Edit"> <a  id= "scId" href="javascript:void(0);" onclick="getcourseidd(' + data[i].schedularId + ')"  class="form-control table-edit "><i class="bx bx-edit-alt"></i></a> </div>  ';
                    }
                    else if (isPub == "1") {
                        publish = '<div class="text-red">###</div>';
                    }
                    trHTML += '<tr  class=""><td>' + (i + 1) + '</td><td>' + data[i].courseName + '</td><td>' + dateFormat(data[i].scheduleDate, 'dd-mmm-yyyy') + '</td><td>' + timeConvert(data[i].startTime) + '</td><td>' + timeConvert(data[i].endTime) + '</td><td>' + data[i].duration + '</td><td>' + data[i].batchName + '</td> <td> ' + publish + ' </td>  </tr>';
                });
                $('#tblDetails').append(trHTML);
                if (isPub == "0") {
                    $("#btnPublish").show();
                }
                else {
                   
                    $("#btnPublish").hide();

                }
            },
            error: function (msg) {
                alert(msg.responseText);
            }
        }
    );
   
}

$('#btnPublish').click(function () {
    function CallSave() {
        var usersParam;
        usersParam = JSON.stringify({
            ACTIONCODE: 'P',
            CourseId: parseInt($('#hfCourseId').val()),
            StartScheduleDate: $('#hfSdate').val(),
            EndScheduleDate: $('#hfEdate').val(),
            StartTime: $("#StartTime").val(),
            EndTime: $("#hfEndTime").val()
        })
        $.ajax({
            url: ServiceURL + "/api/HostSchedular/Publish",
            type: "POST",
            data: usersParam,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                if (data == "5") {

                    BootStrapRedirect('Published Successfully.', '/Hosts/Schedular/schedular');

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

    if (BootStrapSubmit('btnPublish', 'Are You Sure To Publish ?', 'Are You Sure To Update ?', CallSave)) {
        return false;
    }
    else {
        return true;
    }

});

