var Skybox = module.exports = function(options) {
  var urlPrefix = "textures/skybox/";
  var urls = [
    urlPrefix + "pos-x.png", urlPrefix + "neg-x.png",
    urlPrefix + "pos-y.png", urlPrefix + "neg-y.png",
    urlPrefix + "pos-z.png", urlPrefix + "neg-z.png"
  ];

  var cubemap = THREE.ImageUtils.loadTextureCube(urls); // load textures
  cubemap.format = THREE.RGBFormat;

  var shader = THREE.ShaderLib['cube']; // init cube shader from built-in lib
  shader.uniforms['tCube'].value = cubemap; // apply textures to shader

  // Create shader material
  var skyBoxMaterial = new THREE.ShaderMaterial( {
    fragmentShader: shader.fragmentShader,
    vertexShader: shader.vertexShader,
    uniforms: shader.uniforms,
    depthWrite: false,
    side: THREE.BackSide
  });

  // Define geometry
  var geometry = new THREE.CubeGeometry(10000, 10000, 10000);

  // Create skybox mesh
  var skybox = new THREE.Mesh(geometry, skyBoxMaterial);

  options.scene.add(skybox);
};
