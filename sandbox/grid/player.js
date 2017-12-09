window.GAME.Player = function ( args ) {
	this.mesh = new THREE.Mesh(
		new THREE.SphereGeometry( 1, 8, 8 ),
		new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true, side: THREE.DoubleSide } ),
	)

	this.add = function ( scene ) {
		scene.add( this.mesh )
	}

	this.startCell = args.startCell
	this.cell = this.startCell

	this.update = function () {
		// this.mesh.position.set( this.position.x, 1, this.position.y )
	}

	this.move = function ( direction ) {
		switch ( direction ) {
			// var target;
			case 'FORWARDS':
				var target = this.cell.up
				// this.position.x += 1
				break;
			case 'BACKWARDS':
				var target = this.cell.down
				// this.position.x -= 1
				break;
			case 'LEFT':
				var target = this.cell.left
				// this.position.y -= 1
				break;
			case 'RIGHT':
				var target = this.cell.right
				// this.position.y += 1
				break;
			default:
				break;
		}
		var status
		if ( target ) {
			this.cell = target
			this.mesh.position.set(
				this.cell.position.x,
				this.cell.position.y,
				1.5
			)
			status = true
		} else {
			status = false
		}
		console.log( this.cell )
		return status
	}

	window.addEventListener( 'keypress', ( e ) => {
		switch ( e.key ) {
			case 'w':
				this.move( 'FORWARDS' )
				break;
			case 's':
				this.move( 'BACKWARDS' )
				break;
			case 'a':
				this.move( 'LEFT' )
				break;
			case 'd':
				this.move( 'RIGHT' )
				break;
			default:
				break;
		}
	} )
}
