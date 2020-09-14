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
			eventLimit: true,
			timeFormat: 'hh:mm a',
			events: [
				{
					title: 'Meeting',
					start: '2020-09-06',
					backgroundColor: "#46be76"
				},
				{
					title: 'Meeting',
					start: '2020-09-09',
					end: '2020-09-09'
				},
				{
					id: 999,
					title: 'Meeting',
					start: '2020-09-13T16:00:00'
				},
				{
					id: 999,
					title: 'Meeting',
					start: '2020-09-16T16:00:00',
					backgroundColor: "#9b59b6"
				},
				{
					id: 999,
					title: 'Meeting',
					start: '2020-09-08T16:00:00',
					backgroundColor: "#ffab03"
				},
				{
					id: 999,
					title: 'Meeting',
					start: '2020-10-08T10:00:00',
					backgroundColor: "#46be76"
				}
			]
		});
		
	});