"use strict";
$(document).ready(function () {
    // Basic Area Chart JS
    if (document.getElementById("apex-basic-area-chart")) {
        $(function () {
            var data = getData();
        });

        function getData() {
            var noOfHost = [];
            var joinDate = [];
            jQuery.support.cors = true;
            var usersParam = JSON.stringify({
                ACTIONCODE: "H",
            });

            $.ajax({
                type: "GET",
                url: ServiceURL + "/api/AttendeeDashboard/BindHostDatewise",
                data: JSON.parse(usersParam),
                dataType: "json",
                contentType: "application/json",
                async: false
            }).done(function (data) {
                if (data.length != 0) {
                    //$('#classpopularity').show();
                    data.forEach(function (obj) {
                        joinDate.push(obj.joinDate);
                        noOfHost.push(parseInt(obj.noOfHost));
                    });
                }
                else {

                    $('#classpopularity').hide();
                }

                var options = {
                    chart: {
                        height: 374,
                        type: 'area',
                        zoom: {
                            enabled: false
                        }
                    },
                    dataLabels: {
                        enabled: false
                    },
                    stroke: {
                        curve: 'straight'
                    },
                    series: [{
                        name: "Host",
                        //data: seriess.monthDataSeries1.prices
                        //data: [100, 500, 640, 900]
                        data: noOfHost
                    }],
                    title: {
                        text: '',
                        align: 'left',
                        style: {
                            fontSize: "13px",
                            color: '#666'
                        }
                    },
                    subtitle: {
                        text: '',
                        align: 'left'
                    },
                    //labels: seriess.monthDataSeries1.dates,
                    // labels: ["13 Jul 2020", "14 Jul 2020", "17 Jul 2020", "10 Jul 2021", "19 Jul 2021"],
                    labels: joinDate,
                    xaxis: {
                        type: 'datetime',
                        labels: {
                            style: {
                                colors: '#686c71',
                                fontSize: '12px',
                            },
                        },
                        axisBorder: {
                            show: true,
                            color: '#f6f6f7',
                            height: 1,
                            width: '100%',
                            offsetX: 0,
                            offsetY: 0
                        },
                    },
                    yaxis: {
                        opposite: true,
                        labels: {
                            style: {
                                color: '#686c71',
                                fontSize: '12px',
                            },
                        },
                        axisBorder: {
                            show: false,
                            color: '#f6f6f7',
                        },
                    },
                    legend: {
                        horizontalAlign: 'left'
                    },
                    grid: {
                        show: true,
                        borderColor: '#f6f6f7',
                    },
                }
                var chart = new ApexCharts(
                    document.querySelector("#apex-basic-area-chart"),
                    options
                );
                chart.render();
            });
            return {
            };
        }
    };
    CheckEnrollOrNot();
});
function CheckEnrollOrNot() {
    jQuery.support.cors = true;
    var UId = localStorage.getItem("userID");
    var usersParam = JSON.stringify({
        UserId: parseInt(UId),
        ACTIONCODE: "I"
    });
    $.ajax(
        {
            type: "GET",
            url: ServiceURL + "/api/AttendeeUpcomingClasses/AttendeeUpcomingClass",
            data: JSON.parse(usersParam),
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                if (data.length == 0) {
                    $("#divenroll").css("display", "block");
                }
                else {
                    $("#divenroll").css("display", "none");

                }
            },

            error: function (msg) {
                alert(msg.responseText);
            }
        });
}

// Custom DataLabels Bar Chart JS
if (document.getElementById("apex-custom-datalabels-bar")) {

    $(function () {
        var data = getData();
    });

    function getData() {
        var noOfClass = [];
        var courseName = [];

        jQuery.support.cors = true;
        var UId = localStorage.getItem("userID");
        var usersParam = JSON.stringify({
            UserId: parseInt(UId),
            ACTIONCODE: "E"
        });

        $.ajax({
            type: "GET",
            url: ServiceURL + "/api/AttendeeDashboard/BindCourseAndNoClass",
            data: JSON.parse(usersParam),
            dataType: "json",
            contentType: "application/json",
            async: false
        }).done(function (data) {
            if (data.length != 0) {
                //$('#classpopularity').show();
                data.forEach(function (obj) {
                    courseName.push(obj.courseName);
                    noOfClass.push(parseInt(obj.noOfClass));
                });
            }
            else {

                $('#classpopularity').hide();
            }

            var options = {
                chart: {
                    height: 380,
                    type: 'bar'
                },
                plotOptions: {
                    bar: {
                        barHeight: '100%',
                        distributed: true,
                        horizontal: true,
                        dataLabels: {
                            position: 'bottom'
                        },
                    }
                },
                colors: ['#33b2df', '#546E7A', '#d4526e', '#13d8aa', '#A5978B', '#2b908f', '#f9a3a4', '#90ee7e', '#f48024', '#69d2e7'],
                dataLabels: {
                    enabled: true,
                    textAnchor: 'start',
                    style: {
                        colors: ['#fff']
                    },
                    formatter: function (val, opt) {
                        return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val
                    },
                    offsetX: 0,
                    dropShadow: {
                        enabled: true
                    }
                },
                series: [{
                    //data: [401, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
                    data: noOfClass
                }],
                stroke: {
                    width: 1,
                    colors: ['#fff']
                },
                xaxis: {
                    // categories: ['Physics', 'Chemistry', 'Literature', 'Business', 'Mathematics', 'Graphic Designing', 'App Development', 'Social Media Marketing', 'Human Resource Management', 'Web Development'],
                    categories: courseName,
                },
                yaxis: {
                    labels: {
                        show: false
                    }
                },
                title: {
                    text: '',
                    align: 'center',
                    floating: true
                },
                subtitle: {
                    text: '',
                    align: 'center',
                },
                tooltip: {
                    theme: 'dark',
                    x: {
                        show: false
                    },
                    y: {
                        title: {
                            formatter: function () {
                                return ''
                            }
                        }
                    }
                }
            }
            var chart = new ApexCharts(
                document.querySelector("#apex-custom-datalabels-bar"),
                options
            );
            chart.render();
        });
        return {
        };
    }
}
