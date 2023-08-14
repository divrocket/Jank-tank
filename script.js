const canvas = document.getElementById("gameCanvas");
canvas.style.border = "1px solid black";
canvas.style.backgroundColor = "#99714bb3";
const ctx = canvas.getContext("2d");

const MAX_CANNON_ANGLE = Math.PI / 2.5; // 45 degrees in radians
const MIN_CANNON_ANGLE = -Math.PI / 2.5; // -45 degrees in radians

let treadOffsetFactor = 0.50;
let tank = {
	width: 90,
	height: 60,
	angle: 0,
	rotationSpeed: 0.01, // Controls the speed of the tank's rotation,
	health: 100, // for example, full health starts at 100
	maxHealth: 100,
	x: canvas.width / 2,
	y: canvas.height - 50,
};
let tank_cannon = {
	x: canvas.width / 2,
	y: canvas.height - 50,
	size: 30,
	dx: 2,
	dy: 2,
	angle: 0,  // Set to 0 so the cannon starts at the front
	rotationSpeed: 0.02,
	muzzleFlash: false,
	flashDuration: 200,  // duration in milliseconds, you can adjust as needed
	flashSize: 0
};
let obstacle = {
	x: canvas.width / 2 - 50, // Placing the obstacle in the middle of the canvas as an example
	y: canvas.height / 2 - 50,
	width: 100,
	height: 100,
	color: 'darkred'
};

let tankTrail = [];
let arrowLength = 40;
let bullets = [];
let keys = {};
let ammo = {
	currentType: 'standard',
	standard: {
		count: 20,
		speed: 5,
		color1: 'silver',
		color2: 'gray',
		size: 5,
		effect: 'none',
		magazineSize: 5,
		currentMagazine: 5,
		fireRate: 500,
		lastFired: 0,
		reloadSpeed: 2000,
		reloading: false
	},
	explosive: {
		count: 5,
		speed: 4,
		color1: 'red',
		color2: 'darkred',
		size: 6,
		effect: 'explode',
		magazineSize: 2,
		currentMagazine: 2,
		fireRate: 1000,
		lastFired: 0,
		reloadSpeed: 3000,
		reloading: false
	},
	armorPiercing: {
		count: 10,
		speed: 7,
		color1: 'blue',
		color2: 'darkblue',
		size: 4,
		effect: 'penetrate',
		magazineSize: 4,
		currentMagazine: 4,
		fireRate: 300,
		lastFired: 0,
		reloadSpeed: 1500,
		reloading: false
	}
};
let tabPressed = false;
let score = 0;

let enemies = [];

class Enemy {
	constructor(x, y, width, height, speed) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.speed = speed;
		this.dx = Math.random() * this.speed - this.speed / 2;
		this.dy = Math.random() * this.speed - this.speed / 2;
	}
	
	draw() {
		ctx.fillStyle = "#000";
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}
	
	update() {
		let potentialNewX = this.x + this.dx;
		let potentialNewY = this.y + this.dy;
		
		if (!isColliding({ x: potentialNewX, y: this.y, width: this.width, height: this.height }, obstacle)) {
			this.x = potentialNewX;
		}
		if (!isColliding({ x: this.x, y: potentialNewY, width: this.width, height: this.height }, obstacle)) {
			this.y = potentialNewY;
		}
	}
}
let droppedAmmo = [];

// Game Loop
function updateGameArea() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	handlePlayerMovement(); // Calculate potential movement first
	
	let leftTread = {
		x: tank_cannon.x + Math.cos(tank.angle + Math.PI / 2) * (tank.width / 2 * treadOffsetFactor),
		y: tank_cannon.y + Math.sin(tank.angle + Math.PI / 2) * (tank.width / 2 * treadOffsetFactor)
	};
	let rightTread = {
		x: tank_cannon.x + Math.cos(tank.angle - Math.PI / 2) * (tank.width / 2 * treadOffsetFactor),
		y: tank_cannon.y + Math.sin(tank.angle - Math.PI / 2) * (tank.width / 2 * treadOffsetFactor)
	};
	tankTrail.push({ left: leftTread, right: rightTread });
	
	while (tankTrail.length > 400) {
		tankTrail.shift(); // Remove the oldest position
	}
	
	if (keys[" "]) {
		fireBullet();
	}
	
	// if (keys["w"] || keys["s"]) {
	// 	let potentialNewX = tank.x;
	// 	let potentialNewY = tank.y;
	//
	// 	if (!checkTankEnemyCollision(tank, obstacle)) {
	// 		// Only update tank position if there's no collision
	// 		tank.x = potentialNewX;
	// 		tank.y = potentialNewY;
	// 	} else {
	// 		console.log("Collision detected");
	// 	}
	// }
	//
	for (let enemy of enemies) {
		enemy.update();
		enemy.draw();
		
		if (checkTankEnemyCollision(tank, enemy)) {
			tank.health -= 10;
			addScore(100);
			dropAmmo(enemy);
			enemies.splice(enemies.indexOf(enemy), 1);
		}
		
		for (let point of tankTrail) {
			if (checkEnemyTrailCollision(enemy, point.left) || checkEnemyTrailCollision(enemy, point.right)) {
				enemies.splice(enemies.indexOf(enemy), 1);
				addScore(100);
				break;
			}
		}
	}
	
	displayScore();
	pickUpAmmo();
	drawDroppedAmmo();
	drawHealthBar();
	drawMuzzleFlash();
	drawTankTreadTrail();
	drawObstacle();
	drawReloadingSpinner();
	drawTankBody();
	drawTankCannon();
	updateBullets();
	displayAmmoUI();
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
		
		if(checkTankObstacleCollision(tank, obstacle)) {
			tank_cannon.x = tank.x - 20;
			tank_cannon.y = tank.y - 20;
			return;
		}
		tank_cannon.x += Math.cos(tank.angle) * tank_cannon.dy;
		tank_cannon.y += Math.sin(tank.angle) * tank_cannon.dy;
	}
	
	if (keys["ArrowDown"] || keys["s"]) {
		
		tank.x = tank_cannon.x;
		tank.y = tank_cannon.y;
		
		if(checkTankObstacleCollision(tank, obstacle)) {
			tank_cannon.x = tank.x - 20;
			tank_cannon.y = tank.y - 20;
			return;
		}
		
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


//Player Actions
function dropAmmo(enemy) {
	if (Math.random() < 0.4) {  // 20% chance to drop ammo
		const ammoTypes = Object.keys(ammo);
		const dropType = ammoTypes[Math.floor(Math.random() * ammoTypes.length)];
		
		droppedAmmo.push({
			x: enemy.x,
			y: enemy.y,
			type: dropType,
			size: 10  // Adjust size if needed
		});
	}
}
function isColliding(rect1, rect2) {
	return rect1.x < rect2.x + rect2.width &&
		rect1.x + rect1.width > rect2.x &&
		rect1.y < rect2.y + rect2.height &&
		rect1.y + rect1.height > rect2.y;
}
function displayScore() {
	ctx.font = "24px Arial"; // Set the font size and style
	ctx.fillStyle = "white"; // Choose a color that contrasts with your background
	ctx.textAlign = "left";
	
	// Display the score in the top-right corner of the canvas
	ctx.fillText("Score: " + score, canvas.width - 160, 40);
	// ctx.fillText("Score: " + score, 10, 30); // Display the score in the top-left corner of the canvas
}
function pickUpAmmo() {
	for (let i = 0; i < droppedAmmo.length; i++) {
		if (checkTankAmmoCollision(tank, droppedAmmo[i])) {
			ammo[droppedAmmo[i].type].count += 5;  // Add 5 rounds to the ammo type
			droppedAmmo.splice(i, 1);  // Remove the ammo drop
			i--;  // Adjust the index due to the splice
		}
	}
}
function addScore(points) {
	score += points;
	// Optionally: Update the score on the game's HUD or wherever you want to display it
}

//Collision Detection
function checkTankAmmoCollision(tank, ammoDrop) {
	return tank_cannon.x < ammoDrop.x + ammoDrop.size &&
		tank_cannon.x + tank.width > ammoDrop.x &&
		tank_cannon.y < ammoDrop.y + ammoDrop.size &&
		tank_cannon.y + tank.height > ammoDrop.y;
}
function checkEnemyTrailCollision(enemy, point) {
	const dx = enemy.x - point.x;
	const dy = enemy.y - point.y;
	const distance = Math.sqrt(dx * dx + dy * dy);
	
	// Return true if the distance between the enemy's center and the point is less than half the enemy's size
	return distance < (enemy.width / 2);
}
function checkBulletEnemyCollision(bullet, enemy) {
	return bullet.x < enemy.x + enemy.width &&
		bullet.x + bullet.size > enemy.x &&
		bullet.y < enemy.y + enemy.height &&
		bullet.y + bullet.size * 2 > enemy.y;
}
function checkTankEnemyCollision(tank, enemy) {
	return tank_cannon.x < enemy.x + enemy.width &&
		tank_cannon.x + tank.width > enemy.x &&
		tank_cannon.y < enemy.y + enemy.height &&
		tank_cannon.y + tank.height > enemy.y;
}
function checkTankObstacleCollision(tank, obstacle) {
	return tank_cannon.x < obstacle.x + obstacle.width &&
		tank_cannon.x + tank.width > obstacle.x &&
		tank_cannon.y < obstacle.y + obstacle.height &&
		tank_cannon.y + tank.height > obstacle.y;
}

//Drawing Functions
function roundedRect(ctx, x, y, width, height, radius) {
	ctx.beginPath();
	ctx.moveTo(x + radius, y);
	ctx.arcTo(x + width, y, x + width, y + height, radius);
	ctx.arcTo(x + width, y + height, x, y + height, radius);
	ctx.arcTo(x, y + height, x, y, radius);
	ctx.arcTo(x, y, x + width, y, radius);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();
}
function drawMuzzleFlash() {
	if (tank_cannon.muzzleFlash) {
		const combinedAngle = tank.angle + tank_cannon.angle;
		const flashX = tank_cannon.x + (tank_cannon.size/1.8 + arrowLength) * Math.cos(combinedAngle);
		const flashY = tank_cannon.y + (tank_cannon.size/1.8 + arrowLength) * Math.sin(combinedAngle);
		
		ctx.save();
		ctx.beginPath();
		
		const gradient = ctx.createRadialGradient(flashX, flashY, 1, flashX, flashY, 15);  // 15 is the radius of the muzzle flash, adjust as needed
		gradient.addColorStop(0, 'red');
		gradient.addColorStop(1, 'rgba(255,255,0,0)');  // Transparent at the outer edgee
		
		ctx.fillStyle = gradient;
		ctx.arc(flashX, flashY, 15, 0, 2 * Math.PI);  // 15 is the radius of the muzzle flash, adjust as needed
		ctx.fill();
		ctx.restore();
	}
}
function drawTankBody() {
	
	ctx.save();
	ctx.translate(tank_cannon.x, tank_cannon.y);  // Move to the tank center
	ctx.rotate(tank.angle);  // Rotate to the tank's angle
	ctx.fillStyle = "darkgrey";
	ctx.strokeStyle = "#000";
	ctx.lineWidth = 2;
	
	
	ctx.fillStyle = "#1e2f52";
	// Side Armor
	roundedRect(ctx, -tank.width + 60, -tank.height / 2 - 4, (tank.width / 2) + 15, 4, 1);
	
	ctx.fillStyle = "#1e2f52";
	// Left Armor
	roundedRect(ctx, +tank.width - 120, +tank.height / 2, (tank.width / 2) + 15, 4, 1);
	
	ctx.fillStyle = "rgba(96,107,97,1)";
	// Main Body of the tank
	roundedRect(ctx, -tank.width / 2, -tank.height / 2, tank.width, tank.height, 10);
	
	ctx.fillStyle = "rgba(73,96,78,1)";
	// Upper Deck
	roundedRect(ctx, -tank.width / 3.4, (-tank.height / 4) - 5, (tank.width / 2) + 10, (tank.height / 2)+10, 5);
	
	// Additional armor or details can be added similarly
	
	ctx.restore();
}
function drawReloadingSpinner() {
	const currentAmmo = ammo[ammo.currentType];
	if (!currentAmmo.reloading) return;
	
	const centerX = canvas.width - 50; // Adjust as needed
	const centerY = canvas.height - 50; // Adjust as needed
	const radius = 30; // Adjust as needed
	
	ctx.beginPath();
	ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
	ctx.lineWidth = 5;
	ctx.strokeStyle = currentAmmo.color1;
	ctx.stroke();
}
function drawTankCannon() {
	ctx.save();
	
	// Positioning the cannon based on the tank's coordinates and rotation
	ctx.translate(tank_cannon.x, tank_cannon.y);
	ctx.rotate(tank.angle + tank_cannon.angle);
	
	// Drawing the cannon base
	ctx.fillStyle = "rgba(73,96,78,1)";
	ctx.strokeStyle = "black"; // Stroke color
	ctx.lineWidth = 2; // Line width for the stroke
	roundedRect(ctx, -tank_cannon.size/2, -tank_cannon.size/2, tank_cannon.size, tank_cannon.size, 10);  // Adjust the radius as needed
	
	// Drawing the elongated cannon part
	const arrowLength = 40;
	const arrowWidth = 5;
	ctx.fillStyle = "rgba(73,96,78,1)";
	// Assuming you want rounded corners for the cannon's elongated part, you can adjust the radius as needed
	roundedRect(ctx, tank_cannon.size/2, -arrowWidth/2, arrowLength, arrowWidth, 2);
	
	ctx.restore();
}
function drawTankTreadTrail() {
	for (let i = 0; i < tankTrail.length; i++) {
		let alpha = (i + 1) / tankTrail.length;
		
		ctx.fillStyle = `rgba(165, 138, 112, ${alpha})`;  // Set the fill color with decreasing opacity
		let treads = tankTrail[i];
		
		// Drawing left tread
		ctx.fillRect(treads.left.x - 5, treads.left.y - 5, 10, 10);
		
		// Drawing right tread
		ctx.fillRect(treads.right.x - 5, treads.right.y - 5, 10, 10);
	}
}
function drawDroppedAmmo() {
	ctx.save();
	for (let drop of droppedAmmo) {
		ctx.fillStyle = ammo[drop.type].color1;
		ctx.fillRect(drop.x, drop.y, drop.size, drop.size);
	}
	ctx.restore();
}
function drawObstacle() {
	ctx.fillStyle = obstacle.color;
	ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
}
function drawHealthBar() {
	const barWidth = 200;
	const barHeight = 20;
	const x = 20; // for padding from the left
	const y = 20; // for padding from the top
	
	// Background of the health bar (usually a dim color to represent "missing" health)
	ctx.fillStyle = "lightgrey";
	ctx.fillRect(x, y, barWidth, barHeight);
	
	// Foreground of the health bar (representing the actual health)
	const healthPercentage = tank.health / tank.maxHealth;
	ctx.fillStyle = tank.health > 70 ? "green" : tank.health > 30 ? "yellow" : "red";
	ctx.fillRect(x, y, barWidth * healthPercentage, barHeight);
}

// Ammo Management
function fireBullet() {
	const currentAmmo = ammo[ammo.currentType];
	
	// Don't fire if already reloading
	if (currentAmmo.reloading) return;
	
	// Check if enough time has passed since the last shot
	const now = Date.now();
	if (now - currentAmmo.lastFired < currentAmmo.fireRate) return;
	
	// Don't fire if no ammo left
	if (currentAmmo.currentMagazine <= 0) return;
	
	const bulletProperties = currentAmmo;
	const bulletSpeed = bulletProperties.speed;
	const combinedAngle = tank.angle + tank_cannon.angle;
	
	const startX = tank_cannon.x + (tank_cannon.size/2 + arrowLength) * Math.cos(combinedAngle);
	const startY = tank_cannon.y + (tank_cannon.size/2 + arrowLength) * Math.sin(combinedAngle);
	
	bullets.push({
		x: startX,
		y: startY,
		dx: bulletSpeed * Math.cos(combinedAngle),
		dy: bulletSpeed * Math.sin(combinedAngle),
		type: ammo.currentType,
		size: bulletProperties.size
	});
	
	currentAmmo.currentMagazine--; // Decrement ammo in magazine a w
	currentAmmo.count--; // Decrement overall ammo count
	currentAmmo.lastFired = now;  // Update the lastFired timestamp
	
	tank_cannon.muzzleFlash = true;
	setTimeout(() => {
		tank_cannon.muzzleFlash = false;
	}, tank_cannon.flashDuration);
	
	if (currentAmmo.currentMagazine <= 0) {
		reloadAmmo();
	}
}
function updateBullets() {
	for (let i = bullets.length - 1; i >= 0; i--) {
		let potentialNewX = bullets[i].x + bullets[i].dx;
		let potentialNewY = bullets[i].y + bullets[i].dy;
		
		if (isColliding({ x: potentialNewX, y: potentialNewY, width: bullets[i].size, height: bullets[i].size * 2 }, obstacle)) {
			bullets.splice(i, 1);  // Remove bullet if it hits obstacle
			continue;
		}
		
		bullets[i].x = potentialNewX;
		bullets[i].y = potentialNewY;
		
		const bulletProperties = ammo[bullets[i].type];
		let gradient = ctx.createRadialGradient(bullets[i].x, bullets[i].y, 1, bullets[i].x, bullets[i].y, bulletProperties.size);
		gradient.addColorStop(0, bulletProperties.color1);
		gradient.addColorStop(1, bulletProperties.color2);
		ctx.fillStyle = gradient;
		
		ctx.fillRect(bullets[i].x, bullets[i].y, bulletProperties.size, bulletProperties.size * 2);
		
		for (let j = enemies.length - 1; j >= 0; j--) {
			if (checkBulletEnemyCollision(bullets[i], enemies[j])) {
				dropAmmo(enemies[j]); // Drop ammo
				enemies.splice(j, 1); // Remove the enemy
				bullets.splice(i, 1); // Remove the bullet
				addScore(150); // Add score
				break;
			}
		}
	}
}
function reloadAmmo() {
	
	const currentAmmo = ammo[ammo.currentType];
	if (currentAmmo.reloading) return; // Already reloading
	
	currentAmmo.reloading = true;
	
	setTimeout(() => {
		currentAmmo.currentMagazine = currentAmmo.magazineSize; // Refill the magazine
		currentAmmo.reloading = false; // End the reloading state
	}, currentAmmo.reloadSpeed);
}
function displayAmmoUI() {
	const currentAmmo = ammo[ammo.currentType];
	
	// Display background for UI
	ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'; // semi-transparent black
	ctx.fillRect(10, canvas.height - 60, 200, 50);
	
	// Display current ammo type
	ctx.font = '16px Arial';
	ctx.fillStyle = 'white';
	ctx.fillText(`Type: ${ammo.currentType}`, 20, canvas.height - 40);
	
	// Display magazine and total count
	ctx.fillText(`Magazine: ${currentAmmo.currentMagazine}/${currentAmmo.magazineSize}`, 20, canvas.height - 20);
	ctx.fillText(`Total: ${currentAmmo.count}`, 150, canvas.height - 20);
}
function switchAmmoType() {
	const ammoTypes = Object.keys(ammo).filter(type => type !== 'currentType');
	const currentIndex = ammoTypes.indexOf(ammo.currentType);
	let nextIndex = (currentIndex + 1) % ammoTypes.length;
	ammo.currentType = ammoTypes[nextIndex];
}


document.addEventListener('keydown', function (e) {
	keys[e.key] = true;
});

document.addEventListener('keyup', function(event) {
	keys[event.key] = false;
});

document.addEventListener("keydown", function (e) {
	keys[e.key] = true;
});

document.addEventListener("keyup", function (e) {
	keys[e.key] = false;
});

setInterval(() => {
	let x, y;
	const size = Math.random() * 20 + 10; // Random size between 10 and 50
	const speed = Math.random() * 2 + 1; // Random speed between 1 and 3
	
	const side = Math.floor(Math.random() * 4); // Choose a random side: 0 = top, 1 = right, 2 = bottom, 3 = left
	
	switch (side) {
		case 0: // top
			x = Math.random() * canvas.width;
			y = 0 - size; // start slightly outside the canvas
			break;
		case 1: // right
			x = canvas.width + size; // start slightly outside the canvas
			y = Math.random() * canvas.height;
			break;
		case 2: // bottom
			x = Math.random() * canvas.width;
			y = canvas.height + size; // start slightly outside the canvas
			break;
		case 3: // left
			x = 0 - size; // start slightly outside the canvas
			y = Math.random() * canvas.height;
			break;
	}
	
	enemies.push(new Enemy(x, y, size, size, speed));
}, 150); // Spawning an enemy every 0.3 seconds

setInterval(updateGameArea, 5);
