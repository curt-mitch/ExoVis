var Body = require('./Body.js');

var starColors = {
  'O5': 0x9BB0FF,
  'O6': 0xA2B8FF,
  'O7': 0x9DB1FF,
  'O8': 0x9DB1FF,
  'O9': 0x9AB2FF,
  'B0': 0x9CB2FF,
  'B1': 0xA0B6FF,
  'B2': 0xA0B4FF,
  'B3': 0xA5B9FF,
  'B4': 0xA4B8FF,
  'B5': 0xAABFFF,
  'B6': 0xACBDFF,
  'B7': 0xADBFFF,
  'B8': 0xB1C3FF,
  'B9': 0xB5C6FF,
  'A0': 0xB9C9FF,
  'A1': 0xB5C7FF,
  'A2': 0xBBCBFF,
  'A3': 0xBFCFFF,
  'A5': 0xCAD7FF,
  'A6': 0xC7D4FF,
  'A7': 0xC8D5FF,
  'A8': 0xD5DEFF,
  'A9': 0xDBE0FF,
  'F0': 0xE0E5FF,
  'F2': 0xECEFFF,
  'F4': 0xE0E2FF,
  'F5': 0xF8F7FF,
  'F6': 0xF4F1FF,
  'F7': 0xF6F3FF,
  'F8': 0xFFF7FC,
  'F9': 0xFFF7FC,
  'G0': 0xFFF8FC,
  'G1': 0xFFF7F8,
  'G2': 0xFFF5F2,
  'G4': 0xFFF1E5,
  'G5': 0xFFF4EA,
  'G6': 0xFFF4EB,
  'G7': 0xFFF4EB,
  'G8': 0xFFEDDE,
  'G9': 0xFFEFDD,
  'K0': 0xFFEEDD,
  'K1': 0xFFE0BC,
  'K2': 0xFFE3C4,
  'K3': 0xFFDEC3,
  'K4': 0xFFD8B5,
  'K5': 0xFFD2A1,
  'K7': 0xFFC78E,
  'K8': 0xFFD1AE,
  'M0': 0xFFC38B,
  'M1': 0xFFCC8E,
  'M2': 0xFFC483,
  'M3': 0xFFCE81,
  'M4': 0xFFC97F,
  'M5': 0xFFCC6F,
  'M6': 0xFFC370,
  'M8': 0xFFC66D,
  'A4': 0xC3D2FF,
  'F3': 0xE3E6FF,
  'G3': 0xFFEEE2,
  'M7': 0xFFA561,
  'M9': 0xFFE99A,
  'N': 0xFF9D00
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
  var starRadius = (this.info.st_rad || Math.floor(this.info.st_rad * 15)) && 15;

  this.ambient = new THREE.AmbientLight(0xffffff);
  this.scene.add(this.ambient);

  //load star surface image
  var geometry = new THREE.SphereGeometry(starRadius, starRadius * 20, starRadius * 20);
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
    console.log("star spectrum: " + starSpectrum);
    this.addPlanet(new Body({
      scene: this.scene,
      planetRadius: planetRadius,
      planetDistance: planetDistance,
      planetOrbit: planetOrbit
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
