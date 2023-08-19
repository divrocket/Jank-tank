import {Particle} from "../Objects/particle.js";
import {particles} from "../CollectionManagement/particles.js";

export function spawnParticles(x, y) {
	const numberOfParticles = Math.floor(Math.random() * 31) + 10;
	for (let i = 0; i < numberOfParticles; i++) {
		particles.push(new Particle(x, y));
	}
}