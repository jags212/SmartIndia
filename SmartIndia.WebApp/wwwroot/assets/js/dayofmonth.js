$('#dayOfMonthSection').click(function () {
    $('#MonthCalendar').slideToggle('1000');
});

var calendarnumber = '';
var numberfilter;
$('.month-calendar-numbers div').click(function () {
    var calnum = $(this).html();
    if ($('#dayOfMonthSection .placeholder').length == 1) {
        numberfilter = '<span class="month-item" data-val="' + calnum + '">' + calnum + ' <button type="button" onclick="deselectOneNo(this);">&times;</button></span>';
    }
    else {
        var selectedno = $('#dayOfMonthSection span').map(function () {
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
    calendarnumber = calendarnumber + numberfilter;
    $('#dayOfMonthSection').html(calendarnumber);
});

// Deselect one
function deselectOneNo(one_select) {
    $(one_select).parent().remove();
    var removeno = $(one_select).parent().attr('data-val');
    $(calendarnumber).filter(function (i, span) {
        var matching_list = $(span).attr('data-val');
        if (matching_list == removeno) {
            var calnumb = '<span class="month-item" data-val="' + removeno + '">' + removeno + ' <button type="button" onclick="deselectOneNo(this);">&times;</button></span>';
            var newcalnumb = calendarnumber.replace(calnumb, '');
            calendarnumber = newcalnumb;
        }
    });
    if ($('#dayOfMonthSection span').length == 0) {
        $('#dayOfMonthSection').append('<span class="placeholder">Pick the month</span>');
    }
}

//Select All No
function selectAllMonth() {
    $('#dayOfMonthSection span').remove();
    var selectedno = $('.month-calendar-numbers div').map(function () {
        return $(this).html();
    });
    for (var i = 0; i < selectedno.length; i++) {
        $('#dayOfMonthSection').append('<span class="month-item" data-val="' + selectedno[i] + '">' + selectedno[i] + ' <button type="button" onclick="$(this).parent().remove();">&times;</button></span>');
    }
}

//Deselect All No
function deselectAllMonth() {
    $('#dayOfMonthSection span').remove();
    $('#dayOfMonthSection').append('<span class="placeholder">Pick the month</span>');
    calendarnumber = '';
    $('#MonthCalendar').slideToggle('1000');
}

// When the user clicks anywhere outside of the search, close it
$(document).mouseup(function (e) {
    var container = $("#MonthCalendar");

    // if the target of the click isn't the container nor a descendant of the container
    if (!container.is(e.target) && container.has(e.target).length === 0) {
        container.hide();
    }
});
