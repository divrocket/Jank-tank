import {canvas} from "./ctx.js";

export let tank_cannon = {
	x: canvas.width / 2,
	y: canvas.height - 50,
	size: 30,
	dx: 2,
	dy: 2,
	angle: 0,  // Set to 0 so the cannon starts at the front
	rotationSpeed: 0.02,
	muzzleFlash: false,
	flashDuration: 400,  // duration in milliseconds, you can adjust as needed
	flashSize: 0
};