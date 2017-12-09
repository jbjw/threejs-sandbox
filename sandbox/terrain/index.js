//

"use strict";

// console.log(utils.wrapArray(x, 3))

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 100000 )
// const camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, -10, 1000 )
scene.add( camera )
camera.position.set( 1, 1, 1 )

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

// const dirtTexture = new THREE.TextureLoader().load( '../../assets/textures/dirt.jpg' )
// dirtTexture.anisotropy = renderer.getMaxAnisotropy()
// const dirtMaterial = new THREE.MeshBasicMaterial( { map: dirtTexture, side: THREE.DoubleSide } )

var dirtTexture = new THREE.TextureLoader().load( '../../assets/textures/dirt.jpg' )
dirtTexture.anisotropy = renderer.getMaxAnisotropy()

var woodTexture = new THREE.TextureLoader().load( '../../assets/textures/wood.jpg' )
woodTexture.anisotropy = renderer.getMaxAnisotropy()

let sphere = new THREE.Mesh(
	new THREE.SphereGeometry( 1, 32, 32 ),
	new THREE.MeshBasicMaterial( { color: 0xffffff, map: woodTexture, wireframe: false, side: THREE.DoubleSide } ),
)
sphere.position.set( 0, 10, 0 )
scene.add( sphere )

let cube = new THREE.Mesh(
	new THREE.BoxGeometry( 1, 1, 1 ),
	new THREE.MeshBasicMaterial( { color: 0xffffff, map: woodTexture, wireframe: false, side: THREE.DoubleSide } ),
)
cube.position.set( 0, 10, 0 )
scene.add( cube )

var s = 10
var ground = new THREE.Mesh(

	new THREE.PlaneGeometry( s, s, s, s ),
	new THREE.MeshBasicMaterial( {
		// color: 0x00ff00,
		// map: dirtTexture,
		wireframe: true,
		side: THREE.DoubleSide,
	} ),
)

// let i = 0
// var prevZ = 0
// for ( let vertex of plane.geometry.vertices ) {
// 	if (vertex.z == 0) {
// 		// prevZ = 0
// 	}
// 	// vertex.z = prevZ - 0.01
// 	vertex.z = prevZ + utils.randomInt(-10, 10)*0.1
// 	prevZ = vertex.z
// 	// vertex.z = utils.randomInt(-1, 2)
// 	// console.log( vertex )
// }
// plane.geometry.needsUpdate = true

function setup() {
	let x = 0, y = 0

	// for ( let vertex of ground.geometry.vertices ) {
	// 	vertex.z = noise(vertex.x*0.1 + x, vertex.y*0.1 + y)*10
	// 	// console.log( vertex.z )
	// }
	// ground.geometry.needsUpdate = true

	for ( let vertex of ground.geometry.vertices ) {
		vertex.z = noise(vertex.x*0.1 + x, vertex.y*0.1 + y)*10
		// console.log( vertex.z )
	}
	setTimeout( function () {
		console.log( ground.geometry )
	}, 2000 )

	setInterval( function () {
		for ( let vertex of ground.geometry.vertices ) {

			vertex.z = noise(vertex.x*0.1 + x, vertex.y*0.1 + y)*10
		}
		ground.geometry.verticesNeedUpdate = true
		ground.geometry.normalsNeedUpdate = true

		ground.geometry.verticesNeedUpdate = true;
		ground.geometry.elementsNeedUpdate = true;
		ground.geometry.morphTargetsNeedUpdate = true;
		ground.geometry.uvsNeedUpdate = true;
		ground.geometry.normalsNeedUpdate = true;
		ground.geometry.colorsNeedUpdate = true;
		ground.geometry.tangentsNeedUpdate = true;
		ground.geometry.computeFaceNormals()

		// console.log(  )
		// sphere.position.y = -ground.geometry.vertices[5100].z + sphere.scale.y

		// var v = ground.geometry.vertices[ 5000 ]
		// var f = ground.geometry.faces[ 1000 ]

		var f = cube.face
		if ( f ) {
			// console.log( f )
			var fa = ground.geometry.vertices[ f.a ]
			var fb = ground.geometry.vertices[ f.b ]
			var fc = ground.geometry.vertices[ f.c ]
			let c = new THREE.Vector3(
				( fa.x + fb.x + fc.x ) / 3,
				( fa.y + fb.y + fc.y ) / 3,
				( fa.z + fb.z + fc.z ) / 3,
			)
			// cube.position.copy( centroid )
			cube.position.x = c.x
			cube.position.y = -c.z // + cube.scale.y
			cube.position.z = c.y

			var nv = new THREE.Vector3( f.normal.x, -f.normal.z, f.normal.y )
			var r = new THREE.Euler().setFromVector3( nv )
			cube.rotation.copy( r )
			// cube.rotation.copy(  )
			// cube.up.
			// console.log( f.normal )
			// cube.rotation.copy
		}
		// f.normal

		// cube.position.x = v.x
		// cube.position.y = -v.z // + cube.scale.y
		// cube.position.z = v.y

		// cube.rotation =

		// sphere.position.y = ground.geometry.vertices[100*50 + 50].z
		// sphere.position.copy( ground.geometry.vertices[0] )
		// sphere.position.y = sphere.scale.y/2 + ground.geometry.vertices[0]
		// console.log( ground.geometry.needsUpdate )

		// ground.position.y = 5
		x += 0.1005, y += 0.1005
	}, 1000 )
}

scene.add( ground )
ground.rotation.x = Math.PI/2

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

// var axisHelper = new THREE.AxisHelper( 5 )
// scene.add( axisHelper )
//
// // colorCenterLine, colorGrid
// var gridHelper = new THREE.GridHelper( 100, 0.1 )
// scene.add( gridHelper )

function render() {
	requestAnimationFrame( render )
	renderer.render( scene, camera )
	controls.update()
}
requestAnimationFrame( render )

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}
window.addEventListener( 'resize', onWindowResize, false );
