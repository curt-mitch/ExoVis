// Create a WebGLRenderer
var renderer = new THREE.WebGLRenderer({antialias: true});
var container = document.getElementById("container"); //grab DOM element
renderer.setSize(container.offsetWidth, container.offsetHeight);

container.appendChild(renderer.domElement);

renderer.setClearColor(0x000000, 1.0);
renderer.clear();

module.exports = renderer;