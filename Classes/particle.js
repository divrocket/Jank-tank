export class Particle {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.size = Math.random() * 5 + 1; // varying sizes
		this.speedX = Math.random() * 5 - 2.5; // wider horizontal range
		this.speedY = Math.random() * -3 - 1;  // negative for upwards movement
		this.gravity = 0.1; // adjust as needed
		this.alpha = 1;
	}
	
	update() {
		this.speedY += this.gravity; // apply gravity
		this.y += this.speedY;
		this.x += this.speedX;
		this.alpha -= 0.005; // adjust as needed for fade-out speed
	}
	
	draw(ctx) {
		ctx.save(); // Save the current context state
		ctx.globalAlpha = this.alpha; // for fade-out effect
		ctx.fillStyle = `rgba(${Math.floor(Math.random() * 55 + 200)}, 0, 0, 0.8)`; // shades of red
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
		ctx.fill();
		ctx.restore(); // Restore the context state to what it was before
	}
	
}