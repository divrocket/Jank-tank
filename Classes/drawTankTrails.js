import {tank_cannon} from "./tank_cannon.js";
import {tank} from "./tank.js";
import {treadOffsetFactor} from "./treadOffsetFactor.js";
import {tankTrail} from "./tankTrail.js";
export function drawTankTrails() {
	let leftTread = {
		x: tank_cannon.x + Math.cos(tank.angle + Math.PI / 2) * (tank.width / 2 * treadOffsetFactor),
		y: tank_cannon.y + Math.sin(tank.angle + Math.PI / 2) * (tank.width / 2 * treadOffsetFactor)
	};
	let rightTread = {
		x: tank_cannon.x + Math.cos(tank.angle - Math.PI / 2) * (tank.width / 2 * treadOffsetFactor),
		y: tank_cannon.y + Math.sin(tank.angle - Math.PI / 2) * (tank.width / 2 * treadOffsetFactor)
	};
	tankTrail.push({left: leftTread, right: rightTread});
	
	while (tankTrail.length > 400) {
		tankTrail.shift(); // Remove the oldest position
	}
}