import {ctx} from "./ctx.js";
import {bullets} from "./bullets.js";
import {enemies} from "./enemies.js";
import {spawnParticles} from "./spawnParticles.js";
import {ammo} from "./ammo.js";
import {checkBulletEnemyCollision} from "./checkBulletEnemyCollision.js";
import {dropAmmo} from "./dropAmmo.js";
import {addScore} from "./addScore.js";

export function updateBullets() {
	for (let i = bullets.length - 1; i >= 0; i--) {
		let potentialNewX = bullets[i].x + bullets[i].dx;
		let potentialNewY = bullets[i].y + bullets[i].dy;
		
		bullets[i].x = potentialNewX;
		bullets[i].y = potentialNewY;
		
		const bulletProperties = ammo[bullets[i].type];
		let gradient = ctx.createRadialGradient(bullets[i].x, bullets[i].y, 1, bullets[i].x, bullets[i].y, bulletProperties.size);
		gradient.addColorStop(0, bulletProperties.color1);
		gradient.addColorStop(1, bulletProperties.color2);
		ctx.fillStyle = gradient;
		
		ctx.fillRect(bullets[i].x, bullets[i].y, bulletProperties.size, bulletProperties.size * 2);
		
		for (let j = enemies.length - 1; j >= 0; j--) {
			if (checkBulletEnemyCollision(bullets[i], enemies[j])) {
				dropAmmo(enemies[j]); // Drop ammo
				spawnParticles(enemies[j].x, enemies[j].y); // Spawn particles
				enemies.splice(j, 1); // Remove the enemy
				bullets.splice(i, 1); // Remove the bullet
				
				addScore(150); // Add score
				break;
			}
		}
	}
}