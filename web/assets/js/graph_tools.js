var data = [];
var data2 = [];

var numberOfPoints = 100;
var numberOfWeeks = 4;
var valuesRange = 40;
var hoursPerDay = 12;
var graphHeight = 100;
var daysInWeek = 5;
var transitionDuration = 500;

var numberOfHLabels = 15;
var numberOfVLabels = 10;

var vLabels = new Array();
var hLabels = new Array();

function generateData1() {
	for (var day = 0; day < daysInWeek; day++) {

		for (var hr = 0; hr < hoursPerDay; hr++) {
			var dayShift = 0.5 + Math.sin(day + hr / 24) / 10;
			var newVal = dayShift - Math.cos(2 * hr / (hoursPerDay / Math.PI)) / 10 + 0.04 * Math.random();
			data.push(newVal);
		}
	}
}

function generateData2() {
	for (var day = 0; day < daysInWeek; day++) {

		for (var hr = 0; hr < hoursPerDay; hr++) {
			var dayShift = 0.5 + Math.sin(day + hr / 24) / 10;
			var newVal = dayShift - Math.cos(2 * hr / (hoursPerDay / Math.PI)) / 10 + 0.04 * Math.random();
			data2.push(newVal);
		}
	}
}

function updateGraph1(points) {
	var pointWidth = 85.0 / data.length;
	var pointWidthR = 100.0 / data.length;

	var leftLabelsWidth = 0;

	hideLabels();

	var containersAnimParam = {
		duration : 1000,
		queue : true
	};

	$('#graphbody').animate({
		width : "100%",// valueInPixes,
		height : "100%",
		bottom : 0,
		top : 0,
		left : 0,
		right : 0
	}, containersAnimParam);

	$('#labels-bottom').animate({
		width : (100 - leftLabelsWidth) + "%",
		height : "100%",
		top : 0,
		left : leftLabelsWidth + "%"
	}, containersAnimParam);

	$('#labels-left').animate({
		width : "100%",// valueInPixes,
		height : "100%",
		bottom : 0,
		left : 0,
	}, containersAnimParam);

	for (var day = 0; day < daysInWeek; day++) {

		for (var hr = 0; hr < hoursPerDay; hr++) {
			var i = day * hoursPerDay + hr;
			var valueInPixes = graphHeight * data[i];
			if (day == daysInWeek - 1) {
				valueInPixes = graphHeight * data[i - hoursPerDay];
			}

			points[i].animate({
				height : valueInPixes + "%",
				bottom : 0,
				left : i * pointWidthR + "%",
				width : pointWidth + "%"

			}, {
				duration : 300 + Math.round(i * transitionDuration / data.length),// Math.round(i
				// * 25 *
				// Math.random()),
				// easing : "easeOutElastic",// ,
				queue : true
			});

			if (day > 2 && hr == 3) {
				points[i].attr('class', "dot-selected");
			} else {
				points[i].attr('class', "dot");
			}

		}
	}

	for (var hr = 0; hr < daysInWeek; hr++) {
		vLabels[hr].show().attr('class', 'graph-label graph-label-left').text("Day" + (hr + 1)).animate({
			height : "100%",
			top : 0,
			left : hr * 100 / daysInWeek + "%",
			width : 100 / daysInWeek + "%"

		}, {
			duration : 300,// Math.round(i
			queue : true
		});
	}

	vLabels[daysInWeek].show().text("9:00AM").animate({
		left : pointWidth * 60 + "%",
		width : pointWidth + "%",
		height : "100%",
		top : 0,

	}, {
		duration : 300,
		queue : true
	}).attr('class', 'graph-label graph-label-bottom graph-label-selected');

	// $('#label-h-0').text("200 sessions").animate({
	// left : 0,
	// width : "100%",
	// height : "2em",
	// top : "auto",
	// bottom : (graphHeight * data[51]) + "%"
	// }, {
	// duration : 300,
	// queue : true
	// }).attr('class', 'graph-label graph-label-left graph-label-selected');

}

function updateGraph2(points) {
	var shiftLeft = 15;
	var containerWidth = 100 - shiftLeft;
	hideLabels();

	var containersAnimParam = {
		duration : 1000,
		queue : true
	};

	$('#graphbody').animate({
		width : (100 - shiftLeft) + "%",// valueInPixes,
		height : "100%",
		bottom : 0,
		top : 0,
		right : 0,
		left : shiftLeft + "%"
	}, containersAnimParam);

	$('#labels-left').animate({
		width : "100%",// valueInPixes,
		height : "100%",
		top : 0,
		left : 0
	}, containersAnimParam);

	$('#labels-bottom').animate({
		width : (100 - shiftLeft) + "%",// valueInPixes,
		height : "100%",
		top : 0,
		left : shiftLeft + "%"
	}, containersAnimParam);

	var rowHeight = graphHeight / daysInWeek;

	for (var day = 0; day < daysInWeek; day++) {

		for (var hr = 0; hr < hoursPerDay; hr++) {
			var i = day * hoursPerDay + hr;

			var valueInPixes = 2 * (rowHeight * (data[i] - 0.3));

			points[i].animate({
				bottom : (daysInWeek - day - 1) * rowHeight + "%",// valueInPixes,
				height : valueInPixes + "%",
				left : (hr * 100 / hoursPerDay) + "%",
				width : (100 / hoursPerDay) + "%"
			}, {
				duration : 500 + Math.round(i * transitionDuration / data.length),
				queue : true
			});

			if (hr == 2 || day == daysInWeek - 1) {
				points[i].attr('class', "dot-selected");
			} else {
				points[i].attr('class', "dot");
			}

		}
	}

	var labelWidth = shiftLeft;

	for (var hr = 0; hr < hoursPerDay; hr++) {
		vLabels[hr].show().attr('class', 'graph-label graph-label-left').text(hr * (24 / hoursPerDay) + ":" + "00")
				.animate({
					height : "100%",
					top : 0,
					background : "red",
					left : hr * 100 / hoursPerDay + "%",
					width : 100 / hoursPerDay + "%"

				}, {
					duration : 300,// Math.round(i
					queue : true
				});
	}

	for (var day = 0; day < daysInWeek; day++) {
		hLabels[day].show().attr('class', 'graph-label graph-label-left').text("Day " + (day + 1)).animate({
			height : graphHeight / daysInWeek + "%",
			top : (day * (graphHeight / daysInWeek)) + "%",
			left : 0,
			width : "100%"

		}, {
			duration : 300 + Math.round(day * transitionDuration / data.length),// Math.round(i
			queue : true
		});
	}

	$('#label-h-' + (daysInWeek - 1)).text("Average").addClass("graph-label-selected");
	$('#label-v-' + 2).addClass("graph-label-selected");

};

function updateGraph2a(points) {
	var shiftLeft = 15;
	var containerWidth = 100 - shiftLeft;
	hideLabels();

	var containersAnimParam = {
		duration : 1000,
		queue : true
	};

	$('#graphbody').animate({
		width : (100 - shiftLeft) + "%",// valueInPixes,
		height : "100%",
		bottom : 0,
		top : 0,
		right : 0,
		left : shiftLeft + "%"
	}, containersAnimParam);

	$('#labels-left').animate({
		width : "100%",// valueInPixes,
		height : "100%",
		top : 0,
		left : 0
	}, containersAnimParam);

	$('#labels-bottom').animate({
		width : (100 - shiftLeft) + "%",// valueInPixes,
		height : "100%",
		top : 0,
		left : shiftLeft + "%"
	}, containersAnimParam);

	var rowHeight = graphHeight / daysInWeek;
	for (var hr = 0; hr < hoursPerDay; hr++) {
		for (var day = 0; day < daysInWeek; day++) {

			var i = day * hoursPerDay + hr;

			var valueInPixes = 2 * (100 * (data[i] - 0.3));

			points[i].animate({
				bottom : 0,// (daysInWeek - day - 1) * rowHeight + "%",//
				// valueInPixes,
				height : valueInPixes + "%",
				left : (hr * 100 / data.length) + "%",
				width : (85 / data.length) + "%"
			}, {
				duration : 500 + Math.round(i * transitionDuration / data.length),
				queue : true
			});

			if (hr == 2 || day == daysInWeek - 1) {
				points[i].attr('class', "dot-selected");
			} else {
				points[i].attr('class', "dot");
			}

		}
	}

	var labelWidth = shiftLeft;

	for (var hr = 0; hr < hoursPerDay; hr++) {
		vLabels[hr].show().attr('class', 'graph-label graph-label-left').text(hr * (24 / hoursPerDay) + ":" + "00")
				.animate({
					height : "100%",
					top : 0,
					background : "red",
					left : hr * 100 / hoursPerDay + "%",
					width : 100 / hoursPerDay + "%"

				}, {
					duration : 300,// Math.round(i
					queue : true
				});
	}

	for (var day = 0; day < daysInWeek; day++) {
		hLabels[day].show().attr('class', 'graph-label graph-label-left').text("Day " + (day + 1)).animate({
			height : graphHeight / daysInWeek + "%",
			top : (day * (graphHeight / daysInWeek)) + "%",
			left : 0,
			width : "100%"

		}, {
			duration : 300 + Math.round(day * transitionDuration / data.length),// Math.round(i
			queue : true
		});
	}

	$('#label-h-' + (daysInWeek - 1)).text("Average").addClass("graph-label-selected");
	$('#label-v-' + 2).addClass("graph-label-selected");

};

/**
 * week patterns
 * 
 * @param points
 */
function updateGraph3(points) {
	var datalen = 7 * numberOfWeeks;

	var pointWidth = 85.0 / datalen;
	var pointWidthR = 100.0 / datalen;

	var leftLabelsWidth = 0;

	hideLabels();

	var containersAnimParam = {
		duration : 200,
		queue : true
	};

	$('#graphbody').animate({
		width : "100%",// valueInPixes,
		height : "100%",
		bottom : 0,
		top : 0,
		left : 0,
		right : 0
	}, containersAnimParam);

	$('#labels-bottom').animate({
		width : (100 - leftLabelsWidth) + "%",
		height : "100%",
		top : 0,
		left : leftLabelsWidth + "%"
	}, containersAnimParam);

	$('#labels-left').animate({
		width : "100%",// valueInPixes,
		height : "100%",
		bottom : 0,
		left : 0,
	}, containersAnimParam);

	var widthStr = pointWidth + "%";

	for ( var i in data) {

		var valueInPixes = graphHeight * data[i];

		points[i].animate({
			height : valueInPixes + "%",
			bottom : 0,
			left : i * pointWidthR + "%",
			width : widthStr

		}, {
			duration : 300 + Math.round(i * transitionDuration / datalen),
			queue : true
		});

		if (i % 7 == 0 || i % 7 == 6) {
			points[i].attr('class', "dot-selected");
		} else {
			points[i].attr('class', "dot");
		}

	}

	for (var hr = 0; hr < numberOfWeeks; hr++) {
		vLabels[hr].show().attr('class', 'graph-label graph-label-left').text("Week" + (hr + 1)).animate({
			height : "100%",
			top : 0,
			left : (hr * pointWidthR * 7) + "%",
			width : (pointWidthR * 7) + "%"

		}, {
			duration : 300,// Math.round(i
			queue : true
		});
	}

	// vLabels[daysInWeek].show().text("9:00AM").animate({
	// left : pointWidth * 60 + "%",
	// width : pointWidth + "%",
	// height : "100%",
	// top : 0,
	//
	// }, {
	// duration : 300,
	// queue : true
	// }).attr('class', 'graph-label graph-label-bottom graph-label-selected');

}

function bindScrolling(points) {
	// init controller
	var controller = new ScrollMagic.Controller();

	// create a scene 1
	new ScrollMagic.Scene({
		triggerElement : "#scene-1"
	}) // pins the element for the the scene's duration
	.addTo(controller).on("enter leave", function(e) {
		updateGraph1(points);
	}); // assign the scene to the controller

	new ScrollMagic.Scene({
		triggerElement : "#scene-2"
	}) // pins the element for the the scene's duration
	.addTo(controller).on("enter leave", function(e) {
		updateGraph2a(points);
	}); // assign the scene to the controller

	new ScrollMagic.Scene({
		triggerElement : "#scene-3"
	}) // pins the element for the the scene's duration
	.addTo(controller).on("enter leave", function(e) {
		updateGraph3(points);
	}); // assign the scene to the controller
};

$(document).ready(function() {
	generateData1();
	generateData2();

	var graph1 = $("#Graph-1");

	var graphBody = $("<div>", {
		id : "graphbody",
		css : {
			"position" : "absolute",
			"width" : "100%",
			"bottom" : "0",
			"height" : "100%",
			"left" : 0
		}
	}).addClass('graph-body').appendTo(graph1);

	$("<div>", {
		id : "labels-left",
		css : {
			"position" : "absolute",
			"width" : "20%",
			"bottom" : "0",
			"height" : "100%",
			"left" : 0
		}
	}).appendTo(graph1);

	$("<div>", {
		id : "labels-bottom",
		css : {
			"position" : "absolute",
			"width" : "80%",
			"bottom" : "0",
			"height" : "100%",
			"left" : "20%"
		}
	}).appendTo(graph1);

	// alert(graph1);

	var pointWidth = 65.0 / data.length;
	var pointWidthR = 100.0 / data.length;
	var points = new Array();
	for ( var i in data) {
		// $('graph1').append('<div id="div'+ i +'" >d</div>');
		var valueInPixes = 5 * data[i] + "px";

		var div = $("<div>", {
			'class' : "dot",
			id : "graph-point-" + i,
			css : {
				"width" : pointWidth + "%",
				"bottom" : 0,
				"height" : 0,
				"left" : i * pointWidthR + "%"
			}
		});
		points.push(div);
		div.appendTo(graphBody);
	}

	createLabels();

	bindScrolling(points);
	// updateGraph1(points);

});

function hideLabels() {
	for ( var i in vLabels) {
		vLabels[i].hide();
	}
	;
	for ( var i in hLabels) {
		hLabels[i].hide();
	}
};

function createLabels() {
	var defaultCss = {
		"position" : "absolute",
		"bottom" : "50%",
		"height" : 0,
		width : 0,
		"left" : "50%"
	};

	var labelWidth = 100 / daysInWeek;
	var container = $('#labels-bottom');

	for (var i = 0; i < numberOfHLabels; i++) {
		var label = $("<div>", {
			id : "label-v-" + i,
			css : defaultCss,
			'class' : "graph-label graph-label-top",
		});

		// label.append("12:00 " + (i + 1));
		label.appendTo(container);

		vLabels.push(label);
	}
	// /////

	var container2 = $('#labels-left');
	for (var i = 0; i < numberOfHLabels; i++) {

		var label = $("<div>", {
			id : "label-h-" + i,
			css : defaultCss,
			'class' : "graph-label graph-label-left",
		});

		// label.append("day " + (i + 1));
		label.appendTo(container2);

		hLabels.push(label);
	}

	hideLabels();
}
