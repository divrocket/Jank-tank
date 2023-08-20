import {ctx} from "../Canvas/ctx.js";
import {drawRoundedRect} from "./drawRoundedRect.js";
import {tank_cannon} from "../Config/tank_cannon.js";
import {tank} from "../Config/tank.js";
import {ammo} from "../Config/ammo.js";
import {arrowLength,arrowHeight} from "../Config/arrowLength.js";
export function drawTankCannon() {
	ctx.save();
	
	let selectedAmmo = ammo[ammo.currentType];
	
	// Positioning the cannon based on the tank's coordinates and rotation
	ctx.translate(tank_cannon.x, tank_cannon.y);
	ctx.rotate(tank.angle + tank_cannon.angle);
	
	// Glowing effect
	ctx.shadowColor = selectedAmmo.color1
	ctx.shadowBlur = 100;
	
	if (selectedAmmo.reloading) {
		const currentAmmo = ammo[ammo.currentType];
		const segmentProgress = Math.min(currentAmmo.reloadProgress, 10);  // Only show up to 10%
		const startAngle = ((currentAmmo.reloadProgress - segmentProgress) / 100) * 2 * Math.PI;  // Start angle based on how much progress minus 10% we've made
		const endAngle = (currentAmmo.reloadProgress / 100) * 2 * Math.PI;  // End angle based on the total progress made
		
		ctx.beginPath();
		ctx.arc(0, 0, 55, startAngle, endAngle, false);
		ctx.lineWidth = 5;
		ctx.strokeStyle = currentAmmo.color1;
		ctx.stroke();
	}

	// Drawing the cannon base
	ctx.fillStyle = selectedAmmo.color2
	ctx.strokeStyle = selectedAmmo.color1;
	ctx.lineWidth = 3;
	drawRoundedRect(ctx, -tank_cannon.size / 2, -tank_cannon.size / 2, tank_cannon.size, tank_cannon.size, 22);
	
	// // Drawing the cannon barrel
	// ctx.fillStyle = selectedAmmo.color2;
	// ctx.strokeStyle = selectedAmmo.color1;
	// drawRoundedRect(ctx, tank_cannon.size / 2 + 30, -arrowHeight / 2, arrowLength, arrowHeight, 10);

	const distance= 60; // Distance from center to each rectangle (adjust as needed)
	
	let positions = [
		{ x: -distance, y: -distance, type: 'rect' }, // Top-Left (Arrow)
		{ x: distance, y: -distance, type: 'arrow' },  // Top-Right
		{ x: -distance, y: distance, type: 'rect' },  // Bottom-Left
		{ x: distance, y: distance, type: 'rect' }    // Bottom-Right
	];
	
	const theta = Math.PI / 4; // 45 degrees in radians
	
	positions = positions.map(pos => {
		return {
			x: pos.x * Math.cos(theta) - pos.y * Math.sin(theta),
			y: pos.x * Math.sin(theta) + pos.y * Math.cos(theta),
			type: pos.type
		};
	});
	
	positions.forEach(pos => {
		ctx.fillStyle = selectedAmmo.color2;
		ctx.strokeStyle = selectedAmmo.color1;
		
		if (pos.type === 'arrow') {
			// drawArrow(ctx, pos.x, pos.y, arrowLength, arrowHeight);
			
			ctx.fillStyle = selectedAmmo.color1;
			ctx.strokeStyle = selectedAmmo.color1;
			drawRoundedRect(ctx, pos.x - (arrowLength / 2), pos.y - (arrowHeight / 2), arrowLength, arrowHeight, 10);
		} else {
			drawRoundedRect(ctx, pos.x - (arrowLength / 2), pos.y - (arrowHeight / 2), arrowLength, arrowHeight, 10);
		}
	});
	
	function drawArrow(ctx, x, y, width, height) {
		ctx.beginPath();
		ctx.moveTo(x, y - (height / 2));
		ctx.lineTo(x + width, y);
		ctx.lineTo(x, y + (height / 2));
		ctx.closePath();
		ctx.fill();
		ctx.stroke();
	}

	
	
	// // Drawing the cannon muzzle
	// ctx.lineWidth = 1; // Line width for the stroke
	// ctx.fillStyle = selectedAmmo.color1;
	//
	// for (let i = 0; i < 2; i++) {
	// 	let loop_amount = (12 * i) + 15;
	// 	drawRoundedRect(ctx, -tank_cannon.size / 2 + loop_amount, -tank_cannon.size / 2 + 15, 4, 15, 1);
	// }
	//
	// Drawing the cannon base
	ctx.fillStyle = selectedAmmo.color1
	ctx.strokeStyle = selectedAmmo.color1;
	ctx.lineWidth = 3;
	drawRoundedRect(ctx, -10, -10, 20, 20, 10);
	

	ctx.restore();
}