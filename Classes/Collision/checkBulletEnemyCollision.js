export function checkBulletEnemyCollision(bullet, enemy) {
	return bullet.x < enemy.x + enemy.width &&
		bullet.x + bullet.size > enemy.x &&
		bullet.y < enemy.y + enemy.height &&
		bullet.y + bullet.size * 2 > enemy.y;
}