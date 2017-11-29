//

console.log("Loading player.js")

if ( ! ( "Game" in window ) ) {
	window.Game = {}
	console.log("window.Game not found, creating")
}

window.Game.Player = function Player(args) {
	this.mesh = new THREE.Mesh(
		new THREE.ConeGeometry( 10, 20, utils.randomInt(5, 50) ),
		new THREE.MeshBasicMaterial( { color: args.color, wireframe: true, side: THREE.DoubleSide } ),
	)
	this.gamepadControls = args.gamepadControls
	this.gamepadIndex = args.gamepadIndex
	// this.gamepad

	this.speed = 100

	this.accelPower = args.accelPower || 2.0
	this.brakePower = args.brakePower || 3.0
	// this.mesh.position.set( )
	this.mesh.position.copy(args.startPos)
	// this.mesh.rotation.copy(args.startAngle)
	scene.add(this.mesh)
	objects.push(this)

	this.wallPoints = []

	this.controls = args.controls

	var _this = this

	this.handleKeydown = function (e) {
		if ( !e.repeat ) {
			switch ( this.controls[e.key] ) {
				case "left":
					this.turn(-0.5*PI)
					break
				case "right":
					this.turn(0.5*PI)
					break
			}
		}
	}

	this.turn = function ( angle ) {
		this.mesh.rotateY( -angle )
	}

	document.addEventListener("keydown", function (e) {
		// console.log(_this)
		_this.handleKeydown.call(_this, e)
	} )

	this.update = function (dt = 10) {
		var seconds = dt / 1000
		var displacement = 2
		// this.speed += Math.min( this.speed, 0.1 )
		this.mesh.position.add(this.mesh.getWorldDirection().multiplyScalar(this.speed * seconds))
	}

	this.updateControls = function () {
		// console.
		// has a gamepad?
		if ( typeof this.gamepad != "undefined" ) {

			// 6, 7 l r throttle
			var lThrottle = this.gamepad.gamepad.buttons[6].value
			var rThrottle = this.gamepad.gamepad.buttons[7].value
			if ( lThrottle > 0.1 ) {
				this.speed -= Math.min( this.speed, lThrottle * this.brakePower  )
			}
			if ( rThrottle > 0.1 ) {
				this.speed += rThrottle * this.accelPower
			}

			// this.turn(1)
			var axis2 = this.gamepad.gamepad.axes[2] // right stick horizontal
			if (Math.abs(axis2) > 0.2) {
				this.turn(2*PI*0.004*axis2)
			}
			// console.log("i have a gamepad")
			for ( let i = 0; i < this.gamepad.buttonPresses.length; i++ ) {
				// console.log(i)
				if ( this.gamepad.buttonPresses[i] ) {
					// console.log(this.gamepadControls[i])
					switch ( this.gamepadControls[i] ) {
						case "left":
							this.turn(-0.5*PI)
							break
						case "right":
							this.turn(0.5*PI)
							break
					}
				}
			}
		}

		// if ( !e.repeat ) {

		// }
	}
}
