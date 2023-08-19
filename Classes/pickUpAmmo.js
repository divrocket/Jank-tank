import {checkTankAmmoCollision} from "./checkTankAmmoCollision.js";
import {addAmmo} from "./ammo.js";
import {tank} from "./tank.js";
import {droppedAmmo} from "./droppedAmmo.js";

export function pickUpAmmo() {
	for (let i = 0; i < droppedAmmo.length; i++) {
		if (checkTankAmmoCollision(tank, droppedAmmo[i])) {
			addAmmo(droppedAmmo[i].type, 5);
			droppedAmmo.splice(i, 1);
			i--;
		}
	}
}