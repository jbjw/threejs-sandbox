// Three.js Template

'use strict'

var stats = new Stats()
stats.showPanel( 1 ) // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild( stats.dom )

const PI = Math.PI

const width = window.innerWidth
const height = window.innerHeight
const fov = 75
const aspect = width / height
const near = 0.1
const far = 100000

const renderer = new THREE.WebGLRenderer()
// renderer.setSize( window.innerWidth, window.innerHeight )
renderer.setSize( width, height )
document.body.appendChild( renderer.domElement )
// renderer.setClearColor( "#AA00AA", 0.5 )

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera( fov, aspect, near, far )
// const camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, -10, 1000 );
scene.add( camera )
// camera.fov = 120
// camera.aspect = window.innerWidth / window.innerHeight
// camera.near = 0.1
// camera.far = 100000
// camera.updateProjectionMatrix()
camera.position.set( 1, 1, 1 )
// .focus,.fov, .zoom

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

// var texture = new THREE.TextureLoader().load( '../../assets/textures/wood.jpg' )
// const grassTexture = THREE.ImageUtils.loadTexture( "../../assets/textures/grass.jpg" )

const dirtTexture = new THREE.TextureLoader().load( '../../assets/textures/dirt.jpg' )
dirtTexture.anisotropy = renderer.getMaxAnisotropy()
const dirtMaterial = new THREE.MeshBasicMaterial( { map: dirtTexture, side: THREE.DoubleSide } )

const woodTexture = new THREE.TextureLoader().load( '../../assets/textures/wood.jpg' )
woodTexture.anisotropy = renderer.getMaxAnisotropy()
const woodMaterial = new THREE.MeshBasicMaterial( { map: woodTexture, side: THREE.DoubleSide } )

const grassTexture = new THREE.TextureLoader().load( '../../assets/textures/grass.jpg' )
grassTexture.anisotropy = renderer.getMaxAnisotropy()
const grassMaterial = new THREE.MeshBasicMaterial( { map: grassTexture, side: THREE.DoubleSide } )

// const shaderMaterial = new THREE.ShaderMaterial( {
// 	vertexShader: document.getElementById( 'vertexShader' ).textContent,
// 	fragmentShader: document.getElementById( 'fragmentShader' ).textContent,
// } )

// new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true, side: THREE.DoubleSide } )

// new THREE.Mesh(
// 	new THREE.SphereGeometry( 5, 32, 32 ),
// 	shaderMaterial,
// )
//
// new THREE.Mesh(
// 	new THREE.BoxGeometry( 1, 1, 1 ),
// 	new THREE.MeshBasicMaterial().copy( materialTemplate )
// )

// const tmp = new THREE.Mesh(
// 	new THREE.BoxGeometry( 10, 10, 10 ),
// 	new THREE.MeshBasicMaterial().copy( woodMaterial )
// )
// scene.add( tmp )
// tmp.position.set( i*2, 0.5, j*2 )

for ( let i = 0; i < 10; i++ ) {
	for ( let j = 0; j < 10; j++ ) {
		const tmp = new THREE.Mesh(
			new THREE.BoxGeometry( 1, 1, 1 ),
			new THREE.MeshBasicMaterial().copy( woodMaterial )
		)
		scene.add( tmp )
		tmp.position.set( i*2, 0.5, j*2 )
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
// var gui = new dat.GUI()
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

var raycaster = new THREE.Raycaster()
var mouse = new THREE.Vector2()

renderer.domElement.addEventListener( 'click', function ( event ) {
	mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1
	mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1

	raycaster.setFromCamera( mouse, camera )

	// var objects = scene.children
	var objects = [ ground.mesh, ]
	var intersections = raycaster.intersectObjects( objects, true )
	// console.log( intersections )

	for ( let intersection of intersections ) {

	}
	if ( intersections.length > 0 ) {
		// console.log( "more den one" )
		const obj = intersections[0].object.wrapper
		obj.blink( 0xff0000 )
		console.log("test")
		// intersections[ 0 ].object.material.color.set( 0xff0000 )
		// scene.remove( intersections[ 0 ].object )

	}

	// for ( var i = 0; i < intersections.length; i++ ) {
	// 	intersections[ i ].object.material.color.set( 0xff0000 );
	// }
} )

let cursorSphere = new THREE.Mesh(
	new THREE.SphereGeometry( 1, 32, 32 ),
	new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true, side: THREE.DoubleSide } ),
)
cursorSphere.position.set( 0, 10, 0 )
scene.add( cursorSphere )

// skybox
var skybox = new THREE.Mesh(
	new THREE.SphereGeometry( 1000, 32, 32 ),
	new THREE.MeshBasicMaterial( {
		map: new THREE.TextureLoader().load('../../assets/360images/painted.jpg'),
		side: THREE.FrontSide, // was backside
	} )
)
skybox.scale.x = -1 // inverting, just render differently?
scene.add( skybox )

// ground plane

const objects = []

function Ground() {
	this.mesh = new THREE.Mesh(
		new THREE.PlaneGeometry( 10, 10, 32, 32 ),
		grassMaterial,
	)
	this.mesh.material.color = new THREE.Color( 0x123456 )
	this.mesh.rotation.x = Math.PI/2
	this.mesh.wrapper = this
	scene.add( this.mesh )
	objects.push( this )

	this.blinkTimerInitial = 60
	this.origColor = this.mesh.material.color.clone()
	this.blink = function ( color ) {
		this.blinking = true
		this.newColor = new THREE.Color( color )
		this.mesh.material.color.copy( this.newColor )
		this.blinkTimer = this.blinkTimerInitial
	}
	this.render = function () {
		if ( this.blinking ) {
			this.blinkTimer -= 1
			if ( this.blinkTimer === 0 ) {
				console.log("fin")
				this.blinking = false
				this.mesh.material.color.set( this.origColor )
			} else {
				var t = this.blinkTimer / this.blinkTimerInitial // 1 just started 0 finished
				console.log( 1 - t )

				this.mesh.material.color.copy( this.newColor.lerp( this.origColor, 0.1 ) )
				console.log(  )
			}
		}
	}
}
var ground = new Ground()

// line curve point

var axisHelper = new THREE.AxisHelper( 5 )
scene.add( axisHelper )
console.log( axisHelper.uuid )

// colorCenterLine, colorGrid
var gridHelper = new THREE.GridHelper( 100, 0.1 )
scene.add( gridHelper )
console.log( gridHelper.uuid )

// lighting
var spotlight = new THREE.SpotLight( 0xff0000, 0.1 )

spotlight.position.set( 0, 100, 0 )

spotlight.intensity = 10
spotlight.angle = PI/256
spotlight.distance = 1000
spotlight.decay = 0

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

// var spotLightHelper = new THREE.SpotLightHelper( spotlight )
// scene.add( spotLightHelper )
// console.log(spotLightHelper.uuid)

var light = new THREE.AmbientLight( 0x404040, 1 )

// var light = new THREE.AmbientLight( {
// 	color: 0xFF0000,
// 	// color: 0x404040,
// 	intensity: 0.1,
// } )

scene.add( light )

let tick = 0

function render() {
	requestAnimationFrame( render )
	stats.begin()

	for ( let object of objects ) {
		object.render()
	}

	// for ( var i = 0, l = cube.geometry.vertices.length; i < l; i ++ ) {
	// 	// geometry.vertices[ i ].y = 35 * Math.sin( i / 5 + ( tick + i ) / 7 );
	// 	// geometry.vertices[i].multiplyScalar(1.001);
	// }
	// geometry.verticesNeedUpdate = true;

	// camera.lookAt(cube.position);
	// console.log( 0.1*Math.sin( time*0.1 ) )

	controls.update()
	renderer.render( scene, camera )
	tick++
	stats.end()
}
requestAnimationFrame( render )

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight
	camera.updateProjectionMatrix()
	renderer.setSize( window.innerWidth, window.innerHeight )
}
window.addEventListener( 'resize', onWindowResize, false )
