import {tank} from "../Config/tank.js";
import {ammo} from "../Config/ammo.js";
import {tank_cannon} from "../Config/tank_cannon.js";
import {bullets} from "../CollectionManagement/collector.js";
import {reloadAmmo} from "../Player/Actions/reloadAmmo.js";
import {arrowLength} from "../Config/arrowLength.js";

export function bulletEmitter() {
	while (bullets.length > 100) {
		bullets.shift(); // Remove the oldest position
	}
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
	
	const startX = tank_cannon.x + (tank_cannon.size / 2 + arrowLength + 50) * Math.cos(combinedAngle);
	const startY = tank_cannon.y + (tank_cannon.size / 2 + arrowLength + 50) * Math.sin(combinedAngle);
	const bulletLifespan = bulletProperties.lifespan || 1000;  // Example: bullets live for 1000 units of distance.
	
	bullets.push({
		x: startX,
		y: startY,
		dx: bulletSpeed * Math.cos(combinedAngle),
		dy: bulletSpeed * Math.sin(combinedAngle),
		type: ammo.currentType,
		size: bulletProperties.size,
		traveled: 0,  // to track how far the bullet has traveled
		lifespan: bulletLifespan  // assigning the lifespan from bullet properties
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