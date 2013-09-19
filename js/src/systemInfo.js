var renderer = require('./renderer');

var title = document.createElement('div');
$(title).attr('id', 'title');
title.innerHTML = '<h1>ExoVis - A Visualizer for Exoplanetary Systems</h1>';
document.body.appendChild(title);

module.exports = title;