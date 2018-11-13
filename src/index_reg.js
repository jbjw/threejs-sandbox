//

"use strict"

import Entity from "./Entity.js"
import Inputs from "./Inputs.js"

const log = console.log

let renderer, stats, controls, scene, camera, cube
var raycaster = new THREE.Raycaster()
var mouse = new THREE.Vector2()

const entities = []

init()
render()

function init() {
	// renderer setup
	renderer = new THREE.WebGLRenderer( { antialias: true, alpha: false } )
	renderer.setSize( window.innerWidth, window.innerHeight )
	document.body.appendChild( renderer.domElement )

	// renderer.setClearColor( "#AA00AA", 0.5 )
	renderer.shadowMap.enabled = true
	// renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
	renderer.shadowMapSoft = true
	renderer.shadowCameraNear = 3
	renderer.shadowCameraFov = 50
	renderer.shadowMapBias = 0.0039
	renderer.shadowMapDarkness = 0.5
	renderer.shadowMapWidth = 1024
	renderer.shadowMapHeight = 1024

	// stats setup
	stats = new Stats()
	stats.showPanel( 1 ) // 0: fps, 1: ms, 2: mb, 3+: custom
	document.body.appendChild( stats.dom )

	// scene setup
	scene = new THREE.Scene()

	// camera setup
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 )
	// const camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, -10, 1000 );
	renderer.shadowCameraFar = camera.far
	// camera.up.set( 0, 0, 1 )
	camera.position.x = 40, camera.position.z = 40
	camera.position.y = 25
	// camera.up = new THREE.Vector3( 0, 0, 1 )
	// scene.add( camera )
	// controls.object = camera
	// position, rotation, scale

	// camera.fov = 120
	// camera.aspect = window.innerWidth / window.innerHeight
	// camera.near = 0.1
	// camera.far = 100000
	// camera.updateProjectionMatrix()
	// camera.position.set( 1, 1, 1 )
	// .focus,.fov, .zoom

	// controls setup
	// controls = new THREE.OrbitControls()
	controls = new THREE.OrbitControls( camera )
	controls.zoomSpeed = 4

	// scene.background method
	const skyboxLoader = new THREE.CubeTextureLoader()
	skyboxLoader.setPath("/assets/cube_textures/space/")
	const textureCube = skyboxLoader.load([
		"r.png", "l.png", // 'px.png', 'nx.png',
		"t.png", "b.png", // 'py.png', 'ny.png',
		"c.png", "rr.png", // 'pz.png', 'nz.png',
	])
	// const material = new THREE.MeshBasicMaterial( { color: 0xffffff, envMap: textureCube } )
	scene.background = textureCube

	// crate.gif, dirt.jpg
	const loader = new THREE.TextureLoader()
	// var texture = THREE.ImageUtils.loadTexture( "/assets/textures/crate.jpg" )
	const crateTexture = loader.load( "/assets/textures/crate.jpg" )
	crateTexture.anisotropy = renderer.getMaxAnisotropy()

	// var pointLight = new THREE.PointLight(0xFFFFFF)
	var light = new THREE.AmbientLight( 0x404040, 0.5 ) // soft white light intensity
	scene.add( light )

	// White directional light at half intensity shining from the top.
	var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 )
	scene.add( directionalLight )

	var crateMaterial = new THREE.MeshLambertMaterial( { map: crateTexture } )
	// var material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: false } )
	// side: THREE.DoubleSide } )

	cube = {
		mesh: new THREE.Mesh( new THREE.BoxGeometry( 2, 2, 2 ), crateMaterial ),
	}
	scene.add( cube.mesh )

	var axisHelper = new THREE.AxisHelper( 5 )
	scene.add( axisHelper )

	// colorCenterLine, colorGrid
	var gridHelper = new THREE.GridHelper( 100, 1 )
	scene.add( gridHelper )

	const platform = new THREE.Mesh(
		new THREE.PlaneGeometry( 10, 10, 10, 10 ),
		new THREE.MeshBasicMaterial( {
			map: crateTexture,
			side: THREE.DoubleSide,
		} )
	)
	platform.position.y = 2.1
	scene.add( platform )
	platform.rotation.x = Math.PI/2
	platform.receiveShadow = true

	const dirtTexture = new THREE.TextureLoader().load( '/assets/textures/dirt.jpg' )
	dirtTexture.anisotropy = renderer.getMaxAnisotropy()

	const woodTexture = new THREE.TextureLoader().load( '/assets/textures/stone.jpg' )
	woodTexture.anisotropy = renderer.getMaxAnisotropy()

	const grassTexture = new THREE.TextureLoader().load( '/assets/textures/grass.jpg' )
	grassTexture.anisotropy = renderer.getMaxAnisotropy()
	grassTexture.wrapS = THREE.RepeatWrapping
	grassTexture.wrapT = THREE.RepeatWrapping
	grassTexture.repeat.set( 20, 20 )

	const checkerboardTexture = new THREE.TextureLoader().load( '/assets/textures/checkerboard.png' )
	checkerboardTexture.anisotropy = renderer.getMaxAnisotropy()
	checkerboardTexture.wrapS = THREE.RepeatWrapping
	checkerboardTexture.wrapT = THREE.RepeatWrapping
	checkerboardTexture.repeat.set( 20, 20 )

	var sphereMesh = new THREE.Mesh(
		new THREE.SphereGeometry( 10, 32, 32 ),
		new THREE.MeshLambertMaterial( {
			map: checkerboardTexture,
			// side: THREE.DoubleSide,
		} )
	)
	const sphere = new Entity({mesh: sphereMesh})
	scene.add( sphereMesh )
	sphereMesh.position.set( 0, 15, 0 )
	sphereMesh.castShadow = true
	sphereMesh.receiveShadow = false
	entities.push(sphere)

	// ground plane
	var ground = new THREE.Mesh(
		new THREE.PlaneGeometry( 100, 100, 10, 10 ),
		new THREE.MeshLambertMaterial( {
			map: grassTexture,
			side: THREE.DoubleSide,
		} )
	)
	scene.add( ground )
	ground.rotation.x = Math.PI/2
	ground.receiveShadow = true
	for (var i = 0, l = ground.geometry.vertices.length; i < l; i++) {
		ground.geometry.vertices[i].z = Math.random()*3
	}
	ground.geometry.verticesNeedUpdate = true

	// lighting
	var spotlight = new THREE.SpotLight( 0xffffff )

	spotlight.position.set( 10, 100, 10 )
	// spotlight.intensity = 10
	spotlight.angle = ( Math.PI * 2 ) * ( 1 / 32 )
	// spotlight.distance = 1000
	// spotlight.decay = 2

	// spotlight.target = sphere

	spotlight.castShadow = true

	spotlight.shadow.mapSize.width = 1024
	spotlight.shadow.mapSize.height = 1024

	spotlight.shadow.camera.near = 500
	spotlight.shadow.camera.far = 4000
	spotlight.shadow.camera.fov = 30

	scene.add( spotlight )
	scene.add( new THREE.SpotLightHelper( spotlight ) )

	var ambientLight = new THREE.AmbientLight( 0x404040, 1 )
	scene.add( ambientLight )

	var sunLight = new THREE.DirectionalLight( 0xffffff, 1.0 )
	sunLight.position.set( 100, 50, 100 )
	// scene.add( sunLight.target )
	// sunLight.target = box
	sunLight.castShadow = true
	scene.add( sunLight )
	scene.add( new THREE.DirectionalLightHelper( sunLight, 5 ) )

	renderer.domElement.addEventListener( 'mousemove', function ( event ) {
		mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1
		mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1

		console.log( mouse.x, mouse.y )
		raycaster.setFromCamera( mouse, camera )

		const hexes = scene.children.filter( o => o.name === "hex" )
		var hexIntersections = raycaster.intersectObjects( hexes, true )

		const firstHexIntersection = hexIntersections[ 0 ]
		if ( firstHexIntersection !== undefined ) {
			firstHexIntersection.object.material.color.set( 0xff0000 )
		}

		const groundIntersection = raycaster.intersectObject( ground, camera )[ 0 ]
		if ( groundIntersection !== undefined ) {
			// console.log( groundIntersection )
			// console.log( groundIntersection.point )
			cursorSphere.position.copy( groundIntersection.point )
		}

		// for ( var i = 0; i < intersections.length; i++ ) {
		// 	// intersections[ i ].object.material.color.set( 0xff0000 );
		// }
	} )

	let cursorSphere = new THREE.Mesh(
		new THREE.SphereGeometry( 1, 32, 32 ),
		new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true, side: THREE.DoubleSide } )
	)
	cursorSphere.position.set( 0, 10, 0 )
	scene.add( cursorSphere )

	setInterval( updateControls, 10 )
	setInterval( updatePhysics, 10 )

	// old render loop
	// function render() {
	// 	requestAnimationFrame( render )
	// 	stats.begin()
	// 	// r += 0.0001
	// 	// phi += 0.1
	// 	// theta += 0.01
	// 	// r += 0.01v.applyAxisAngle( Y, 0.0 )
	// 	// sunLight.position.setFromSpherical( new THREE.Spherical( 100, phi, theta ) )
	// 	// console.log( mesh.localToWorld( X ) )
	//
	// 	// console.log( sunLight.localToWorld( X.clone() ) )
	// 	console.log( sunLight.localToWorld( X ) )
	// 	// console.log( X)
	//
	// 	v.applyAxisAngle( X, 0.1 )
	// 	// v.applyAxisAngle( Y, 0.0 )
	// 	v.applyAxisAngle( Z, r )
	// 	v.applyEuler( new THREE.Euler( 0, 0, 0.1 ) )
	// 	console.log( v )
	// 	// sunLight.position.copy( v )
	//
	// 	controls.update()
	// 	renderer.render( scene, camera )
	// 	stats.end()
	// }
	// requestAnimationFrame( render )
}

function updateControls( dt = 10 ) {
	controls.update()
}

function updatePhysics( dt = 10 ) {
	for (const entity of entities) {
		entity.updatePhysics()
	}
}

function render() {
	requestAnimationFrame( render )
	stats.begin()
	// additional render tasks
	renderer.render( scene, camera )
	stats.end()
}

// window resize
window.addEventListener( "resize", onWindowResize, false )
function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight
	camera.updateProjectionMatrix()
	renderer.setSize( window.innerWidth, window.innerHeight )
}
