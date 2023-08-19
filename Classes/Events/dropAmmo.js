//Player Actions
import {droppedAmmo} from "../CollectionManagement/droppedAmmo.js";
import {ammo} from "../Config/ammo.js";

export function dropAmmo(enemy) {
	if (Math.random() < 0.4) {  // 20% chance to drop ammo
		const ammoTypes = Object.keys(ammo).filter(type => type !== 'currentType');
		const dropType = ammoTypes[Math.floor(Math.random() * ammoTypes.length)];
		
		droppedAmmo.push({
			x: enemy.x,
			y: enemy.y,
			type: dropType,
			size: 10  // Adjust size if needed
		});
	}
}