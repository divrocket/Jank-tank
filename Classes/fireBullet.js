import {tank} from "./tank.js";
import {ammo} from "./ammo.js";
import {tank_cannon} from "./tank_cannon.js";
import {bullets} from "./bullets.js";
import {reloadAmmo} from "./reloadAmmo.js";
import {arrowLength} from "./arrowLength.js";

// Ammo Management
export function fireBullet() {
	const currentAmmo = ammo[ammo.currentType];
	
	// Don't fire if already reloading
	if (currentAmmo.reloading) return;
	
	// Check if enough time has passed since the last shot
	const now = Date.now();
	if (now - currentAmmo.lastFired < currentAmmo.fireRate) return;
	
	// Don't fire if no ammo left
	if (currentAmmo.currentMagazine <= 0) return;
	
	const bulletProperties = currentAmmo;
	const bulletSpeed = bulletProperties.speed;
	const combinedAngle = tank.angle + tank_cannon.angle;
	
	const startX = tank_cannon.x + (tank_cannon.size / 2 + arrowLength) * Math.cos(combinedAngle);
	const startY = tank_cannon.y + (tank_cannon.size / 2 + arrowLength) * Math.sin(combinedAngle);
	
	bullets.push({
		x: startX,
		y: startY,
		dx: bulletSpeed * Math.cos(combinedAngle),
		dy: bulletSpeed * Math.sin(combinedAngle),
		type: ammo.currentType,
		size: bulletProperties.size
	});
	
	currentAmmo.currentMagazine--; // Decrement ammo in magazine a w
	currentAmmo.count--; // Decrement overall ammo count
	currentAmmo.lastFired = now;  // Update the lastFired timestamp
	
	tank_cannon.muzzleFlash = true;
	setTimeout(() => {
		tank_cannon.muzzleFlash = false;
	}, tank_cannon.flashDuration);
	
	if (currentAmmo.currentMagazine <= 0) {
		reloadAmmo();
	}
}