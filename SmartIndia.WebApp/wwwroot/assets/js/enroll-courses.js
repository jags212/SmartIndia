//

$('#enrollbutton').click(function() {
	var selectedPart = $('#inputCoursesSearch').children("option:selected").val();
	var enrollBox= $('#enrollbox').val()
	
	if(selectedPart == "Host" && enrollBox == "Napoleon"){
		$("#cnotavailable").css("opacity" , "0");
		$("#erHcalendar").css({"opacity" : "1", "margin-top" : "-100px"});
		$("#erTcalendar").css("opacity" , "0");
	}
	if(selectedPart == "Host" && enrollBox == "Sudhansu"){
		$("#cnotavailable").css("opacity" , "0");
		$("#erHcalendar").css({"opacity" : "1", "margin-top" : "-100px"});
		$("#erTcalendar").css("opacity" , "0");
	}
	if(selectedPart == "Topic" && enrollBox == "Leadership"){
		$("#cnotavailable").css("opacity" , "0");
		$("#erHcalendar").css("opacity" , "0");
		$("#erTcalendar").css({"opacity" : "1", "margin-top" : "-870px"});
	}
	if(selectedPart == "Subject" && enrollBox == "Physics"){
		$("#cnotavailable").css("opacity" , "0");
		$("#erHcalendar").css("opacity" , "0");
		$("#erTcalendar").css({"opacity" : "1", "margin-top" : "-870px"});
	}
	if(selectedPart == "Choose..." && enrollBox == "" || selectedPart == "Host" && enrollBox == "" || selectedPart == "Topic" && enrollBox == "" || selectedPart == "Subject" && enrollBox == ""){
		$("#cnotavailable").css("opacity" , "1");
		$("#erHcalendar").css("opacity" , "0");
		$("#erTcalendar").css("opacity" , "0");
	}
});

