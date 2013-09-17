;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var time = 0;
var speed = 1;

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  render();

  time = time + speed;
  var p1_angle = time * 0.01,
  p2_angle = time * 0.004;
  planet1.position.set(200* Math.cos(p1_angle), 200*Math.sin(p1_angle), 0);
  planet2.position.set(350* Math.cos(p2_angle), 350*Math.sin(p2_angle), 0);
}
},{}],2:[function(require,module,exports){
var animate = require('./animate.js');
var cameras = require('./main.js');
var render = require('./render.js');
var renderer = require('./renderer.js');
var skybox = require('./skybox.js');
},{"./animate.js":1,"./main.js":2,"./render.js":3,"./renderer.js":4,"./skybox.js":5}],3:[function(require,module,exports){
function render() {
  cameraCube.rotation.copy(camera.rotation); // ties skybox camera to regular camera
  renderer.render(sceneCube, cameraCube)
  renderer.render(scene, camera );
}
},{}],4:[function(require,module,exports){
// Create a WebGLRenderer
var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerWidth);

document.body.appendChild(renderer.domElement);

renderer.setClearColor(0x000000, 1.0);
renderer.clear();
},{}],5:[function(require,module,exports){
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

},{}]},{},[2])
;