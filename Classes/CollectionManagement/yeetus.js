import {ctx, canvas} from "../Canvas/ctx.js";

function removeOffScreenItemsFromArray() {
	
	
	
	for (let i = 0; i < this.length; i++) {
		if (this[i].x < 0 || this[i].x > canvas.width || this[i].y < 0 || this[i].y > canvas.height) {
			this.splice(i, 1);
		}
	}
	
	
}