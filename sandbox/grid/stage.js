window.GAME.Stage = function ( args ) {
	this.entities = []
	this.scene = args.scene

	this.add = function ( entity ) {
		this.entities.push( entity )
		entity.add( this.scene )
		// this.scene.add( entity.mesh )
	}
	this.update = function () {
		for ( let entity of this.entities ) {
			entity.update()
		}
	}
}
