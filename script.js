const canvas = document.getElementById("gameCanvas");
canvas.style.border = "1px solid black";
canvas.style.backgroundColor = "#99714bb3";
const ctx = canvas.getContext("2d");
const backgroundImage = new Image();
backgroundImage.src = 'assets/battleground.png'; // Replace with the path to your background image

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
	flashDuration: 400,  // duration in milliseconds, you can adjust as needed
	flashSize: 0
};
let enemyEmitter
let tankTrail = [];
let arrowLength = 40;
let bullets = [];
let keys = {};
let ammo = {
	currentType: 'armorPiercing',
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
		count: 1000,
		speed: 10,
		color1: 'blue',
		color2: 'darkblue',
		size: 4,
		effect: 'penetrate',
		magazineSize: 100,
		currentMagazine: 4,
		fireRate: 300,
		lastFired: 0,
		reloadSpeed: 1500,
		reloading: false
	}
};
let tabPressed = false;
let score = 0;
let particles = [];
let droppedAmmo = [];
let enemies = [];
const rocks = [];
let rockImage = new Image();
rockImage.src = 'assets/tree_assets/Trees_texture_shadow_dark/Snow_christmass_tree1.png';
const snowflakes = [];
const numberOfSnowflakes = 200; // Adjust for more or less snow

class Particle {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.size = Math.random() * 5 + 1; // varying sizes
		this.speedX = Math.random() * 5 - 2.5; // wider horizontal range
		this.speedY = Math.random() * -3 - 1;  // negative for upwards movement
		this.gravity = 0.1; // adjust as needed
		this.alpha = 1;
	}
	
	update() {
		this.speedY += this.gravity; // apply gravity
		this.y += this.speedY;
		this.x += this.speedX;
		this.alpha -= 0.005; // adjust as needed for fade-out speed
	}
	
	draw(ctx) {
		ctx.save(); // Save the current context state
		ctx.globalAlpha = this.alpha; // for fade-out effect
		ctx.fillStyle = `rgba(${Math.floor(Math.random() * 55 + 200)}, 0, 0, 0.8)`; // shades of red
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
		ctx.fill();
		ctx.restore(); // Restore the context state to what it was before
	}
	
}
class Enemy {
	constructor(x, y, width, height, speed) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.speed = speed;
		this.framesSinceLastChange = 0;
		
		this.changeDirection(); // Set initial direction
		
		// Add a property to hold the enemy image
		this.image = new Image();
		this.image.src = 'assets/enemy/enemy.png'; // the path to your enemy image
	}
	
	changeDirection() {
		// Randomly set dx and dy to achieve random directions
		this.dx = (Math.random() - 0.5) * this.speed;
		this.dy = (Math.random() - 0.5) * this.speed;
		this.framesSinceLastChange = 0;
	}
	
	draw() {
		// Instead of filling a rectangle, draw the enemy image
		ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
	}
	
	update() {
		// Increase the frames counter
		this.x = this.x + this.dx;
		this.y = this.y + this.dy;
	}
}
class Snowflake {
	constructor() {
		this.x = Math.random() * canvas.width;
		this.y = Math.random() * canvas.height;
		this.radius = Math.random() * 5 + 1; // Snowflake size
		this.speed = Math.random() * 3 + 1; // Falling speed
	}
	
	update() {
		this.y += this.speed;
		// Reset snowflake to the top once it goes beyond canvas height
		if (this.y > canvas.height) {
			this.y = 0;
			this.x = Math.random() * canvas.width;
		}
	}
	
	draw() {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
		ctx.fillStyle = 'white'; // Snowflake color
		ctx.fill();
		ctx.closePath();
	}
}
class MuzzleParticle {
	constructor(x, y, angle) {
		this.x = x;
		this.y = y;
		this.speed = Math.random() * 5 + 2;  // Random speed between 2 and 7
		this.life = Math.random() * 0.8 + 0.2;  // Life between 0.2 and 1 second
		this.alpha = 1;
		this.dx = Math.cos(angle) * this.speed;
		this.dy = Math.sin(angle) * this.speed;
	}
	
	update() {
		this.x += this.dx;
		this.y += this.dy;
		this.life -= 0.04;  // Decrement the life every frame
		this.alpha -= 0.01;
	}
	
	// Function to get a random color among shades of red, yellow, and orange
	getRandomColor() {
		const colors = [
			`rgba(${255}, ${Math.floor(Math.random() * 56)}, 0, 1)`, // Red to Orange shades
			`rgba(${255}, ${Math.floor(Math.random() * 156) + 100}, 0, 1)`, // Yellow shades
			`rgba(${255 - Math.floor(Math.random() * 56)}, ${64 + Math.floor(Math.random() * 56)}, 0, 1)` // Orange shades
		];
		return colors[Math.floor(Math.random() * colors.length)];
	}
	
	draw(ctx) {
		ctx.save();
		ctx.globalAlpha = this.alpha;
		ctx.fillStyle = this.getRandomColor();  // Using the random color function
		ctx.beginPath();
		ctx.arc(this.x, this.y, 1, 0, 2 * Math.PI);
		ctx.fill();
		ctx.restore();
	}
}


// Function to generate particles
// Smoke Particle Class
class SmokeParticle {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.speed = Math.random() * 0.5 + 0.5; // Slower speed, between 0.5 and 1
		const randomAngle = Math.random() * (Math.PI * 2);
		this.dx = Math.cos(randomAngle) * this.speed;
		this.dy = Math.sin(randomAngle) * this.speed;
		this.size = Math.random() * 5 + 3; // Random size between 3 and 8
		this.life = 1; // Full life at start
		this.alpha = 0.5; // Semi-transparent for smoke effect
	}
	
	update() {
		this.x += this.dx;
		this.y += this.dy;
		this.life -= 0.02; // Smoke particles will fade faster
		this.alpha -= 0.02;
	}
	
	draw(ctx) {
		ctx.save();
		ctx.globalAlpha = this.alpha;
		ctx.fillStyle = "grey"; // Smoke color
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.size, 4, 5 * Math.PI);
		ctx.fill();
		ctx.restore();
	}
}

// Emit muzzle and smoke particles
function emitParticles(x, y, mainAngle) {
	// Angle boundaries for the cone shape
	const coneWidth = Math.PI / 6;  // The cone will be 1/6th of a circle (or 30 degrees wide)
	const minAngle = mainAngle - coneWidth / 2;
	const maxAngle = mainAngle + coneWidth / 2;
	
	// Emitting muzzle particles within a cone
	let muzzleCount = Math.random() * 10 + 5;
	for (let i = 0; i < muzzleCount; i++) {
		const randomAngle = Math.random() * (maxAngle - minAngle) + minAngle;
		const particle = new MuzzleParticle(x, y, randomAngle);
		particles.push(particle);
	}
	
	// Emitting smoke particles (unchanged)
	let smokeCount = Math.random() * 5 + 3;  // Emit fewer smoke particles (3 to 8)
	for (let i = 0; i < smokeCount; i++) {
		const smoke = new SmokeParticle(x, y);
		particles.push(smoke);
	}
}

// When you call emitParticles, pass in the combined angle of the tank and cannon:
// emitParticles(flashX, flashY, combinedAngle);


// Update and draw particles (muzzle and smoke)
function handleParticles(ctx) {
	for (let i = particles.length - 1; i >= 0; i--) {
		particles[i].update();
		if (particles[i].life <= 0) {
			particles.splice(i, 1);
		} else {
			particles[i].draw(ctx);
		}
	}
}
// Animation loop
function animateSnow() {
	
	for (const snowflake of snowflakes) {
		snowflake.update();
		snowflake.draw();
	}
	
	requestAnimationFrame(animateSnow);
}
function spawnParticles(x, y) {
	const numberOfParticles = Math.floor(Math.random() * 31) + 20;
	for (let i = 0; i < numberOfParticles; i++) {
		particles.push(new Particle(x, y));
	}
}
function animateParticles(ctx) {
	for (let i = 0; i < particles.length; i++) {
		particles[i].update();
		particles[i].draw(ctx);
		if (particles[i].alpha <= 0) {
			particles.splice(i, 1);
			i--; // decrease index since we're removing an item
		}
	}
}
function drawBackgroundImage() {
	ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height); // This will stretch or shrink the image to fit the canvas
}
function createRocks(number) {
	for (let i = 0; i < number; i++) {
		const x = Math.random() * (canvas.width - rockImage.width); // Subtract image width to ensure the rock is fully visible
		const y = Math.random() * (canvas.height - rockImage.height); // Subtract image height for the same reason
		// You can keep the radius if you still need it for collision detection or other purposes
		const radius = (Math.random() * 5) + 50; // gives random radius between 10 and 30
		
		rocks.push({ x, y, radius });
	}
}
function drawRocks() {
	for (let rock of rocks) {
		ctx.drawImage(rockImage, rock.x, rock.y, rockImage.width, rockImage.height); // Draws the rock PNG
	}
}
// Check if a point is inside a rectangle
function isPointInRectangle(px, py, rectX, rectY, rectWidth, rectHeight, angle) {
	// Translate the point relative to the rectangle's center
	let translatedX = px - rectX;
	let translatedY = py - rectY;
	
	// Rotate the point to align with the rectangle's orientation
	let rotatedX = translatedX * Math.cos(-angle) - translatedY * Math.sin(-angle);
	let rotatedY = translatedX * Math.sin(-angle) + translatedY * Math.cos(-angle);
	
	// Check if point lies within the rectangle boundaries
	return Math.abs(rotatedX) < rectWidth / 2 && Math.abs(rotatedY) < rectHeight / 2;
}
// Check collision between a rectangle and circle
function isRectangleCircleCollision(rectX, rectY, rectWidth, rectHeight, angle, circleX, circleY, circleRadius) {
	// If circle's center is inside the rectangle, there's a collision
	if (isPointInRectangle(circleX, circleY, rectX, rectY, rectWidth, rectHeight, angle)) {
		return true;
	}
	
	// Find the closest point on the rectangle to the circle's center
	let closestX = Math.max(-rectWidth / 2, Math.min(circleX - rectX, rectWidth / 2));
	let closestY = Math.max(-rectHeight / 2, Math.min(circleY - rectY, rectHeight / 2));
	
	// Rotate the closest point back to world coordinates
	let worldClosestX = rectX + (closestX * Math.cos(angle) - closestY * Math.sin(angle));
	let worldClosestY = rectY + (closestX * Math.sin(angle) + closestY * Math.cos(angle));
	
	// Check the distance from the closest point to the circle's center
	let distanceX = worldClosestX - circleX;
	let distanceY = worldClosestY - circleY;
	
	return (distanceX * distanceX + distanceY * distanceY) < (circleRadius * circleRadius);
}
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
function enemyCollision() {
	for (let enemy of enemies) {
		enemy.update();
		enemy.draw();
		
		if (checkTankEnemyCollision(tank, enemy)) {
			tank.health -= 10;
			spawnParticles(enemy.x, enemy.y);
			dropAmmo(enemy);
			enemies.splice(enemies.indexOf(enemy), 1);
			addScore(100);
		}
		
		// for (let point of tankTrail) {
		// 	if (checkEnemyTrailCollision(enemy, point.left) || checkEnemyTrailCollision(enemy, point.right)) {
		// 		spawnParticles(enemy.x, enemy.y);
		// 		enemies.splice(enemies.indexOf(enemy), 1);
		// 		addScore(100);
		// 	}
		// }
	}
}
function startEnemyEmitter() {
	enemyEmitter = setInterval(() => {
		let x, y;
		const size = Math.random() * 20 + 40; // Random size between 10 and 50
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
}
function destroyEnemyEmitter() {
	clearInterval(enemyEmitter);
	enemyEmitter = null;
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
// Modified drawMuzzleFlash function
function drawMuzzleFlash() {
	if (tank_cannon.muzzleFlash) {
		const combinedAngle = tank.angle + tank_cannon.angle;
		const flashX = tank_cannon.x + (tank_cannon.size/1.8 + arrowLength) * Math.cos(combinedAngle);
		const flashY = tank_cannon.y + (tank_cannon.size/1.8 + arrowLength) * Math.sin(combinedAngle);
		
		emitParticles(flashX, flashY, combinedAngle);  // Emit particles when there's a muzzle flash
		
		ctx.save();
		ctx.beginPath();
		
		const gradient = ctx.createRadialGradient(flashX, flashY, 1, flashX, flashY, 1);
		gradient.addColorStop(0, 'red');
		gradient.addColorStop(1, 'rgba(255,255,0,0)');
		
		ctx.fillStyle = gradient;
		ctx.arc(flashX, flashY, 15, 0, 2 * Math.PI);
		ctx.fill();
		
		handleParticles(ctx);  // Draw the particles
		
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
	const arrowLength = 38;
	const arrowHeight = 10;
	ctx.fillStyle = "rgba(73,96,78,1)";
	// Assuming you want rounded corners for the cannon's elongated part, you can adjust the radius as needed
	roundedRect(ctx, tank_cannon.size/2, -arrowHeight/2, arrowLength, arrowHeight, 2);
	
	ctx.restore();
}
function drawTankTreadTrail() {
	for (let i = 0; i < tankTrail.length; i++) {
		let alpha = (i + 1) / tankTrail.length;
		
		ctx.fillStyle = `rgba(208, 213, 215, ${alpha})`;  // Set the fill color with decreasing opacity
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
function drawTankTrails() {
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
				spawnParticles(enemies[j].x, enemies[j].y); // Spawn particles
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
function preventDuplicateKeyActions() {
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
}
function startSnowEmitter() {
	// Initialize snowflakes
	for (let i = 0; i < numberOfSnowflakes; i++) {
		snowflakes.push(new Snowflake());
	}
	animateSnow()
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
