import {keys} from "../CollectionManagement/collector.js";

export function preventDuplicateKeyActions() {
	document.addEventListener('keydown', function (e) {
		keys[e.key] = true;
	});
	
	document.addEventListener('keyup', function (event) {
		keys[event.key] = false;
	});
	
	document.addEventListener("keydown", function (e) {
		keys[e.key] = true;
	});
	
	document.addEventListener("keyup", function (e) {
		keys[e.key] = false;
	});
}