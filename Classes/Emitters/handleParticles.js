import {particles} from "../CollectionManagement/particles.js";

export function handleParticles(ctx) {
	for (let i = particles.length - 1; i >= 0; i--) {
		particles[i].update();
		if (particles[i].life <= 0) {
			particles.splice(i, 1);
		} else {
			particles[i].draw(ctx);
		}
	}
}