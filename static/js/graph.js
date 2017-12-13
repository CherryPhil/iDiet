window.onload = function () {
	var chart = new CanvasJS.Chart("chartContainer", {
		title: {
			text: "Your BMI Progress"
		},
        axisX:{
		    title:"Months"

        },
        axisY: {
            title: "B M I",
            includeZero: false
        },
		data: [
		{
			type: "line",
			dataPoints: [
				{ y: 10 },
				{ y:  4 },
				{ y: 18 },
				{ y:  8 }
			]
		}
		]
	});
	chart.render();

	$("#addDataPoint").click(function () {

	var length = chart.options.data[0].dataPoints.length;
	chart.options.title.text = "Your BMI Progress";
	chart.options.data[0].dataPoints.push({y:parseInt(document.getElementById("newdp").value)});
	chart.render();


	});

};


