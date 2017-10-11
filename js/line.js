class Line {

	/* Private methods */
	_calculateTransform(ax, ay, bx, by) {
		this.ax = ax;
		this.ay = ay;
		this.bx = bx;
		this.by = by;

		// TODO: Examine if this could be implemented in another way, so the lines could be used together with css animations without any problem.
		if (ax > bx) {
			this.bx = this.ax + this.bx;
			this.ax = this.bx - this.ax;
			this.bx = this.bx - this.ax;
			this.by = this.ay + this.by;
			this.ay = this.by - this.ay;
			this.by = this.by - this.ay;
		}

		// Calc the angle to transform the div with
		this.angle = -(Math.atan((this.ay - this.by) / (this.bx - this.ax)) * 180 / Math.PI);
	}

	constructor(ax, ay, bx, by, width = 1) {
		this._calculateTransform(ax, ay, bx, by);

		// TODO: Handle the width togeteher with the position to compensate (this will be obvious when using larger numbers for the width).
		this.width = width + 'px';
		this.lineDiv = null;
	}

	draw(elementToDrawWithin) {
		if (!this.lineDiv) {
			this.lineDiv = document.createElement('div');
			elementToDrawWithin.appendChild(this.lineDiv);
			this.lineDiv.className = 'lineStyle';
		}
		// This is confusing, but it's correct. The lines height in css will be the viewed width of lines width
		this.lineDiv.style.height = this.width;
		this.lineDiv.style.left = this.ax + 'px';
		this.lineDiv.style.top = this.ay + 'px';
		this.lineDiv.style.width = Math.sqrt((this.ax - this.bx) * (this.ax - this.bx) + (this.ay - this.by) * (this.ay - this.by)) + 'px';
		this.lineDiv.style.transform = ['rotate(', this.angle, 'deg)'].join('');

		return this.lineDiv;
	}

	move(ax, ay, bx, by) {
		this._calculateTransform(ax, ay, bx, by);
	}

}