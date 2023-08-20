import {canvas, ctx} from "../Canvas/ctx.js";
import {bullets} from "../CollectionManagement/bullets.js";
import {enemies} from "../CollectionManagement/enemies.js";
import {particleEmitter} from "../Emitters/particleEmitter.js";
import {ammo} from "../Config/ammo.js";
import {checkBulletEnemyCollision} from "../Collision/checkBulletEnemyCollision.js";
import {dropAmmo} from "../Events/dropAmmo.js";
import {addScore} from "../Player/Actions/addScore.js";

export function drawBullets() {
	let bullet, potentialNewX, potentialNewY, bulletProperties, gradient;
	
	for (let i = bullets.length - 1; i >= 0; i--) {
		bullet = bullets[i];
		
		potentialNewX = bullet.x + bullet.dx;
		potentialNewY = bullet.y + bullet.dy;
		
		if (potentialNewX < 0 || potentialNewX > canvas.width) {
			bullet.dx = -bullet.dx;
			potentialNewX = bullet.x + bullet.dx;
		}
		if (potentialNewY < 0 || potentialNewY > canvas.height) {
			bullet.dy = -bullet.dy;
			potentialNewY = bullet.y + bullet.dy;
		}
		
		bullet.x = potentialNewX;
		bullet.y = potentialNewY;
		
		bulletProperties = ammo[bullet.type];
		
		ctx.save();
		ctx.shadowColor = bulletProperties.color1;
		ctx.shadowBlur = 10;
		
		gradient = ctx.createRadialGradient(bullet.x, bullet.y, 1, bullet.x, bullet.y, bulletProperties.size);
		gradient.addColorStop(0, bulletProperties.color1);
		
		ctx.beginPath();
		ctx.moveTo(bullet.x, bullet.y);
		ctx.lineTo(bullet.x + bulletProperties.size * bullet.dx, bullet.y + bulletProperties.size * bullet.dy);
		ctx.strokeStyle = gradient;
		ctx.lineWidth = bulletProperties.size;
		ctx.stroke();
		
		ctx.restore();
		
		for (let j = enemies.length - 1; j >= 0; j--) {
			if (checkBulletEnemyCollision(bullet, enemies[j])) {
				dropAmmo(enemies[j]);
				particleEmitter(enemies[j].x, enemies[j].y);
				enemies.splice(j, 1);
				bullets.splice(i, 1);
				
				addScore(150);
				break;
			}
		}
	}
}