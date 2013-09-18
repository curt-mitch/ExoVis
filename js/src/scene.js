// SCENE
var skybox = require('./skybox');
module.exports = function(skybox){
  var scene = new THREE.Scene();
  var sceneCube = new THREE.Scene(); //this is a scene rendered specifically for the skybox
  scene.add(skybox);
};