var $j = jQuery;

// Load the Visualization API and the chart package.
google.load("visualization", "1", { packages: ["corechart"] });

// Set a callback to run when the Google Visualization API is loaded.
google.setOnLoadCallback(drawChart);

//var ajaxurl = "http://localhost:8080/wp-admin/admin-ajax.php";
/*Create our Chart through an Ajax request by passing the build_graph action which will be parsed with the build_gaph function in functions.php*/

function drawChart() {
    $j.ajax({
        url: ajaxurl,
        //url: 'http://www.mocky.io/v2/586c948f120000560111f06e',
        data: {
            "action": "build_graph" //run build_graph function in functions.php
        },
        dataType: "json",
        success: function (data) {
            /*data[''] represents the json data */
            var company = data.company;
            var ct = data.ct;
            var ourevents = data.ourevents;
            var individual = data.individual;
            var misc = data.misc;
            var school = data.school;

            console.log(JSON.stringify(data));

            // Create the data table.
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Name');
            data.addColumn('number', 'Our Events');
            data.addColumn('number', 'Individual');
            data.addColumn('number', 'Company');
            data.addColumn('number', 'School');
            data.addColumn('number', 'Miscellaneous');
            data.addColumn('number', 'Collection Tins');
            data.addRow([null, ourevents, individual, company, school, misc, ct]);
            // Set chart options
            var options = {
                //'width':600, //unhighlited width to allow for responsive graph - see CSS file in source
                'height': 600,
                'allowHtml': true,
                'is3D': true,
                hAxis: {
                    title: 'Types of Donations'
                },
                vAxis: {
                    format: '$#,###.00'
                },
                'isStacked': true
            };
            var formatter = new google.visualization.NumberFormat({
                prefix: '$'
            });
            formatter.format(data, 1);
            formatter.format(data, 2);
            formatter.format(data, 3);
            formatter.format(data, 4);
            formatter.format(data, 5);
            formatter.format(data, 6);

            // Instantiate and draw our chart, passing in some options.
            var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
            chart.draw(data, options);

        }
    });
}

/*The following will resize the chart in the browser*/
$j(window).resize(function () {
    drawChart();
});