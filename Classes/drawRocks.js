import {ctx} from "./ctx.js";
import {rocks} from "./rocks.js";

let rockImage = new Image();
rockImage.src = 'assets/Rock2_grass_shadow1.png';

export function drawRocks() {
	for (let rock of rocks) {
		ctx.drawImage(rockImage, rock.x, rock.y, rockImage.width, rockImage.height); // Draws the rock PNG
	}
}