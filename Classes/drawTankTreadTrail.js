import {ctx} from "./ctx.js";
import {tankTrail} from "./tankTrail.js";

export function drawTankTreadTrail() {
	for (let i = 0; i < tankTrail.length; i++) {
		let alpha = (i + 1) / tankTrail.length;

		ctx.fillStyle = `rgba(220, 169, 127, ${alpha})`;  // Set the fill color with decreasing opacity
		let treads = tankTrail[i];
		
		// Drawing left tread
		ctx.fillRect(treads.left.x - 5, treads.left.y - 5, 10, 10);
		
		// Drawing right tread
		ctx.fillRect(treads.right.x - 5, treads.right.y - 5, 10, 10);
	}
}