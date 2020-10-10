//Advance Search
$(".advanceSearch").click(function () {
    $("#advanceSearchArea").slideToggle("2000");
});

// When the user clicks anywhere outside of the search, close it
$(document).mouseup(function (e) {
    var container = $("#advanceSearchArea");

    // if the target of the click isn't the container nor a descendant of the container
    if (!container.is(e.target) && container.has(e.target).length === 0 && $(e.target).parents(".datepicker").size() == 0) {
        container.hide();
    }
});

//Clear Filter
$("#clearfilter").click(function () {
    $("#advanceSearchArea :input").val("");
});

//Clear Filter
$("#clearfilter").click(function () {
    $("#outer-advanceSearchArea :input").val("");
});