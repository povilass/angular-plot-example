// main application module for layout
var appMain = angular.module("appMain", []);

appMain.controller("MainController", function() {

});

appMain.directive("plotElement", function($interval) {
    return {
        restrict : 'E',
        replace : true,
        template : '<div style="height: 300px; width: 500px"></div>',
        link : function(scope, element, attrs) {


            var data = [];
            var totalPoints = 300;

            function getRandomData() {


                if (data.length > 0)
                    data = data.slice(1);

                // Do a random walk

                while (data.length < totalPoints) {

                    var prev = data.length > 0 ? data[data.length - 1] : 50,
                        y = prev + Math.random() * 10 - 5;

                    if (y < 0) {
                        y = 0;
                    } else if (y > 100) {
                        y = 100;
                    }

                    data.push(y);
                }

                // Zip the generated y values with the x values

                var res = [];
                for (var i = 0; i < data.length; ++i) {
                    res.push([i, data[i]])
                }

                return res;
            }

            // Set up the control widget

            var updateInterval = 50;

            var plot = $.plot(element, [ { data : getRandomData()} ], {
                series: {
                    shadowSize: 0	// Drawing is faster without shadows
                },
                yaxis: {
                    min: 0,
                    max: 100
                },
                xaxis: {
                    show: true
                }
            });

            function update() {

                plot.setData([{ data : getRandomData()}]);

                // Since the axes don't change, we don't need to call plot.setupGrid()

                plot.draw();
                setTimeout(update, updateInterval);
            }

            update();
        }
    }
});

appMain.directive("plotElement2", function($interval) {
    return {
        restrict : 'E',
        replace : true,
        template : '<div style="height: 300px; width: 500px"></div>',
        link : function(scope, element, attrs) {



            var totalPoints = 300;

            function getRandomData() {
                var data = [];

                if (data.length > 0)
                    data = data.slice(1);

                // Do a random walk

                while (data.length < totalPoints) {

                    var prev = data.length > 0 ? data[data.length - 1] : 50,
                        y = prev + Math.random() * 10 - 5;

                    if (y < 0) {
                        y = 0;
                    } else if (y > 100) {
                        y = 100;
                    }

                    data.push(y);
                }

                // Zip the generated y values with the x values

                var res = [];
                for (var i = 0; i < data.length; ++i) {
                    res.push([i, data[i]])
                }

                return res;
            }

            // Set up the control widget

            var updateInterval = 50;

            var plot = $.plot(element, [ { data : getRandomData()} ], {
                series: {
                    shadowSize: 0	// Drawing is faster without shadows
                },
                yaxis: {
                    min: 0,
                    max: 100
                },
                xaxis: {
                    show: true
                }
            });

            function update() {

                plot.setData([{ data : getRandomData()}]);

                // Since the axes don't change, we don't need to call plot.setupGrid()

                plot.draw();
                setTimeout(update, updateInterval);
            }

            update();
        }
    }
});

appMain.directive("plotSinCos", function($interval) {
    return {
        restrict : 'E',
        replace : true,
        template : '<div style="height: 300px; width: 500px"></div>',
        link : function(scope, element, attrs) {



            var sin = [], cos = [];
            for (var i = 0; i < 14; i += 0.1) {
                sin.push([i, Math.sin(i)]);
                cos.push([i, Math.cos(i)]);
            }

            plot = $.plot(element, [
                { data: sin, label: "sin(x) = -0.00"},
                { data: cos, label: "cos(x) = -0.00" }
            ], {
                series: {
                    lines: {
                        show: true
                    }
                },
                crosshair: {
                    mode: "x"
                },
                grid: {
                    hoverable: true,
                    autoHighlight: false
                },
                yaxis: {
                    min: -1.2,
                    max: 1.2
                }
            });

            var legends = $(element).find(".legendLabel");

            legends.each(function () {
                // fix the widths so they don't jump around
                $(this).css('width', $(this).width());
            });

            var updateLegendTimeout = null;
            var latestPosition = null;

            function updateLegend() {

                updateLegendTimeout = null;

                var pos = latestPosition;

                var axes = plot.getAxes();
                if (pos.x < axes.xaxis.min || pos.x > axes.xaxis.max ||
                    pos.y < axes.yaxis.min || pos.y > axes.yaxis.max) {
                    return;
                }

                var i, j, dataset = plot.getData();
                for (i = 0; i < dataset.length; ++i) {

                    var series = dataset[i];

                    // Find the nearest points, x-wise

                    for (j = 0; j < series.data.length; ++j) {
                        if (series.data[j][0] > pos.x) {
                            break;
                        }
                    }

                    // Now Interpolate

                    var y,
                        p1 = series.data[j - 1],
                        p2 = series.data[j];

                    if (p1 == null) {
                        y = p2[1];
                    } else if (p2 == null) {
                        y = p1[1];
                    } else {
                        y = p1[1] + (p2[1] - p1[1]) * (pos.x - p1[0]) / (p2[0] - p1[0]);
                    }

                    legends.eq(i).text(series.label.replace(/=.*/, "= " + y.toFixed(2)));
                }
            }

            $(element).bind("plothover",  function (event, pos, item) {
                latestPosition = pos;
                if (!updateLegendTimeout) {
                    updateLegendTimeout = setTimeout(updateLegend, 50);
                }
            });
        }
    }
});