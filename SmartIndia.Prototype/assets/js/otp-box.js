//OTP Box
$("#rmobileno").change(function() {
	if(screen.width <= 991)
	{
		$("#cframe").css("display", "block");
	}
	else
	{
		$("#cframe").css("display", "flex");
	}
    $("#rnote").css("display", "block");
});