import {ctx} from "./ctx.js";
import {ammo} from "./ammo.js";
import {droppedAmmo} from "./droppedAmmo.js";

export function drawDroppedAmmo() {
	ctx.save();
	for (let drop of droppedAmmo) {
		ctx.fillStyle = ammo[drop.type].color1;
		ctx.fillRect(drop.x, drop.y, drop.size, drop.size);
	}
	ctx.restore();
}