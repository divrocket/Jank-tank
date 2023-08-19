import {ctx} from "../Canvas/ctx.js";
import {ammo} from "../Config/ammo.js";

export class SmokeParticle {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.speed = Math.random() * 0.5 + 0.5; // Slower speed, between 0.5 and 1
		const randomAngle = Math.random() * (Math.PI * 2);
		
		this.dx = Math.cos(randomAngle) * this.speed;
		this.dy = Math.sin(randomAngle) * this.speed;
		this.size = Math.random() * 5 + 1; // Random size between 3 and 8
		this.life = Math.random() * 0.8 + 0.2;  // Life between 0.2 and 1 second
		this.alpha = 0.5; // Semi-transparent for smoke effect
	}
	
	update() {
		this.x += this.dx;
		this.y += this.dy;
		this.life -= 0.02; // Smoke particles will fade faster
		this.alpha -= 0.02;
	}
	
	draw(ctx) {
		
		let selectedAmmo = ammo[ammo.currentType];
		
		ctx.save();
		function getRandomColor() {
			const colors = [selectedAmmo.color1];
			return colors[Math.floor(Math.random() * colors.length)];
		}
		
		// Glowing effect
		ctx.shadowColor = selectedAmmo.color1;
		ctx.shadowBlur = 6;
		
	
		ctx.globalAlpha = this.alpha;
		ctx.fillStyle = getRandomColor();
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.size, 4, 5 * Math.PI);
		ctx.fill();
		ctx.restore();
	}
}