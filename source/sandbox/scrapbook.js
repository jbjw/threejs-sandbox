var options = {
	start: new THREE.Vector2( -10, -10 ),
	end: new THREE.Vector2( 10, 10 ),
	subdivisions: new THREE.Vector2( 29, 15 ),
}

console.log( flattenArray( [ [1, 2], [3, 4], ['a', 'x'] ]))
function flattenArray( arr ) {
	let newArr = []
	for ( let a of arr ) {
		for ( let b of a ) {
			newArr.push( b )
		}
	}
}

function genPlane( options ) {
	let vertices = []
	const xDelta = options.end.x - options.start.x
	const xSpacing = xDelta / options.subdivisions.x
	const yDelta = options.end.y - options.start.y
	const ySpacing = yDelta / options.subdivisions.y

	for ( let x = 0; x < options.subdivisions.x; x++ ) {
		for ( let y = 0; y < options.subdivisions.y; y++ ) {
			//
		}
	}
}

for ( let vertex of plane.geometry.vertices ) {
	console.log(vertex)
	// const x = (Math.random()*100)-(100/2)
	// const y = (Math.random()*100)-(100/2)
	// const z =
	// vertex.z = (Math.random()*1)-1
	// vertex.set( x, y, 0 )
}

var FizzyText = function() {
  this.message = 'dat.gui';
  this.speed = 0.8;
  this.displayOutline = false;
  this.explode = function() { ... };
  // Define render logic ...
};

window.onload = function() {
  var text = new FizzyText();
  var gui = new dat.GUI();
  gui.add(text, 'message');
  gui.add(text, 'speed', -5, 5);
  gui.add(text, 'displayOutline');
  gui.add(text, 'explode');
};

//hiding oipening dat gui
https://github.com/dataarts/dat.gui/issues/93

var FizzyText = function() {

  this.color0 = "#ffae23"; // CSS string
  this.color1 = [ 0, 128, 255 ]; // RGB array
  this.color2 = [ 0, 128, 255, 0.3 ]; // RGB with alpha
  this.color3 = { h: 350, s: 0.9, v: 0.3 }; // Hue, saturation, value

  // Define render logic ...

};

window.onload = function() {

  var text = new FizzyText();
  var gui = new dat.GUI();

  gui.addColor(text, 'color0');
  gui.addColor(text, 'color1');
  gui.addColor(text, 'color2');
  gui.addColor(text, 'color3');

};

// custom name
gui.add(params, 'interation').name('Intertions')

// limits steps
gui.add(params, 'width').min(128).max(256).step(16)
// or maybe
gui.add(params, 'width', 128, 256).step(16)
gui.add(params, 'width', 128, 256, 16)

// figure out multiple stats, own container, etc
var statsContainer = document.createElement( 'div' )
document.body.appendChild( )
var stats = new Stats();
stats.showPanel( 1 ); // 0: fps, 1: ms, 2: mb, 3+: custom
statsContainer.appendChild( stats.dom );
var stats2 = new Stats();
stats2.showPanel( 1 ); // 0: fps, 1: ms, 2: mb, 3+: custom
statsContainer.appendChild( stats2.dom );

//onStartChange? onChange .listen for outside

// gui.add(params, 'interation').onFinishChange(function(){
//     // refresh based on the new value of params.interation
// })


// var camGui = new dat.GUI()
// var camGuiPosition = camGui.addFolder('position')
// camGuiPosition.add(camera.position, 'x', -10, 10, 1)
// camGuiPosition.add(camera.position, 'y', -10, 10, 1)
// camGuiPosition.add(camera.position, 'z', -10, 10, 1)
// var camGuiRotation = camGui.addFolder('rotation')
// camGuiRotation.open()
// camGuiRotation.close()
// camGuiRotation.add(camera.rotation, 'x', -10, 10, 0.1)
// camGuiRotation.add(camera.rotation, 'y', -10, 10, 0.1)
// camGuiRotation.add(camera.rotation, 'z', -10, 10, 0.1)
//
//
//
// var objGui = new dat.GUI()
// var cubeGui = objGui.addFolder('cube')
// var cubeGuiPosition = cubeGui.addFolder('position')
// cubeGuiPosition.add(cube.position, 'x', -10, 10, 1)
// cubeGuiPosition.add(cube.position, 'y', -10, 10, 1)
// cubeGuiPosition.add(cube.position, 'z', -10, 10, 1)
// cubeGui.add(cube, 'visible');
