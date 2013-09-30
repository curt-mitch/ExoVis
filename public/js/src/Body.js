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
