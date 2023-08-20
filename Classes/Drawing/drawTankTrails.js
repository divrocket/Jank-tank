import {tank_cannon} from "../Config/tank_cannon.js";
import {tankTrail} from "../CollectionManagement/tankTrail.js";

export function drawTankTrails() {
	let middleTread = {
		x: tank_cannon.x,
		y: tank_cannon.y
	};
	
	tankTrail.push(middleTread);
	
	while (tankTrail.length > 40) {
		tankTrail.shift(); // Remove the oldest position
	}
}