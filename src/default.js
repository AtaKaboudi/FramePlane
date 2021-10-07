import { Element, Frame } from "./element.js";
import { Template } from "./template.js";

export function defaultElements(width, height) {
	let defaultFrameL = new Frame("RAMA", 10, 10, "Brown");
	let defaultFrameR = new Frame("RAMA", 10, 10, "Brown");
	let defaultFrameC = new Frame("RAMA", 10, 10, "Brown");
	let Lwidth = width / 2 - 2 * defaultFrameL.width;
	var templateA = new Template(
		"TempalteA",
		width,
		height,
		"../assets/templateA.png",
		[
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
				0,
				"RIGHT"
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
				1,
				0,
				"LEFT"
			),
		]
	);

	var templateB = new Template(
		"templateB",
		width,
		height,

		"../assets/3_Panel_Slider.jfif",
		[
			new Element(
				"WINDOW_L",
				"SLIDER_WINDOW",
				defaultFrameL.width,
				height / 3,
				(width - 2 * defaultFrameL.width) / 4,
				height / 3,
				"#00A2ED",
				defaultFrameL,
				0,
				0,
				"RIGHT"
			),
			new Element(
				"WINDOW_C",
				"WINDOW",
				(5 * defaultFrameL.width) / 3 + width / 4 + defaultFrameC.width,
				height / 3,
				((width - defaultFrameL.width) * 2) / 5,
				height / 3,
				"#00A2ED",
				defaultFrameC,
				1,
				0,
				"RIGHT_LEFT"
			),
			new Element(
				"WINDOW_R",
				"SLIDER_WINDOW",
				(width / 7) * 5 - defaultFrameL.width,
				height / 3,
				(width - 2 * defaultFrameR.width) / 4,
				height / 3,
				"#00A2ED",
				defaultFrameR,
				2,
				0,
				"LEFT"
			),
		]
	);
	return [templateA, templateB];
}
