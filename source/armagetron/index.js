//

"use strict";

// 2*PI
// 1*PI
// 0.5*PI
const PI = Math.PI
function toRad (deg) {
	return deg * ( 2 * PI / 360 )
}

const SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight
const FOV = 75
const ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT
const NEAR = 0.1, FAR = 100000


const scene = new THREE.Scene()
const renderer = new THREE.WebGLRenderer( { antialias: true } )
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT )
document.body.appendChild( renderer.domElement )



const statsFPS = new Stats()
statsFPS.showPanel( 0 )
document.body.appendChild( statsFPS.dom )

const statsMS = new Stats()
statsMS.showPanel( 0 )
document.body.appendChild( statsMS.dom )

const statsMB = new Stats()
statsMB.showPanel( 0 )
document.body.appendChild( statsMB.dom )


var loader = new THREE.CubeTextureLoader();
loader.setPath( 'textures/space-cube/' );

var textureCube = loader.load( [
	"l.png", "r.png",
	"t.png", "b.png",
	"rr.png", "c.png",
	// 'px.png', 'nx.png',
	// 'py.png', 'ny.png',
	// 'pz.png', 'nz.png'
] );

var material = new THREE.MeshBasicMaterial( { color: 0xffffff, envMap: textureCube } );
scene.background = textureCube

document.addEventListener( "keydown", function (e) {
	if ( !e.repeat ) {
		console.log( e.key )
	}
} )

var gamepads = []

window.addEventListener( "gamepadconnected", function( e ) {
	gamepads[e.gamepad.index] = new Game.Gamepad(e.gamepad)
	linkGamepads()
	console.log(`connected ${e.gamepad}`)
	// console.log(`connected ${e.gamepad.index} ${e.gamepad.id} ${e.gamepad.buttons.length} ${e.gamepad.axes.length}`)
	console.log(gamepads)
} )

window.addEventListener( "gamepaddisconnected", function( e ) {
	linkGamepads()
	delete gamepads[e.gamepad.index]
	console.log(`disconnected ${e.gamepad}`)
	// console.log(`disconnected ${e.gamepad.index} ${e.gamepad.id} ${e.gamepad.buttons.length} ${e.gamepad.axes.length}`)
	console.log(gamepads)
} )

function linkGamepads () {
	for ( let i = 0; i < players.length; i++ ) {

		const player = players[i]
		// console.log(player.gamepadControls)
		// console.log(gamepads[player.gamepadIndex])
		player.gamepad = gamepads[player.gamepadIndex]
		console.log(`looking for player ${i}'s controller`)
	}
	// for ( let player of player ) {
	// 	player.gamepad = gamepads
	// }
}

var objects = []

// console.log(utils.randomColor())

// setInterval( function () {
// 	// console.log(gamepads)
// 	// console.log(navigator.getGamepads())
// }, 1000)

// setTimeout( function () {
// 	for ( let view of views ) {
// 		// console.log(view)
// 		view.update()
// 	}
// }, 1000 )

// physics loop
// setInterval( function () {
// 	for ( let object of objects ) {
// 		object.update()
// 	}
// }, 10 )

// control loop
setInterval( function () {
	for ( let gamepad of gamepads ) {
		// console.log(gamepad)
		gamepad.update()
	}
	for ( let object of objects ) {
		object.update()
		object.updateControls()
	}
}, 10 )

let players = [
	new Game.Player( {
		startPos: new THREE.Vector3( 25, 10, 25 ),
		startAngle: new THREE.Euler( -0.5*PI, 0, -0.5*PI ),
		color: utils.randomColor(),
		controls: {
			"*": "left",
			"-": "right",
		},
		gamepadIndex: 0,
		gamepadControls: {
			4: "left",
			5: "right",
		},
	} ),
	new Game.Player( {
		startPos: new THREE.Vector3( -25, 10, 25 ),
		startAngle: new THREE.Euler( 0.5*PI, 0, -0.5*PI ),
		color: utils.randomColor(),
		controls: {
			"[": "left",
			"]": "right",
		},
		gamepadIndex: 1,
		gamepadControls: {
			4: "left",
			5: "right",
		},
	} ),
	new Game.Player( {
		startPos: new THREE.Vector3( 25, 10, -25 ),
		startAngle: new THREE.Euler( -0.5*PI, 0, 0.5*PI ),
		color: utils.randomColor(),
		controls: {
			"ArrowLeft": "left",
			"ArrowRight": "right",
		},
		gamepadIndex: 2,
		gamepadControls: {
			4: "left",
			5: "right",
		},
	} ),
	new Game.Player( {
		startPos: new THREE.Vector3( -25, 10, -25 ),
		startAngle: new THREE.Euler( 0.5*PI, 0, 0.5*PI ),
		color: utils.randomColor(),
		controls: {
			"a": "left",
			"d": "right",
		},
		gamepadIndex: 3,
		gamepadControls: {
			4: "left",
			5: "right",
		},
	} ),
]

const UP = new THREE.Vector3( 0, 1, 0 )
const FORWARD = new THREE.Vector3( 1, 0, 0 )
const RIGHT = new THREE.Vector3( 0, 0, 1 )

function updateCamera() {
	// console.log(this.player)
	// console.log(this.camera)
	if ( typeof this.player.gamepad == "undefined" ) {
		var leftX = 0
		var leftY = 0
	} else {
		var leftX = this.player.gamepad.gamepad.axes[0] // left hor
		var leftY = this.player.gamepad.gamepad.axes[1] // left ver
	}

	if ( Math.abs( leftX ) > 0.2 ) {

	} else {
		leftX = 0
	}

	if ( Math.abs( leftY ) > 0.5 ) {

	} else {
		leftY = 0
	}

	var relativeCameraOffset = new THREE.Vector3( 0, 20, -50 )
	relativeCameraOffset.applyAxisAngle( UP, -leftX * 0.8 * PI )
	relativeCameraOffset.applyAxisAngle( FORWARD, leftY * 0.4 * PI )

	// relativeCameraOffset.applyAxisAngle()

	var cameraOffset = relativeCameraOffset.applyMatrix4( this.player.mesh.matrixWorld )
	this.camera.position.copy( cameraOffset )
	this.camera.lookAt( this.player.mesh.position )
	// camera.position.set( 5, utils.randomInt(0, 5), 5 )
}

const views = [
	{
		left: 0, top: 0, width: 0.5, height: 0.5,
		// left: 0, top: 0, width: 0.5, height: 1,
		update: updateCamera,
		player: players[0],
	},
	{
		left: 0.5, top: 0, width: 0.5, height: 0.5,
		update: updateCamera,
		player: players[1],
	},
	{
		// left: 0, top: 0.5, width: 0.5, height: 0.5,
		left: 0, top: 0.5, width: 0.5, height: 0.5,
		update: updateCamera,
		player: players[2],
	},
	{
		left: 0.5, top: 0.5, width: 0.5, height: 0.5,
		update: updateCamera,
		player: players[3],
	},
]

for ( let view of views ) {
	var camera = new THREE.PerspectiveCamera( FOV, SCREEN_WIDTH / SCREEN_HEIGHT, NEAR, FAR )
	// camera.position.fromArray( view.eye )
	// camera.up.fromArray( view.up )
	view.camera = camera
}

// const controls = new THREE.OrbitControls( views[0].camera )

// // controls.enablePan = false;
// controls.keyPanSpeed = 70
// // controls.enableZoom = false;
// controls.zoomSpeed = 1
// controls.autoRotate = true;
// controls.autoRotateSpeed = 0.5;
// controls.enableDamping = true;
// controls.dampingFactor = 0.25;
// controls.enableRotate = false;

var range = 6000
var rangeX = [-range, range]
var rangeY = [-range, range]

for ( let i = 0; i < 100; i++ ) {
	var geometry = new THREE.TorusKnotBufferGeometry( 10, 3, 10, 3 );
	var material = new THREE.MeshBasicMaterial( { color: utils.randomColor(), wireframe: true } );
	var mesh = new THREE.Mesh( geometry, material );
	scene.add( mesh )

	mesh.position.set(
		utils.randomInt(rangeX[0], rangeX[1]),
		7,
		utils.randomInt(rangeY[0], rangeY[1])
	)
}

// var geometry = new THREE.ConeGeometry( 5, 20, 32 );
// var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
// var cone = new THREE.Mesh( geometry, material );
// scene.add( cone );
//
// var geometry = new THREE.CylinderGeometry( 5, 5, 20, 32 );
// var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
// var cylinder = new THREE.Mesh( geometry, material );
// scene.add( cylinder );

var plane = new THREE.Mesh(
	new THREE.PlaneGeometry( 100000, 100000, 1, 1 ),
	new THREE.MeshBasicMaterial( {
		color: 0x00ff00,
		opacity: 0.1,
		transparent: true,
		wireframe: false,
		side: THREE.DoubleSide
	} ),
)
scene.add( plane )
plane.rotation.x = Math.PI/2

// var axisHelper = new THREE.AxisHelper( 5 )
// scene.add( axisHelper )

var colorCenterLine = new THREE.Color( "rgba(255, 0, 255, 0.1)" )
var colorGrid = new THREE.Color( "rgba(0, 255, 255, 0.1)" )

var gridHelper = new THREE.GridHelper( 100000, 1000, colorCenterLine, colorGrid )
scene.add( gridHelper )

function render() {
	statsFPS.begin()
	statsMS.begin()
	statsMB.begin()
	const SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight
	for ( let view of views ) {
		view.update()

		var left = Math.floor( SCREEN_WIDTH * view.left );
		var top = Math.floor( SCREEN_HEIGHT * view.top );
		var width = Math.floor( SCREEN_WIDTH * view.width );
		var height = Math.floor( SCREEN_HEIGHT * view.height );

		renderer.setViewport( left, top, width, height );
		renderer.setScissor( left, top, width, height );
		renderer.setScissorTest( true );
		// renderer.setClearColor( view.background );
		// renderer.setClearColor( new THREE.Color( "#000" ) )

		view.camera.aspect = width / height
		view.camera.updateProjectionMatrix()

		renderer.render( scene, view.camera )
	}

	statsFPS.end()
	statsMS.end()
	statsMB.end()
	// controls.update()

	requestAnimationFrame( render )
}
requestAnimationFrame( render )

function onWindowResize() { renderer.setSize( window.innerWidth, window.innerHeight ) }
window.addEventListener( 'resize', onWindowResize, false );
