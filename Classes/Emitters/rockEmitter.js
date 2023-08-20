import {canvas} from "../Canvas/ctx.js";
import {rocks} from "../CollectionManagement/rocks.js";
import {rockImage} from "../Drawing/drawRocks.js";

const MIN_DISTANCE_BETWEEN_ROCKS = rockImage.width + 20; // adjust based on your needs

function isTooCloseToExistingRock(x, y) {
	return rocks.some(rock => {
		const distance = Math.sqrt((rock.x - x) ** 2 + (rock.y - y) ** 2);
		return distance < MIN_DISTANCE_BETWEEN_ROCKS;
	});
}

export function rockEmitter(number) {
	for (let i = 0; i < number; i++) {
		let x = Math.random() * (canvas.width - rockImage.width);
		let y = Math.random() * (canvas.height - rockImage.height);
		
		// Adjust position if the new rock is too close to existing rocks
		while (isTooCloseToExistingRock(x, y)) {
			x = Math.random() * (canvas.width - rockImage.width);
			y = Math.random() * (canvas.height - rockImage.height);
		}
		
		const radius = (Math.random() * 5) + 50;
		const dx = (Math.random() - 0.5) * 0.5; // subtle floating motion in x direction
		const dy = (Math.random() - 0.5) * 0.5; // subtle floating motion in y direction
		
		rocks.push({x, y, radius, dx, dy});
	}
}