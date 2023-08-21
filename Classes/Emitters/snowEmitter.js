import {SnowParticle} from "../Objects/snowParticle.js";
import {numberOfSnowflakes} from "../Config/numberOfSnowflakes.js";
import {snowflakes} from "../CollectionManagement/snowflakes.js";
import {animateSnow} from "../Animation/animateSnow.js";

export function snowEmitter() {
	// Initialize snowflakes
	for (let i = 0; i < numberOfSnowflakes; i++) {
		snowflakes.push(new SnowParticle());
	}
	animateSnow()
}