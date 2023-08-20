import {ctx} from "../Canvas/ctx.js";
import {tankTrail} from "../CollectionManagement/tankTrail.js";
import {ammo} from "../Config/ammo.js";

export function drawTankTreadTrail() {
	const selectedAmmo = ammo[ammo.currentType];
	const shadowColor = selectedAmmo.color1;
	const color2 = selectedAmmo.color2;
	const trailLength = tankTrail.length;
	const trailWidth = 50; // Adjust this value for the desired width
	
	function hexToRgbA(hex, alpha = 1) {
		let c;
		if (/^#([A-Fa-f0-9]{3,6})$/.test(hex)) {
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
	
	ctx.save();
	ctx.shadowColor = shadowColor;
	ctx.shadowBlur = 20;
	
	for (let i = 0; i < trailLength; i++) {
		const alpha = (i + 1) / trailLength;
		const tread = tankTrail[i];
		
		ctx.fillStyle = hexToRgbA(color2, alpha); // Set fill color with decreasing opacity
		
		// Drawing middle tread centered and wider
		ctx.fillRect(tread.x - (trailWidth / 2), tread.y - 5, trailWidth, 10);
	}
	
	ctx.restore();
}
