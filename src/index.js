//

"use strict"

var socket = io( "http://jbjw.com:3000" );
socket.on( "connect", function () {
	console.log( "connected" )
} )
socket.on( "event", function ( data ) {
	console.log( `event ${data}` )
} )
socket.on( "disconnect", function () {
	console.log( "disconnected" )
} )
socket.on( "update", function ( data ) {
	// console.log( "update", data )
	for ( let entity of data ) {
		var result = entities.find( e => e.id === entity.id )
		if ( result === undefined ) {
			var tmp = new Body()
			tmp.id = entity.id
			entities.push( tmp )
		} else {
			result.position.copy( entity.position )
			result.velocity.copy( entity.velocity )
		}
	}
} )
socket.emit( "join", "bob" )

const PI = Math.PI

const UP = new THREE.Vector3( 0, 1, 0 )
const FORWARD = new THREE.Vector3( 1, 0, 0 )
const RIGHT = new THREE.Vector3( 0, 0, 1 )

const SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight
const FOV = 75
const ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT
const NEAR = 0.1, FAR = 100000

const scene = new THREE.Scene()
const renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } )
renderer.setPixelRatio( window.devicePixelRatio )
renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT )
document.body.appendChild( renderer.domElement )
// renderer = new THREE.WebGLRenderer( { antialias: false, alpha : true } );
renderer.setClearColor( 0x000000, 0 )

const stats = new Stats()
stats.showPanel( 0 )
// document.body.appendChild( stats.dom )

var loader = new THREE.CubeTextureLoader()
loader.setPath( './assets/cube_textures/space-cube/' )

var textureCube = loader.load( [
	"l.png", "r.png", // 'px.png', 'nx.png',
	"t.png", "b.png", // 'py.png', 'ny.png',
	"rr.png", "c.png", // 'pz.png', 'nz.png',
] )

var material = new THREE.MeshBasicMaterial( { color: 0xffffff, envMap: textureCube } )
// scene.background = textureCube

var bindings = [
	{
		key: "w",
		action: "up",
	},
	{
		key: "s",
		action: "down",
	},
	{
		key: "a",
		action: "left",
	},
	{
		key: "d",
		action: "right",
	},
]

document.addEventListener( "keydown", function ( event ) {
	keyToggle( event, true )
} )

document.addEventListener( "keyup", function ( event ) {
	keyToggle( event, false )
} )

function keyToggle( event, down ) {
	if ( !event.repeat ) {
		const binding = bindings.find( e => e.key === event.key )
		if ( binding !== undefined ) {
			socket.emit( "action", binding.action, down )
		}
	}
}

var keyboardState = {}

document.addEventListener( "keydown", function ( e ) {
	keyboardState[e.key] = true
} )

document.addEventListener( "keyup", function ( e ) {
	keyboardState[e.key] = false
} )

var camera = new THREE.PerspectiveCamera( FOV, SCREEN_WIDTH / SCREEN_HEIGHT, NEAR, FAR )
camera.position.x = 0
camera.position.y = -10
camera.position.z = 30
camera.up.set( 0, 0, 1 )

const controls = new THREE.OrbitControls( camera )

const entities = []


function Player( args ) {
	this.username = args.username
	this.ip = args.ip
	this.body = new Body()
	entities.push( this.body )
	this.speed = 0.1
}

Player.prototype.applyAction = function ( action, start ) {
	var velAdd = new THREE.Vector3( 0, 0, 0 )
	switch ( action ) {
		case "up":
			velAdd.y = this.speed
			break
		case "down":
			velAdd.y = -this.speed
			break
		case "left":
			velAdd.x = -this.speed
			break
		case "right":
			velAdd.x = this.speed
			break
	}
	console.log( this.body )
	if ( start ) {
		this.body.velocity.copy( velAdd )
	} else if ( !start ) {
		this.body.velocity.copy( new THREE.Vector3( 0, 0, 0 ) )
	}
}

let idCounter = 0
function Body() {
	this.id = idCounter++
	this.position = new THREE.Vector3( 0, 0, 0 )
	this.velocity = new THREE.Vector3( 0, 0, 0 )
}

Body.prototype.updatePhysics = function () {
	this.position.add( this.velocity )
	// console.log( this.position )
}

setInterval( updatePhysics, 10 )
function updatePhysics() {
	for ( let entity of entities ) {
		entity.updatePhysics()
	}
}

function Body() {
	this.mesh = new THREE.Mesh(
		// new THREE.SphereGeometry( 0.5, 32, 32 ),
		new THREE.BoxGeometry( 1, 1, 1 ),
		new THREE.MeshLambertMaterial( {
			color: new THREE.Color(Math.random() * 0xffffff),
			// wireframe: true,
		} ),
	)
	this.position = this.mesh.position
	this.velocity = new THREE.Vector3( 0, 0, 0 )
	scene.add( this.mesh )
}

Body.prototype.updatePhysics = function () {

}

var ambientLight = new THREE.AmbientLight( 0x404040 )
scene.add( ambientLight )

var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 )
scene.add( directionalLight )
directionalLight.position.set( 100, 100, 100 )

var grassTexture = new THREE.TextureLoader().load( './assets/textures/grass.jpg' );
grassTexture.repeat.set( 100, 100 )
grassTexture.wrapS = THREE.RepeatWrapping
grassTexture.wrapT = THREE.RepeatWrapping

var ground = new THREE.Mesh(
	new THREE.PlaneGeometry( 100, 100, 10, 10 ),
	new THREE.MeshLambertMaterial( {
		map: grassTexture,
		side: THREE.DoubleSide,
	} ),
)
scene.add( ground )
ground.position.z = -0.1

// physics loop
setInterval( updatePhysics, 10 )
function updatePhysics() {
	for ( let entity of entities ) {
		entity.updatePhysics()
	}
}

function render() {
	stats.begin()

	renderer.render( scene, camera )
	stats.end()
	// controls.update()
	requestAnimationFrame( render )
}
requestAnimationFrame( render )

function onWindowResize() {
	renderer.setSize( window.innerWidth, window.innerHeight )
}
window.addEventListener( 'resize', onWindowResize, false )
