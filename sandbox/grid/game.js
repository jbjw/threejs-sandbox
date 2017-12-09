//

function wait(ms) {
    var start = Date.now(),
        now = start;
    while (now - start < ms) {
      now = Date.now();
    }
}

window.GAME = {}

// window.Game = function ( options ) {
// 	// this.grid =
// }

const COLORS = [ 'grey', 'blue', 'green' ]

Array.prototype.random = function () {
	return this[Math.floor(Math.random()*this.length)]
}
