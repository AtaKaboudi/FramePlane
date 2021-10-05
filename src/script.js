import { Element, Frame } from "./element.js";
import { Template } from "./template.js";
import { defaultElements } from "./default.js";
const DOM_CANVAS = document.getElementById("canvas");
const DOM_CONTROLLER = document.getElementById("controllerForm");
var draw = SVG().addTo(DOM_CANVAS).size(1000, 1000);
let MAX_WIDTH = DOM_CANVAS.offsetWidth;
let MAX_HEIGHT = DOM_CANVAS.offsetHeight;

let template = defaultElements(MAX_WIDTH, MAX_HEIGHT);

DOM_CONTROLLER.appendChild(template.getController());

document.getElementById("templateSelect").addEventListener("click", () => {
	template.elements.forEach((element) => {
		element.draw(draw);
		let individualController = element.getController();
		console.log(individualController);

		DOM_CONTROLLER.appendChild(individualController);
	});
});

/*
let windowWidth;
let windowHeight;
let frameWidth;
let frameHeight;
let frameColor;
var window = draw.rect();
var frame = draw.rect();
const MAXWIDTH = window.innerWidth;
const MAXHEIGHT = window.innerHeight;
document.getElementById("windowWidth").addEventListener("change", (e) => {
	windowWidth = parseInt(e.target.value);
	draw.clear();

	if (frameHeight) {
		console.log("drawing Frame");
		drawFrame();
	}
	if (windowHeight) {
		console.log("drawing window");
		drawWindow();
	}
});
document.getElementById("windowHeight").addEventListener("change", (e) => {
	windowHeight = parseInt(e.target.value);
	draw.clear();
*
	if (frameWidth) {
		drawFrame();
	}
	if (windowWidth) {
		drawWindow();
	}
});
document.getElementById("frameWidth").addEventListener("change", (e) => {
	frameWidth = parseInt(e.target.value);
	if (frameHeight) {
		draw.clear();
		drawFrame();
		drawWindow();
	}
});

document.getElementById("frameHeight").addEventListener("change", (e) => {
	frameHeight = parseInt(e.target.value);
	draw.clear();

	drawFrame();
	drawWindow();
});
document.getElementById("material").addEventListener("change", (e) => {
	if (e.target.value == "aluminium") {
		frameColor = "#848789";
	} else if (e.target.value == "wood") {
		frameColor = "#BA8C63";
		console.log("wii");
	} else {
		frameColor = "#848789";
	}
	draw.clear();
	if (frameHeight) {
		drawFrame();
	}
	if (windowHeight) {
		drawWindow();
	}
});

function drawWindow() {
	window = draw.rect({
		x: 200,
		y: 200,
		width: windowWidth,
		height: windowHeight,
		fill: "#00A2ED",
		stroke: "black",
	});
}
function drawFrame() {
	frame = draw.rect({
		x: 200 - frameWidth,
		y: 200 - frameHeight,
		width: windowWidth + 2 * frameWidth,
		height: windowHeight + 2 * frameHeight,
		fill: frameColor,
		stroke: "black",
	});
}
*/
