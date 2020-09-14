//Host
$(document).ready(function () {
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
});


//Attendee
$(document).ready(function () {
    $("#attendeeUPCalendar").css("display", "none");
});

//Attendee List
$('#attendeeUpcomingList').click(function () {
    $("#attendeeUPlList").css("display", "block");
    $("#attendeeUPCalendar").css("display", "none");
    $("#attendeeUpcomingList").addClass("up-active");
    $("#attendeeUpcomingCalendar").removeClass("up-active");
});

//Attendee Calendar
$('#attendeeUpcomingCalendar').click(function () {
    $("#attendeeUPlList").css("display", "none");
    $("#attendeeUPCalendar").css("display", "block");
    $("#attendeeUpcomingList").removeClass("up-active");
    $("#attendeeUpcomingCalendar").addClass("up-active");
});
