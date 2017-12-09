//

"use strict"

const PI = Math.PI

const SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight
const FOV = 75
const ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT
const NEAR = 0.1, FAR = 100000

const scene = new THREE.Scene()
const renderer = new THREE.WebGLRenderer( { antialias: true } )
renderer.setPixelRatio( window.devicePixelRatio )
renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT )
document.body.appendChild( renderer.domElement )

const stats = new Stats()
stats.showPanel( 0 )
document.body.appendChild( stats.dom )

var loader = new THREE.CubeTextureLoader()
loader.setPath( '../../assets/cube_textures/space-cube/' )

var textureCube = loader.load( [
	"l.png", "r.png", // 'px.png', 'nx.png',
	"t.png", "b.png", // 'py.png', 'ny.png',
	"rr.png", "c.png", // 'pz.png', 'nz.png',
] )

var material = new THREE.MeshBasicMaterial( { color: 0xffffff, envMap: textureCube } );
scene.background = textureCube

document.addEventListener( "keydown", function (e) {
	if ( !e.repeat ) {
		console.log( e.key )
	}
} )

const gamepadManager = new Game.GamepadManager( onGamepadConnect, onGamepadDisconnect )

function onGamepadConnect( gamepad ) {
	updateGamepads()
}

function onGamepadDisconnect( gamepad ) {
	updateGamepads()
}

function updateGamepads() {
	for ( let player of players ) {
		player.gamepad = gamepadManager.gamepads[player.gamepadIndex]
	}
}

var objects = []

setInterval( function () {
	for ( let object of objects ) {
		object.update()
		object.updateControls()
	}
}, 10 )

let players = [
	new Game.Player( {
		startPos: new THREE.Vector3( 25, 500, 25 ),
		startAngle: new THREE.Euler( -0.5*PI, 0, -0.5*PI ),
		color: utils.randomColor(),
		controls: {
			"a": "left",
			"d": "right",
		},
		gamepadIndex: 0,
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
		left: 0, top: 0, width: 1.0, height: 1.0,
		update: updateCamera,
		player: players[0],
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

var ambientLight = new THREE.AmbientLight( 0x404040 )
scene.add( ambientLight )

var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 )
scene.add( directionalLight )
directionalLight.position.set( 100, 100, 100 )

var grassTexture = new THREE.TextureLoader().load( '../../assets/textures/grass.jpg' );
grassTexture.repeat.set( 100, 100 )
grassTexture.wrapS = THREE.RepeatWrapping
grassTexture.wrapT = THREE.RepeatWrapping

var ground = new THREE.Mesh(
	new THREE.PlaneGeometry( 100000, 100000, 100, 100 ),
	new THREE.MeshLambertMaterial( {
		// color: 0x00ff00,
		// opacity: 0.1,
		// transparent: false,
		// wireframe: true,
		map: grassTexture,
		side: THREE.DoubleSide,
	} ),
)
scene.add( ground )
ground.rotation.x = Math.PI/2


for ( let vertex of ground.geometry.vertices ) {
	vertex.z = utils.randomInt( -500, 500 )
}
ground.geometry.verticesNeedUpdate = true
ground.geometry.normalsNeedUpdate = true
ground.geometry.computeFaceNormals()
// var axisHelper = new THREE.AxisHelper( 5 )
// scene.add( axisHelper )

var colorCenterLine = new THREE.Color( "rgba(255, 0, 255, 0.1)" )
var colorGrid = new THREE.Color( "rgba(0, 255, 255, 0.1)" )

var gridHelper = new THREE.GridHelper( 100000, 1000, colorCenterLine, colorGrid )
scene.add( gridHelper )

function render() {
	stats.begin()
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

	stats.end()
	// controls.update()

	requestAnimationFrame( render )
}
requestAnimationFrame( render )

function onWindowResize() { renderer.setSize( window.innerWidth, window.innerHeight ) }
window.addEventListener( 'resize', onWindowResize, false );
