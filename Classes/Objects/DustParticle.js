import { canvas, ctx } from "../Canvas/ctx.js";

export class DustParticle {
	constructor() {
		this.x = -10;  // Starting just off the left side of the canvas
		this.y = Math.random() * canvas.height;
		this.radius = Math.random() * 2 + 4 // Dust particle size
		this.speed = Math.random() * 2; // Horizontal travel speed
		this.opacity = Math.random() * 0.1
	}
	
	update() {
		this.x += this.speed;
		// Reset dust particle to the left once it goes beyond canvas width
		if (this.x > canvas.width) {
			this.x = -10;
			this.y = Math.random() * canvas.height;
		}
	}
	
	draw() {
		ctx.beginPath();
		// ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
		ctx.fillRect(this.x, this.y, 10,10);  // 1x1 pixel speckles
		ctx.fillStyle = 'rgba(176,176,176,0.28)'; // Brownish color for dust
		ctx.fillStyle = `rgba(176,176,176, ${this.opacity})`;  // Brownish color for dust
		ctx.fill();
		ctx.closePath();
	}
}
