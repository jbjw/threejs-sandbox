// var cellArgs = {
// 	position: new THREE.Vector3( colI, 1.5, rowI ),
// 	name: 'bleh'',
// }

window.GAME.Cell = function ( args ) {
	this.add = function ( scene ) {

		scene.add( this.mesh )
	}

	this.name = args.name

	this.position = args.position

	this.mesh = new THREE.Mesh(
		new THREE.BoxGeometry( 1, 1, 0.1 ),
		new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true, side: THREE.DoubleSide } ),
	)
	this.mesh.position = this.position

	this.update = function () {
		//
	}
}
