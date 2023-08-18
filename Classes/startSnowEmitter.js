import {Snowflake} from "./snowflake.js";
import {numberOfSnowflakes} from "./numberOfSnowflakes.js";
import {snowflakes} from "./snowflakes.js";
import {animateSnow} from "./animateSnow.js";

export function startSnowEmitter() {
	// Initialize snowflakes
	for (let i = 0; i < numberOfSnowflakes; i++) {
		snowflakes.push(new Snowflake());
	}
	animateSnow()
}