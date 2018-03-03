//

"use strict"

var myImage = document.querySelector('img');

var entities
fetch( "entities.json" ).then( response => {
	return response.json()
} ).then( json => {
	// console.log( typeof json )
	entities = json
	start()
	// console.log( entities )
	// entities = JSON.parse( json )
	// blob.json()
	// var objectURL = URL.createObjectURL( myBlob )
	// myImage.src = objectURL
} )

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.01, 100000 )
// const camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, -10, 1000 )
scene.add( camera )
camera.position.set( 5, 3, 5 )

// const renderer = new THREE.WebGLRenderer( { alpha: true } )
const renderer = new THREE.WebGLRenderer()
renderer.setSize( window.innerWidth, window.innerHeight )
document.body.appendChild( renderer.domElement )

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

const controls = new THREE.OrbitControls(camera)

// var texture = new THREE.TextureLoader().load("../assets/360images/sky.jpg")
// texture.wrapS = THREE.RepeatWrapping;
// texture.wrapT = THREE.RepeatWrapping;
// texture.repeat.set( 4, 4 );

// void ctx.ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise);

// ctx.fillRect(5, 5, 400, 400)

// var myImageData = ctx.createImageData(textureCanvas.width, textureCanvas.height) // blank

// var myImageData = ctx.getImageData(left, top, width, height) // copy

// ctx.putImageData(myImageData, 0, 0) // set

const colors = [
	"#FFFFFF",
	// "#FFFFFF",
	// "#FFFFFF",
	"#FFCCCC",
	"#CCFFFF",
	"#CCCCFF",
]
// const colors = [
// 	new THREE.Color( "#FFFFFF" ),
// 	new THREE.Color( "#CCCCFF" ),
// 	new THREE.Color( "#FFCCCC" ),
// 	new THREE.Color( "#CCFFFF" ),
// ]

// var skyboxCanvas = document.createElement( "canvas" )
// var ctx = skyboxCanvas.getContext( "2d" )
//
// var skyboxWidth = 1024
// var skyboxHeight = 1024
// // 1024 2048 4096 8192
//
// skyboxCanvas.width = skyboxWidth
// skyboxCanvas.height = skyboxHeight
//
// ctx.fillStyle = "#000000"
// ctx.fillRect( 0, 0, 1024, 1024 )

// for ( let i = 0; i < 100; i++ ) {
// 	ctx.beginPath()
// 	ctx.ellipse(
// 		utils.randomInt( 0, skyboxWidth ), utils.randomInt( 0, skyboxHeight ),
// 		utils.randomInt( 1, 5 ), utils.randomInt( 1, 5 ),
// 		45 * Math.PI * 2 / 360, 0, 2 * Math.PI
// 	)
// 	ctx.fillStyle = colors.choose()
// 	ctx.fill()
// 	console.log( ctx.fillStyle )
// }
//
// var skyboxTexture = new THREE.CanvasTexture( skyboxCanvas )
// // var skyboxTexture = new THREE.Texture( skyboxCanvas )
// skyboxTexture.needsUpdate = true
//
// var skybox = new THREE.Mesh(
// 	new THREE.SphereGeometry( 100, 32, 32 ),
// 	new THREE.MeshBasicMaterial( {
// 		map: skyboxTexture,
// 		// color: 0x000000,
// 		side: THREE.DoubleSide,
// 	} ),
// )
// scene.add( skybox )

var loader = new THREE.CubeTextureLoader()
loader.setPath( '../../assets/cube_textures/space-cube/' )

var textureCube = loader.load( [
	"r.png", "l.png", // 'px.png', 'nx.png',
	"t.png", "b.png", // 'py.png', 'ny.png',
	"c.png", "rr.png", // 'pz.png', 'nz.png',
] )
// console.log( textureCube )
var material = new THREE.MeshBasicMaterial( { color: 0xffff00, envMap: textureCube } )
scene.background = textureCube

// scene.background = new THREE.Color( 0x0000ff )

let objects = []

function parseCoords( coords ) {
	var result = coords.split( ":" )
	var name = result[ 1 ]
	return new THREE.Vector3( result[2], result[3], result[4] )
}

var originVec

// @todo
function setOrigin( coords ) {
	if ( typeof vec === "string" ) {
		originVec = parseCoords( coords )
	} else {
		originVec = coords
	}
	// reposition things
}

setOrigin( new THREE.Vector3( 0, 0, 0 ) )

var scale = 1/1000000

function convertCoords(vec) {
	return vec.clone().sub( originVec ).multiplyScalar( scale )
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
	ctx.fillText(args.text, 256/2, 256/2)

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
		new THREE.MeshBasicMaterial( { color: args.color, wireframe: false, side: THREE.DoubleSide } ),
		// new THREE.MeshBasicMaterial( { color: 0x00aa00, wireframe: false, side: THREE.DoubleSide } ),
	)

	this.mesh.position.copy( convertCoords( parseCoords( args.coords ) ) )
	scene.add( this.mesh )

	this.label = new Label( {
		text: args.name,
	} )
	scene.add( this.label.sprite )

	this.label.sprite.position.addVectors( this.mesh.position, new THREE.Vector3( 0, 0, 0 ) )

	// this.group = new THREE.Group()
	// this.group.add( this.mesh );
	// this.group.add( this.label );
	// scene.add( this.group );

	this.update = function () {

	}
}

function Station( args ) {
	this.mesh = new THREE.Mesh(
		new THREE.SphereGeometry( args.radius, 32, 32 ),
		// new THREE.BoxGeometry( 0.1, 0.1, 0.1 ),
		new THREE.MeshBasicMaterial( { color: 0xaaaaaa, wireframe: false, side: THREE.DoubleSide } ),
	)

	this.mesh.position.copy( convertCoords( parseCoords( args.coords ) ) )
	scene.add( this.mesh )

	this.label = new Label( {
		text: args.name,
	} )
	scene.add( this.label.sprite )

	this.label.sprite.position.addVectors( this.mesh.position, new THREE.Vector3( 0, 0, 0 ) )

	this.update = function () {

	}
}

function Ship( args ) {
	objects.push( this )

	this.velocity = new THREE.Vector3( 0, 0, 0 )

	this.mesh = new THREE.Mesh(
		// new THREE.SphereGeometry( args.radius, 32, 32 ),
		new THREE.BoxGeometry( 1, 2, 1, 1 ),
		new THREE.MeshBasicMaterial( { color: 0xaaaaaa, wireframe: false, side: THREE.DoubleSide } ),
	)

	scene.add( this.mesh )

	this.update = function () {
		this.mesh.position.add( this.velocity )
	}
}

// var geometry = new THREE.BoxGeometry( 1, 1, 1 )
//
// var material = new THREE.LineDashedMaterial({
// 	color: utils.randomColor(),
// 	linewidth: 1,
// 	scale: 1,
// 	dashSize: 0.1,
// 	gapSize: 0.05,
// })
// geometry.computeLineDistances();
// var line = new THREE.Line(geometry, material)
// scene.add(line)

function start() {
	console.log( entities )
	for ( let entity of entities ) {
		console.log( entity )
		switch ( entity.category ) {
			case "asteroid":
				var tmp = new Body( {
					// color: utils.chooseColor(),
					color: new THREE.Color( "gray" ),
					radius: entity.radius * scale,
					coords: entity.coords,
					name: entity.tag,
				} )
				objects.push( tmp )
				break
			case "station":
				var tmp = new Body( {
					// color: utils.chooseColor(),
					color: new THREE.Color( entity.color ),
					radius: entity.radius * scale,
					coords: entity.coords,
					name: entity.tag,
				} )
				objects.push( tmp )
				break
			case "planet":
				var tmp = new Body( {
					color: new THREE.Color( entity.color ),
					radius: entity.radius * scale,
					coords: entity.coords,
					name: entity.name,
				} )
				objects.push( tmp )
				break
			case "moon":
				var tmp = new Body( {
					color: new THREE.Color( entity.color ),
					radius: entity.radius * scale,
					coords: entity.coords,
					name: entity.name,
				} )
				objects.push( tmp )

				// var material = new THREE.LineBasicMaterial({
				// 	color: 0x0000ff
				// });
				// var material = new THREE.LineBasicMaterial({
				// 	// color: 0xffffff,
				// 	color: utils.randomColor(),
				// 	linewidth: 10,
				// })
				var material = new THREE.LineDashedMaterial( {
					color: utils.randomColor(),
					linewidth: 10,
					scale: 1,
					dashSize: 0.1,
					gapSize: 0.025,
				} )

				var geometry = new THREE.Geometry()

				var orbitBody = entities.find( e => e.name == entity.orbits )

				geometry.vertices.push(
					convertCoords( parseCoords( entity.coords ) ),
					convertCoords( parseCoords( orbitBody.coords ) ),
				)
				geometry.computeLineDistances()

				var line = new THREE.Line( geometry, material )
				scene.add( line )

				break
		}
	}
}

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
