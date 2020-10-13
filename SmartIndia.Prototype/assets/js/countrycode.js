// Country Code

//
var chkedLi;
var all_list;

$('#selected-flag-title').click(function () {
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
    $(".iti-arrow").addClass("up");
    chkedLi = this;
    all_list.show();
});

//Search Country
$('#searchCountry').keyup(function () {

    var that = this;
    all_list = $('#intel-flag-title ul > li');

    var matching_list = all_list.filter(function (i, li) {
        var list_item_text = $(li).text().toUpperCase();
        var search_text = that.value.toUpperCase();
        return ~list_item_text.indexOf(search_text);
    });

    all_list.hide();
    matching_list.show();

});

// When the user clicks anywhere outside of the search, close it
$(document).mouseup(function (e) {
    var container = $("#country-listbox");

    // if the target of the click isn't the container nor a descendant of the container
    if (!container.is(e.target) && container.has(e.target).length === 0) {
        container.hide();
        $(".iti-arrow").addClass("up");
    }
});


//Pin Country
$(document).ready(function () {

    var countryname;
    var datadialcode;
    var currentcountrycode;
    var datacountrycode;

    $.get('http://www.geoplugin.net/javascript.gp', function () {
        currentcountrycode = geoplugin_countryCode().toLowerCase();
        //$.get('https://ipinfo.io', function () { }, "jsonp").always(function (resp) {
        //    currentcountrycode = ((resp && resp.country) ? resp.country : "").toLowerCase();

        //$.ajax({
        //    url: 'http://ip-api.com/json',
        //    dataType: "json",
        //    type: "GET",
        //    contentType: 'application/json; charset=utf-8',
        //    cache: false,
        //    data: {},
        //    success: function (data) {
        //        alert(data.countryCode);
        //    },
        //    error: function (xhr) {
        //        alert('Something went wrong!');
        //    }
        //});

        $('#country-listbox li').filter(function (i, li) {
            datacountrycode = $(li).attr("data-country-code");
            if (datacountrycode == currentcountrycode) {
                countryname = $(this).find(".country-name").html();
                datadialcode = $(this).find(".dial-code").html();
                chkedLi = this;

                $('#intel-flag-title').attr('data-original-title', countryname + ': ' + datadialcode);
                $('#selected-flag-title').find(".iti-flag").removeClass().addClass("iti-flag " + datacountrycode);
                $('#selected-flag-dial-code').text(datadialcode);
                $("#country-listbox").css("display", "none");
            }
        });
    });
});
