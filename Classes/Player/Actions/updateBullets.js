import {ctx} from "../../Canvas/ctx.js";
import {bullets} from "../../CollectionManagement/bullets.js";
import {enemies} from "../../CollectionManagement/enemies.js";
import {spawnParticles} from "../../Emitters/spawnParticles.js";
import {ammo} from "../../Config/ammo.js";
import {checkBulletEnemyCollision} from "../../Collision/checkBulletEnemyCollision.js";
import {dropAmmo} from "../../Events/dropAmmo.js";
import {addScore} from "./addScore.js";

export function updateBullets() {
	for (let i = bullets.length - 1; i >= 0; i--) {
		ctx.save();
		let potentialNewX = bullets[i].x + bullets[i].dx;
		let potentialNewY = bullets[i].y + bullets[i].dy;
		
		bullets[i].x = potentialNewX;
		bullets[i].y = potentialNewY;
		
		const bulletProperties = ammo[bullets[i].type];
		let gradient = ctx.createRadialGradient(bullets[i].x, bullets[i].y, 1, bullets[i].x, bullets[i].y, bulletProperties.size);
		gradient.addColorStop(0, bulletProperties.color1);
		gradient.addColorStop(1, bulletProperties.color2);
		ctx.fillStyle = gradient;
		
		// Glowing effect
		ctx.shadowColor = bulletProperties.color1;
		ctx.shadowBlur = 10;
		
		ctx.beginPath();
		ctx.moveTo(bullets[i].x, bullets[i].y);
		ctx.lineTo(bullets[i].x + bulletProperties.size *  bullets[i].dx, bullets[i].y + bulletProperties.size * bullets[i].dy);  // elongate the laser based on its direction
		ctx.strokeStyle = gradient;
		ctx.lineWidth = bulletProperties.size;
		ctx.stroke();
		ctx.restore()
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