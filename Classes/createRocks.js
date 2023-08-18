import {canvas} from "./ctx.js";
import {rocks} from "./rocks.js";

let rockImage = new Image();
rockImage.src = 'assets/tree_assets/Trees_texture_shadow_dark/Snow_christmass_tree1.png';

export function createRocks(number) {
	for (let i = 0; i < number; i++) {
		const x = Math.random() * (canvas.width - rockImage.width); // Subtract image width to ensure the rock is fully visible
		const y = Math.random() * (canvas.height - rockImage.height); // Subtract image height for the same reason
		// You can keep the radius if you still need it for collision detection or other purposes
		const radius = (Math.random() * 5) + 50; // gives random radius between 10 and 30
		
		rocks.push({x, y, radius});
	}
}