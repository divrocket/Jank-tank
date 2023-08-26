import {Particle} from "../Objects/particle.js";
import {particles} from "../CollectionManagement/collector.js";

export function particleEmitter(x, y, colors) {
	const numberOfParticles = Math.floor(Math.random() * 25) + 3;
	for (let i = 0; i < numberOfParticles; i++) {
		particles.push(new Particle(x, y, colors));
	}
}