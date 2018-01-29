//

"use strict"

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.01, 100000 )
// const camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, -10, 1000 )
scene.add( camera )
camera.position.set( 5, 3, 5 )

// const renderer = new THREE.WebGLRenderer( { alpha: true } )
const renderer = new THREE.WebGLRenderer()
renderer.setSize( window.innerWidth, window.innerHeight )
document.body.appendChild( renderer.domElement )

// document.addEventListener("click", function () {
// 	document.documentElement.webkitRequestFullscreen()
// })

document.addEventListener("webkitfullscreenchange", function () {
	console.log("webkitfullscreenchange")
})
document.addEventListener("mozfullscreenchange", function () {
	console.log("mozfullscreenchange")
})
document.addEventListener("fullscreenchange", function () {
	console.log("fullscreenchange")
})

document.addEventListener("webkitfullscreenchange", function () {
	if (!document.webkitFullscreenElement) {
		fullscreenButton.style.display = "block"
	} else {
		fullscreenButton.style.display = "none"
	}
})

function toggleFullScreen() {
	if (!document.webkitFullscreenElement) {
		document.documentElement.webkitRequestFullscreen()
	} else {
		document.webkitExitFullscreen()
	}
}

var fullscreenButton = document.querySelector("#fullscreen-button")
fullscreenButton.addEventListener("click", function () {
	toggleFullScreen()
})

const controls = new THREE.OrbitControls(camera)

const colors = [
	"#FFFFFF",
	// "#FFFFFF",
	// "#FFFFFF",
	"#FFCCCC",
	"#CCFFFF",
	"#CCCCFF",
]
// const colors = [
// 	new THREE.Color( "#FFFFFF" ),
// 	new THREE.Color( "#CCCCFF" ),
// 	new THREE.Color( "#FFCCCC" ),
// 	new THREE.Color( "#CCFFFF" ),
// ]

var loader = new THREE.CubeTextureLoader()
loader.setPath( '../../assets/cube_textures/space-cube/' )

var textureCube = loader.load( [
	"r.png", "l.png", // 'px.png', 'nx.png',
	"t.png", "b.png", // 'py.png', 'ny.png',
	"c.png", "rr.png", // 'pz.png', 'nz.png',
] )
// console.log( textureCube )
var material = new THREE.MeshBasicMaterial( { color: 0xffff00, envMap: textureCube } )
scene.background = textureCube

// scene.background = new THREE.Color( 0x0000ff )

let objects = []


var raycaster = new THREE.Raycaster()
var mouse = new THREE.Vector2()

renderer.domElement.addEventListener( 'click', function ( event ) {
	mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1
	mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1

	raycaster.setFromCamera( mouse, camera )

	var objects = scene.children
	var intersections = raycaster.intersectObjects( objects, true )

// 	var position = new THREE.Vector3();
// position.x = ( v1.x + v2.x + v3.x ) / 3;
// position.y = ( v1.y + v2.y + v3.y ) / 3;
// position.z = ( v1.z + v2.z + v3.z ) / 3;

	for ( let intersection of intersections ) {

	}
	if ( intersections.length > 0 ) {
		let first = intersections[ 0 ]
		if ( first.object === ground ) {

			let f = first.face
			cube.face = f

		}
		// intersections[ 0 ].object.material.color.set( 0xff0000 )
		// console.log( intersections[0] )
		// console.log( intersections[ 0 ].indices )
		// intersections[ 0 ].object.geometry.vertices[ intersections[ 0 ].indices[0] ]
	}

	for ( var i = 0; i < intersections.length; i++ ) {
		// intersections[ i ].object.material.color.set( 0xff0000 );
	}
} )

function Station( args ) {
	this.mesh = new THREE.Mesh(
		new THREE.SphereGeometry( args.radius, 32, 32 ),
		// new THREE.BoxGeometry( 0.1, 0.1, 0.1 ),
		new THREE.MeshBasicMaterial( { color: 0xaaaaaa, wireframe: false, side: THREE.DoubleSide } ),
	)

	this.mesh.position.copy( convertCoords( parseCoords( args.coords ) ) )
	scene.add( this.mesh )

	this.label = new Label( {
		text: args.name,
	} )
	scene.add( this.label.sprite )

	this.label.sprite.position.addVectors( this.mesh.position, new THREE.Vector3( 0, 0, 0 ) )

	this.update = function () {

	}
}

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
	for ( let object of objects ) {
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
