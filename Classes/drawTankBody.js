import {ctx} from "./ctx.js";
import {roundedRect} from "./roundedRect.js";
import {tank_cannon} from "./tank_cannon.js";
import {tank} from "./tank.js";

export function drawTankBody() {
	
	ctx.save();
	ctx.translate(tank_cannon.x, tank_cannon.y);  // Move to the tank center
	ctx.rotate(tank.angle);  // Rotate to the tank's angle
	ctx.fillStyle = "darkgrey";
	ctx.strokeStyle = "#000";
	ctx.lineWidth = 2;
	
	
	ctx.fillStyle = "#1e2f52";
	// Side Armor
	roundedRect(ctx, -tank.width + 60, -tank.height / 2 - 4, (tank.width / 2) + 15, 4, 1);
	
	ctx.fillStyle = "#1e2f52";
	// Left Armor
	roundedRect(ctx, +tank.width - 120, +tank.height / 2, (tank.width / 2) + 15, 4, 1);
	
	ctx.fillStyle = "rgba(96,107,97,1)";
	// Main Body of the tank
	roundedRect(ctx, -tank.width / 2, -tank.height / 2, tank.width, tank.height, 10);
	
	ctx.fillStyle = "rgba(73,96,78,1)";
	// Upper Deck
	roundedRect(ctx, -tank.width / 3.4, (-tank.height / 4) - 5, (tank.width / 2) + 10, (tank.height / 2) + 10, 5);
	
	// Additional armor or details can be added similarly
	
	ctx.restore();
}