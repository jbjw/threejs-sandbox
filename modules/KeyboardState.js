function KeyboardState() {
	document.addEventListener("keypress", function (e) {
		console.log("key pressed")
		console.log(e.key)
	})
}


var keyboardState = {}

document.addEventListener("keypress", function (e) {
	console.log("key pressed")
	console.log(e.key)
})

document.addEventListener("keydown", function (e) {
	keyboardState[e.key] = true
})

document.addEventListener("keyup", function (e) {
	keyboardState[e.key] = false
	// console.log(keyboardState)
})
