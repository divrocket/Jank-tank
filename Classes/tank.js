import {canvas} from "./ctx.js";

export let tank = {
	width: 90,
	height: 60,
	angle: 0,
	rotationSpeed: 0.01, // Controls the speed of the tank's rotation,
	health: 100, // for example, full health starts at 100
	maxHealth: 100,
	x: canvas.width / 2,
	y: canvas.height - 50,
};