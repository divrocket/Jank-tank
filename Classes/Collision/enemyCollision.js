import {checkTankEnemyCollision} from "./checkTankEnemyCollision.js";
import {enemies} from "../CollectionManagement/collector.js";
import {tank} from "../Config/tank.js";
import {dropAmmo} from "../Events/dropAmmo.js";
import {addScore, createScorePopup} from "../Player/Actions/addScore.js";
import {ctx} from "../Canvas/ctx.js";

export function enemyCollision() {
	if(enemies.length <= 0) return;
	for (let enemy of enemies) {
		enemy.update();
		enemy.draw();
		
		if (checkTankEnemyCollision(tank, enemy)) {
			tank.health -= 10;
			tank.collided = true;
			dropAmmo(enemy);
			addScore(100);
			createScorePopup(enemy.x,enemy.y, 100);
			createHealthPopup(enemy.x, enemy.y, 10);
			enemies.splice(enemies.indexOf(enemy), 1);
		}
		
		// for (let point of tankTrail) {
		// 	if (checkEnemyTrailCollision(enemy, point.left) || checkEnemyTrailCollision(enemy, point.right)) {
		// 		particleEmitter(enemy.x, enemy.y);
		// 		enemies.splice(enemies.indexOf(enemy), 1);
		// 		addScore(100);
		// 	}
		// }
	}
}

let healthPopups = [];

export function createHealthPopup(x, y, value) {
	healthPopups.push({
		x: x - 100,
		y: y + 100,
		value: value,
		opacity: 1, // Starting at full opacity
		duration: 50, // You can adjust this to control how long it displays
	});
}

export function handleHealthPopups() {
	ctx.font = '55px Arial'; // You can adjust to your desired font and size
	ctx.textAlign = 'center';
	
	while (healthPopups.length > 20) {
		healthPopups.shift(); // Remove the oldest score popup
	}
	
	for (let i = healthPopups.length - 1; i >= 0; i--) {
		let popup = healthPopups[i];
		
		ctx.fillStyle = `rgba(255, 0, 0, ${popup.opacity})`;
		ctx.fillText(`-${popup.value}`, popup.x, popup.y);
		
		popup.y -= 1; // Slowly move the text upwards
		popup.duration--;
		popup.opacity -= 0.02; // Reduce the opacity
		
		tank.color = `rgba(255, 0, 0, ${popup.opacity})`;
		
		if (popup.duration <= 0) {
			healthPopups.splice(i, 1); // Remove when the duration is over
		}
	}
}
