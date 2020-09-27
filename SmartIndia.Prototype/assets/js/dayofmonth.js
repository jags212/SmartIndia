$('#dayOfMonth').click(function () {
    $('#MonthCalendar').slideToggle('1000');
});

var calendarnumber = '';
var numberfilter;
$('.month-calendar-numbers div').click(function () {
    var calnum = $(this).html();
    if ($('#dayOfMonth span').length == 1) {
        numberfilter = '<span class="month-item" data-val="' + calnum + '">' + calnum + ' <button type="button" onclick="deselectOneNo(this);">&times;</button></span>';
    }
    else {
        var selectedno = $('#dayOfMonth span').map(function () {
            return $(this).attr("data-val");
        });
        for (var i = 0; i < selectedno.length; i++) {
            if (selectedno[i] != calnum) {
                numberfilter = '<span class="month-item" data-val="' + calnum + '">' + calnum + ' <button type="button" onclick="deselectOneNo(this);">&times;</button></span>';
            }
            else {
                numberfilter = '';
                return;
            }
        }
    }
    var nobutton = '<button type="button" class="select-button" onclick="selectAll()"></button><button type="button" class="deselect-button" onclick="deselectAllNo()"></button>';
    calendarnumber = calendarnumber + numberfilter;
    $('#dayOfMonth').html(calendarnumber + nobutton);
});

// Deselect one
function deselectOneNo(one_select) {
    $(one_select).parent().remove();
    var removeno = $(one_select).parent().attr('data-val');

    if ($('#dayOfMonth span').length == 0) {
        $('#dayOfMonth').append('<span class="placeholder">Pick the month</span>');
    }
    else {
        var matching_list;
        $(calendarnumber).filter(function (i, span) {
            matching_list = $(span).attr('data-val');
            if (matching_list == removeno) {
                calendarnumber = $(calendarnumber).remove('<span class="month-item" data-val="' + removeno + '">' + removeno + ' <button type="button" onclick="deselectOneNo(this);">&times;</button></span>');
                return;
            }
        });
    }
}

//Select All No
function selectAll(multi_select) {
    $('#dayOfMonth span').remove();
    var selectedno = $('.month-calendar-numbers div').map(function () {
        return $(this).html();
    });
    for (var i = 0; i < selectedno.length; i++) {
        $('#dayOfMonth').append('<span class="month-item" data-val="' + selectedno[i] + '">' + selectedno[i] + ' <button type="button" onclick="$(this).parent().remove();">&times;</button></span>');
    }
}

//Deselect All No
function deselectAllNo() {
    $('#dayOfMonth span').remove();
    $('#dayOfMonth').append('<span class="placeholder">Pick the month</span>');
}

// When the user clicks anywhere outside of the search, close it
$(document).mouseup(function (e) {
    var container = $("#MonthCalendar");

    // if the target of the click isn't the container nor a descendant of the container
    if (!container.is(e.target) && container.has(e.target).length === 0) {
        container.hide();
    }
});
