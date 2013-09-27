var Body = module.exports = function(options) {
  this.scene = options.scene;

  var geometry = new THREE.SphereGeometry(15, 20, 16);
  var material = new THREE.MeshPhongMaterial({color: 0xAADD00, ambient: 0x1a1a1a});
  this.mesh = new THREE.Mesh(geometry, material);
  this.mesh.position.set(50,0,0);

  this.scene.add(this.mesh);
};

Body.prototype.destroy = function() {
  this.scene.remove(this.mesh);
};

Body.prototype.update = function(time) {
  var p1_angle = time * 0.001;
  var p2_angle = time * 0.0004;

  this.mesh.position.set(200* Math.cos(p1_angle), 200*Math.sin(p1_angle), 0);
};
