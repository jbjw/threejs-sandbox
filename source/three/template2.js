// ThreeJS scene
'use strict';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const texture = THREE.ImageUtils.loadTexture("dirt.jpg");
texture.anisotropy = renderer.getMaxAnisotropy();
const material = new THREE.MeshBasicMaterial( { map: texture, side: THREE.DoubleSide } );
// const material = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true } );

// THREE.Vector3( x, y, z );
// THREE.Euler( x, y, z );

const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;
// position, rotation, scale

var render = function () {
	requestAnimationFrame( render );

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;
	cube.position.x += 0.01;

	renderer.render(scene, camera);
};

render();
