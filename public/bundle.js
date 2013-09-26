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
},{"./bodies":2,"./controls":4,"./render":7}],2:[function(require,module,exports){
//add lighting sources
var scenes = require('./scenes');
var systemInfo = require('./systemInfo');

console.log(systemInfo);

var starColors = {
  'O5': 0x9DB4FF,
  'B1': 0xA2B9FF,
  'B3': 0xA7BCFF,

  'F8': 0xFFF9F9
};

var ambient = new THREE.AmbientLight(0xffffff);
scenes.scene.add(ambient);

var starlight = new THREE.PointLight(starColors.F8, 10, 1000);

var star = new THREE.Mesh(new THREE.SphereGeometry(50, 30, 30),
  new THREE.MeshPhongMaterial({ambient: starColors.F8}));
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
},{"./scenes":9,"./systemInfo":11}],3:[function(require,module,exports){
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
},{"./cameras":3,"./render":7}],5:[function(require,module,exports){
module.exports.systemInfo = {};

var datapost = function(){
  var url = 'http://localhost:3000/systems/'+encodeURIComponent($("#starlist").val());
  console.log(url);
  $.ajax({
    url: url,
    dataType: 'json',
    success: function(data, status){
      $('#starname').append('<span class="textdata">' + data[0].pl_hostname + '</span>');
      $('#starmass').append('<span class="textdata">' + data[0].st_mass + '</span>');
      $('#starsize').append('<span class="textdata">' + data[0].st_rad + '</span>');
      $('#startemp').append('<span class="textdata">' + (data[0].st_teff && data[0].st_teff + "K"|| "N/A") + '</span>');
      $('#RA').append('<span class="textdata">' + data[0].ra.toFixed(2) + "º" + '</span>');
      $('#dec').append('<span class="textdata">' + data[0].dec.toFixed(2) + "º" + '</span>');
      $('#distance').append('<span class="textdata">' + (data[0].st_dist * 3.26).toFixed(2) + " light-years" + '</span>');
      $('#planetnum').append('<span class="textdata">' + data[0].pl_pnum + '</span>');
      $('#planetname').append('<span class="textdata">' + data[0].pl_hostname + " " + data[0].pl_letter + '</span>');
      $('#orbitlength').append('<span class="textdata">' + (data[0].pl_orbper && data[0].pl_orbper.toFixed(2) + " days"|| "N/A" )+ '</span>');
      $('#distancefromstar').append('<span class="textdata">' + (data[0].pl_orbsmax && data[0].pl_orbsmax.toFixed(2) + " AU"|| "N/A") + '</span>');
      $('#planettemp').append('<span class="textdata">' + (data[0].pl_eqt && data[0].pl_eqt.toFixed(2) + "K"|| "N/A") + '</span>');
      $('#planetmass').append('<span class="textdata">' + (data[0].pl_masse && data[0].pl_masse.toFixed(0)|| "N/A") + '</span>');
      $('#planetradius').append('<span class="textdata">' + (data[0].pl_rade && data[0].pl_rade.toFixed(0)|| "N/A") + '</span>');
      $('#discoverymethod').append('<span class="textdata">' + data[0].pl_discmethod + '</span>');
      $('#discoveryyear').append('<span class="textdata">' + data[0].pl_disc + '</span>');
      systemInfo.st_spstr = data[0].st_spstr;
    },
    error: function(){
      console.log('JSON not loaded successfully');
    }
  });
};

$(document).ready(function(){
  datapost();
  $('#starlist').change(function(){
    $('#starname .textdata').children().remove();
    $('#starmass .textdata').children().remove();
    $('#starsize .textdata').children().remove();
    $('#startemp .textdata').children().remove();
    $('#RA .textdata').children().remove();
    $('#dec .textdata').children().remove();
    $('#distance .textdata').children().remove();
    $('#planetnum .textdata').children().remove();
    $('#planetname .textdata').children().remove();
    $('#orbitlength .textdata').children().remove();
    $('#distancefromstar .textdata').children().remove();
    $('#planettemp .textdata').children().remove();
    $('#planetmass .textdata').children().remove();
    $('#planetradius .textdata').children().remove();
    $('#discoverymethod .textdata').children().remove();
    $('#discoveryyear .textdata').children().remove();
    datapost();
  });
});

module.exports.datapost = datapost;
},{}],6:[function(require,module,exports){
var cameras = require('./cameras.js');
var render = require('./render.js');
var renderer = require('./renderer.js');
var skybox = require('./skybox.js');
var scenes = require('./scenes.js');
var controls = require('./controls.js');
var bodies = require('./bodies.js');
var systemInfo = require('./systemInfo.js');
var animate = require('./animate.js');
var datapost = require('./datapost.js');

$(document).ready(function(){
  animate();
});

},{"./animate.js":1,"./bodies.js":2,"./cameras.js":3,"./controls.js":4,"./datapost.js":5,"./render.js":7,"./renderer.js":8,"./scenes.js":9,"./skybox.js":10,"./systemInfo.js":11}],7:[function(require,module,exports){
var cameras = require('./cameras');
var renderer = require('./renderer');
var scenes = require('./scenes');

function render() {
  cameras.cameraCube.rotation.copy(cameras.camera.rotation); // ties skybox camera to regular camera
  renderer.render(scenes.sceneCube, cameras.cameraCube);
  renderer.render(scenes.scene, cameras.camera);
}

module.exports = render;
},{"./cameras":3,"./renderer":8,"./scenes":9}],8:[function(require,module,exports){
// Create a WebGLRenderer
var renderer = new THREE.WebGLRenderer({antialias: true});
var container = document.getElementById("container"); //grab DOM element
renderer.setSize(container.offsetWidth, container.offsetHeight);

container.appendChild(renderer.domElement);

renderer.setClearColor(0x000000, 1.0);
renderer.clear();

module.exports = renderer;
},{}],9:[function(require,module,exports){
// SCENE
var skybox = require('./skybox');
var scene = new THREE.Scene();
scene.add(skybox);
module.exports.scene = scene;

var sceneCube = new THREE.Scene(); //this is a scene rendered specifically for the skybox
module.exports.sceneCube = sceneCube;
},{"./skybox":10}],10:[function(require,module,exports){
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
},{}],11:[function(require,module,exports){
var renderer = require('./renderer');

module.exports = title;
},{"./renderer":8}]},{},[1,2,3,4,5,6,7,8,9,10,11])
;