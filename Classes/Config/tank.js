export let tank = {
	width: 80,
	height: 80,
	angle: 4.7,
	rotationSpeed: 0.03,
	health: 100,
	maxHealth: 100,
	x_body: 0, // Set a proper value, adjust as needed
	y_body: 0, // Set a proper value, adjust as needed
	get attachmentPoints() {
		return {
			front: () => {
				return {
					x: tank.x_body,
					y: tank.y_body - tank.height / 2
				};
			},
			back: () => {
				return {
					x: tank.x_body,
					y: tank.y_body + tank.height / 2
				};
			},
			left: () => {
				return {
					x: tank.x_body - tank.width / 2,
					y: tank.y_body
				};
			},
			right: () => {
				return {
					x: tank.x_body + tank.width / 2,
					y: tank.y_body
				};
			},
			center: () => {
				return {
					x: tank.x_body,
					y: tank.y_body
				};
			}
		}
	}
};