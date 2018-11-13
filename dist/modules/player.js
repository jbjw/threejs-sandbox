//

console.log("Loaded Player.js")

window.Game.Player = function Player(args) {
	this.mesh = new THREE.Mesh(
		new THREE.ConeGeometry( 1, 2, utils.randomInt(5, 50) ),
		new THREE.MeshBasicMaterial( { color: args.color, wireframe: true, side: THREE.DoubleSide } ),
	)
	this.gamepadControls = args.gamepadControls
	this.gamepadIndex = args.gamepadIndex
	// this.gamepad

	// this.speed = 0.1

	this.velocity = new THREE.Vector3( 0, 0, 0 )
	this.angularVelocity = new THREE.Euler( 0, 0, 0 )

	this.thrust = args.thrust || 0.1

	this.gyroForce = args.gyroForce || 0.01
	this.mesh.position.copy( args.startPos )
	this.mesh.rotation.copy( args.startAngle )
	scene.add( this.mesh )
	objects.push( this )

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
		_this.handleKeydown.call(_this, e)
	} )

	this.update = function ( dt = 0.01 ) {

	}

	// var spotlight = new THREE.SpotLight( 0xffffff );
	// this.spotlight = new THREE.SpotLight( 0xffffff, 10, 10000, PI/4, 0 )
	// this.spotlight.position.set( 0, 10, 0 )
	// scene.add( this.spotlight )
// spotLight.position.set( 100, 1000, 100 );
//
// spotLight.castShadow = true;
//
// spotLight.shadow.mapSize.width = 1024;
// spotLight.shadow.mapSize.height = 1024;
//
// spotLight.shadow.camera.near = 500;
// spotLight.shadow.camera.far = 4000;
// spotLight.shadow.camera.fov = 30;
//
// scene.add( spotLight );
	// this.mesh.add( this.spotlight )

	// this.light = new THREE
	var ZERO = new THREE.Vector3()

	this.forwardArrow = new THREE.ArrowHelper( ZERO, this.mesh.position, 2, 0xffff00 )
	scene.add( this.forwardArrow )

	this.headingArrow = new THREE.ArrowHelper( ZERO, this.mesh.position, 2, 0x00ff00 )
	scene.add( this.headingArrow )

	this.velocityArrow = new THREE.ArrowHelper( ZERO, this.mesh.position, 2, 0xff0000 )
	scene.add( this.velocityArrow )

	this.update = function ( dt = 0.01 ) {
		// console.log(this.mesh.position.z)
		// this.mesh.position.z = 0


		var gravity = new THREE.Vector3( 0, 1, 0 )
		this.velocity.sub( gravity.multiplyScalar( dt ) )
		this.mesh.position.add( this.velocity )
		// this.mesh.position.add(this.mesh.getWorldDirection().multiplyScalar(this.speed * seconds))

		if ( this.mesh.position.y < 0 ) {
			// console.log("boudning")
			this.velocity.y = Math.abs( this.velocity.y ) * 0.5
			this.mesh.position.y = 0
		}

		var forward = this.mesh.getWorldDirection().normalize()
		this.forwardArrow.setDirection( forward )
		this.forwardArrow.position.copy( this.mesh.position )

		var ang = new THREE.Euler( 90, 0, 0 )
		// var normalizedHeading = this.mesh.localToWorld( new THREE.Vector3( 0, 0, 1 ) )
		// var normalizedHeading = this.mesh.getWorldDirection().normalize() // applyAxisAngle
		var UP = new THREE.Vector3( 0, 1, 0 )
		var normalizedHeading = UP.applyEuler( this.mesh.rotation )//.normalize()

		var thrustDirection = UP.applyEuler( this.mesh.rotation )//.normalize()
		// console.log(normalizedHeading)
		this.headingArrow.setDirection( normalizedHeading )
		this.headingArrow.position.copy( this.mesh.position )
		this.headingArrow.setLength( 10 )

		var normalizedVelocity = new THREE.Vector3().copy( this.velocity ).normalize()
		this.velocityArrow.setDirection( normalizedVelocity )
		this.velocityArrow.setLength( this.velocity.length() )
		this.velocityArrow.position.copy( this.mesh.position )
		// this.velocityArrow.position.copy( this.mesh.position )
		// has a gamepad?
		if ( typeof this.gamepad != "undefined" ) {

			// 6, 7 l r throttle
			// var lThrottle = this.gamepad.gamepad.buttons[6].value
			// var rThrottle = this.gamepad.gamepad.buttons[7].value
			const lThrottle = this.gamepad.gamepad.buttons[6].pressed
			const rThrottle = this.gamepad.gamepad.buttons[7].pressed
			if ( lThrottle > 0.1 ) {
				// this.speed -= Math.min( this.speed, lThrottle * this.brakePower  )
			}

			if ( rThrottle > 0.1 ) {
				var ang = new THREE.Euler( -0.5*PI, 0, 0.0*PI )
				// var upDirection = this.mesh.getWorldDirection().applyEuler( ang )
				// var upDirection = this.mesh.getWorldDirection()
				this.velocity.add( thrustDirection.multiplyScalar( this.thrust ) )
			}

			var rHor = this.gamepad.gamepad.axes[2] // right stick horizontal
			if (Math.abs(rHor) > 0.2) {
				this.angularVelocity.z += 2*PI*dt*rHor*this.gyroForce
			}

			var rVer = this.gamepad.gamepad.axes[3] // right stick vertical
			if (Math.abs(rVer) > 0.2) {
				this.angularVelocity.x += -2*PI*dt*rVer*this.gyroForce
			}

			this.mesh.rotation.x += this.angularVelocity.x
			this.mesh.rotation.y += this.angularVelocity.y
			this.mesh.rotation.z += this.angularVelocity.z

			for ( let i = 0; i < this.gamepad.buttonPresses.length; i++ ) {
				if ( this.gamepad.buttonPresses[i] ) {
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
