var express = require('express');
var path = require('path');
var mongoose = require('mongoose');

var app = express();

//new call to compress content
app.use(express.compress());

app.use(express.static(__dirname));
mongoose.connect('mongodb://localhost/exovis');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var exoplanetDataSchema = new mongoose.Schema({
  pl_hostname: String, // planet host name
  pl_letter: String, // planet letter
  pl_discmethod: String, // planet discovery method
  pl_pnum: Number, // number of planets
  pl_orbper: Number, // planet orbit period (days)
  pl_orbsmax: Number, // orbit period semimajor axis
  pl_orbeccen: Number, // orbit eccentricity
  pl_orbincl: Number, // orbit inclination
  pl_massj: Number, // planet mass (Jupiter)
  pl_radj: Number, // planet radius
  pl_dens: Number, // planet density (g/cm^3)
  pl_ttvflag: Number, // planet transit timing variation flag
  pl_kepflag: Number, // planet Kepler Field flag
  ra: Number, // right ascension (degrees)
  dec: Number, // declination (degrees)
  pl_eqt: Number, // planet equilibrium temperature (K)
  pl_masse: Number, // planet mass (Earth)
  pl_rade: Number, // planet radius (Earth)
  pl_disc: Number, // year of discovery
  pl_status: Number, // planet status
  pl_pelink: String, // link to Exoplanet Encyclopaedia
  st_dist: Number, // distance (parsecs)
  st_vj: Number, // V (Johnson) system magnitude
  st_teff: Number, // effective stellar temperature (K)
  st_mass: Number, // stellar mass (solar mass)
  st_rad: Number, // stellar radius (solar radius)
  hd_name: String, // HD name
  hip_name: String, // HIP name
  st_spstr: String, // stellar spectral type
  st_lum: Number // stellar luminosity (log solar luminosity)
});

var System = mongoose.model('System', exoplanetDataSchema, 'NASAdata');

var query = System.findOne({'pl_hostname': 'HD 196885'}, null, function (err, system) {
  if (err) return handleError(err);
  console.log(system);
});

app.listen(process.env.PORT || 3000);