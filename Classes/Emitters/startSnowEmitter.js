import {Snowflake} from "../Objects/snowflake.js";
import {numberOfSnowflakes} from "../Config/numberOfSnowflakes.js";
import {snowflakes} from "../CollectionManagement/snowflakes.js";
import {animateSnow} from "../Animation/animateSnow.js";

export function startSnowEmitter() {
	// Initialize snowflakes
	for (let i = 0; i < numberOfSnowflakes; i++) {
		snowflakes.push(new Snowflake());
	}
	animateSnow()
}