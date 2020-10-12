//Once
$('#rbtonce').click(function () {
    $("#dtponce").css("display", "block");
    $("#divdailyrecurring").css("display", "none");
    $("#rbtonce").addClass("schedule-type-active");
    $("#rbtrecurring").removeClass("schedule-type-active");
});

//Recurring
$('#rbtrecurring').click(function () {
    $("#dtponce").css("display", "none");
    $("#divdailyrecurring").css("display", "block");
    $("#rbtonce").removeClass("schedule-type-active");
    $("#rbtrecurring").addClass("schedule-type-active");
});

//
$("#ddlrecurringschedule").change(function () {

    var selectedValue = $(this).children("option:selected").val();

    if (selectedValue == '0') {
        $("#divDayofweek").css("display", "none");
        $("#divDayofMonth").css("display", "none");
        $("#divmonthdate").css("display", "none");
        $("#divdateforweekly").css("display", "none");


    }
    if (selectedValue == 'Daily') {
        $("#divDayofweek").css("display", "none");
        $("#divDayofMonth").css("display", "none");
        $("#divmonthdate").css("display", "none");
        $("#divdateforweekly").css("display", "block");
    }
    if (selectedValue == 'Weekly') {
        $("#divDayofweek").css("display", "block");
        $("#divDayofMonth").css("display", "none");
        $("#divmonthdate").css("display", "none");
        $("#divdateforweekly").css("display", "block");
    }
    if (selectedValue == 'Monthly') {
        $("#divDayofMonth").css("display", "block");
        $("#divDayofweek").css("display", "none");
        $("#divmonthdate").css("display", "block");
        $("#divdateforweekly").css("display", "none");
    }
});