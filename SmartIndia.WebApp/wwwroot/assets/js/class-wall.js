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

$(document).ready(function () {
	$("#hostCWCalendar").css("display", "none");
});

//List
$('#hostClassWallList').click(function () {
	$("#hostCWlList").css("display", "block");
	$("#hostCWCalendar").css("display", "none");
	$("#hostClassWallList").addClass("up-active");
	$("#hostClassWallCalendar").removeClass("up-active");
});


//Calendar
$('#hostClassWallCalendar').click(function () {
	$("#hostCWlList").css("display", "none");
	$("#hostCWCalendar").css("display", "block");
	$("#hostClassWallList").removeClass("up-active");
	$("#hostClassWallCalendar").addClass("up-active");
});
