let players = [
	new Game.Player( {
		startPos: new THREE.Vector3( 25, 10, 25 ),
		startAngle: new THREE.Euler( -0.5*PI, 0, -0.5*PI ),
		color: utils.randomColor(),
		controls: {
			"*": "left",
			"-": "right",
		},
		gamepadIndex: 0,
		gamepadControls: {
			4: "left",
			5: "right",
		},
	} ),
	new Game.Player( {
		startPos: new THREE.Vector3( -25, 10, 25 ),
		startAngle: new THREE.Euler( 0.5*PI, 0, -0.5*PI ),
		color: utils.randomColor(),
		controls: {
			"[": "left",
			"]": "right",
		},
		gamepadIndex: 1,
		gamepadControls: {
			4: "left",
			5: "right",
		},
	} ),
	new Game.Player( {
		startPos: new THREE.Vector3( 25, 10, -25 ),
		startAngle: new THREE.Euler( -0.5*PI, 0, 0.5*PI ),
		color: utils.randomColor(),
		controls: {
			"ArrowLeft": "left",
			"ArrowRight": "right",
		},
		gamepadIndex: 2,
		gamepadControls: {
			4: "left",
			5: "right",
		},
	} ),
	new Game.Player( {
		startPos: new THREE.Vector3( -25, 10, -25 ),
		startAngle: new THREE.Euler( 0.5*PI, 0, 0.5*PI ),
		color: utils.randomColor(),
		controls: {
			"a": "left",
			"d": "right",
		},
		gamepadIndex: 3,
		gamepadControls: {
			4: "left",
			5: "right",
		},
	} ),
]

const views = [
	{
		left: 0, top: 0, width: 0.5, height: 0.5,
		// left: 0, top: 0, width: 0.5, height: 1,
		update: updateCamera,
		player: players[0],
	},
	{
		left: 0.5, top: 0, width: 0.5, height: 0.5,
		update: updateCamera,
		player: players[1],
	},
	{
		// left: 0, top: 0.5, width: 0.5, height: 0.5,
		left: 0, top: 0.5, width: 0.5, height: 0.5,
		update: updateCamera,
		player: players[2],
	},
	{
		left: 0.5, top: 0.5, width: 0.5, height: 0.5,
		update: updateCamera,
		player: players[3],
	},
]
