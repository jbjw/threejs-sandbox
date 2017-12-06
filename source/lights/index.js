// Three.js Template

'use strict'

var stats = new Stats()
stats.showPanel( 1 ) // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild( stats.dom )

const PI = Math.PI
const Y = new THREE.Vector3( 0, 1, 0 )
const X = new THREE.Vector3( 1, 0, 0 )
const Z = new THREE.Vector3( 0, 0, 1 )

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
renderer.shadowMap.enabled = true;
// renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
renderer.shadowMapSoft = true;

renderer.shadowCameraNear = 3;

renderer.shadowCameraFov = 50;

renderer.shadowMapBias = 0.0039;
renderer.shadowMapDarkness = 0.5;
renderer.shadowMapWidth = 1024;
renderer.shadowMapHeight = 1024;

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera( fov, aspect, near, far )
renderer.shadowCameraFar = camera.far;
// const camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, -10, 1000 );
scene.add( camera )
// camera.fov = 120
// camera.aspect = window.innerWidth / window.innerHeight
// camera.near = 0.1
// camera.far = 100000
// camera.updateProjectionMatrix()
camera.position.set( 1, 1, 1 )
// .focus,.fov, .zoom

const controls = new THREE.OrbitControls(camera);
controls.zoomSpeed = 4

// skybox
// var skybox = new THREE.Mesh(
// 	new THREE.SphereGeometry( 1000, 32, 32 ),
// 	new THREE.MeshBasicMaterial( {
// 		map: new THREE.TextureLoader().load('../../assets/360images/painted.jpg'),
// 		side: THREE.FrontSide, // was backside
// 	} )
// )
// skybox.scale.x = -1 // inverting, just render differently?
// scene.add( skybox )

const dirtTexture = new THREE.TextureLoader().load( '../../assets/textures/dirt.jpg' )
dirtTexture.anisotropy = renderer.getMaxAnisotropy()

const woodTexture = new THREE.TextureLoader().load( '../../assets/textures/wood.jpg' )
woodTexture.anisotropy = renderer.getMaxAnisotropy()

const grassTexture = new THREE.TextureLoader().load( '../../assets/textures/grass.jpg' )
grassTexture.anisotropy = renderer.getMaxAnisotropy()
grassTexture.wrapS = THREE.RepeatWrapping
grassTexture.wrapT = THREE.RepeatWrapping
grassTexture.repeat.set( 20, 20 )

var mesh = new THREE.Mesh(
	new THREE.SphereGeometry( 1, 32, 32 ),
	new THREE.MeshLambertMaterial( { map: woodTexture, side: THREE.DoubleSide } ),
)
scene.add( mesh )
mesh.position.set( 0, 5, 0 )
mesh.castShadow = true
mesh.receiveShadow = false

// ground plane
var ground = new THREE.Mesh(
	new THREE.PlaneGeometry( 100, 100, 1, 1 ),
	new THREE.MeshLambertMaterial( {
		map: grassTexture,
		side: THREE.DoubleSide,
	} )
)
scene.add( ground )
ground.rotation.x = Math.PI/2

ground.receiveShadow = true

// line curve point

var axisHelper = new THREE.AxisHelper( 5 )
scene.add( axisHelper )

// colorCenterLine, colorGrid
var gridHelper = new THREE.GridHelper( 100, 0.1 )
scene.add( gridHelper )

// lighting
var spotlight = new THREE.SpotLight( 0xff0000, 0.1 )

spotlight.position.set( 200, 200, 0 )

spotlight.intensity = 10
spotlight.angle = PI/16
spotlight.distance = 1000
spotlight.decay = 2

// scene.add( spotlight )

// spotlight.target = players[0].mesh

spotlight.castShadow = true;
//
// spotlight.shadow.mapSize.width = 1024;
// spotlight.shadow.mapSize.height = 1024;
//
// spotlight.shadow.camera.near = 500;
// spotlight.shadow.camera.far = 4000;
// spotlight.shadow.camera.fov = 30;

// var spotLightHelper = new THREE.SpotLightHelper( spotlight )
// scene.add( spotLightHelper )

var sunLight = new THREE.DirectionalLight( 0xffffff, 1.0 )
scene.add( sunLight )
// sunLight.position.set( 10, 7, 10 )
sunLight.castShadow = true

// scene.add( sunLight.target )

// sunLight.target = box

var helper = new THREE.DirectionalLightHelper( sunLight, 5 )
scene.add( helper )

var light = new THREE.AmbientLight( 0x404040, 1 )
scene.add( light )

let tick = 0

var v = new THREE.Vector3( 0, 100, 0 )
v.applyEuler( new THREE.Euler( 0.0, 0, 0 ) )
var r = 0.11
var t = 0.01
function render() {
	requestAnimationFrame( render )
	stats.begin()
	// r += 0.0001
	// phi += 0.1
	// theta += 0.01
	// r += 0.01v.applyAxisAngle( Y, 0.0 )
	// sunLight.position.setFromSpherical( new THREE.Spherical( 100, phi, theta ) )
	// console.log( mesh.localToWorld( X ) )

	// console.log( sunLight.localToWorld( X.clone() ) )
	console.log( sunLight.localToWorld( X ) )
	// console.log( X)

	v.applyAxisAngle( X, 0.1 )
	// v.applyAxisAngle( Y, 0.0 )
	v.applyAxisAngle( Z, r )
	v.applyEuler( new THREE.Euler( 0, 0, 0.1 ) )
	sunLight.position.copy( v )

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
