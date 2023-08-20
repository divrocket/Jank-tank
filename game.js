import {canvas, ctx} from "./Classes/Canvas/ctx.js";
import {drawBullets} from "./Classes/Drawing/drawBullets.js";
import {displayAmmoUI} from "./Classes/Interfaces/displayAmmoUI.js";
import {preventDuplicateKeyActions} from "./Classes/Player/preventDuplicateKeyActions.js";
import {animateParticles} from "./Classes/Animation/animateParticles.js";
import {drawBackgroundImage} from "./Classes/Drawing/drawBackgroundImage.js";
import {rockEmitter} from "./Classes/Emitters/rockEmitter.js";
import {drawRocks} from "./Classes/Drawing/drawRocks.js";
import {enemyEmitter} from "./Classes/Emitters/enemyEmitter.js";
import {enemyCollision} from "./Classes/Collision/enemyCollision.js";
import {displayScore} from "./Classes/Interfaces/displayScore.js";
import {drawMuzzleFlash} from "./Classes/Drawing/drawMuzzleFlash.js";
import {drawTankBody} from "./Classes/Drawing/drawTankBody.js";
import {drawTankCannon} from "./Classes/Drawing/drawTankCannon.js";
import {drawTankTreadTrail} from "./Classes/Drawing/drawTankTreadTrail.js";
import {drawDroppedAmmo} from "./Classes/Drawing/drawDroppedAmmo.js";
import {drawHealthBar} from "./Classes/Drawing/drawHealthBar.js";
import {drawTankTrails} from "./Classes/Drawing/drawTankTrails.js";
import {handlePlayerMovement} from "./Classes/Player/handlePlayerMovement.js";
import {buildUX} from "./Classes/Interfaces/buildUX.js";
import {drawStatsToPage} from "./Classes/Drawing/drawProfiler.js";
import {drawMuzzleParticles} from "./Classes/Drawing/drawMuzzleParticles.js";

// import {dustEmitter} from "./Classes/Emitters/dustEmitter.js";
// import {snowEmitter} from "./Classes/Emitters/snowEmitter.js";

// Game Loop
function updateGameArea() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	// Drawing
	drawBackgroundImage();
	drawDroppedAmmo();
	drawHealthBar();
	drawMuzzleFlash();
	
	drawRocks();
	animateParticles();
	drawMuzzleParticles();
	drawTankTreadTrail();
	drawTankTrails();
	
	handlePlayerMovement();
	
	// Collision
	enemyCollision();
	drawTankBody();
	drawTankCannon();
	
	// Update
	drawBullets();
	
	// UI
	displayScore();
	displayAmmoUI();
	
	// Update stats and request the next frame
	drawStatsToPage();
	preventDuplicateKeyActions();
	requestAnimationFrame(updateGameArea);
}

const init = async () => {
	// Initial call to start the game loop
	requestAnimationFrame(updateGameArea);
	
	enemyEmitter();
	rockEmitter(4);
	buildUX();
};

// Wave Management
init().then(() => {
	console.log("Game started");
});


