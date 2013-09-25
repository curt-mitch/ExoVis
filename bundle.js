;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var process=require("__browserify_process");function filter (xs, fn) {
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (fn(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length; i >= 0; i--) {
    var last = parts[i];
    if (last == '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Regex to split a filename into [*, dir, basename, ext]
// posix version
var splitPathRe = /^(.+\/(?!$)|\/)?((?:.+?)?(\.[^.]*)?)$/;

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
var resolvedPath = '',
    resolvedAbsolute = false;

for (var i = arguments.length; i >= -1 && !resolvedAbsolute; i--) {
  var path = (i >= 0)
      ? arguments[i]
      : process.cwd();

  // Skip empty and invalid entries
  if (typeof path !== 'string' || !path) {
    continue;
  }

  resolvedPath = path + '/' + resolvedPath;
  resolvedAbsolute = path.charAt(0) === '/';
}

// At this point the path should be resolved to a full absolute path, but
// handle relative paths to be safe (might happen when process.cwd() fails)

// Normalize the path
resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
var isAbsolute = path.charAt(0) === '/',
    trailingSlash = path.slice(-1) === '/';

// Normalize the path
path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }
  
  return (isAbsolute ? '/' : '') + path;
};


// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    return p && typeof p === 'string';
  }).join('/'));
};


exports.dirname = function(path) {
  var dir = splitPathRe.exec(path)[1] || '';
  var isWindows = false;
  if (!dir) {
    // No dirname
    return '.';
  } else if (dir.length === 1 ||
      (isWindows && dir.length <= 3 && dir.charAt(1) === ':')) {
    // It is just a slash or a drive letter with a slash
    return dir;
  } else {
    // It is a full dirname, strip trailing slash
    return dir.substring(0, dir.length - 1);
  }
};


exports.basename = function(path, ext) {
  var f = splitPathRe.exec(path)[2] || '';
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPathRe.exec(path)[3] || '';
};

exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';

},{"__browserify_process":2}],2:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            if (ev.source === window && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

process.binding = function (name) {
    throw new Error('process.binding is not supported');
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}],3:[function(require,module,exports){
var time = 0;
var speed = 1;
var bodies = require('./bodies');
var render = require('./render');
var controls = require('./controls');
var exosystemData = require('./csvConvert');

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  render();

  time = time + speed;
  var p1_angle = time * 0.01,
  p2_angle = time * 0.004;
  bodies.planet1.position.set(200* Math.cos(p1_angle), 200*Math.sin(p1_angle), 0);
  bodies.planet2.position.set(350* Math.cos(p2_angle), 350*Math.sin(p2_angle), 0);
}

module.exports = animate;
},{"./bodies":4,"./controls":6,"./csvConvert":7,"./render":9}],4:[function(require,module,exports){
//add lighting sources
var scenes = require('./scenes');

var ambient = new THREE.AmbientLight(0xffffff);
scenes.scene.add(ambient);

var starlight = new THREE.PointLight(0xffffff, 10, 1000);

var star = new THREE.Mesh(new THREE.SphereGeometry(50, 30, 30),
  new THREE.MeshPhongMaterial({ambient: 0xFFCC11}));
scenes.scene.add(star);
star.add(starlight);

var planet1 = new THREE.Mesh(new THREE.SphereGeometry(15, 20, 16),
  new THREE.MeshPhongMaterial({color: 0xAADD00, ambient: 0x1a1a1a}));
planet1.position.set(50,0,0);
scenes.scene.add(planet1);

var planet2 = new THREE.Mesh(new THREE.SphereGeometry(25, 20, 16),
  new THREE.MeshPhongMaterial({color: 0xCD5555, ambient: 0x1a1a1a}));
planet2.position.set(-100,0,0);
scenes.scene.add(planet2);

module.exports.ambient = ambient;
module.exports.starlight = starlight;
module.exports.star = star;
module.exports.planet1 = planet1;
module.exports.planet2 = planet2;
},{"./scenes":11}],5:[function(require,module,exports){
// CAMERA
// args sig -> new THREE.PerspectiveCamera( FOV, viewAspectRatio, zNear, zFar );
var camera = new THREE.PerspectiveCamera(45, document.body.clientWidth / document.body.clientHeight, 1, 10000);
camera.position.z = 1500;
module.exports.camera = camera;

// camera dedicated to skybox
var cameraCube = new THREE.PerspectiveCamera(45, document.body.clientWidth / document.body.clientHeight, 1, 10000);
module.exports.cameraCube = cameraCube;
},{}],6:[function(require,module,exports){
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

module.exports = controls;
},{"./cameras":5,"./render":9}],7:[function(require,module,exports){
var path = require('path');
var csvData = $.getJSON('data/planets.txt');

var exosystemData = $.csv.toObjects(csvData);

module.exports = exosystemData;
},{"path":1}],8:[function(require,module,exports){
var cameras = require('./cameras.js');
var render = require('./render.js');
var renderer = require('./renderer.js');
var skybox = require('./skybox.js');
var scenes = require('./scenes.js');
var controls = require('./controls.js');
var bodies = require('./bodies.js');
var systemInfo = require('./systemInfo.js');
var animate = require('./animate.js');
var csvConvert = require('./csvConvert.js');

$(document).ready(function(){
  animate();
});
},{"./animate.js":3,"./bodies.js":4,"./cameras.js":5,"./controls.js":6,"./csvConvert.js":7,"./render.js":9,"./renderer.js":10,"./scenes.js":11,"./skybox.js":12,"./systemInfo.js":13}],9:[function(require,module,exports){
var cameras = require('./cameras');
var renderer = require('./renderer');
var scenes = require('./scenes');

function render() {
  cameras.cameraCube.rotation.copy(cameras.camera.rotation); // ties skybox camera to regular camera
  renderer.render(scenes.sceneCube, cameras.cameraCube);
  renderer.render(scenes.scene, cameras.camera);
}

module.exports = render;
},{"./cameras":5,"./renderer":10,"./scenes":11}],10:[function(require,module,exports){
// Create a WebGLRenderer
var renderer = new THREE.WebGLRenderer({antialias: true});
var container = document.getElementById("container"); //grab DOM element
renderer.setSize(container.offsetWidth, container.offsetHeight);

container.appendChild(renderer.domElement);

renderer.setClearColor(0x000000, 1.0);
renderer.clear();

module.exports = renderer;
},{}],11:[function(require,module,exports){
// SCENE
var skybox = require('./skybox');
var scene = new THREE.Scene();
scene.add(skybox);
module.exports.scene = scene;

var sceneCube = new THREE.Scene(); //this is a scene rendered specifically for the skybox
module.exports.sceneCube = sceneCube;
},{"./skybox":12}],12:[function(require,module,exports){
//add skybox
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

// create shader material
var skyBoxMaterial = new THREE.ShaderMaterial( {
  fragmentShader: shader.fragmentShader,
  vertexShader: shader.vertexShader,
  uniforms: shader.uniforms,
  depthWrite: false,
  side: THREE.BackSide
});

// create skybox mesh
var skybox = new THREE.Mesh(
  new THREE.CubeGeometry(10000, 10000, 10000),
  skyBoxMaterial
);

module.exports = skybox;
},{}],13:[function(require,module,exports){
var renderer = require('./renderer');

module.exports = title;
},{"./renderer":10}]},{},[3,4,5,6,7,8,9,10,11,12,13])
;