import { dustParticles } from "../CollectionManagement/dustParticles.js";

export function animateDust() {
	for (let dustParticle of dustParticles) {
		dustParticle.update();
		dustParticle.draw();
	}
	requestAnimationFrame(animateDust);
}
