import { Element, Frame } from "./element.js";
import { Template } from "./template.js";

export function defaultElements(width, height) {
	let defaultFrameL = new Frame("RAMA", 10, 10, "Brown");
	let defaultFrameR = new Frame("RAMA", 10, 10, "Brown");

	let Lwidth = width / 2 - 2 * defaultFrameL.width;
	var templateA = new Template("TempalteA", width, height, [
		new Element(
			"WINDOW_L",
			"WINDOW",
			defaultFrameL.width,
			height / 3,
			Lwidth,
			(height * 1) / 3,
			"#00A2ED",
			defaultFrameL,
			0,
			0
		),
		new Element(
			"WINDOW_R",
			"WINDOW",
			3 * defaultFrameL.width + Lwidth,
			height / 3,
			width / 2 - 2 * defaultFrameR.width,
			(height * 1) / 3,
			"#00A2ED",
			defaultFrameR,
			0,
			1
		),
	]);
	return templateA;
}
