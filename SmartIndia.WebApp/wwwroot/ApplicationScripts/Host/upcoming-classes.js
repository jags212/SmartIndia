﻿//Host
$(document).ready(function () {
    BindList();
    $("#hostUPCalendar").css("display", "none");
});

//Host List
$('#hostUpcomingList').click(function () {
    $("#hostUPlList").css("display", "block");
    $("#hostUPCalendar").css("display", "none");
    $("#hostUpcomingList").addClass("up-active");
    $("#hostUpcomingCalendar").removeClass("up-active");

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
        Curl: ClientURL
	});
	$.ajax(
		{
			type: "GET",
			url: ServiceURL + "/api/HostUpcomingClasses/BindHostUpcommingClasses",
			data: JSON.parse(usersParam),
			dataType: "json",
			contentType: "application/json",
			success: function (data) {

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
                var trHTML = '';

                $.each(data, function (i, item) {
                   
                    trHTML += '<li class="list-group-item justify-content-between ocr-list-group"> '
                        + '<div class="sm-card-title" data-toggle="tooltip" data-placement="bottom" title="' + data[i].title +'">'
                        
                        + ' <a href="' + ClientURL+'/Hosts/UpcomingClasses/upcomingclassdetail?SID=' + data[i].schedularId + '" >' + data[i].title + ' ' + "(" + '' + data[i].topics + '' + ")" + ' </a>'
                          +'</div>'
                        +'<span class="sm-host-name">'
                        + '<i class="bx bx-task"></i>' + data[i].batchName +''
                                +'</span>'
                        + ' <p class="card-text sm-cli-text">' + data[i].courseDesc +'</p>'
                            +'<div class="sm-bottom-info">'
                                +'<span class="sm-date">'
                        + ' <i class="bx bx-calendar"></i>' + dateFormat(data[i].scheduleDate, 'dd-mmm-yy') +''
                                    +'</span>'
                                +'<span class="sm-time">'
                        + ' <i class="bx bx-time"></i> ' + timeConvert(data[i].startTime) +''
                                    +'</span>'
                            +'</div >'
                        +'</li >'
                });

                $('#coursedetails').append(trHTML);
                $('.action-inline').tooltip();
            },

            error: function (msg) {
                alert(msg.responseText);
            }
        });
}






