import {droppedAmmo, tankTrail} from "../CollectionManagement/collector.js";
import {ammo} from "../Config/ammo.js";

export function dropAmmo(enemy) {
	if (Math.random() < 0.4) {
		const ammoTypes = Object.keys(ammo).filter(type => type !== 'currentType');
		const dropType = ammoTypes[Math.floor(Math.random() * ammoTypes.length)];
		
		droppedAmmo.push({
			x: enemy.x,
			y: enemy.y,
			type: dropType,
			size: 10
		});
		
		while (droppedAmmo.length > 10) {
			droppedAmmo.shift(); // Remove the oldest position
		}
	}
}