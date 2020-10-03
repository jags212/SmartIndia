$(document).ready(function () {
    BindList();
    $("#hostDashCalendar").css("display", "none");
});

//Host List
$('#hostDList').click(function () {
    $("#hostDashlList").css("display", "block");
    $("#hostDashCalendar").css("display", "none");
    $("#hostDList").addClass("up-active");
    $("#hostDCalendar").removeClass("up-active");
});


//Host Calendar
$('#hostDCalendar').click(function () {
    $("#hostDashlList").css("display", "none");
    $("#hostDashCalendar").css("display", "block");
    $("#hostDList").removeClass("up-active");
    $("#hostDCalendar").addClass("up-active");
    BindHostUpcommingClasses();
});

// Callendar Bind
function BindHostUpcommingClasses() {
    jQuery.support.cors = true;
    var UId = localStorage.getItem("userID");
    var usersParam = JSON.stringify({
        UserId: parseInt(UId),
        ACTIONCODE: "E",
        Curl: ClientURL
    });
    $.ajax(
        {
            type: "GET",
            url: ServiceURL + "/api/HostDashboard/BindHostUpcommingClasses",
            data: JSON.parse(usersParam),
            dataType: "json",
            contentType: "application/json",
            success: function (data) {

                $('#hostDashCalendar').fullCalendar({
                    header: {
                        left: 'prev,next',
                        center: 'title',
                        right: 'today,month,agendaWeek,agendaDay'
                    },
                    columnFormat: {
                        month: "ddd",
                        week: "ddd D",
                        day: "dddd"
                    },
                    firstDay: 1,
                    defaultDate: new Date(),
                    editable: true,
                    eventLimit: true, // allow "more" link when too many events
                    timeFormat: 'hh:mm a',
                    eventMouseover: function (data, event, view) {
                        tooltip = '<div class="tooltiptopicevent" style="width:auto;height:auto;background:#feb811;position:absolute;z-index:10001;padding:10px 10px 10px 10px ;  line-height: 200%;">' + '' + '' + data.title + '</br>' + ' ' + ' ' + ' ' + timeConvert(data.startTime) + ' - ' + timeConvert(data.endTime) + '</div>';
                        $("body").append(tooltip);
                        $(this).mouseover(function (e) {
                            $(this).css('z-index', 10000);
                            $('.tooltiptopicevent').fadeIn('500');
                            $('.tooltiptopicevent').fadeTo('10', 1.9);
                        }).mousemove(function (e) {
                            $('.tooltiptopicevent').css('top', e.pageY + 10);
                            $('.tooltiptopicevent').css('left', e.pageX + 20);
                        });
                    },
                    eventMouseout: function (data, event, view) {
                        $(this).css('z-index', 8);
                        $('.tooltiptopicevent').remove();
                    },
                    eventMouseout: function (data, event, view) {
                        $(this).css('z-index', 8);
                        $('.tooltiptopicevent').remove();
                    },
                    dayClick: function () {
                        tooltip.hide()
                    },
                    eventResizeStart: function () {
                        tooltip.hide()
                    },
                    eventDragStart: function () {
                        tooltip.hide()
                    },
                    viewDisplay: function () {
                        tooltip.hide()
                    },
                    events: JSON.parse(JSON.stringify(data))
                });
            },
            error: function (msg) {
                alert(msg.responseText);
            }
        });
}

//List Bind
function BindList() {
    jQuery.support.cors = true;
    var UId = localStorage.getItem("userID");
    var usersParam = JSON.stringify({
        UserId: parseInt(UId),
        ACTIONCODE: "I"
    });
    $.ajax(
        {
            type: "GET",
            url: ServiceURL + "/api/HostDashboard/BindHostUpcommingClasses",
            data: JSON.parse(usersParam),
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                var trHTML = '';

                $.each(data, function (i, item) {

                    trHTML += '<li class="list-group-item justify-content-between ocr-list-group"> '
                        + '<div class="sm-card-title" >'

                        + ' <a data-toggle="tooltip" data-placement="bottom" title="' + data[i].title + '" href="' + ClientURL + '/Hosts/HostDashboard/CourseDetails?SID=' + data[i].schedularId + '" >' + data[i].title + ' ' + "<span class='topic-font'>(" + '' + data[i].topics + '' + ")</span>" + ' </a>'
                        + '</div>'
                        + '<span class="sm-host-name">'
                        + '<i class="bx bx-task"></i>' + data[i].batchName + ''
                        + '</span>'
                        + ' <p class="card-text sm-cli-text ellip-box two-lines">' + data[i].courseDesc + '</p>'
                        + '<div class="sm-bottom-info">'
                        + '<span class="sm-date">'
                        + ' <i class="bx bx-calendar"></i>' + dateFormat(data[i].scheduleDate, 'dd-mmm-yy') + ''
                        + '</span>'
                        + '<span class="sm-time">'
                        + ' <i class="bx bx-time"></i> ' + timeConvert(data[i].startTime) + ''
                        + '</span>'
                        + '</div >'
                        + '</li >'
                });

                $('#coursedetails').append(trHTML);
                $('.action-inline').tooltip();
            },

            error: function (msg) {
                alert(msg.responseText);
            }
        });
}


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
        colors: ['#35c353', '#4788ff', '#ea3a3b'],
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