import {ctx} from "../Canvas/ctx.js";
import {tankTrail} from "../CollectionManagement/tankTrail.js";
import {ammo} from "../Config/ammo.js";


function hexToRgbA(hex, alpha = 1) {
	let c;
	if (/^#([A-Fa-f0-9]{3,6})$/.test(hex)) { // Merged the two regex patterns
		if (hex.length === 4) {
			c = [hex[1], hex[1], hex[2], hex[2], hex[3], hex[3]].join('');
		} else {
			c = hex.substring(1);
		}
		const num = parseInt(c, 16);
		return `rgba(${(num >> 16) & 255},${(num >> 8) & 255},${num & 255},${alpha})`;
	}
	throw new Error('Bad Hex');
}

export function drawTankTreadTrail() {
	const selectedAmmo = ammo[ammo.currentType];
	const shadowColor = selectedAmmo.color2;
	const color2 = selectedAmmo.color1;
	const trailLength = tankTrail.length;
	
	ctx.save();
	ctx.shadowColor = shadowColor;
	ctx.shadowBlur = 1;
	
	for (let i = 0; i < trailLength; i++) {
		const alpha = (i + 1) / trailLength;
		const treads = tankTrail[i];
		
		ctx.fillStyle = hexToRgbA(color2, alpha); // Set fill color with decreasing opacity
		
		// Drawing middle tread as a circle
		const middleTread = treads.middle;
		
		// Parameters: x, y, radius, startAngle, endAngle, [anticlockwise]
		ctx.beginPath();
		ctx.arc(middleTread.x, middleTread.y, 35, 0, 2 * Math.PI);
		ctx.fill();
		ctx.closePath();
	}
	
	ctx.restore();
}