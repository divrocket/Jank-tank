import { dustParticles } from "../CollectionManagement/collector.js";

export function animateDust() {
	for (let dustParticle of dustParticles) {
		dustParticle.update();
		dustParticle.draw();
	}
	requestAnimationFrame(animateDust);
}
