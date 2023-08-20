import {ctx} from "../Canvas/ctx.js";
import {rocks} from "../CollectionManagement/rocks.js";

export let rockImage = new Image();
rockImage.src = 'Assets/Graphics/Asteroid Brown.png';

export function drawRocks() {
	for (let rock of rocks) {
		rock.x += rock.dx;
		rock.y += rock.dy;
		ctx.drawImage(rockImage, rock.x, rock.y, rockImage.width, rockImage.height); // Draws the rock PNG
	}
}