import {canvas, ctx} from "../Canvas/ctx.js";
import {rocks} from "../CollectionManagement/rocks.js";

export let rockImage = new Image();
rockImage.src = 'Assets/Graphics/Asteroid Brown.png';

let screenWidth = canvas.width;
let screenHeight = canvas.height;

function haveCollided(rock1, rock2) {
	const distanceX = rock1.x - rock2.x;
	const distanceY = rock1.y - rock2.y;
	const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
	return distance < (rockImage.width / 2 + rockImage.width / 2); // Assumes rocks are same size
}

function bounceOffEachOther(rock1, rock2) {
	// Swap velocities for simplicity (perfectly elastic collision)
	const tempDX = rock1.dx;
	const tempDY = rock1.dy;
	rock1.dx = rock2.dx;
	rock1.dy = rock2.dy;
	rock2.dx = tempDX;
	rock2.dy = tempDY;
}

export function drawRocks() {
	for (let rock of rocks) {
		rock.x += rock.dx;
		rock.y += rock.dy;
		
		// Check for collision with left or right edges
		if ((rock.x < 0 && rock.dx < 0) || (rock.x + rockImage.width > screenWidth && rock.dx > 0)) {
			rock.dx = -rock.dx; // Reverse the horizontal direction
		}
		
		// Check for collision with top or bottom edges
		if ((rock.y < 0 && rock.dy < 0) || (rock.y + rockImage.height > screenHeight && rock.dy > 0)) {
			rock.dy = -rock.dy; // Reverse the vertical direction
		}
		
		for (let otherRock of rocks) {
			if (rock !== otherRock && haveCollided(rock, otherRock)) {
				bounceOffEachOther(rock, otherRock);
			}
		}
		
		ctx.drawImage(rockImage, rock.x, rock.y, rockImage.width, rockImage.height); // Draws the rock PNG
	}
}