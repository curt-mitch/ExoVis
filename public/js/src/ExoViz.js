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
