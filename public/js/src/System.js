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
  var starRadius = Math.floor(this.info.st_rad * 50);
  console.log(star);

  this.ambient = new THREE.AmbientLight(0xffffff);
  this.scene.add(this.ambient);

  var geometry = new THREE.SphereGeometry(starRadius, starRadius, starRadius);
  var material = new THREE.MeshPhongMaterial({ ambient: starColors[starSpectrum] });
  this.star = new THREE.Mesh(geometry, material);
  this.scene.add(this.star);

  this.starlight = new THREE.PointLight(starColors[starSpectrum], 10, 1000);
  this.star.add(this.starlight);

  // TODO: LOOP OVER ALL THE PLANETS AND ADD THEM
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
  var url = '/systems/' + this.starName;
  return $.ajax({
    url: url,
    dataType: 'json',
    success: this.init.bind(this)
  });
};
