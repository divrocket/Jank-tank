//Collision Detection
import {tank_cannon} from "../Config/tank_cannon.js";

export function checkTankAmmoCollision(tank, ammoDrop) {
	return tank_cannon.x < ammoDrop.x + ammoDrop.size &&
		tank_cannon.x + tank.width > ammoDrop.x &&
		tank_cannon.y < ammoDrop.y + ammoDrop.size &&
		tank_cannon.y + tank.height > ammoDrop.y;
}