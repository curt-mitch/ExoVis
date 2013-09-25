var cameras = require('./cameras.js');
var render = require('./render.js');
var renderer = require('./renderer.js');
var skybox = require('./skybox.js');
var scenes = require('./scenes.js');
var controls = require('./controls.js');
var bodies = require('./bodies.js');
var systemInfo = require('./systemInfo.js');
var animate = require('./animate.js');
var datapost = require('./datapost.js');

$(document).ready(function(){
  animate();
});
