	    
		// Upcoming Classes
		$('#attendeeupcomingclassesCalendar').fullCalendar({
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
					title: 'Physics',
					start: '2020-07-06T11:00:00',
					end: '2020-07-06T12:00:00',
				},
				{
					title: 'Physics',
					start: '2020-07-03T15:00:00',
					end: '2020-07-03T16:00:00',
				},
				{
					title: 'Chemistry',
					start: '2020-07-15T16:00:00',
					end: '2020-07-15T18:00:00'
				},
				{
					title: 'Chemistry',
					start: '2020-07-10T11:00:00',
					end: '2020-07-10T12:30:00'
				},
			    {
					title: 'Literature',
					start: '2020-08-01T16:00:00',
					end: '2020-08-01T18:00:00'
				},
				{
					title: 'Literature',
					start: '2020-07-22T10:00:00',
					end: '2020-07-22T12:00:00'
				},
				{
					title: 'Business',
					start: '2020-07-25T12:30:00',
					end: '2020-07-25T14:30:00'
				},
				{
					title: 'Business',
					start: '2020-08-01T11:00:00',
					end: '2020-08-01T13:00:00'
				}
			]
		});
		