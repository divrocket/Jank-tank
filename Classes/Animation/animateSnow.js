import { snowflakes } from '../CollectionManagement/collector.js';

export function animateSnow() {
	
	for (const snowflake of snowflakes) {
		snowflake.update();
		snowflake.draw();
	}
	
	requestAnimationFrame(animateSnow);
}