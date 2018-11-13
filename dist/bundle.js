/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Entity.js":
/*!***********************!*\
  !*** ./src/Entity.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Entity; });\nclass Entity {\r\n\tconstructor(args) {\r\n\t\tthis.mesh = args.mesh\r\n\t\tthis.mass = args.mass\r\n\t\tthis.position = this.mesh.position\r\n\t\tthis.velocity = new THREE.Vector3(0, 0, 0)\r\n\t\tthis.rotation = this.mesh.rotation\r\n\t\tthis.angularVelocity = new THREE.Euler(0, 0, 0)\r\n\t}\r\n\tapplyForce(magnitude, direction) {\r\n\t\tthis.velocity.add(direction.multiplyScalar(magnitude))\r\n\t}\r\n\tupdatePhysics() {\r\n\t\t// this.position.add(this.velocity)\r\n\t\t// this.rotation.\r\n\t}\r\n\tget area() {\r\n\t\treturn this.x\r\n\t}\r\n\tset area(x) {\r\n\t\tthis.area\r\n\t}\r\n}\r\n\n\n//# sourceURL=webpack:///./src/Entity.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Entity_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Entity.js */ \"./src/Entity.js\");\n//\r\n\r\n\r\n\r\n\r\n\r\nconst log = console.log\r\n\r\nlet renderer, stats, controls, scene, camera, cube\r\nvar raycaster = new THREE.Raycaster()\r\nvar mouse = new THREE.Vector2()\r\n\r\ninit()\r\nrender()\r\n\r\nconst entities = []\r\n\r\nfunction init() {\r\n\t// renderer setup\r\n\trenderer = new THREE.WebGLRenderer( { antialias: true, alpha: false } )\r\n\trenderer.setSize( window.innerWidth, window.innerHeight )\r\n\tdocument.body.appendChild( renderer.domElement )\r\n\r\n\t// renderer.setClearColor( \"#AA00AA\", 0.5 )\r\n\trenderer.shadowMap.enabled = true\r\n\t// renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap\r\n\trenderer.shadowMapSoft = true\r\n\trenderer.shadowCameraNear = 3\r\n\trenderer.shadowCameraFov = 50\r\n\trenderer.shadowMapBias = 0.0039\r\n\trenderer.shadowMapDarkness = 0.5\r\n\trenderer.shadowMapWidth = 1024\r\n\trenderer.shadowMapHeight = 1024\r\n\r\n\t// stats setup\r\n\tstats = new Stats()\r\n\tstats.showPanel( 1 ) // 0: fps, 1: ms, 2: mb, 3+: custom\r\n\tdocument.body.appendChild( stats.dom )\r\n\r\n\t// scene setup\r\n\tscene = new THREE.Scene()\r\n\r\n\t// camera setup\r\n\tcamera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 )\r\n\t// const camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, -10, 1000 );\r\n\trenderer.shadowCameraFar = camera.far\r\n\t// camera.up.set( 0, 0, 1 )\r\n\tcamera.position.x = 40, camera.position.z = 40\r\n\tcamera.position.y = 25\r\n\t// camera.up = new THREE.Vector3( 0, 0, 1 )\r\n\t// scene.add( camera )\r\n\t// controls.object = camera\r\n\t// position, rotation, scale\r\n\r\n\t// camera.fov = 120\r\n\t// camera.aspect = window.innerWidth / window.innerHeight\r\n\t// camera.near = 0.1\r\n\t// camera.far = 100000\r\n\t// camera.updateProjectionMatrix()\r\n\t// camera.position.set( 1, 1, 1 )\r\n\t// .focus,.fov, .zoom\r\n\r\n\t// controls setup\r\n\t// controls = new THREE.OrbitControls()\r\n\tcontrols = new THREE.OrbitControls( camera )\r\n\tcontrols.zoomSpeed = 4\r\n\r\n\t// scene.background method\r\n\tconst skyboxLoader = new THREE.CubeTextureLoader()\r\n\tskyboxLoader.setPath(\"/assets/cube_textures/space/\")\r\n\tconst textureCube = skyboxLoader.load([\r\n\t\t\"r.png\", \"l.png\", // 'px.png', 'nx.png',\r\n\t\t\"t.png\", \"b.png\", // 'py.png', 'ny.png',\r\n\t\t\"c.png\", \"rr.png\", // 'pz.png', 'nz.png',\r\n\t])\r\n\t// const material = new THREE.MeshBasicMaterial( { color: 0xffffff, envMap: textureCube } )\r\n\tscene.background = textureCube\r\n\r\n\t// crate.gif, dirt.jpg\r\n\tconst loader = new THREE.TextureLoader()\r\n\t// var texture = THREE.ImageUtils.loadTexture( \"/assets/textures/crate.jpg\" )\r\n\tconst crateTexture = loader.load( \"/assets/textures/crate.jpg\" )\r\n\tcrateTexture.anisotropy = renderer.getMaxAnisotropy()\r\n\r\n\t// var pointLight = new THREE.PointLight(0xFFFFFF)\r\n\tvar light = new THREE.AmbientLight( 0x404040, 0.5 ) // soft white light intensity\r\n\tscene.add( light )\r\n\r\n\t// White directional light at half intensity shining from the top.\r\n\tvar directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 )\r\n\tscene.add( directionalLight )\r\n\r\n\tvar crateMaterial = new THREE.MeshLambertMaterial( { map: crateTexture } )\r\n\t// var material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: false } )\r\n\t// side: THREE.DoubleSide } )\r\n\r\n\tcube = {\r\n\t\tmesh: new THREE.Mesh( new THREE.BoxGeometry( 2, 2, 2 ), crateMaterial ),\r\n\t}\r\n\tscene.add( cube.mesh )\r\n\r\n\tvar axisHelper = new THREE.AxisHelper( 5 )\r\n\tscene.add( axisHelper )\r\n\r\n\t// colorCenterLine, colorGrid\r\n\tvar gridHelper = new THREE.GridHelper( 100, 1 )\r\n\tscene.add( gridHelper )\r\n\r\n\tconst platform = new THREE.Mesh(\r\n\t\tnew THREE.PlaneGeometry( 10, 10, 10, 10 ),\r\n\t\tnew THREE.MeshBasicMaterial( {\r\n\t\t\tmap: crateTexture,\r\n\t\t\tside: THREE.DoubleSide,\r\n\t\t} )\r\n\t)\r\n\tplatform.position.y = 2.1\r\n\tscene.add( platform )\r\n\tplatform.rotation.x = Math.PI/2\r\n\tplatform.receiveShadow = true\r\n\r\n\tconst dirtTexture = new THREE.TextureLoader().load( '/assets/textures/dirt.jpg' )\r\n\tdirtTexture.anisotropy = renderer.getMaxAnisotropy()\r\n\r\n\tconst woodTexture = new THREE.TextureLoader().load( '/assets/textures/stone.jpg' )\r\n\twoodTexture.anisotropy = renderer.getMaxAnisotropy()\r\n\r\n\tconst grassTexture = new THREE.TextureLoader().load( '/assets/textures/grass.jpg' )\r\n\tgrassTexture.anisotropy = renderer.getMaxAnisotropy()\r\n\tgrassTexture.wrapS = THREE.RepeatWrapping\r\n\tgrassTexture.wrapT = THREE.RepeatWrapping\r\n\tgrassTexture.repeat.set( 20, 20 )\r\n\r\n\tconst checkerboardTexture = new THREE.TextureLoader().load( '/assets/textures/checkerboard.png' )\r\n\tcheckerboardTexture.anisotropy = renderer.getMaxAnisotropy()\r\n\tcheckerboardTexture.wrapS = THREE.RepeatWrapping\r\n\tcheckerboardTexture.wrapT = THREE.RepeatWrapping\r\n\tcheckerboardTexture.repeat.set( 20, 20 )\r\n\r\n\tvar sphereMesh = new THREE.Mesh(\r\n\t\tnew THREE.SphereGeometry( 10, 32, 32 ),\r\n\t\tnew THREE.MeshLambertMaterial( {\r\n\t\t\tmap: checkerboardTexture,\r\n\t\t\t// side: THREE.DoubleSide,\r\n\t\t} )\r\n\t)\r\n\tconst sphere = new _Entity_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](sphereMesh)\r\n\tscene.add( sphereMesh )\r\n\tsphereMesh.position.set( 0, 15, 0 )\r\n\tsphereMesh.castShadow = true\r\n\tsphereMesh.receiveShadow = false\r\n\tentities.push(sphere)\r\n\r\n\t// ground plane\r\n\tvar ground = new THREE.Mesh(\r\n\t\tnew THREE.PlaneGeometry( 100, 100, 1, 1 ),\r\n\t\tnew THREE.MeshLambertMaterial( {\r\n\t\t\tmap: grassTexture,\r\n\t\t\tside: THREE.DoubleSide,\r\n\t\t} )\r\n\t)\r\n\tscene.add( ground )\r\n\tground.rotation.x = Math.PI/2\r\n\tground.receiveShadow = true\r\n\r\n\t// lighting\r\n\tvar spotlight = new THREE.SpotLight( 0xffffff )\r\n\r\n\tspotlight.position.set( 10, 100, 10 )\r\n\t// spotlight.intensity = 10\r\n\tspotlight.angle = ( Math.PI * 2 ) * ( 1 / 32 )\r\n\t// spotlight.distance = 1000\r\n\t// spotlight.decay = 2\r\n\r\n\t// spotlight.target = sphere\r\n\r\n\tspotlight.castShadow = true\r\n\r\n\tspotlight.shadow.mapSize.width = 1024\r\n\tspotlight.shadow.mapSize.height = 1024\r\n\r\n\tspotlight.shadow.camera.near = 500\r\n\tspotlight.shadow.camera.far = 4000\r\n\tspotlight.shadow.camera.fov = 30\r\n\r\n\tscene.add( spotlight )\r\n\tscene.add( new THREE.SpotLightHelper( spotlight ) )\r\n\r\n\tvar ambientLight = new THREE.AmbientLight( 0x404040, 1 )\r\n\tscene.add( ambientLight )\r\n\r\n\tvar sunLight = new THREE.DirectionalLight( 0xffffff, 1.0 )\r\n\tsunLight.position.set( 100, 50, 100 )\r\n\t// scene.add( sunLight.target )\r\n\t// sunLight.target = box\r\n\tsunLight.castShadow = true\r\n\tscene.add( sunLight )\r\n\tscene.add( new THREE.DirectionalLightHelper( sunLight, 5 ) )\r\n\r\n\trenderer.domElement.addEventListener( 'click', function ( event ) {\r\n\t\tmouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1\r\n\t\tmouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1\r\n\r\n\t\tconsole.log( mouse.x, mouse.y )\r\n\t\traycaster.setFromCamera( mouse, camera )\r\n\r\n\t\tconst hexes = scene.children.filter( o => o.name === \"hex\" )\r\n\t\tvar hexIntersections = raycaster.intersectObjects( hexes, true )\r\n\r\n\t\tconst firstHexIntersection = hexIntersections[ 0 ]\r\n\t\tif ( firstHexIntersection !== undefined ) {\r\n\t\t\tfirstHexIntersection.object.material.color.set( 0xff0000 )\r\n\t\t}\r\n\r\n\t\tconst groundIntersection = raycaster.intersectObject( ground, camera )[ 0 ]\r\n\t\tif ( groundIntersection !== undefined ) {\r\n\t\t\t// console.log( groundIntersection )\r\n\t\t\t// console.log( groundIntersection.point )\r\n\t\t\tcursorSphere.position.copy( groundIntersection.point )\r\n\t\t}\r\n\r\n\t\t// for ( var i = 0; i < intersections.length; i++ ) {\r\n\t\t// \t// intersections[ i ].object.material.color.set( 0xff0000 );\r\n\t\t// }\r\n\t} )\r\n\r\n\tlet cursorSphere = new THREE.Mesh(\r\n\t\tnew THREE.SphereGeometry( 1, 32, 32 ),\r\n\t\tnew THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true, side: THREE.DoubleSide } )\r\n\t)\r\n\tcursorSphere.position.set( 0, 10, 0 )\r\n\tscene.add( cursorSphere )\r\n}\r\n\r\nsetInterval( updateControls, 10 )\r\nfunction updateControls( dt = 10 ) {\r\n\tcontrols.update()\r\n}\r\n\r\nsetInterval( updatePhysics, 10 )\r\nfunction updatePhysics( dt = 10 ) {\r\n\tfor (const entity of entities) {\r\n\t\tentity.updatePhysics()\r\n\t}\r\n}\r\n\r\nfunction render() {\r\n\trequestAnimationFrame( render )\r\n\tstats.begin()\r\n\t// additional render tasks\r\n\trenderer.render( scene, camera )\r\n\tstats.end()\r\n}\r\n\r\n// old render loop\r\n// function render() {\r\n// \trequestAnimationFrame( render )\r\n// \tstats.begin()\r\n// \t// r += 0.0001\r\n// \t// phi += 0.1\r\n// \t// theta += 0.01\r\n// \t// r += 0.01v.applyAxisAngle( Y, 0.0 )\r\n// \t// sunLight.position.setFromSpherical( new THREE.Spherical( 100, phi, theta ) )\r\n// \t// console.log( mesh.localToWorld( X ) )\r\n//\r\n// \t// console.log( sunLight.localToWorld( X.clone() ) )\r\n// \tconsole.log( sunLight.localToWorld( X ) )\r\n// \t// console.log( X)\r\n//\r\n// \tv.applyAxisAngle( X, 0.1 )\r\n// \t// v.applyAxisAngle( Y, 0.0 )\r\n// \tv.applyAxisAngle( Z, r )\r\n// \tv.applyEuler( new THREE.Euler( 0, 0, 0.1 ) )\r\n// \tconsole.log( v )\r\n// \t// sunLight.position.copy( v )\r\n//\r\n// \tcontrols.update()\r\n// \trenderer.render( scene, camera )\r\n// \tstats.end()\r\n// }\r\n// requestAnimationFrame( render )\r\n\r\n// window resize\r\nwindow.addEventListener( \"resize\", onWindowResize, false )\r\nfunction onWindowResize() {\r\n\tcamera.aspect = window.innerWidth / window.innerHeight\r\n\tcamera.updateProjectionMatrix()\r\n\trenderer.setSize( window.innerWidth, window.innerHeight )\r\n}\r\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });