import {checkTankAmmoCollision} from "../../Collision/checkTankAmmoCollision.js";
import {addAmmo} from "../../Config/ammo.js";
import {tank} from "../../Config/tank.js";
import {droppedAmmo} from "../../CollectionManagement/collector.js";

export function pickUpAmmo() {
	for (let i = 0; i < droppedAmmo.length; i++) {
		if (checkTankAmmoCollision(tank, droppedAmmo[i])) {
			addAmmo(droppedAmmo[i].type, 5);
			droppedAmmo.splice(i, 1);
			i--;
		}
	}
}