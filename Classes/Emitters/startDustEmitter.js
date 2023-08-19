import {DustParticle} from "../Objects/DustParticle.js";
import {animateDust} from "../Animation/animateDustParticle.js";
import {numberOfDustParticles} from "../Config/numberOfDustParticles.js";
import {dustParticles} from "../CollectionManagement/dustParticles.js";

export function startDustEmitter() {
	// Initialize dust particles
	
	for (let i = 0; i < numberOfDustParticles; i++) {
		dustParticles.push(new DustParticle());
	}
	animateDust();
}
