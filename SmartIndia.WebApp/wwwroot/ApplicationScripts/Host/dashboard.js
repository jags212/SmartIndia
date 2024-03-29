﻿$(document).ready(function () {
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
        Curl: ""
    });
    $.ajax(
        {
            type: "GET",
            url: ServiceURL + "/api/HostDashboard/BindHostUpcommingClasses",
            data: JSON.parse(usersParam),
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                if (data.length == 0) {
                    $("#hostDashCalendar").css("display", "none");
                    $("#divaction").css("display", "none");
                    $("#sp_nodata").css("display", "block");
                    $("#sp_nodata").html("No data available");
                    $(".calendar-scheduler").addClass("nodata-btn-schedular");
                }
                else {
                    $("#sp_nodata").css("display", "none");
                    $(".calendar-scheduler").removeClass("nodata-btn-schedular");
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
                }
            },
            error: function (msg) {
                alert(msg.responseText);
            }
        });
}


// Class Popularity JS
if (document.getElementById("class-popularity-bar-chartt")) {
    $(function () {
        var data = getData();
    });

    function getData() {
        var noOfAttendee = [];
        var courseName = [];

        jQuery.support.cors = true;
        var UId = localStorage.getItem("userID");
        var usersParam = JSON.stringify({
            UserId: parseInt(UId),
            ACTIONCODE: "E"
        });

        $.ajax({
            type: "GET",
            url: ServiceURL + "/api/Attendees/BindAttendees",
            data: JSON.parse(usersParam),
            dataType: "json",
            contentType: "application/json",
            async: false
        }).done(function (data) {
            if (data.length != 0) {
                $('#classpopularity').show();
                data.forEach(function (obj) {
                    courseName.push(obj.courseName);
                    noOfAttendee.push(parseInt(obj.noOfAttendee));
                });
            }
            else {

                $('#classpopularity').hide();
            }

            var options = {
                chart: {
                    height: 350,
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

                series: [
                    {
                        name: "No of Attendee",
                        data: noOfAttendee
                    }
                ],

                xaxis: {
                    categories: courseName,
                }
            }
            var chart = new ApexCharts(
                document.querySelector("#class-popularity-bar-chartt"),
                options
            );
            chart.render();
        });
        return {
        };
    }
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
                if (data.length == 0) {
                    $("#hostDashlList").css("display", "none");
                    $("#divaction").css("display", "none");
                    $("#divnoofdata").css("display", "none");
                    $("#sp_nodata").css("display", "block");
                    $("#sp_nodata").html("No records available");
                    $(".calendar-scheduler").addClass("nodata-btn-schedular");
                }
                else {
                    $("#sp_nodata").css("display", "none");
                    $(".calendar-scheduler").removeClass("nodata-btn-schedular");
                    $("#divnoofdata").css("display", "block");
                }
                $('#tblCourses tbody').empty();
                var trHTML = '';
                $.each(data, function (i, item) {
                    trHTML += '<tr class="odd list-group-item justify-content-between ocr-list-group">'
                        + '<td><div class="sm-card-title"><a data-toggle="tooltip" class="action-inline" data-placement="bottom" title="' + data[i].title + '" href="' + ClientURL + '/Hosts/HostDashboard/CourseDetails?SID=' + data[i].schedularId + '" >' + data[i].title + ' ' + "<span class='topic-font'>(" + '' + data[i].topics + '' + ")</span>" + ' </a></div>'
                        + '<p class="card-text sm-cli-text v-ellipsis">' + data[i].courseDesc + '</p>'
                        + '<div class="sm-bottom-info">'
                        + '<span class="sm-host-name"> <i class="bx bx-task"></i>' + data[i].batchName + '</span> '
                        + '<span class="sm-date"> <i class="bx bx-calendar"></i>' + dateFormat(data[i].scheduleDate, 'dd-mmm-yy') + '</span>'
                        + '<span class="sm-time"> <i class="bx bx-time"></i>' + timeConvert(data[i].startTime) + '</span></div></td>'
                        + '</tr>';
                });
                $('#tblCourses').append(trHTML);
                var table = $('#tblCourses').DataTable(
                    {
                        "bSort": false,
                        //"bPaginate": false,
                        //"bFilter": false,
                        //"bInfo": false,
                        "lengthMenu": [[5, 10, 50, -1], [5, 10, 50, "All"]],
                        "pageLength": 5
                    }
                );
                $('#searchlist').keyup(function () {
                    table.search(this.value).draw();
                });
                $('.clear-datatable').click(function () {
                    table.search($('#searchlist').val()).draw();
                });
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
            height: 350,
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


// Revenue Growth Chart JS
if (document.getElementById("host-revenue-growth-chart")) {
    $(function () {
        var data = getData();
    });

    function getData() {
        var monthName = [];
        var monthlyRevienue = [];

        jQuery.support.cors = true;
        var UId = localStorage.getItem("userID");
        var usersParam = JSON.stringify({
            UserId: parseInt(UId),
            ACTIONCODE: "R"
        });

        $.ajax({
            type: "GET",
            url: ServiceURL + "/api/Attendees/BindMonthlyRevienue",
            data: JSON.parse(usersParam),
            dataType: "json",
            contentType: "application/json",
            async: false
        }).done(function (data) {
            if (data.length != 0) {
                $('#classpopularity').show();
                data.forEach(function (obj) {
                    monthName.push(obj.monthName);
                    monthlyRevienue.push(parseInt(obj.monthlyRevienue));
                });
            }
            else {

                $('#classpopularity').hide();
            }
            //------------
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
                    //data: [0, 5000, 7000, 10000, 15000, 9000, 11000, 13000, 20000, 25000, 27000, 30000]
                    data: monthlyRevienue
                }],
                xaxis: {
                   // categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    categories: monthName,
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
            //------------
        });
        return {
        };
    }
}