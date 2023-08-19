import {DustParticle} from "./dustParticle.js";
import {animateDust} from "./animateDustParticle.js";
import {numberOfDustParticles} from "./numberOfDustParticles.js";
import {dustParticles} from "./dustParticles.js";

export function startDustEmitter() {
	// Initialize dust particles
	
	for (let i = 0; i < numberOfDustParticles; i++) {
		dustParticles.push(new DustParticle());
	}
	animateDust();
}
