import {ammo} from "./ammo.js";

export function reloadAmmo() {
	
	const currentAmmo = ammo[ammo.currentType];
	if (currentAmmo.reloading) return; // Already reloading
	
	currentAmmo.reloading = true;
	
	setTimeout(() => {
		currentAmmo.currentMagazine = currentAmmo.magazineSize; // Refill the magazine
		currentAmmo.reloading = false; // End the reloading state
	}, currentAmmo.reloadSpeed);
}