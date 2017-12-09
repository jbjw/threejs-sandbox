//

"use strict";

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

// const geometry = new THREE.SphereGeometry(2, 32, 32)

var ambientLight = new THREE.AmbientLight(0x404040) // soft white light
scene.add(ambientLight)

var pointLight = new THREE.PointLight(0xffffff, 1, 100)
pointLight.position.set(0, 0, 0)
scene.add(pointLight)

// White directional light at half intensity shining from the top.
var directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
directionalLight.position.set(0, 100, 0)
directionalLight.castShadow = true
scene.add(directionalLight)

const segments = 6
const radius = 2
const points = []
for (let segment = 0; segment < segments; segment++) {
	const theta = segment * (360/segments)
	const x = Math.cos(theta * (2*Math.PI/360))*radius
	const y = Math.sin(theta * (2*Math.PI/360))*radius
	points.push(new THREE.Vector2(x, y))
}
console.log(points)
var shape = new THREE.Shape()
shape.moveTo(points[0].x, points[0].y)
for (let point of points) {
	shape.lineTo( point.x, point.y )
}

var extrudeSettings = {
	steps: 2,
	amount: 16,
	bevelEnabled: false,
	bevelThickness: 2,
	bevelSize: 0.1,
	bevelSegments: 1,
}

var geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)
var material = new THREE.MeshLambertMaterial({color: 0x009900})
var mesh = new THREE.Mesh(geometry, material)
mesh.position.set(5, 1, 5)
scene.add(mesh)


var geometry = new THREE.Geometry()

geometry.vertices.push(
	new THREE.Vector3(-1,  1, 0),
	new THREE.Vector3(-1, -1, 0),
	new THREE.Vector3(1, -1, 0),
	new THREE.Vector3(1, -1, 1),
)

geometry.faces.push(
	new THREE.Face3(0, 1, 2),
	new THREE.Face3(1, 2, 3),
	new THREE.Face3(0, 2, 3),
	new THREE.Face3(0, 1, 3),
)
geometry.computeFaceNormals()
geometry.computeVertexNormals()

geometry.computeBoundingSphere();

// load a texture, set wrap mode to repeat
var texture = new THREE.TextureLoader().load( "../assets/textures/grass.jpg" );
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set( 4, 4 );

// load a texture, set wrap mode to repeat
var crateTexture = new THREE.TextureLoader().load( "../assets/textures/crate.jpg" );
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set( 4, 4 );

const mesh1 = new THREE.Mesh(
	geometry,
	new THREE.MeshLambertMaterial({color: 0x00aa00, wireframe: true, side: THREE.DoubleSide}),
)
mesh1.position.set( -5, 3, 0 )
scene.add(mesh1)

const mesh2 = new THREE.Mesh(
	geometry,
	new THREE.MeshLambertMaterial({color: 0x00ff00, map: crateTexture, wireframe: false, side: THREE.DoubleSide}),
)
mesh2.position.set( 0, 3, 0 )
scene.add(mesh2)

const mesh3 = new THREE.Mesh(
	geometry,
	// color: 0xffffff,
	new THREE.MeshLambertMaterial({map: texture, wireframe: false, side: THREE.DoubleSide}),
)
mesh3.position.set( 5, 3, 0 )
scene.add(mesh3)

const boxMesh = new THREE.Mesh(
	new THREE.BoxGeometry(1, 1, 1),
	// color: 0xffffff,
	new THREE.MeshLambertMaterial({map: crateTexture, wireframe: false, side: THREE.DoubleSide}),
)
boxMesh.position.set( 0, 6, 0 )
scene.add(boxMesh)

var plane = new THREE.Mesh(
	new THREE.PlaneGeometry( 100, 100, 10, 10 ),
	new THREE.MeshLambertMaterial({color: 0xdd820b, map: texture, wireframe: false, side: THREE.DoubleSide}),
)
scene.add(plane)
plane.rotation.x = Math.PI/2

var axisHelper = new THREE.AxisHelper( 5 )
scene.add( axisHelper )

// colorCenterLine, colorGrid
var gridHelper = new THREE.GridHelper( 100, 0.1 )
scene.add( gridHelper )

function randint(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

setInterval( () => ambientLight.color = randomColor(), 1000 )

function render() {
	requestAnimationFrame( render )
	renderer.render( scene, camera )
	controls.update()
	pointLight.position.y += 0.11

	// directionalLight.position.x += 0.1
	// sphere.position.y += 0.01
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
