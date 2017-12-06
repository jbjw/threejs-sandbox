

var keyboardState = {}

document.addEventListener("keypress", function (e) {
	console.log(e.key)
})

document.addEventListener("keydown", function (e) {
	keyboardState[e.key] = true
})

document.addEventListener("keyup", function (e) {
	keyboardState[e.key] = false
	// console.log(keyboardState)
})





function Ship() {
	objects.push(this)


	this.velocity = new THREE.Vector3(0, 0.01, 0)

	// sphere.position.set( 0, 10, 0 )

	this.mesh = new THREE.Mesh(
		// new THREE.SphereGeometry( 5, 32, 32 ),
		new THREE.BoxGeometry( 4, 4, 1, 1 ),
		new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true, side: THREE.DoubleSide } ),
	)

	scene.add(this.mesh)

	this.update = function () {
		if (keyboardState["a"]) {
			this.velocity.x += 0.001
		}
		if (keyboardState["d"]) {
			this.velocity.x += -0.001
		}
		if (keyboardState["w"]) {
			this.velocity.z += 0.001
		}
		if (keyboardState["s"]) {
			this.velocity.z += -0.001
		}
		if (keyboardState["r"]) {
			this.velocity.y += 0.001
		}
		if (keyboardState["f"]) {
			this.velocity.y += -0.001
		}
		if (keyboardState[" "]) {
			this.velocity.set(0, 0, 0)
		}

		// console.log('update')
		this.mesh.position.add(this.velocity)
		// this.mesh.position.set(this.mesh.position.add(this.velocity))
	}
}
