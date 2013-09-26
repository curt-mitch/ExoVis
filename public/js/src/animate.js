var time = 0;
var speed = 1;
var bodies = require('./bodies');
var render = require('./render');
var controls = require('./controls');
var datapost = require('./datapost.js');
var starSpectrum = datapost.exosystemInfo.st_spstr;

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  render();

  time = time + speed;
  var p1_angle = time * 0.01,
  p2_angle = time * 0.004;
  bodies.planet1.position.set(200* Math.cos(p1_angle), 200*Math.sin(p1_angle), 0);
  bodies.planet2.position.set(350* Math.cos(p2_angle), 350*Math.sin(p2_angle), 0);
}

module.exports = animate;