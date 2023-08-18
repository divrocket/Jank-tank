import {ctx} from "./ctx.js";
import {rocks} from "./rocks.js";

let rockImage = new Image();
rockImage.src = 'assets/tree_assets/Trees_texture_shadow_dark/Snow_christmass_tree1.png';

export function drawRocks() {
	for (let rock of rocks) {
		ctx.drawImage(rockImage, rock.x, rock.y, rockImage.width, rockImage.height); // Draws the rock PNG
	}
}