export const statsConfig = {
	"imports": {
		"systemProfiler": "../Profiling/process.js"
	},
	"profilerInstance": "systemProfiler",
	"stats": [
		{
			"elementId": "numberOfObjects",
			"description": "Number of Objects:",
			"type": "scalar",
			"property": "profilerSize"
		},
		{
			"elementId": "bulletsLength",
			"description": "Bullets Array Length:",
			"type": "arrayLength",
			"arrayName": "bullets"
		},
		{
			"elementId": "tankTrailLength",
			"description": "Tank Trail Length:",
			"type": "arrayLength",
			"arrayName": "tankTrail"
		},
		{
			"elementId": "dustParticlesLength",
			"description": "Dust Particles Length:",
			"type": "arrayLength",
			"arrayName": "dustParticles"
		},
		{
			"elementId": "snowflakesLength",
			"description": "Snowflakes Length:",
			"type": "arrayLength",
			"arrayName": "snowflakes"
		},
		{
			"elementId": "rocksLength",
			"description": "Rocks Length:",
			"type": "arrayLength",
			"arrayName": "rocks"
		},
		{
			"elementId": "enemiesLength",
			"description": "Enemies Length:",
			"type": "arrayLength",
			"arrayName": "enemies"
		},
		{
			"elementId": "droppedAmmoLength",
			"description": "Dropped Ammo Length:",
			"type": "arrayLength",
			"arrayName": "droppedAmmo"
		},
		{
			"elementId": "keysLength",
			"description": "Keys Length:",
			"type": "arrayLength",
			"arrayName": "keys"
		},
		{
			"elementId": "particlesLength",
			"description": "Particles Length:",
			"type": "arrayLength",
			"arrayName": "particles"
		},
		{
			"elementId": "scoreValue",
			"description": "Score:",
			"type": "scalar",
			"property": "score"
		}
	]
}
