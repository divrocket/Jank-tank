import {ammo} from "../../Config/ammo.js";

// Updated reloadAmmo function
export function reloadAmmo() {
	const currentAmmo = ammo[ammo.currentType];
	if (currentAmmo.reloading) return; // Already reloading
	
	currentAmmo.reloading = true;
	currentAmmo.reloadProgress = 0;  // Initializing reloadProgress
	
	const reloadInterval = setInterval(() => {
		currentAmmo.reloadProgress += 1;  // Updating progress
		
		if (currentAmmo.reloadProgress >= 100) {
			clearInterval(reloadInterval);  // Clearing the interval
			currentAmmo.currentMagazine = currentAmmo.magazineSize; // Refill the magazine
			currentAmmo.reloading = false; // End the reloading state
		}
	}, currentAmmo.reloadSpeed / 100);  // Dividing by 100 for 100 steps of progress
}