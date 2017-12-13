window.onload = function () {

var chart = new CanvasJS.Chart("chartContainer", {
	animationEnabled: true,
	theme: "light2",
	title:{
		text: "Your BMI Progress"
	},
    axisX:{
	    title:"Months"
    },
	axisY:{
	    title: "B M I",
		includeZero: false
	},
	data: [{
		type: "line",
		dataPoints: [
			{x:1, y: 26 },
			{x:2, y: 26},
			{x:3, y: 25 },
			{x:4, y: 25 },
			{x:5, y: 23 },
			{x:6, y: 24 },
			{x:7, y: 26 , indexLabel: "highest",markerColor: "red", markerType: "triangle"},
			{x:8, y: 24 },
			{x:9, y: 23  },
			{x:10, y: 21 , indexLabel: "lowest",markerColor: "DarkSlateGrey", markerType: "cross"}
		]
	}]

});
chart.render();

};

function addDataPointsAndRender() {
    xValue = Number(document.getElementById('xValue').value);
    yValue = Number(document.getElementById('output').value);
    dps.push({
        x: xValue,
        y: yValue
    });
    chart.render();
}

var renderButton = document.getElementById('renderButton');
renderButton.addEventListener('click', addDPsAndRender);
