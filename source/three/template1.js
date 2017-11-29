var scene, camera, renderer

init()
animate()

function init() {
	scene = new THREE.Scene()

	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 )

	camera.position.z = 1000

	var texture = THREE.ImageUtils.loadTexture('crate.gif')
	// var pointLight = new THREE.PointLight(0xFFFFFF)

	var material = new THREE.MeshBasicMaterial( { map: texture } )
	// var material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: false } )

	var geometry = new THREE.BoxGeometry( 200, 200, 200 )

	var mesh = new THREE.Mesh( geometry, material )

	var cube = {
		mesh: mesh,
	}
	scene.add( cube.mesh )

	renderer = new THREE.WebGLRenderer()
	renderer.setSize( window.innerWidth*0.9, window.innerHeight*0.9 )

	document.body.appendChild( renderer.domElement )
}

function animate() {
	requestAnimationFrame( animate )
	//
	// cube.mesh.rotation.x += 0.01
	// cube.mesh.rotation.y += 0.02

	renderer.render( scene, camera )
}
