// Check if a point is inside a rectangle
export function isPointInRectangle(px, py, rectX, rectY, rectWidth, rectHeight, angle) {
	// Translate the point relative to the rectangle's center
	let translatedX = px - rectX;
	let translatedY = py - rectY;
	
	// Rotate the point to align with the rectangle's orientation
	let rotatedX = translatedX * Math.cos(-angle) - translatedY * Math.sin(-angle);
	let rotatedY = translatedX * Math.sin(-angle) + translatedY * Math.cos(-angle);
	
	// Check if point lies within the rectangle boundaries
	return Math.abs(rotatedX) < rectWidth / 2 && Math.abs(rotatedY) < rectHeight / 2;
}