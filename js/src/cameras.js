// CAMERA
// args sig -> new THREE.PerspectiveCamera( FOV, viewAspectRatio, zNear, zFar );
var camera = new THREE.PerspectiveCamera(45, document.body.clientWidth / document.body.clientHeight, 1, 10000);
camera.position.z = 1500;
module.exports.camera = camera;

// camera dedicated to skybox
var cameraCube = new THREE.PerspectiveCamera(45, document.body.clientWidth / document.body.clientHeight, 1, 10000);
module.exports.cameraCube = cameraCube;