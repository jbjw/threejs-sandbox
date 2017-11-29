//

console.log("Loading gamepad.js")
if ( ! ( "Game" in window ) ) {
	window.Game = {}
	console.log("window.Game not found, creating")
}

window.Game.Gamepad = function Gamepad( gamepad ) {
	this.getButtons = function () {
		return this.gamepad.buttons.map( e => e.pressed )
	}

	this.gamepad = gamepad
	// this.prevButtons = gamepad.buttons.slice()
	// this.prevButtons = JSON.parse( JSON.stringify( this.gamepad.buttons ) )
	this.prevButtons = this.getButtons()
	this.prevAxes = gamepad.axes.slice()
	// this.prevButtons = []
	// this.prevAxes = []

	this.buttonPresses = []

	this.update = function () {
		this.buttons = this.getButtons()
		// console.log(this.getButtons())
		// console.log(this.gamepad.buttons[0])
		// console.log(this.prevButtons[0])
		// console.log("---")
		// console.log(this.buttons)
		// console.log(this.prevButtons)
		for ( let i = 0; i < this.buttons.length; i++ ) {
			var button = this.buttons[i]
			var prevButton = this.prevButtons[i]

			// console.log(button)
			// console.log(prevButton)
			if (button.pressed) {
				// console.log(`${gamepad.timestamp}`)
				// console.log(`cur ${i} ${button.pressed}`)
				// console.log(`prev ${i} ${prevButton.pressed}`)
			}
			// if (prevButton.pressed) {

			// }

			if ( button != prevButton ) {

				this.buttonPresses[i] = button
				// console.log( `${i} ${button}` )
			} else {
				this.buttonPresses[i] = false
			}

			// if ( button && !this.buttonPresses[i] ) {
			// 	this.buttonPresses[i] = true
			// } else {
			// 	this.buttonPresses[i] = false
			// }

		}
		// console.log(this.buttonPresses)

		this.prevButtons = this.getButtons()
		// this.prevAxes = this.gamepad.axes.slice()
	}
}

console.log( "controller.js loaded" )

//
// onGamepadConnect: function(event) {
//   // Add the new gamepad on the list of gamepads to look after.
//   gamepadSupport.gamepads.push(event.gamepad);
//
//   // Start the polling loop to monitor button changes.
//   gamepadSupport.startPolling();
//
//   // Ask the tester to update the screen to show more gamepads.
//   tester.updateGamepads(gamepadSupport.gamepads);
// },
