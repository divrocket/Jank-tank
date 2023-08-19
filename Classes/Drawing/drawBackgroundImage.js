import { canvas, ctx } from "../Canvas/ctx.js";

// 1. Create a small offscreen canvas for pixel art
const pixelCanvas = document.createElement('canvas');
const pixelCtx = pixelCanvas.getContext('2d');
pixelCanvas.width = canvas.width / 10;  // Scaling factor of 10x (for example)
pixelCanvas.height = canvas.height / 10;

// Generate the pixel art details
function generatePixelArtBG() {
	// Fill with deep space color
	pixelCtx.fillStyle = "rgb(10,10,25)";  // Deep space blue
	pixelCtx.fillRect(0, 0, pixelCanvas.width, pixelCanvas.height);
	
	// Draw pixelated stars
	for (let i = 0; i < pixelCanvas.width * pixelCanvas.height / 50; i++) {  // Adjust the frequency of stars by changing the divisor
		const x = Math.floor(Math.random() * pixelCanvas.width);
		const y = Math.floor(Math.random() * pixelCanvas.height);
		pixelCtx.fillStyle = "rgba(255, 255, 255, 0.2)";  // White color for stars
		pixelCtx.fillRect(x, y, 1, 1);  // 1x1 pixel star
	}
}

export function drawBackgroundImage() {
	// 3. Draw this offscreen canvas onto the main canvas, scaling up
	ctx.imageSmoothingEnabled = false;  // This ensures the pixelated look is retained
	ctx.drawImage(pixelCanvas, 0, 0, canvas.width, canvas.height);
}

generatePixelArtBG();  // Generate once when the module is loaded
