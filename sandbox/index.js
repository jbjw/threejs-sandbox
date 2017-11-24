//

'use strict';

var stats = new Stats()
stats.showPanel( 1 ) // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild( stats.dom )

const WIDTH = window.innerWidth
const HEIGHT = window.innerHeight
const FOV = 75
const ASPECT_RATIO = WIDTH / HEIGHT
const NEAR = 0.1
const FAR = 100000

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera( FOV, ASPECT_RATIO, NEAR, FAR )
scene.add( camera )
// const camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, -10, 1000 );

const PI = Math.PI

const renderer = new THREE.WebGLRenderer()
renderer.setSize( WIDTH, HEIGHT )
document.body.appendChild( renderer.domElement )

camera.position.set( 0, 5, 5 )
// camera.zoom = 10
// camera.fov = 180
// .focus,.fov, .zoom

// camera.rotation.x = Math.PI/2

// const controls = new THREE.PointerLockControls( camera );
// scene.add( controls.getObject() );

// document.addEventListener( 'mousemove', function ( e ) {
// 	if ( document.pointerLockElement === renderer.domElement ) {
// 		camera.rotation.y += e.movementX/100
// 		camera.rotation.x += -e.movementY/100
// 	}
// } )

// document.exitPointerLock()
renderer.domElement.addEventListener( 'click', function() {
	// renderer.domElement.requestPointerLock()
} )
document.addEventListener('pointerlockchange', lockChangeAlert, false)
function lockChangeAlert() {
	if( document.pointerLockElement === renderer.domElement ) {
		controls.enabled = true;
		console.log('The pointer lock status is now locked')
	} else {
		controls.enabled = false;
		console.log('The pointer lock status is now unlocked')
	}
}

const controls = new THREE.OrbitControls(camera);
// // controls.enablePan = false;
// controls.keyPanSpeed = 70
// // controls.enableZoom = false;
// controls.zoomSpeed = 1
// controls.autoRotate = true;
// controls.autoRotateSpeed = 0.5;
// controls.enableDamping = true;
// controls.dampingFactor = 0.25;
// controls.enableRotate = false;

const textures = {}
const materials = {}

const dirtTexture = THREE.ImageUtils.loadTexture( '../assets/textures/stone.jpg' )
dirtTexture.anisotropy = renderer.getMaxAnisotropy()
const dirtMaterial = new THREE.MeshLambertMaterial( { map: dirtTexture, side: THREE.DoubleSide } )

const woodTexture = THREE.ImageUtils.loadTexture( '../assets/textures/crate.jpg' )
woodTexture.anisotropy = renderer.getMaxAnisotropy()
const woodMaterial = new THREE.MeshLambertMaterial( { map: woodTexture, side: THREE.DoubleSide } )

const grassTexture = THREE.ImageUtils.loadTexture( '../assets/textures/grass.jpg' )
grassTexture.anisotropy = renderer.getMaxAnisotropy()
const grassMaterial = new THREE.MeshLambertMaterial( { map: grassTexture, side: THREE.DoubleSide } )

const shaderMaterial = new THREE.ShaderMaterial( {
  vertexShader: document.getElementById( 'vertexShader' ).textContent,
  fragmentShader: document.getElementById( 'fragmentShader' ).textContent,
} );

// new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true, side: THREE.DoubleSide } )

function Sphere() {
	this.mesh = new THREE.Mesh(
		new THREE.SphereGeometry( 5, 32, 32 ),
		shaderMaterial,
	)
}

function Cube() {
	this.mesh = new THREE.Mesh(
		new THREE.BoxGeometry( 1, 1, 1 ),
		woodMaterial
	)
}

let sphere = new Sphere()
sphere.mesh.position.set( 0, 10, 0 )
scene.add( sphere.mesh )
// const cube = new Cube()
// scene.add( cube )

for ( let i = 0; i < 10; i++ ) {
	// console.log('t')
	for ( let j = 0; j < 10; j++ ) {
		let x = new Cube()
		let mesh = x.mesh
		// console.log('t')
		scene.add( mesh )
		mesh.position.set( i*2, 0.5, j*2 )
	}
}

var guiParams = {
	color: "#ffae23",
// 	this.color0 = "#ffae23"; // CSS string
// this.color1 = [ 0, 128, 255 ]; // RGB array
// this.color2 = [ 0, 128, 255, 0.3 ]; // RGB with alpha
	camera: {
		zoom: 10,
		fov: 90,
	},
}

// var gui = new dat.GUI({
//   load: JSON,
//   preset: 'Flow'
// });
var gui = new dat.GUI( { load: presets } )
var guiColor = gui.addColor( guiParams, 'color' )
gui.remember( guiParams )

var camGui = gui.addFolder( 'camera' )
var camGuiPosition = camGui.addFolder( 'position' )
camGuiPosition.add(camera.position, 'x', -10, 10, 1).listen()
camGuiPosition.add(camera.position, 'y', -10, 10, 1).listen()
camGuiPosition.add(camera.position, 'z', -10, 10, 1).listen()
var camGuiRotation = camGui.addFolder( 'rotation' )
var camGuiZoom = camGui.add( camera, 'zoom', 0, 10 ).listen()
var camGuiFOV = camGui.add( camera, 'fov', 0, 180 ).listen()

camGuiZoom.onChange( function () {
	camera.updateProjectionMatrix()
} )

camGuiFOV.onChange( function () {
	camera.updateProjectionMatrix()
} )

// camGuiRotation.open()
// camGuiRotation.close()
// gui.addColor(text, 'color0');

// controller.onChange(function(value) {
//   // Fires on every change, drag, keypress, etc.
// });
//
// controller.onFinishChange(function(value) {
//   // Fires when a controller loses focus.
//   alert("The new value is " + value);
// });

var skySphere = new THREE.Mesh(
	new THREE.SphereGeometry( 1000, 32, 32 ),
	new THREE.MeshBasicMaterial( {
		map: THREE.ImageUtils.loadTexture('assets/360images/forest.jpg'),
		side: THREE.FrontSide, // was backside
	} )
)
skySphere.scale.x = -1 // was not here
scene.add( skySphere );

var plane = new THREE.Mesh(
	new THREE.PlaneGeometry( 10, 10, 10, 10 ),
	grassMaterial,
)
scene.add( plane )
plane.rotation.x = PI/2



// white spotlight shining from the side, casting a shadow

var spotlight = new THREE.SpotLight( 0xff0000, 0.1 )

spotlight.position.set( 0, 800, 0 )

spotlight.intensity = 10
spotlight.angle = PI/16
spotlight.distance = 1000
spotlight.decay = 2

scene.add( spotlight )

// spotlight.target = players[0].mesh
// spotlight.target.

// spotlight.castShadow = true;
//
// spotlight.shadow.mapSize.width = 1024;
// spotlight.shadow.mapSize.height = 1024;
//
// spotlight.shadow.camera.near = 500;
// spotlight.shadow.camera.far = 4000;
// spotlight.shadow.camera.fov = 30;



// console.log(spotlight)
var spotLightHelper = new THREE.SpotLightHelper( spotlight )
scene.add( spotLightHelper )

var light = new THREE.AmbientLight( 0x404040, 1 )

// var light = new THREE.AmbientLight( {
// 	color: 0xFF0000,
// 	// color: 0x404040,
// 	intensity: 0.1,
// } )

scene.add( light )


// THREE.Vector3( x, y, z );
// THREE.Euler( x, y, z );
// position, rotation, scale

// camera.position = new THREE.Vector3(10, 10, 5);
//camera.setRotationFromEuler(new THREE.Euler(1, 1, 1));
//camera.lookAt(cube);
// camera.rotation = new THREE.Euler(0, 0, 0);
// line curve point

var axisHelper = new THREE.AxisHelper( 5 )
scene.add( axisHelper )

// colorCenterLine, colorGrid
var gridHelper = new THREE.GridHelper( 100, 0.1 )
scene.add( gridHelper )

const speed = 0.01;

const xGrow = 0.02;
const yGrow = 0.01;

let tick = 0

// console.log(plane.geometry.vertices[0])

var options = {
	start: new THREE.Vector2( -10, -10 ),
	end: new THREE.Vector2( 10, 10 ),
	subdivisions: new THREE.Vector2( 29, 15 ),
}

console.log( flattenArray( [ [1, 2], [3, 4], ['a', 'x'] ]))
function flattenArray( arr ) {
	let newArr = []
	for ( let a of arr ) {
		for ( let b of a ) {
			newArr.push( b )
		}
	}
}

function genPlane( options ) {
	let vertices = []
	const xDelta = options.end.x - options.start.x
	const xSpacing = xDelta / options.subdivisions.x
	const yDelta = options.end.y - options.start.y
	const ySpacing = yDelta / options.subdivisions.y



	for ( let x = 0; x < options.subdivisions.x; x++ ) {
		for ( let y = 0; y < options.subdivisions.y; y++ ) {
			//
		}
	}

}

for ( let vertex of plane.geometry.vertices ) {
	console.log(vertex)
	// const x = (Math.random()*100)-(100/2)
	// const y = (Math.random()*100)-(100/2)
	// const z =
	// vertex.z = (Math.random()*1)-1
	// vertex.set( x, y, 0 )
}

// plane.geometry.verticesNeedUpdate = true;

function render() {
	requestAnimationFrame( render )
	stats.begin()




	// for ( var i = 0, l = cube.geometry.vertices.length; i < l; i ++ ) {
	// 	// geometry.vertices[ i ].y = 35 * Math.sin( i / 5 + ( tick + i ) / 7 );
	// 	// geometry.vertices[i].multiplyScalar(1.001);
	// }
	// geometry.verticesNeedUpdate = true;
	// 1476316698624
	// camera.lookAt(cube.position);
	// camera.rotation.x = 0;

	// plane.rotation.z += 0.0001;
	// plane.rotation.x = 0.1*Math.sin(tick*0.05);
	// plane.rotation.y = 0.1*Math.sin(tick*0.04);

	// cube.rotation.x += 0.01;
	// cube.rotation.y += 0.1;
	// cube.position.x = width * Math.sin(tick*speed);
	// cube.position.y = width * Math.sin(tick*speed + 90);

	// cube.scale.x = tick * xGrow;
	// cube.scale.y = tick * yGrow;
	//console.log(Math.sin(time*0.1))

	renderer.render( scene, camera )
	tick++
	controls.update();
	stats.end()
}
requestAnimationFrame( render )

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}
window.addEventListener( 'resize', onWindowResize, false );
