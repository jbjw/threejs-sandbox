var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// https://stackoverflow.com/questions/7919516/using-textures-in-three-js

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var textureLoader = new THREE.TextureLoader();
// let textures = {};
// let materials = {};
Promise.fulfill().then
// promise creator
function loadTexture( url ) {
	const promise = new Promise( function ( resolve, reject ) {
		textureLoader.load( url, function ( texture ) {
			texture.anisotropy = renderer.getMaxAnisotropy();
			var textureName = url.substr( 0, input.lastIndexOf( '.' ) ) || input;
			// textures[textureName] = texture;
			// materials[textureName] = new THREE.MeshBasicMaterial({ map: texture }); // side? side: THREE.DoubleSide]
			resolve( texture );
		},
		function ( req ) {
			// console.log(req.loaded/req.total, 'loaded');
		},
		function ( req ) {
			console.log( 'loading error' );
			resolve();
		} );
	} );
	return promise;
}

const promiseDirt = new Promise( function ( resolve, reject ) {
	loadTexture('dirt.jpg', ( err, texture ) => {
		if ( err ) {
			// error, not rejecting in this case
		} else {
			// resolve
		}
		// reconsider
		const material = new THREE.MeshBasicMaterial({ map: texture }); // side? side: THREE.DoubleSide }
		const wood = {texture: texture, material: material, name: 'dirt'};
		resolve( wood );
		// return texture;
	} );

	// reject();
} );

const promiseDirt = new Promise( function bob( resolve, reject ) {
	loadTexture('wood.jpg', () => {
		resolve();
		return texture;
	} );

	// reject();
} );

const promises = [promiseDirt, promiseWood];

function init( tmoMap ) {
	var geometry = new THREE.BoxGeometry( 1, 1, 1 );
	// var woodTexture = THREE.ImageUtils.loadTexture("wood.jpg");
	// var woodMaterial = new THREE.MeshBasicMaterial( { map: woodTexture, color: 0x00ff00 } );
	var cube = new THREE.Mesh( geometry, tmoMap.wood.material );
	scene.add(cube);

	var planeGeometry = new THREE.PlaneGeometry( 10, 10, 32, 32 );
	// var planeMaterial = new THREE.MeshBasicMaterial({ map: textures.wood, side: THREE.DoubleSide });
	var planeMaterial = new THREE.MeshBasicMaterial( { map: tmoMap.wood.texture , side: THREE.DoubleSide } ); // sidedness
	var plane = new THREE.Mesh( planeGeometry, planeMaterial );
	scene.add( plane );

	camera.position.z = 5;
	camera.position.x = 0;
	camera.position.y = 0;
	// camera.position = new THREE.Vector3(10, 10, 5);
	//camera.setRotationFromEuler(new THREE.Euler(1, 1, 1));
	//camera.lookAt(cube);
	// camera.rotation = new THREE.Euler(0, 0, 0);
	// line curve point

	var axisHelper = new THREE.AxisHelper( 5 );
	scene.add( axisHelper );

	// colorCenterLine, colorGrid
	var gridHelper = new THREE.GridHelper( 100, 0.1 );
	scene.add( gridHelper );

	var width = 3;
	var speed = 0.01;

	var xGrow = 0.02;
	var yGrow = 0.01;

	var tick = 0;

	startRender();
}

var keyMap = {
	// "w": fun.bind(thisArg[, arg1[, arg2[, ...]]])
	"w": moveCamera.bind(undefined, 0.1)
};

document.addEventListener("keydown", function(event) {
	var key = event.key;
	// var key = event.code;
	console.log( key );
	console.log(keyMap[key]);
	keyMap[key]();

});

function moveCamera(x, y, z) {
	console.log( "moving camera by ", x, y, z );
	camera.position.x += x ? x : 0;
	camera.position.y += y ? y : 0;
	camera.position.z += z ? z : 0;
}

function startRender() {
	requestAnimationFrame( startRender );

	for ( var i = 0, l = geometry.vertices.length; i < l; i ++ ) {
		// geometry.vertices[ i ].y = 35 * Math.sin( i / 5 + ( tick + i ) / 7 );
		geometry.vertices[i].multiplyScalar(1.001);
	}

	geometry.verticesNeedUpdate = true;
	// 1476316698624
	camera.lookAt(cube.position);
	// camera.rotation.x = 0;

	plane.rotation.z += 0.00;
	// plane.rotation.x = 0.1*Math.sin(tick*0.05);
	// plane.rotation.y = 0.1*Math.sin(tick*0.04);

	// cube.rotation.x += 0.01;
	// cube.rotation.y += 0.1;
	cube.position.x = width * Math.sin(tick*speed);
	cube.position.y = width * Math.sin(tick*speed + 90);

	// cube.scale.x = tick * xGrow;
	// cube.scale.y = tick * yGrow;
	//console.log(Math.sin(time*0.1))

	renderer.render( scene, camera );
	tick++;
};

Promise.all( promises )
.then( returns ) {
	// cube.material = wood.material;
	// const tmoMap = {};
	// returns.map( function( tmo ) {
	// 	tmoMap[tmo.name] = tmo;
	// });
	const tmoMap = returns.reduce( function( prev, tmo ) {
		// prev[tmo.name] = tmo;
		return tmo;
	}, {});
	// textures could be returned here
	init( tmoMap );
}
