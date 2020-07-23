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
					start: '2020-07-06',
				},
				{
					title: 'Meeting',
					start: '2020-07-09',
					end: '2020-07-09'
				},
				{
					id: 999,
					title: 'Meeting',
					start: '2020-07-13T16:00:00'
				},
				{
					id: 999,
					title: 'Meeting',
					start: '2020-07-16T16:00:00'
				},
				{
					id: 999,
					title: 'Meeting',
					start: '2020-07-08T16:00:00'
				},
				{
					id: 999,
					title: 'Meeting',
					start: '2020-07-08T10:00:00'
				}
			]
		});
		
	});