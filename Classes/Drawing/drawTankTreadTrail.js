import {ctx} from "../Canvas/ctx.js";
import {tankTrail} from "../CollectionManagement/tankTrail.js";

export function drawTankTreadTrail() {
	for (let i = 0; i < tankTrail.length; i++) {
		let alpha = (i + 1) / tankTrail.length;
		ctx.save();
		// Glowing effect
		ctx.shadowColor = "rgb(0,255,255)";
		ctx.shadowBlur = 6;
		
		ctx.fillStyle = `rgba(0, 255, 255, ${alpha})`;  // Set the fill color with decreasing opacity
		let treads = tankTrail[i];
		
		// Drawing left tread
		ctx.fillRect(treads.left.x - 5, treads.left.y - 5, 10, 10);
		
		// Drawing right tread
		ctx.fillRect(treads.right.x - 5, treads.right.y - 5, 10, 10);
		
		ctx.restore()
	}
	
}