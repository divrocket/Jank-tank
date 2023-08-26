import { particles } from '../CollectionManagement/collector.js';
import { ctx } from "../Canvas/ctx.js";

export function animateParticles() {
	if (particles.length > 0 && particles[0].life > 0) {
		for (let i = 0; i < particles.length; i++) {
			particles[i].update();
			particles[i].draw(ctx);
			if (particles[i].alpha <= 0 || particles[i].life <= 0) {
				particles.splice(i, 1);
				i--; // decrease index since we're removing an item
			}
		}
	} else {
		particles.length = 0;
	}
}