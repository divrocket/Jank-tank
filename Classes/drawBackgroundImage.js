import { canvas, ctx } from "./ctx.js";

// 1. Create a small offscreen canvas for pixel art
const pixelCanvas = document.createElement('canvas');
const pixelCtx = pixelCanvas.getContext('2d');
pixelCanvas.width = canvas.width / 10;  // Scaling factor of 10x (for example)
pixelCanvas.height = canvas.height / 10;

// Generate the pixel art details
function generatePixelArtBG() {
	// Fill with base sand color
	pixelCtx.fillStyle = "rgb(237,201,175)";
	pixelCtx.fillRect(0, 0, pixelCanvas.width, pixelCanvas.height);
	
	// Draw some pixelated details, e.g. darker sand speckles
	for (let i = 0; i < pixelCanvas.width * pixelCanvas.height / 10; i++) {
		const x = Math.floor(Math.random() * pixelCanvas.width);
		const y = Math.floor(Math.random() * pixelCanvas.height);
		pixelCtx.fillStyle = "rgba(220, 169, 127, 0.3)";  // Slightly darker sand color
		pixelCtx.fillRect(x, y, 1, 1);  // 1x1 pixel speckles
	}
}

export function drawBackgroundImage() {
	// 3. Draw this offscreen canvas onto the main canvas, scaling up
	ctx.imageSmoothingEnabled = false;  // This ensures the pixelated look is retained
	ctx.drawImage(pixelCanvas, 0, 0, canvas.width, canvas.height);
}

generatePixelArtBG();  // Generate once when the module is loaded
