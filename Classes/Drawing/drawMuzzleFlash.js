import {weaponFireEmitter} from "../Emitters/weaponFireEmitter.js";
import {ctx} from "../Canvas/ctx.js";
import {drawParticles} from "./drawParticles.js";
import {tank_cannon} from "../Config/tank_cannon.js";
import {tank} from "../Config/tank.js";
import {arrowLength} from "../Config/arrowLength.js";
import {ammo} from "../Config/ammo.js";
import {drawMuzzleParticles} from "./drawMuzzleParticles.js";

export function drawMuzzleFlash() {
	
	let selectedAmmo = ammo[ammo.currentType];
	
	if (tank_cannon.muzzleFlash) {
		const combinedAngle = tank.angle + tank_cannon.angle;
		const flashX = tank_cannon.x + (tank_cannon.size / 1.8 + arrowLength + 50) * Math.cos(combinedAngle);
		const flashY = tank_cannon.y + (tank_cannon.size / 1.8 + arrowLength + 50) * Math.sin(combinedAngle);
		
		weaponFireEmitter(flashX, flashY, combinedAngle);  // Emit particles when there's a muzzle flash
		
		ctx.save();
		ctx.beginPath();
		
		// Use a solid fill style instead of gradient
		ctx.fillStyle = selectedAmmo.color1;
		ctx.arc(flashX, flashY, 15, 0, 2 * Math.PI);
		ctx.fill();
		
		drawMuzzleParticles(ctx);  // Draw the particles
		
		ctx.restore();
	}
}
