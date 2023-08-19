import {ctx} from "../Canvas/ctx.js";

export class MuzzleParticle {
	constructor(x, y, angle) {
		this.x = x;
		this.y = y;
		this.speed = Math.random() * 5 + 2;  // Random speed between 2 and 7
		this.life = Math.random() * 0.8 + 0.2;  // Life between 0.2 and 1 second
		this.alpha = 1;
		this.dx = Math.cos(angle) * this.speed;
		this.dy = Math.sin(angle) * this.speed;
	}
	
	update() {
		this.x += this.dx;
		this.y += this.dy;
		this.life -= 0.04;  // Decrement the life every frame
		this.alpha -= 0.01;
	}
	
	// Function to get a random color among shades of red, yellow, and orange
	getRandomColor() {
		const colors = [
			`rgba(${255}, 0, ${Math.floor(Math.random() * 56)}, 1)`, // Red to Orange shades
			`rgba(${255}, 0, ${Math.floor(Math.random() * 156) + 100}, 1)`, // Yellow shades
			`rgba(${255 - Math.floor(Math.random() * 56)}, 0, ${64 + Math.floor(Math.random() * 56)}, 1)` // Orange shades
		];
		return colors[Math.floor(Math.random() * colors.length)];
	}
	
	draw(ctx) {
		ctx.save();
		// Glowing effect
		ctx.shadowColor = "#00ffff";
		ctx.shadowBlur = 12;
		ctx.globalAlpha = this.alpha;
		ctx.fillStyle = this.getRandomColor();  // Using the random color function
		ctx.beginPath();
		ctx.arc(this.x, this.y, 1, 0, 2 * Math.PI);
		ctx.fill();
		ctx.restore();
	}
}