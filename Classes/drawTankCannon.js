import {ctx} from "./ctx.js";
import {roundedRect} from "./roundedRect.js";
import {tank_cannon} from "./tank_cannon.js";
import {tank} from "./tank.js";

export function drawTankCannon() {
	ctx.save();
	
	// Positioning the cannon based on the tank's coordinates and rotation
	ctx.translate(tank_cannon.x, tank_cannon.y);
	ctx.rotate(tank.angle + tank_cannon.angle);
	
	// Drawing the cannon base
	ctx.fillStyle = "rgb(148,58,58)";
	ctx.strokeStyle = "#481c1c"; // Stroke color
	ctx.lineWidth = 3; // Line width for the stroke
	roundedRect(ctx, -tank_cannon.size / 2, -tank_cannon.size / 2, tank_cannon.size, tank_cannon.size, 25);  // Adjust the radius as needed
	
	// Drawing the elongated cannon part
	const arrowLength = 35;
	const arrowHeight = 15;
	ctx.fillStyle = "rgb(148,58,58)";
	// Assuming you want rounded corners for the cannon's elongated part, you can adjust the radius as needed
	roundedRect(ctx, tank_cannon.size / 2, -arrowHeight / 2, arrowLength, arrowHeight, 2);
	
	ctx.restore();
}