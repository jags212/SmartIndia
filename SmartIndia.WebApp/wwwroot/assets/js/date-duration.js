$("#edatepicker").change(function () {
    var startDate = $("#sdatepicker").val();
    var endDate = $("#edatepicker").val();

    var durationInTime = new Date(new Date(endDate) - new Date(startDate));
    var durationInDays = durationInTime / 1000 / 60 / 60 / 24;

    $("#durationDate").val(Math.round(durationInDays)+1);
});


