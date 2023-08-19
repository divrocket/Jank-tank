//Collision
import {rocks} from "./rocks.js";
import {isRectangleCircleCollision} from "./isRectangleCircleCollision.js";
import {tank} from "./tank.js";
import {tank_cannon} from "./tank_cannon.js";

export function rockCollision() {
	for (let rock of rocks) {
		if (isRectangleCircleCollision(tank.x, tank.y, tank.width, tank.height, tank.angle, rock.x, rock.y, rock.radius)) {
			// console.log("Collision detected between:", { tank: tank, rock: rock });
			tank_cannon.x = tank.x - 0.1;
			tank_cannon.y = tank.y - 0.1;
		}
	}
}