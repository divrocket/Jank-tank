import {canvas, ctx} from "./Classes/ctx.js";
import {updateBullets} from "./Classes/updateBullets.js";
import {displayAmmoUI} from "./Classes/displayAmmoUI.js";
import {preventDuplicateKeyActions} from "./Classes/preventDuplicateKeyActions.js";
import {startSnowEmitter} from "./Classes/startSnowEmitter.js";
import {animateParticles} from "./Classes/animateParticles.js";
import {drawBackgroundImage} from "./Classes/drawBackgroundImage.js";
import {createRocks} from "./Classes/createRocks.js";
import {drawRocks} from "./Classes/drawRocks.js";
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
import {rockCollision} from "./Classes/rockCollision.js";
import {handlePlayerMovement} from "./Classes/handlePlayerMovement.js";
import {buildUX} from "./Classes/buildUX.js";
import {startDustEmitter} from "./Classes/startDustEmitter.js";

// Game Loop
function updateGameArea() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	preventDuplicateKeyActions();
	
	//Drawing
	drawBackgroundImage();
	drawDroppedAmmo();
	drawHealthBar();
	drawMuzzleFlash();
	drawTankTreadTrail();
	drawRocks();
	drawReloadingSpinner();
	animateParticles();
	//Collision
	enemyCollision();
	drawTankBody();
	drawTankCannon();
	drawTankTrails();
	
	//Update
	updateBullets();
	
	//Ui
	displayScore();
	displayAmmoUI();
	
	//Misc

	pickUpAmmo();
	

	rockCollision();
	
	//Input
	handlePlayerMovement(); // Calculate potential movement first
	
}

const init = async () => {
	setInterval(() => {
		//Game Loop Interval
		updateGameArea()
	}, 10);
	startEnemyEmitter();
	startSnowEmitter();
	startDustEmitter();
	createRocks(4);
	buildUX();
};

//Wave Management
init().then(() => {
	console.log("Game started");
});



