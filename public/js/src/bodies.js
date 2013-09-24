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