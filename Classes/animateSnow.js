import { snowflakes } from './snowflakes.js';

export function animateSnow() {
	
	for (const snowflake of snowflakes) {
		snowflake.update();
		snowflake.draw();
	}
	
	requestAnimationFrame(animateSnow);
}