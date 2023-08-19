import {ctx} from "../Canvas/ctx.js";
import {tankTrail} from "../CollectionManagement/tankTrail.js";
import {ammo} from "../Config/ammo.js";

export function drawTankTreadTrail() {
	let selectedAmmo = ammo[ammo.currentType];
	
	function hexToRgbA(hex, alpha=1){
		let c;
		if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
			c= hex.substring(1).split('');
			if(c.length== 3){
				c= [c[0], c[0], c[1], c[1], c[2], c[2]];
			}
			c= '0x'+c.join('');
			return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+','+alpha+')';
		}
		throw new Error('Bad Hex');
	}
	
	for (let i = 0; i < tankTrail.length; i++) {
		let alpha = (i + 1) / tankTrail.length;
		ctx.save();
		// Glowing effect
		ctx.shadowColor = selectedAmmo.color1;
		ctx.shadowBlur = 6;
		
		ctx.fillStyle = hexToRgbA(selectedAmmo.color1, alpha) // Set the fill color with decreasing opacity
		let treads = tankTrail[i];
		
		// Drawing left tread
		ctx.fillRect(treads.left.x - 5, treads.left.y - 5, 10, 10);
		
		// Drawing right tread
		ctx.fillRect(treads.right.x - 5, treads.right.y - 5, 10, 10);
		
		ctx.restore()
	}
	
}