

$('#btnSubmit').click(function () {


    var duration = $("#Duration").val();
    var timestr = $("#StartTime").val();
    var now = new Date('1900-01-01 ' + timestr + ':00');
    var endtime = new Date(now.getTime() + parseInt(duration) * 60000);
    var UId = localStorage.getItem("userID");
    var usersParam;


    var Id = $('.schedule-type-active').attr("id");

    if (Id == 'rbtonce') {
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
                DeviceResources: 1,
            })
            $.ajax({
                url: ServiceURL + "/api/HostSchedular/AddSchedularOnce",
                type: "POST",
                data: usersParam,
                dataType: "json",
                contentType: "application/json",
                success: function (data) {
                    $('#dataTable tbody').empty();
                    if (data.retOut == "1") {
                        BootStrapRedirect(' Saved Successfully.', '/Hosts/Schedular/Schedular');
                        clearinput();
                    }
                    else if (data.retOut == "3") {
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
    else if (Id == 'rbtrecurring') {
        ValidateSchedularFormRcC();
        if ($('#ddlrecurringschedule').val() == 'Daily') {
            function CallSaveRc() {
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
                        schedularParam.DeviceResources = 1,
                        schedularArray.push(schedularParam);
                });
                $.ajax({
                    url: ServiceURL + "/api/HostSchedular/AddSchedular",
                    type: "POST",
                    data: JSON.stringify(schedularArray),
                    dataType: "json",
                    contentType: "application/json",
                    success: function (data) {
                        usersParam = null;
                        $('#dataTable tbody').empty();
                        if (data.retOut == "1") {
                            BootStrapRedirect(' Saved Successfully.', '/Hosts/Schedular/Schedular');
                            clearinput();
                        }
                        else if (data.retOut == "3") {
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
            if (ValidateSchedularFormRc()) {
                if (BootStrapSubmit('btnSubmit', 'Are You Sure To Submit ?', 'Are You Sure To Update ?', CallSaveRc)) {
                    return false;
                }
                else {
                    return true;
                }
            }
        }
        var startdate = $("#SccDate").val(),
            enddate = $("#SccTo").val();
        // weekly start
        if ($('#ddlrecurringschedule').val() == 'Weekly') {
            function CallSaveRc() {
                var days = "";
                $(".selected-items span").each(function () {
                    days += $(this).attr("data-item") + ",";
                });
                var array = days.split(",");
                var result = [];
                $.each(array, function (i) {
                    if (array[i] == "undefined") {
                    }
                    else if (array[i] == "") {
                    }
                    else {
                        var dayName = array[i];
                        var days = { sun: 0, mon: 1, tue: 2, wed: 3, thu: 4, fri: 5, sat: 6 };
                        var day = days[dayName.toLowerCase().substr(0, 3)];
                        var current = new Date(moment(startdate));
                        current.setDate(current.getDate() + (day - current.getDay() + 7) % 7);
                        while (current < moment(enddate)) {
                            result.push(new Date(+current));
                            current.setDate(current.getDate() + 7);
                        }
                    }
                });
                //alert(result);
                var schedularArray = new Array();
                $.each(result, function (i) {
                    var schedularParam = {};
                    schedularParam.ACTIONCODE = 'A',
                        schedularParam.UserId = parseInt(UId),
                        schedularParam.UpdatedById = parseInt(UId),
                        schedularParam.CourseId = parseInt($('#inputCourses').val(), 10),
                        schedularParam.ScheduleDate = dateFormat(result[i], 'yyyy-mm-dd'),
                        schedularParam.StartTime = $('#StartTime').val(),
                        schedularParam.EndTime = endtime.toTimeString().split(' ')[0].toString('hh:mm'),
                        schedularParam.Duration = $('#Duration').val(),
                        schedularParam.BatchName = $('#BatchNameOnce').val(),
                        schedularParam.DeviceResources = 1,
                        schedularArray.push(schedularParam);
                });
                $.ajax({
                    url: ServiceURL + "/api/HostSchedular/AddSchedular",
                    type: "POST",
                    data: JSON.stringify(schedularArray),
                    dataType: "json",
                    contentType: "application/json",
                    success: function (data) {
                        usersParam = null;
                        $('#dataTable tbody').empty();
                        if (data.retOut == "1") {
                            BootStrapRedirect(' Saved Successfully.', '/Hosts/Schedular/Schedular');
                            clearinput();
                        }
                        else if (data.retOut == "3") {
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
            if (ValidateSchedularFormRcweek()) {
                if (BootStrapSubmit('btnSubmit', 'Are You Sure To Submit ?', 'Are You Sure To Update ?', CallSaveRc)) {
                    return false;
                }
                else {
                    return true;
                }
            }
        }
        // weekly end
        //Monthly Start
        if ($('#ddlrecurringschedule').val() == 'Monthly') {
            function CallSaveRc() {
                var startDate = parseInt($('#ddlyearfrom').val()) + "-" + parseInt($('#ddlmonthfrom').val()) + "-" + "01";
                var endDate = parseInt($('#ddlyesrto').val()) + "-" + parseInt($('#ddlmonthto').val()) + "-" + "31";
                var dates = [];
                var d0 = startDate.split('-');
                var d1 = endDate.split('-');
                for (
                    var y = d0[0];
                    y <= d1[0];
                    y++
                ) {
                    for (
                        var m = d0[1];
                        m <= 12;
                        m++
                    ) {
                        dates.push(y + "-" + m + "-1");
                        if (y >= d1[0] && m >= d1[1]) break;
                    };
                    d0[1] = 1;
                };

                var myString = dates.toString();
                var array = myString.split(",");
                var result = [];
                $.each(array, function (i) {
                    if (array[i] == "undefined") {
                    }
                    else if (array[i] == "") {
                    }
                    else {
                        var month = array[i].split('-');
                        var getmonth = parseInt(month[1]);
                        var Year = array[i].split('-');
                        var getyear = parseInt(Year[0]);
                        // get dates 
                        var days = "";
                        $("#dayOfMonthSection span").each(function () {
                            days += $(this).attr("data-val") + ",";
                        });
                        var array1 = days.split(",");
                        $.each(array1, function (i) {
                            if (array1[i] == "undefined") {
                            }
                            else if (array1[i] == "") {
                            }
                            else {
                                var dayName = array1[i];
                                var CreatedDate = getyear + "-" + getmonth + "-" + dayName;
                                result.push(new Date(CreatedDate));
                            }
                        });
                        // get dates end
                    }
                });
                //alert(result);
                var schedularArray = new Array();
                $.each(result, function (i) {
                    var schedularParam = {};
                    schedularParam.ACTIONCODE = 'A',
                        schedularParam.UserId = parseInt(UId),
                        schedularParam.UpdatedById = parseInt(UId),
                        schedularParam.CourseId = parseInt($('#inputCourses').val(), 10),
                        schedularParam.ScheduleDate = dateFormat(result[i], 'yyyy-mm-dd'),
                        schedularParam.StartTime = $('#StartTime').val(),
                        schedularParam.EndTime = endtime.toTimeString().split(' ')[0].toString('hh:mm'),
                        schedularParam.Duration = $('#Duration').val(),
                        schedularParam.BatchName = $('#BatchNameOnce').val(),
                        schedularParam.DeviceResources = 1,
                        schedularArray.push(schedularParam);
                });
                $.ajax({
                    url: ServiceURL + "/api/HostSchedular/AddSchedular",
                    type: "POST",
                    data: JSON.stringify(schedularArray),
                    dataType: "json",
                    contentType: "application/json",
                    success: function (data) {
                        usersParam = null;
                        $('#dataTable tbody').empty();
                        if (data.retOut == "1") {
                            BootStrapRedirect(' Saved Successfully.', '/Hosts/Schedular/Schedular');
                            clearinput();
                        }
                        else if (data.retOut == "3") {
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
            if (ValidateSchedularFormRcMonthly()) {
                if (BootStrapSubmit('btnSubmit', 'Are You Sure To Submit ?', 'Are You Sure To Update ?', CallSaveRc)) {
                    return false;
                }
                else {
                    return true;
                }
            }
        }

        //Monthly End
        //}

    }

});

$('#btnReset').click(function () {
    $("#btnSubmit").show();
    $("#btnUpdate").hide();
    $("#btnReset").text("Reset");
    clearinput();
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
    //$('#datepickerFrom').val("");
    //$('#datepickerTo').val("");
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



    const date = new Date();
    const formattedDate = date.toLocaleDateString('en-GB', {
        day: '2-digit', month: 'short', year: '2-digit'
    }).replace(/ /g, '-');
    $('#datepickerFrom').val(formattedDate);
    $('#datepickerTo').val(formattedDate);

    var d = new Date();
    var strDate = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
    $("#SccDate").val(strDate);
    $("#SccTo").val(strDate);
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
                        publish = '<div class="form-control table-publish">Not Published</div>';
                    }
                    else if (data[i].isPublished == 1) {
                        publish = '<div class="form-control publish-active">Published</div>';
                    }

                    trHTML += '<tr  class=""><td>' + (i + 1) + '</td><td>' + data[i].courseName + '</td><td>' + dateFormat(data[i].startScheduleDate, 'dd-mmm-yy') + '</td><td>' + dateFormat(data[i].endScheduleDate, 'dd-mmm-yy') + '</td><td>' + timeConvert(data[i].startTime) + '</td><td>' + timeConvert(data[i].endTime) + '</td><td>' + data[i].duration + '</td><td>' + data[i].batchName + '</td> <td>      <div class="action-inline" data-toggle="tooltip" data-placement="right" title="View">  <a href="javascript:void(0);" onclick="getSchedulardetails(' + data[i].courseId + ',' + "'" + dateFormat(data[i].startScheduleDate, 'mm-dd-yyyy') + "'" + ',' + "'" + dateFormat(data[i].endScheduleDate, 'mm-dd-yyyy') + "'" + ',' + "'" + data[i].startTime + "'" + ',' + "'" + data[i].endTime + "'" + ',' + "'" + data[i].isPublished + "'" + ')" class="form-control table-view" data-toggle="modal" data-target="#ViewDetailsModal"><i class="fa fa-fw fa-eye"></i></a> </div>  </td> <td id="buPublish" width="10%">' + publish + '</td> </tr>';
                });
                $('#tblSchedular').append(trHTML);
                $('.action-inline').tooltip();
                $('#tblSchedular').DataTable({
                    'columnDefs': [{
                        'targets': [8, 9],
                        'orderable': false,
                    }],
                    order: [[2, 'desc']],
                });
            },
            error: function (msg) {
                alert(msg.responseText);
            }
        });
}

function getcourseidd(HSID) {
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
                $("#uexistingdate").html(dateFormat(data[0].scheduleDate, 'dd-mmm-yy'));
                $("#uinputCourses").val(data[0].courseId);
                $("#uSccDate").val(data[0].scheduleDate);
                $("#uScDate").val(dateFormat(data[0].scheduleDate, 'dd-mmm-yy'));
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
            type: "POST",
            data: usersParam,
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                $('#dataTable tbody').empty();
                if (data.retOut == "2") {
                    $("#reschedulingModal").modal("hide");
                    clearinput();
                    BootStrapRedirect(' Rescheduled Successfully.', '/Hosts/Schedular/Schedular');
                }
                else if (data.retOut == "3") {
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
    $("#ViewDetailsModal").modal("hide");
});
$('#btnCancelRes').click(function () {
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
                $("#divCoursename").html(data[0].courseName);
                $("#divBatchname").html(data[0].batchName);
                $('#tblDetails thead').empty();
                $('#tblDetails tbody').empty();

                var trHTML = '';
                var thead;
                if (isPub == "0") {
                    $("#btnPublish").show();
                    thead = '<tr class="thead-dark"><th scope="col">Sl#</th><th scope="col">Schedule Date</th><th scope="col">Start Time</th><th scope="col">End Time</th><th scope="col">Duration (Mins)</th><th scope="col" class="table-rsaction-width">Action</th></tr>';
                }
                else {

                    $("#btnPublish").hide();
                    thead = '<tr class="thead-dark"><th scope="col">Sl#</th><th scope="col">Schedule Date</th><th scope="col">Start Time</th><th scope="col">End Time</th><th scope="col">Duration (Mins)</th></tr>';

                }

                $.each(data, function (i, item) {

                    if (isPub == "0") {
                        publish = ' <div class="action-inline" data-toggle="tooltip" data-placement="right" title="Edit"> <a  id= "scId" href="javascript:void(0);" onclick="getcourseidd(' + data[i].schedularId + ')"  class="form-control table-edit "><i class="bx bx-edit-alt"></i></a> </div>  ';
                        trHTML += '<tr  class=""><td>' + (i + 1) + '</td><td>' + dateFormat(data[i].scheduleDate, 'dd-mmm-yy') + '</td><td>' + timeConvert(data[i].startTime) + '</td><td>' + timeConvert(data[i].endTime) + '</td><td>' + data[i].duration + '</td><td> ' + publish + ' </td>  </tr>';
                    }
                    else if (isPub == "1") {
                        publish = '';
                        trHTML += '<tr  class=""><td>' + (i + 1) + '</td><td>' + dateFormat(data[i].scheduleDate, 'dd-mmm-yy') + '</td><td>' + timeConvert(data[i].startTime) + '</td><td>' + timeConvert(data[i].endTime) + '</td><td>' + data[i].duration + '</td></tr>';
                    }

                });
                $("#tblDetails").append(thead);
                $('#tblDetails').append(trHTML);
                $('.action-inline').tooltip();


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
            contentType: "application/json",
            success: function (data) {
                if (data.retOut == "5") {

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

function checkBatchName() {

    if (!ValidateDropdown('inputCourses', 'Course Name')) {
        return false;
    }
    var usersParam = JSON.stringify({
        CourseId: parseInt($('#inputCourses').val()),
        BatchName: $("#BatchNameOnce").val(),
    });
    $.ajax(
        {
            type: "GET",
            url: ServiceURL + "/api/HostSchedular/CkeckBatchName",
            data: JSON.parse(usersParam),
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                if (data.retOut == true) {
                    $("#BatchNameOnce").val('');
                    BootstrapAlert('Batch Name Already Exists...', 'BatchNameOnce');
                }
                else {
                }
            },
            error: function (msg) {
                alert(msg.responseText);
            }
        });


}

