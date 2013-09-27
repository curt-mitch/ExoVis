var Body = module.exports = function(options) {
  this.scene = options.scene;
  var geometry = new THREE.SphereGeometry(this.planetRadius / 2, this.planetRadius * 10, this.planetRadius * 10);
  var material = new THREE.MeshPhongMaterial({color: 0xAADD00, ambient: 0x1a1a1a});
  this.mesh = new THREE.Mesh(geometry, material);
  this.mesh.position.set(this.planetDistance,0,0);
  var setPlanetDistance = this.planetDistance;

  this.scene.add(this.mesh);
};

Body.prototype.destroy = function() {
  this.scene.remove(this.mesh);
};

Body.prototype.update = function(time) {
  var p1_angle = time * 0.001;
  var p2_angle = time * 0.0004;
  if(time < 2000) console.log("update scope: " + this);
  this.mesh.position.set(400* Math.cos(p1_angle), 400*Math.sin(p1_angle), 0);
};
