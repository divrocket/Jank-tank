import {tankTrail} from "../CollectionManagement/tankTrail.js";
import {bullets} from "../CollectionManagement/bullets.js";
import {dustParticles} from "../CollectionManagement/dustParticles.js";
import {snowflakes} from "../CollectionManagement/snowflakes.js";
import {rocks} from "../CollectionManagement/rocks.js";
import {enemies} from "../CollectionManagement/enemies.js";
import {droppedAmmo} from "../CollectionManagement/droppedAmmo.js";
import {keys} from "../CollectionManagement/keys.js";
import {particles} from "../CollectionManagement/particles.js";
import {score} from "../CollectionManagement/score.js";


export class systemProfiler {
	constructor() {
		this._profiler = {
			tankTrail: tankTrail,
			bullets: bullets,
			dustParticles: dustParticles,
			snowflakes: snowflakes,
			rocks: rocks,
			enemies: enemies,
			droppedAmmo: droppedAmmo,
			keys: keys,
			particles: particles,
			score: score
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