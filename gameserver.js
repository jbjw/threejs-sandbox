//

"use strict"

const THREE = require( "three" )

var server = require( "http" ).createServer()
server.listen( 3000 )
var io = require( "socket.io" )( server )
io.on( "connection", function ( socket ) {
	console.log( `client connected ${socket.request.connection.remoteAddress}` )
	// socket.handshake.address
	// socket.request.connection.remoteAddress
	socket.player = new Player( socket.id, socket.handshake.address )
	// addPlayer( socket.id, socket.handshake.address )
	socket.on( "event", function ( data ) {
		console.log( data )
	} )
	socket.on( "disconnect", function () {
		console.log( "disconnected" )
	} )
	// socket.on( "join", function ( data ) {
	// 	console.log( "join", data )
	// } )
	socket.on( "action", function ( action, start ) {
		socket.player.applyAction( action, start )
		console.log( "action", action, start )
	} )
} )

const players = []
const entities = []

function Player( args ) {
	this.username = args.username
	this.ip = args.ip
	this.body = new Body()
	entities.push( this.body )
	this.speed = 0.1
}

Player.prototype.applyAction = function ( action, start ) {
	var velAdd = new THREE.Vector3( 0, 0, 0 )
	switch ( action ) {
		case "up":
			velAdd.y = this.speed
			break
		case "down":
			velAdd.y = -this.speed
			break
		case "left":
			velAdd.x = -this.speed
			break
		case "right":
			velAdd.x = this.speed
			break
	}
	console.log( this.body )
	if ( start ) {
		this.body.velocity.copy( velAdd )
	} else if ( !start ) {
		this.body.velocity.copy( new THREE.Vector3( 0, 0, 0 ) )
	}
}

let idCounter = 0
function Body() {
	this.id = idCounter++
	this.position = new THREE.Vector3( 0, 0, 0 )
	this.velocity = new THREE.Vector3( 0, 0, 0 )
}

Body.prototype.updatePhysics = function () {
	this.position.add( this.velocity )
	// console.log( this.position )
}

setInterval( updatePhysics, 10 )
function updatePhysics() {
	for ( let entity of entities ) {
		entity.updatePhysics()
	}
}

setInterval( updateNetwork, 100 )
function updateNetwork() {
	io.sockets.emit( "update", entities )
}

function addPlayer( username, ip ) {
	players.push( new Player( {
		ip: ip,
		username: username,
	} ) )
}

function removePlayer( username, ip ) {
	var i = players.findIndex( e => {
		return e.username === username && e.ip === ip
	} )
	players.splice( i, 1 )
}



// io.on('connection', function(socket){
// 	socket.emit('request', /* */); // emit an event to the socket
// 	io.emit('broadcast', /* */); // emit an event to all connected sockets
// 	socket.on('reply', function(){ /* */ }); // listen to the event
// });

// const players = []
//
// server.on( "listening", function () {
// 	var address = server.address()
// 	console.log( 'server up ' + address.address + ":" + address.port )
// } )
//
// server.on( "message", function ( message, remote ) {
// 	console.log( remote.address + ':' + remote.port + ' - ' + message )
// 	const args = message.toString().split( " " )
// 	const arg0 = args[ 0 ]
// 	const arg1 = args[ 1 ]
// 	switch ( arg0 ) {
// 		case "a":
// 			switch ( arg1 ) {
// 				case "up":
// 					break
// 				case "down":
// 					break
// 				case "left":
// 					break
// 				case "right":
// 					break
// 			}
// 			break
// 		case "j":
// 			addPlayer( arg1, remote.address )
// 			break
// 		case "d":
// 			removePlayer( arg1, remote.address )
// 			break
// 	}
// } )
//

//
// server.bind( PORT, HOST )
