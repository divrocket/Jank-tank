import {canvas} from "./ctx.js";

export let tank_cannon = {
	x: canvas.width / 2,
	y: canvas.height - 50,
	size: 50,
	dx: 3,
	dy: 3,
	angle: 0,  // Set to 0 so the cannon starts at the front
	rotationSpeed: 0.05,
	muzzleFlash: false,
	flashDuration: 10,  // duration in milliseconds, you can adjust as needed
	flashSize: 0
};