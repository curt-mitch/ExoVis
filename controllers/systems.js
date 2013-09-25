var mongoose = require('mongoose');
var System = mongoose.model('System');

// HD 196885
module.exports.getSystem = function(req, res, next) {
  System.find({'pl_hostname': req.params.star}, function (err, system) {
    if(err) {
      console.error('Error retrieving system: ', err);
      return res.json(system);
    }

    console.log('System retrieved: ', system);
    res.json(system);
  });
};
