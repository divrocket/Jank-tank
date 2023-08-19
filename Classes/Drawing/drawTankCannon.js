import {ctx} from "../Canvas/ctx.js";
import {roundedRect} from "./roundedRect.js";
import {tank_cannon} from "../Config/tank_cannon.js";
import {tank} from "../Config/tank.js";

export function drawTankCannon() {
	ctx.save();
	
	// // Glowing effect
	// ctx.shadowColor = "#00ffff";
	// ctx.shadowBlur = 6;
	
	// Positioning the cannon based on the tank's coordinates and rotation
	ctx.translate(tank_cannon.x, tank_cannon.y);
	ctx.rotate(tank.angle + tank_cannon.angle);
	
	// Drawing the cannon base
	ctx.fillStyle = "rgb(85,144,171)"
	ctx.strokeStyle = "#481c1c"; // Stroke color
	ctx.lineWidth = 3; // Line width for the stroke
	roundedRect(ctx, -tank_cannon.size / 2, -tank_cannon.size / 2, tank_cannon.size, tank_cannon.size, 25);  // Adjust the radius as needed
	
	// Drawing the elongated cannon part
	const arrowLength = 35;
	const arrowHeight = 12;
	ctx.fillStyle = "rgb(85,144,171)"
	
	// Assuming you want rounded corners for the cannon's elongated part, you can adjust the radius as needed
	roundedRect(ctx, tank_cannon.size / 2, -arrowHeight / 2, arrowLength, arrowHeight, 3);
	
	ctx.restore();
}