import {rocks} from "../CollectionManagement/collector.js";
import {tank} from "../Config/tank.js";
import {tank_cannon} from "../Config/tank_cannon.js";
import {rockImage} from "../Drawing/drawRocks.js";

function checkRockCannonCollision(rock, cannon) {
	const rockRight = rock.x + rockImage.width;
	const rockBottom = rock.y + rockImage.height;
	
	const cannonRight = cannon.x + cannon.size;
	const cannonBottom = cannon.y + cannon.size;
	
	return rock.x < cannonRight &&
		rockRight > cannon.x &&
		rock.y < cannonBottom &&
		rockBottom > cannon.y;
}

export function rockCollision() {
	for (let rock of rocks) {
		if (checkRockCannonCollision(rock, tank_cannon)) {
			console.log("Collision detected between:", { tank_cannon: tank_cannon, rock: rock });
			tank_cannon.x = tank.x - 0.1;  // Adjusted to x since there's no x_body
			tank_cannon.y = tank.y - 0.1;  // Adjusted to y since there's no y_body
		}
	}
}
