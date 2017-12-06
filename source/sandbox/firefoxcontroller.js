window.addEventListener( "gamepadconnected", function( e ) {
	gamepads[e.gamepad.index] = new Game.Gamepad(e.gamepad)
	linkGamepads()
	console.log(`connected ${e.gamepad}`)
	// console.log(`connected ${e.gamepad.index} ${e.gamepad.id} ${e.gamepad.buttons.length} ${e.gamepad.axes.length}`)
	console.log(gamepads)
} )

window.addEventListener( "gamepaddisconnected", function( e ) {
	linkGamepads()
	delete gamepads[e.gamepad.index]
	console.log(`disconnected ${e.gamepad}`)
	// console.log(`disconnected ${e.gamepad.index} ${e.gamepad.id} ${e.gamepad.buttons.length} ${e.gamepad.axes.length}`)
	console.log(gamepads)
} )
