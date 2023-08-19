import {ctx} from "../Canvas/ctx.js";
import {tank} from "../Config/tank.js";

export function drawHealthBar() {
	const barWidth = 200;
	const barHeight = 20;
	const x = 20; // for padding from the left
	const y = 20; // for padding from the top
	
	// Background of the health bar (usually a dim color to represent "missing" health)
	ctx.fillStyle = "lightgrey";
	ctx.fillRect(x, y, barWidth, barHeight);
	
	// Foreground of the health bar (representing the actual health)
	const healthPercentage = tank.health / tank.maxHealth;
	ctx.fillStyle = tank.health > 70 ? "green" : tank.health > 30 ? "yellow" : "red";
	ctx.fillRect(x, y, barWidth * healthPercentage, barHeight);
}