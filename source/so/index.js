// picture
var getPicture = function(message){

  var canvas = document.createElement('canvas');
  canvas.width = "100";
  canvas.height = "100";

  var context = canvas.getContext('2d');
  context.font = "100px";
  // context.fillText(message, 0, 10);
  var picture = canvas.toDataURL();
  // return picture;
	setTimeout( function () {
		context.fillText(message, 0, 10);
	}, 1000 )
	setTimeout( function () {
		context.fillText("tst2", 0, 10);
	}, 3000 )
  return canvas;
};

// now for the meat
var getLabel = function(message){
  // var texture = new THREE.Texture(getPicture(message));
	var texture = new THREE.CanvasTexture(getPicture(message));

	setTimeout( function () {
		texture.needsUpdate = true
	}, 2000 )
	// setTimeout( function () {
	// 	texture.needsUpdate = true
	// }, 4000 )
	// var texture = new THREE.TextureLoader().load( 'sprite.png' )
	// var texture = new THREE.TextureLoader().load( getPicture(message) )
  var spriteMaterial = new THREE.SpriteMaterial(
    {map: texture },
  );
  var sprite = new THREE.Sprite(spriteMaterial);
  //sprite.scale.set(100, 50, 1.0);

	// var spriteMap = new THREE.TextureLoader().load( "sprite.png" );
	// var spriteMaterial = new THREE.SpriteMaterial( { map: spriteMap, color: 0xffffff } );
	// var sprite = new THREE.Sprite( spriteMaterial );
	// scene.add( sprite );

  return sprite
};

var setup = function(){
	var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth/window.innerHeight,
    1,
    1000
  );

  var light = new THREE.PointLight(0xeeeeee);
  scene.add(camera);
  // scene.add(light);

  var renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(0xefefef);
  renderer.setSize(window.innerWidth, window.innerHeight)
	document.body.appendChild(renderer.domElement);

	camera.position.set( 5, 3, 5 )
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  var label = getLabel("Hello, World!");
  scene.add(label);

  var animate = function(){
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  };

  animate();
};

setup();
