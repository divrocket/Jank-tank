import {ctx} from "../Canvas/ctx.js";
import {drawRoundedRect} from "./drawRoundedRect.js";
import {tank_cannon} from "../Config/tank_cannon.js";
import {tank} from "../Config/tank.js";
import {ammo} from "../Config/ammo.js";
import {arrowLength,arrowHeight} from "../Config/arrowLength.js";
export function drawTankCannon() {
	ctx.save();
	
	// Drawing the elongated cannon part
	
	let selectedAmmo = ammo[ammo.currentType];
	
	// Positioning the cannon based on the tank's coordinates and rotation
	ctx.translate(tank_cannon.x, tank_cannon.y);
	ctx.rotate(tank.angle + tank_cannon.angle);
	// Glowing effect
	ctx.shadowColor = selectedAmmo.color1
	ctx.shadowBlur = 30;
	
	// Drawing the cannon base
	ctx.fillStyle = selectedAmmo.color2
	ctx.strokeStyle = selectedAmmo.color1;
	ctx.lineWidth = 3;
	drawRoundedRect(ctx, -tank_cannon.size / 2, -tank_cannon.size / 2, tank_cannon.size, tank_cannon.size, 22);


	ctx.fillStyle = selectedAmmo.color2;
	ctx.strokeStyle = selectedAmmo.color1;
	drawRoundedRect(ctx, tank_cannon.size / 2, -arrowHeight / 2, arrowLength, arrowHeight, 9);
	

	ctx.lineWidth = 1; // Line width for the stroke
	ctx.fillStyle = selectedAmmo.color1;

	for (let i = 0; i < 2; i++) {
		let loop_amount = (12 * i) + 15;
		drawRoundedRect(ctx, -tank_cannon.size / 2 + loop_amount, -tank_cannon.size / 2 + 15, 4, 15, 1);
	}

	ctx.restore();
}