class ClockPointer {

	constructor(angle, lastAngle, lastLine, lengthPercentMinus, width) {
		this.angle = angle;
		this.lastAngle = lastAngle;
		this.lastLine = lastLine;
		this.lengthPercentMinus = lengthPercentMinus;
		this.width = width;
		this.line = null;
	}

	draw(elementToDrawWithin) {

		if (this.angle !== this.lastangle) {

			if (this.line) {
				this.line.move(
					viewportWidthCenter,
					viewportHeightCenter,
					viewportWidthCenter + (clockSize - (clockSize * this.lengthPercentMinus)) * Math.cos(this.angle * (Math.PI / 180)),
					viewportHeightCenter + (clockSize - (clockSize * this.lengthPercentMinus)) * Math.sin(this.angle * (Math.PI / 180))
				);
			} else {
				this.line = new Line(
					viewportWidthCenter,
					viewportHeightCenter,
					viewportWidthCenter + (clockSize - (clockSize * this.lengthPercentMinus)) * Math.cos(this.angle * (Math.PI / 180)),
					viewportHeightCenter + (clockSize - (clockSize * this.lengthPercentMinus)) * Math.sin(this.angle * (Math.PI / 180)),
					this.width
				);
			}

			this.lastLine = this.line.draw(elementToDrawWithin);

		}
		return this.lastLine;
	}

	move(angle, lastAngle, lastLine) {
		this.angle = angle;
		this.lastAngle = lastAngle;
		this.lastLine = lastLine;
	}

}