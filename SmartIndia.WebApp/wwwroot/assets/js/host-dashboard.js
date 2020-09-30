//Host
//$(document).ready(function () {
//    $('#hostDashCalendar').fullCalendar({
//        header: {
//            left: 'prev,next',
//            center: 'title',
//            right: 'today,month,agendaWeek,agendaDay'
//        },
//        columnFormat: {
//            month: "ddd",
//            week: "ddd D",
//            day: "dddd"
//        },
//        firstDay: 1,
//        defaultDate: new Date(),
//        editable: true,
//        eventLimit: true,
//        timeFormat: 'hh:mm a',
//        events: [
//            {
//                title: 'Meeting',
//                start: '2020-09-06',
//                backgroundColor: "#46be76"
//            },
//            {
//                title: 'Meeting',
//                start: '2020-09-09',
//                end: '2020-09-09'
//            },
//            {
//                id: 999,
//                title: 'Meeting',
//                start: '2020-09-13T16:00:00'
//            },
//            {
//                id: 999,
//                title: 'Meeting',
//                start: '2020-09-16T16:00:00',
//                backgroundColor: "#9b59b6"
//            },
//            {
//                id: 999,
//                title: 'Meeting',
//                start: '2020-09-08T16:00:00',
//                backgroundColor: "#ffab03"
//            },
//            {
//                id: 999,
//                title: 'Meeting',
//                start: '2020-10-08T10:00:00',
//                backgroundColor: "#46be76"
//            }
//        ]
//    });

//});

//$(document).ready(function () {
//    $("#hostDashCalendar").css("display", "none");
//});

////Host List
//$('#hostDList').click(function () {
//    $("#hostDashlList").css("display", "block");
//    $("#hostDashCalendar").css("display", "none");
//    $("#hostDList").addClass("up-active");
//    $("#hostDCalendar").removeClass("up-active");
//});


////Host Calendar
//$('#hostDCalendar').click(function () {
//    $("#hostDashlList").css("display", "none");
//    $("#hostDashCalendar").css("display", "block");
//    $("#hostDList").removeClass("up-active");
//    $("#hostDCalendar").addClass("up-active");
//});


// Class Analytics Chart JS
if (document.getElementById("class-analytics-chart")) {
    var options = {
        chart: {
            height: 395,
            type: 'bar',
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '50%',
            },
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },
        colors: ['#35c353', '#4788ff' , '#ea3a3b'],
        series: [{
            name: 'Capacity',
            data: [76, 85, 101, 98, 87, 105, 91, 114, 95, 95, 80]
        }, {
            name: 'Registration',
            data: [44, 55, 57, 56, 61, 58, 63, 60, 66, 80, 50]
        }, {
            name: 'Attendance',
            data: [32, 30, 44, 42, 26, 47, 28, 54, 29, 15, 30]
        }],
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        },
        fill: {
            opacity: 1
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return val
                }
            }
        }
    }
    var chart = new ApexCharts(
        document.querySelector("#class-analytics-chart"),
        options
    );
    chart.render();
}



// Class Popularity JS
if (document.getElementById("class-popularity-bar-chart")) {
    var options = {
        chart: {
            height: 360,
            type: 'bar',
        },
        plotOptions: {
            bar: {
                horizontal: true,
            }
        },
        dataLabels: {
            enabled: false
        },
        series: [{
            data: [400, 448, 580, 690, 1100, 1200]
        }],
        xaxis: {
            categories: ['B.Sc. (Hons.) Chemistry', 'B.Sc. (Hons.) Computer Science', 'B.Sc. (Hons.) Mathematics', 'B.Sc. (Hons.) Physics', 'Literature', 'Web Development'],
        }
    }
    var chart = new ApexCharts(
        document.querySelector("#class-popularity-bar-chart"),
        options
    );
    chart.render();
}

// Revenue Growth Chart JS
if (document.getElementById("host-revenue-growth-chart")) {
    var options = {
        chart: {
            height: 395,
            type: 'line',
            shadow: {
                enabled: false,
                color: '#eeeeee',
                top: 3,
                left: 2,
                blur: 3,
                opacity: 1
            },
        },
        stroke: {
            width: 7,
            curve: 'smooth'
        },
        series: [{
            name: 'Revenue Growth',
            data: [0, 5000, 7000, 10000, 15000, 9000, 11000, 13000, 20000, 25000, 27000, 30000]
        }],
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        },
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'dark',
                gradientToColors: ['#1da1f2'],
                shadeIntensity: 1,
                type: 'horizontal',
                opacityFrom: 1,
                opacityTo: 1,
                stops: [100, 100, 100, 100],
            },
        },
        markers: {
            size: 4,
            opacity: 0.9,
            colors: ["#1da1f2"],
            strokeColor: "#ffffff",
            strokeWidth: 2,

            hover: {
                size: 7,
            }
        },
    }
    var chart = new ApexCharts(
        document.querySelector("#host-revenue-growth-chart"),
        options
    );
    chart.render();
}