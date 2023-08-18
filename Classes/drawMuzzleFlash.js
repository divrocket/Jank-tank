// Modified drawMuzzleFlash function
import {emitParticles} from "./emitParticles.js";
import {ctx} from "./ctx.js";
import {handleParticles} from "./handleParticles.js";
import {tank_cannon} from "./tank_cannon.js";
import {tank} from "./tank.js";
import {arrowLength} from "./arrowLength.js";

export function drawMuzzleFlash() {
	if (tank_cannon.muzzleFlash) {
		const combinedAngle = tank.angle + tank_cannon.angle;
		const flashX = tank_cannon.x + (tank_cannon.size / 1.8 + arrowLength) * Math.cos(combinedAngle);
		const flashY = tank_cannon.y + (tank_cannon.size / 1.8 + arrowLength) * Math.sin(combinedAngle);
		
		emitParticles(flashX, flashY, combinedAngle);  // Emit particles when there's a muzzle flash
		
		ctx.save();
		ctx.beginPath();
		
		const gradient = ctx.createRadialGradient(flashX, flashY, 1, flashX, flashY, 1);
		gradient.addColorStop(0, 'red');
		gradient.addColorStop(1, 'rgba(255,255,0,0)');
		
		ctx.fillStyle = gradient;
		ctx.arc(flashX, flashY, 15, 0, 2 * Math.PI);
		ctx.fill();
		
		handleParticles(ctx);  // Draw the particles
		
		ctx.restore();
	}
}