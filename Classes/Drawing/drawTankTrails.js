import {tank_cannon} from "../Config/tank_cannon.js";
import {tank} from "../Config/tank.js";
import {treadOffsetFactor} from "../Config/treadOffsetFactor.js";
import {tankTrail} from "../CollectionManagement/tankTrail.js";
export function drawTankTrails() {
	let middleTread = {
		x: tank_cannon.x,
		y: tank_cannon.y
	};
	
	tankTrail.push({ middle: middleTread });
	
	while (tankTrail.length > 50) {
		tankTrail.shift(); // Remove the oldest position
	}
}