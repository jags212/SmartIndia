
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
