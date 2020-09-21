// 

$('#classwallbutton').click(function() {
	var selectedPart = $('#inputSearch').children("option:selected").val();
	
	if(selectedPart == "Upcoming Classes"){
		$("#attend").css("display" , "none");
		$("#missed").css("display" , "none");
		$("#upcomingclasses").css("display" , "table-row");
		$("#cancel").css("display" , "none");
	}
	if(selectedPart == "Attend"){
		$("#attend").css("display" , "table-row");
		$("#missed").css("display" , "none");
		$("#upcomingclasses").css("display" , "none");
		$("#cancel").css("display" , "none");
	}
	if(selectedPart == "Missed"){
		$("#attend").css("display" , "none");
		$("#missed").css("display" , "table-row");
		$("#upcomingclasses").css("display" , "none");
		$("#cancel").css("display" , "none");
	}
	if(selectedPart == "Cancel"){
		$("#attend").css("display" , "none");
		$("#missed").css("display" , "none");
		$("#upcomingclasses").css("display" , "none");
		$("#cancel").css("display" , "table-row");
	}
	if(selectedPart == "Choose..."){
		$("#attend").css("display" , "table-row");
		$("#missed").css("display" , "table-row");
		$("#upcomingclasses").css("display" , "table-row");
		$("#cancel").css("display" , "table-row");
	}
});

//Attendee
$(document).ready(function () {
	$("#attendeeCWCalendar").css("display", "none");
});

//Attendee List
$('#attendeeClassWallList').click(function () {
	$("#attendeeCWlList").css("display", "block");
	$("#attendeeCWCalendar").css("display", "none");
	$("#attendeeClassWallList").addClass("up-active");
	$("#attendeeClassWallCalendar").removeClass("up-active");
});


//Attendee Calendar
$('#attendeeClassWallCalendar').click(function () {
	$("#attendeeCWlList").css("display", "none");
	$("#attendeeCWCalendar").css("display", "block");
	$("#attendeeClassWallList").removeClass("up-active");
	$("#attendeeClassWallCalendar").addClass("up-active");
});
