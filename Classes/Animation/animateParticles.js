import { particles } from '../CollectionManagement/particles.js';
import { ctx } from "../Canvas/ctx.js";

export function animateParticles() {
	for (let i = 0; i < particles.length; i++) {
		particles[i].update();
		particles[i].draw(ctx);
		if (particles[i].alpha <= 0) {
			particles.splice(i, 1);
			i--; // decrease index since we're removing an item
		}
	}
}