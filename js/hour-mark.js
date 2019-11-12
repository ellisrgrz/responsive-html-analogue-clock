class HourMark {

	constructor(angle, size, clockSize, viewportWidthCenter, viewportHeightCenter, color) {
		this.angle = angle;
		this.size = size;
		this.color = color;
		this.clockSize = clockSize;
		this.viewportWidthCenter = viewportWidthCenter;
		this.viewportHeightCenter = viewportHeightCenter;
	}

	draw(elementToDrawWithin) {
		var newDiv = document.createElement('div');
		newDiv.className = 'hourMark';

		newDiv.style.backgroundColor = this.color;

		newDiv.style.width = `${this.size}px`;
		newDiv.style.height = `${this.size}px`;
		var offset = parseInt(this.size / 2);

		newDiv.style.left = `${this.viewportWidthCenter - offset + this.clockSize * Math.cos(this.angle * (Math.PI / 180))}px`;
		newDiv.style.top = `${this.viewportHeightCenter - offset + this.clockSize * Math.sin(this.angle * (Math.PI / 180))}px`;

		elementToDrawWithin.appendChild(newDiv);
	}
}