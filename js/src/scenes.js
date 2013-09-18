// SCENE
var skybox = require('./skybox');
var scene = new THREE.Scene();
scene.add(skybox);
module.exports.scene = scene;

var sceneCube = new THREE.Scene(); //this is a scene rendered specifically for the skybox
module.exports.sceneCube = sceneCube;