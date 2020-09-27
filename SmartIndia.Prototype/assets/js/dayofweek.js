$(document).ready(function () {
    // Day of Week
    var items = [
        { value: 1, text: 'Sun' },
        { value: 2, text: 'Mon' },
        { value: 3, text: 'Tue' },
        { value: 4, text: 'Wed' },
        { value: 5, text: 'Thu' },
        { value: 6, text: 'Fri' },
        { value: 7, text: 'Sat' },
    ];

    // Set a default values in list
    var select = $('[data-access_multi_select="true"]').check_multi_select({
        multi_select: true,
        items: items,
        rtl: false
    });

    // Display the selected Values
    $('#display_selected').click(function () {
        alert(select.check_multi_select('fetch_day'))
    });
});