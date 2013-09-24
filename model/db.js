var mongoose = require('mongoose');

var exoplanetDataSchema = new mongoose.Schema({
  pl_hostname: String, // planet host name
  pl_letter: String, // planet letter
  pl_discmethod: String, // planet discovery method
  pl_pnum: Number, // number of planets
  pl_orbper: Number, // planet orbit period (days)
  pl_orbsmax: Number, // orbit period semimajor axis (AU)
  pl_orbeccen: Number, // orbit eccentricity
  pl_orbincl: Number, // orbit inclination (degrees)
  pl_massj: Number, // planet mass (Jupiter)
  pl_radj: Number, // planet radius (Jupiter)
  pl_dens: Number, // planet density (g/cm^3)
  pl_ttvflag: Number, // planet transit timing variation flag
  pl_kepflag: Number, // planet Kepler Field flag
  ra: Number, // right ascension (degrees)
  dec: Number, // declination (degrees)
  st_dist: Number, // distance (parsecs)
  st_vj: Number, // V (Johnson) system magnitude
  st_teff: Number, // effective stellar temperature (K)
  st_mass: Number, // stellar mass (solar mass)
  st_rad: Number, // stellar radius (solar radius)
  hd_name: String, // HD name
  hip_name: String, // HIP name
  st_spstr: String, // stellar spectral type
  st_lum: Number, // stellar luminosity (log solar luminosity)
  pl_eqt: Number, // planet equilibrium temperature (K)
  pl_masse: Number, // planet mass (Earth)
  pl_rade: Number, // planet radius (Earth)
  pl_disc: Number, // year of discovery
  pl_status: Number // planet status
});

var System = mongoose.model('System', exoplanetDataSchema, 'systemdata');

mongoose.connect('mongodb://localhost/exovis');