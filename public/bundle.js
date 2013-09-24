;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var time = 0;
var speed = 1;
var bodies = require('./bodies');
var render = require('./render');
var controls = require('./controls');

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  render();

  time = time + speed;
  var p1_angle = time * 0.01,
  p2_angle = time * 0.004;
  bodies.planet1.position.set(200* Math.cos(p1_angle), 200*Math.sin(p1_angle), 0);
  bodies.planet2.position.set(350* Math.cos(p2_angle), 350*Math.sin(p2_angle), 0);
}

module.exports = animate;
},{"./bodies":2,"./controls":4,"./render":6}],2:[function(require,module,exports){
//add lighting sources
var scenes = require('./scenes');

var ambient = new THREE.AmbientLight(0xffffff);
scenes.scene.add(ambient);

var starlight = new THREE.PointLight(0xffffff, 10, 1000);

var star = new THREE.Mesh(new THREE.SphereGeometry(50, 30, 30),
  new THREE.MeshPhongMaterial({ambient: 0xFFCC11}));
scenes.scene.add(star);
star.add(starlight);

var planet1 = new THREE.Mesh(new THREE.SphereGeometry(15, 20, 16),
  new THREE.MeshPhongMaterial({color: 0xAADD00, ambient: 0x1a1a1a}));
planet1.position.set(50,0,0);
scenes.scene.add(planet1);

var planet2 = new THREE.Mesh(new THREE.SphereGeometry(25, 20, 16),
  new THREE.MeshPhongMaterial({color: 0xCD5555, ambient: 0x1a1a1a}));
planet2.position.set(-100,0,0);
scenes.scene.add(planet2);

module.exports.ambient = ambient;
module.exports.starlight = starlight;
module.exports.star = star;
module.exports.planet1 = planet1;
module.exports.planet2 = planet2;
},{"./scenes":8}],3:[function(require,module,exports){
// CAMERA
// args sig -> new THREE.PerspectiveCamera( FOV, viewAspectRatio, zNear, zFar );
var camera = new THREE.PerspectiveCamera(45, document.body.clientWidth / document.body.clientHeight, 1, 10000);
camera.position.z = 1500;
module.exports.camera = camera;

// camera dedicated to skybox
var cameraCube = new THREE.PerspectiveCamera(45, document.body.clientWidth / document.body.clientHeight, 1, 10000);
module.exports.cameraCube = cameraCube;
},{}],4:[function(require,module,exports){
//controls for camera angle
var cameras = require('./cameras');
var render = require('./render');

controls = new THREE.TrackballControls(cameras.camera);

controls.rotateSpeed = 1.0;
controls.zoomSpeed = 1.2;
controls.panSpeed = 0.8;

controls.noZoom = false;
controls.noPan = false;

controls.staticMoving = true;
controls.dynamicDampingFactor = 0.3;

//adds functions in conjuction with mouse click:
// A = rotate, S = zoom, D = pan
controls.keys = [65, 83, 68];

controls.addEventListener('change', render);

module.exports = controls;
},{"./cameras":3,"./render":6}],5:[function(require,module,exports){
var cameras = require('./cameras.js');
var render = require('./render.js');
var renderer = require('./renderer.js');
var skybox = require('./skybox.js');
var scenes = require('./scenes.js');
var controls = require('./controls.js');
var bodies = require('./bodies.js');
var systemInfo = require('./systemInfo.js');
var animate = require('./animate.js');

$(document).ready(function(){
  animate();
});
},{"./animate.js":1,"./bodies.js":2,"./cameras.js":3,"./controls.js":4,"./render.js":6,"./renderer.js":7,"./scenes.js":8,"./skybox.js":9,"./systemInfo.js":10}],6:[function(require,module,exports){
var cameras = require('./cameras');
var renderer = require('./renderer');
var scenes = require('./scenes');

function render() {
  cameras.cameraCube.rotation.copy(cameras.camera.rotation); // ties skybox camera to regular camera
  renderer.render(scenes.sceneCube, cameras.cameraCube);
  renderer.render(scenes.scene, cameras.camera);
}

module.exports = render;
},{"./cameras":3,"./renderer":7,"./scenes":8}],7:[function(require,module,exports){
// Create a WebGLRenderer
var renderer = new THREE.WebGLRenderer({antialias: true});
var container = document.getElementById("container"); //grab DOM element
renderer.setSize(container.offsetWidth, container.offsetHeight);

container.appendChild(renderer.domElement);

renderer.setClearColor(0x000000, 1.0);
renderer.clear();

module.exports = renderer;
},{}],8:[function(require,module,exports){
// SCENE
var skybox = require('./skybox');
var scene = new THREE.Scene();
scene.add(skybox);
module.exports.scene = scene;

var sceneCube = new THREE.Scene(); //this is a scene rendered specifically for the skybox
module.exports.sceneCube = sceneCube;
},{"./skybox":9}],9:[function(require,module,exports){
//add skybox
var urlPrefix = "textures/skybox/";
var urls = [
  urlPrefix + "pos-x.png", urlPrefix + "neg-x.png",
  urlPrefix + "pos-y.png", urlPrefix + "neg-y.png",
  urlPrefix + "pos-z.png", urlPrefix + "neg-z.png"
];

var cubemap = THREE.ImageUtils.loadTextureCube(urls); // load textures
cubemap.format = THREE.RGBFormat;

var shader = THREE.ShaderLib['cube']; // init cube shader from built-in lib
shader.uniforms['tCube'].value = cubemap; // apply textures to shader

// create shader material
var skyBoxMaterial = new THREE.ShaderMaterial( {
  fragmentShader: shader.fragmentShader,
  vertexShader: shader.vertexShader,
  uniforms: shader.uniforms,
  depthWrite: false,
  side: THREE.BackSide
});

// create skybox mesh
var skybox = new THREE.Mesh(
  new THREE.CubeGeometry(10000, 10000, 10000),
  skyBoxMaterial
);

module.exports = skybox;
},{}],10:[function(require,module,exports){
var renderer = require('./renderer');

module.exports = title;
},{"./renderer":7}]},{},[1,2,3,4,5,6,7,8,9,10])
;