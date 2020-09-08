$(document).ready(function () {
    BindAttendees();
})
function BindAttendees() {
    jQuery.support.cors = true;
    var UId = localStorage.getItem("userID");
    var usersParam = JSON.stringify({
        UserId: parseInt(UId),
        ACTIONCODE: "B"
    });
    $.ajax(
        {
            type: "GET",
            url: ServiceURL + "/api/Attendees/BindAttendees",
            data: JSON.parse(usersParam),
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                var trHTML = '';
                var cancel = '';
                $.each(data, function (i, item) {

                    //if (data[i].status == 0) {
                    //    cancel = '<div class="text-red">Canceled</div>';
                    //}
                    //else if (data[i].status == 1) {
                    //    cancel = '<div class="action-inline" data-toggle="tooltip" data-placement="right" title="Rescheduling">  <a href="javascript:void(0);" onclick="getcourseidd(' + data[i].schedularId + ')"  class="form-control table-edit" ><i class="bx bx bx-reset"></i></a> </div>   <div class="action-inline" data-toggle="tooltip" data-placement="right" title="Cancel"><a href="javascript:void(0);"onclick="getschedularId(' + data[i].schedularId + ')" class="form-control table-cancel" data-toggle="modal" data-target="#ConCancelModal"><i class="bx bx-trash"></i></a></div>';
                    //}
                    trHTML += '<tr  class=""><td>' + (i + 1) + '</td><td>' + data[i].courseName + '</td><td>' + dateFormat(data[i].startDate, 'dd-mmm-yyyy') + '</td><td data-toggle="modal" data-target="#GetAttendeesModal"><a href="javascript:void(0);" class="attendee-tooltip" data-toggle="tooltip" data-placement="bottom" title="Attendees">' + data[i].noOfAttendee + '</a></td> </tr>';

                });
                $('#tbl_attendees').append(trHTML);
                $('.attendee-tooltip').tooltip();
                $('#tbl_attendees').DataTable({
                    'columnDefs': [{
                    }],
                });
            },
            error: function (msg) {
                alert(msg.responseText);
            }
        });
}