import {canvas, ctx} from "../Canvas/ctx.js";
import {ammo} from "../Config/ammo.js";

export function displayAmmoUI() {
	const currentAmmo = ammo[ammo.currentType];
	
	// Display background for UI
	ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'; // semi-transparent black
	ctx.fillRect(10, canvas.height - 60, 200, 50);
	
	// Display current ammo type
	ctx.font = '16px Arial';
	ctx.fillStyle = 'white';
	ctx.fillText(`Type: ${ammo.currentType}`, 20, canvas.height - 40);
	
	// Display magazine and total count
	ctx.fillText(`Magazine: ${currentAmmo.currentMagazine}/${currentAmmo.magazineSize}`, 20, canvas.height - 20);
	ctx.fillText(`Total: ${currentAmmo.count}`, 150, canvas.height - 20);
}