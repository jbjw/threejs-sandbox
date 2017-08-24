//

'use strict';

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 100000 )
scene.add( camera )
camera.position.set( 5, 3, 5 )

// const camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, -10, 1000 );

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

// var plane = new THREE.Mesh(
// 	new THREE.PlaneGeometry( 10, 10, 10, 10 ),
// 	new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true, side: THREE.DoubleSide } ),
// )
// scene.add( plane )
// plane.rotation.x = Math.PI/2

var axisHelper = new THREE.AxisHelper( 5 )
scene.add( axisHelper )

// colorCenterLine, colorGrid
var gridHelper = new THREE.GridHelper( 100, 0.1 )
scene.add( gridHelper )

var stageArgs = {
	scene: scene,
}

var stage = new GAME.Stage( stageArgs )

var gridArgs = {
	rows: 20,
	cols: 30,
	scale: 0.5,
}

var grid = new GAME.Grid( gridArgs )

stage.add( grid )

var startCell = grid.getRandomCell()
console.log( startCell )
var playerArgs = {
	rows: 20,
	cols: 30,
	scale: 0.5,
	startCell: startCell,
}

var player = new GAME.Player( playerArgs )



stage.add( player )

let tickCount = 0
function tick() {
	stage.update()
	tickCount++
}
setInterval( tick, 10 )

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
