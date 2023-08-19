import {ctx} from "../Canvas/ctx.js";
export class Enemy {
	constructor(x, y, width, height, speed) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.speed = speed;
		this.framesSinceLastChange = 0;
		
		this.changeDirection(); // Set initial direction
		
		// Add a property to hold the enemy image
		this.image = new Image();
		this.image.src = 'assets/enemy/enemy.png'; // the path to your enemy image
	}
	
	changeDirection() {
		// Randomly set dx and dy to achieve random directions
		this.dx = (Math.random() - 0.5) * this.speed;
		this.dy = (Math.random() - 0.5) * this.speed;
		this.framesSinceLastChange = 0;
	}
	
	draw() {
		// Instead of filling a rectangle, draw the enemy image
		ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
	}
	
	update() {
		// Increase the frames counter
		this.x = this.x + this.dx;
		this.y = this.y + this.dy;
	}
}