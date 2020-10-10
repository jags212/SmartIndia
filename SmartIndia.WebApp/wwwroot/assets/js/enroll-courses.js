//

$('#enrollbutton').click(function () {
    var selectedPart = $('#inputCoursesSearch').children("option:selected").val();
    var enrollBox = $('#enrollbox').val()

    if (selectedPart == "Host" && enrollBox == "Napoleon") {
        $("#cnotavailable").css("display", "none");
        $("#erHost").css("display", "block");
        $("#erCourse").css("display", "none");
        $("#erHcalendar").css("opacity", "0");
        $("#erTcalendar").css("opacity", "0");
    }
    if (selectedPart == "Host" && enrollBox == "Sudhansu") {
        $("#cnotavailable").css("display", "none");
        $("#erHost").css("display", "block");
        $("#erCourse").css("display", "none");
        $("#erHcalendar").css("opacity", "0");
        $("#erTcalendar").css("opacity", "0");
    }
    if (selectedPart == "Courses" && enrollBox == "Leadership") {
        $("#cnotavailable").css("display", "none");
        $("#erHost").css("display", "block");
        $("#erCourse").css("display", "none");
        $("#erHcalendar").css("opacity", "0");
        $("#erTcalendar").css("opacity", "0");
    }
    if (selectedPart == "Subject" && enrollBox == "Physics") {
        $("#cnotavailable").css("display", "none");
        $("#erHost").css("display", "block");
        $("#erCourse").css("display", "none");
        $("#erHcalendar").css("opacity", "0");
        $("#erTcalendar").css("opacity", "0");
    }
    if (selectedPart == "Choose..." && enrollBox == "" || selectedPart == "Host" && enrollBox == "" || selectedPart == "Courses" && enrollBox == "" || selectedPart == "Subject" && enrollBox == "") {
        $("#cnotavailable").css("display", "block");
        $("#erHost").css("display", "none");
        $("#erCourse").css("display", "none");
        $("#erHcalendar").css("opacity", "0");
        $("#erTcalendar").css("opacity", "0");
    }
});

//Host Detail
$('.hostDetail').click(function () {
    $("#cnotavailable").css("display", "none");
    $("#erHost").css("display", "none");
    $("#erCourse").css("display", "none");
    $("#erHcalendar").css("opacity", "1");
    $("#erTcalendar").css("opacity", "0");
});

//Course Detail
$('.courseDetail').click(function () {
    $("#cnotavailable").css("display", "none");
    $("#erHost").css("display", "none");
    $("#erCourse").css("display", "none");
    $("#erHcalendar").css("opacity", "1");
    $("#erTcalendar").css("opacity", "0");
    //$("#erHcalendar").css("opacity", "1");
    //if (screen.width <= 767) {
    //	$("#erTcalendar").css({ "opacity": "1", "margin-top": "-415px" });
    //}
    //else if (screen.width <= 991) {
    //	$("#erTcalendar").css({ "opacity": "1", "margin-top": "-640px" });
    //}
    //else {
    //	$("#erTcalendar").css({ "opacity": "1", "margin-top": "-870px" });
    //}
});

////Advance Search
//$(".advanceSearch").click(function () {
//    $("#advanceSearchArea").slideToggle("2000");
//});

//// When the user clicks anywhere outside of the search, close it
//$(document).mouseup(function (e) {
//    var container = $("#advanceSearchArea");

//    // if the target of the click isn't the container nor a descendant of the container
//    if (!container.is(e.target) && container.has(e.target).length === 0) {
//        container.hide();
//    }
//});

////Clear Filter
//$("#clearfilter").click(function () {
//    $("#advanceSearchArea :input").val("");
//});