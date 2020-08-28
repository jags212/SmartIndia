$('#btnSubmit').click(function () {
    //var UserId = localStorage.getItem("UserId");
    var UId = 6;
    var usersParam;
    if ($('input[type=radio][name=rbtOnce]:checked').val() == 'once') {
        function CallSave() {
            usersParam = JSON.stringify({
                ACTIONCODE: 'A',
                UserId: UId,
                UpdatedById: UId,
                CourseId: parseInt($('#inputCourses').val(), 10),
                ScheduleDate: dateFormat($('#hfonceDate').val(), 'yyyy-mm-dd'),
                StartTime: $('#StartTime').val(),
                EndTime: $('#hfEndTime').val(), // for testing 
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
                        schedularParam.UserId = UId,
                        schedularParam.UpdatedById = UId,
                        schedularParam.CourseId = parseInt($('#inputCourses').val(), 10),
                        schedularParam.ScheduleDate = dateFormat(between[i], 'yyyy-mm-dd'),
                        schedularParam.StartTime = $('#StartTime').val(),
                        schedularParam.EndTime = $('#hfEndTime').val(),
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
                        clearinput();
                        usersParam = null;
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

// for update
$('#btnUpdate').click(function () {
    function CallSave() {
        var usersParam;
        var datelist = $('#ScDate').val().split(",");
        var datearray = [];
        for (i = 0; i < datelist.length; i++) {
            datearray.push(datelist[i])
        }
        usersParam = JSON.stringify({
            ACTIONCODE: 'U',
            SchedularId: parseInt($('#SchedularId').val(), 10),
            CourseId: parseInt($('#inputCourses').val(), 10),
            ScheduleDate: $('#SccDate').val(),
            StartTime: $('#StartTime').val(),
            EndTime: $('#EndTime').val()

        })
        $.ajax({
            url: ServiceURL + "/api/HostSchedular/AddSchedular",
            type: "POST",
            data: usersParam,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                clearinput();
                $('#dataTable tbody').empty();
                getallSchedular();
                if (data == "2") {
                    BootstrapAlert('Update Successfully.');
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
});
function clearinput() {
    $('#ScDate').val("");
    $('#StartTime').val("");
    $('#EndTime').val("");
    $('#inputCourses').val(0);
    $('#ddlrecurringschedule').val(0);
    $('#StartTime').val(0);
    $('#EndTime').val(0);
    $('#BatchNameOnce').val("");

}
//------------------------------------- get host schedular-----------------------------------------
$(document).ready(function () {
    getallSchedular();
})
function getallSchedular() { 
    $("#btnSubmit").show();
    $("#btnUpdate").hide();
    jQuery.support.cors = true;
    //var UserId = localStorage.getItem("UserId");
    var UId = 6;
    var usersParam = JSON.stringify({
        UserId: UId,
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
                    else if (data[i].isPublished == 1){
                        publish = '<a href="javascript: void (0); " class="form-control publish-active">Published</a>';
                    }
                    
                    trHTML += '<tr  class=""><td>' + (i + 1) + '</td><td>' + data[i].courseName + '</td><td>' + dateFormat(data[i].startScheduleDate, 'dd-mmm-yyyy') + '</td><td>' + dateFormat(data[i].endScheduleDate, 'dd-mmm-yyyy') + '</td><td>' + timeConvert(data[i].startTime) + '</td><td>' + timeConvert(data[i].endTime) + '</td><td>' + data[i].duration + '</td><td>' + data[i].batchName + '</td> <td>      <div class="action-inline" data-toggle="tooltip" data-placement="right" title="View">  <a href="javascript:void(0);" onclick="getSchedulardetails(' + data[i].courseId + ',' + "'" + dateFormat(data[i].startScheduleDate, 'mm-dd-yyyy') + "'" + ',' + "'" + dateFormat(data[i].endScheduleDate, 'mm-dd-yyyy') + "'" + ')" class="form-control table-view" data-toggle="modal" data-target="#ViewDetailsModal"><i class="fa fa-fw fa-eye"></i></a> </div>  </td> <td id="buPublish">' + publish +'</td> </tr>';
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
    //var UserId = localStorage.getItem("UserId");
    var UId = 6;
    function Update() {
        $("#btnSubmit").hide();
        $("#btnUpdate").show();
        $("#SchedularId").val(HSID);
        var usersParam1 = JSON.stringify({
            ACTIONCODE: 'G',
            //UserId: UId,
            SchedularId: parseInt(HSID),
        });

        $.ajax(
            {
                type: "GET",
                url: ServiceURL + "/api/HostSchedular/UpdateSchedular",
                data: JSON.parse(usersParam1),
                dataType: "json",
                contentType: "application/json",
                success: function (data) {
                    $("#inputCourses").val(data[0].courseId);
                    $("#SccDate").val(data[0].scheduleDate);
                    $("#ScDate").val(dateFormat(data[0].scheduleDate, 'dd-mmm-yyyy'));
                    $("#StartTime").val(data[0].startTime);
                    $("#Duration").val(data[0].duration);
                    $("#inputCourses").focus();
                },
                error: function (msg) {

                    alert(msg.responseText);
                }
            });
    }
    if (BootStrapSubmit('scId', 'Are You Sure To Edit ?', 'Are You Sure To Update ?', Update)) {
        return false;
    }
    else {
        return true;
    }
}
function getSchedulardetails(CID, sdate, edate) {
    $("#hfCourseId").val(CID);
    $("#hfSdate").val(dateFormat(sdate,"yyyy-mm-dd"));
    $("#hfEdate").val(dateFormat(edate, "yyyy-mm-dd"));
    //var UserId = localStorage.getItem("UserId");
    var UId = 6;
    var usersParam2 = JSON.stringify({
        ACTIONCODE: 'U',
        UserId: UId,
        CourseId: CID,
        StartScheduleDate: sdate,
        EndScheduleDate: edate

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
                   
                    trHTML += '<tr  class=""><td>' + (i + 1) + '</td><td>' + data[i].courseName + '</td><td>' + dateFormat(data[i].scheduleDate, 'dd-mmm-yyyy') + '</td><td>' + timeConvert(data[i].startTime) + '</td><td>' + timeConvert(data[i].endTime) + '</td><td>' + data[i].duration + '</td><td>' + data[i].batchName + '</td> <td> <div class="action-inline" data-toggle="tooltip" data-placement="top" title="Edit"> <a  id= "scId" href="javascript:void(0);" onclick="getcourseidd(' + data[i].schedularId + ')"  class="form-control table-edit "><i class="bx bx-edit-alt"></i></a> </div>  </td>  </tr>';
                });
                $('#tblDetails').append(trHTML);
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
            EndScheduleDate: $('#hfEdate').val()
        })
        $.ajax({
            url: ServiceURL + "/api/HostSchedular/Publish",
            type: "POST",
            data: usersParam,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                if (data == "5") {
                   
                    BootStrapRedirect('Publish Successfully.','/Hosts/Schedular/schedular');
                    
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

