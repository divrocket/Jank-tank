import {canvas, ctx} from "./ctx.js";
import {ammo} from "./ammo.js";

export function drawReloadingSpinner() {
	const currentAmmo = ammo[ammo.currentType];
	if (!currentAmmo.reloading) return;
	
	const centerX = canvas.width - 50; // Adjust as needed
	const centerY = canvas.height - 50; // Adjust as needed
	const radius = 30; // Adjust as needed
	
	ctx.beginPath();
	ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
	ctx.lineWidth = 5;
	ctx.strokeStyle = currentAmmo.color1;
	ctx.stroke();
}