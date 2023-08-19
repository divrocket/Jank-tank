import {ctx} from "./ctx.js";
import {roundedRect} from "./roundedRect.js";
import {tank_cannon} from "./tank_cannon.js";
import {tank} from "./tank.js";

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
	
	ctx.fillStyle = "rgb(84,30,30)"
// Side Armor (renamed for clarity)
	roundedRect(ctx, left.x + 52, left.y - 3, (tank.width / 2) + 30, 5, 4);
	
	ctx.fillStyle = "rgb(65,21,21)"
// Left Armor (renamed for clarity)
	roundedRect(ctx, right.x - 128, right.y - 2, (tank.width / 2) + 30, 5, 4);
	
	ctx.fillStyle = "#A84141"
// Main Body of the tank
	roundedRect(ctx, -tank.width / 2, -tank.height / 2, tank.width, tank.height, 10);
	
	ctx.fillStyle = "#622525"
// Upper Deck
	roundedRect(ctx, -tank.width / 3.4, (-tank.height / 4) - 5, (tank.width / 2) + 10, (tank.height / 2) + 10, 5);
	
	ctx.fillStyle = "rgb(84,30,30)"
// Front Armor
	roundedRect(ctx, front.x - tank.width / 2, front.y - 8, tank.width, 5, 4);
	
	ctx.fillStyle = "rgb(65,21,21)"
// Back Armor
	roundedRect(ctx, back.x - tank.width / 2, back.y + 3, tank.width, 5, 4);
	
	ctx.restore(); // Restores the canvas state
	
	
}