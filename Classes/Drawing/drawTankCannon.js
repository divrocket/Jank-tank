import {ctx} from "../Canvas/ctx.js";
import {roundedRect} from "./roundedRect.js";
import {tank_cannon} from "../Config/tank_cannon.js";
import {tank} from "../Config/tank.js";
import {ammo} from "../Config/ammo.js";

export function drawTankCannon() {
	ctx.save();
	
	let selectedAmmo = ammo[ammo.currentType];
	
	// Positioning the cannon based on the tank's coordinates and rotation
	ctx.translate(tank_cannon.x, tank_cannon.y);
	ctx.rotate(tank.angle + tank_cannon.angle);
	
	
	// Drawing the cannon base
	ctx.fillStyle = selectedAmmo.color2
	ctx.strokeStyle = selectedAmmo.color1; // Stroke color
	ctx.lineWidth = 3; // Line width for the stroke
	roundedRect(ctx, -tank_cannon.size / 2, -tank_cannon.size / 2, tank_cannon.size, tank_cannon.size, 16);  // Adjust the radius as needed

	// Drawing the elongated cannon part
	const arrowLength = 40;
	const arrowHeight = 12;
	ctx.fillStyle = selectedAmmo.color2;
	ctx.strokeStyle = selectedAmmo.color1;
	
	// Assuming you want rounded corners for the cannon's elongated part, you can adjust the radius as needed
	roundedRect(ctx, tank_cannon.size / 2, -arrowHeight / 2, arrowLength, arrowHeight, 3);
	
	// // Drawing the cannon muzzle
	// ctx.fillStyle = selectedAmmo.color2;
	// ctx.strokeStyle = selectedAmmo.color1;
	// ctx.lineWidth = 0;
	// roundedRect(ctx, -tank_cannon.size / 2 + 6.6, -tank_cannon.size / 2 + 7.5, 70, 30, 5);  // Adjust the radius as needed
	//
	// ctx.lineWidth = 1; // Line width for the stroke
	// ctx.fillStyle = selectedAmmo.color2;
	// ctx.strokeStyle = selectedAmmo.color1; // Stroke color
	//
	// for (let i = 0; i < 5; i++) {
	// 	let loop_amount = (12 * i) + 15;
	// 	roundedRect(ctx, -tank_cannon.size / 2 + loop_amount, -tank_cannon.size / 2 + 15, 4, 15, 1);
	// }
	//
	ctx.restore();
}