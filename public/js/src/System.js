var Body = require('./Body.js');

var starColors = {
  'O5': 0x9DB4FF,
  'B1': 0xA2B9FF,
  'B3': 0xA7BCFF,
  'B5': 0xAABFFF,
  'B8': 0xAFC3FF,
  'A1': 0xBACCFF,
  'A3': 0xC0D1FF,
  'A5': 0xCAD8FF,
  'F0': 0xE4E8FF,
  'F2': 0xEDEEFF,
  'F5': 0xFBF8FF,
  'F8': 0xFFF9F9,
  'G2': 0xFFF5EC,
  'G5': 0xFFF4E8,
  'G8': 0xFFF1DF,
  'K0': 0xFFEDB1,
  'K4': 0xFFD7AE,
  'K7': 0xFFC690,
  'M2': 0xFFBE7F,
  'M4': 0xFFBB7B,
  'M6': 0xFFBB7B
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

  var starSpectrum = this.info.st_spstr;
  var starRadius = this.info.st_rad;

  this.ambient = new THREE.AmbientLight(0xffffff);
  this.scene.add(this.ambient);

  var radius = Math.floor(starRadius*50);
  var geometry = new THREE.SphereGeometry(radius, radius, radius);
  var material = new THREE.MeshPhongMaterial({ ambient: starColors[starSpectrum] });
  this.star = new THREE.Mesh(geometry, material);
  this.scene.add(this.star);

  this.starlight = new THREE.PointLight(starColors[starSpectrum], 10, 1000);
  this.star.add(this.starlight);

  // TODO: LOOP OVER ALL THE PLANETS AN ADD THEM
  this.addPlanet(new Body({
    scene: this.scene
  }));

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
  var url = 'http://localhost:3000/systems/'+this.starName;
  return $.ajax({
    url: url,
    dataType: 'json',
    success: this.init.bind(this)
  });
};
