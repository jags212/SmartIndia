
// Host Upcoming Classes
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
    eventLimit: true,
    timeFormat: 'hh:mm a',
    events: [
        {
            title: 'Physics1',
            start: '2020-09-06T11:00:00',
            end: '2020-09-06T12:00:00',
            color: '#ffc107'
        },
        {
            title: 'Physics',
            start: '2020-09-03T15:00:00',
            end: '2020-09-03T16:00:00',
            color: '#ffc107'
        },
        {
            title: 'Chemistry',
            start: '2020-09-15T16:00:00',
            end: '2020-09-15T18:00:00',
            color: '#ffc107'
        },
        {
            title: 'Chemistry',
            start: '2020-09-10T11:00:00',
            end: '2020-09-10T12:30:00',
            color: '#ffc107'
        },
        {
            title: 'Literature',
            start: '2020-10-01T16:00:00',
            end: '2020-10-01T18:00:00',
            color: '#ffc107'
        },
        {
            title: 'Literature',
            start: '2020-09-22T10:00:00',
            end: '2020-09-22T12:00:00',
            color: '#ffc107'
        },
        {
            title: 'Business',
            start: '2020-09-25T12:30:00',
            end: '2020-09-25T14:30:00',
            color: '#ffc107'
        },
        {
            title: 'Business',
            start: '2020-10-01T11:00:00',
            end: '2020-10-01T13:00:00',
            color: '#ffc107'
        }
    ]
});

// Attendee Upcoming Classes
$('#attendeeUPCalendar').fullCalendar({
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
    eventLimit: true,
    timeFormat: 'hh:mm a',
    events: [
        {
            title: 'Physics',
            start: '2020-09-06T11:00:00',
            end: '2020-09-06T12:00:00',
            color: '#ffc107'
        },
        {
            title: 'Physics',
            start: '2020-09-03T15:00:00',
            end: '2020-09-03T16:00:00',
            color: '#ffc107'
        },
        {
            title: 'Chemistry',
            start: '2020-09-15T16:00:00',
            end: '2020-09-15T18:00:00',
            color: '#ffc107'
        },
        {
            title: 'Chemistry',
            start: '2020-09-10T11:00:00',
            end: '2020-09-10T12:30:00',
            color: '#ffc107'
        },
        {
            title: 'Literature',
            start: '2020-10-01T16:00:00',
            end: '2020-10-01T18:00:00',
            color: '#ffc107'
        },
        {
            title: 'Literature',
            start: '2020-09-22T10:00:00',
            end: '2020-09-22T12:00:00',
            color: '#ffc107'
        },
        {
            title: 'Business',
            start: '2020-09-25T12:30:00',
            end: '2020-09-25T14:30:00',
            color: '#ffc107'
        },
        {
            title: 'Business',
            start: '2020-10-01T11:00:00',
            end: '2020-10-01T13:00:00',
            color: '#ffc107'
        }
    ]
});
