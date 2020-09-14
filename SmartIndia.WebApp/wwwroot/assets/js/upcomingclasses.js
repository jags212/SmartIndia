$(document).ready(function () {
    $("#attendeeupcomingclassesCalendar").css("display", "none");
});
//List
$('#upcomingList').click(function () {
    $("#attendeeupcomingclasses").css("display", "block");
    $("#attendeeupcomingclassesCalendar").css("display", "none");
    $("#upcomingList").addClass("up-active");
    $("#upcomingCalendar").removeClass("up-active");
});


//Calendar
$('#upcomingCalendar').click(function () {
    $("#attendeeupcomingclasses").css("display", "none");
    $("#attendeeupcomingclassesCalendar").css("display", "block");
    $("#upcomingList").removeClass("up-active");
    $("#upcomingCalendar").addClass("up-active");
});
