import {canvas, ctx} from "./ctx.js";

const backgroundImage = new Image();
backgroundImage.src = 'assets/battleground.png'; // Replace with the path to your background image

export function drawBackgroundImage() {
	ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height); // This will stretch or shrink the image to fit the canvas
}