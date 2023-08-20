import {DustParticle} from "../Objects/dustParticle.js";
import {animateDust} from "../Animation/animateDustParticle.js";
import {numberOfDustParticles} from "../Config/numberOfDustParticles.js";
import {dustParticles} from "../CollectionManagement/dustParticles.js";

export function dustEmitter() {
	// Initialize dust particles
	
	for (let i = 0; i < numberOfDustParticles; i++) {
		dustParticles.push(new DustParticle());
	}
	animateDust();
}
