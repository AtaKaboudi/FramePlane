export class Element {
	drawSVG;
	SVGObject;
	template;

	constructor(n, t, x, y, w, h, c, f, ri, ci) {
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

			this.width = parseInt(widthInput.value);
			this.height = parseInt(heightInput.value);
			this.frames.height = parseInt(frameHeightInput.value);
			this.frames.width = parseInt(frameWidthInput.value);
			console.log(
				this.width,
				this.height,
				this.frames.height,
				this.frames.width
			);
			this.clear();

			this.SVGObject.attr({ fill: "red" });
			console.log(this.x, this.y);
			debugger;
			this.reposition(2);
			this.resize();
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
	reposition(siblingIndex) {
		//on Input change repositioning is sometimes requried relative to other elements displayed
		let sibling = this.drawSVG.get(0);
		this.x = sibling.x() - this.frames.width - this.width;
		this.y = sibling.y() + sibling.height() - this.height - this.frames.height;
		this.clear();
		this.draw();
	}
	resize() {
		// triggers template resize if input exeeds present maxwidth and max height;
		this.template.resize(this.rowIndex, this.columnIndex);
	}
	redraw(color) {
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
