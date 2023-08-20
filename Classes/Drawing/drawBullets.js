import {canvas, ctx} from "../Canvas/ctx.js";
import {bullets} from "../CollectionManagement/bullets.js";
import {enemies} from "../CollectionManagement/enemies.js";
import {particleEmitter} from "../Emitters/particleEmitter.js";
import {ammo} from "../Config/ammo.js";
import {checkBulletEnemyCollision} from "../Collision/checkBulletEnemyCollision.js";
import {dropAmmo} from "../Events/dropAmmo.js";
import {addScore} from "../Player/Actions/addScore.js";
import {rocks} from "../CollectionManagement/rocks.js";
import {tank_cannon as bulletProperties} from "../Config/tank_cannon.js";
import {rockImage} from "./drawRocks.js";


function checkBulletRockCollision(bullet, rock) {
	const distanceX = bullet.x - rock.x - rockImage.width / 2; // Accounting for the center of the rock
	const distanceY = bullet.y - rock.y - rockImage.height / 2; // Accounting for the center of the rock
	const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
	return distance < (bulletProperties.size + rockImage.width / 2); // Assuming the rock and bullet are circular
}


export function drawBullets() {
	let bullet, potentialNewX, potentialNewY, bulletProperties, gradient;
	
	for (let i = bullets.length - 1; i >= 0; i--) {
		bullet = bullets[i];
		
		bullet.dy += 0.08;
		
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
		
		// Add random blobbiness to the bullet's appearance
		let randomSizeOffset = (Math.random() - 0.5) * 10; // Vary by 10 units for example
		let randomXOffset = (Math.random() - 0.5) * 5;     // Shift by 5 units
		let randomYOffset = (Math.random() - 0.5) * 5;     // Shift by 5 units
		
		ctx.beginPath();
		ctx.arc(bullet.x + randomXOffset, bullet.y + randomYOffset, bulletProperties.size + 5 + randomSizeOffset, 0, Math.PI * 2, false);
		ctx.fillStyle = gradient;
		ctx.fill();
		
		ctx.restore();
		
		
		for (let rock of rocks) {
			if (checkBulletRockCollision(bullet, rock)) {
				// Reverse bullet's direction
				const angle = Math.atan2(bullet.dy, bullet.dx) + Math.PI; // Reflect the angle
				bullet.dx = Math.cos(angle) * Math.sqrt(bullet.dx * bullet.dx + bullet.dy * bullet.dy);
				bullet.dy = Math.sin(angle) * Math.sqrt(bullet.dx * bullet.dx + bullet.dy * bullet.dy);
				
				// Move bullet out of collision (prevent sticking)
				bullet.x += bullet.dx;
				bullet.y += bullet.dy;
				break; // Once a collision is found with one rock, skip other rocks for this bullet
			}
		}
		
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

