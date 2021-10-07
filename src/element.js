export class Element {
	drawSVG;
	SVGObject;
	template;

	constructor(n, t, x, y, w, h, c, f, ri, ci, fixedSide) {
		this.name = n;
		this.type = t;
		this.width = w;
		this.height = h;
		this.innerColor = c;
		this.frames = f;
		this.x = x;
		this.y = y;
		this.rowIndex = ri;
		this.columnIndex = ci;
		this.fixedSide = fixedSide;
	}

	draw(draw) {
		if (draw) {
			this.drawSVG = draw;
		}
		this.frames.draw(this.drawSVG, this.x, this.y, this.width, this.height);
		let aux = this.drawSVG.rect({
			x: this.x,
			y: this.y,
			width: this.width,
			height: this.height,
			fill: this.innerColor,
			stroke: "black",
		});
		this.SVGObject = aux;
	}

	setTemplate(t) {
		this.template = t;
	}
	getController() {
		let label = document.createElement("label");
		label.innerHTML = this.name;

		let widthInput = document.createElement("input");
		widthInput.placeholder = "WIDTH";

		let heightInput = document.createElement("input");
		heightInput.placeholder = "HEIGHT";

		let frameWidthInput = document.createElement("input");
		frameWidthInput.placeholder = "FRAME WIDTH";

		let frameHeightInput = document.createElement("input");
		frameHeightInput.placeholder = "FRAME HEIGHT";

		let btn = document.createElement("button");
		btn.innerHTML = "RENDER";
		btn.addEventListener("click", (e) => {
			e.preventDefault();

			let newWidth = parseInt(widthInput.value);
			let newHeight = parseInt(heightInput.value);
			let newFramesHeight = parseInt(frameHeightInput.value);
			let newFramesWidth = parseInt(frameWidthInput.value);

			this.reposition(newWidth, newHeight, newFramesWidth, newFramesHeight);
			this.width = newWidth;
			this.height = newHeight;
			this.frames.width = newFramesWidth;
			this.frames.height = newFramesHeight;

			this.checkOverFlow();
			this.clear();
			this.SVGObject.attr({ fill: "red" });
			this.draw(this.drawSVG);
		});

		let div = document.createElement("div");
		div.id = "individualForm";
		div.appendChild(label);

		div.appendChild(widthInput);
		div.appendChild(heightInput);
		div.appendChild(frameWidthInput);
		div.appendChild(frameHeightInput);
		div.appendChild(btn);

		return div;
	}
	checkOverFlow() {
		this.template.checkOverFlow();
	}

	reposition(newWidth, newHeight, newFrameWidth, newFrameHeight) {
		if (this.fixedSide == "RIGHT") {
			this.x -= newWidth - this.width;
			this.y -= newHeight - this.height;
			this.y -= newFrameHeight - this.frames.height;
		} else if (this.fixedSide == "LEFT" || this.fixedSide == "RIGHT_LEFT") {
			this.triggerNextElementReposition(this.width - newWidth);

			this.y += this.height - newHeight;

			if (newFrameWidth > this.frames.width) {
				this.x += newFrameWidth - this.frames.width;
			}
			if (newFrameWidth < this.frames.width) {
				this.x -= this.frames.width - newFrameWidth;
			}
		}
	}
	triggerNextElementReposition(distance) {
		//triggers next element to reposition.
		this.template.reposition(this, distance);
	}
	redraw() {
		this.clear();
		this.draw();
	}
	clear() {
		this.frames.clear();
		this.SVGObject.remove();
	}
}

export class Frame {
	constructor(t, w, h, c) {
		this.type = t;
		this.width = w;
		this.height = h;
		this.color = c;
		this.SVGObject;
	}
	draw(draw, x, y, width, height) {
		let frame = draw.rect({
			x: x - this.width,
			y: y - this.height,
			width: width + 2 * this.width,
			height: height + 2 * this.height,
			fill: "#848789",
			stroke: "black",
		});
		this.SVGObject = frame;
	}
	clear() {
		this.SVGObject.remove();
	}
}
