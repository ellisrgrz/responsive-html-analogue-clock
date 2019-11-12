class Clock {

	constructor(clockMargin, viewportWidthCenter, viewportHeightCenter) {
		this.viewportWidthCenter = viewportWidthCenter;
		this.viewportHeightCenter = viewportHeightCenter;
		this.clockSize = (this.viewportWidthCenter > this.viewportHeightCenter ? this.viewportHeightCenter : this.viewportWidthCenter) - clockMargin;
	}

	draw(elementToDrawWithin, clockCenterElement) {

		clockCenterElement.style.left = `${viewportWidthCenter - 20}px`;
		clockCenterElement.style.top = `${viewportHeightCenter - 20}px`;

		for (var i = 0; i < 60; i++) {
			var size = (i % 5 === 0) ? 12 : 6;
			var color = (i % 5 === 0) ? '#eee' : '#999';
			if (i % 15 === 0) {
				size = 18;
			}
			var hourMark = new HourMark(6 * i, size, this.clockSize, this.viewportWidthCenter, this.viewportHeightCenter, color);
			hourMark.draw(elementToDrawWithin);
		}

		return this.clockSize;
	}
}