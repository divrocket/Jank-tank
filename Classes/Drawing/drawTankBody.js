import {ctx} from "../Canvas/ctx.js";
import {roundedRect} from "./roundedRect.js";
import {tank_cannon} from "../Config/tank_cannon.js";
import {tank} from "../Config/tank.js";

export function drawTankBody() {
	
	ctx.save();
	ctx.translate(tank_cannon.x, tank_cannon.y);  // Move to the tank center
	ctx.rotate(tank.angle);  // Rotate to the tank's angle
	ctx.strokeStyle = "rgb(77,55,55)";
	ctx.lineWidth = 3;
	
	// Attachment points
	let front = tank.attachmentPoints.front();
	let back = tank.attachmentPoints.back();
	let left = tank.attachmentPoints.left();
	let right = tank.attachmentPoints.right();
	
	// Glowing effect
	ctx.shadowColor = "#00ffff";
	ctx.shadowBlur = 6;
	
	// Front Armor
	ctx.fillStyle = "rgb(85,144,171)"
	roundedRect(ctx, left.x + 76, left.y - 25, 20, 50, 4);
	
	// Back Armor
	ctx.fillStyle = "rgb(85,144,171)"
	roundedRect(ctx, right.x - 95, right.y - 25, 20, 50, 4);
	
	
	// Left Armor
	ctx.fillStyle = "rgb(85,144,171)"
	roundedRect(ctx, front.x - tank.width / 2 + 10, front.y - 6, 73, 9, 2);
	
	// Right Armor
	ctx.fillStyle = "rgb(85,144,171)"
	roundedRect(ctx, back.x - tank.width / 2 + 10, back.y - 3.3, 73, 9, 2);
	

	
	// Main Body of the tank
	ctx.fillStyle = "rgb(85,144,171)"
	roundedRect(ctx, -tank.width / 2, -tank.height / 2, tank.width, tank.height, 10);
	ctx.shadowBlur = 0;
	// Upper Deck
	ctx.fillStyle = "rgb(85,92,171)"
	roundedRect(ctx, -tank.width / 3.4, (-tank.height / 4) - 5, (tank.width / 2) + 10, (tank.height / 2) + 10, 5);
	
	
	ctx.restore(); // Restores the canvas state
}