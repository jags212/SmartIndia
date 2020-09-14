	$(document).ready(function() { 
		$('#calendar').fullCalendar({
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
			defaultDate:  new Date(),
			editable: true,
			eventLimit: true, // allow "more" link when too many events
			events: [
				{
					title: 'Meeting',
					start: '2020-09-17T11:00:00',
				},
				{
					title: 'Meeting',
					start: '2020-09-09T10:00:00',
					end: '2020-09-09T10:00:00'
				},
				{
					id: 999,
					title: 'Meeting',
					start: '2020-09-13T16:00:00'
				},
				{
					id: 999,
					title: 'Meeting',
					start: '2020-09-16T16:00:00'
				},
				{
					id: 999,
					title: 'Meeting',
					start: '2020-09-29T16:00:00'
				},
				{
					id: 999,
					title: 'Meeting',
					start: '2020-10-08T10:00:00'
				}
			]
		});
		
	});