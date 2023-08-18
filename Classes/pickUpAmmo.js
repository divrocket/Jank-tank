import {checkTankAmmoCollision} from "./checkTankAmmoCollision.js";
import {ammo} from "./ammo.js";
import {tank} from "./tank.js";
import {droppedAmmo} from "./droppedAmmo.js";

export function pickUpAmmo() {
	for (let i = 0; i < droppedAmmo.length; i++) {
		if (checkTankAmmoCollision(tank, droppedAmmo[i])) {
			ammo[droppedAmmo[i].type].count += 5;  // Add 5 rounds to the ammo type
			droppedAmmo.splice(i, 1);  // Remove the ammo drop
			i--;  // Adjust the index due to the splice
		}
	}
}