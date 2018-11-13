//

function map(value, min, max, newMin, newMax) {
	// stretch (newMax-newMin) * value

	// translate value + (newMin - min)
	// return (newMax-newMin*value) + newMin
}


console.log("Loaded FPSControls.js")

Game.FPSControls = function ( camera, object, player ) {
	// gamepad or player
	this.camera = camera
	this.object = object
	// this.gamepad = gamepad
	this.player = player
	// this.camera.fov = 5
	// this.camera.updateProjectionMatrix()

	this.handleWheel = function ( e ) {
		console.log( e.deltaY )
		// this.camera.fov += e.deltaY * 0.01
		this.camera.zoom += e.deltaY * 0.001
	}
	var _this = this
	document.addEventListener( "wheel", function ( e ) {
		_this.handleWheel.call( _this, e )
	} )

	this.update = function () {
		if ( this.player.gamepad !== null && this.player.gamepad !== undefined ) {
			var leftX = 0 // this.player.gamepad.gamepad.axes[0] // left hor
			var leftY = 0 // this.player.gamepad.gamepad.axes[1] // left ver
		} else {
			var leftX = 0
			var leftY = 0
		}

		if ( Math.abs( leftX ) > 0.2 ) {

		} else {
			leftX = 0
		}

		if ( Math.abs( leftY ) > 0.5 ) {

		} else {
			leftY = 0
		}

		var offset = new THREE.Vector3( 0, 4, -15 )
		var cameraPos = new THREE.Vector3()
		cameraPos.copy( this.object.position )
		cameraPos.add( offset )
		this.camera.position.copy( cameraPos )
		this.camera.lookAt( this.object.position )

		// var relativeCameraOffset = new THREE.Vector3( 0, 4, -15 )
		// relativeCameraOffset.applyAxisAngle( UP, -leftX * 0.8 * PI )
		// relativeCameraOffset.applyAxisAngle( FORWARD, leftY * 0.4 * PI )
		// // var cameraOffset = this.object.localToWorld( relativeCameraOffset )
		// var cameraOffset = relativeCameraOffset.applyMatrix4( this.object.matrixWorld )
		// this.camera.position.copy( cameraOffset )
		// this.camera.lookAt( this.object.position )
	}
}
