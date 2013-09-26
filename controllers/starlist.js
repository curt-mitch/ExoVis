var mongoose = require('mongoose');
var System = mongoose.model('System');

module.exports.getStarlist = function(req, res, next) {
  System.find({'rowid': req.params}, 'rowid pl_hostname', function (err, system) {
    if(err) {
      console.error('Error retrieving system: ', err);
      return res.json(system);
    }

    console.log('System retrieved: ', system);
    res.json(system);
  });
};