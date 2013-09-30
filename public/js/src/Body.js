var Body = module.exports = function(options) {
  this.planetRadius = options.planetRadius;
  this.planetDistance = options.planetDistance;
  this.planetOrbit = options.planetOrbit;
  this.scene = options.scene;
  var geometry = new THREE.SphereGeometry(this.planetRadius * 0.3, this.planetRadius * 10, this.planetRadius * 10);
  var material = new THREE.MeshPhongMaterial({color: 0xFF0000, ambient: 0x1a1a1a});
  this.mesh = new THREE.Mesh(geometry, material);

  this.scene.add(this.mesh);
};

Body.prototype.destroy = function() {
  this.scene.remove(this.mesh);
};

Body.prototype.update = function(time) {
  var pl_angle;
  if (this.planetOrbit <= 10){
    p1_angle = time / (this.planetOrbit * 500);
  } else if (this.planetOrbit <= 100 && this.planetOrbit > 10){
    p1_angle = time / (this.planetOrbit * 100);
  } else {
    p1_angle = time / (this.planetOrbit * 10);
  }
  this.mesh.position.set(this.planetDistance * 10 * Math.cos(p1_angle), this.planetDistance * 10 * Math.sin(p1_angle), 0);
};
