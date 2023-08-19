// Check collision between a rectangle and circle
import {isPointInRectangle} from "./isPointInRectangle.js";

export function isRectangleCircleCollision(rectX, rectY, rectWidth, rectHeight, angle, circleX, circleY, circleRadius) {
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