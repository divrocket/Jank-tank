import {muzzleParticles} from "../CollectionManagement/collector.js";
import {ctx} from "../Canvas/ctx.js";

export function drawMuzzleParticles() {
	if(muzzleParticles.length > 0 && muzzleParticles[0].life > 0) {
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
	} else {
		muzzleParticles.length = 0;
	}
}