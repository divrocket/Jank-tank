import {canvas, ctx} from "./Classes/ctx.js";
import {fireBullet} from "./Classes/fireBullet.js";
import {updateBullets} from "./Classes/updateBullets.js";
import {reloadAmmo} from "./Classes/reloadAmmo.js";
import {displayAmmoUI} from "./Classes/displayAmmoUI.js";
import {switchAmmoType} from "./Classes/switchAmmoType.js";
import {preventDuplicateKeyActions} from "./Classes/preventDuplicateKeyActions.js";
import {startSnowEmitter} from "./Classes/startSnowEmitter.js";
import {animateParticles} from "./Classes/animateParticles.js";
import {drawBackgroundImage} from "./Classes/drawBackgroundImage.js";
import {createRocks} from "./Classes/createRocks.js";
import {drawRocks} from "./Classes/drawRocks.js";
import {isRectangleCircleCollision} from "./Classes/isRectangleCircleCollision.js";
import {destroyEnemyEmitter} from "./Classes/destroyEnemyEmitter.js";
import {startEnemyEmitter} from "./Classes/startEnemyEmitter.js";
import {enemyCollision} from "./Classes/enemyCollision.js";
import {pickUpAmmo} from "./Classes/pickUpAmmo.js";
import {displayScore} from "./Classes/displayScore.js";
import {drawMuzzleFlash} from "./Classes/drawMuzzleFlash.js";
import {drawTankBody} from "./Classes/drawTankBody.js";
import {drawReloadingSpinner} from "./Classes/drawReloadingSpinner.js";
import {drawTankCannon} from "./Classes/drawTankCannon.js";
import {drawTankTreadTrail} from "./Classes/drawTankTreadTrail.js";
import {drawDroppedAmmo} from "./Classes/drawDroppedAmmo.js";
import {drawHealthBar} from "./Classes/drawHealthBar.js";
import {drawTankTrails} from "./Classes/drawTankTrails.js";
import {tank} from "./Classes/tank.js";
import {tank_cannon} from "./Classes/tank_cannon.js";
import {enemies} from "./Classes/enemies.js";
import {keys} from "./Classes/keys.js";
import {rocks} from "./Classes/rocks.js";

canvas.style.border = "1px solid black";
canvas.style.backgroundColor = "#99714bb3";
const MAX_CANNON_ANGLE = Math.PI / 2.5; // 45 degrees in radians
const MIN_CANNON_ANGLE = -Math.PI / 2.5; // -45 degrees in radians
let tabPressed = false;

// Game Loop
function updateGameArea() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	//Input
	handlePlayerMovement(); // Calculate potential movement first
	
	//Drawing
	drawBackgroundImage();
	drawDroppedAmmo();
	drawHealthBar();
	drawMuzzleFlash();
	drawTankTreadTrail();
	drawRocks();
	drawReloadingSpinner();
	drawTankBody();
	drawTankCannon();
	drawTankTrails();
	
	//Collision
	enemyCollision();

	for (let rock of rocks) {
		if (isRectangleCircleCollision(tank.x, tank.y, tank.width, tank.height, tank.angle, rock.x, rock.y, rock.radius)) {
			console.log("Collision detected between:", { tank: tank, rock: rock });
			tank_cannon.x = tank.x - 0.1;
			tank_cannon.y = tank.y - 0.1;
		}
	}
	
	//Update
	updateBullets();
	
	//Ui
	displayScore();
	displayAmmoUI();
	
	
	//Misc
	preventDuplicateKeyActions();
	animateParticles(ctx);
	pickUpAmmo();
}

function handlePlayerMovement() {
	
	// Cannon angle adjustment
	if (keys["q"] && tank_cannon.angle > MIN_CANNON_ANGLE) {
		tank_cannon.angle -= tank_cannon.rotationSpeed;
	}
	
	if (keys["e"] && tank_cannon.angle < MAX_CANNON_ANGLE) {
		tank_cannon.angle += tank_cannon.rotationSpeed;
	}
	
	// Ensure cannon angle stays within bounds
	if (keys["ArrowUp"] || keys["w"]) {
		tank.x = tank_cannon.x;
		tank.y = tank_cannon.y;
		tank_cannon.x += Math.cos(tank.angle) * tank_cannon.dy;
		tank_cannon.y += Math.sin(tank.angle) * tank_cannon.dy;
	}
	
	if (keys["ArrowDown"] || keys["s"]) {
		tank.x = tank_cannon.x;
		tank.y = tank_cannon.y;
		tank_cannon.x -= Math.cos(tank.angle) * tank_cannon.dy; // note the '-='
		tank_cannon.y -= Math.sin(tank.angle) * tank_cannon.dy; // note the '-='ssss
	}
	
	// Tank rotation
	if (keys["a"]) {
		tank.angle -= tank.rotationSpeed;
	}
	
	if (keys["d"]) {
		tank.angle += tank.rotationSpeed;
	}
	
	if (keys[" "]) {
		fireBullet();
	}
	
	if (keys["r"]) {
		reloadAmmo();
	}
	
	if (keys["z"] && !tabPressed) {
		switchAmmoType();
		tabPressed = true;  // Mark the Tab as pressed
	}
	
	if (!keys["z"]) {
		tabPressed = false;  // Reset the flag when the Tab key is released
	}
	
	// Ensure cannon angle stays within bounds
	tank_cannon.angle = Math.min(Math.max(tank_cannon.angle, MIN_CANNON_ANGLE), MAX_CANNON_ANGLE);
}

//Wave Management
startEnemyEmitter();
startSnowEmitter();
createRocks(1);

setInterval(updateGameArea, 10);

let hr = document.createElement("hr");
document.body.appendChild(hr);

let clear_enemies = document.createElement("button");
clear_enemies.innerHTML = "Clear enemies";
document.body.appendChild(clear_enemies);
clear_enemies.addEventListener("click", function() {
	enemies = [];
	destroyEnemyEmitter()
});

let start_wave = document.createElement("button");
start_wave.innerHTML = "Start Wave";
document.body.appendChild(start_wave);
start_wave.addEventListener("click", function() {
	startEnemyEmitter()
})
