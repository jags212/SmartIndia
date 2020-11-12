//Host
$(document).ready(function () {
    $("#divcardbodynodata").css("display", "none");
    BindList();
    $("#hostUPCalendar").css("display", "none");
});

//Host List
$('#hostUpcomingList').click(function () {
    $("#hostUPlList").css("display", "block");
    $("#hostUPCalendar").css("display", "none");
    $("#hostUpcomingList").addClass("up-active");
    $("#hostUpcomingCalendar").removeClass("up-active");
    //BindList();

});

//Host Calendar
$('#hostUpcomingCalendar').click(function () {
    $("#hostUPlList").css("display", "none");
    $("#hostUPCalendar").css("display", "block");
    $("#hostUpcomingList").removeClass("up-active");
    $("#hostUpcomingCalendar").addClass("up-active");
    BindHostUpcommingClasses();
});
// Callendar Bind
function BindHostUpcommingClasses() {
    jQuery.support.cors = true;
    var UId = localStorage.getItem("userID");
    var usersParam = JSON.stringify({
        UserId: parseInt(UId),
        ACTIONCODE: "E",
        Curl: ""
    });
    $.ajax(
        {
            type: "GET",
            url: ServiceURL + "/api/HostUpcomingClasses/BindHostUpcommingClasses",
            data: JSON.parse(usersParam),
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                if (data.length == 0) {
                    $("#hostUPCalendar").css("display", "none");
                    $("#divcardbody").css("display", "none");
                    $("#divcardbodynodata").css("display", "block");
                }
                else {
                    $("#divcardbodynodata").css("display", "none");
                    $("#divcardbody").css("display", "block");
                    $('#hostUPCalendar').fullCalendar({
                        header: {
                            left: 'prev,next',
                            center: 'title',
                            right: 'today,month,agendaWeek,agendaDay'
                        },
                        columnFormat: {
                            month: "ddd",
                            week: "ddd D",
                            day: "dddd"
                        },
                        firstDay: 1,
                        defaultDate: new Date(),
                        editable: true,
                        eventLimit: true, // allow "more" link when too many events
                        timeFormat: 'hh:mm a',
                        eventMouseover: function (data, event, view) {
                            tooltip = '<div class="tooltiptopicevent" style="width:auto;height:auto;background:#feb811;position:absolute;z-index:10001;padding:10px 10px 10px 10px ;  line-height: 200%;">' + '' + '' + data.title + '</br>' + ' ' + ' ' + ' ' + timeConvert(data.startTime) + ' - ' + timeConvert(data.endTime) + '</div>';
                            $("body").append(tooltip);
                            $(this).mouseover(function (e) {
                                $(this).css('z-index', 10000);
                                $('.tooltiptopicevent').fadeIn('500');
                                $('.tooltiptopicevent').fadeTo('10', 1.9);
                            }).mousemove(function (e) {
                                $('.tooltiptopicevent').css('top', e.pageY + 10);
                                $('.tooltiptopicevent').css('left', e.pageX + 20);
                            });
                        },
                        eventMouseout: function (data, event, view) {
                            $(this).css('z-index', 8);
                            $('.tooltiptopicevent').remove();
                        },
                        eventMouseout: function (data, event, view) {
                            $(this).css('z-index', 8);
                            $('.tooltiptopicevent').remove();
                        },
                        dayClick: function () {
                            tooltip.hide()
                        },
                        eventResizeStart: function () {
                            tooltip.hide()
                        },
                        eventDragStart: function () {
                            tooltip.hide()
                        },
                        viewDisplay: function () {
                            tooltip.hide()
                        },
                        events: JSON.parse(JSON.stringify(data))
                    });
                }
            },
            error: function (msg) {
                alert(msg.responseText);
            }
        });
}

//List Bind
function BindList() {
    jQuery.support.cors = true;

    var result = parseJwt(localStorage.getItem("jwtToken"));
    var uid = result.unique_name;
    var role = result.role;
    var moderator;
    if (role == "Host") {
        moderator = true;
    }
    else {
        moderator = false;
    }
    var name = localStorage.getItem("firstName");
    var EmailId = localStorage.getItem("emailID");
    var UId = localStorage.getItem("userID");
    var usersParam = JSON.stringify({
        UserId: parseInt(UId),
        ACTIONCODE: "I"
    });
    $.ajax(
        {
            type: "GET",
            url: ServiceURL + "/api/HostUpcomingClasses/BindHostUpcommingClasses",
            data: JSON.parse(usersParam),
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                if (data.length == 0) {
                    $("#hostUPlList").css("display", "none");
                    $("#divnoofdata").css("display", "none");
                    $("#divcardbodynodata").css("display", "block");
                    $("#divcardbody").css("display", "none");
                    $("#sp_nodata").html("No records available");
                }
                else {
                    $("#divcardbodynodata").css("display", "none");
                    $("#divcardbody").css("display", "block");
                    $("#divnoofdata").css("display", "block");
                    var trHTML = '';
                    $.each(data, function (i, item) {
                        trHTML += '<tr class="odd list-group-item justify-content-between ocr-list-group">'
                            + '<td><div class="sm-card-title"><a data-toggle="tooltip" class="action-inline" data-placement="bottom" title="' + data[i].title + '" href="' + ClientURL + '/Hosts/HostDashboard/CourseDetails?SID=' + data[i].schedularId + '" >' + data[i].title + ' ' + "<span class='topic-font'>(" + '' + data[i].topics + '' + ")</span>" + ' </a></div>'
                            + '<p class="card-text sm-cli-text v-ellipsis">' + data[i].courseDesc + '</p>'
                            + '<div class="sm-bottom-info">'
                            + '<span class="sm-host-name"> <i class="bx bx-task"></i>' + data[i].batchName + '</span> '
                            + '<span class="sm-date"> <i class="bx bx-calendar"></i>' + dateFormat(data[i].scheduleDate, 'dd-mmm-yy') + '</span>'
                            + '<span class="sm-time"> <i class="bx bx-time"></i>' + timeConvert(data[i].startTime) + '</span></div><div style="float:right"><a data-toggle="tooltip" class="action-inline buttonstyled" data-placement="top" title="Start" target="_blank" href="' + ClientURL + '/VideoClass/MeetingUp/Index?CRID=' + data[i].classRoomId + '&Id=' + UId + '&Name=' + name + '&EmailId=' + EmailId + '&moderator=' + moderator + '"><strong><u>Start</u> </strong></span></a></div></td>'
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
                   
                }
            },

            error: function (msg) {
                alert(msg.responseText);
            }
        });
}






