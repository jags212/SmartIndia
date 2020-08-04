// Country Code

//
var chkedLi;
var all_list;

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
	$("#searchCountry").val("");
	all_list.show();
	chkedLi = this;
});

//Search Country
$('#searchCountry').keyup(function () {

	var that = this;
	all_list = $('ul > li');

	var matching_list = all_list.filter(function (i, li) {
		var list_item_text = $(li).text().toUpperCase();
		var search_text = that.value.toUpperCase();
		return ~list_item_text.indexOf(search_text);
	});

	all_list.hide();
	matching_list.show();

});
