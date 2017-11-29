

//

// import * as utils from "../libraries/utils.js"
// import "../libraries/p5.js"

var x = 0
var y = 0
var vx = 0.01
var vy = 0.1

var time = 0

// let width = 5, height

const objects = []

let gameWidth
let gameHeight

// console.log()
// let canvas
function setup() {

	// displayWidth
	// windowWidth
	// canvas = createCanvas( windowWidth, windowHeight )
	// gameWidth = windowWidth
	// gameHeight = windowHeight
	gameWidth = 600
	gameHeight = 400
	// createCanvas( windowWidth, windowHeight )
	// console.log("setup")
	// createCanvas( width, height )
	createCanvas( gameWidth, gameHeight )

	// canvas.onclick = function() {
	// 	console.log('what')
	// 	canvas.requestPointerLock();
	// }
	// var ship = new Ship()
	const ship = new Ship({
		startPos: new utils.Vec2(width/4, height/4),
		// startX: width/2,
		// startY: height/2,
	})
	objects.push( ship )
	// console.log( objects )
}

// console.log(gameWidth)

function windowResized() {
	// resizeCanvas( windowWidth, windowHeight )
}

function draw() {
	background( 100 )

	// if ( x > width || x < 0 ) {
	// 	x = width/2
	// }
	// if ( y > height || y < 0 ) {
	// 	y = height/2
	// }

	time++

	for ( let object of objects ) {
		object.update()
		object.draw()
	}
}

function Ship(args) {
	if ( typeof args == "undefined" ) {
		args = {}
	}
	if ( "startPos" in args ) {
		this.pos = args.startPos
	} else {
		this.pos = new utils.Vec2( 100, 100 )
	}
	if ( "startVel" in args ) {
		this.vel = args.startVel
	} else {
		this.vel = new utils.Vec2( 0, 0 )
	}
	this.thrust = 0.1
	this.draw = function () {


		textSize(32);
		text(`${this.vel.x.toPrecision(4)}`, 10, 30);
		// fill(0, 102, 153);
		text(`${this.vel.y.toFixed(4)}`, 10, 60);
		// fill(0, 102, 153, 51);
		text(`${this.pos.x.toFixed(4)}`, 10, 90);
		text(`${this.pos.y.toFixed(4)}`, 10, 120);

		// rotate(2*PI/4.0)
		var w = 5
		var l = 10

		var xs = [0, w, 0, -w]
		var ys = [l/2, l, -l, l]
		var args = []
		for (let i = 0; i < 4; i++) {
			args.push(xs[i] + this.pos.x)
			args.push(ys[i] + this.pos.y)
		}


		quad(...args)

		// quad(
		// 	this.pos.x, this.pos.y,
		// 	this.pos.x + 5/2, this.pos.y + 10/2,
		// 	this.pos.x, this.pos.y - 10/2,
		// 	this.pos.x - 5/2, this.pos.y + 10/2,
		// )
		// ellipse(this.pos.x, this.pos.y, 10, 10)
		// rotate(-2*PI/4.0)

	}
	this.update = function (dt) {
		// drag
		// var drag = 0.01
		// this.vx -= this.vx*drag
		// this.vy -= this.vy*drag

		// dampen
		var gravity = 1

		var dampenThrust = 0.1
		var moving = keyIsDown( LEFT_ARROW )
			|| keyIsDown( RIGHT_ARROW )
			|| keyIsDown( UP_ARROW )
			|| keyIsDown( DOWN_ARROW )


		var dampen = false
		if ( keyIsDown( 32 ) ) {
			dampen = true
		}
		// if ( !moving ) {
		// 	dampen = true
		// }

		if ( dampen ) {
			console.log("dampening")

			if ( this.vel.x > 0 ) {
				// this.vx -= dampenThrust
				this.vel.x -= min(abs(this.vel.x), dampenThrust)
			}
			if ( this.vel.x < 0 ) {
				// this.vx += dampenThrust
				this.vel.x += min(abs(this.vel.x), dampenThrust)
			}
			if ( this.vel.y > 0 ) {
				// this.vy -= dampenThrust
				this.vel.y -= min(abs(this.vel.y), dampenThrust)
			}
			if ( this.vel.y < 0 ) {
				// this.vy += dampenThrust
				this.vel.y += min(abs(this.vel.y), dampenThrust)
			}
		}

		// wrap
		// console.log(gameHeight)
		if ( this.pos.x > gameWidth ) {
			this.pos.x = 0
		}
		if ( this.pos.x < 0 ) {
			this.pos.x = gameWidth
		}

		if ( this.pos.y > gameHeight ) {
			this.pos.y = 0
		}
		if ( this.pos.y < 0 ) {
			this.pos.y = gameHeight
		}

		if ( keyIsDown( LEFT_ARROW ) ) {
			this.vel.x -= this.thrust
		}
		if ( keyIsDown( RIGHT_ARROW ) ) {
			this.vel.x += this.thrust
		}
		if ( keyIsDown( UP_ARROW ) ) {
			this.vel.y -= this.thrust
		}
		if ( keyIsDown( DOWN_ARROW ) ) {
			this.vel.y += this.thrust
		}
		this.pos.x += this.vel.x, this.pos.y += this.vel.y
	}
}

// .requestPointerLock()
// document.exitPointerLock();

// e.movementX
// mousemove

// fullscreen()
// if (mouseIsPressed) {
// fill(100, or rgb?)
