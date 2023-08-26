import {ctx} from "../Canvas/ctx.js";
import {drawRoundedRect} from "./drawRoundedRect.js";
import {tank_cannon} from "../Config/tank_cannon.js";
import {tank} from "../Config/tank.js";
import {ammo} from "../Config/ammo.js";
import {hexToRgbA} from "./drawTankTreadTrail.js";
export function drawTankBody() {
	
	let selectedAmmo = ammo[ammo.currentType];
	
	ctx.save();
	ctx.translate(tank_cannon.x, tank_cannon.y);  // Move to the tank center
	ctx.rotate(tank.angle);  // Rotate to the tank's angle
	ctx.strokeStyle = selectedAmmo.color1;
	ctx.lineWidth = 3;
	
	// Attachment points
	let front = tank.attachmentPoints.front();
	let back = tank.attachmentPoints.back();
	let left = tank.attachmentPoints.left();
	let right = tank.attachmentPoints.right();
	
	// Glowing effect
	ctx.shadowColor = selectedAmmo.color1
	
	// Main Body of the tank
	ctx.fillStyle = selectedAmmo.color2
	
	if(tank.collided) {
		let healthColor = tank.health > 70 ? "#3cff00" : tank.health > 30 ? "#ffe544" : "#ff0000";
		ctx.shadowColor = healthColor
		ctx.fillStyle = hexToRgbA(healthColor, 0.7);
		ctx.strokeStyle = healthColor;
		ctx.lineWidth = 3;
		setTimeout(() => {
			tank.collided = false;
		}, 100);
	}
	
	ctx.shadowBlur = 30;
	
	ctx.lineWidth = 3;
	
	drawRoundedRect(ctx, -tank.width / 2, -tank.height / 2, tank.width, tank.height, 25);
	
	ctx.shadowColor = selectedAmmo.color1
	ctx.shadowBlur = 10;
	//
	// // Upper Deck
	// ctx.fillStyle = selectedAmmo.color1
	// drawRoundedRect(ctx, -tank.width / 3.4, (-tank.height / 4) - 5, (tank.width / 2) + 10, (tank.height / 2) + 10, 20);
	
	// Remove the glow effect
	ctx.shadowBlur = 0;
	
	ctx.restore();
}