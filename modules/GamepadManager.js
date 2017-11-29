//

console.log("Loaded GamepadManager.js")

if ( ! ( "Game" in window ) ) {
	window.Game = {}
	console.log("window.Game not found, creating")
}

window.Game.GamepadManager = function GamepadManager(onGamepadConnected, onGamepadDisconnected) {
	this.gamepads = [null, null, null, null]
	this.curGamepads = [null, null, null, null]
	this.onGamepadConnected = onGamepadConnected
	this.onGamepadDisconnected = onGamepadDisconnected

	this.poll = function () {
		// console.log("x")
		const newGamepads = navigator.getGamepads()

		// console.log(newGamepads)
		// console.log( this.curGamepads )
		for ( let i = 0; i < newGamepads.length; i++ ) {

			const newGamepad = newGamepads[i], gamepad = this.curGamepads[i]
			if ( gamepad !== newGamepad ) {
				if ( gamepad === null ) {
					// console.log( "Gamepad connected:" )
					// console.log( newGamepad )

					this.curGamepads[i] = newGamepad
					this.gamepads[i] = new Game.Gamepad( newGamepad )
					this.onGamepadConnected( newGamepad )
				} else if ( newGamepad === null ) {
					// console.log( "Gamepad disconnected:" )
					// console.log( gamepad )

					this.curGamepads[i] = null
					this.gamepads[i] = null
					this.onGamepadDisconnected( gamepad )
				} else {
					console.log( "Mystery error!" )
				}
			}
		}

		for ( let gamepad of this.gamepads ) {
			// console.log(gamepad)
			if ( gamepad !== null ) {
				gamepad.update()
			}
		}
	}
	var _this = this
	setInterval( function () {
		_this.poll.call(_this)
	}, 10 )
}
