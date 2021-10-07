export class Template {
	constructor(n, width, height, elements) {
		this.name = n;
		this.elements = elements;
		this.width = width;
		this.height = height;
		this.snapshot;
		this.instanciateTemplateInChildren();
	}
	instanciateTemplateInChildren() {
		this.elements.forEach((e) => {
			e.setTemplate(this);
		});
	}
	resize(rowIndex, columnIndex) {
		let row = [];
		let column = [];
		let cumulativeWidth = 0;
		let cumulativeHeight = 0;
		this.elements.forEach((e) => {
			if (e.rowIndex == rowIndex) {
				row.push(e);
				cumulativeWidth += e.width;
			}
			if (columnIndex == e.columnIndex) {
				column.push(e);
				cumulativeHeight += e.height;
			}
		});
		if (cumulativeWidth > this.width) {
			console.log(cumulativeWidth, this.width);
			this.updateElementsWidth(cumulativeWidth, row);
		}
		if (cumulativeHeight > this.height) {
			console.log("b");
		}
	}
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
	getController() {
		let options = [
			["Tempalte A", "../assets/templateA.png"],
			["Template B", "-"],
			["Template C", "-"],
		];
		let select = document.createElement("div");
		select.id = "templateSelect";

		let title = document.createElement("label");
		title.innerHTML = "Template :";
		select.appendChild(title);

		options.forEach((e) => {
			let option = document.createElement("div");

			let label = document.createElement("label");
			label.innerHTML = e[0];

			let image = document.createElement("img");
			image.src = e[1];
			image.id = "tempalteSnapshot";

			option.appendChild(image);
			option.appendChild(label);
			select.appendChild(option);
		});

		return select;
	}
}
