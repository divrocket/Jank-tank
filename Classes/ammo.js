export let ammo = {
	currentType: 'armorPiercing',
	standard: {
		count: 20,
		speed: 5,
		color1: 'silver',
		color2: 'gray',
		size: 5,
		effect: 'none',
		magazineSize: 5,
		currentMagazine: 5,
		fireRate: 500,
		lastFired: 0,
		reloadSpeed: 2000,
		reloading: false
	},
	explosive: {
		count: 5,
		speed: 4,
		color1: 'red',
		color2: 'darkred',
		size: 6,
		effect: 'explode',
		magazineSize: 2,
		currentMagazine: 2,
		fireRate: 1000,
		lastFired: 0,
		reloadSpeed: 3000,
		reloading: false
	},
	armorPiercing: {
		count: 1000,
		speed: 10,
		color1: 'blue',
		color2: 'darkblue',
		size: 4,
		effect: 'penetrate',
		magazineSize: 100,
		currentMagazine: 4,
		fireRate: 300,
		lastFired: 0,
		reloadSpeed: 1500,
		reloading: false
	}
};
export function addAmmo(type, count) {
	if (ammo[type]) {
		ammo[type].count += count;
	}
}