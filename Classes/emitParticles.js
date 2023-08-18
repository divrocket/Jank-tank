import {MuzzleParticle} from "./muzzleParticle.js";
import {SmokeParticle} from "./smokeParticle.js";
import {particles} from "./particles.js";

export function emitParticles(x, y, mainAngle) {
	// Angle boundaries for the cone shape
	const coneWidth = Math.PI / 6;  // The cone will be 1/6th of a circle (or 30 degrees wide)
	const minAngle = mainAngle - coneWidth / 2;
	const maxAngle = mainAngle + coneWidth / 2;
	
	// Emitting muzzle particles within a cone
	let muzzleCount = Math.random() * 10 + 5;
	for (let i = 0; i < muzzleCount; i++) {
		const randomAngle = Math.random() * (maxAngle - minAngle) + minAngle;
		const particle = new MuzzleParticle(x, y, randomAngle);
		particles.push(particle);
	}
	
	// Emitting smoke particles (unchanged)
	let smokeCount = Math.random() * 5 + 3;  // Emit fewer smoke particles (3 to 8)
	for (let i = 0; i < smokeCount; i++) {
		const smoke = new SmokeParticle(x, y);
		particles.push(smoke);
	}
}