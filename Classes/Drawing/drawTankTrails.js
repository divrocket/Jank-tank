import {tank_cannon} from "../Config/tank_cannon.js";
import {tankTrail} from "../CollectionManagement/collector.js";

export function drawTankTrails() {
	let middleTread = {
		x: tank_cannon.x,
		y: tank_cannon.y
	};
	
	tankTrail.push({ middle: middleTread });
	
	while (tankTrail.length > 20) {
		tankTrail.shift(); // Remove the oldest position
	}
}