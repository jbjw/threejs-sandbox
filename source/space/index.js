//

"use strict"

const PI = Math.PI

function toRad (deg) { return deg * ( 2 * PI / 360 ) }

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

const loader = new THREE.CubeTextureLoader()
loader.setPath( '../../assets/textures/space-cube/' )
const textureCube = loader.load( [
	"r.png", "l.png", // 'px.png', 'nx.png',
	"t.png", "b.png", // 'py.png', 'ny.png',
	"c.png", "rr.png", // 'pz.png', 'nz.png',
] )
// const material = new THREE.MeshBasicMaterial( { color: 0xffffff, envMap: textureCube } )
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

const objects = []

let players = [
	new Game.Player( {
		startPos: new THREE.Vector3( 5, 10, 5 ),
		startAngle: new THREE.Euler( -0.0*PI, 0, -0.0*PI ),
		// startAngle: new THREE.Euler( -0.5*PI, 0, -0.5*PI ),
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
]

const UP = new THREE.Vector3( 0, 1, 0 )
const FORWARD = new THREE.Vector3( 1, 0, 0 )
const RIGHT = new THREE.Vector3( 0, 0, 1 )

const camera = new THREE.PerspectiveCamera( FOV, SCREEN_WIDTH / SCREEN_HEIGHT, NEAR, FAR )
// camera.position.set( 0, 1.0001, 0 )

const geometry = new THREE.BoxGeometry( 1, 1, 1, 1 )
const material = new THREE.MeshBasicMaterial( { color: utils.randomColor(), wireframe: true } )
const mesh = new THREE.Mesh( geometry, material )
scene.add( mesh )

const controls = new Game.FPSControls( camera, players[0].mesh, players[0] )

const views = [
	new Game.View( 0, 0, 1, 1, camera, players[0] ),
]

// const controls = new THREE.PointerLockControls( camera )

// const controls = new THREE.FirstPersonControls( camera, document )

// https://threejs.org/docs/#examples/controls/OrbitControls
// const controls = new THREE.OrbitControls( camera )
camera.position.set( 0, 1, 0 )
// // controls.enablePan = false;
// controls.keyPanSpeed = 70
// // controls.enableZoom = false;
// controls.zoomSpeed = 1
// controls.autoRotate = true;
// controls.autoRotateSpeed = 0.5;
// controls.enableDamping = true;
// controls.dampingFactor = 0.25;
// controls.enableRotate = false;

const range = 6000
const rangeX = [-range, range]
const rangeY = [-range, range]

for ( let i = 0; i < 100; i++ ) {
	const geometry = new THREE.TorusKnotBufferGeometry( 10, 3, 10, 3 );
	const material = new THREE.MeshBasicMaterial( { color: utils.randomColor(), wireframe: true } );
	const mesh = new THREE.Mesh( geometry, material );
	scene.add( mesh )

	mesh.position.set(
		utils.randomInt(rangeX[0], rangeX[1]),
		7,
		utils.randomInt(rangeY[0], rangeY[1])
	)
}

var texture = new THREE.TextureLoader().load( "../../assets/textures/rock.jpg" )
// var material = new THREE.MeshLambertMaterial( { map: texture } )
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set( 400, 400 );

// white spotlight shining from the side, casting a shadow

var spotlight = new THREE.SpotLight( 0xff0000, 1 )

spotlight.position.set( 0, 40, 0 )

spotlight.intensity = 10
spotlight.angle = PI/16
spotlight.distance = 2000
spotlight.decay = 2

scene.add( spotlight )

spotlight.target = players[0].mesh
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

const plane = new THREE.Mesh(
	new THREE.PlaneGeometry( 100000, 100000, 1, 1 ),
	new THREE.MeshLambertMaterial( {
		// color: 0x00ff00,
		// opacity: 0.1,
		// transparent: true,
		// wireframe: false,
		side: THREE.DoubleSide,
		map: texture,
	} ),
)
scene.add( plane )
plane.rotation.x = Math.PI/2

// const axisHelper = new THREE.AxisHelper( 5 )
// scene.add( axisHelper )

const colorCenterLine = new THREE.Color( "rgba(255, 0, 255, 1.0)" )
const colorGrid = new THREE.Color( "rgba(0, 255, 255, 1.0)" )

const gridHelper = new THREE.GridHelper( 100000, 100, colorCenterLine, colorGrid )
scene.add( gridHelper )

function render() {
	stats.begin()
	const SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight
	controls.update()
	for ( let view of views ) {
		// view.update()

		const left = Math.floor( SCREEN_WIDTH * view.left )
		const top = Math.floor( SCREEN_HEIGHT * view.top )
		const width = Math.floor( SCREEN_WIDTH * view.width )
		const height = Math.floor( SCREEN_HEIGHT * view.height )

		renderer.setViewport( left, top, width, height )
		renderer.setScissor( left, top, width, height )
		renderer.setScissorTest( true )
		// renderer.setClearColor( view.background );
		// renderer.setClearColor( new THREE.Color( "#000" ) )

		view.camera.aspect = width / height
		view.camera.updateProjectionMatrix()

		renderer.render( scene, view.camera )
	}

	for ( let object of objects ) {
		object.update()
	}
	for ( let gamepad of gamepadManager.gamepads ) {
		if ( gamepad !== null ) {
		}
	}

	stats.end()

	requestAnimationFrame( render )
}
requestAnimationFrame( render )

function onWindowResize() { renderer.setSize( window.innerWidth, window.innerHeight ) }
window.addEventListener( 'resize', onWindowResize, false )
