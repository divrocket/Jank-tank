export let ammo = {
	currentType: 'armorPiercing',
	standard: {
		count: 20,
		speed: 5,
		color1: '#00ff00',
		color2: '#2f8d2f',
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
		color1: '#ff0000',
		color2: '#8a2626',
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
		color1: '#00ffff',
		color2: '#1b7373',
		size: 4,
		effect: 'penetrate',
		magazineSize: 100,
		currentMagazine: 4,
		fireRate: 300,
		lastFired: 0,
		reloadSpeed: 1500,
		reloading: false
	},
	incendiary: {
		count: 10,
		speed: 3,
		color1: '#ff9900',
		color2: '#8d5a2f',
		size: 5,
		effect: 'burn',
		magazineSize: 3,
		currentMagazine: 3,
		fireRate: 1000,
		lastFired: 0,
		reloadSpeed: 2000,
		reloading: false
	},
	emp: {
		count: 5,
		speed: 4,
		color1: '#ff00ff',
		color2: '#8a268a',
		size: 6,
		effect: 'emp',
		magazineSize: 2,
		currentMagazine: 2,
		fireRate: 1000,
		lastFired: 0,
		reloadSpeed: 3000,
		reloading: false
	}
};
export function addAmmo(type, count) {
	if (ammo[type]) {
		ammo[type].count += count;
	}
}