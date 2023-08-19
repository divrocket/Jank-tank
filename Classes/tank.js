export let tank = {
	width: 90,
	height: 60,
	angle: 0,
	rotationSpeed: 0.02,
	health: 100,
	maxHealth: 100,
	x: null,
	y: null,
	attachmentPoints: {
		front: function() {
			return {
				x: this.x,
				y: this.y - this.height / 2
			};
		},
		back: function() {
			return {
				x: this.x,
				y: this.y + this.height / 2
			};
		},
		left: function() {
			return {
				x: this.x - this.width / 2,
				y: this.y
			};
		},
		right: function() {
			return {
				x: this.x + this.width / 2,
				y: this.y
			};
		},
		center: function() {
			return {
				x: this.x,
				y: this.y
			};
		}
	}
};
