var mongoose = require('mongoose');

exports.systems = function systemslist(starname,callback){
  var System = mongoose.model('System');
  System.find({'pl_hostname': 'HD 196885'}, function (err, system){
    if(err){
      console.log(err);
    } else {
      console.log(system);
      callback("", system);
    }
  });
};