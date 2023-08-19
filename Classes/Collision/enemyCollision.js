import {checkTankEnemyCollision} from "./checkTankEnemyCollision.js";
import {spawnParticles} from "../Emitters/spawnParticles.js";
import {enemies} from "../CollectionManagement/enemies.js";
import {tank} from "../Config/tank.js";
import {dropAmmo} from "../Events/dropAmmo.js";
import {addScore} from "../Player/Actions/addScore.js";

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