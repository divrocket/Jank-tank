import {canvas} from "../Canvas/ctx.js";
import {Enemy} from "../Objects/enemy.js";
import {enemies} from "../CollectionManagement/enemies.js";

let lastSpawnTimestamp = 0;
const spawnInterval = 10; // 0.3 seconds in milliseconds

export function spawnEnemy(timestamp) {
	if (enemies.length > 100) return;
	
	if (timestamp - lastSpawnTimestamp >= spawnInterval) {
		let x, y;
		const size = Math.random() * 20 + 40; // Random size between 10 and 50
		const speed = Math.random() * 2 + 1; // Random speed between 1 and 3
		
		const side = Math.floor(Math.random() * 4); // Choose a random side: 0 = top, 1 = right, 2 = bottom, 3 = left
		
		switch (side) {
			case 0: // top
				x = Math.random() * canvas.width;
				y = 0 - size; // start slightly outside the canvas
				break;
			case 1: // right
				x = canvas.width + size; // start slightly outside the canvas
				y = Math.random() * canvas.height;
				break;
			case 2: // bottom
				x = Math.random() * canvas.width;
				y = canvas.height + size; // start slightly outside the canvas
				break;
			case 3: // left
				x = 0 - size; // start slightly outside the canvas
				y = Math.random() * canvas.height;
				break;
		}
		
		enemies.push(new Enemy(x, y, size, size, speed));
		lastSpawnTimestamp = timestamp;
	}
	
	requestAnimationFrame(spawnEnemy);
}

export function enemyEmitter() {
	requestAnimationFrame(spawnEnemy);
}