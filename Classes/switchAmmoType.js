import {ammo} from "./ammo.js";

export function switchAmmoType() {
	const ammoTypes = Object.keys(ammo).filter(type => type !== 'currentType');
	const currentIndex = ammoTypes.indexOf(ammo.currentType);
	let nextIndex = (currentIndex + 1) % ammoTypes.length;
	ammo.currentType = ammoTypes[nextIndex];
}