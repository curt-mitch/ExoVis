var datapost = $(document).ready(function(){
  var starname = $('#starname');
  var starmass = $('#starmass');
  var starsize = $('#starsize');
  var startemp = $('#startemp');
  var RA = $('#RA');
  var dec = $('#dec');
  var distance = $('#distance');
  var planetnum = $('#planetnum');
  var planetname = $('#planetname');
  var orbitlength = $('#orbitlength');
  var distancefromstar = $('#distancefromstar');
  var planettemp = $('#planettemp');
  var planetmass = $('#planetmass');
  var planetradius = $('#planetradius');
  var discoverymethod = $('#discoverymethod');
  var discoveryyear = $('#discoveryyear');

  var url = 'http://localhost:3000/systems/'+encodeURIComponent($("#starlist").val());
  console.log(url);

  $.ajax({
    url: url,
    dataType: 'json',
    success: function(data, status){
      starname.append(data[0].pl_hostname);
      starmass.append(data[0].st_mass);
      starsize.append(data[0].st_rad);
      startemp.append(data[0].st_teff + "K");
      RA.append(data[0].ra.toFixed(2) + "º");
      dec.append(data[0].dec.toFixed(2) + "º");
      distance.append((data[0].st_dist * 3.26).toFixed(2) + " light-years");
      planetnum.append(data[0].pl_pnum);
      planetname.append(data[0].pl_hostname + " " + data[0].pl_letter);
      orbitlength.append(data[0].pl_orbper && data[0].pl_orbper.toFixed(2) + " days" || "N/A");
      distancefromstar.append(data[0].pl_orbsmax && data[0].pl_orbsmax.toFixed(2) + " AU" || "N/A");
      planettemp.append(data[0].pl_eqt && data[0].pl_eqt.toFixed(2) + "K" || "N/A");
      planetmass.append(data[0].pl_masse && data[0].pl_masse.toFixed(0) || "N/A");
      planetradius.append(data[0].pl_rade && data[0].pl_rade.toFixed(0) || "N/A");
      discoverymethod.append(data[0].pl_discmethod);
      discoveryyear.append(data[0].pl_disc);

    },
    error: function(){
      console.log('JSON not loaded successfully');
    }
  });
});


module.exports.datapost = datapost;
