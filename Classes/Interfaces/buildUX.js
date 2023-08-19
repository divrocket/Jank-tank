import {enemies} from "../CollectionManagement/enemies.js";
import {destroyEnemyEmitter} from "./destroyEnemyEmitter.js";
import {startEnemyEmitter} from "../Emitters/startEnemyEmitter.js";

export let ui_active = false;

export function buildUX() {
	if (ui_active) return;
	let hr = document.createElement("hr");
	document.body.appendChild(hr);
	
	let clear_enemies = document.createElement("button");
	clear_enemies.innerHTML = "Clear enemies";
	document.body.appendChild(clear_enemies);
	clear_enemies.addEventListener("click", function () {
		enemies = [];
		destroyEnemyEmitter()
	});
	
	let start_wave = document.createElement("button");
	start_wave.innerHTML = "Start Wave";
	document.body.appendChild(start_wave);
	start_wave.addEventListener("click", function () {
		startEnemyEmitter()
	})
	ui_active = true;
}