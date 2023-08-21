import { ctx } from "../../Canvas/ctx.js";

export let score = 0;
export function addScore(points) {
	score += points;
}

let scorePopups = [];

export function createScorePopup(x, y, value) {
	scorePopups.push({
		x: x,
		y: y,
		value: value,
		opacity: 1, // Starting at full opacity
		duration: 50, // You can adjust this to control how long it displays
	});
}

export function handleScorePopups() {
	ctx.font = '35px Arial'; // You can adjust to your desired font and size
	ctx.textAlign = 'center';
	
	while (scorePopups.length > 20) {
		scorePopups.shift(); // Remove the oldest score popup
	}
	
	for (let i = scorePopups.length - 1; i >= 0; i--) {
		let popup = scorePopups[i];
		
		ctx.fillStyle = `rgba(255, 255, 255, ${popup.opacity})`; // Assuming white text; adjust as needed
		ctx.fillText(`+${popup.value}`, popup.x, popup.y);
		
		popup.y -= 2; // Slowly move the text upwards
		popup.duration--;
		popup.opacity -= 0.02; // Reduce the opacity
		
		if (popup.duration <= 0) {
			scorePopups.splice(i, 1); // Remove when the duration is over
		}
	}
}
