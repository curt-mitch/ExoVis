var mongoose = require('mongoose');

module.exports = function(app) {
  mongoose.connect('mongodb://localhost/exovis');

  var System = mongoose.model('System', require('../models/System.js'), 'systemdata');
};
