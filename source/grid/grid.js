
// var gridArgs = {
// 	rows: 20,
// 	cols: 30,
// 	scale: 0.5,
// }

window.GAME.Grid = function ( args ) {
	this.array = []

	this.getCells = function () {
		var flatArray = []
		for ( let col of this.array ) {
			for ( let cell of col ) {
				flatArray.push( cell )
			}
		}
		return flatArray
	}

	this.add = function ( scene ) {
		for ( let cell in this.getCells() ) {
			cell.add( scene )
		}
	}

	this.rows = args.rows
	this.cols = args.cols

	this.getCellFlat = function ( i ) {
		// console.log( i )
		var col = i % this.cols
		var row = Math.floor( i / this.cols )
		// console.log( col, row )
		// console.log( this.getCell( col, row ) )
		// out of bounds check
		return this.getCell( col, row )
	}

	this.getCell = function ( col, row ) {
		if ( this.array[col] ) {
			return this.array[col][row]
		}
	}
	// wait( 1000 )
	this.getRandomCell = function () {
		// console.log( this.cols * this.rows )
		// console.log( randRange( this.cols * this.rows ) )

		return this.getCellFlat( randRange( this.cols * this.rows ) )
	}

	for ( let colI = 0; colI < args.cols; colI++ ) {
		var col = []
		this.array.push( col )
		for ( let rowI = 0; rowI < args.rows; rowI++ ) {
			var cellArgs = {
				position: new THREE.Vector3( colI, 1.5, rowI ),
				name: `${colI} ${rowI}`
			}
			var cell = new GAME.Cell( cellArgs )

			// grid[][]
			col.push( cell )
		}
	}
	for ( let colI = 0; colI < args.cols; colI++ ) {
		for ( let rowI = 0; rowI < args.rows; rowI++ ) {
			var cell = this.getCell( colI, rowI )
			cell.up = this.getCell( colI, rowI + 1 )
			cell.down = this.getCell( colI, rowI - 1 )
			cell.left = this.getCell( colI - 1, rowI )
			cell.right = this.getCell( colI + 1, rowI )
		}
	}
}

function randRange( range ) {
	return Math.floor( Math.random() * range )
}
