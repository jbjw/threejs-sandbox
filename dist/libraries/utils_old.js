//


window.utils.grid = {

}

window.utils.centerToStartEnd = function centerToStartEnd( center, size ) {
	return {
		start: new THREE.Vector2( center.x - size.x/2, center.y - size.y/2 ),
		end: new THREE.Vector2( center.x + size.x/2, center.y + size.y/2 ),
	}
}

// var altOptions = {
// 	center: new THREE.Vector2( 0, 0 ),
// 	size: new THREE.Vector2( 20, 20 ),
// 	subdivisions: new THREE.Vector2( 29, 15 ),
// }
// centerToStartEnd


// reasonable:
// 	start, end
// 	center, size (special)
// extra:
// 	start, size
// 	end, size
// ?:
// 	start, center
// 	end, center

// if ( start && end ) {
//
// } else if ( center && size ) {
//
// } else {
// 	console.error( 'unsupported (for now) pos args' )
// 	return
// }
