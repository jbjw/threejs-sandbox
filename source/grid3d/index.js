//
// const ROWS = 20
// const COLS = 30
// const colors = [ 'grey', 'blue', 'green' ]
//
// // const plants = [ "x" ]
// const plants = [ "🌾", "🍓", "🍉" ]
//
// Array.prototype.choose = function () {
// 	return this[Math.floor(Math.random()*this.length)]
// }
//
// var grid = []
// for ( let rowI = 0; rowI < ROWS; rowI++ ) {
// 	var row = []
// 	grid.push( row )
// 	for ( let colI = 0; colI < COLS; colI++ ) {
// 		var cell = []
// 		row.push( cell )
// 	}
// }

"use strict";

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 100000 )
// const camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, -10, 1000 )
scene.add( camera )
camera.position.set( 5, 3, 5 )

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

var loader = new THREE.CubeTextureLoader()
loader.setPath( '../assets/textures/space-cube/' )

var textureCube = loader.load( [
	"r.png", "l.png",
	"t.png", "b.png",
	"c.png", "rr.png",
	// 'px.png', 'nx.png',
	// 'py.png', 'ny.png',
	// 'pz.png', 'nz.png'
] )

var material = new THREE.MeshBasicMaterial( { color: 0xffffff, envMap: textureCube } )
scene.background = textureCube

function Sprite(args) {
	var canvas = document.createElement("canvas")
	const width = 256, height = 256
	canvas.width = width
	canvas.height = height
	// document.body.appendChild(canvas)
	var ctx = canvas.getContext("2d")

	ctx.font = "225px serif";

	// ctx.fillStyle = "rgba(255, 0, 0, 0.5)"
	// ctx.fillRect(0, 0, 256, 256/4)

	// ctx.fillStyle = "blue";

	ctx.fillStyle = "red";
	ctx.textAlign = "center"
	ctx.textBaseline = "middle"
	ctx.fillText(args.text, width/2, height/2)

	// var spriteMap = new THREE.TextureLoader().load( "../assets/textures/crate.jpg" );

	var spriteMap = new THREE.Texture(canvas)
	spriteMap.needsUpdate = true
	var spriteMaterial = new THREE.SpriteMaterial({ map: spriteMap, color: 0xffffff });
	this.sprite = new THREE.Sprite(spriteMaterial)
}

var s = new Sprite( { text: "🔵" } )
scene.add( s.sprite )
s.sprite.position.y = 2

var xmasTree = new Sprite( { text: "🎄" } )
scene.add( xmasTree.sprite )
xmasTree.sprite.scale.multiplyScalar( 50 )
xmasTree.sprite.position.y = 50/2

var range = 100
var trees = [ "🌳", "🌲" ]
for ( let i = 0; i < 10; i++ ) {

	var tree = new Sprite( { text: trees.choose() } )
	scene.add( tree.sprite )
	tree.sprite.position.x = utils.randomInt(-range, range)
	tree.sprite.position.z = utils.randomInt(-range, range)
	tree.sprite.scale.multiplyScalar( 10 )
	tree.sprite.position.y = 10/2
	// tree.sprite.compteBoundingBox()
	console.log(tree.sprite)
	// tree.sprite.mesh.geometry.computeBoundingBox()
	// console.log( tree.sprite.mesh.geometry.boundingBox )
}
// var box = new THREE.Box3().setFromObject( colladaModel );
// console.log( box.min, box.max, box.size() );

let sphere = new THREE.Mesh(
	new THREE.SphereGeometry( 5, 32, 32 ),
	new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true, side: THREE.DoubleSide } ),
)
sphere.position.set( 0, 10, 0 )
scene.add( sphere )

var plane = new THREE.Mesh(
	new THREE.PlaneGeometry( 1000, 1000, 1, 1 ),
	new THREE.MeshBasicMaterial( { color: 0x00ff00, opacity: 0.1, transparent: true, wireframe: false, side: THREE.DoubleSide } ),
)
scene.add( plane )
plane.rotation.x = Math.PI/2

// var axisHelper = new THREE.AxisHelper( 5 )
// scene.add( axisHelper )

var colorCenterLine = new THREE.Color( "#ff00ff" )
var colorGrid = new THREE.Color( "#8888ff" )
var gridHelper = new THREE.GridHelper( 1000, 1000, colorCenterLine, colorGrid )
scene.add( gridHelper )

function render() {
	requestAnimationFrame( render )
	renderer.render( scene, camera )
	controls.update()
	sphere.position.y += 0.01
	// camera.rotation.x = camera.rotation.x + 0.0001
	// console.log('what')
}
requestAnimationFrame( render )

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}
window.addEventListener( 'resize', onWindowResize, false );
