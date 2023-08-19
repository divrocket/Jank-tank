import {canvas, ctx} from "../Canvas/ctx.js";
import {score} from "../CollectionManagement/score.js";
export function displayScore() {
	ctx.font = "24px Arial"; // Set the font size and style
	ctx.fillStyle = "white"; // Choose a color that contrasts with your background
	ctx.textAlign = "left";
	
	// Display the score in the top-right corner of the canvas
	ctx.fillText("Score: " + score, canvas.width - 160, 40);
	// ctx.fillText("Score: " + score, 10, 30); // Display the score in the top-left corner of the canvas
}