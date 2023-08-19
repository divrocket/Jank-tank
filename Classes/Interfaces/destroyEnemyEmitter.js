export function destroyEnemyEmitter() {
	clearInterval(enemyEmitter);
	enemyEmitter = null;
}