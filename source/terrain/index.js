//

"use strict";

import * as utils from '../libraries/utils.js'

// var x = [0, 1, 2]

console.log(utils.wrapArray(x, 3))
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 100000 )
// const camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, -10, 1000 )
scene.add(camera)
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

let sphere = new THREE.Mesh(
	new THREE.SphereGeometry( 5, 32, 32 ),
	new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true, side: THREE.DoubleSide } ),
)
sphere.position.set( 0, 10, 0 )
scene.add( sphere )

var plane = new THREE.Mesh(
	new THREE.PlaneGeometry( 100, 100, 100, 100 ),
	new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true, side: THREE.DoubleSide } ),
)


// console.log( plane.geometry.vertices )

let i = 0
var prevZ = 0
for ( let vertex of plane.geometry.vertices ) {
	if (vertex.z == 0) {
		// prevZ = 0
	}
	// vertex.z = prevZ - 0.01
	vertex.z = prevZ + utils.randint(-10, 10)*0.1
	prevZ = vertex.z
	// vertex.z = utils.randint(-1, 2)
	// console.log( vertex )
}
plane.geometry.needsUpdate = true

scene.add( plane )
plane.rotation.x = Math.PI/2

var axisHelper = new THREE.AxisHelper( 5 )
scene.add( axisHelper )

// colorCenterLine, colorGrid
var gridHelper = new THREE.GridHelper( 100, 0.1 )
scene.add( gridHelper )

function render() {
	requestAnimationFrame( render )
	renderer.render( scene, camera )
	controls.update()
	// sphere.position.y += 0.01
	// camera.rotation.x = camera.rotation.x + 0.0001
	// console.log('what')
}
requestAnimationFrame( render )

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}
window.addEventListener( 'resize', onWindowResize, false );
