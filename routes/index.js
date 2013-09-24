var systemdata = require('../model/systems.js');

exports.index = function(req, res){
  var hostStar = 'HD 196885';
  systemdata.systems(hostStar,function(err,systems){
    res.render('index', {
      title: "ExoVis data test",
      pagetitle: "ExoVis",
      pl_hostname: hostStar,
      pl_pnum: systems
    });
  });
}