// Subject & Number Of Classes Chart JS
//if (document.getElementById("subject-number-classes-bar11")) {
//    var options = {
//        chart: {
//            height: 380,
//            type: 'bar'
//        },
//        plotOptions: {
//            bar: {
//                barHeight: '100%',
//                distributed: true,
//                horizontal: true,
//                dataLabels: {
//                    position: 'bottom'
//                },
//            }
//        },
//        colors: ['#33b2df', '#546E7A', '#d4526e', '#13d8aa', '#A5978B', '#2b908f', '#f9a3a4', '#90ee7e', '#f48024', '#69d2e7'],
//        dataLabels: {
//            enabled: true,
//            textAnchor: 'start',
//            style: {
//                colors: ['#fff']
//            },
//            formatter: function (val, opt) {
//                return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val
//            },
//            offsetX: 0,
//            dropShadow: {
//                enabled: true
//            }
//        },
//        series: [{
//            data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
//        }],
//        stroke: {
//            width: 1,
//            colors: ['#fff']
//        },
//        xaxis: {
//            categories: ['Physics', 'Chemistry', 'Literature', 'Business', 'Mathematics', 'Graphic Designing', 'App Development', 'Social Media Marketing', 'Human Resource Management', 'Web Development'],
//        },
//        yaxis: {
//            labels: {
//                show: false
//            }
//        },
//        title: {
//            text: '',
//            align: 'center',
//            floating: true
//        },
//        subtitle: {
//            text: '',
//            align: 'center',
//        },
//        tooltip: {
//            theme: 'dark',
//            x: {
//                show: false
//            },
//            y: {
//                title: {
//                    formatter: function () {
//                        return ''
//                    }
//                }
//            }
//        }
//    }
//    var chart = new ApexCharts(
//        document.querySelector("#subject-number-classes-bar11"),
//        options
//    );
//    chart.render();
//}

// Total Host Chart JS

var series =
{
    "monthDataSeries1": {
        "prices": [
            81,
            90,
            100,
            150,
            200,
            300,
            500,
            1000,
            1500,
            3000,
            3200,
            4000,
            4800,
            5700,
            6000,
            6600,
            7200,
            8000,
            8700,
            9000
        ],
        "dates": [
            "13 Jul 2020",
            "14 Jul 2020",
            "15 Jul 2020",
            "16 Jul 2020",
            "17 Jul 2020",
            "20 Jul 2020",
            "21 Jul 2020",
            "22 Jul 2020",
            "23 Jul 2020",
            "24 Jul 2020",
            "27 Jul 2020",
            "28 Jul 2020",
            "29 Jul 2020",
            "30 Jul 2020",
            "01 Aug 2020",
            "04 Aug 2020",
            "05 Aug 2020",
            "06 Aug 2020",
            "07 Aug 2020",
            "08 Aug 2020"
        ]
    }
}

if (document.getElementById("host-chart")) {
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
            data: series.monthDataSeries1.prices
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
        labels: series.monthDataSeries1.dates,
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
        document.querySelector("#host-chart"),
        options
    );
    chart.render();
}