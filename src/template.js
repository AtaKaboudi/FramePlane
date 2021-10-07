export class Template {
	constructor(n, width, height, snp, elements) {
		this.name = n;
		this.elements = elements;
		this.width = width;
		this.height = height;
		this.snapshot = snp;
		this.instanciateTemplateInChildren();
	}
	instanciateTemplateInChildren() {
		this.elements.forEach((e) => {
			e.setTemplate(this);
		});
	}
	resize(rowIndex, columnIndex) {}
	updateElementsWidth(totalElementsWidth, row) {
		row.forEach((e, i) => {
			e.width = (e.width / totalElementsWidth) * this.width - e.frames.width;
			if (row[i + 1]) {
				e.reposition(2);
			}
			e.redraw();
		});
	}
	repositionElement(element, direction) {
		if (direction == "RIGHT") {
			this.elements.forEach((e) => {
				if (
					e.rowIndex == element.rowIndex + 1 &&
					e.columnIndex == element.columnIndex
				) {
					element.x =
						e.x - e.frames.width - element.width - element.frames.width;
					element.y =
						e.y +
						e.height +
						e.frames.height -
						element.height -
						element.frames.height;
					element.redraw();
				}
			});
		}
	}
	renderController(DOM_SELECT, DOM_CONTROLLER, draw) {
		let option = document.createElement("div");
		option.id = "individualTemplateOption";
		option.value = this.name;
		let label = document.createElement("label");
		label.innerHTML = this.name;

		let image = document.createElement("img");
		image.src = this.snapshot;
		image.id = "tempalteSnapshot";

		//	option.addEventListener("click", () => {
		this.elements.forEach((e) => {
			e.draw(draw);
			let individualController = e.getController();
			DOM_CONTROLLER.appendChild(individualController);
		});
		//	});
		option.appendChild(image);
		option.appendChild(label);

		DOM_SELECT.appendChild(option);
	}
	reposition(trigger, distance) {
		console.log(distance);
		this.elements.forEach((e) => {
			if (
				e.rowIndex > trigger.rowIndex &&
				e.columnIndex == trigger.columnIndex
			) {
				e.x -= distance;
				e.redraw();
			}
		});
	}
	checkOverFlow() {
		//Resizes all elements in case of overFlow
		// retreives widths and Heights according Columnindex and RownIndex
		let cumulativeWidth = [0, 0, 0, 0];
		let cumulativeHeight = [0, 0, 0, 0];
		this.elements.forEach((e) => {
			cumulativeWidth[e.columnIndex] += e.width + 2 * e.frames.width;
			cumulativeHeight[e.rowIndex] += e.height + 2 * e.frames.height;
		});

		cumulativeWidth.forEach((w, i) => {
			if (w > this.width) {
				resizeOnOverflow(i);
			}
		});
		cumulativeHeight.forEach((h, i) => {
			if (h > this.height) {
				resizeOnOverflow(i);
			}
		});
	}
}
