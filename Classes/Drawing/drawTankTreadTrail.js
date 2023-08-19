import {ctx} from "../Canvas/ctx.js";
import {tankTrail} from "../CollectionManagement/tankTrail.js";
import {ammo} from "../Config/ammo.js";

export function drawTankTreadTrail() {
	let selectedAmmo = ammo[ammo.currentType];
	
	
	for (let i = 0; i < tankTrail.length; i++) {
		let alpha = (i + 1) / tankTrail.length;
		ctx.save();
		// Glowing effect
		ctx.shadowColor = selectedAmmo.color1;
		ctx.shadowBlur = 6;
		
		ctx.fillStyle = `rgba(0, 0, 0, ${alpha})`;  // Set the fill color with decreasing opacity
		let treads = tankTrail[i];
		
		// Drawing left tread
		ctx.fillRect(treads.left.x - 5, treads.left.y - 5, 10, 10);
		
		// Drawing right tread
		ctx.fillRect(treads.right.x - 5, treads.right.y - 5, 10, 10);
		
		ctx.restore()
	}
	
}