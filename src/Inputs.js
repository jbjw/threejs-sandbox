class Inputs {
	constructor(args) {
		this.keyboardState = {}
		// document.addEventListener("keypress", function (e) {
		// 	console.log("key pressed")
		// 	console.log(e.key)
		// })
		document.addEventListener("keydown", e => {
			this.keyboardState[e.key] = true
			// console.log(e.key, "down")
		})
		document.addEventListener("keyup", e => {
			this.keyboardState[e.key] = false
			// console.log(e.key, "up")
		})
	}
}

const x = new Inputs()
export default x
