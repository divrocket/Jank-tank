import {particles} from "../CollectionManagement/particles.js";
import {ctx} from "../Canvas/ctx.js";

export function drawParticles() {
	for (let i = particles.length - 1; i >= 0; i--) {
		particles[i].update();
		if (particles[i].life <= 0 || particles[i].alpha <= 0) {
			console.log("Particle removed")
			particles.splice(i, 1);
		} else {
			console.log("Particle Created")
			particles[i].draw(ctx);
		}
	}
}