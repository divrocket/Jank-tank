import {canvas, ctx} from "../Canvas/ctx.js";

export class Enemy {
	constructor(x, y, width, height, speed) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.speed = speed;
		
		this.setColorGradient();
		this.setInitialDirection();
	}
	
	setColorGradient() {
		this.gradient = ctx.createRadialGradient(this.x + this.width / 2, this.y + this.height / 2, 5, this.x + this.width / 2, this.y + this.height / 2, this.width / 2);
		this.gradient.addColorStop(0, 'rgba(50, 255, 50, 1)');
		this.gradient.addColorStop(1, 'rgba(0, 50, 0, 0)');
	}
	
	setInitialDirection() {
		if (this.x < 0) {
			this.dx = this.speed;
			this.dy = (Math.random() - 0.5) * this.speed;
		} else if (this.x > canvas.width) {
			this.dx = -this.speed;
			this.dy = (Math.random() - 0.5) * this.speed;
		} else if (this.y < 0) {
			this.dx = (Math.random() - 0.5) * this.speed;
			this.dy = this.speed;
		} else if (this.y > canvas.height) {
			this.dx = (Math.random() - 0.5) * this.speed;
			this.dy = -this.speed;
		}
	}
	
	changeDirection() {
		this.dx = (Math.random() - 0.5) * this.speed;
		this.dy = (Math.random() - 0.5) * this.speed;
	}
	
	draw() {
		ctx.shadowBlur = 0;
		ctx.shadowColor = "lime";
		ctx.fillStyle = this.gradient;
		ctx.fillRect(this.x, this.y, this.width, this.height);
		ctx.shadowBlur = 0;
	}
	
	update() {
		this.x += this.dx;
		this.y += this.dy;
		
		if (this.x + this.width > canvas.width && this.dx > 0) {
			this.dx = -this.dx;
		}
		if (this.x < 0 && this.dx < 0) {
			this.dx = -this.dx;
		}
		if (this.y + this.height > canvas.height && this.dy > 0) {
			this.dy = -this.dy;
		}
		if (this.y < 0 && this.dy < 0) {
			this.dy = -this.dy;
		}
		
		this.setColorGradient();
	}
}
