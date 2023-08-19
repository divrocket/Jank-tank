import {tank_cannon} from "../Config/tank_cannon.js";
import {tank} from "../Config/tank.js";
import {treadOffsetFactor} from "../Config/treadOffsetFactor.js";
import {tankTrail} from "../CollectionManagement/tankTrail.js";
export function drawTankTrails() {
	let leftTread = {
		x: tank_cannon.x + Math.cos(tank.angle + Math.PI / 2) * (tank.width / 3 * treadOffsetFactor),
		y: tank_cannon.y + Math.sin(tank.angle + Math.PI / 2) * (tank.width / 2 * treadOffsetFactor)
	};
	let rightTread = {
		x: tank_cannon.x + Math.cos(tank.angle - Math.PI / 2) * (tank.width / 3 * treadOffsetFactor),
		y: tank_cannon.y + Math.sin(tank.angle - Math.PI / 2) * (tank.width / 2 * treadOffsetFactor)
	};
	tankTrail.push({left: leftTread, right: rightTread});
	
	while (tankTrail.length > 40) {
		tankTrail.shift(); // Remove the oldest position
	}
}