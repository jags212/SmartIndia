$(document).ready(function () {
	getallSchedular();
})
function getallSchedular() {
	jQuery.support.cors = true;
	var UId = localStorage.getItem("userID");
	var usersParam = JSON.stringify({
		UserId: parseInt(UId),
		ACTIONCODE: "P"
	});
	$.ajax(
		{
			type: "GET",
			url: ServiceURL + "/api/HostUpcomingClasses/BindHostUpcommingClasses",
			data: JSON.parse(usersParam),
			dataType: "json",
			contentType: "application/json",
			success: function (data) {

				$('#hostupcomingclassesCalendar').fullCalendar({
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




