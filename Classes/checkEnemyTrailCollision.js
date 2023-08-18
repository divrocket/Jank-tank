function checkEnemyTrailCollision(enemy, point) {
	const dx = enemy.x - point.x;
	const dy = enemy.y - point.y;
	const distance = Math.sqrt(dx * dx + dy * dy);
	
	// Return true if the distance between the enemy's center and the point is less than half the enemy's size
	return distance < (enemy.width / 2);
}