// SCENE
var misc = require('./skybox.js');
var scene = new THREE.Scene();
var sceneCube = new THREE.Scene(); //this is a scene rendered specifically for the skybox
scene.add(skybox);