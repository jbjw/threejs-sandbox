//

console.log("Loading view.js")

if ( ! ( "Game" in window ) ) {
	window.Game = {}
	console.log("window.Game not found, creating")
}

window.Game.View = function View(left, top, width, height, camera, player) {
	this.left = left, this.top = top, this.width = width, this.height = height
	// consider just taking in a passed in camera
	this.camera = camera
	this.player = player
	// camera.position.fromArray( view.eye )
	// camera.up.fromArray( view.up )

	this.update = function updateCamera() {
		if ( typeof this.player.gamepad == "undefined" ) {
			var leftX = 0
			var leftY = 0
		} else {
			var leftX = this.player.gamepad.gamepad.axes[0] // left hor
			var leftY = this.player.gamepad.gamepad.axes[1] // left ver
		}

		if ( Math.abs( leftX ) > 0.2 ) {

		} else {
			leftX = 0
		}

		if ( Math.abs( leftY ) > 0.5 ) {

		} else {
			leftY = 0
		}

		var relativeCameraOffset = new THREE.Vector3( 0, 20, -50 )
		relativeCameraOffset.applyAxisAngle( UP, -leftX * 0.8 * PI )
		relativeCameraOffset.applyAxisAngle( FORWARD, leftY * 0.4 * PI )

		// relativeCameraOffset.applyAxisAngle()

		var cameraOffset = relativeCameraOffset.applyMatrix4( this.player.mesh.matrixWorld )
		this.camera.position.copy( cameraOffset )
		this.camera.lookAt( this.player.mesh.position )
		// camera.position.set( 5, utils.randomInt(0, 5), 5 )
	}
}
