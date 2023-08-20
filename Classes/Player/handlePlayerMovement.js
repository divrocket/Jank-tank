import {keys} from "../CollectionManagement/keys.js";
import {tank_cannon} from "../Config/tank_cannon.js";
import {tank} from "../Config/tank.js";
import {bulletEmitter} from "../Emitters/bulletEmitter.js";
import {reloadAmmo} from "./Actions/reloadAmmo.js";
import {switchAmmoType} from "./Actions/switchAmmoType.js";
import {pickUpAmmo} from "./Actions/pickUpAmmo.js";
import {rockCollision} from "../Collision/rockCollision.js";
import {drawTankTreadTrail} from "../Drawing/drawTankTreadTrail.js";
import {drawTankTrails} from "../Drawing/drawTankTrails.js";
import {tankTrail} from "../CollectionManagement/tankTrail.js";
import {drawReloadingSpinner} from "../Drawing/drawReloadingSpinner.js";

const MAX_CANNON_ANGLE = Math.PI / 2.5; // 45 degrees in radians
const MIN_CANNON_ANGLE = -Math.PI / 2.5; // -45 degrees in radians
let tabPressed = false;

const SCREEN_WIDTH = 1920; // Replace with the width of your game screen or canvas
const SCREEN_HEIGHT = 1080; // Replace with the height of your game screen or canvas

export function handlePlayerMovement() {
	
	// Cannon angle adjustment
	if (keys["q"] && tank_cannon.angle > MIN_CANNON_ANGLE) {
		tank_cannon.angle -= tank_cannon.rotationSpeed;
	}
	
	if (keys["e"] && tank_cannon.angle < MAX_CANNON_ANGLE) {
		tank_cannon.angle += tank_cannon.rotationSpeed;
	}
	
	if (tank_cannon.x < 0) {
		tank_cannon.x = SCREEN_WIDTH;
	}
	if (tank_cannon.x > SCREEN_WIDTH) {
		tank_cannon.x = 0;
	}
	if (tank_cannon.y < 0) {
		tank_cannon.y = SCREEN_HEIGHT;
	}
	if (tank_cannon.y > SCREEN_HEIGHT) {
		tank_cannon.y = 0;
	}
	
	if (keys['s'] || keys['w'] || keys['a'] || keys['d']) {
		// Misc
		pickUpAmmo();
		rockCollision();
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
		tank_cannon.y -= Math.sin(tank.angle) * tank_cannon.dy; // note the '-='
	}
	
	// Tank rotation
	if (keys["a"]) {
		tank.angle -= tank.rotationSpeed;
	}
	
	if (keys["d"]) {
		tank.angle += tank.rotationSpeed;
	}
	
	if (keys[" "]) {
		bulletEmitter();
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
	//
	// // Ensure cannon angle stays within bounds
	// tank_cannon.angle = Math.min(Math.max(tank_cannon.angle, MIN_CANNON_ANGLE), MAX_CANNON_ANGLE);
}