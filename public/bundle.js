;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Body = module.exports = function(options) {
  this.scene = options.scene;
  geometry = new THREE.SphereGeometry(this.planetRadius, this.planetRadius * 10, this.planetRadius * 10);
  material = new THREE.MeshPhongMaterial({color: 0xAADD00, ambient: 0x1a1a1a});
  this.mesh = new THREE.Mesh(geometry, material);

  this.scene.add(this.mesh);
};

Body.prototype.destroy = function() {
  this.scene.remove(this.mesh);
};

Body.prototype.update = function(time) {
  var p1_angle = time * 0.001;
  var p2_angle = time * 0.0004;
  this.mesh.position.set(400* Math.cos(p1_angle), 400*Math.sin(p1_angle), 0);
};

},{}],2:[function(require,module,exports){
var System = require('./System.js');
var Skybox = require('./Skybox.js');

var ExoViz = module.exports = function() {
  console.log('Initializing system');

  // Make animate always execute in our scope
  this.animate = this.animate.bind(this);

  // Camera
  this.camera = new THREE.PerspectiveCamera(45, document.body.clientWidth / document.body.clientHeight, 1, 10000);
  this.camera.position.z = 1500;

  // Controls
  this.controls = new THREE.TrackballControls(this.camera);

  this.controls.rotateSpeed = 1.0;
  this.controls.zoomSpeed = 1.2;
  this.controls.panSpeed = 0.8;

  this.controls.noZoom = false;
  this.controls.noPan = false;

  this.controls.staticMoving = true;
  this.controls.dynamicDampingFactor = 0.3;

  // Adds functions in conjuction with mouse click:
  //  A = rotate, S = zoom, D = pan
  this.controls.keys = [65, 83, 68];

  // TODO: Why do you need to do this? Shouldn't it happen in the render loop?
  var self = this;
  this.controls.addEventListener('change', function() {
    self.render();
  });

  // Scene
  this.scene = new THREE.Scene();

  // Renderer
  // Create a WebGLRenderer
  this.renderer = new THREE.WebGLRenderer({antialias: true});
  this.renderer.setClearColor(0x000000, 1.0);
  this.renderer.clear();

  // Add to DOM
  this.$container = $("#container"); //grab DOM element
  this.$container.append(this.renderer.domElement);

  // Set size
  this.setSize(container.offsetWidth, container.offsetHeight);

  // Create new system
  this.system = new System({
    starName: $('#starlist').val(),
    scene: this.scene,
    //loaded: this.addData.bind(this) //loads data into DOM
  });

  // Create skybox
  this.skybox = new Skybox({
    scene: this.scene
  });

  $(window).on('resize', this.setSize.bind(this));

  // Start animating
  this.animate(0);
};

ExoViz.prototype.setSystem = function(starName) {
  this.system.fetch(starName);
};

ExoViz.prototype.setSize = function(width, height) {
  var width = this.width = this.$container.innerWidth();
  var height = this.height = this.$container.innerHeight();

  // Make crisp on retina displays by using devicePixelRation
  var ratio = window.devicePixelRatio || 1;
  this.renderer.setSize(width*ratio, height*ratio);

  if (this.camera) {
    this.camera.aspect = width/height;
    
    this.camera.updateProjectionMatrix();
  }
};

ExoViz.prototype.render = function() {
  // this.cubeCamera.rotation.copy(this.camera.rotation); // ties skybox camera to regular camera
  // this.renderer.render(this.cubeScene, this.cubeCamera);
  this.renderer.render(this.scene, this.camera);
};

ExoViz.prototype.animate = function(time) {
  this.controls.update();
  
  this.system.update(time);

  this.render();

  requestAnimationFrame(this.animate);
};


module.exports = ExoViz;

},{"./Skybox.js":3,"./System.js":4}],3:[function(require,module,exports){
var Skybox = module.exports = function(options) {
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

  // Create shader material
  var skyBoxMaterial = new THREE.ShaderMaterial( {
    fragmentShader: shader.fragmentShader,
    vertexShader: shader.vertexShader,
    uniforms: shader.uniforms,
    depthWrite: false,
    side: THREE.BackSide
  });

  // Define geometry
  var geometry = new THREE.CubeGeometry(10000, 10000, 10000);

  // Create skybox mesh
  var skybox = new THREE.Mesh(geometry, skyBoxMaterial);

  options.scene.add(skybox);
};

},{}],4:[function(require,module,exports){
var Body = require('./Body.js');

var starColors = {
  'O5': 0x9bb0ff,
  'O6': 0xa2b8ff,
  'O7': 0x9db1ff,
  'O8': 0x9db1ff,
  'O9': 0x9ab2ff,
  'B0': 0x9cb2ff,
  'B1': 0xa0b6ff,
  'B2': 0xa0b4ff,
  'B3': 0xa5b9ff,
  'B4': 0xa4b8ff,
  'B5': 0xaabfff,
  'B6': 0xacbdff,
  'B7': 0xadbfff,
  'B8': 0xb1c3ff,
  'B9': 0xb5c6ff,
  'A0': 0xb9c9ff,
  'A1': 0xb5c7ff,
  'A2': 0xbbcbff,
  'A3': 0xbfcfff,
  'A5': 0xcad7ff,
  'A6': 0xc7d4ff,
  'A7': 0xc8d5ff,
  'A8': 0xd5deff,
  'A9': 0xdbe0ff,
  'F0': 0xe0e5ff,
  'F2': 0xecefff,
  'F4': 0xe0e2ff,
  'F5': 0xf8f7ff,
  'F6': 0xf4f1ff,
  'F7': 0xf6f3ff,
  'F8': 0xfff7fc,
  'F9': 0xfff7fc,
  'G0': 0xfff8fc,
  'G1': 0xfff7f8,
  'G2': 0xfff5f2,
  'G4': 0xfff1e5,
  'G5': 0xfff4ea,
  'G6': 0xfff4eb,
  'G7': 0xfff4eb,
  'G8': 0xffedde,
  'G9': 0xffefdd,
  'K0': 0xffeedd,
  'K1': 0xffe0bc,
  'K2': 0xffe3c4,
  'K3': 0xffdec3,
  'K4': 0xffd8b5,
  'K5': 0xffd2a1,
  'K7': 0xffc78e,
  'K8': 0xffd1ae,
  'M0': 0xffc38b,
  'M1': 0xffcc8e,
  'M2': 0xffc483,
  'M3': 0xffce81,
  'M4': 0xffc97f,
  'M5': 0xffcc6f,
  'M6': 0xffc370,
  'M8': 0xffc66d,
  'A4': 0xc3d2ff,
  'F3': 0xe3e6ff,
  'G3': 0xffeee2,
  'M7': 0xffa561,
  'M9': 0xffe99a,
  'N': 0xff9d00
};

var System = module.exports = function(options) {
  this.starName = null;
  this.info = {};
  this.bodies = [];

  this.scene = options.scene;

  this.loaded = options.loaded;

  // Fetch star info if name provided
  if (options.starName)
    this.fetch(options.starName);
};

System.prototype.init = function(data) {
  this.reset();

  this.info.st_spstr = data[0].st_spstr; //stellar spectrum
  this.info.st_rad = data[0].st_rad; // star radius (solar)
  this.info.pl_rade = data[0].pl_rade; // planet radius (earth)
  this.info.pl_orbsmax = data[0].pl_orbsmax; // planet semi-major axis (AU)
  this.info.pl_orbper = data[0].pl_orbper; // planet orbital period (days)

  var starSpectrum = this.info.st_spstr.substr(0,2);
  var starRadius = Math.floor(this.info.st_rad * 25);

  this.ambient = new THREE.AmbientLight(0xffffff);
  this.scene.add(this.ambient);

  //load star surface image
  var geometry = new THREE.SphereGeometry(starRadius, starRadius, starRadius);
  var material = new THREE.MeshPhongMaterial({
                color: starColors[starSpectrum],
                transparent: true,
                opacity: 1
              });

  this.star = new THREE.Mesh(geometry, material);
  this.scene.add(this.star);

  this.starlight = new THREE.PointLight(starColors[starSpectrum], 10, 1000);
  this.star.add(this.starlight);

  // TODO: LOOP OVER ALL THE PLANETS AND ADD THEM
  var planetRadius;
  var planetDistance;
  var planetYear;
  var planetGeometry;
  var planetMaterial;
  for(var key in data){
    planetRadius = data[key].pl_rade || Math.floor(data[key].st_rad * 5);
    planetDistance = data[key].pl_rade || Math.floor(data[key].st_rad * (key*1 + 1) * 20);
    planetOrbit = data[key].pl_orbper || Math.floor(data[key].st_rad * (key*1 + 1) * 5);
    console.log("star radius: " + starRadius);
    console.log("planet radius: " + planetRadius);
    console.log("planet distance: " + planetDistance);
    console.log("planet orbital period: " + planetOrbit);
    // maybe declare geometry and material variables here and pass to 
    // mesh: this.mesh(geometry, materials) below?
    planetGeometry = new THREE.SphereGeometry(planetRadius / 2, planetRadius * 10, planetRadius * 10);
    planetMaterial = new THREE.MeshPhongMaterial({color: 0xff0000});
    this.addPlanet(new Body({
      scene: this.scene,
      mesh: new THREE.Mesh(planetGeometry, planetMaterial)
    }));
    console.log("Body.update: " + Body);
  }

  if (typeof this.loaded === 'function')
    this.loaded(this.info);
};

System.prototype.update = function(time) {
  if (this.bodies.length) {
    this.bodies.forEach(function(body) {
      body.update(time);
    });
  }
};

System.prototype.addPlanet = function(body) {
  this.bodies.push(body);
  this.scene.add(body.mesh);
  console.log("this.body: " + body);
};

System.prototype.reset = function() {
  if (this.scene)
    this.scene.remove(this.star);

  if (this.bodies.length) {
    this.bodies.forEach(function(body) {
      body.destroy();
    });

    // Reset array
    this.bodies.length = 0;
  }

  this.info = {};
};

System.prototype.fetch = function(starName) {
  // Store star name
  this.starName = starName;

  // Fetch data
  var url = '/systems/' + this.starName;
  return $.ajax({
    url: url,
    dataType: 'json',
    success: this.init.bind(this)
  });
};

},{"./Body.js":1}],5:[function(require,module,exports){
var datapost = function(){
  var url = '/systems/'+$('#starlist').val();
  return $.ajax({
    url: url,
    dataType: 'json',
    success: function(data, status){
      for(var key in data){
        $('#planetlist')
          .append($('<option></option>')
          .attr('value',key)
          .text(data[key].pl_hostname + " " + data[key].pl_letter));
      };
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
    },
    error: function(){
      console.log('JSON not loaded successfully');
    }
  });
};

var planetDataPost = function(){
  var planetId = $('#planetlist').val();
  var url = '/systems/'+$('#starlist').val();
  return $.ajax({
    url: url,
    dataType: 'json',
    success: function(data, status){
      $('#planetname .textdata').children().remove();
      $('#orbitlength .textdata').children().remove();
      $('#distancefromstar .textdata').children().remove();
      $('#planettemp .textdata').children().remove();
      $('#planetmass .textdata').children().remove();
      $('#planetradius .textdata').children().remove();
      $('#discoverymethod .textdata').children().remove();
      $('#discoveryyear .textdata').children().remove();
      $('#planetname').append('<span class="textdata">' + data[planetId].pl_hostname + " " + data[planetId].pl_letter + '</span>');
      $('#orbitlength').append('<span class="textdata">' + (data[planetId].pl_orbper && data[planetId].pl_orbper.toFixed(2) + " days"|| "N/A" )+ '</span>');
      $('#distancefromstar').append('<span class="textdata">' + (data[planetId].pl_orbsmax && data[planetId].pl_orbsmax.toFixed(2) + " AU"|| "N/A") + '</span>');
      $('#planettemp').append('<span class="textdata">' + (data[planetId].pl_eqt && data[planetId].pl_eqt.toFixed(2) + "K"|| "N/A") + '</span>');
      $('#planetmass').append('<span class="textdata">' + (data[planetId].pl_masse && data[planetId].pl_masse.toFixed(planetId)|| "N/A") + '</span>');
      $('#planetradius').append('<span class="textdata">' + (data[planetId].pl_rade && data[planetId].pl_rade.toFixed(planetId)|| "N/A") + '</span>');
      $('#discoverymethod').append('<span class="textdata">' + data[planetId].pl_discmethod + '</span>');
      $('#discoveryyear').append('<span class="textdata">' + data[planetId].pl_disc + '</span>');
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
    $('#planetlist').children().remove();
    datapost();
  });
  $('#planetlist').change(function(){
    planetDataPost();
  });
});

module.exports.datapost = datapost;

},{}],6:[function(require,module,exports){
var ExoViz = require('./ExoViz.js');

$(function(){
  window.exoViz = new ExoViz();
});

},{"./ExoViz.js":2}]},{},[1,2,3,4,5,6])
;