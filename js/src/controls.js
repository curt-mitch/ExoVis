//controls for camera angle
var cameras = require('./cameras');
var render = require('./render');

controls = new THREE.TrackballControls(cameras.camera);

controls.rotateSpeed = 1.0;
controls.zoomSpeed = 1.2;
controls.panSpeed = 0.8;

controls.noZoom = false;
controls.noPan = false;

controls.staticMoving = true;
controls.dynamicDampingFactor = 0.3;

//adds functions in conjuction with mouse click:
// A = rotate, S = zoom, D = pan
controls.keys = [65, 83, 68];

controls.addEventListener('change', render);