var scenes = require('./scenes');
var datapost = require('./datapost.js');
var starSpectrum = datapost.exosystemInfo.st_spstr;

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

var ambient = new THREE.AmbientLight(0xffffff);
scenes.scene.add(ambient);

var starlight = new THREE.PointLight(starColors.starSpectrum, 10, 1000);

var star = new THREE.Mesh(new THREE.SphereGeometry(50, 30, 30),
  new THREE.MeshPhongMaterial({ambient: starColors.starSpectrum}));
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