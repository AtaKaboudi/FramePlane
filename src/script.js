import { Element, Frame } from "./element.js";
import { defaultElements } from "./default.js";
const DOM_CANVAS = document.getElementById("canvas");
const DOM_CONTROLLER = document.getElementById("controllerForm");
let DOM_TEMPLATE_SELECT = document.getElementById("templateSelect");

var draw = SVG().addTo(DOM_CANVAS).size(1000, 1000);
let MAX_WIDTH = DOM_CANVAS.offsetWidth;
let MAX_HEIGHT = DOM_CANVAS.offsetHeight;

let templates = defaultElements(MAX_WIDTH, MAX_HEIGHT);
/*
templates.forEach((template) => {
	template.renderController(DOM_TEMPLATE_SELECT, DOM_CONTROLLER, draw);
});
*/
console.log(templates);
templates[1].renderController(DOM_TEMPLATE_SELECT, DOM_CONTROLLER, draw);
document
	.getElementById("individualTemplateOption")
	.addEventListener("click", (e) => {
		console.log(e.target.value);
		/*template.elements.forEach((element) => {
			element.draw(draw);
			let individualController = element.getController();
			DOM_CONTROLLER.appendChild(individualController);
		});
		*/
	});
