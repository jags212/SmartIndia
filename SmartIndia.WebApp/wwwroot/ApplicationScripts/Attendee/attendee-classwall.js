
//Host
$(document).ready(function () {
    $("#divcardbodynodata").css("display", "none");
    BindList();
    $("#hostCWCalendar").css("display", "none");
});

//Host List
$('#hostClassWallList').click(function () {
    $("#hostCWlList").css("display", "block");
    $("#hostCWCalendar").css("display", "none");
    $("#hostClassWallList").addClass("up-active");
    $("#hostClassWallCalendar").removeClass("up-active");
});


//Host Calendar
$('#hostClassWallCalendar').click(function () {
    $("#hostCWlList").css("display", "none");
    $("#hostCWCalendar").css("display", "block");
    $("#hostClassWallList").removeClass("up-active");
    $("#hostClassWallCalendar").addClass("up-active");
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
            url: ServiceURL + "/api/AttendeeClassWall/BindClassWallCallendar",
            data: JSON.parse(usersParam),
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                if (data.length == 0) {
                    $("#hostCWCalendar").css("display", "none");
                    $("#divcardbody").css("display", "none");
                    $("#divnoofdata").css("display", "none");
                    $("#divcardbodynodata").css("display", "block");
                    $("#sp_nodata").html("No records available")
                }
                else {
                    $("#divcardbodynodata").css("display", "none");
                    $("#divcardbody").css("display", "block");
                    $("#divnoofdata").css("display", "block");
                    $('#hostCWCalendar').fullCalendar({
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
    var UId = localStorage.getItem("userID");
    var usersParam = JSON.stringify({
        UserId: parseInt(UId),
        ACTIONCODE: "E"
    });
    $.ajax(
        {
            type: "GET",
            url: ServiceURL + "/api/AttendeeClassWall/BindClassWallDetail",
            data: JSON.parse(usersParam),
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                if (data.length == 0) {
                    $("#hostCWlList").css("display", "none");
                    $("#divcardbody").css("display", "none");
                    $("#divnoofdata").css("display", "none");
                    $("#divcardbodynodata").css("display", "block");
                    $("#sp_nodata").html("No data available");
                }
                else {
                    $("#divcardbodynodata").css("display", "none");
                    $("#divcardbody").css("display", "block");
                    $("#divnoofdata").css("display", "block");
                    $("#spannoofdata").html(data[0].noOfData);
                    $("#spdata").html("Records found: ");
                    var trHTML = '';

                    $.each(data, function (i, item) {
                        if (data[i].status) {
                            if (data[i].classType == "Accomplished") {
                                var color = '<div class="list-color-legend col-leg-green action-inline" data-toggle="tooltip" data-placement="bottom" title="Accomplished"></div>';
                            }
                            else {
                                if (data[i].isPublished == 2) {
                                    color = '<div class="list-color-legend col-leg-seablue action-inline" data-toggle="tooltip" data-placement="bottom" title="Reschedule"></div>';
                                }
                                else {
                                    color = '<div class="list-color-legend col-leg-yellow action-inline" data-toggle="tooltip" data-placement="bottom" title="Upcoming"></div>';
                                }
                            }
                        }
                        else {
                            var color = '<div class="list-color-legend col-leg-grey action-inline" data-toggle="tooltip" data-placement="bottom" title="Cancel"></div>';
                        }


                        trHTML += '<tr class="odd list-group-item justify-content-between ocr-list-group">'
                            + '<td><div>' + color + '</div><div class="sm-card-title"><a data-toggle="tooltip" class="action-inline" data-placement="bottom" title="' + data[i].title + '" href="' + ClientURL + '/Attendee/ClassWall/ClassWallDetail?SID=' + data[i].schedularId + '" >' + data[i].title + ' ' + "<span class='topic-font'>(" + '' + data[i].topics + '' + ")</span>" + ' </a></div>'
                            + '<span class="sm-host-name"><i class="bx bxs-face"></i>' + data[i].uname + '</span>'
                            + '<p class="card-text sm-cli-text ellip-box two-lines">' + data[i].courseDesc + '</p>'
                            + '<div class="sm-bottom-info">'
                            + '<span class="sm-host-name"> <i class="bx bx-task"></i>' + data[i].batchName + '</span> '
                            + '<span class="sm-date"> <i class="bx bx-calendar"></i>' + dateFormat(data[i].scheduleDate, 'dd-mmm-yy') + '</span>'
                            + '<span class="sm-time"> <i class="bx bx-time"></i>' + timeConvert(data[i].startTime) + '</span></div></td>'
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






