import {ctx} from "../Canvas/ctx.js";
import {ammo} from "../Config/ammo.js";

export class Particle {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.size = Math.random() * 5 + 1;
		this.speedX = Math.random() * 5 - 2.5;
		this.speedY = Math.random() * -3 - 1;
		
		this.gravity = 0.3;
		this.bounceFactor = 0.1;
		this.alpha = 1;
		this.groundLevel = (this.y - 30) + (Math.random() * 200 + 10);
		this.selectedAmmo = ammo[ammo.currentType];
		this.colors = [
			this.selectedAmmo.color1,
		];
		this.color = this.colors[Math.floor(Math.random() * this.colors.length)]; // Randomly select a color
		
		this.hasBounced = false; // flag to check if particle has bounced
		this.fadeDelay = 200; // time in frames to delay fade after bounce
	}
	
	update() {
		if (this.alpha < 0.02) return;
		
		this.speedY += this.gravity;
		this.y += this.speedY;
		
		if (!this.hasBounced) {
			this.x += this.speedX; // move horizontally only if it hasn't bounced
		}
		
		if (this.y + this.size > this.groundLevel) {
			this.y = this.groundLevel - this.size;
			this.speedY *= -this.bounceFactor;
			this.speedX = 0; // Stop horizontal movement after first bounce
			this.hasBounced = true;
		}
		
		if (this.hasBounced) {
			if (this.fadeDelay <= 0) {
				this.alpha -= 0.005;
			} else {
				this.fadeDelay--;
			}
		}
	}
	
	draw() {
		ctx.save();
		// Glowing effect
		ctx.shadowColor = this.selectedAmmo.color1;
		ctx.shadowBlur = 6;
		ctx.globalAlpha = this.alpha;
		ctx.fillStyle = this.color;
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
		ctx.fill();
		ctx.restore();
	}
}
