// Create a WebGLRenderer
var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerWidth);

document.body.appendChild(renderer.domElement);

renderer.setClearColor(0x000000, 1.0);
renderer.clear();

module.exports = renderer;