//

"use strict"

var fs = require( "fs" )

var json = fs.readFileSync( "raws.json", "utf8" )
var raws = JSON.parse( json )

function dump( path, json ) {
	fs.writeFile( path, JSON.stringify( json, null, 2 ), function ( err ) {
		if ( err ) {
			console.log( "error" )
		} else {
			console.log( "success" )
		}
	} )
}

var items = []

for ( let raw of raws ) {
	const tmp = Object.assign( {}, raw )
	tmp.category = "asteroid"
	items.push( tmp )
}

dump( "entities.json", items )
