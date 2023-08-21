import {systemProfiler} from "../Profiling/process.js";
import {statsConfig} from "../Profiling/config.js";
import {ctx} from "../Canvas/ctx.js";

const profiler = new systemProfiler();

export function drawStatsToCanvas() {
	
	let yPos = 100;
	let xPos = 20;
	
	const lineHeight = 25;
	
	for (let stat of statsConfig.stats) {
		let text = "";
		switch (stat.type) {
			case 'scalar':
				text = `${stat.description} ${profiler[stat.property]}`;
				break;
			
			case 'arrayLength':
				text = `${stat.description} ${profiler.getObjectArrayLength(stat.arrayName)}`;
				break;
				
			default:
				break;
		}
		ctx.fillText(text, xPos, yPos);
		yPos += lineHeight;
	}
	
	//Screen Resolution
	ctx.fillText(`Screen Resolution: ${ctx.canvas.width} x ${ctx.canvas.height}`, xPos, yPos);
	
}


