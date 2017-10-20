//

"use strict";

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 100000 )
// const camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, -10, 1000 )
scene.add( camera )
camera.position.set( 5, 3, 5 )

const renderer = new THREE.WebGLRenderer()
renderer.setSize( window.innerWidth, window.innerHeight )
document.body.appendChild( renderer.domElement )

const controls = new THREE.OrbitControls( camera )
// // controls.enablePan = false;
// controls.keyPanSpeed = 70
// // controls.enableZoom = false;
// controls.zoomSpeed = 1
// controls.autoRotate = true;
// controls.autoRotateSpeed = 0.5;
// controls.enableDamping = true;
// controls.dampingFactor = 0.25;
// controls.enableRotate = false;

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

let objects = []
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

var ship = new Ship()



var plane = new THREE.Mesh(
	new THREE.PlaneGeometry( 10, 10, 10, 10 ),
	new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true, side: THREE.DoubleSide } ),
)
scene.add( plane )
plane.rotation.x = Math.PI/2

var axisHelper = new THREE.AxisHelper( 5 )
scene.add( axisHelper )

// colorCenterLine, colorGrid
var gridHelper = new THREE.GridHelper( 100, 0.1 )
scene.add( gridHelper )

function update() {
	for ( let object of objects ) {
		object.update()
	}
}
setInterval(update, 10)

function render() {
	requestAnimationFrame( render )
	renderer.render( scene, camera )
	controls.update()
	for ( let objet of objects ) {
		// object.update()
	}
}
requestAnimationFrame( render )

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}
window.addEventListener( 'resize', onWindowResize, false );
