//

"use strict";

var keyboardState = {}

document.addEventListener("keypress", function (e) {
	console.log("key pressed")
	console.log(e.key)
})

document.addEventListener("keydown", function (e) {
	keyboardState[e.key] = true
})

document.addEventListener("keyup", function (e) {
	keyboardState[e.key] = false
	// console.log(keyboardState)
})

function randomColor() {
	return new THREE.Color(`rgb(${randint(0,255)}, ${randint(0,255)}, ${randint(0,255)})`)
}

function chooseColor() {
	var colors = [
		new THREE.Color("rgb(100, 100, 100)"),
		new THREE.Color("rgb(150, 0, 0)"),
		new THREE.Color("rgb(0, 150, 0)"),
		new THREE.Color("rgb(0, 0, 150)"),
	]
	return colors.choose()
}

// var myImageData = ctx.createImageData(textureCanvas.width, textureCanvas.height) // blank

// var myImageData = ctx.getImageData(left, top, width, height) // copy

// ctx.putImageData(myImageData, 0, 0) // set

var skyboxCanvas = document.createElement("canvas")
var ctx = skyboxCanvas.getContext("2d")

var skyboxWidth = 8192
var skyboxHeight = 8192
// 1024 2048 4096 8192

skyboxCanvas.width = skyboxWidth
skyboxCanvas.height = skyboxHeight

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.01, 100000 )
// const camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, -10, 1000 )
scene.add(camera)
camera.position.set( 5, 3, 5 )

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// document.addEventListener("click", function () {
// 	document.documentElement.webkitRequestFullscreen()
// })

document.addEventListener("webkitfullscreenchange", function () {
	console.log("webkitfullscreenchange")
})
document.addEventListener("mozfullscreenchange", function () {
	console.log("mozfullscreenchange")
})
document.addEventListener("fullscreenchange", function () {
	console.log("fullscreenchange")
})

document.addEventListener("webkitfullscreenchange", function () {
	if (!document.webkitFullscreenElement) {
		fullscreenButton.style.display = "block"
	} else {
		fullscreenButton.style.display = "none"
	}
})

function toggleFullScreen() {
	if (!document.webkitFullscreenElement) {
		document.documentElement.webkitRequestFullscreen()
	} else {
		document.webkitExitFullscreen()
	}
}

var fullscreenButton = document.querySelector("#fullscreen-button")
fullscreenButton.addEventListener("click", function () {
	toggleFullScreen()
})

// console.log(window.getComputedStyle(fullscreenButton, null))
// webkitRequestFullScreen
// mozRequestFullScreen

// renderer.domElement.requestFullscreen()

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

function getRandomArbitrary(min, max) { return Math.random() * (max - min) + min }

function randint(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

// choose and weighted choose

// ctx.fillRect(5, 5, 400, 400)

Array.prototype.choose = function () { return this[Math.floor(Math.random() * this.length)] }

var colors = ["#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#CCFFFF", "#CCCCFF", "#FFCCCC"]
// var colors = ["#AAAAAA"]
var weights = [0.9, 0.4, 0.4, 0.4]

for (let i = 0; i < 1000; i++) {
	ctx.beginPath()
	ctx.ellipse(randint(0, skyboxWidth), randint(0, skyboxHeight), randint(1, 5), randint(1, 5), 45 * Math.PI*2/360, 0, 2 * Math.PI)
	ctx.fillStyle = colors.choose()
	ctx.fill()
}

var skyboxTexture = new THREE.CanvasTexture(skyboxCanvas)

var texture = new THREE.Texture(skyboxCanvas)
texture.needsUpdate = true

var skybox = new THREE.Mesh(
	new THREE.SphereGeometry(1000, 32, 32),
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

var scale = 1/1000000

function convertCoords(vec) {
	var newVec = new THREE.Vector3()
	newVec.copy(vec)
	newVec.sub(originVec)

	newVec.multiplyScalar(scale)
	return newVec
}

function Label(args) {
	var canvas = document.createElement("canvas")
	canvas.width = 256
	canvas.height = 256
	// document.body.appendChild(canvas)
	var ctx = canvas.getContext("2d")

	ctx.font = "48px serif";

	ctx.fillStyle = "rgba(255, 0, 0, 0.5)"
	ctx.fillRect(0, 0, 256, 256/4)

	// ctx.fillStyle = "blue";

	ctx.fillStyle = "green";
	ctx.textAlign = "center"
	ctx.textBaseline = "middle"
	ctx.fillText(args.text, 256/2, 256/8)

	// var spriteMap = new THREE.TextureLoader().load( "../assets/textures/crate.jpg" );

	var spriteMap = new THREE.Texture(canvas)
	spriteMap.needsUpdate = true
	var spriteMaterial = new THREE.SpriteMaterial({ map: spriteMap, color: 0xffffff });
	this.sprite = new THREE.Sprite(spriteMaterial)
}

function Body(args) {
	this.mesh = new THREE.Mesh(
		new THREE.SphereGeometry( args.radius, 32, 32 ),
		// new THREE.BoxGeometry( 4, 4, 1, 1 ),
		new THREE.MeshBasicMaterial({color: args.color, wireframe: false, side: THREE.DoubleSide}),
		// new THREE.MeshBasicMaterial( { color: 0x00aa00, wireframe: false, side: THREE.DoubleSide } ),
	)

	this.mesh.position.copy(convertCoords(parseCoords(args.coords)))
	scene.add(this.mesh)

	this.label = new Label({
		text: args.name,
	})
	scene.add(this.label.sprite)

	this.label.sprite.position.addVectors(this.mesh.position, new THREE.Vector3(0, 0, 0))

	// this.group = new THREE.Group()
	// this.group.add( this.mesh );
	// this.group.add( this.label );
	// scene.add( this.group );

	this.update = function () {

	}
}

function Station(args) {
	this.mesh = new THREE.Mesh(
		new THREE.SphereGeometry( args.radius, 32, 32 ),
		// new THREE.BoxGeometry( 0.1, 0.1, 0.1 ),
		new THREE.MeshBasicMaterial( { color: 0xaaaaaa, wireframe: false, side: THREE.DoubleSide } ),
	)

	this.mesh.position.copy(convertCoords(parseCoords(args.coords)))
	scene.add(this.mesh)

	this.label = new Label({
		text: args.name,
	})
	scene.add(this.label.sprite)

	this.label.sprite.position.addVectors(this.mesh.position, new THREE.Vector3(0, 0, 0))

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

// var geometry = new THREE.BoxGeometry( 1, 1, 1 )
//
// var material = new THREE.LineDashedMaterial({
// 	color: randomColor(),
// 	linewidth: 1,
// 	scale: 1,
// 	dashSize: 0.1,
// 	gapSize: 0.05,
// })
// geometry.computeLineDistances();
// var line = new THREE.Line(geometry, material)
// scene.add(line)

for (let body of bodies) {
	var tmp = new Body({
		color: new THREE.Color(body.color),
		radius: body.radius*scale,
		coords: body.coords,
		name: body.name,
	})

	if (body.category == "moon") {
		// var material = new THREE.LineBasicMaterial({
		// 	color: 0x0000ff
		// });
		// var material = new THREE.LineBasicMaterial({
		// 	// color: 0xffffff,
		// 	color: randomColor(),
		// 	linewidth: 10,
		// })
		var material = new THREE.LineDashedMaterial({
			color: randomColor(),
			linewidth: 10,
			scale: 1,
			dashSize: 0.1,
			gapSize: 0.025,
		})

		var geometry = new THREE.Geometry()

		var orbitBody = bodies.find(e => e.name == body.orbits)

		geometry.vertices.push(
			convertCoords(parseCoords(body.coords)),
			convertCoords(parseCoords(orbitBody.coords)),
		)
		geometry.computeLineDistances()

		var line = new THREE.Line( geometry, material );
		scene.add( line )
	}
	objects.push(tmp)
}

for (let station of stations) {
	var tmp = new Station({
		color: chooseColor(),
		radius: station.radius*scale,
		coords: station.coords,
		name: station.tag,
	})
	objects.push(tmp)
}

// var mars = new Body({
// 	color: new THREE.Color("rgb(150, 0, 0)")
// 	radius: 3,
// 	coords: "GPS:Fe Pt Ice:-2917763.75:-1152106:5565901.5:",
// })


// var plane = new THREE.Mesh(
// 	new THREE.PlaneGeometry( 10, 10, 10, 10 ),
// 	new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true, side: THREE.DoubleSide }),
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
