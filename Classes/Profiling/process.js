import * as collection from "../CollectionManagement/collector.js";

export class systemProfiler {
	constructor() {
		this._profiler = {
			tankTrail: collection.tankTrail,
			bullets: collection.bullets,
			dustParticles: collection.dustParticles,
			snowflakes: collection.snowflakes,
			rocks: collection.rocks,
			enemies: collection.enemies,
			droppedAmmo: collection.droppedAmmo,
			keys: collection.keys,
			particles: collection.particles,
			score: collection.score
		};
	}
	
	get profiler() {
		return this._profiler;
	}
	
	set profiler(value) {
		this._profiler = value;
	}
	
	get profilerSize() {
		return Object.keys(this._profiler).length;
	}
	
	getObjectArrayLength(objectKey) {
		const objectValue = this._profiler[objectKey];
		if (Array.isArray(objectValue)) {
			return objectValue.length;
		}
		return null; // or throw an error if preferred
	}
}