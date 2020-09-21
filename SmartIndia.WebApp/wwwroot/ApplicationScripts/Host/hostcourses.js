$('#btnSubmit').click(function () {
    var ImgExt = $("#fileuploadImg").val().split('.')[1];
    var BroExt = $("#fileuploadbrochure").val().split('.').pop();
    function CallSave() {
        

        var UId = localStorage.getItem("userID");
        var usersParam = JSON.stringify({
            ACTIONCODE: 'A',
            UserId: parseInt(UId),
            CourseName: $('#txtName').val(),
            CourseDesc: $('#txtDesc').val(),
            Topics: $('#txtTopics').val(),
            StartDate: $('#fdate').val(),
            EndDate: $('#edate').val(),
            Duration: parseInt($('#durationDate').val(), 10),
            Cost: parseFloat($('#txtCost').val()),
            ClassFrequency: $('#ddlFrequency').val(),
            NoOfClass: parseInt($('#txtNoOfClass').val(), 10),
            ImageExt: ImgExt,
            BrochureExt: BroExt

        });
        $.ajax({
            url: ServiceURL + "/api/HostCourses/AddCourse",
            type: "POST",
            data: usersParam,
            dataType: "json",
            contentType: "application/json",
            success: function (data) {

                var fileIMG = $("#fileuploadImg").val();

                if (fileIMG) {
                    SaveImage(data.imgName);
                } else { 
                }
                var fileBRO = $("#fileuploadbrochure").val();
                if (fileBRO) {
                    SaveBrouchure(data.broName);
                }
                clearinput();

                if (data.retOut == "1") {
                    BootStrapRedirect('Course Saved Successfully.', '/Hosts/Courses/Courses');
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
    if (ValidateForm()) {
        if (BootStrapSubmit('btnSignUp', 'Are You Sure To Submit ?', 'Are You Sure To Update ?', CallSave)) {
            return false;
        }
        else {
            return true;
        }
    }

});
function SaveImage(imgId) {
    const fdata = new FormData();

    var files = $("#fileuploadImg").get(0).files;

    // Add the uploaded image content to the form data collection
    if (files.length > 0) {
        fdata.append("UploadedImage", files[0]);
    }

    // Make Ajax request with the contentType = false, and procesDate = false
    var ajaxRequest = $.ajax({
        type: "POST",
        url: ServiceURL + "/api/HostCourses/UploadImage?id=" + imgId,
        contentType: false,
        processData: false,
        data: fdata
    });

    ajaxRequest.done(function (responseData, textStatus) {
        if (textStatus == 'success') {
            $("#fileuploadImg").val('');
        }
    });
}
function SaveBrouchure(BroId) {
    const bdata = new FormData();

    var files = $("#fileuploadbrochure").get(0).files;

    // Add the uploaded image content to the form data collection
    if (files.length > 0) {
        bdata.append("UploadedBrochure", files[0]);
    }

    // Make Ajax request with the contentType = false, and procesDate = false
    var ajaxRequest = $.ajax({
        type: "POST",
        url: ServiceURL + "/api/HostCourses/UploadFile?id=" + BroId,
        contentType: false,
        processData: false,
        data: bdata
    });

    ajaxRequest.done(function (responseData, textStatus) {
        if (textStatus == 'success') {
            $("#fileuploadbrochure").val('');
        }
    });
}

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
});
function getallcourses() {
    $("#btnSubmit").show();
    $("#btnUpdate").hide();
    var UId = localStorage.getItem("userID");
    var usersParam = JSON.stringify({
        UserId: parseInt(UId),
        ACTIONCODE: "B"
    });
    $.ajax(
        {
            type: "GET",
            url: ServiceURL + "/api/HostCourses/GetHostCourse",
            data: JSON.parse(usersParam),
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                $('#tblCourses tbody').empty();
                var trHTML = '';

                $.each(data, function (i, item) {
                    // trHTML += '<tr  class=""><td>' + (i + 1) + '</td><td>' + data[i].courseName + '</td><td>' + data[i].topic + '</td><td>' + dateFormat(data[i].startDate, 'dd-mmm-yy') + '</td><td>' + dateFormat(data[i].endDate, 'dd-mmm-yy') + '</td><td>' + data[i].duration + '</td> <td> <div class="action-inline" data-toggle="tooltip" data-placement="right" title="Edit"> <a href="javascript:void(0);" onclick="getcourseidd(' + data[i].courseId + ')"  class="form-control table-edit "><i class="bx bx-edit-alt"></i></a> </div>     <div class="action-inline" data-toggle="tooltip" data-placement="right" title="View">  <a href="javascript:void(0);" onclick="getcoursedetails(' + data[i].courseId + ')" class="form-control table-view" data-toggle="modal" data-target="#ViewDetailsModal"><i class="fa fa-fw fa-eye"></i></a> </div>  </td> </tr>';
                    trHTML += '<tr  class=""><td>' + data[i].courseName + '</td><td>' + data[i].topic + '</td><td>' + dateFormat(data[i].startDate, 'dd-mmm-yy') + '</td><td>' + dateFormat(data[i].endDate, 'dd-mmm-yy') + '</td><td>' + data[i].duration + '</td> <td> <div class="action-inline" data-toggle="tooltip" data-placement="right" title="Edit"> <a href="javascript:void(0);" onclick="getcourseidd(' + data[i].courseId + ')"  class="form-control table-edit "><i class="bx bx-edit-alt"></i></a> </div>     <div class="action-inline" data-toggle="tooltip" data-placement="right" title="View">  <a href="javascript:void(0);" onclick="getcoursedetails(' + data[i].courseId + ')" class="form-control table-view" data-toggle="modal" data-target="#ViewDetailsModal"><i class="fa fa-fw fa-eye"></i></a> </div>  <div class="action-inline" data-toggle="tooltip" data-placement="bottom" title="Brochure"> <a href="javascript:void(0);" class="form-control table-brochure" data-toggle="modal" data-target="#getCourseBrochureModal"> <i class="bx bx-file"></i></a></div></td> </tr>';
                });

                $('#tblCourses').append(trHTML);
                //$('#tblCourses').DataTable();
                $('#tblCourses').dataTable({
                    'columnDefs': [{
                        'targets': [5],
                        'orderable': false,
                    }]
                });
                $('.action-inline').tooltip();
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
                url: ServiceURL + "/api/HostCourses/GetHostCourse",
                data: JSON.parse(usersParam1),
                dataType: "json",
                contentType: "application/json",
                success: function (data) {
                    $("#txtName").val(data[0].courseName);
                    $("#txtDesc").val(data[0].courseDesc);
                    $("#txtTopics").val(data[0].topics);
                    $("#sdatepicker").val(dateFormat(data[0].startDate, 'dd-mmm-yy'));
                    $("#edatepicker").val(dateFormat(data[0].endDate, 'dd-mmm-yy'));
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
            url: ServiceURL + "/api/HostCourses/GetHostCourse",
            data: JSON.parse(usersParam2),
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                $("#cname").html(data[0].courseName);
                $("#cdesc").html(data[0].courseDesc);
                $("#topic").html(data[0].topics);
                $("#sdt").html(dateFormat(data[0].startDate, 'dd-mmm-yy'));
                $("#edt").html(dateFormat(data[0].endDate, 'dd-mmm-yy'));
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
    var ImgExt = $("#fileuploadImg").val().split('.')[1];
    var BroExt = $("#fileuploadbrochure").val().split('.').pop();
    function CallUpdate() {
        var UId = localStorage.getItem("userID");
        var usersParam = JSON.stringify({
            UserId: parseInt(UId),
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
            NoOfClass: parseInt($('#txtNoOfClass').val(), 10),
            ImageExt: ImgExt,
            BrochureExt: BroExt

        });
        $.ajax({
            url: ServiceURL + "/api/HostCourses/AddCourse",
            type: "POST",
            data: usersParam,
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                var fileIMG = $("#fileuploadImg").val();

                if (fileIMG) {
                    SaveImage(data.imgName);
                } else {
                }
                var fileBRO = $("#fileuploadbrochure").val();
                if (fileBRO) {
                    SaveBrouchure(data.broName);
                }
                clearinput();
                if (data.retOut == "2") {
                    BootStrapRedirect('Course Updated Successfully.', '/Hosts/Courses/Courses');
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
