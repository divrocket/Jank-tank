import {canvas, ctx} from "../Canvas/ctx.js";
import {ammo} from "../Config/ammo.js";

export function drawReloadingSpinner() {
	const currentAmmo = ammo[ammo.currentType];
	if (!currentAmmo.reloading) return;
	
	const centerX = canvas.width - 50; // Adjust as needed
	const centerY = canvas.height - 50; // Adjust as needed
	const radius = 30; // Adjust as needed
	const endAngle = (currentAmmo.reloadProgress / 100) * 2 * Math.PI;  // Based on reload progress
	
	ctx.beginPath();
	ctx.arc(centerX, centerY, radius, 0, endAngle, false);
	ctx.lineWidth = 5;
	ctx.strokeStyle = currentAmmo.color1;
	ctx.stroke();
}