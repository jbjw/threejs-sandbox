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
