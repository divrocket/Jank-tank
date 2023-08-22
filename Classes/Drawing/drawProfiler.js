import {systemProfiler} from "../Profiling/process.js";
import {statsConfig} from "../Profiling/config.js";

const profiler = new systemProfiler();

export function drawStatsToPage() {
	// Get the parent container
	const container = document.getElementById('statsContainer');
	
	for (let stat of statsConfig.stats) {
		// Check if an element with the stat's ID already exists
		let statElement = document.getElementById(stat.elementId);
		
		// If it doesn't exist, create a new div for this stat
		if (!statElement) {
			statElement = document.createElement('div');
			statElement.id = stat.elementId;
			
			// Append this new div to the parent container
			container.appendChild(statElement);
		}
		
		// Now set or update the innerHTML of the statElement
		switch (stat.type) {
			case 'scalar':
				statElement.innerHTML = `<strong>${stat.description}</strong> ${profiler[stat.property]}`;
				break;
			
			case 'arrayLength':
				statElement.innerHTML = `<strong>${stat.description}</strong> ${profiler.getObjectArrayLength(stat.arrayName)}`;
				break;
			
			// You can extend this for other types in future
			default:
				break;
		}
	}
}
