var cameras = require('./cameras');
var renderer = require('./renderer');
var scenes = require('./scenes');

function render() {
  cameras.cameraCube.rotation.copy(cameras.camera.rotation); // ties skybox camera to regular camera
  renderer.render(scenes.sceneCube, cameras.cameraCube);
  renderer.render(scenes.scene, cameras.camera);
}

module.exports = render;