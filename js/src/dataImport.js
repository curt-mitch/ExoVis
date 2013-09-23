var mongoose = require('mongoose');
mongoose.connect('localhost', 'test');

var fs = require('fs');
var lineList = fs.readFileSync('nph-nstedAPI.csv').toString().split('\n');
lineList.shift(); // Shift the headings off the list of records.

//plMsinij = planet minimum mass (Jupiter)
//TTV = transit timing variation
//Kep = Kepler Field
//ra = right ascension
//dec = declination
//dist = distance (Parsecs)
//vj = V (Johnson) system magnitude
//teff = Effective Stellar Temperature (K)
//stRad = steller radius (solar percentage)
var schemaKeyList = ['plHostName', 'plLetter', 'plDiscMethod', 'plPNum', 'plOrbPer',
  'plOrbPerErr1', 'plOrbPerErr2', 'plOrbPerlim', 'plOrbsMax', 'plOrbsMaxErr1',
  'plOrbsMaxErr2', 'plOrbsMaxLim', 'plOrbsMaxN', 'plOrbsEccen', 'plOrbEccenErr1',
  'plOrbEccenErr2', 'plOrbEccenn', 'plOrbIncl', 'plOrbInclErr1', 'plOrbInclErr2',
  'plOrbInclLim', 'plOrbIncLn', 'plMassJ', 'plMassJErr1', 'plMassJErr2', 'plMassLim',
  'plMassN', 'plMsIniJ', 'plMsiniJErr1', 'plMsiniJErr2', 'plMsiniLim', 'plMsinIn',
  'plRadj', 'plRadjErr1', 'plRadjErr2', 'plRadLim', 'plRadN', 'plDens', 'plDensErr1',
  'plDensErr2', 'plDensLim', 'plDensN', 'plTTVflag', 'plKepFlag', 'raStr', 'decStr',
  'ra', 'stRaErr', 'dec', 'stDecErr', 'stPosn', 'stDist', 'stDistErr1', 'stDistErr2',
  'stDistN', 'stVJ', 'stVJErr', 'stVJLim', 'stVJBlend', 'stTEff', 'stTEffErr',
  'stTEffLim', 'stTEffBlend','stTEffN', 'stMass', 'stMassErr', 'stMassLim', 'stMassBlend',
  'stMassN','stRad', 'stRadErr', 'stRadLim', 'stRadBlend', 'stRadN', 'hdName', 'hipName'];

var ExoplanetDataSchema = new mongoose.Schema({
    plHostName: String,
    plLetter: String,
    plDiscMethod: String,
    plPNum: Number,
    plOrbPer: Number,
    plOrbPerErr1: Number,
    plOrbPerErr2: Number,
    plOrbPerlim: Number,
    plOrbsMax: Number,
    plOrbsMaxErr1: Number,
    plOrbsMaxErr2: Number,
    plOrbsMaxLim: Number,
    plOrbsMaxN: Number,
    plOrbsEccen: Number,
    plOrbEccenErr1: Number,
    plOrbEccenErr2: Number,
    plOrbEccenn: Number,
    plOrbIncl: Number,
    plOrbInclErr1: Number,
    plOrbInclErr2: Number,
    plOrbInclLim: Number,
    plOrbIncLn: Number,
    plMassJ: Number,
    plMassJErr1: Number,
    plMassJErr2: Number,
    plMassLim: Number,
    plMassN: Number,
    plMsIniJ: Number,
    plMsiniJErr1: Number,
    plMsiniJErr2: Number,
    plMsiniLim: Number,
    plMsinIn: Number,
    plRadj: Number,
    plRadjErr1: Number,
    plRadjErr2: Number,
    plRadLim: Number,
    plRadN: Number,
    plDens: Number,
    plDensErr1: Number,
    plDensErr2: Number,
    plDensLim: Number,
    plDensN: Number,
    plTTVflag: Number,
    plKepFlag: Number,
    raStr: Schema.Types.Mixed,
    decStr: Schema.Types.Mixed,
    ra: Number,
    stRaErr: Number,
    dec: Number,
    stDecErr: Number,
    stPosn: Number,
    stDist: Number,
    stDistErr1: Number,
    stDistErr2: Number,
    stDistN: Number,
    stVJ: Number,
    stVJErr: Number,
    stVJLim: Number,
    stVJBlend: Number,
    stTEff: Number,
    stTEffErr: Number,
    stTEffLim: Number,
    stTEffBlend: Number,
    stTEffN: Number,
    stMass: Number,
    stMassErr: Number,
    stMassLim: Number,
    stMassBlend: Number,
    stMassN: Number,
    stRad: Number,
    stRadErr: Number,
    stRadLim: Number,
    stRadBlend: Number,
    stRadN: Number,
    hdName: String,
    hipName: String
});

module.exports = ExoplanetDataSchema;