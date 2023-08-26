import {ctx} from "../Canvas/ctx.js";
import {ammo} from "../Config/ammo.js";
import {droppedAmmo} from "../CollectionManagement/collector.js";

export function drawDroppedAmmo() {
	if (droppedAmmo.length <= 0) return;
	
	ctx.save();
	const currentTime = Date.now();
	for (let drop of droppedAmmo) {
		const ammoColor = ammo[drop.type].color1;
		
		// Glow effect
		ctx.shadowColor = ammoColor;
		ctx.shadowBlur = 15;  // Enhanced glow effect for space bullets
		
		// Floating effect
		const floatingOffset = 5 * Math.sin(currentTime / 1000);
		
		// Gradient fill for futuristic look
		const gradient = ctx.createLinearGradient(drop.x, drop.y, drop.x, drop.y + drop.size);
		gradient.addColorStop(0, ammoColor);
		gradient.addColorStop(1, ammo[drop.type].color2); // Dark end for gradient (adjust as desired)
		ctx.fillStyle = gradient;
		
		// Drawing as a capsule shape for a futuristic look
		ctx.beginPath();
		ctx.arc(drop.x + drop.size / 2, drop.y + floatingOffset, drop.size / 2, Math.PI, 0, false);
		ctx.arc(drop.x + drop.size / 2, drop.y + drop.size + floatingOffset, drop.size / 2, 0, Math.PI, false);
		ctx.closePath();
		ctx.fill();
		
		// Fill the center part of the capsule
		ctx.fillRect(drop.x, drop.y + floatingOffset, drop.size, drop.size);
	}
	
	ctx.restore();
}
