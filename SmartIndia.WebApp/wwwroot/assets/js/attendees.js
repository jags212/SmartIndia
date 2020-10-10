//Course Wise Attendees
$('#courseAttendees').click(function () {
    $("#courseAttendeesList").css("display", "block");
    $("#attendeesCoursesList").css("display", "none");
    $("#courseAttendees").addClass("up-active");
    $("#attendeesCourses").removeClass("up-active");
});

//Attendees Wise Courses
$('#attendeesCourses').click(function () {
    $("#courseAttendeesList").css("display", "none");
    $("#attendeesCoursesList").css("display", "block");
    $("#courseAttendees").removeClass("up-active");
    $("#attendeesCourses").addClass("up-active");
});