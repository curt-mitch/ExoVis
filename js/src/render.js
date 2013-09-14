function render() {
  cameraCube.rotation.copy(camera.rotation); // ties skybox camera to regular camera
  renderer.render(sceneCube, cameraCube)
  renderer.render(scene, camera );
}