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
controls.zoomSpeed = 4
// var texture = new THREE.TextureLoader().load( '../../assets/textures/wood.jpg' )
// const grassTexture = THREE.ImageUtils.loadTexture( "../../assets/textures/grass.jpg" )

const dirtTexture = new THREE.TextureLoader().load( '../../assets/textures/dirt.jpg' )
dirtTexture.anisotropy = renderer.getMaxAnisotropy()
const dirtMaterial = new THREE.MeshLambertMaterial( { map: dirtTexture, side: THREE.DoubleSide } )

const woodTexture = new THREE.TextureLoader().load( '../../assets/textures/wood.jpg' )
woodTexture.anisotropy = renderer.getMaxAnisotropy()
const woodMaterial = new THREE.MeshLambertMaterial( { map: woodTexture, side: THREE.DoubleSide } )

const grassTexture = new THREE.TextureLoader().load( '../../assets/textures/grass.jpg' )
grassTexture.anisotropy = renderer.getMaxAnisotropy()
grassTexture.wrapS = THREE.RepeatWrapping
grassTexture.wrapT = THREE.RepeatWrapping
grassTexture.repeat.set( 64*2*2, 64*2*2 )
const grassMaterial = new THREE.MeshLambertMaterial( { map: grassTexture, side: THREE.DoubleSide } )

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

var radius = 1
var n = 6
var inradius = radius * Math.cos( ( 180 / n ) * ( ( Math.PI*2 ) / 360 ) )



// 2PI rad = 360 deg
// 2PI/360 rad = 1 deg
// x*(2PI/360) rad = x deg

for ( let i = 0; i < 10; i++ ) {
	for ( let j = 0; j < 10; j++ ) {
		var h = utils.randomInt( 1, 10 )
		var tmp = new THREE.Mesh(
			new THREE.CylinderGeometry( 1, 1, h, 6 ),
			new THREE.MeshLambertMaterial( {
				// color: 0xffff00
				color: utils.randomColor(),
			} ),
		)
		var x = 0
		if ( j % 2 === 0 ) {
			x = inradius
		}
		tmp.position.set( i*inradius*2 + x, h/2, j*radius*1.5 + 0 )
		scene.add( tmp )
		tmp.castShadow = true
		tmp.receiveShadow = true
	}
}


var raycaster = new THREE.Raycaster()
var mouse = new THREE.Vector2()

renderer.domElement.addEventListener( 'click', function ( event ) {
	mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1
	mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1

	raycaster.setFromCamera( mouse, camera )

	var objects = scene.children
	var intersections = raycaster.intersectObjects( objects, true )

	for ( let intersection of intersections ) {

	}
	if ( intersections.length > 0 ) {
		// intersections[ 0 ].object.material.color.set( 0xff0000 )
	}

	for ( var i = 0; i < intersections.length; i++ ) {
		// intersections[ i ].object.material.color.set( 0xff0000 );
	}
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

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

// ground plane
var ground = new THREE.Mesh(
	new THREE.PlaneGeometry( 1000, 1000, 1, 1 ),
	grassMaterial,
)
scene.add( ground )
ground.rotation.x = Math.PI/2

ground.castShadow = true
ground.receiveShadow = true


// line curve point

var axisHelper = new THREE.AxisHelper( 5 )
scene.add( axisHelper )

// colorCenterLine, colorGrid
var gridHelper = new THREE.GridHelper( 100, 0.1 )
scene.add( gridHelper )

// lighting
var spotlight = new THREE.SpotLight( 0xff0000, 0.1 )

spotlight.position.set( 0, 800, 0 )

spotlight.intensity = 10
spotlight.angle = PI/16
spotlight.distance = 1000
spotlight.decay = 2

spotlight.castShadow = true

// scene.add( spotlight )

// spotlight.target = players[0].mesh
// spotlight.target.

// spotlight.shadow.mapSize.width = 1024;
// spotlight.shadow.mapSize.height = 1024;
//
// spotlight.shadow.camera.near = 500;
// spotlight.shadow.camera.far = 4000;
// spotlight.shadow.camera.fov = 30;

// var spotLightHelper = new THREE.SpotLightHelper( spotlight )
// scene.add( spotLightHelper )
//
// var light = new THREE.AmbientLight( 0x404040, 1 )

// var light = new THREE.AmbientLight( {
// 	color: 0xFF0000,
// 	// color: 0x404040,
// 	intensity: 0.1,
// } )

// scene.add( light )

// White directional light at half intensity shining from the top.
var sunLight = new THREE.DirectionalLight( 0xffffff, 0.5 )
scene.add( sunLight )
sunLight.castShadow = true
// sunLight.position



let tick = 0

function render() {
	requestAnimationFrame( render )
	stats.begin()

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
