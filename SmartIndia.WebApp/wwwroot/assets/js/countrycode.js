// Country Code

//
var chkedLi;
$('#selected-flag-title').click(function() {
  $("#country-listbox").toggle('1000');
	$(".iti-arrow").toggleClass("up");
	$(".country").removeClass('country-checked');
	$(chkedLi).addClass('country-checked');
});


//
$('#country-listbox li').click(function () {
	var countryname = $(this).find(".country-name").html();
	var datadialcode = $(this).find(".dial-code").html();
	var datacountrycode = $(this).attr("data-country-code");

	$('#intel-flag-title').attr('data-original-title', countryname + ': ' + datadialcode);
	$('#selected-flag-title').find(".iti-flag").removeClass().addClass("iti-flag " + datacountrycode);
	$('#selected-flag-dial-code').text(datadialcode);
	$("#country-listbox").css("display", "none");
	chkedLi = this;
});