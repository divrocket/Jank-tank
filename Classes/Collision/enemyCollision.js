import {checkTankEnemyCollision} from "./checkTankEnemyCollision.js";
import {particleEmitter} from "../Emitters/particleEmitter.js";
import {enemies} from "../CollectionManagement/enemies.js";
import {tank} from "../Config/tank.js";
import {dropAmmo} from "../Events/dropAmmo.js";
import {addScore, createScorePopup} from "../Player/Actions/addScore.js";
import {tankTrail} from "../CollectionManagement/tankTrail.js";

export function enemyCollision() {
	for (let enemy of enemies) {
		enemy.update();
		enemy.draw();
		
		if (checkTankEnemyCollision(tank, enemy)) {
			tank.health -= 10;
			
			particleEmitter(enemy.x, enemy.y);
			dropAmmo(enemy);
			addScore(100);
			createScorePopup(enemy.x,enemy.y, 100);
			
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