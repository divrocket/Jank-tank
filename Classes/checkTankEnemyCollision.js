import {tank_cannon} from "./tank_cannon.js";

export function checkTankEnemyCollision(tank, enemy) {
	return tank_cannon.x < enemy.x + enemy.width &&
		tank_cannon.x + tank.width > enemy.x &&
		tank_cannon.y < enemy.y + enemy.height &&
		tank_cannon.y + tank.height > enemy.y;
}