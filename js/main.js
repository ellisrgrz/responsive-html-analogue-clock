// A polyfill for browsers that not support requestAnimFrame
window.requestAnimFrame = (function () {
	return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function (callback, element) {
			window.setTimeout(callback, 1000 / 50.125);
		};
})();

var resized = false;

window.addEventListener('resize', function () {
	resized = true;
});

// The margin between smallest border of the document and the clock in pixels
var clockMargin = 50;

// The html element to draw the time marks within
var hourMarksContainerElement = document.getElementsByClassName('hourMarks')[0];

// Get the clock center element from the DOM
var clockCenterElement = document.getElementsByClassName('clockCenter')[0];

var clock = null;
var clockSize = 0;

var lastSecond = null;
var lastMinute = null;
var lastHour = null;

// The width and the height of the document
var viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
var viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

// The center points of the document
var viewportWidthCenter = parseInt(viewportWidth / 2);
var viewportHeightCenter = parseInt(viewportHeight / 2);

function drawClock() {
	// Create the background clock
	clock = new Clock(clockMargin, viewportWidthCenter, viewportHeightCenter);

	while (clockCenterElement.firstChild) {
		clockCenterElement.removeChild(clockCenterElement.firstChild);
	}

	while (hourMarksContainerElement.firstChild) {
		hourMarksContainerElement.removeChild(hourMarksContainerElement.firstChild);
	}

	// Draw the background and save the returned clock size
	clockSize = clock.draw(hourMarksContainerElement, clockCenterElement);

	// States for the drawing part, to know when to redraw and when not.
	lastSecond = new LineState(0, null);
	lastMinute = new LineState(0, null);
	lastHour = new LineState(0, null);
}

drawClock();

var lineSpaceElement = document.getElementsByClassName('lineSpace')[0];

var secondClockPointer = null;
var minuteClockPointer = null;
var hourClockPointer = null;

// Lets animate this piece of shit
function animate() {

	if (resized === true) {
		// The width and the height of the document
		viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
		viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

		// The center points of the document
		viewportWidthCenter = parseInt(viewportWidth / 2);
		viewportHeightCenter = parseInt(viewportHeight / 2);
		drawClock();
		resized = false;
	}

	// Calculate the angles for the second, minute and hour clock pointers.
	var second = (new Date()).getSeconds();

	// Put a css class, every fifth second, on the div containing the background, in order to do a pulsing css animation
	var el = document.getElementsByClassName('hourMarks')[0];
	if (second % 5 === 0) {
		if (el.className.indexOf(' morph') < 0)
			el.className += ' morph';
	} else {
		el.className = el.className.replace(/ morph/i, '');
	}

	var secondAngle = second * 6 - 89;
	var minutes = (new Date()).getMinutes();
	var minuteAngle = minutes * 6 - 89;
	var hourAngle = (new Date()).getHours() * 30 - 90 + ((minutes) / 60) * 30;

	// Create a new clock pointer for seconds
	if (!secondClockPointer) {
		secondClockPointer = new ClockPointer(secondAngle, lastSecond.lastAngle, lastSecond.lastLine, 0.10, 2);
	} else {
		secondClockPointer.move(secondAngle, lastSecond.lastAngle, lastSecond.lastLine);
	}

	// And draw it and then save the state of the pointer
	lastSecond.lastLine = secondClockPointer.draw(lineSpaceElement);


	// Create a new clock pointer for minutes
	if (!minuteClockPointer) {
		minuteClockPointer = new ClockPointer(minuteAngle, lastMinute.lastAngle, lastMinute.lastLine, 0.30, 4);
	} else {
		minuteClockPointer.move(minuteAngle, lastMinute.lastAngle, lastMinute.lastLine);
	}

	// And draw it and then save the state of the pointer
	lastMinute.lastLine = minuteClockPointer.draw(lineSpaceElement);

	// Create a new clock pointer for hours
	if (!hourClockPointer) {
		hourClockPointer = new ClockPointer(hourAngle, lastHour.lastAngle, lastHour.lastLine, 0.45, 8);
	}
	else {
		hourClockPointer.move(hourAngle, lastHour.lastAngle, lastHour.lastLine);
	}

	// And draw it and then save the state of the pointer
	lastHour.lastLine = hourClockPointer.draw(lineSpaceElement);

	// Request another frame
	window.requestAnimFrame(animate);
}

// And let's do it!
animate();