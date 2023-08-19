import {keys} from "./keys.js";
import {tank_cannon} from "./tank_cannon.js";
import {tank} from "./tank.js";
import {fireBullet} from "./fireBullet.js";
import {reloadAmmo} from "./reloadAmmo.js";
import {switchAmmoType} from "./switchAmmoType.js";

const MAX_CANNON_ANGLE = Math.PI / 2.5; // 45 degrees in radians
const MIN_CANNON_ANGLE = -Math.PI / 2.5; // -45 degrees in radians
let tabPressed = false;



export function handlePlayerMovement() {
	
	// Cannon angle adjustment
	if (keys["q"] && tank_cannon.angle > MIN_CANNON_ANGLE) {
		tank_cannon.angle -= tank_cannon.rotationSpeed;
	}
	
	if (keys["e"] && tank_cannon.angle < MAX_CANNON_ANGLE) {
		tank_cannon.angle += tank_cannon.rotationSpeed;
	}
	
	// Ensure cannon angle stays within bounds
	if (keys["ArrowUp"] || keys["w"]) {
		tank.x = tank_cannon.x;
		tank.y = tank_cannon.y;
		tank_cannon.x += Math.cos(tank.angle) * tank_cannon.dy;
		tank_cannon.y += Math.sin(tank.angle) * tank_cannon.dy;
	}
	
	if (keys["ArrowDown"] || keys["s"]) {
		tank.x = tank_cannon.x;
		tank.y = tank_cannon.y;
		tank_cannon.x -= Math.cos(tank.angle) * tank_cannon.dy; // note the '-='
		tank_cannon.y -= Math.sin(tank.angle) * tank_cannon.dy; // note the '-='ssss
	}
	
	// Tank rotation
	if (keys["a"]) {
		tank.angle -= tank.rotationSpeed;
	}
	
	if (keys["d"]) {
		tank.angle += tank.rotationSpeed;
	}
	
	if (keys[" "]) {
		fireBullet();
	}
	
	if (keys["r"]) {
		reloadAmmo();
	}
	
	if (keys["z"] && !tabPressed) {
		switchAmmoType();
		tabPressed = true;  // Mark the Tab as pressed
	}
	
	if (!keys["z"]) {
		tabPressed = false;  // Reset the flag when the Tab key is released
	}
	
	// Ensure cannon angle stays within bounds
	tank_cannon.angle = Math.min(Math.max(tank_cannon.angle, MIN_CANNON_ANGLE), MAX_CANNON_ANGLE);
}