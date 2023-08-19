import {canvas, ctx} from "../Canvas/ctx.js";

export class Snowflake {
	constructor() {
		this.x = Math.random() * canvas.width;
		this.y = Math.random() * canvas.height;
		this.radius = Math.random() * 4; // Snowflake size
		this.speed = Math.random() * 2; // Falling speed
	}
	
	update() {
		this.y += this.speed;
		// Reset snowflake to the top once it goes beyond canvas height
		if (this.y > canvas.height) {
			this.y = 0;
			this.x = Math.random() * canvas.width;
		}
	}
	
	draw() {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
		ctx.fillStyle = 'rgba(0,0,0,0.04)'; // Snowflake color
		ctx.fill();
		ctx.closePath();
	}
}