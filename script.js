import {canvas, ctx} from "./Classes/Canvas/ctx.js";
import {updateBullets} from "./Classes/Player/Actions/updateBullets.js";
import {displayAmmoUI} from "./Classes/Interfaces/displayAmmoUI.js";
import {preventDuplicateKeyActions} from "./Classes/Player/preventDuplicateKeyActions.js";
import {startSnowEmitter} from "./Classes/Emitters/startSnowEmitter.js";
import {animateParticles} from "./Classes/Animation/animateParticles.js";
import {drawBackgroundImage} from "./Classes/Drawing/drawBackgroundImage.js";
import {createRocks} from "./Classes/Drawing/createRocks.js";
import {drawRocks} from "./Classes/Drawing/drawRocks.js";
import {startEnemyEmitter} from "./Classes/Emitters/startEnemyEmitter.js";
import {enemyCollision} from "./Classes/Collision/enemyCollision.js";
import {pickUpAmmo} from "./Classes/Player/Actions/pickUpAmmo.js";
import {displayScore} from "./Classes/Interfaces/displayScore.js";
import {drawMuzzleFlash} from "./Classes/Drawing/drawMuzzleFlash.js";
import {drawTankBody} from "./Classes/Drawing/drawTankBody.js";
import {drawReloadingSpinner} from "./Classes/Drawing/drawReloadingSpinner.js";
import {drawTankCannon} from "./Classes/Drawing/drawTankCannon.js";
import {drawTankTreadTrail} from "./Classes/Drawing/drawTankTreadTrail.js";
import {drawDroppedAmmo} from "./Classes/Drawing/drawDroppedAmmo.js";
import {drawHealthBar} from "./Classes/Drawing/drawHealthBar.js";
import {drawTankTrails} from "./Classes/Drawing/drawTankTrails.js";
import {rockCollision} from "./Classes/Collision/rockCollision.js";
import {handlePlayerMovement} from "./Classes/Player/handlePlayerMovement.js";
import {buildUX} from "./Classes/Interfaces/buildUX.js";
import {startDustEmitter} from "./Classes/Emitters/startDustEmitter.js";

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



