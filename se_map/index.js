//

"use strict";

var keyboardState = {}

document.addEventListener("keypress", function (e) {
	console.log(e.key)
})

document.addEventListener("keydown", function (e) {
	keyboardState[e.key] = true
})

document.addEventListener("keyup", function (e) {
	keyboardState[e.key] = false
	// console.log(keyboardState)
})

// var myImageData = ctx.createImageData(textureCanvas.width, textureCanvas.height) // blank

// var myImageData = ctx.getImageData(left, top, width, height) // copy

// ctx.putImageData(myImageData, 0, 0) // set



var skyboxCanvas = document.createElement("canvas")
// document.body.appendChild(skyboxCanvas)
var ctx = skyboxCanvas.getContext("2d")

var skyboxWidth = 8192
var skyboxHeight = 8192
// 1024 2048 4096 8192

skyboxCanvas.width = skyboxWidth
skyboxCanvas.height = skyboxHeight

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 100000 )
// const camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, -10, 1000 )
scene.add(camera)
camera.position.set( 5, 3, 5 )

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new THREE.OrbitControls(camera)
// // controls.enablePan = false;
// controls.keyPanSpeed = 70
// // controls.enableZoom = false;
// controls.zoomSpeed = 1
// controls.autoRotate = true;
// controls.autoRotateSpeed = 0.5;
// controls.enableDamping = true;
// controls.dampingFactor = 0.25;
// controls.enableRotate = false;

// var texture = new THREE.TextureLoader().load("../assets/360images/sky.jpg")
// texture.wrapS = THREE.RepeatWrapping;
// texture.wrapT = THREE.RepeatWrapping;
// texture.repeat.set( 4, 4 );

// void ctx.ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise);

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function randint(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

// choose and weighted choose

Array.prototype.choose = function () {
	return this[Math.floor(Math.random() * this.length)]
}

var colors = ["#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#CCFFFF", "#CCCCFF", "#FFCCCC"]
// var colors = ["#AAAAAA"]
var weights = [0.9, 0.4, 0.4, 0.4]

console.log(colors.choose())
for (let i = 0; i < 1000; i++) {
	ctx.beginPath()
	ctx.ellipse(randint(0, skyboxWidth), randint(0, skyboxHeight), randint(1, 5), randint(1, 5), 45 * Math.PI*2/360, 0, 2 * Math.PI)
	ctx.fillStyle = colors.choose()
	ctx.fill()
}

// ctx.fillRect(5, 5, 400, 400)

var skyboxTexture = new THREE.CanvasTexture(skyboxCanvas)

var texture = new THREE.Texture(skyboxCanvas)
texture.needsUpdate = true

var skybox = new THREE.Mesh(
	new THREE.SphereGeometry(100, 32, 32),
	// color: 0x00ff00,
	new THREE.MeshBasicMaterial({map: texture, side: THREE.DoubleSide}),
	// new THREE.MeshBasicMaterial({map: skyboxTexture,  wireframe: false, side: THREE.DoubleSide}),
)
scene.add(skybox)

let objects = []



function parseCoords(coords) {
	var result = coords.split(":")
	var name = result[1]
	return new THREE.Vector3(result[2], result[3], result[4])
}

var originCoords = "GPS:Station GTH Jump:-2915598:-1165400.62:5543982:"
var originVec = parseCoords(originCoords)

function convertCoords(vec) {
	var newVec = new THREE.Vector3()
	newVec.copy(vec)
	newVec.sub(originVec)
	var scale = 0.00001
	newVec.multiplyScalar(scale)
	return newVec
}

function Body(args) {
	this.mesh = new THREE.Mesh(
		new THREE.SphereGeometry( args.radius, 32, 32 ),
		// new THREE.BoxGeometry( 4, 4, 1, 1 ),
		new THREE.MeshBasicMaterial({color: args.color, wireframe: false, side: THREE.DoubleSide}),
		// new THREE.MeshBasicMaterial( { color: 0x00aa00, wireframe: false, side: THREE.DoubleSide } ),
	)
	console.log(convertCoords(parseCoords(args.coords)))
	this.mesh.position.copy(convertCoords(parseCoords(args.coords)))

	scene.add(this.mesh)

	this.update = function () {

	}
}

function Station(args) {
	this.mesh = new THREE.Mesh(
		// new THREE.SphereGeometry( args.radius, 32, 32 ),
		new THREE.BoxGeometry( 1, 1, 1, 1 ),
		new THREE.MeshBasicMaterial( { color: 0xaaaaaa, wireframe: false, side: THREE.DoubleSide } ),
	)

	scene.add(this.mesh)

	this.update = function () {

	}
}

function Ship(args) {
	objects.push(this)

	this.velocity = new THREE.Vector3(0, 0, 0)

	this.mesh = new THREE.Mesh(
		// new THREE.SphereGeometry( args.radius, 32, 32 ),
		new THREE.BoxGeometry( 1, 2, 1, 1 ),
		new THREE.MeshBasicMaterial( { color: 0xaaaaaa, wireframe: false, side: THREE.DoubleSide } ),
	)

	scene.add(this.mesh)

	this.update = function () {
		this.mesh.position.add(this.velocity)
	}
}

// var earth = new Body({
// 	color: new THREE.Color("rgb(0, 150, 0)")
// 	radius: 2,
// 	coords: "GPS:Fe Pt Ice:-2917763.75:-1152106:5565901.5:",
// })

var betterBodies = [
	{
		name: "Binoi",
		category: "planet",
		coords: "GPS:Planet Binoi:126564.39:35734.37:136920.58:",
		color: new THREE.Color("rgb(100, 100, 100)"),
		size: 10000,
	}
]

var planetCoords = [
	"GPS:Planet Binoi:126564.39:35734.37:136920.58:",
	"GPS:Planet Erunt:-1968765.88:-225323.61:5415210:",
	"GPS:Planet Fenyur:90037.2:17461.35:169259.89:",
	"GPS:Planet Lenat:-4058216:-1470660.88:7261757:",
	"GPS:Planet Mex:1089272.12:309622.72:-1527844.25:",
	"GPS:Planet Ravcor:2013801.75:344675.25:-4041406:",
	"GPS:Planet Raxum:1005989.38:395656.31:-1490926.88:",
	"GPS:Planet Uintonn:-2931954.5:-1135241.62:4766915:",
	"GPS:Planet Urna:-1425300.88:-256830.09:2298131.5:",
	"GPS:Planet Zemok:2945782.5:460980.78:-5288015.5:",
]

function randomColor() {
	var colors = [
		new THREE.Color("rgb(100, 100, 100)"),
		new THREE.Color("rgb(150, 0, 0)"),
		new THREE.Color("rgb(0, 150, 0)"),
		new THREE.Color("rgb(0, 0, 150)"),
	]
	return colors.choose()
}
for (let coords of planetCoords) {
	var x = new Body({
		color: randomColor(),
		radius: randint(1, 5),
		coords: coords,
	})
	objects.push(x)
}

// var mars = new Body({
// 	color: new THREE.Color("rgb(150, 0, 0)")
// 	radius: 3,
// 	coords: "GPS:Fe Pt Ice:-2917763.75:-1152106:5565901.5:",
// })


// var plane = new THREE.Mesh(
// 	new THREE.PlaneGeometry( 10, 10, 10, 10 ),
// 	new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true, side: THREE.DoubleSide } ),
// )
// scene.add( plane )
// plane.rotation.x = Math.PI/2

// var axisHelper = new THREE.AxisHelper( 5 )
// scene.add( axisHelper )

// colorCenterLine, colorGrid
// var gridHelper = new THREE.GridHelper( 10, 10 )
// var gridHelper = new THREE.GridHelper( 100, 100, new THREE.Color("rgb(100%, 100%, 0%)"), new THREE.Color("rgb(100%, 0%, 0%)") )
// scene.add( gridHelper )

function update() {
	for ( let object of objects ) {
		object.update()
	}
}
setInterval(update, 10)

function render() {
	requestAnimationFrame( render )
	renderer.render( scene, camera )
	controls.update()
	for ( let object of objects ) {
		// object.update()
	}
}
requestAnimationFrame( render )

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}
window.addEventListener( 'resize', onWindowResize, false );
