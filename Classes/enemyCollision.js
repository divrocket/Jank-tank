import {checkTankEnemyCollision} from "./checkTankEnemyCollision.js";
import {spawnParticles} from "./spawnParticles.js";
import {enemies} from "./enemies.js";
import {tank} from "./tank.js";
import {dropAmmo} from "./dropAmmo.js";
import {addScore} from "./addScore.js";

export function enemyCollision() {
	for (let enemy of enemies) {
		enemy.update();
		enemy.draw();
		
		if (checkTankEnemyCollision(tank, enemy)) {
			tank.health -= 10;
			spawnParticles(enemy.x, enemy.y);
			dropAmmo(enemy);
			enemies.splice(enemies.indexOf(enemy), 1);
			addScore(100);
		}
		
		// for (let point of tankTrail) {
		// 	if (checkEnemyTrailCollision(enemy, point.left) || checkEnemyTrailCollision(enemy, point.right)) {
		// 		spawnParticles(enemy.x, enemy.y);
		// 		enemies.splice(enemies.indexOf(enemy), 1);
		// 		addScore(100);
		// 	}
		// }
	}
}