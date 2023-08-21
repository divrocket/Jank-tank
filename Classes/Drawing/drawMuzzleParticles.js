import {muzzleParticles} from "../CollectionManagement/muzzleParticles.js";
import {ctx} from "../Canvas/ctx.js";

export function drawMuzzleParticles() {
	for (let i = muzzleParticles.length - 1; i >= 0; i--) {
		muzzleParticles[i].update();
		if (muzzleParticles[i].life <= 0 || muzzleParticles[i].alpha <= 0) {
			muzzleParticles.splice(i, 1);
		} else {
			muzzleParticles[i].draw(ctx);
		}
	}
	
	while (muzzleParticles.length > 40) {
		muzzleParticles.shift();
	}
}