import Inputs from "./Inputs.js"

export default class Entity {
	constructor(args) {
		this.mesh = args.mesh
		this.mass = args.mass === undefined ? 10 : args.mass

		this.position = this.mesh.position
		this.velocity = new THREE.Vector3(0, 0, 0)
		this.rotation = this.mesh.rotation
		this.angularVelocity = new THREE.Euler(0, 0, 0)
	}
	applyForce(magnitude, direction) {
		console.log(this.mass)
		this.velocity.add(direction.multiplyScalar(magnitude/this.mass))
	}
	updatePhysics() {
		if (Inputs.keyboardState["w"]) {
			this.applyForce(1, new THREE.Vector3(0, 0, 0.01))
		}
		if (Inputs.keyboardState["a"]) {
			this.applyForce(1, new THREE.Vector3(0.01, 0, 0))
		}
		if (Inputs.keyboardState["s"]) {
			this.applyForce(1, new THREE.Vector3(0, 0, -0.01))
		}
		if (Inputs.keyboardState["d"]) {
			this.applyForce(1, new THREE.Vector3(-0.01, 0, 0))
		}
		if (Inputs.keyboardState[" "]) {
			this.applyForce(1, new THREE.Vector3(-1.0111, 0, 0))
		}

		this.position.add(this.velocity)
		// this.rotation.
	}
	get area() {
		return this.x
	}
	set area(x) {
		this.area
	}
}
